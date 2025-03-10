const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalDeliveries: {
        type: Number,
        default: 0
    },
    totalBottlesSold: {
        type: Number,
        default: 0
    },
    totalConsignedBottles: {
        type: Number,
        default: 0
    },
    salaryAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["en attente", "payé"],
        default: "en attente"
    }
}, { timestamps: true });

module.exports = mongoose.model("Salary", SalarySchema);
