/**
 * =============================================================================
 * TYPES - UTILISATEUR
 * =============================================================================
 *
 * Définition des types liés aux utilisateurs et à l'authentification.
 * Ces types étendent les données Supabase Auth avec des infos métier.
 *
 * =============================================================================
 */

/**
 * Plan d'abonnement de l'utilisateur (pour plus tard)
 */
export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise'

/**
 * Statut de la connexion Gmail
 */
export type GmailConnectionStatus = 'disconnected' | 'connected' | 'expired' | 'error'

/**
 * Profil utilisateur étendu
 * Complète les données Supabase Auth avec des infos spécifiques à MailMind
 */
export interface UserProfile {
  /** ID Supabase Auth */
  id: string

  /** Email de l'utilisateur */
  email: string

  /** Nom complet */
  fullName: string

  /** URL de l'avatar (Google) */
  avatarUrl?: string

  /** Plan d'abonnement actuel */
  plan: SubscriptionPlan

  /** Nom de l'entreprise (optionnel) */
  companyName?: string

  /** Date de création du compte */
  createdAt: Date

  /** Date de dernière connexion */
  lastLoginAt?: Date
}

/**
 * Paramètres de l'utilisateur
 */
export interface UserSettings {
  /** ID de l'utilisateur */
  userId: string

  /** Statut de connexion Gmail */
  gmailStatus: GmailConnectionStatus

  /** Token d'accès Gmail (chiffré) */
  gmailAccessToken?: string

  /** Token de rafraîchissement Gmail (chiffré) */
  gmailRefreshToken?: string

  /** Clé API OpenAI (chiffrée, optionnelle) */
  openaiApiKey?: string

  /** URL du webhook n8n */
  n8nWebhookUrl?: string

  /** Préférences de notification */
  notifications: {
    /** Notifier pour les nouveaux CV */
    newCv: boolean
    /** Notifier pour les emails urgents */
    urgentEmails: boolean
    /** Résumé quotidien */
    dailyDigest: boolean
  }

  /** Préférences d'affichage */
  display: {
    /** Mode sombre */
    darkMode: boolean
    /** Nombre d'emails par page */
    emailsPerPage: number
    /** Vue par défaut des candidats (liste ou grille) */
    candidateView: 'list' | 'grid'
  }
}

/**
 * Données de session utilisateur
 * Utilisées dans le contexte d'authentification
 */
export interface UserSession {
  /** Profil de l'utilisateur */
  user: UserProfile | null

  /** Indique si le chargement est en cours */
  isLoading: boolean

  /** Erreur éventuelle */
  error: Error | null

  /** Indique si l'utilisateur est authentifié */
  isAuthenticated: boolean
}
