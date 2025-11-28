/**
 * =============================================================================
 * UTILITAIRES OPENAI - PLACEHOLDER
 * =============================================================================
 *
 * Ce fichier contiendra les utilitaires pour interagir avec l'API OpenAI.
 *
 * FUTURE IMPLÉMENTATION :
 * - Classification des emails
 * - Extraction d'informations des CVs
 * - Génération de résumés
 *
 * =============================================================================
 */

import { Email, Candidate, EmailCategory, ExperienceLevel } from '@/types'

/**
 * Prompt système pour la classification des emails
 */
export const CLASSIFICATION_PROMPT = `Tu es un assistant spécialisé dans le tri d'emails pour les recruteurs.
Tu dois classifier chaque email dans une des catégories suivantes :
- "cv" : L'email contient un CV ou une candidature
- "message" : Email professionnel standard (question, suivi, etc.)
- "urgent" : Email nécessitant une action immédiate
- "spam" : Email indésirable ou promotionnel
- "other" : Autre type d'email

Analyse le sujet, l'expéditeur et le contenu pour déterminer la catégorie.
Retourne ta réponse en JSON avec la structure :
{
  "category": "cv|message|urgent|spam|other",
  "confidence": 0-100,
  "reasoning": "Explication courte"
}`

/**
 * Prompt système pour l'extraction des informations d'un CV
 */
export const CV_EXTRACTION_PROMPT = `Tu es un assistant spécialisé dans l'analyse de CVs.
Extrais les informations suivantes du CV fourni :
- Prénom et Nom
- Email et téléphone
- Poste recherché
- Compétences clés (liste)
- Niveau d'expérience (junior/mid/senior/lead/executive)
- Années d'expérience
- Localisation
- Résumé du profil (2-3 phrases)

Retourne ta réponse en JSON avec la structure :
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string ou null",
  "position": "string",
  "skills": ["string"],
  "experienceLevel": "junior|mid|senior|lead|executive",
  "yearsOfExperience": number ou null,
  "location": "string ou null",
  "summary": "string"
}`

/**
 * Résultat de classification d'un email
 */
export interface ClassificationResult {
  category: EmailCategory
  confidence: number
  reasoning: string
}

/**
 * Résultat d'extraction d'un CV
 */
export interface CVExtractionResult {
  firstName: string
  lastName: string
  email: string
  phone?: string
  position: string
  skills: string[]
  experienceLevel: ExperienceLevel
  yearsOfExperience?: number
  location?: string
  summary: string
}

/**
 * Classifie un email en utilisant OpenAI (placeholder)
 */
export async function classifyEmail(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _email: Pick<Email, 'subject' | 'senderName' | 'senderEmail' | 'preview'>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _apiKey: string
): Promise<ClassificationResult> {
  // TODO: Implémenter avec le SDK OpenAI
  console.log('classifyEmail: Non implémenté')

  // Retourne un résultat placeholder
  return {
    category: 'other',
    confidence: 0,
    reasoning: 'Classification non implémentée',
  }
}

/**
 * Extrait les informations d'un CV en utilisant OpenAI (placeholder)
 */
export async function extractCVInfo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cvText: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _apiKey: string
): Promise<CVExtractionResult> {
  // TODO: Implémenter avec le SDK OpenAI
  console.log('extractCVInfo: Non implémenté')

  // Retourne un résultat placeholder
  return {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    skills: [],
    experienceLevel: 'mid',
    summary: 'Extraction non implémentée',
  }
}

/**
 * Génère un résumé d'un texte en utilisant OpenAI (placeholder)
 */
export async function summarizeText(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _text: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _apiKey: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _maxLength: number = 200
): Promise<string> {
  // TODO: Implémenter avec le SDK OpenAI
  console.log('summarizeText: Non implémenté')

  return 'Résumé non implémenté'
}

/**
 * Documentation pour l'implémentation future
 */
export const openaiImplementationGuide = `
# Guide d'implémentation OpenAI API

## 1. Installation des dépendances
\`\`\`bash
npm install openai
\`\`\`

## 2. Configuration de la clé API
La clé est stockée dans les paramètres utilisateur (Supabase)
et récupérée de manière sécurisée côté serveur.

## 3. Exemple d'implémentation
\`\`\`typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: userSettings.openaiApiKey,
})

const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [
    { role: 'system', content: CLASSIFICATION_PROMPT },
    { role: 'user', content: emailContent },
  ],
  response_format: { type: 'json_object' },
})

const result = JSON.parse(completion.choices[0].message.content)
\`\`\`

## 4. Gestion des coûts
- GPT-3.5-turbo : ~$0.002 / 1K tokens (économique)
- GPT-4-turbo : ~$0.03 / 1K tokens (plus précis)

Estimation : ~0.01-0.05$ par email avec classification + extraction CV

## 5. Bonnes pratiques
- Toujours utiliser response_format: { type: 'json_object' }
- Limiter le contexte (tokens) pour réduire les coûts
- Implémenter un cache pour éviter les appels redondants
- Logger les utilisations pour le monitoring
`
