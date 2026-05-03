# Architecture Technique - Marvel Nexus

## Vue d'ensemble de l'Architecture Client-Serveur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARCHITECTURE FULL-STACK                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         COUCHE CLIENT                                │   │
│  │                       (Navigateur Web)                               │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • React Components (TSX)                                            │   │
│  │  • Validation côté client (UX)                                       │   │
│  │  • Fetch API pour communiquer avec le serveur                        │   │
│  │  • Gestion d'état avec useState/useEffect                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    │ HTTP (POST/GET)                        │
│                                    │ JSON                                   │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         COUCHE SERVEUR                               │   │
│  │                    (Next.js API Routes / Node.js)                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • Routes API (/app/api/*)                                           │   │
│  │  • Validation côté serveur (SÉCURITÉ)                                │   │
│  │  • Sanitization des entrées (prévention XSS)                         │   │
│  │  • Requêtes préparées (prévention SQL Injection)                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    │ SQL (Prepared Statements)              │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    COUCHE BASE DE DONNÉES                            │   │
│  │                          (SQLite)                                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • Stockage persistant des données                                   │   │
│  │  • Table 'contacts' pour les messages                                │   │
│  │  • Index pour optimiser les performances                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Structure des Fichiers

```
marvel.nexus/
├── app/
│   ├── api/
│   │   └── contacts/
│   │       ├── route.ts          # GET et POST /api/contacts
│   │       └── [id]/
│   │           └── route.ts      # GET et DELETE /api/contacts/:id
│   ├── contact/
│   │   └── page.tsx              # Page du formulaire de contact
│   └── admin/
│       └── contacts/
│           └── page.tsx          # Page admin pour voir les messages
├── components/
│   └── contact-form.tsx          # Composant formulaire (Client)
├── lib/
│   └── db.ts                     # Module base de données SQLite
├── server.js                     # Serveur Express standalone (démonstration)
└── database.sqlite               # Fichier de base de données
```

## Flux de Données - Soumission du Formulaire

```
1. UTILISATEUR                    2. CLIENT (React)
   │                                  │
   │  Remplit le formulaire           │
   │  et clique "Envoyer"             │
   │                                  │
   └─────────────────────────────────>│
                                      │
                                      │  Validation côté client
                                      │  (feedback immédiat)
                                      │
                                      │  fetch('/api/contacts', {
                                      │    method: 'POST',
                                      │    body: JSON.stringify(data)
                                      │  })
                                      │
                                      ▼
3. SERVEUR (API Route)            4. BASE DE DONNÉES
   │                                  │
   │  Validation côté serveur         │
   │  (SÉCURITÉ OBLIGATOIRE)          │
   │                                  │
   │  Sanitization des données        │
   │  (prévention XSS)                │
   │                                  │
   │  Requête préparée:               │
   │  db.prepare('INSERT...')         │
   │       │                          │
   │       └─────────────────────────>│
   │                                  │
   │                                  │  INSERT INTO contacts...
   │                                  │
   │       Résultat                   │
   │  <───────────────────────────────│
   │                                  │
   │  JSON Response                   │
   │                                  │
   ▼                                  │
5. CLIENT                         6. UTILISATEUR
   │                                  │
   │  Réception de la réponse         │
   │  Mise à jour de l'interface      │
   │                                  │
   └─────────────────────────────────>│
                                      │
                                      │  Message de succès
                                      │  ou erreur affiché
```

## Mesures de Sécurité Implémentées

### 1. Prévention des Injections SQL

**Problème :** Un attaquant peut injecter du code SQL malveillant via les champs du formulaire.

**Exemple d'attaque :**
```
Nom: Robert'); DROP TABLE contacts; --
```

**Solution : Requêtes Préparées (Prepared Statements)**

```typescript
// ❌ VULNÉRABLE (ne jamais faire ça)
db.exec(`INSERT INTO contacts VALUES ('${nom}', '${email}')`);

// ✅ SÉCURISÉ (toujours utiliser des requêtes préparées)
const stmt = db.prepare('INSERT INTO contacts VALUES (?, ?)');
stmt.run(nom, email);
```

Les paramètres `?` sont traités comme des **données**, pas comme du code SQL.

### 2. Prévention des Failles XSS

**Problème :** Un attaquant peut injecter du JavaScript malveillant qui sera exécuté dans le navigateur d'autres utilisateurs.

**Exemple d'attaque :**
```html
Nom: <script>alert('Hacked!')</script>
```

**Solution : Sanitization des entrées**

```typescript
function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, '&amp;')   // & → &amp;
    .replace(/</g, '&lt;')    // < → &lt;
    .replace(/>/g, '&gt;')    // > → &gt;
    .replace(/"/g, '&quot;')  // " → &quot;
    .replace(/'/g, '&#x27;'); // ' → &#x27;
}
```

Le script devient : `&lt;script&gt;alert('Hacked!')&lt;/script&gt;` (affiché comme texte, non exécuté).

### 3. Validation Côté Serveur

**Pourquoi la validation côté client ne suffit pas :**
- Un attaquant peut désactiver JavaScript
- Un attaquant peut modifier le HTML du formulaire
- Un attaquant peut envoyer des requêtes directement à l'API

**Solution : Double validation**
- Validation côté client : Pour l'UX (feedback immédiat)
- Validation côté serveur : Pour la SÉCURITÉ (obligatoire)

## API REST

### Endpoints Disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/contacts` | Liste tous les contacts |
| POST | `/api/contacts` | Crée un nouveau contact |
| GET | `/api/contacts/:id` | Récupère un contact spécifique |
| DELETE | `/api/contacts/:id` | Supprime un contact |

### Exemple de Requête POST

```javascript
const response = await fetch('/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nom: 'Tony Stark',
    email: 'tony@starkindustries.com',
    sujet: 'Demande de partenariat',
    message: 'Je souhaite proposer...',
    personnage_prefere: 'Iron Man'
  }),
});

const data = await response.json();
```

### Exemple de Réponse

```json
{
  "success": true,
  "message": "Message envoyé avec succès !",
  "data": {
    "id": 1,
    "nom": "Tony Stark",
    "email": "tony@starkindustries.com",
    "sujet": "Demande de partenariat",
    "message": "Je souhaite proposer...",
    "personnage_prefere": "Iron Man",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

## Technologies Utilisées

| Technologie | Rôle |
|-------------|------|
| **Next.js 15** | Framework React full-stack |
| **TypeScript** | Typage statique pour la fiabilité |
| **React** | Bibliothèque UI côté client |
| **SQLite** | Base de données légère |
| **better-sqlite3** | Driver Node.js pour SQLite |
| **Tailwind CSS** | Framework CSS utilitaire |
| **shadcn/ui** | Composants UI accessibles |

## Commandes Utiles

```bash
# Démarrer le serveur de développement Next.js
pnpm dev

# Démarrer le serveur Express standalone (optionnel)
node server.js

# Les deux approches fonctionnent :
# - Next.js API Routes (recommandé) : intégré, pas de serveur séparé
# - Express standalone : pour démontrer l'architecture traditionnelle
```

## Pages Disponibles

- `/` - Page d'accueil
- `/contact` - Formulaire de contact
- `/admin/contacts` - Administration des messages
- `/roadmap` - Roadmap du projet
- `/favoris` - Personnages favoris

---

*Document technique pour la soutenance Bachelor 3 - Marvel Nexus*
