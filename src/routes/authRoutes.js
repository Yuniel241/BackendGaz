const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); // 🔥 Supprimer `protect, isAdmin` pour permettre l'inscription du premier utilisateur
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
