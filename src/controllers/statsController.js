const User = require("../models/User");
const Delivery = require("../models/Delivery");
const Truck = require("../models/Truck");
const Stock = require("../models/Stock");
const Salary = require("../models/Salary");

//  Récupérer les statistiques globales
const getDashboardStats = async (req, res) => {
    try {
        // Nombre total d'utilisateurs
        const totalUsers = await User.countDocuments();

        // Nombre de chauffeurs
        const totalDrivers = await User.countDocuments({ role: "driver" });

        // Nombre de livraisons terminées
        const totalDeliveries = await Delivery.countDocuments({ status: "terminée" });

        // Nombre de camions disponibles
        const totalTrucks = await Truck.countDocuments({ status: "disponible" });

        // État actuel du stock
        const stock = await Stock.findOne() || { fullBottles: 0, emptyBottles: 0, consignedBottles: 0 };

        // Montant total des salaires en attente de paiement
        const totalSalariesPending = await Salary.aggregate([
            { $match: { status: "en attente" } },
            { $group: { _id: null, totalAmount: { $sum: "$salaryAmount" } } }
        ]);

        res.json({
            totalUsers,
            totalDrivers,
            totalDeliveries,
            totalTrucks,
            stock,
            totalSalariesPending: totalSalariesPending[0]?.totalAmount || 0
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { getDashboardStats };
