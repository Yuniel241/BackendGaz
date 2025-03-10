const ActionLog = require("../models/ActionLog");

//  Voir l’historique des actions
const getLogs = async (req, res) => {
    try {
        const logs = await ActionLog.find().populate("user", "name email").sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { getLogs };
