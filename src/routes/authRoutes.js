const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", protect, isAdmin, registerUser); // Inscription
router.post("/login", loginUser); // Connexion
router.get("/profile", protect, getUserProfile); // Profil utilisateur (protégé)

module.exports = router;
