/**
 * =============================================================================
 * API ROUTE - GMAIL
 * =============================================================================
 *
 * Route API placeholder pour l'intégration Gmail.
 *
 * FUTURE IMPLÉMENTATION :
 * - GET : Récupérer les emails depuis Gmail API
 * - POST : Synchroniser les emails
 *
 * PRÉREQUIS À VENIR :
 * 1. Configurer un projet Google Cloud
 * 2. Activer Gmail API
 * 3. Créer des credentials OAuth 2.0
 * 4. Stocker les tokens dans Supabase
 *
 * =============================================================================
 */

import { NextResponse } from 'next/server'

/**
 * GET /api/gmail
 * Récupère les emails (placeholder)
 */
export async function GET() {
  // TODO: Implémenter la récupération des emails Gmail
  // 1. Vérifier l'authentification utilisateur
  // 2. Récupérer le token Gmail depuis Supabase
  // 3. Appeler Gmail API
  // 4. Transformer et retourner les données

  return NextResponse.json({
    success: false,
    message: 'Gmail API non encore implémentée',
    placeholder: true,
    documentation: {
      setup: [
        '1. Créer un projet sur Google Cloud Console',
        '2. Activer Gmail API',
        '3. Configurer l\'écran de consentement OAuth',
        '4. Créer des identifiants OAuth 2.0',
        '5. Ajouter les variables d\'environnement GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET',
        '6. Implémenter le flow OAuth dans /api/gmail/auth',
      ],
      endpoints: {
        'GET /api/gmail': 'Liste les emails',
        'GET /api/gmail/[id]': 'Détail d\'un email',
        'POST /api/gmail/sync': 'Force la synchronisation',
        'GET /api/gmail/auth': 'Initie le flow OAuth Gmail',
        'GET /api/gmail/callback': 'Callback OAuth Gmail',
      },
    },
  })
}

/**
 * POST /api/gmail
 * Déclenche une synchronisation (placeholder)
 */
export async function POST() {
  // TODO: Implémenter la synchronisation des emails
  // 1. Vérifier l'authentification
  // 2. Récupérer les nouveaux emails depuis Gmail
  // 3. Les stocker dans Supabase
  // 4. Déclencher la classification IA

  return NextResponse.json({
    success: false,
    message: 'Synchronisation Gmail non encore implémentée',
    placeholder: true,
  })
}
