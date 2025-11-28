/**
 * =============================================================================
 * DONNÉES - TEMPLATES D'EMAILS
 * =============================================================================
 *
 * Templates prédéfinis pour le générateur d'emails.
 *
 * =============================================================================
 */

import { EmailTemplate, EmailType } from '@/types'

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'acceptance',
    name: 'Acceptation de candidature',
    type: 'acceptance',
    description: 'Informer un candidat que sa candidature est retenue pour la suite du processus',
    defaultTone: 'professional',
  },
  {
    id: 'rejection',
    name: 'Refus de candidature',
    type: 'rejection',
    description: 'Informer un candidat que sa candidature n\'a pas été retenue, de manière respectueuse',
    defaultTone: 'professional',
  },
  {
    id: 'info_request',
    name: 'Demande d\'informations',
    type: 'info_request',
    description: 'Demander des informations complémentaires à un candidat',
    defaultTone: 'friendly',
  },
  {
    id: 'interview_invite',
    name: 'Invitation à un entretien',
    type: 'interview_invite',
    description: 'Inviter un candidat à passer un entretien',
    defaultTone: 'professional',
  },
  {
    id: 'followup',
    name: 'Relance',
    type: 'followup',
    description: 'Relancer un candidat suite à un précédent échange',
    defaultTone: 'friendly',
  },
  {
    id: 'custom',
    name: 'Email personnalisé',
    type: 'custom',
    description: 'Créer un email entièrement personnalisé selon vos instructions',
    defaultTone: 'professional',
  },
]

export const toneLabels: Record<string, string> = {
  formal: 'Formel',
  friendly: 'Amical',
  professional: 'Professionnel',
}

export const typeLabels: Record<EmailType, string> = {
  acceptance: 'Acceptation',
  rejection: 'Refus',
  info_request: 'Demande d\'infos',
  interview_invite: 'Invitation entretien',
  followup: 'Relance',
  custom: 'Personnalisé',
}
