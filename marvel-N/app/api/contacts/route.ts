/**
 * ============================================================================
 * API ROUTE - /api/contacts
 * ============================================================================
 * 
 * Ce fichier définit les endpoints API pour gérer les contacts.
 * Dans Next.js App Router, les fichiers route.ts dans /app/api/ créent
 * automatiquement des endpoints HTTP.
 * 
 * ARCHITECTURE REST :
 * - GET  /api/contacts : Récupère tous les contacts
 * - POST /api/contacts : Crée un nouveau contact
 * 
 * FLUX DE DONNÉES (POST) :
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │     CLIENT      │    │    SERVEUR      │    │   DATABASE      │
 * │   (Browser)     │    │   (Next.js)     │    │   (SQLite)      │
 * └────────┬────────┘    └────────┬────────┘    └────────┬────────┘
 *          │                      │                      │
 *          │  1. POST /api/contacts                      │
 *          │  (JSON body)         │                      │
 *          │─────────────────────>│                      │
 *          │                      │                      │
 *          │                      │  2. Validation       │
 *          │                      │  3. Sanitization     │
 *          │                      │                      │
 *          │                      │  4. INSERT (prepared)│
 *          │                      │─────────────────────>│
 *          │                      │                      │
 *          │                      │  5. Résultat         │
 *          │                      │<─────────────────────│
 *          │                      │                      │
 *          │  6. JSON Response    │                      │
 *          │<─────────────────────│                      │
 *          │                      │                      │
 * 
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  createContact, 
  getAllContacts, 
  validateContactInput,
  type ContactInput 
} from '@/lib/db';

// ============================================================================
// GET /api/contacts - Récupérer tous les contacts
// ============================================================================

/**
 * Handler pour les requêtes GET
 * 
 * Cette fonction est exportée et sera automatiquement appelée
 * par Next.js lorsqu'une requête GET arrive sur /api/contacts
 * 
 * SÉCURITÉ : Dans une application de production, cette route devrait
 * être protégée par une authentification (vérifier que l'utilisateur
 * est admin avant de renvoyer les contacts)
 */
export async function GET() {
  try {
    // Récupération de tous les contacts depuis la BDD
    const contacts = getAllContacts();
    
    /**
     * NextResponse.json() crée une réponse HTTP avec :
     * - Content-Type: application/json
     * - Body : Les données sérialisées en JSON
     */
    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
    
  } catch (error) {
    /**
     * Gestion des erreurs :
     * - Log côté serveur pour le debugging
     * - Message générique côté client (ne pas exposer les détails techniques)
     */
    console.error('Erreur GET /api/contacts:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des contacts'
      },
      { status: 500 } // Internal Server Error
    );
  }
}

// ============================================================================
// POST /api/contacts - Créer un nouveau contact
// ============================================================================

/**
 * Handler pour les requêtes POST
 * 
 * Reçoit les données du formulaire de contact et les enregistre en BDD
 * après validation et sanitization
 * 
 * @param request - L'objet NextRequest contenant les données de la requête
 */
export async function POST(request: NextRequest) {
  try {
    /**
     * Étape 1 : Extraction des données JSON du body de la requête
     * 
     * Le client envoie les données avec :
     * fetch('/api/contacts', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ nom, email, sujet, message })
     * })
     */
    const body = await request.json();
    
    /**
     * Étape 2 : Validation des données
     * 
     * IMPORTANT : La validation côté serveur est OBLIGATOIRE
     * car la validation côté client peut être contournée
     * 
     * Un attaquant peut :
     * - Désactiver JavaScript
     * - Modifier le HTML du formulaire
     * - Envoyer des requêtes directement à l'API avec curl/Postman
     */
    const validation = validateContactInput(body as ContactInput);
    
    if (!validation.isValid) {
      /**
       * Réponse 400 Bad Request si les données sont invalides
       * On renvoie les erreurs spécifiques pour aider l'utilisateur
       */
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: validation.errors
        },
        { status: 400 } // Bad Request
      );
    }
    
    /**
     * Étape 3 : Création du contact
     * 
     * La fonction createContact() gère :
     * - La sanitization des données (prévention XSS)
     * - L'insertion en BDD avec requête préparée (prévention SQL Injection)
     */
    const newContact = createContact(body as ContactInput);
    
    /**
     * Étape 4 : Réponse au client
     * 
     * Status 201 Created : Indique qu'une ressource a été créée
     * On renvoie le contact créé avec son ID
     */
    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès !',
        data: newContact
      },
      { status: 201 } // Created
    );
    
  } catch (error) {
    /**
     * Gestion des erreurs inattendues
     * 
     * Peut se produire si :
     * - Le JSON est malformé
     * - Erreur de base de données
     * - Autre erreur système
     */
    console.error('Erreur POST /api/contacts:', error);
    
    // Vérifier si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Format JSON invalide'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de l\'envoi du message'
      },
      { status: 500 }
    );
  }
}
