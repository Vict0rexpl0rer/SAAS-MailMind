/**
 * =============================================================================
 * SERVICE DE DÉTECTION CV
 * =============================================================================
 *
 * Service responsable de la détection et de l'extraction des CV depuis les emails.
 * Processus en 2 étapes :
 * 1. Détection légère (mots-clés, gratuit) - détermine si un email contient probablement un CV
 * 2. Extraction complète (IA, payant) - extrait les informations structurées du CV
 *
 * =============================================================================
 */

import { Email } from '@/types'
import {
  LightCVDetection,
  CVExtractionResult,
  DetectionSignal,
  CVDetectionConfig,
  CVDetectionState,
} from '@/types/cv-detection'
import { simulateLightCVDetection, simulateCVExtraction } from '@/lib/test-mode/ai-simulator-v2'

/**
 * Configuration par défaut de la détection CV
 */
const defaultConfig: CVDetectionConfig = {
  lightDetectionThreshold: 40,
  fullExtractionThreshold: 70,
  maxDisplayedSkills: 5,
  maxSummaryLength: 300,
}

/**
 * Patterns de noms de fichiers typiques pour les CV
 */
const CV_FILENAME_PATTERNS: RegExp[] = [
  /cv[-_\s]?/i,
  /resume[-_\s]?/i,
  /candidature[-_\s]?/i,
  /lettre[-_\s]?(de[-_\s]?)?motivation/i,
  /curriculum[-_\s]?vitae/i,
  /profil[-_\s]?/i,
]

/**
 * Mots-clés contextuels indiquant une candidature
 */
const CV_CONTEXT_KEYWORDS: string[] = [
  'candidature',
  'poste',
  'offre',
  'emploi',
  'stage',
  'alternance',
  'profil',
  'cv ci-joint',
  'cv en pièce jointe',
  'mon parcours',
  'mes compétences',
  'ma candidature',
  'recherche d\'emploi',
  'opportunité',
  'postuler',
  'expérience professionnelle',
]

/**
 * Effectue une détection légère de CV (Step 1)
 * Cette étape est gratuite (pas d'appel API) et basée sur l'analyse des mots-clés
 */
export async function performLightCVDetection(
  email: Email,
  config: CVDetectionConfig = defaultConfig
): Promise<LightCVDetection> {
  // En mode test, utiliser le simulateur
  if (process.env.NEXT_PUBLIC_TEST_MODE !== 'false') {
    return simulateLightCVDetection(email)
  }

  const signals: DetectionSignal[] = []
  let totalWeight = 0

  // 1. Analyser les noms de fichiers des pièces jointes
  if (email.hasAttachment && email.attachments) {
    for (const attachment of email.attachments) {
      const lowerAttachment = attachment.toLowerCase()

      // Vérifier les patterns de nom de fichier CV
      for (const pattern of CV_FILENAME_PATTERNS) {
        if (pattern.test(lowerAttachment)) {
          signals.push({
            type: 'filename',
            value: attachment,
            weight: 4,
            description: `Nom de fichier contient un pattern CV: ${attachment}`,
          })
          totalWeight += 4
          break
        }
      }

      // Bonus pour les fichiers PDF (format courant pour les CV)
      if (lowerAttachment.endsWith('.pdf')) {
        signals.push({
          type: 'attachment_type',
          value: 'PDF',
          weight: 2,
          description: 'Fichier PDF détecté (format courant pour les CV)',
        })
        totalWeight += 2
      }

      // Bonus pour les fichiers Word
      if (lowerAttachment.endsWith('.doc') || lowerAttachment.endsWith('.docx')) {
        signals.push({
          type: 'attachment_type',
          value: 'Word',
          weight: 1,
          description: 'Fichier Word détecté',
        })
        totalWeight += 1
      }
    }
  }

  // 2. Analyser le sujet de l'email
  const subjectLower = email.subject.toLowerCase()
  for (const keyword of CV_CONTEXT_KEYWORDS) {
    if (subjectLower.includes(keyword.toLowerCase())) {
      signals.push({
        type: 'subject',
        value: keyword,
        weight: 3,
        description: `Sujet contient "${keyword}"`,
      })
      totalWeight += 3
      break // Un seul signal par zone
    }
  }

  // 3. Analyser le corps de l'email
  const bodyText = (email.body || email.preview).toLowerCase()
  let bodyKeywordsFound = 0
  for (const keyword of CV_CONTEXT_KEYWORDS) {
    if (bodyText.includes(keyword.toLowerCase()) && bodyKeywordsFound < 2) {
      signals.push({
        type: 'body',
        value: keyword,
        weight: 2,
        description: `Corps contient "${keyword}"`,
      })
      totalWeight += 2
      bodyKeywordsFound++
    }
  }

  // 4. Analyser l'expéditeur (bonus si nom de personne probable)
  const senderEmail = email.senderEmail.toLowerCase()
  if (!senderEmail.includes('noreply') &&
      !senderEmail.includes('no-reply') &&
      !senderEmail.includes('notification') &&
      !senderEmail.includes('info@')) {
    signals.push({
      type: 'sender',
      value: email.senderEmail,
      weight: 1,
      description: 'Expéditeur semble être une personne (pas un service automatique)',
    })
    totalWeight += 1
  }

  // 5. Calculer le score de confiance final
  const confidence = Math.min(100, totalWeight * 8)
  const isLikelyCV = confidence >= config.lightDetectionThreshold
  const shouldProceedToFullExtraction = confidence >= config.lightDetectionThreshold

  // Identifier le fichier CV potentiel
  let potentialCVFileName: string | undefined
  if (email.attachments) {
    // Priorité aux fichiers dont le nom contient "cv"
    potentialCVFileName = email.attachments.find(a => {
      const lower = a.toLowerCase()
      return CV_FILENAME_PATTERNS.some(p => p.test(lower)) &&
             (lower.endsWith('.pdf') || lower.endsWith('.doc') || lower.endsWith('.docx'))
    })

    // Sinon, prendre le premier PDF
    if (!potentialCVFileName) {
      potentialCVFileName = email.attachments.find(a =>
        a.toLowerCase().endsWith('.pdf')
      )
    }
  }

  return {
    isLikelyCV,
    confidence,
    signals,
    shouldProceedToFullExtraction,
    potentialCVFileName,
  }
}

