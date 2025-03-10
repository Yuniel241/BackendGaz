const Truck = require("../models/Truck");

//  Ajouter un camion
const addTruck = async (req, res) => {
    const { name, licensePlate, capacity } = req.body;

    try {
        const truckExists = await Truck.findOne({ licensePlate });
        if (truckExists) return res.status(400).json({ message: "Ce camion existe déjà." });

        const truck = await Truck.create({ name, licensePlate, capacity });
        res.status(201).json(truck);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Récupérer tous les camions
const getAllTrucks = async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.json(trucks);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Mettre à jour un camion
const updateTruck = async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id);
        if (!truck) return res.status(404).json({ message: "Camion non trouvé" });

        truck.name = req.body.name || truck.name;
        truck.licensePlate = req.body.licensePlate || truck.licensePlate;
        truck.capacity = req.body.capacity || truck.capacity;
        truck.status = req.body.status || truck.status;

        await truck.save();
        res.json(truck);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Supprimer un camion
const deleteTruck = async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id);
        if (!truck) return res.status(404).json({ message: "Camion non trouvé" });

        await truck.deleteOne();
        res.json({ message: "Camion supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { addTruck, getAllTrucks, updateTruck, deleteTruck };
