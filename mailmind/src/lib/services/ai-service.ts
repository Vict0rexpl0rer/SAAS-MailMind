/**
 * =============================================================================
 * SERVICE IA UNIFIÉ
 * =============================================================================
 *
 * Ce service gère toutes les interactions avec l'IA.
 * Il bascule automatiquement entre le simulateur de test et les vraies APIs
 * selon la configuration du mode test.
 *
 * =============================================================================
 */

import { Email } from '@/types'
import { ChatMessage } from '@/types/ai'
import { isTestMode } from '@/lib/test-mode/config'
import {
  simulateEmailClassification,
  simulateCVExtraction,
  simulateChatResponse,
  simulateEmailGeneration,
  simulateJobGeneration,
  simulateEmailSummary
} from '@/lib/test-mode/ai-simulator'
import type { MockCVData } from '@/lib/test-mode/mock-cvs'

/**
 * =============================================================================
 * CLASSIFICATION D'EMAILS
 * =============================================================================
 */

export interface ClassificationResult {
  category: string
  confidence: number
  reasoning: string
  isDoubtful: boolean
}

/**
 * Classifie un email (CV, spam, urgent, etc.)
 */
export async function classifyEmail(email: Email): Promise<ClassificationResult> {
  if (isTestMode()) {
    return simulateEmailClassification(email)
  }

  // TODO: Appel à l'API OpenAI réelle
  // Pour l'instant, on utilise le simulateur comme fallback
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateEmailClassification(email)
}

/**
 * Classifie plusieurs emails en batch
 */
export async function classifyEmailsBatch(
  emails: Email[]
): Promise<Map<string, ClassificationResult>> {
  const results = new Map<string, ClassificationResult>()

  // En mode test, on traite séquentiellement avec un délai réduit
  if (isTestMode()) {
    for (const email of emails) {
      const result = await simulateEmailClassification(email)
      results.set(email.id, result)
    }
    return results
  }

  // TODO: Implémenter le batch processing avec l'API réelle
  for (const email of emails) {
    const result = await classifyEmail(email)
    results.set(email.id, result)
  }

  return results
}

/**
 * =============================================================================
 * EXTRACTION DE CV
 * =============================================================================
 */

export interface CVExtractionResult {
  success: boolean
  data?: MockCVData
  error?: string
  confidence: number
}

/**
 * Extrait les informations d'un CV
 */
export async function extractCVInfo(
  emailId?: string,
  fileName?: string,
  pdfContent?: string
): Promise<CVExtractionResult> {
  if (isTestMode()) {
    return simulateCVExtraction(emailId, fileName)
  }

  // TODO: Appel à l'API OpenAI réelle avec le contenu PDF
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateCVExtraction(emailId, fileName)
}

/**
 * =============================================================================
 * CHAT IA (MIRA)
 * =============================================================================
 */

export interface ChatContext {
  candidateName?: string
  candidatePosition?: string
  emailSubject?: string
  currentPage?: string
}

/**
 * Envoie un message au chat IA et reçoit une réponse
 */
export async function sendChatMessage(
  userMessage: string,
  context?: ChatContext,
  history?: ChatMessage[]
): Promise<ChatMessage> {
  if (isTestMode()) {
    return simulateChatResponse(userMessage, context)
  }

  // TODO: Appel à l'API OpenAI réelle
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateChatResponse(userMessage, context)
}

/**
 * =============================================================================
 * GÉNÉRATION D'EMAILS
 * =============================================================================
 */

export interface GeneratedEmail {
  subject: string
  body: string
  tone: string
}

export type EmailType =
  | 'acceptance'
  | 'rejection'
  | 'info_request'
  | 'interview_invite'
  | 'followup'
  | 'custom'

export type EmailTone = 'formal' | 'professional' | 'friendly'

/**
 * Génère un email professionnel
 */
export async function generateEmail(
  type: EmailType,
  candidateName?: string,
  position?: string,
  tone: EmailTone = 'professional',
  customInstructions?: string
): Promise<GeneratedEmail> {
  if (isTestMode()) {
    return simulateEmailGeneration(type, candidateName, position, tone)
  }

  // TODO: Appel à l'API OpenAI réelle
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateEmailGeneration(type, candidateName, position, tone)
}

/**
 * =============================================================================
 * GÉNÉRATION D'OFFRES D'EMPLOI
 * =============================================================================
 */

export interface GeneratedJobPosting {
  title: string
  content: string
  seoKeywords: string[]
}

export interface JobPostingInput {
  title: string
  company?: string
  location?: string
  contractType?: 'cdi' | 'cdd' | 'freelance' | 'stage' | 'alternance'
  remote?: 'full' | 'hybrid' | 'office'
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'lead'
  skills?: string[]
  description?: string
  salary?: string
  benefits?: string[]
}

/**
 * Génère une offre d'emploi
 */
export async function generateJobPosting(
  input: JobPostingInput
): Promise<GeneratedJobPosting> {
  if (isTestMode()) {
    return simulateJobGeneration(input.title, input.company, input.skills)
  }

  // TODO: Appel à l'API OpenAI réelle
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateJobGeneration(input.title, input.company, input.skills)
}

/**
 * =============================================================================
 * RÉSUMÉ D'EMAIL
 * =============================================================================
 */

export interface EmailSummary {
  summary: string
  keyPoints: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  suggestedActions: string[]
}

/**
 * Génère un résumé d'un email
 */
export async function summarizeEmail(email: Email): Promise<EmailSummary> {
  if (isTestMode()) {
    return simulateEmailSummary(email)
  }

  // TODO: Appel à l'API OpenAI réelle
  console.warn('OpenAI API not configured - using simulator as fallback')
  return simulateEmailSummary(email)
}

/**
 * =============================================================================
 * VÉRIFICATION DE LA CONFIGURATION IA
 * =============================================================================
 */

/**
 * Vérifie si une clé API est configurée
 */
export function hasAIConfiguration(): boolean {
  if (isTestMode()) {
    return true // En mode test, on simule que c'est configuré
  }

  // Vérifier si une clé API est présente
  const openaiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  const mistralKey = process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY

  return !!(openaiKey || mistralKey)
}

/**
 * Retourne le provider IA actif
 */
export function getActiveAIProvider(): 'openai' | 'mistral' | 'simulator' | null {
  if (isTestMode()) {
    return 'simulator'
  }

  if (process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return 'openai'
  }

  if (process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY) {
    return 'mistral'
  }

  return null
}
