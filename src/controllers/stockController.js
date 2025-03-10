const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");

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
    const { fullBottles, emptyBottles, consignedBottles, type, description } = req.body;

    try {
        let stock = await Stock.findOne();
        if (!stock) {
            stock = await Stock.create({});
        }

        // Mettre à jour les quantités
        if (type === "entrée") {
            stock.fullBottles += fullBottles || 0;
            stock.emptyBottles += emptyBottles || 0;
        } else if (type === "sortie") {
            if (stock.fullBottles < fullBottles || stock.emptyBottles < emptyBottles) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }
            stock.fullBottles -= fullBottles || 0;
            stock.emptyBottles -= emptyBottles || 0;
            stock.consignedBottles += consignedBottles || 0;
        }

        await stock.save();

        // Ajouter au journal des mouvements
        await StockMovement.create({
            type,
            fullBottles,
            emptyBottles,
            consignedBottles,
            description,
            user: req.user.id
        });

        // Après la mise à jour du stock :
        await logAction(req.user.id, `Modification du stock (${type})`, "Stock");


        res.json(stock);
    } catch (error) {
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

module.exports = { getStock, updateStock, getStockMovements };
