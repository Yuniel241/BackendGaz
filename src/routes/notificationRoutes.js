const express = require("express");
const { getNotifications, markAsRead, createNotification } = require("../controllers/notificationController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getNotifications); // Voir toutes les notifications
router.put("/:id", protect, markAsRead); // Marquer une notification comme lue
router.post("/", protect, restrictTo("admin"), createNotification); // Créer une alerte manuellement

module.exports = router;
