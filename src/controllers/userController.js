const User = require("../models/User");

//  Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Ne pas afficher les mots de passe
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Modifier un utilisateur
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        await user.save();
        res.json(user);
        // Après la modification :
        await logAction(req.user.id, "Modification d'un utilisateur", "Utilisateur", user.id);

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        await user.deleteOne();
        res.json({ message: "Utilisateur supprimé avec succès" });

        // Avant suppression :
        await logAction(req.user.id, "Suppression d'un utilisateur", "Utilisateur", user.id);

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { getAllUsers, updateUser, deleteUser };
