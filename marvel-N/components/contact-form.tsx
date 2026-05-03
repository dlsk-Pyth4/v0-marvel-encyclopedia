/**
 * ============================================================================
 * COMPOSANT FORMULAIRE DE CONTACT
 * ============================================================================
 * 
 * Ce composant représente la couche CLIENT de l'architecture Client-Serveur.
 * Il gère :
 * - L'affichage du formulaire avec validation côté client
 * - L'envoi des données au serveur via fetch API
 * - La gestion des états (chargement, succès, erreur)
 * 
 * CONNEXION FRONT-BACK :
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                           NAVIGATEUR (CLIENT)                           │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                    ContactForm Component                         │   │
 * │  │                                                                   │   │
 * │  │  1. Utilisateur remplit le formulaire                            │   │
 * │  │  2. Validation côté client (UX)                                  │   │
 * │  │  3. Envoi via fetch() ─────────────────────────────────────┐    │   │
 * │  │  4. Réception de la réponse <──────────────────────────────│────│   │
 * │  └───────────────────────────────────────────────────────────┘    │   │
 * └───────────────────────────────────────────────────────────────────│───┘
 *                                                                      │
 *                              HTTP POST /api/contacts                 │
 *                                                                      ▼
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                           SERVEUR (Next.js API)                         │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │  5. Validation côté serveur (SÉCURITÉ)                          │   │
 * │  │  6. Sanitization (prévention XSS)                               │   │
 * │  │  7. Insertion en BDD (requête préparée - prévention SQL Inj.)   │   │
 * │  │  8. Réponse JSON au client                                      │   │
 * │  └─────────────────────────────────────────────────────────────────┘   │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */

'use client'; // Directive Next.js : Ce composant s'exécute côté client

import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { characters } from '@/lib/data/characters';

// ============================================================================
// TYPES TypeScript
// ============================================================================

/**
 * Interface définissant la structure des données du formulaire
 * TypeScript assure la cohérence des types à la compilation
 */
interface FormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  personnage_prefere: string;
}

/**
 * Interface pour les erreurs de validation par champ
 */
interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

/**
 * Interface pour la réponse de l'API
 */
interface ApiResponse {
  success: boolean;
  message: string;
  errors?: string[];
  data?: {
    id: number;
    nom: string;
    email: string;
    sujet: string;
    message: string;
    personnage_prefere: string | null;
    created_at: string;
  };
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export function ContactForm() {
  // ══════════════════════════════════════════════════════════════════════════
  // ÉTAT DU COMPOSANT (useState hooks)
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * État du formulaire - Contient les valeurs de tous les champs
   */
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    sujet: '',
    message: '',
    personnage_prefere: ''
  });

  /**
   * État des erreurs de validation côté client
   */
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * État de chargement - true pendant l'envoi au serveur
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * État du résultat - 'success', 'error', ou null
   */
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  /**
   * Message de résultat à afficher
   */
  const [submitMessage, setSubmitMessage] = useState('');

  // ══════════════════════════════════════════════════════════════════════════
  // VALIDATION CÔTÉ CLIENT
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Valide les données du formulaire côté client
   * 
   * NOTE IMPORTANTE :
   * La validation côté client est pour l'UX (feedback immédiat)
   * Elle ne remplace PAS la validation côté serveur !
   * Un attaquant peut facilement la contourner
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation du nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    // Validation du sujet
    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    } else if (formData.sujet.trim().length < 3) {
      newErrors.sujet = 'Le sujet doit contenir au moins 3 caractères';
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // GESTIONNAIRES D'ÉVÉNEMENTS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Gère les changements dans les champs input et textarea
   * Utilise le pattern "controlled component" de React
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Efface l'erreur du champ quand l'utilisateur tape
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Gère le changement du select (personnage préféré)
   */
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, personnage_prefere: value }));
  };

  /**
   * Gère la soumission du formulaire
   * 
   * C'est ici que se fait la CONNEXION FRONT-BACK via fetch()
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Empêche le rechargement de la page (comportement par défaut des formulaires)
    e.preventDefault();

    // Réinitialise les états
    setSubmitStatus(null);
    setSubmitMessage('');

    // Validation côté client
    if (!validateForm()) {
      return;
    }

    // Active l'état de chargement
    setIsLoading(true);

    try {
      /**
       * ════════════════════════════════════════════════════════════════════
       * CONNEXION FRONT-BACK : Envoi des données au serveur Express
       * ════════════════════════════════════════════════════════════════════
       * 
       * fetch() est l'API native du navigateur pour les requêtes HTTP
       * 
       * Paramètres :
       * - URL : 'http://localhost:3001/api/contacts' (serveur Express)
       * - Options :
       *   - method : 'POST' pour créer une ressource
       *   - headers : Indique que le body est en JSON
       *   - body : Les données sérialisées en JSON
       */
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      /**
       * Parsing de la réponse JSON
       * Le serveur renvoie un objet { success, message, data/errors }
       */
      const data: ApiResponse = await response.json();

      if (data.success) {
        // Succès : Affiche le message et réinitialise le formulaire
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        
        // Réinitialisation du formulaire
        setFormData({
          nom: '',
          email: '',
          sujet: '',
          message: '',
          personnage_prefere: ''
        });
      } else {
        // Erreur : Affiche le message d'erreur du serveur
        setSubmitStatus('error');
        setSubmitMessage(
          data.errors?.join(', ') || data.message || 'Erreur lors de l\'envoi'
        );
      }
    } catch (error) {
      /**
       * Gestion des erreurs réseau
       * Se produit si le serveur est inaccessible ou si la requête échoue
       */
      console.error('Erreur réseau:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        'Erreur de connexion au serveur. Veuillez réessayer plus tard.'
      );
    } finally {
      // Désactive l'état de chargement dans tous les cas
      setIsLoading(false);
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDU DU COMPOSANT
  // ══════════════════════════════════════════════════════════════════════════

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Contactez-nous
        </CardTitle>
        <CardDescription>
          Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Alerte de succès ou d'erreur */}
        {submitStatus && (
          <Alert 
            className={`mb-6 ${
              submitStatus === 'success' 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-red-500 bg-red-500/10'
            }`}
          >
            {submitStatus === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertDescription className={
              submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
            }>
              {submitMessage}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Nom */}
          <div className="space-y-2">
            <Label htmlFor="nom">Nom *</Label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              disabled={isLoading}
              className={errors.nom ? 'border-red-500' : ''}
            />
            {errors.nom && (
              <p className="text-sm text-red-500">{errors.nom}</p>
            )}
          </div>

          {/* Champ Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={isLoading}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Champ Sujet */}
          <div className="space-y-2">
            <Label htmlFor="sujet">Sujet *</Label>
            <Input
              id="sujet"
              name="sujet"
              value={formData.sujet}
              onChange={handleChange}
              placeholder="Sujet de votre message"
              disabled={isLoading}
              className={errors.sujet ? 'border-red-500' : ''}
            />
            {errors.sujet && (
              <p className="text-sm text-red-500">{errors.sujet}</p>
            )}
          </div>

          {/* Champ Personnage Préféré (optionnel) */}
          <div className="space-y-2">
            <Label htmlFor="personnage_prefere">Personnage Marvel préféré</Label>
            <Select 
              value={formData.personnage_prefere} 
              onValueChange={handleSelectChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un personnage" />
              </SelectTrigger>
              <SelectContent>
                {characters.map((character) => (
                  <SelectItem key={character.id} value={character.name}>
                    {character.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Champ Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message..."
              rows={5}
              disabled={isLoading}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Bouton de soumission */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
