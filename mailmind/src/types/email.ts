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
 * Groupes de catégories d'emails
 * Permet d'organiser les 21 catégories en sections logiques
 */
export type EmailCategoryGroup =
  | 'recrutement'
  | 'business'
  | 'communication'
  | 'indesirables'
  | 'autre'

/**
 * 21 catégories possibles pour un email
 * Utilisées pour le filtrage et le classement automatique
 */
export type EmailCategory =
  // Recrutement (6 catégories)
  | 'cv_spontane'           // CV envoyé spontanément
  | 'cv_offre'              // CV en réponse à une offre d'emploi
  | 'relance_candidat'      // Relance d'un candidat
  | 'refus_candidat'        // Refus de candidature
  | 'confirmation_entretien' // Confirmation d'entretien
  | 'question_candidat'     // Question d'un candidat
  // Business (6 catégories)
  | 'prospect_chaud'        // Prospect potentiel intéressé
  | 'client_existant'       // Email d'un client actuel
  | 'partenaire'            // Communication partenaire
  | 'fournisseur'           // Communication fournisseur
  | 'facture_paiement'      // Factures et paiements
  | 'devis_proposition'     // Devis et propositions commerciales
  // Communication (4 catégories)
  | 'equipe_interne'        // Communication équipe interne
  | 'notification_plateforme' // Notifications LinkedIn, Indeed, etc.
  | 'newsletter_utile'      // Newsletter pertinente
  | 'newsletter_ignorable'  // Newsletter non prioritaire
  // Indésirables (3 catégories)
  | 'spam_evident'          // Spam évident
  | 'pub_promo'             // Publicités et promotions
  | 'email_automatique'     // Emails automatiques (no-reply)
  // Autre (2 catégories)
  | 'non_classe'            // Non classé / À trier manuellement
  | 'doute'                 // Doute - IA non sûre de la classification

/**
 * Statut de lecture d'un email
 */
export type EmailStatus = 'read' | 'unread'

/**
 * Étape de détection de CV
 */
export type CVDetectionStep = 'none' | 'light' | 'full'

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

  /** Groupe de la catégorie (pour le filtrage groupé) */
  categoryGroup?: EmailCategoryGroup

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

  /** Indique si la classification est douteuse (confiance < 70) */
  isDoubtful?: boolean

  /** Indique si la classification a été faite manuellement */
  manuallyClassified?: boolean

  /** Date de classification */
  classifiedAt?: Date

  /** Indique si l'email contient un CV détecté */
  hasCv?: boolean

  /** Étape de détection du CV */
  cvDetectionStep?: CVDetectionStep

  /** ID du candidat créé si CV détecté */
  candidateId?: string
}

/**
 * Filtres disponibles pour la liste des emails
 */
export interface EmailFilters {
  /** Filtrer par catégorie */
  category?: EmailCategory | 'all'

  /** Filtrer par groupe de catégories */
  categoryGroup?: EmailCategoryGroup | 'all'

  /** Filtrer par statut de lecture */
  status?: EmailStatus | 'all'

  /** Recherche textuelle */
  search?: string

  /** Filtrer par date de début */
  dateFrom?: Date

  /** Filtrer par date de fin */
  dateTo?: Date

  /** Filtrer les emails avec CV uniquement */
  hasCvOnly?: boolean

  /** Filtrer les emails douteux uniquement */
  doubtfulOnly?: boolean
}

/**
 * Réponse de l'API Gmail (structure simplifiée pour le MVP)
 */
export interface GmailApiResponse {
  messages: Email[]
  nextPageToken?: string
  resultSizeEstimate: number
}

/**
 * Résultat de classification d'un email
 */
export interface ClassificationResult {
  emailId: string
  category: EmailCategory
  categoryGroup: EmailCategoryGroup
  confidence: number
  isDoubtful: boolean
  reasoning?: string
}

/**
 * Statistiques des emails par catégorie
 */
export interface EmailStats {
  total: number
  unread: number
  byCategory: Record<EmailCategory, number>
  byGroup: Record<EmailCategoryGroup, number>
  doubtful: number
  withCv: number
}
