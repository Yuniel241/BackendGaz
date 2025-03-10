const express = require("express");
const { getDashboardStats } = require("../controllers/statsController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, restrictTo("admin", "controller"), getDashboardStats); // Voir les statistiques globales

module.exports = router;
