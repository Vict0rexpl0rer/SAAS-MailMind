/**
 * =============================================================================
 * TYPES - CANDIDAT
 * =============================================================================
 *
 * Définition des types liés aux candidats.
 * Un candidat est créé lorsqu'un email contenant un CV est détecté
 * ou lorsqu'un CV est déposé via le formulaire public.
 *
 * =============================================================================
 */

/**
 * Statut d'un candidat dans le processus de recrutement
 */
export type CandidateStatus =
  | 'new'           // Nouveau candidat, pas encore traité
  | 'reviewing'     // En cours d'examen
  | 'shortlisted'   // Présélectionné
  | 'interviewing'  // En entretien
  | 'offered'       // Offre envoyée
  | 'hired'         // Recruté
  | 'rejected'      // Refusé

/**
 * Niveau d'expérience estimé
 */
export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead' | 'executive'

/**
 * Source d'où provient le candidat
 */
export type CandidateSource = 'email' | 'form' | 'manual' | 'linkedin'

/**
 * Structure complète d'un candidat
 */
export interface Candidate {
  /** Identifiant unique du candidat */
  id: string

  /** Prénom */
  firstName: string

  /** Nom de famille */
  lastName: string

  /** Adresse email */
  email: string

  /** Numéro de téléphone (optionnel) */
  phone?: string

  /** Poste visé / recherché */
  position: string

  /** Compétences clés extraites du CV */
  skills: string[]

  /** Niveau d'expérience estimé */
  experienceLevel: ExperienceLevel

  /** Années d'expérience (si disponible) */
  yearsOfExperience?: number

  /** Localisation actuelle */
  location?: string

  /** Statut dans le processus */
  status: CandidateStatus

  /** Source du candidat */
  source: CandidateSource

  /** ID de l'email source (si applicable) */
  sourceEmailId?: string

  /** URL du CV stocké */
  cvUrl?: string

  /** Nom du fichier CV */
  cvFileName?: string

  /** Résumé généré par IA */
  aiSummary?: string

  /** Score de matching (0-100) basé sur les critères */
  matchScore?: number

  /** Notes internes */
  notes?: string

  /** Date d'ajout */
  createdAt: Date

  /** Date de dernière mise à jour */
  updatedAt: Date

  /** URL de la photo de profil (LinkedIn, etc.) */
  avatarUrl?: string
}

/**
 * Données nécessaires pour créer un candidat
 */
export interface CreateCandidateInput {
  firstName: string
  lastName: string
  email: string
  phone?: string
  position: string
  skills: string[]
  experienceLevel?: ExperienceLevel
  location?: string
  source: CandidateSource
  sourceEmailId?: string
  cvUrl?: string
  cvFileName?: string
}

/**
 * Filtres pour la liste des candidats
 */
export interface CandidateFilters {
  /** Filtrer par statut */
  status?: CandidateStatus | 'all'

  /** Filtrer par niveau d'expérience */
  experienceLevel?: ExperienceLevel | 'all'

  /** Filtrer par compétence */
  skill?: string

  /** Recherche textuelle (nom, poste, email) */
  search?: string

  /** Score minimum de matching */
  minMatchScore?: number
}
