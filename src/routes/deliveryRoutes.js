const express = require("express");
const { createDelivery, updateDelivery } = require("../controllers/deliveryController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, restrictTo("controller"), createDelivery);
router.patch("/:id", protect, restrictTo("controller"), updateDelivery);

module.exports = router;
