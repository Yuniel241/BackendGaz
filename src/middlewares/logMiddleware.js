const ActionLog = require("../models/ActionLog");

const logAction = async (userId, action, target, targetId = null) => {
    try {
        await ActionLog.create({
            user: userId,
            action,
            target,
            targetId
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du log :", error);
    }
};

module.exports = { logAction };
