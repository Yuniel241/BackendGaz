const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    //  Permettre l'inscription du premier utilisateur sans token
    if (req.path === "/api/auth/register") {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            return next(); // Autoriser la requête si aucun utilisateur n'existe
        }
    }

    // Vérification du token pour les autres routes
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Accès non autorisé, token invalide" });
    }
};

const isAdmin = (req, res, next) => { // Vérifier si l'utilisateur est administrateur
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé : vous devez être administrateur." });
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé : vous n'avez pas les permissions nécessaires." });
        }
        next();
    };
};

module.exports = { protect, isAdmin, restrictTo };

