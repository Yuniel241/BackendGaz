const express = require("express");
const { getLogs } = require("../controllers/logController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, restrictTo("admin"), getLogs); // Voir l'historique des actions

module.exports = router;
