/**
 * ============================================================================
 * MODULE DE BASE DE DONNÉES - SQLite avec better-sqlite3
 * ============================================================================
 * 
 * Ce module centralise la connexion et les opérations de base de données.
 * Il implémente le pattern Singleton pour garantir une seule instance de connexion.
 * 
 * ARCHITECTURE :
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                        APPLICATION                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  API Routes (/api/*)  │  Server Actions  │  Server Components   │
 * ├───────────────────────┴──────────────────┴──────────────────────┤
 * │                      lib/db.ts (ce fichier)                     │
 * │              Couche d'abstraction de la base de données         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                         SQLite (database.sqlite)                 │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * SÉCURITÉ :
 * - Toutes les requêtes utilisent des Prepared Statements
 * - Les données sont validées et sanitisées avant insertion
 * - Le fichier de base de données est stocké en dehors du dossier public
 * 
 * ============================================================================
 */

import Database from 'better-sqlite3';
import path from 'path';

// ============================================================================
// TYPES TypeScript - Définition des structures de données
// ============================================================================

/**
 * Interface représentant un message de contact
 * TypeScript nous aide à maintenir la cohérence des données
 */
export interface Contact {
  id: number;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  personnage_prefere: string | null;
  created_at: string;
}

/**
 * Interface pour les données d'entrée (sans id et created_at)
 * Utilisée lors de la création d'un nouveau contact
 */
export interface ContactInput {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  personnage_prefere?: string;
}

/**
 * Interface pour les résultats de validation
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================================================
// SINGLETON DE BASE DE DONNÉES
// ============================================================================

/**
 * Pattern Singleton : Garantit une seule instance de connexion BDD
 * 
 * Pourquoi un Singleton ?
 * - Évite d'ouvrir plusieurs connexions (performance)
 * - Centralise la gestion de la connexion
 * - Facilite les tests et le debugging
 */
let db: Database.Database | null = null;

/**
 * Obtient l'instance de la base de données
 * Crée la connexion et les tables si nécessaire
 */
export function getDatabase(): Database.Database {
  if (!db) {
    // Chemin vers le fichier de base de données
    // Stocké à la racine du projet, en dehors de /public pour la sécurité
    const dbPath = path.join(process.cwd(), 'database.sqlite');
    
    // Création de la connexion
    db = new Database(dbPath);
    
    // Optimisation SQLite pour de meilleures performances
    db.pragma('journal_mode = WAL'); // Write-Ahead Logging
    
    // Initialisation des tables
    initializeTables(db);
    
    console.log('✅ Base de données SQLite connectée');
  }
  
  return db;
}

/**
 * Initialise les tables de la base de données
 * Utilise IF NOT EXISTS pour éviter les erreurs si la table existe déjà
 */
