const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    fullBottles: {
        type: Number,
        required: true,
        default: 0
    },
    emptyBottles: {
        type: Number,
        required: true,
        default: 0
    },
    consignedBottles: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Stock", StockSchema);
