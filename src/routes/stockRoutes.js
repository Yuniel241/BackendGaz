const express = require("express");
const { getStock, updateStock, getStockMovements,patchStock } = require("../controllers/stockController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getStock); // Voir l'état du stock
router.put("/", protect, restrictTo( "controller"), updateStock); // Modifier le stock
router.patch("/", protect, restrictTo( "controller"), patchStock);
router.get("/movements", protect, getStockMovements); // Voir l'historique des mouvements

module.exports = router;
