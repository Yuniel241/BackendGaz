const Delivery = require("../models/Delivery");
const Salary = require("../models/Salary");
const User = require("../models/User");

//  Calculer le salaire d'un chauffeur
const calculateSalary = async (req, res) => {
    const { driverId } = req.params;
    const BOTTLE_PRICE = 10; // Prix par bouteille vendue
    const BONUS_CONSIGNED = 2; // Bonus pour bouteille consignée

    try {
        const driver = await User.findById(driverId);
        if (!driver || driver.role !== "driver") {
            return res.status(400).json({ message: "Ce chauffeur n'existe pas." });
        }

        // Récupérer toutes les livraisons du chauffeur
        const deliveries = await Delivery.find({ driver: driverId, status: "terminée" });

        // Calcul du total des bouteilles vendues
        let totalBottlesSold = 0;
        let totalConsignedBottles = 0;

        deliveries.forEach((delivery) => {
            totalBottlesSold += delivery.fullBottlesSent - delivery.fullBottlesReturned;
            totalConsignedBottles += delivery.consignedBottles;
        });

        // Calcul du salaire
        const salaryAmount = (totalBottlesSold * BOTTLE_PRICE) + (totalConsignedBottles * BONUS_CONSIGNED);

        // Enregistrer le salaire
        const salary = await Salary.create({
            driver: driverId,
            totalDeliveries: deliveries.length,
            totalBottlesSold,
            totalConsignedBottles,
            salaryAmount
        });

        res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Voir tous les salaires
const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate("driver", "name email");
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Payer un salaire
const paySalary = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) return res.status(404).json({ message: "Salaire non trouvé" });

        salary.status = "payé";
        await salary.save();
        res.json(salary);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { calculateSalary, getSalaries, paySalary };
