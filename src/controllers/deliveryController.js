const Delivery = require("../models/Delivery");

//  Création d'une livraison
const createDelivery = async (req, res) => {
    const { driver, truck, fullBottlesSent, emptyBottlesSent, consignedBottles } = req.body;

    try {
        const delivery = await Delivery.create({
            driver,
            truck,
            fullBottlesSent,
            emptyBottlesSent,
            consignedBottles
        });

        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Mise à jour des bouteilles retournées
const updateDelivery = async (req, res) => {
    const { fullBottlesReturned, emptyBottlesReturned } = req.body;

    try {
        const delivery = await Delivery.findById(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: "Livraison non trouvée" });
        }

        delivery.fullBottlesReturned = fullBottlesReturned;
        delivery.emptyBottlesReturned = emptyBottlesReturned;
        delivery.status = "terminée";

        await delivery.save();
        res.json(delivery);
        // Après mise à jour de la livraison :
        await logAction(req.user.id, "Mise à jour d'une livraison", "Livraison", delivery.id);

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { createDelivery, updateDelivery };
