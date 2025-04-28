const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", protect, registerUser); // 🔒 Seul un admin peut créer des utilisateurs après le premier
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
