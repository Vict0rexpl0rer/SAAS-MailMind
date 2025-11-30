/**
 * =============================================================================
 * TYPES - DÉTECTION & EXTRACTION CV
 * =============================================================================
 *
 * Types liés à la détection et l'extraction des CV depuis les emails.
 * Processus en 2 étapes :
 * 1. Détection légère (mots-clés, gratuit)
 * 2. Extraction complète (IA, payant)
 *
 * =============================================================================
 */

/**
 * Signal de détection de CV
 * Chaque signal contribue au score de confiance
 */
export interface DetectionSignal {
  /** Type de signal détecté */
  type: 'filename' | 'subject' | 'body' | 'attachment_type' | 'sender'

  /** Valeur qui a déclenché le signal */
  value: string

  /** Poids du signal dans le score (1-10) */
  weight: number

  /** Description du signal pour debug */
  description?: string
}

/**
 * Résultat de la détection légère (Step 1)
 * Basée sur les mots-clés, pas d'IA
 */
export interface LightCVDetection {
  /** Indique si l'email ressemble à un CV */
  isLikelyCV: boolean

  /** Score de confiance (0-100) */
  confidence: number

  /** Liste des signaux détectés */
  signals: DetectionSignal[]

  /** Indique si on doit procéder à l'extraction complète */
  shouldProceedToFullExtraction: boolean

  /** Nom du fichier potentiel CV (si détecté) */
  potentialCVFileName?: string
}

/**
 * Données extraites d'un CV
 */
export interface ExtractedCVData {
  /** Prénom */
  firstName: string

  /** Nom de famille */
  lastName: string

  /** Email du candidat (peut être différent de l'expéditeur) */
  email?: string

  /** Téléphone */
  phone?: string

  /** Poste recherché ou poste actuel */
  position: string

  /** Compétences clés (5 maximum pour l'affichage) */
  skills: string[]

  /** Liste complète des compétences */
  allSkills: string[]

  /** Années d'expérience estimées */
  yearsOfExperience?: number

  /** Localisation */
  location?: string

  /** Formation principale (diplôme le plus élevé) */
  education?: string

  /** Langues parlées */
  languages?: string[]

  /** Résumé du profil (2-3 phrases générées par IA) */
  summary: string
}

/**
 * Résultat de l'extraction complète (Step 2)
 * Basée sur l'analyse IA du PDF
 */
export interface CVExtractionResult {
  /** Indique si l'extraction a réussi */
  success: boolean

  /** Score de confiance de l'extraction (0-100) */
  confidence: number

  /** Données extraites (si succès) */
  data?: ExtractedCVData

  /** Texte brut du CV (pour le chat IA) */
  rawText?: string

  /** URL de la photo extraite ou générée */
  photoUrl?: string

  /** Erreurs rencontrées */
  errors?: string[]

  /** Avertissements (données partielles) */
  warnings?: string[]
}

/**
 * Contexte pour l'extraction CV
 * Informations additionnelles de l'email
 */
export interface CVExtractionContext {
  /** ID de l'email source */
  emailId: string

  /** Sujet de l'email */
  emailSubject: string

  /** Corps de l'email (peut contenir des infos utiles) */
  emailBody?: string

  /** Nom du fichier PDF */
  fileName: string

  /** Taille du fichier en bytes */
  fileSize?: number
}

/**
 * Mots-clés pour la détection légère
 */
export interface CVDetectionKeywords {
  /** Patterns de nom de fichier (regex) */
  filenamePatterns: RegExp[]

  /** Mots-clés dans le sujet */
  subjectKeywords: string[]

  /** Mots-clés dans le corps */
  bodyKeywords: string[]

  /** Extensions de fichier acceptées */
  fileExtensions: string[]
}

/**
 * Configuration de la détection CV
 */
export interface CVDetectionConfig {
  /** Seuil de confiance pour passer à l'extraction complète */
  lightDetectionThreshold: number

  /** Seuil de confiance pour marquer l'extraction comme réussie */
  fullExtractionThreshold: number

  /** Nombre max de compétences à afficher */
  maxDisplayedSkills: number

  /** Longueur max du résumé (en caractères) */
  maxSummaryLength: number
}

/**
 * État du processus de détection CV pour un email
 */
export interface CVDetectionState {
  /** ID de l'email */
  emailId: string

  /** Étape actuelle */
  step: 'pending' | 'light_detection' | 'full_extraction' | 'completed' | 'failed'

  /** Résultat de la détection légère */
  lightDetection?: LightCVDetection

  /** Résultat de l'extraction complète */
  fullExtraction?: CVExtractionResult

  /** ID du candidat créé */
  candidateId?: string

  /** Erreur si échec */
  error?: string
}
