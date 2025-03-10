const express = require("express");
const { calculateSalary, getSalaries, paySalary } = require("../controllers/salaryController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, restrictTo("admin"), getSalaries); // Voir tous les salaires
router.post("/calculate/:driverId", protect, restrictTo("admin"), calculateSalary); // Calculer le salaire d’un chauffeur
router.put("/pay/:id", protect, restrictTo("admin"), paySalary); // Marquer un salaire comme payé

module.exports = router;
