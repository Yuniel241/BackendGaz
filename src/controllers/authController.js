const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { logAction } = require("../middlewares/logMiddleware"); 

//  Génération du token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//  Inscription
const registerUser = async (req, res) => {
    const { name, email, password,role } = req.body;

    try {
        const userCount = await User.countDocuments(); // Vérifie s'il y a déjà des utilisateurs
        const isAdmin = userCount === 0; // 🔥 Le tout premier utilisateur est admin

        // 🔥 Si ce n'est PAS le premier utilisateur, alors la requête doit être faite par un admin
        if (userCount > 0) {
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({ message: "Seul un administrateur peut créer un nouvel utilisateur." });
            }
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }
        //si aucun rôle n'est défini lors de la requête on donne le rôle de driver
        if (role == "") {
            role= "driver"
        }

        const newUser = new User({
            name,
            email,
            password,
            role: isAdmin ? "admin" : role //  Premier utilisateur = admin, les suivants = chauffeur par défaut
        });

        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });

        //  Exécuter le log en arrière-plan
        if (req.user) {
            await logAction(req.user.id, "Ajout d'un nouvel utilisateur", "Utilisateur", newUser.id);
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ message: "Erreur serveur", error });
        }
    }
};




//  Connexion tous sauf les chauffeurs 
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password)) && user.role != "driver") {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            if (user.role == "driver") {
                res.status(401).json({ message: "Les chauffeurs n'ont pas accèss à la plateforme pour l'instant" });
            } else {
                res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

//  Profil utilisateur (protégé)
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
