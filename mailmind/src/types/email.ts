/**
 * =============================================================================
 * TYPES - EMAIL
 * =============================================================================
 *
 * Définition des types liés aux emails.
 * Ces types seront utilisés pour :
 * - Les données mockées actuellement
 * - Les vraies données Gmail plus tard
 * - La classification par OpenAI
 *
 * =============================================================================
 */

/**
 * Catégories possibles pour un email
 * Utilisées pour le filtrage et le classement automatique
 */
export type EmailCategory = 'cv' | 'message' | 'spam' | 'urgent' | 'other'

/**
 * Statut de lecture d'un email
 */
export type EmailStatus = 'read' | 'unread'

/**
 * Structure complète d'un email
 * Correspond aux données que nous recevrons de Gmail API
 */
export interface Email {
  /** Identifiant unique de l'email (fourni par Gmail) */
  id: string

  /** Nom de l'expéditeur */
  senderName: string

  /** Adresse email de l'expéditeur */
  senderEmail: string

  /** Sujet de l'email */
  subject: string

  /** Aperçu du contenu (snippet) */
  preview: string

  /** Contenu complet de l'email (HTML ou texte) */
  body?: string

  /** Date de réception */
  receivedAt: Date

  /** Catégorie assignée (manuellement ou par IA) */
  category: EmailCategory

  /** Statut de lecture */
  status: EmailStatus

  /** Indique si l'email contient une pièce jointe */
  hasAttachment: boolean

  /** Nom des pièces jointes le cas échéant */
  attachments?: string[]

  /** Labels Gmail originaux */
  labels?: string[]

  /** Score de confiance de la classification IA (0-100) */
  aiConfidence?: number
}

/**
 * Filtres disponibles pour la liste des emails
 */
export interface EmailFilters {
  /** Filtrer par catégorie */
  category?: EmailCategory | 'all'

  /** Filtrer par statut de lecture */
  status?: EmailStatus | 'all'

  /** Recherche textuelle */
  search?: string
}

/**
 * Réponse de l'API Gmail (structure simplifiée pour le MVP)
 */
export interface GmailApiResponse {
  messages: Email[]
  nextPageToken?: string
  resultSizeEstimate: number
}
