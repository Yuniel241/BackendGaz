/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Routes d'authentification et gestion des utilisateurs
 *   - name: Users
 *     description: Gestion des utilisateurs (admin uniquement)
 *   - name: Trucks
 *     description: Gestion des camions (admin uniquement)
 *   - name: Deliveries
 *     description: Gestion des livraisons
 *   - name: Stock
 *     description: Gestion du stock et des mouvements de bouteilles
 *   - name: Salaries
 *     description: Gestion des salaires des chauffeurs
 *   - name: Stats
 *     description: Statistiques et tableau de bord
 *   - name: Notifications
 *     description: Notifications et alertes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un utilisateur
 *     description: Le premier utilisateur enregistré devient automatiquement admin. Les suivants doivent être créés par un admin.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 example: "jean@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Permet aux utilisateurs de se connecter avec email et mot de passe.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jean@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token JWT
 *       401:
 *         description: Identifiants incorrects
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Voir tous les utilisateurs
 *     description: Permet à un administrateur de voir tous les utilisateurs enregistrés.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []  #  Ajoute l'authentification JWT
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       403:
 *         description: Accès refusé si l'utilisateur n'est pas admin
 */



/**
 * @swagger
 * /api/trucks:
 *   post:
 *     summary: Ajouter un camion
 *     description: Seuls les admins peuvent ajouter un camion.
 *     tags: [Trucks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - licensePlate
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Camion 1"
 *               licensePlate:
 *                 type: string
 *                 example: "AB-123-CD"
 *               capacity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Camion ajouté avec succès
 *       403:
 *         description: Accès refusé si l'utilisateur n'est pas admin
 */

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Enregistrer une livraison
 *     description: Seuls les administrateurs et contrôleurs peuvent enregistrer une livraison.
 *     tags: [Deliveries]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - driver
 *               - truck
 *               - fullBottlesSent
 *               - emptyBottlesSent
 *             properties:
 *               driver:
 *                 type: string
 *                 example: "6523b6f5e6a3b8d2a1c9e90e"
 *               truck:
 *                 type: string
 *                 example: "6534b6a9e9a3b8d2a1c9e90e"
 *               fullBottlesSent:
 *                 type: number
 *                 example: 50
 *               emptyBottlesSent:
 *                 type: number
 *                 example: 20
 *     responses:
 *       201:
 *         description: Livraison enregistrée avec succès
 *       403:
 *         description: Accès refusé si l'utilisateur n'est pas admin ou contrôleur
 */

/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: Voir l'état du stock
 *     description: Permet de récupérer l'état actuel du stock (bouteilles pleines, vides et consignées).
 *     tags: [Stock]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Stock récupéré avec succès
 *       401:
 *         description: Accès non autorisé
 */

/**
 * @swagger
 * /api/salaries:
 *   get:
 *     summary: Voir les salaires des chauffeurs
 *     description: Permet à un administrateur de voir les salaires calculés pour les chauffeurs.
 *     tags: [Salaries]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des salaires récupérée avec succès
 *       403:
 *         description: Accès refusé si l'utilisateur n'est pas admin
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Voir les statistiques générales
 *     description: Permet aux administrateurs et contrôleurs de voir les statistiques globales.
 *     tags: [Stats]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *       403:
 *         description: Accès refusé si l'utilisateur n'est pas admin ou contrôleur
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Voir les notifications
 *     description: Permet de récupérer toutes les notifications du système.
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications récupérée avec succès
 */