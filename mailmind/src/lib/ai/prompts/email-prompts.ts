/**
 * =============================================================================
 * PROMPTS AI - GÉNÉRATEUR D'EMAILS
 * =============================================================================
 */

import { EmailTone, EmailType } from '@/types'

const TONE_DESCRIPTIONS: Record<EmailTone, string> = {
  formal: 'formel et professionnel, avec vouvoiement',
  friendly: 'amical et chaleureux, tout en restant professionnel',
  professional: 'professionnel mais accessible, équilibré',
}

const EMAIL_TYPE_DESCRIPTIONS: Record<EmailType, string> = {
  acceptance: "une acceptation de candidature pour passer à l'étape suivante",
  rejection: 'un refus de candidature, poli et encourageant',
  info_request: "une demande d'informations complémentaires au candidat",
  followup: 'une relance suite à un précédent échange',
  interview_invite: 'une invitation à un entretien',
  custom: 'un email personnalisé selon les instructions',
}

export const EMAIL_GENERATOR_SYSTEM_PROMPT = `Tu es un expert en rédaction d'emails professionnels pour le recrutement.

Tu dois générer des emails clairs, professionnels et adaptés au contexte du recrutement français.

Règles importantes :
- Toujours écrire en français
- Adapter le ton selon les instructions
- Inclure un objet pertinent
- Être concis mais complet
- Ne jamais inventer de détails non fournis

Format ta réponse en JSON avec cette structure exacte :
{
  "subject": "L'objet de l'email",
  "body": "Le corps de l'email avec les sauts de ligne \\n appropriés"
}`

export function createEmailPrompt(params: {
  type: EmailType
  tone: EmailTone
  candidateName?: string
  position?: string
  companyName?: string
  customInstructions?: string
}): string {
  const { type, tone, candidateName, position, companyName, customInstructions } = params

  let prompt = `Génère un email de type : ${EMAIL_TYPE_DESCRIPTIONS[type]}

**Ton demandé :** ${TONE_DESCRIPTIONS[tone]}
`

  if (candidateName) {
    prompt += `**Nom du candidat :** ${candidateName}\n`
  }

  if (position) {
    prompt += `**Poste concerné :** ${position}\n`
  }

  if (companyName) {
    prompt += `**Nom de l'entreprise :** ${companyName}\n`
  }

  if (customInstructions) {
    prompt += `\n**Instructions supplémentaires :**\n${customInstructions}\n`
  }

  prompt += '\nRéponds en JSON selon le format demandé.'

  return prompt
}
