const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestion des Livraisons de Gaz",
            version: "Version bêta",
            description: "Documentation complète de l'API"
        },
        servers: [
            { url: "http://localhost:5000", description: "Serveur local" }
        ],
        components: {  // 🔥 Ajout de l'authentification JWT pour Swagger
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ajoutez votre token JWT ici pour tester les routes protégées."
                }
            }
        }
    },
    apis: ["./src/docs/routesDocs.js"] // 📜 Les fichiers contenant la documentation des routes
};

module.exports = options;


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

