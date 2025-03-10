const Notification = require("../models/Notification");
const Stock = require("../models/Stock");

//  Vérifier le stock et générer une alerte si le stock est bas
const checkStockLevels = async () => {
    try {
        const stock = await Stock.findOne();
        if (stock && stock.fullBottles < 50) {
            await Notification.create({
                type: "stock",
                message: `Attention : Stock bas, seulement ${stock.fullBottles} bouteilles pleines restantes !`
            });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du stock :", error);
    }
};

module.exports = { checkStockLevels };
