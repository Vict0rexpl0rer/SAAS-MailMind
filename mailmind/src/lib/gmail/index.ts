/**
 * =============================================================================
 * UTILITAIRES GMAIL - PLACEHOLDER
 * =============================================================================
 *
 * Ce fichier contiendra les utilitaires pour interagir avec l'API Gmail.
 *
 * FUTURE IMPLÉMENTATION :
 * - Configuration du client Gmail
 * - Fonctions pour récupérer/parser les emails
 * - Gestion des tokens OAuth
 *
 * =============================================================================
 */

/**
 * Configuration Gmail (placeholder)
 * À compléter avec les vraies valeurs
 */
export const gmailConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/gmail/callback',
  scopes: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels',
  ],
}

/**
 * Types pour les emails Gmail
 */
export interface GmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: {
    headers: Array<{ name: string; value: string }>
    body: { data?: string }
    parts?: Array<{
      mimeType: string
      body: { data?: string; attachmentId?: string }
      filename?: string
    }>
  }
  internalDate: string
}

/**
 * Parse un message Gmail pour extraire les informations utiles (placeholder)
 */
export function parseGmailMessage(message: GmailMessage) {
  // TODO: Implémenter le parsing complet
  const headers = message.payload.headers
  const getHeader = (name: string) =>
    headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || ''

  return {
    id: message.id,
    threadId: message.threadId,
    from: getHeader('From'),
    to: getHeader('To'),
    subject: getHeader('Subject'),
    date: getHeader('Date'),
    snippet: message.snippet,
    labels: message.labelIds,
    // Le body nécessite un décodage base64 plus complexe
    body: '',
    hasAttachments: message.payload.parts?.some(p => p.filename) || false,
  }
}

/**
 * Récupère les emails depuis Gmail (placeholder)
 * À implémenter avec le vrai client Google
 */
export async function fetchGmailEmails(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: {
    maxResults?: number
    query?: string
    pageToken?: string
  }
) {
  // TODO: Implémenter avec google-auth-library et googleapis
  console.log('fetchGmailEmails: Non implémenté')

  return {
    messages: [],
    nextPageToken: null,
  }
}

/**
 * Documentation pour l'implémentation future
 */
export const gmailImplementationGuide = `
# Guide d'implémentation Gmail API

## 1. Installation des dépendances
\`\`\`bash
npm install googleapis google-auth-library
\`\`\`

## 2. Configuration Google Cloud Console
1. Créer un projet sur console.cloud.google.com
2. Activer Gmail API dans "APIs & Services"
3. Configurer l'écran de consentement OAuth
4. Créer des identifiants OAuth 2.0 (Web application)
5. Ajouter les URIs de redirection autorisées

## 3. Variables d'environnement
\`\`\`env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
\`\`\`

## 4. Flow OAuth
1. Rediriger l'utilisateur vers Google pour autorisation
2. Recevoir le code d'autorisation sur /api/gmail/callback
3. Échanger le code contre des tokens
4. Stocker les tokens dans Supabase (chiffrés)
5. Rafraîchir le token d'accès si expiré

## 5. Appels API Gmail
- list: Lister les messages
- get: Récupérer un message complet
- attachments.get: Télécharger une pièce jointe
`
