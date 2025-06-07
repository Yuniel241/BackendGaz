const express = require("express");
const { calculateSalary, getSalaries, paySalary } = require("../controllers/salaryController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, restrictTo("admin","controller"), getSalaries); // Voir tous les salaires
router.post("/calculate/:driverId", protect, restrictTo("admin","controller"), calculateSalary); // Calculer le salaire d’un chauffeur
router.put("/pay/:id", protect, restrictTo("admin","controller"), paySalary); // Marquer un salaire comme payé

module.exports = router;
