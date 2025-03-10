const express = require("express");
const { getStock, updateStock, getStockMovements } = require("../controllers/stockController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getStock); // Voir l'état du stock
router.put("/", protect, restrictTo("admin", "controller"), updateStock); // Modifier le stock
router.get("/movements", protect, getStockMovements); // Voir l'historique des mouvements

module.exports = router;
