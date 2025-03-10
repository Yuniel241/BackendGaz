const Notification = require("../models/Notification");

//  Voir toutes les notifications (non lues en priorité)
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ isRead: 1, createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Marquer une notification comme lue
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification non trouvée" });

        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Créer une notification manuellement (par un admin)
const createNotification = async (req, res) => {
    const { type, message } = req.body;

    try {
        const notification = await Notification.create({ type, message });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { getNotifications, markAsRead, createNotification };
