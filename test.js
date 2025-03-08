require('dotenv').config(); // Charge le fichier .env

const test = process.env.Mongo_URI;
console.log(process.env.Mongo_URI); // Vérifier si l'URI est bien chargé