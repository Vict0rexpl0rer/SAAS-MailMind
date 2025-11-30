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
 * Prompt système pour la classification des emails (21 catégories)
 */
export const CLASSIFICATION_PROMPT = `Tu es un assistant spécialisé dans le tri d'emails pour les recruteurs.
Tu dois classifier chaque email dans une des 21 catégories suivantes :

RECRUTEMENT :
- "cv_spontane" : CV envoyé spontanément
- "cv_offre" : CV en réponse à une offre d'emploi
- "relance_candidat" : Relance d'un candidat
- "refus_candidat" : Refus de candidature
- "confirmation_entretien" : Confirmation d'entretien
- "question_candidat" : Question d'un candidat

BUSINESS :
- "prospect_chaud" : Prospect potentiel intéressé
- "client_existant" : Email d'un client actuel
- "partenaire" : Communication partenaire
- "fournisseur" : Communication fournisseur
- "facture_paiement" : Factures et paiements
- "devis_proposition" : Devis et propositions commerciales

COMMUNICATION :
- "equipe_interne" : Communication équipe interne
- "notification_plateforme" : Notifications LinkedIn, Indeed, etc.
- "newsletter_utile" : Newsletter pertinente
- "newsletter_ignorable" : Newsletter non prioritaire

INDÉSIRABLES :
- "spam_evident" : Spam évident
- "pub_promo" : Publicités et promotions
- "email_automatique" : Emails automatiques (no-reply)

AUTRE :
- "non_classe" : Non classé / À trier manuellement
- "doute" : Utilise cette catégorie si tu n'es pas sûr (confiance < 70%)

Analyse le sujet, l'expéditeur et le contenu pour déterminer la catégorie.
Retourne ta réponse en JSON avec la structure :
{
  "category": "string (une des 21 catégories)",
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
    category: 'non_classe',
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
