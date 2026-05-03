/**
 * ============================================================================
 * API ROUTE - /api/contacts/[id]
 * ============================================================================
 * 
 * Route dynamique pour les opérations sur un contact spécifique.
 * Le [id] dans le nom du dossier indique un paramètre dynamique.
 * 
 * Exemples d'URLs :
 * - GET /api/contacts/1     -> Récupère le contact avec id=1
 * - DELETE /api/contacts/5  -> Supprime le contact avec id=5
 * 
 * SÉCURITÉ :
 * - Validation de l'ID (doit être un nombre entier positif)
 * - Requêtes préparées pour toutes les opérations BDD
 * 
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContactById, deleteContact } from '@/lib/db';

/**
 * Type pour les paramètres de route dynamique
 * Next.js passe automatiquement les paramètres de l'URL
 */
type RouteParams = {
  params: Promise<{ id: string }>;
};

// ============================================================================
// GET /api/contacts/[id] - Récupérer un contact spécifique
// ============================================================================

/**
 * Récupère un contact par son ID
 * 
 * @param request - L'objet NextRequest
 * @param params - Les paramètres de la route ({ id: string })
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    /**
     * Validation de l'ID
     * 
     * SÉCURITÉ : Toujours valider les entrées utilisateur !
     * Un attaquant pourrait envoyer :
     * - Des lettres : /api/contacts/abc
     * - Des nombres négatifs : /api/contacts/-1
     * - Des injections : /api/contacts/1; DROP TABLE
     */
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId) || numericId < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'ID invalide. Doit être un nombre entier positif.'
        },
        { status: 400 }
      );
    }
    
    // Récupération du contact (utilise une requête préparée)
    const contact = getContactById(numericId);
    
    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact non trouvé'
        },
        { status: 404 } // Not Found
      );
    }
    
    return NextResponse.json({
      success: true,
      data: contact
    });
    
  } catch (error) {
    console.error('Erreur GET /api/contacts/[id]:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération du contact'
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/contacts/[id] - Supprimer un contact
// ============================================================================

/**
 * Supprime un contact par son ID
 * 
 * SÉCURITÉ : Dans une vraie application, cette route devrait :
 * - Vérifier l'authentification de l'utilisateur
 * - Vérifier les permissions (seuls les admins peuvent supprimer)
 * - Logger l'action pour l'audit
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    
    // Validation de l'ID
    if (isNaN(numericId) || numericId < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'ID invalide'
        },
        { status: 400 }
      );
    }
    
    // Tentative de suppression
    const deleted = deleteContact(numericId);
    
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact non trouvé ou déjà supprimé'
        },
        { status: 404 }
      );
    }
    
    /**
     * Réponse 200 OK avec confirmation
     * Certaines APIs utilisent 204 No Content pour les suppressions réussies
     */
    return NextResponse.json({
      success: true,
      message: 'Contact supprimé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur DELETE /api/contacts/[id]:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la suppression du contact'
      },
      { status: 500 }
    );
  }
}