function initializeTables(database: Database.Database): void {
  /**
   * Table des contacts
   * 
   * Colonnes :
   * - id : Identifiant unique auto-incrémenté
   * - nom : Nom de l'expéditeur (obligatoire)
   * - email : Email de l'expéditeur (obligatoire)
   * - sujet : Sujet du message (obligatoire)
   * - message : Contenu du message (obligatoire)
   * - personnage_prefere : Personnage Marvel préféré (optionnel)
   * - created_at : Date de création automatique
   */
  database.exec(`
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
  
  /**
   * Index sur la colonne email pour accélérer les recherches
   * Les index améliorent les performances des requêtes SELECT avec WHERE
   */
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)
  `);
  
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)
  `);
}

// ============================================================================
// FONCTIONS DE SÉCURITÉ
// ============================================================================

/**
 * Sanitize une chaîne pour prévenir les attaques XSS
 * 
 * XSS (Cross-Site Scripting) :
 * Attaque où un attaquant injecte du code JavaScript malveillant
 * qui sera exécuté dans le navigateur des autres utilisateurs
 * 
 * Exemple d'attaque XSS :
 * Un utilisateur entre comme nom : <script>alert('Hacked!')</script>
 * Sans sanitization, ce script s'exécuterait dans le navigateur
 * 
 * Avec sanitization :
 * <script> devient &lt;script&gt; (affiché comme texte, non exécuté)
 */
export function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/&/g, '&amp;')   // Caractère d'échappement HTML
    .replace(/</g, '&lt;')    // Empêche les balises HTML
    .replace(/>/g, '&gt;')    // Empêche les balises HTML
    .replace(/"/g, '&quot;')  // Empêche la sortie des attributs
    .replace(/'/g, '&#x27;')  // Empêche la sortie des attributs
    .replace(/\//g, '&#x2F;'); // Empêche la fermeture de balises
}

/**
 * Valide le format d'un email
 * Utilise une expression régulière (RegEx)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide les données d'un contact avant insertion
 * 
 * La validation côté serveur est CRUCIALE car :
 * - La validation côté client peut être contournée
 * - Un attaquant peut envoyer des requêtes directement à l'API
 */
export function validateContactInput(data: Partial<ContactInput>): ValidationResult {
  const errors: string[] = [];
  
  // Validation du nom
  if (!data.nom || typeof data.nom !== 'string') {
    errors.push('Le nom est requis');
  } else if (data.nom.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  } else if (data.nom.length > 100) {
    errors.push('Le nom ne peut pas dépasser 100 caractères');
  }
  
  // Validation de l'email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('L\'email est requis');
  } else if (!isValidEmail(data.email)) {
    errors.push('L\'email n\'est pas valide');
  } else if (data.email.length > 255) {
    errors.push('L\'email ne peut pas dépasser 255 caractères');
  }
  
  // Validation du sujet
  if (!data.sujet || typeof data.sujet !== 'string') {
    errors.push('Le sujet est requis');
  } else if (data.sujet.trim().length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  } else if (data.sujet.length > 200) {
    errors.push('Le sujet ne peut pas dépasser 200 caractères');
  }
  
  // Validation du message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Le message est requis');
  } else if (data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  } else if (data.message.length > 5000) {
    errors.push('Le message ne peut pas dépasser 5000 caractères');
  }
  
  // Validation optionnelle du personnage préféré
  if (data.personnage_prefere && data.personnage_prefere.length > 100) {
    errors.push('Le nom du personnage ne peut pas dépasser 100 caractères');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================================================
// OPÉRATIONS CRUD (Create, Read, Update, Delete)
// ============================================================================

/**
 * Crée un nouveau contact dans la base de données
 * 
 * SÉCURITÉ - REQUÊTE PRÉPARÉE (Prepared Statement) :
 * 
 * Pourquoi les requêtes préparées sont essentielles ?
 * 
 * ❌ MAUVAISE PRATIQUE (injection SQL possible) :
 * db.exec(`INSERT INTO contacts VALUES ('${nom}', '${email}')`)
 * 
 * Attaque possible avec nom = "Robert'); DROP TABLE contacts; --"
 * Résultat : La table contacts est supprimée !
 * 
 * ✅ BONNE PRATIQUE (requête préparée) :
 * const stmt = db.prepare('INSERT INTO contacts VALUES (?, ?)');
 * stmt.run(nom, email);
 * 
 * Les valeurs sont traitées comme des DONNÉES, pas du code SQL
 * L'attaque devient inoffensive : stocke littéralement "Robert'); DROP..."
 */
export function createContact(data: ContactInput): Contact {
  const db = getDatabase();
  
  // Sanitization des données
  const sanitizedData = {
    nom: sanitizeInput(data.nom.trim()),
    email: sanitizeInput(data.email.trim().toLowerCase()),
    sujet: sanitizeInput(data.sujet.trim()),
    message: sanitizeInput(data.message.trim()),
    personnage_prefere: data.personnage_prefere 
      ? sanitizeInput(data.personnage_prefere.trim()) 
      : null
  };
  
  /**
   * Requête préparée avec paramètres nommés
   * Les @ désignent des paramètres qui seront remplacés de manière sécurisée
   */
  const stmt = db.prepare(`
    INSERT INTO contacts (nom, email, sujet, message, personnage_prefere)
    VALUES (@nom, @email, @sujet, @message, @personnage_prefere)
  `);
  
  // Exécution de la requête
  const result = stmt.run(sanitizedData);
  
  // Récupération du contact créé avec son ID
  return getContactById(result.lastInsertRowid as number)!;
}

/**
 * Récupère tous les contacts
 * Triés par date de création décroissante (plus récents en premier)
 */
export function getAllContacts(): Contact[] {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT * FROM contacts 
    ORDER BY created_at DESC
  `);
  
  return stmt.all() as Contact[];
}

/**
 * Récupère un contact par son ID
 * 
 * Même pour les SELECT, on utilise des requêtes préparées
 * dès qu'un paramètre utilisateur est impliqué
 */
export function getContactById(id: number): Contact | null {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT * FROM contacts WHERE id = ?');
  const contact = stmt.get(id);
  
  return contact as Contact | null;
}

/**
 * Supprime un contact par son ID
 * Retourne true si le contact a été supprimé, false sinon
 */
export function deleteContact(id: number): boolean {
  const db = getDatabase();
  
  const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
  const result = stmt.run(id);
  
  return result.changes > 0;
}

/**
 * Compte le nombre total de contacts
 */
export function countContacts(): number {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT COUNT(*) as count FROM contacts');
  const result = stmt.get() as { count: number };
  
  return result.count;
}

// ============================================================================
// FERMETURE DE LA CONNEXION
// ============================================================================

/**
 * Ferme proprement la connexion à la base de données
 * À appeler lors de l'arrêt de l'application
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
    console.log('👋 Connexion à la base de données fermée');
  }
}
