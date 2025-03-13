const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        const userCount = await User.countDocuments();

        // 🔥 Si aucun utilisateur n'existe, autoriser l'inscription sans token
        if (req.path === "/api/auth/register" && req.method === "POST" && userCount === 0) {
            return next();
        }

        // 🔒 Vérification du token pour toutes les autres requêtes
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Accès non autorisé, utilisateur introuvable" });
        }

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Accès non autorisé, token invalide" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Accès non autorisé, token expiré" });
        } else {
            return res.status(401).json({ message: "Accès non autorisé" });
        }
    }
};



const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé, action réservée aux administrateurs" });
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

