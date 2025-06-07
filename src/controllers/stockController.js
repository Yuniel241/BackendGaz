const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");
const { logAction } = require("../middlewares/logMiddleware"); 

//  Voir l'état du stock
const getStock = async (req, res) => {
    try {
        let stock = await Stock.findOne();
        if (!stock) {
            stock = await Stock.create({});
        }
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Modifier le stock (ajouter ou retirer des bouteilles)
const updateStock = async (req, res) => {
    const {
        fullBottles = 0,
        emptyBottles = 0,
        consignedBottles = 0,
        type,
        description = ""
    } = req.body;

    try {
        let stock = await Stock.findOne();
        if (!stock) {
            stock = await Stock.create({});
        }

        if (type === "entrée") {
            stock.fullBottles += fullBottles;
            stock.emptyBottles += emptyBottles;
            // On ne touche pas aux bouteilles consignées ici (optionnel)
        } else if (type === "sortie") {
            // Vérification des limites
            if (stock.fullBottles < fullBottles || stock.emptyBottles < emptyBottles) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }

            stock.fullBottles -= fullBottles;
            stock.emptyBottles -= emptyBottles;
            stock.consignedBottles += consignedBottles;
        } else {
            return res.status(400).json({ message: "Type de mouvement invalide (entrée ou sortie requis)" });
        }

        await stock.save();

        // Enregistrement du mouvement
        await StockMovement.create({
            type,
            fullBottles,
            emptyBottles,
            consignedBottles,
            description,
            user: req.user.id
        });

        await logAction(req.user.id, `Modification du stock (${type})`, "Stock");

        res.status(200).json({
            message: "Stock mis à jour avec succès",
            stock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


// Fonction utilitaire réutilisable
const applyStockUpdate = async ({
  type,
  fullBottles = 0,
  emptyBottles = 0,
  consignedBottles = 0,
  description = "",
  userId
}) => {
  let stock = await Stock.findOne();
  if (!stock) {
    stock = await Stock.create({});
  }

  if (type === "entrée") {
    stock.fullBottles += fullBottles;
    stock.emptyBottles += emptyBottles;
  } else if (type === "sortie") {
    if (stock.fullBottles < fullBottles || stock.emptyBottles < emptyBottles) {
      throw new Error("Stock insuffisant");
    }
    stock.fullBottles -= fullBottles;
    stock.emptyBottles -= emptyBottles;
    stock.consignedBottles += consignedBottles;
  } else {
    throw new Error("Type de mouvement invalide");
  }

  await stock.save();

  await StockMovement.create({
    type,
    fullBottles,
    emptyBottles,
    consignedBottles,
    description,
    user: userId
  });

  await logAction(userId, `Modification du stock (${type})`, "Stock");

  return stock;
};

const applyStockUpdate2 = async ({
  type,
  fullBottles = 0,
  emptyBottles = 0,
  consignedBottles = 0,
  description = "",
  userId,
}) => {
  let stock = await Stock.findOne();
  if (!stock) stock = await Stock.create({});

  if (type === "entrée") {
    stock.fullBottles += fullBottles;
    stock.emptyBottles += emptyBottles;
    stock.consignedBottles += consignedBottles;
  } else {
    throw new Error("Seules les entrées sont valides ici.");
  }

  await stock.save();

  await StockMovement.create({
    type,
    fullBottles,
    emptyBottles,
    consignedBottles,
    description,
    user: userId,
  });

  await logAction(userId, `Retour de livraison : ${description}`, "Stock");
};




// PATCH : Ajout partiel au stock (ajustement relatif)
const patchStock = async (req, res) => {
    const { fullBottles = 0, emptyBottles = 0, consignedBottles = 0 } = req.body;

    try {
        let stock = await Stock.findOne();
        if (!stock) {
            stock = await Stock.create({});
        }

        // 🔧 Ajout des quantités reçues
        stock.fullBottles += fullBottles;
        stock.emptyBottles += emptyBottles;
        stock.consignedBottles += consignedBottles;

        await stock.save();

        // Enregistrer dans le journal
        await logAction(
            req.user.id,
            `Ajustement relatif du stock (pleines: +${fullBottles}, vides: +${emptyBottles}, consignées: +${consignedBottles})`,
            "Stock"
        );

        res.json({
            message: "Stock mis à jour ",
            stock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};



//  Voir l'historique des mouvements de stock
const getStockMovements = async (req, res) => {
    try {
        const movements = await StockMovement.find().populate("user", "name email");
        res.json(movements);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { getStock, updateStock, getStockMovements,patchStock,applyStockUpdate,applyStockUpdate2 };
