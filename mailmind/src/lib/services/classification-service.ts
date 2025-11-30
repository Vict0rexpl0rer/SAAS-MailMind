/**
 * =============================================================================
 * SERVICE DE CLASSIFICATION D'EMAILS
 * =============================================================================
 *
 * Service responsable de la classification automatique des emails
 * dans l'une des 21 catégories définies.
 *
 * Utilise l'IA pour analyser :
 * - Le sujet de l'email
 * - Le corps du message
 * - Les pièces jointes
 * - L'expéditeur
 *
 * =============================================================================
 */

import { Email, EmailCategory, EmailCategoryGroup, ClassificationResult } from '@/types'
import { simulateEmailClassificationV2 } from '@/lib/test-mode/ai-simulator-v2'
import { getCategoryGroup } from '@/data/default-categories'

/**
 * Seuil de confiance pour marquer un email comme "doute"
 */
const DOUBT_THRESHOLD = 70

/**
 * Classifie un email dans une des 21 catégories
 */
export async function classifyEmail(email: Email): Promise<ClassificationResult> {
  // En mode test, utiliser le simulateur
  if (process.env.NEXT_PUBLIC_TEST_MODE !== 'false') {
    return simulateEmailClassificationV2(email)
  }

  // TODO: Implémenter l'appel réel à l'API OpenAI/Claude
  // Pour l'instant, retourner une simulation
  return simulateEmailClassificationV2(email)
}

/**
 * Classifie plusieurs emails en batch
 * Optimisé pour réduire les appels API
 */
export async function classifyEmailsBatch(
  emails: Email[]
): Promise<ClassificationResult[]> {
  // Pour l'instant, classifier séquentiellement
  // TODO: Optimiser avec des appels batch à l'API
  const results: ClassificationResult[] = []

  for (const email of emails) {
    const result = await classifyEmail(email)
    results.push(result)
  }

  return results
}

/**
 * Reclassifie manuellement un email
 * Met à jour la catégorie et marque comme "manuellement classifié"
 */
export async function reclassifyEmail(
  email: Email,
  newCategory: EmailCategory
): Promise<Email> {
  const now = new Date()
  const categoryGroup = getCategoryGroup(newCategory)

  return {
    ...email,
    category: newCategory,
    categoryGroup,
    manuallyClassified: true,
    classifiedAt: now,
    isDoubtful: false, // Plus de doute si classifié manuellement
    aiConfidence: 100, // Confiance maximale pour classification manuelle
  }
}

/**
 * Détermine si une classification est douteuse
 */
export function isDoubtfulClassification(confidence: number): boolean {
  return confidence < DOUBT_THRESHOLD
}

/**
 * Applique la classification à un email
 * Retourne l'email mis à jour avec la nouvelle catégorie
 */
export function applyClassificationToEmail(
  email: Email,
  classification: ClassificationResult
): Email {
  return {
    ...email,
    category: classification.category,
    categoryGroup: classification.categoryGroup,
    aiConfidence: classification.confidence,
    isDoubtful: classification.isDoubtful,
    manuallyClassified: false,
    classifiedAt: new Date(),
  }
}

/**
 * Obtient la catégorie prioritaire basée sur plusieurs signaux
 * Utile pour les cas ambigus
 */
export function getPriorityCategory(
  categories: EmailCategory[],
  scores: number[]
): EmailCategory {
  // Priorités (du plus au moins prioritaire)
  const priorityOrder: EmailCategory[] = [
    'cv_spontane',
    'cv_offre',
    'prospect_chaud',
    'client_existant',
    'equipe_interne',
    'facture_paiement',
    'confirmation_entretien',
    'relance_candidat',
    'question_candidat',
    'partenaire',
    'fournisseur',
    'devis_proposition',
    'refus_candidat',
    'notification_plateforme',
    'newsletter_utile',
    'newsletter_ignorable',
    'pub_promo',
    'email_automatique',
    'spam_evident',
    'non_classe',
    'doute',
  ]

  // Trouver la catégorie avec le meilleur score parmi les catégories prioritaires
  let bestCategory: EmailCategory = 'non_classe'
  let bestScore = 0
  let bestPriority = priorityOrder.length

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const score = scores[i]
    const priority = priorityOrder.indexOf(category)

    // Prendre la catégorie si elle a un meilleur score
    // ou le même score mais une meilleure priorité
    if (score > bestScore || (score === bestScore && priority < bestPriority)) {
      bestCategory = category
      bestScore = score
      bestPriority = priority
    }
  }

  return bestCategory
}

/**
 * Génère un prompt pour la classification par IA
 * (Pour utilisation future avec l'API réelle)
 */
export function generateClassificationPrompt(email: Email): string {
  const categoriesList = [
    'cv_spontane - CV envoyé spontanément',
    'cv_offre - CV en réponse à une offre d\'emploi',
    'relance_candidat - Relance d\'un candidat',
    'refus_candidat - Réponse à un refus de candidature',
    'confirmation_entretien - Confirmation d\'entretien',
    'question_candidat - Question d\'un candidat',
    'prospect_chaud - Prospect intéressé par le produit',
    'client_existant - Communication d\'un client actuel',
    'partenaire - Communication d\'un partenaire',
    'fournisseur - Communication d\'un fournisseur',
    'facture_paiement - Facture ou confirmation de paiement',
    'devis_proposition - Devis ou proposition commerciale',
    'equipe_interne - Communication de l\'équipe interne',
    'notification_plateforme - Notification LinkedIn, Indeed, etc.',
    'newsletter_utile - Newsletter professionnelle pertinente',
    'newsletter_ignorable - Newsletter non prioritaire',
    'spam_evident - Spam évident',
    'pub_promo - Publicité ou promotion',
    'email_automatique - Email automatique (no-reply)',
    'non_classe - Impossible à classifier',
    'doute - Classification incertaine',
  ].join('\n')

  return `Tu es un assistant spécialisé dans la classification d'emails pour un logiciel de gestion RH.

Analyse l'email suivant et classifie-le dans UNE SEULE des catégories suivantes :

${categoriesList}

EMAIL À ANALYSER :
---
De: ${email.senderName} <${email.senderEmail}>
Sujet: ${email.subject}
Pièces jointes: ${email.attachments?.join(', ') || 'Aucune'}

${email.body || email.preview}
---

Réponds UNIQUEMENT au format JSON suivant :
{
  "category": "nom_de_la_categorie",
  "confidence": 0-100,
  "reasoning": "Explication courte de ton choix"
}

Si tu n'es pas sûr à plus de 70%, utilise "doute" comme catégorie.`
}

/**
 * Exports des constantes
 */
export { DOUBT_THRESHOLD }
