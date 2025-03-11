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
const authRoutes = require("./routes/authRoutes"); // Importer les routes d'authentification

app.use("/api/auth", authRoutes);

const deliveryRoutes = require("./routes/deliveryRoutes"); // Importer les routes de livraison

app.use("/api/deliveries", deliveryRoutes);

const truckRoutes = require("./routes/truckRoutes");  // Importer les routes de camions

app.use("/api/trucks", truckRoutes);

const userRoutes = require("./routes/userRoutes");  // Importer les routes d'utilisateurs

app.use("/api/users", userRoutes);

const stockRoutes = require("./routes/stockRoutes"); // Importer les routes de stock

app.use("/api/stock", stockRoutes);

const salaryRoutes = require("./routes/salaryRoutes");  // Importer les routes de salaires

app.use("/api/salaries", salaryRoutes);

const statsRoutes = require("./routes/statsRoutes");  // Importer les routes de statistiques

app.use("/api/stats", statsRoutes);

const notificationRoutes = require("./routes/notificationRoutes"); // Importer les routes de notifications

app.use("/api/notifications", notificationRoutes);

const logRoutes = require("./routes/logRoutes"); // Importer les routes des log

app.use("/api/logs", logRoutes);

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerDocs");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));





module.exports = app;
