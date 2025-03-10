const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du camion est obligatoire"],
        unique: true
    },
    licensePlate: {
        type: String,
        required: [true, "Le numéro de plaque est obligatoire"],
        unique: true
    },
    capacity: {
        type: Number,
        required: [true, "La capacité du camion est obligatoire"]
    },
    status: {
        type: String,
        enum: ["disponible", "en livraison", "en maintenance"],
        default: "disponible"
    }
}, { timestamps: true });

module.exports = mongoose.model("Truck", TruckSchema);
