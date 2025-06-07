const Delivery = require("../models/Delivery");
const {applyStockUpdate,applyStockUpdate2} = require("./stockController");


const { logAction } = require("../middlewares/logMiddleware"); 

//  Création d'une livraison
const createDelivery = async (req, res) => {
  const {
    driver,
    truck,
    fullBottlesSent,
    emptyBottlesSent
  } = req.body;

  try {
    const delivery = await Delivery.create({
      driver,
      truck,
      fullBottlesSent,
      emptyBottlesSent,
      consignedBottles: 0
    });

    // Mise à jour du stock (sortie)
    const description = `Initiation d'une livraison le ${new Date().toLocaleString()}`;
    await applyStockUpdate({
      type: "sortie",
      fullBottles: fullBottlesSent,
      emptyBottles: emptyBottlesSent,
      consignedBottles: 0,
      description,
      userId: req.user.id
    });

    res.status(201).json(delivery);
    // Après mise à jour de la livraison :
    await logAction(req.user.id, "Livraison effectué", "Livraison", delivery.id)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Mise à jour des bouteilles retournées
const updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Livraison non trouvée" });
    }

    const {
      fullBottlesReturned,
      emptyBottlesReturned,
      status
    } = req.body;

    // Mise à jour des champs partiels
    if (typeof fullBottlesReturned === "number") {
      delivery.fullBottlesReturned = fullBottlesReturned;
    }

    if (typeof emptyBottlesReturned === "number") {
      delivery.emptyBottlesReturned = emptyBottlesReturned;
    }

    if (status) {
      delivery.status = status;
    }

    // Calcul automatique des consignées si les valeurs nécessaires sont présentes
    const totalEnvoye = delivery.fullBottlesSent + delivery.emptyBottlesSent;
    const totalRecu =
      (delivery.fullBottlesReturned || 0) + (delivery.emptyBottlesReturned || 0);
    delivery.consignedBottles = Math.max(0, totalEnvoye - totalRecu);

    await delivery.save();

    // Mise à jour du stock si statut terminé
    if (delivery.status.toLowerCase() === "terminée" || delivery.status.toLowerCase() === "terminé") {
      const description = `Retour de la livraison ID ${delivery._id}`;
      await applyStockUpdate2({
        type: "entrée",
        fullBottles: delivery.fullBottlesReturned || 0,
        emptyBottles: delivery.emptyBottlesReturned || 0,
        consignedBottles: delivery.consignedBottles || 0,
        description,
        userId: req.user.id
      });
    }

    await logAction(req.user.id, "Mise à jour partielle de la livraison", "Livraison", delivery.id);

    res.json({
      message: "Livraison mise à jour avec succès",
      livraison: delivery
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



module.exports = { createDelivery, updateDelivery };
