const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["entrée", "sortie"],
        required: true
    },
    fullBottles: {
        type: Number,
        default: 0
    },
    emptyBottles: {
        type: Number,
        default: 0
    },
    consignedBottles: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("StockMovement", StockMovementSchema);
