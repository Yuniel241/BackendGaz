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
    const { name, email, password, role } = req.body;

    try {
        // Vérifier si c'est le premier utilisateur
        const userCount = await User.countDocuments();

        if (userCount === 0) {
            // Premier utilisateur => ADMIN automatiquement
            const adminUser = await User.create({ name, email, password, role: "admin" });

            return res.status(201).json({
                _id: adminUser.id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
                token: generateToken(adminUser.id),
            });
        }

        // Si ce n'est pas le premier utilisateur, il faut être admin pour créer un compte
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Seul un administrateur peut ajouter un utilisateur." });
        }

        // Vérifier si l'email est déjà utilisé
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // Création de l'utilisateur avec le rôle choisi
        const newUser = await User.create({ name, email, password, role });

        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser.id),
        });
    

        // Après la création de l’utilisateur :
        await logAction(req.user.id, "Ajout d'un nouvel utilisateur", "Utilisateur", newUser.id);
        

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


//  Connexion
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
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
