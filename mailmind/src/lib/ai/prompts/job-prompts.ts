/**
 * =============================================================================
 * PROMPTS AI - RÉDACTEUR D'OFFRES D'EMPLOI
 * =============================================================================
 */

import { JobPostingInput } from '@/types'

const CONTRACT_LABELS: Record<string, string> = {
  cdi: 'CDI',
  cdd: 'CDD',
  freelance: 'Freelance',
  stage: 'Stage',
  alternance: 'Alternance',
}

const REMOTE_LABELS: Record<string, string> = {
  full: 'Full remote',
  hybrid: 'Hybride',
  none: 'Sur site',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  junior: 'Junior (0-2 ans)',
  mid: 'Confirmé (2-5 ans)',
  senior: 'Senior (5+ ans)',
  lead: 'Lead / Manager',
}

export const JOB_WRITER_SYSTEM_PROMPT = `Tu es un expert en rédaction d'offres d'emploi attractives et optimisées pour le SEO.

Tu dois créer des annonces qui :
- Attirent les meilleurs candidats
- Sont claires sur les attentes et avantages
- Utilisent des mots-clés pertinents pour le référencement
- Respectent les bonnes pratiques du recrutement français

Structure recommandée :
1. Introduction accrocheuse sur l'entreprise/le poste
2. Missions principales
3. Profil recherché
4. Ce que nous offrons
5. Processus de recrutement (optionnel)

Format ta réponse en JSON avec cette structure exacte :
{
  "title": "Le titre optimisé de l'offre",
  "content": "Le contenu complet de l'annonce avec formatage markdown",
  "seoKeywords": ["mot-clé 1", "mot-clé 2", "mot-clé 3", "mot-clé 4", "mot-clé 5"]
}`

export function createJobPrompt(input: JobPostingInput): string {
  let prompt = `Génère une offre d'emploi attractive pour le poste suivant :

**Titre du poste :** ${input.title}
`

  if (input.company) {
    prompt += `**Entreprise :** ${input.company}\n`
  }

  if (input.location) {
    prompt += `**Localisation :** ${input.location}\n`
  }

  if (input.contractType) {
    prompt += `**Type de contrat :** ${CONTRACT_LABELS[input.contractType] || input.contractType}\n`
  }

  if (input.remote) {
    prompt += `**Télétravail :** ${REMOTE_LABELS[input.remote] || input.remote}\n`
  }

  if (input.experienceLevel) {
    prompt += `**Niveau d'expérience :** ${EXPERIENCE_LABELS[input.experienceLevel] || input.experienceLevel}\n`
  }

  if (input.skills && input.skills.length > 0) {
    prompt += `**Compétences clés :** ${input.skills.join(', ')}\n`
  }

  if (input.salary) {
    prompt += `**Salaire :** ${input.salary}\n`
  }

  if (input.benefits && input.benefits.length > 0) {
    prompt += `**Avantages :** ${input.benefits.join(', ')}\n`
  }

  if (input.description) {
    prompt += `\n**Description additionnelle :**\n${input.description}\n`
  }

  prompt += '\nRéponds en JSON selon le format demandé. Le contenu doit être en markdown.'

  return prompt
}
