/**
 * ============================================================================
 * SERVEUR EXPRESS - ARCHITECTURE CLIENT-SERVEUR
 * ============================================================================
 * 
 * Ce fichier représente la couche SERVEUR de l'architecture Client-Serveur.
 * 
 * ARCHITECTURE CLIENT-SERVEUR :
 * ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
 * │     CLIENT      │  HTTP   │     SERVEUR     │   SQL   │  BASE DE DONNÉES│
 * │   (Browser)     │ ──────> │   (Node.js)     │ ──────> │    (SQLite)     │
 * │   React/Next.js │ <────── │   Express.js    │ <────── │                 │
 * └─────────────────┘         └─────────────────┘         └─────────────────┘
 * 
 * FLUX DE DONNÉES :
 * 1. Le CLIENT envoie une requête HTTP (GET, POST, etc.)
 * 2. Le SERVEUR reçoit et traite la requête
 * 3. Le SERVEUR interagit avec la BASE DE DONNÉES si nécessaire
 * 4. Le SERVEUR renvoie une réponse au CLIENT
 * 
 * SÉCURITÉ IMPLÉMENTÉE :
 * - Requêtes préparées (Prepared Statements) pour prévenir les injections SQL
 * - Validation et sanitization des entrées pour prévenir les failles XSS
 * - Headers de sécurité avec Helmet
 * - Protection CORS configurée
 * 
 * NOTE: Ce fichier est fourni à titre éducatif. Dans Next.js, on utilise
 * généralement les API Routes intégrées (voir /app/api/) plutôt qu'un
 * serveur Express séparé.
 * 
 * Pour exécuter ce serveur standalone : node server.js
 * ============================================================================
 */

const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

// ============================================================================
// INITIALISATION DU SERVEUR EXPRESS
// ============================================================================

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================================================
// MIDDLEWARES - Fonctions exécutées avant chaque requête
// ============================================================================

/**
 * MIDDLEWARE CORS (Cross-Origin Resource Sharing)
 * Permet au frontend de communiquer avec le backend
 * Sans CORS, le navigateur bloquerait les requêtes cross-origin pour des raisons de sécurité
 * 
 * NOTE: En production, remplacez '*' par l'URL exacte de votre frontend
 */
app.use(cors({
  origin: '*',                     // Autorise toutes les origines (dev uniquement!)
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Méthodes HTTP autorisées
  credentials: false               // Désactivé car origin est '*'
}));

/**
 * MIDDLEWARE JSON Parser
 * Parse automatiquement le body des requêtes JSON
 * Transforme req.body en objet JavaScript utilisable
 */
app.use(express.json());

/**
 * MIDDLEWARE de Sécurité - Headers HTTP
 * Ajoute des headers de sécurité à chaque réponse
 */
