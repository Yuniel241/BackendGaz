# 🔧 BackendGaz - API Node.js pour la gestion de gaz

BackendGaz est une API RESTful développée en Node.js avec Express, conçue pour gérer les opérations de distribution de gaz : utilisateurs, commandes, livraisons, stocks, etc.

---

## 📦 Fonctionnalités principales

- 🔐 Authentification JWT
- 👤 Gestion des utilisateurs
- 📦 Gestion des stocks de gaz
- 🧾 Création / modification / suppression de commandes
- 🚚 Suivi des livraisons
- 📊 Statistiques et reporting (à venir)

---

## 🛠️ Technologies utilisées

| Technologie       | Rôle                                 |
|-------------------|--------------------------------------|
| Node.js           | Environnement JavaScript backend     |
| Express.js        | Framework web léger pour API REST    |
| MongoDB + Mongoose| Base de données NoSQL + ODM          |
| JSON Web Token    | Authentification sécurisée           |
| Nodemon           | Rechargement automatique en dev      |
| GitHub Actions    | Intégration continue (CI/CD)         |

---

## ⚙️ Installation & Lancement

```bash
git clone https://github.com/Yuniel241/BackendGaz.git
cd BackendGaz
npm install

# 🔄 Lancer en mode développement (rechargement automatique)
nodemon src/index.js

# 🚀 Lancer en mode production
node src/index.js

# 🌐 L'API sera accessible à l'adresse :
# http://localhost:3000


---

## 📚 Documentation API avec Swagger

La documentation complète de l’API est disponible via Swagger, pour faciliter la découverte et le test des endpoints.

Pour y accéder, démarre le serveur puis ouvre cette URL dans ton navigateur :  
`http://localhost:3000/api-docs`

À quoi ça sert ?  
- Visualiser tous les endpoints disponibles  
- Consulter les schémas des requêtes et réponses  
- Tester directement les appels API depuis l’interface  
- Comprendre les paramètres, types de données et erreurs possibles  

Swagger simplifie grandement l’intégration et le développement côté client ou mobile en fournissant une référence interactive toujours à jour.

---
