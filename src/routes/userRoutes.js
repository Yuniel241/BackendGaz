const express = require("express");
const { getAllUsers, updateUser, deleteUser } = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, restrictTo("admin"), getAllUsers); // Voir tous les utilisateurs
router.put("/:id", protect, restrictTo("admin"), updateUser); // Modifier un utilisateur
router.delete("/:id", protect, restrictTo("admin"), deleteUser); // Supprimer un utilisateur

module.exports = router;