app.use((req, res, next) => {
  // Empêche le navigateur d'interpréter le contenu différemment du Content-Type
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Protection contre le clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Active le filtre XSS du navigateur
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ============================================================================
// INITIALISATION DE LA BASE DE DONNÉES SQLite
// ============================================================================

/**
 * SQLite est une base de données légère stockée dans un fichier
 * Idéale pour le développement et les petites applications
 * 
 * better-sqlite3 est un driver synchrone performant pour Node.js
 */
const db = new Database(path.join(__dirname, 'database.sqlite'), {
  verbose: console.log // Log toutes les requêtes SQL (utile pour le debug)
});

/**
 * Création de la table 'contacts' si elle n'existe pas
 * 
 * SÉCURITÉ : La structure de la table définit les types de données
 * ce qui ajoute une couche de validation au niveau de la BDD
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    sujet TEXT NOT NULL,
    message TEXT NOT NULL,
    personnage_prefere TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Base de données SQLite initialisée');

// ============================================================================
// FONCTIONS DE VALIDATION ET SANITIZATION
// ============================================================================

/**
 * Fonction de sanitization pour prévenir les attaques XSS
 * (Cross-Site Scripting)
 * 
 * XSS : Injection de code JavaScript malveillant via les entrées utilisateur
 * 
 * Cette fonction échappe les caractères HTML dangereux :
 * - < et > : Empêche l'injection de balises HTML/Script
 * - & : Caractère d'échappement HTML
 * - " et ' : Empêche la sortie des attributs HTML
 * 
 * @param {string} str - Chaîne à nettoyer
 * @returns {string} - Chaîne sécurisée
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')   // & -> &amp;
    .replace(/</g, '&lt;')    // < -> &lt;
    .replace(/>/g, '&gt;')    // > -> &gt;
    .replace(/"/g, '&quot;')  // " -> &quot;
    .replace(/'/g, '&#x27;'); // ' -> &#x27;
}

/**
 * Validation d'email avec expression régulière
 * 
 * @param {string} email - Email à valider
 * @returns {boolean} - true si l'email est valide
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validation complète des données du formulaire
 * 
 * @param {Object} data - Données à valider
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
function validateContactData(data) {
  const errors = [];

  if (!data.nom || data.nom.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Email invalide');
  }
  if (!data.sujet || data.sujet.trim().length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================================================
// ROUTES API - Points d'entrée HTTP
// ============================================================================

/**
 * ROUTE POST /api/contacts
 * 
 * Reçoit les données du formulaire de contact et les enregistre en BDD
 * 
 * FLUX :
 * 1. Réception des données JSON du client
 * 2. Validation des données
 * 3. Sanitization pour prévenir XSS
 * 4. Insertion en BDD avec requête préparée (prévient SQL Injection)
 * 5. Réponse au client
 */
app.post('/api/contacts', (req, res) => {
  try {
    const { nom, email, sujet, message, personnage_prefere } = req.body;

    // Étape 1 : Validation des données
    const validation = validateContactData({ nom, email, sujet, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: validation.errors
      });
    }

    // Étape 2 : Sanitization - Nettoyage des entrées pour prévenir XSS
    const sanitizedData = {
      nom: sanitizeInput(nom.trim()),
      email: sanitizeInput(email.trim().toLowerCase()),
      sujet: sanitizeInput(sujet.trim()),
      message: sanitizeInput(message.trim()),
      personnage_prefere: personnage_prefere ? sanitizeInput(personnage_prefere.trim()) : null
    };

    /**
     * Étape 3 : REQUÊTE PRÉPARÉE (Prepared Statement)
     * 
     * SÉCURITÉ CRUCIALE contre les injections SQL !
     * 
     * MAUVAISE PRATIQUE (vulnérable) :
     * db.exec(`INSERT INTO contacts VALUES ('${nom}', '${email}')`)
     * 
     * Un attaquant pourrait entrer comme nom :
     * "Robert'); DROP TABLE contacts; --"
     * Ce qui exécuterait : DROP TABLE contacts (suppression de la table!)
     * 
     * BONNE PRATIQUE (sécurisée) :
     * Les paramètres (?) sont traités comme des DONNÉES, pas du code SQL
     * Le driver échappe automatiquement les caractères dangereux
     */
    const stmt = db.prepare(`
      INSERT INTO contacts (nom, email, sujet, message, personnage_prefere)
      VALUES (?, ?, ?, ?, ?)
    `);

    // Exécution de la requête préparée avec les valeurs sanitisées
    const result = stmt.run(
      sanitizedData.nom,
      sanitizedData.email,
      sanitizedData.sujet,
      sanitizedData.message,
      sanitizedData.personnage_prefere
    );

    // Étape 4 : Réponse au client
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        id: result.lastInsertRowid,
        ...sanitizedData,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'insertion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * ROUTE GET /api/contacts
 * 
 * Récupère tous les messages de contact (pour un panneau admin par exemple)
 * 
 * SÉCURITÉ : Dans une vraie application, cette route devrait être protégée
 * par une authentification (JWT, session, etc.)
 */
app.get('/api/contacts', (req, res) => {
  try {
    /**
     * Requête préparée pour la lecture
     * Même pour les SELECT, on utilise des requêtes préparées
     * si des paramètres utilisateur sont impliqués
     */
    const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    const contacts = stmt.all();

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });

  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * ROUTE GET /api/contacts/:id
 * 
 * Récupère un message spécifique par son ID
 * Démontre l'utilisation de paramètres dans les requêtes préparées
 */
app.get('/api/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validation : l'ID doit être un nombre
    if (isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID invalide'
      });
    }

    /**
     * Requête préparée avec paramètre
     * Le ? sera remplacé par la valeur de id de manière sécurisée
     */
    const stmt = db.prepare('SELECT * FROM contacts WHERE id = ?');
    const contact = stmt.get(parseInt(id));

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * ROUTE de santé - Vérifie que le serveur fonctionne
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'SQLite connected'
  });
});

// ============================================================================
// DÉMARRAGE DU SERVEUR
// ============================================================================

app.listen(PORT, () => {
  console.log(`
  ============================================
  🚀 Serveur Express démarré !
  ============================================
  
  URL: http://localhost:${PORT}
  
  Routes disponibles :
  - GET  /api/health     : Vérifier l'état du serveur
  - GET  /api/contacts   : Lister tous les messages
  - GET  /api/contacts/:id : Récupérer un message
  - POST /api/contacts   : Créer un nouveau message
  
  ============================================
  `);
});

// Gestion propre de la fermeture
process.on('SIGINT', () => {
  db.close();
  console.log('\n👋 Serveur arrêté proprement');
  process.exit(0);
});
