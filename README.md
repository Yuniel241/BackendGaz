# 🔧 BackendGaz - API Node.js pour la gestion de gaz

BackendGaz est une API RESTful développée en Node.js avec Express, conçue pour gérer les opérations de distribution de gaz : utilisateurs, livraisons, stocks, etc.

---

## 📦 Fonctionnalités principales

- 🔐 Authentification JWT
- 👤 Gestion des utilisateurs
- 📦 Gestion des stocks de gaz
- 🧾 Création / modification / suppression de commandes
- 🚚 Suivi des livraisons

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
# http://localhost:5000

```
---



## 📚 Documentation API


```bash
Base URL: http://localhost:5000/api
```


## 🔐 Middleware liés à l'authentification

| Middleware          | Description                          |
|---------------------|--------------------------------------|
| protect             | protect	Protège les routes. Vérifie et décode le token JWT. Autorise aussi l'inscription du tout premier utilisateur sans authentification.|
| isAdmin             | Vérifie que l'utilisateur est un administrateur.    |
| restrictTo(...roles)| Permet d’autoriser l’accès à certaines routes uniquement à certains rôles définis.         |
	



## 📌 POST /api/auth/register

🔧 Description :
Crée un nouvel utilisateur.
Le premier utilisateur créé devient administrateur automatiquement. Ensuite, seuls les admins peuvent en créer d'autres.

🛡️ Protection :
Ouvert sans token si aucun utilisateur n'existe.
Protégé par protect ensuite.

📥 Corps de la requête :

```json
{
  "name": "Nom Complet",
  "email": "exemple@email.com",
  "password": "MotDePasseFort123",
  "role": "admin" // facultatif, sinon "driver" par défaut
}
```
✅ Réponse :
```json
{
  "message": "Utilisateur créé avec succès",
  "user": {
        "name": "Nom Complet",
        "email": "exemple@email.com",
        "password": "$2b$10$2H4qUmb0/I...",
        "role": "admin",
        "_id": "68449a7efaccd886e6d9379f",
        "createdAt": "2025-06-07T20:01:02.631Z",
        "updatedAt": "2025-06-07T20:01:02.631Z",
  }
}
```
🔴 Erreurs possibles :
400 : Email déjà utilisé
403 : Seuls les admins peuvent créer de nouveaux utilisateurs
500 : Erreur serveur

## 📌 POST /api/auth/login
🔧 Description :
Connexion utilisateur (sauf le rôle driver).

📥 Corps de la requête :
```json
{
  "email": "exemple@email.com",
  "password": "MotDePasseFort123"
}
```
✅ Réponse :
```json
{
  "_id": "id_utilisateur",
  "name": "Nom",
  "email": "exemple@email.com",
  "role": "admin",
  "token": "jwt_token"
}
```
🔴 Erreurs possibles :
401 : Email ou mot de passe incorrect
401 : Les chauffeurs ne peuvent pas se connecter

## 📌 GET /api/auth/profile
🔧 Description :
Récupère les informations du profil de l’utilisateur actuellement connecté.

🛡️ Protection :
protect

✅ Réponse :
```json
{
  "_id": "id_utilisateur",
  "name": "Nom",
  "email": "email@email.com",
  "role": "admin"
}
```
🔴 Erreurs possibles :
401 : Token absent, invalide ou expiré
404 : Utilisateur non trouvé

