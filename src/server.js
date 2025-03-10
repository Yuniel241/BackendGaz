require('dotenv').config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

const { checkStockLevels } = require("./utils/alertService");

// Vérification du stock automatiquement toutes les 5 minutes
setInterval(checkStockLevels, 5 * 60 * 1000);