/**
 * Effectue l'extraction complète du CV (Step 2)
 * Cette étape utilise l'IA et est payante
 */
export async function performCVExtraction(
  fileName: string,
  emailId?: string,
  pdfContent?: string // Base64 du PDF pour l'API réelle
): Promise<CVExtractionResult> {
  // En mode test, utiliser le simulateur
  if (process.env.NEXT_PUBLIC_TEST_MODE !== 'false') {
    return simulateCVExtraction(fileName, emailId)
  }

  // TODO: Implémenter l'appel réel à l'API OpenAI/Claude pour l'extraction
  // Pour l'instant, retourner une simulation
  return simulateCVExtraction(fileName, emailId)
}

/**
 * Processus complet de détection CV pour un email
 * Orchestre les deux étapes de détection
 */
export async function processCVDetection(
  email: Email,
  config: CVDetectionConfig = defaultConfig
): Promise<CVDetectionState> {
  const state: CVDetectionState = {
    emailId: email.id,
    step: 'pending',
  }

  try {
    // Step 1: Détection légère
    state.step = 'light_detection'
    const lightDetection = await performLightCVDetection(email, config)
    state.lightDetection = lightDetection

    // Si pas de CV détecté, arrêter là
    if (!lightDetection.shouldProceedToFullExtraction) {
      state.step = 'completed'
      return state
    }

    // Step 2: Extraction complète
    state.step = 'full_extraction'
    const fileName = lightDetection.potentialCVFileName || ''
    const fullExtraction = await performCVExtraction(fileName, email.id)
    state.fullExtraction = fullExtraction

    if (!fullExtraction.success) {
      state.step = 'failed'
      state.error = fullExtraction.errors?.join(', ') || 'Extraction failed'
      return state
    }

    state.step = 'completed'
    return state

  } catch (error) {
    state.step = 'failed'
    state.error = error instanceof Error ? error.message : 'Unknown error'
    return state
  }
}

/**
 * Vérifie rapidement si un email a des indicateurs de CV
 * Version ultra-légère pour le filtrage rapide
 */
export function hasQuickCVIndicators(email: Email): boolean {
  // Vérifier les pièces jointes
  if (email.hasAttachment && email.attachments) {
    for (const attachment of email.attachments) {
      const lower = attachment.toLowerCase()
      if (CV_FILENAME_PATTERNS.some(p => p.test(lower))) {
        return true
      }
    }
  }

  // Vérifier le sujet
  const subjectLower = email.subject.toLowerCase()
  if (subjectLower.includes('candidature') ||
      subjectLower.includes('cv') ||
      subjectLower.includes('poste')) {
    return true
  }

  return false
}

/**
 * Exports des constantes pour les tests et la configuration
 */
export {
  CV_FILENAME_PATTERNS,
  CV_CONTEXT_KEYWORDS,
  defaultConfig as CV_DETECTION_CONFIG,
}
