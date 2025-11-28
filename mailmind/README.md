# MailMind - MVP

MailMind est un SaaS qui permet aux recruteurs et entrepreneurs de lire, organiser et classer automatiquement leurs emails et CV grâce à l'intelligence artificielle.

## Fonctionnalités du MVP

- **Authentification Google** via Supabase Auth
- **Dashboard Emails** : Liste des emails avec filtres par catégorie (CV, Messages, Spam, Urgent)
- **Dashboard Candidats** : Grille de cartes candidats avec statuts et compétences
- **Page Paramètres** : Configuration des intégrations (placeholders)
- **Design Widget** avec palette bleue et box-shadows prononcées

## Design System

### Principes de Design

- **Style Widget** : Chaque conteneur est un widget distinct avec des bordures arrondies (`rounded-2xl`) et des ombres portées
- **Box Shadows** : Ombres prononcées pour créer un effet de profondeur et de séparation entre les éléments
- **Palette Bleue** : Toutes les couleurs primaires utilisent une palette de bleus cohérente

### Palette de Couleurs

| Usage | Couleur | Tailwind Class |
|-------|---------|----------------|
| Primary | #3b82f6 | `blue-500` |
| Primary Dark | #1d4ed8 | `blue-700` |
| Primary Light | #93c5fd | `blue-300` |
| Background | #eff6ff | `blue-50` |
| Surface | #dbeafe | `blue-100` |
| Text Primary | #1e3a8a | `blue-900` |
| Text Secondary | #3b82f6 | `blue-500` |

### Couleurs Sémantiques (conservées)

| Usage | Couleur | Tailwind Class |
|-------|---------|----------------|
| Succès | Vert | `green-*` |
| Erreur | Rouge | `red-*` |
| Warning | Jaune | `yellow-*` |

### Règles de Box Shadow

```css
/* Widget standard */
shadow-lg shadow-blue-200/50

/* Widget hover */
hover:shadow-xl hover:shadow-blue-300/50

/* Widget actif/focus */
shadow-xl shadow-blue-400/30
```

### Exemple de Card Widget

```tsx
<div className="bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-shadow">
  {/* Contenu */}
</div>
```

## Stack Technique

| Technologie | Rôle |
|-------------|------|
| **Next.js 14** | Framework React avec App Router |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **Supabase** | Authentification et base de données |
| **Lucide React** | Icônes |

## Prérequis

- Node.js 18+
- npm ou yarn
- Un compte Supabase (gratuit)

## Installation

### 1. Cloner et installer les dépendances

```bash
cd mailmind
npm install
```

### 2. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Aller dans **Settings > API**
3. Copier l'URL du projet et la clé `anon/public`

### 3. Configurer les variables d'environnement

Éditer le fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_publique
```

### 4. Configurer l'authentification Google dans Supabase

1. Dans Supabase, aller dans **Authentication > Providers**
2. Activer **Google**
3. Créer des identifiants OAuth dans [Google Cloud Console](https://console.cloud.google.com)
4. Ajouter les Client ID et Secret dans Supabase
5. Configurer les URLs de redirection :
   - `http://localhost:3000/auth/callback` (développement)
   - `https://votre-domaine.com/auth/callback` (production)

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── login/                # Page de connexion
│   │   └── auth/callback/        # Callback OAuth
│   ├── (dashboard)/              # Routes protégées
│   │   └── dashboard/
│   │       ├── emails/           # Page emails
│   │       ├── candidates/       # Page candidats
│   │       └── settings/         # Page paramètres
│   └── api/                      # Routes API
│       ├── gmail/                # API Gmail (placeholder)
│       ├── openai/               # API OpenAI (placeholder)
│       └── webhooks/n8n/         # Webhook n8n (placeholder)
├── components/
│   ├── ui/                       # Composants UI réutilisables
│   ├── layout/                   # Layout (Sidebar, Header)
│   ├── emails/                   # Composants emails
│   └── candidates/               # Composants candidats
├── lib/
│   ├── supabase/                 # Configuration Supabase
│   ├── gmail/                    # Utilitaires Gmail (placeholder)
│   └── openai/                   # Utilitaires OpenAI (placeholder)
├── types/                        # Types TypeScript
├── data/                         # Données mockées
├── hooks/                        # Custom React hooks
└── utils/                        # Fonctions utilitaires
```

## Architecture de l'Authentification

```
┌─────────────────────────────────────────────────────────────┐
│                      FLUX D'AUTHENTIFICATION                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Utilisateur → /login                                    │
│                     │                                       │
│  2. Clic "Se connecter avec Google"                         │
│                     │                                       │
│  3. Supabase → Redirection Google OAuth                     │
│                     │                                       │
│  4. Google → Authentification                               │
│                     │                                       │
│  5. Google → Redirection /auth/callback?code=xxx            │
│                     │                                       │
│  6. Callback → Échange code contre session                  │
│                     │                                       │
│  7. Session créée → Cookies                                 │
│                     │                                       │
│  8. Redirection → /dashboard/emails                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Protection des Routes

Le middleware (`src/middleware.ts`) intercepte toutes les requêtes et :

- Rafraîchit automatiquement les tokens de session
- Redirige les utilisateurs non connectés vers `/login` s'ils tentent d'accéder au dashboard
- Redirige les utilisateurs connectés vers `/dashboard/emails` s'ils sont sur `/login`

## Données Mockées

Le MVP utilise des données de démonstration définies dans :

- `src/data/mock-emails.ts` : 14 emails de test (CV, messages, spam, urgent)
- `src/data/mock-candidates.ts` : 8 candidats de test avec différents statuts

## Futures Intégrations (Placeholders)

### Gmail API

Les fichiers suivants sont préparés pour l'intégration Gmail :

- `src/app/api/gmail/route.ts` : Route API
- `src/lib/gmail/index.ts` : Utilitaires et documentation

### OpenAI API

Les fichiers suivants sont préparés pour l'intégration OpenAI :

- `src/app/api/openai/route.ts` : Route API
- `src/lib/openai/index.ts` : Prompts et utilitaires

### Webhook n8n

- `src/app/api/webhooks/n8n/route.ts` : Réception de webhooks

## Scripts Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint
```

## Déploiement

### Vercel (Recommandé)

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer

### Variables d'environnement en production

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

## Prochaines Étapes

1. **Intégration Gmail** : Connecter le compte Gmail et synchroniser les emails
2. **Intégration OpenAI** : Classifier automatiquement les emails avec GPT
3. **Base de données** : Stocker les emails et candidats dans Supabase
4. **Formulaire public** : Permettre le dépôt de CV externe
5. **Webhooks n8n** : Automatiser les workflows

## Contribution

Les contributions sont les bienvenues ! Merci de créer une issue avant de soumettre une PR.

## Licence

MIT
