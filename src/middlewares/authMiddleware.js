const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => { // Vérifier si l'utilisateur est connecté
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Accès non autorisé, token invalide" });
        }
    } else {
        res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
    }
};

const isAdmin = (req, res, next) => { // Vérifier si l'utilisateur est administrateur
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé : vous devez être administrateur." });
    }
};

module.exports = { protect, isAdmin };


module.exports = { protect };
