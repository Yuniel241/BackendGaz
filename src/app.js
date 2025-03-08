require('dotenv').config(); // Charge le fichier .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares

app.use(express.json()); 
app.use(cors());

app.get("/", (req, res) => {
    res.send("API de gestion de gaz en fonctionnement !");
});

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


module.exports = app;
