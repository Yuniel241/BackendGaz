const express = require("express");
const { createDelivery, updateDelivery } = require("../controllers/deliveryController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, restrictTo("admin", "controller"), createDelivery);
router.put("/:id", protect, restrictTo("controller"), updateDelivery);

module.exports = router;
