const express = require("express");
const { addTruck, getAllTrucks, updateTruck, deleteTruck } = require("../controllers/truckController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, restrictTo("admin"), addTruck); // Ajouter un camion
router.get("/", protect, getAllTrucks); // Voir tous les camions
router.put("/:id", protect, restrictTo("admin"), updateTruck); // Modifier un camion
router.delete("/:id", protect, restrictTo("admin"), deleteTruck); // Supprimer un camion

module.exports = router;
