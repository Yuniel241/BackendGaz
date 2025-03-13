require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

connectDB(); // Connexion à MongoDB

function countDocuments() {
    return User.countDocuments(); // Retourne une Promise
}

countDocuments()
    .then(count => {
        if (count > 0) {
            console.log(`La collection contient ${count} documents.`);
        } else {
            console.log("La collection est vide.");
        }
    })
    .catch(error => console.error("Erreur :", error));



