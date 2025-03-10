const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck", // 🔥 Référence à un camion existant
        required: true
    },
    fullBottlesSent: {
        type: Number,
        required: true
    },
    emptyBottlesSent: {
        type: Number,
        required: true
    },
    consignedBottles: {
        type: Number,
        default: 0
    },
    fullBottlesReturned: {
        type: Number,
        default: 0
    },
    emptyBottlesReturned: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["en cours", "terminée", "annulée"],
        default: "en cours"
    }
}, { timestamps: true });

module.exports = mongoose.model("Delivery", DeliverySchema);
