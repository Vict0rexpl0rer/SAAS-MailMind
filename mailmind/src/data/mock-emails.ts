/**
 * =============================================================================
 * DONNÉES MOCKÉES - EMAILS
 * =============================================================================
 *
 * Ces données simulent les emails que nous recevrons de l'API Gmail.
 * Elles permettent de développer l'interface sans connexion réelle.
 *
 * Dans le futur, ces données seront remplacées par de vrais appels API.
 *
 * =============================================================================
 */

import { Email } from '@/types'

/**
 * Liste d'emails de démonstration
 * Couvre toutes les catégories : CV, messages, spam, urgent
 */
export const mockEmails: Email[] = [
  // ===== EMAILS CV =====
  {
    id: 'email-001',
    senderName: 'Marie Dupont',
    senderEmail: 'marie.dupont@gmail.com',
    subject: 'Candidature - Développeuse Full Stack',
    preview: 'Bonjour, je vous envoie ma candidature pour le poste de développeuse Full Stack. Vous trouverez ci-joint mon CV...',
    receivedAt: new Date('2024-01-15T09:30:00'),
    category: 'cv',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Marie_Dupont.pdf'],
    aiConfidence: 95,
  },
  {
    id: 'email-002',
    senderName: 'Thomas Bernard',
    senderEmail: 'thomas.bernard@outlook.com',
    subject: 'CV - Chef de projet digital',
    preview: 'Suite à votre annonce sur LinkedIn, je me permets de vous transmettre mon CV pour le poste de chef de projet...',
    receivedAt: new Date('2024-01-15T08:15:00'),
    category: 'cv',
    status: 'read',
    hasAttachment: true,
    attachments: ['Thomas_Bernard_CV_2024.pdf', 'Lettre_motivation.pdf'],
    aiConfidence: 92,
  },
  {
    id: 'email-003',
    senderName: 'Sophie Martin',
    senderEmail: 'sophie.martin.pro@gmail.com',
    subject: 'Candidature spontanée - UX Designer',
    preview: 'Passionnée par le design et l\'expérience utilisateur, je souhaiterais rejoindre votre équipe en tant que UX Designer...',
    receivedAt: new Date('2024-01-14T16:45:00'),
    category: 'cv',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Sophie_Martin_UX.pdf', 'Portfolio.pdf'],
    aiConfidence: 88,
  },
  {
    id: 'email-004',
    senderName: 'Lucas Petit',
    senderEmail: 'lucas.petit@yahoo.fr',
    subject: 'Demande de stage - Développeur Backend',
    preview: 'Étudiant en dernière année d\'école d\'ingénieur, je recherche un stage de fin d\'études dans le développement backend...',
    receivedAt: new Date('2024-01-14T11:20:00'),
    category: 'cv',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Lucas_Petit.pdf'],
    aiConfidence: 90,
  },

  // ===== EMAILS MESSAGES =====
  {
    id: 'email-005',
    senderName: 'Jean-Pierre Moreau',
    senderEmail: 'jp.moreau@entreprise.com',
    subject: 'Re: Réunion de suivi projet',
    preview: 'Bonjour, je vous confirme ma disponibilité pour la réunion de demain à 14h. Nous pourrons discuter de l\'avancement...',
    receivedAt: new Date('2024-01-15T10:00:00'),
    category: 'message',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 98,
  },
  {
    id: 'email-006',
    senderName: 'Claire Rousseau',
    senderEmail: 'claire.rousseau@client.fr',
    subject: 'Question sur le devis',
    preview: 'Bonjour, j\'aurais quelques questions concernant le devis que vous m\'avez envoyé la semaine dernière...',
    receivedAt: new Date('2024-01-15T07:30:00'),
    category: 'message',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 96,
  },
  {
    id: 'email-007',
    senderName: 'Antoine Leroy',
    senderEmail: 'a.leroy@partenaire.com',
    subject: 'Proposition de collaboration',
    preview: 'Cher partenaire, nous souhaitons vous proposer une collaboration sur un nouveau projet innovant...',
    receivedAt: new Date('2024-01-13T15:00:00'),
    category: 'message',
    status: 'read',
    hasAttachment: true,
    attachments: ['Proposition_collaboration.pdf'],
    aiConfidence: 94,
  },

  // ===== EMAILS URGENTS =====
  {
    id: 'email-008',
    senderName: 'Direction RH',
    senderEmail: 'rh@mailmind.io',
    subject: '[URGENT] Validation contrat avant 17h',
    preview: 'Merci de valider le contrat de Thomas Bernard avant 17h aujourd\'hui. Le candidat attend notre retour...',
    receivedAt: new Date('2024-01-15T11:00:00'),
    category: 'urgent',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Contrat_Thomas_Bernard.pdf'],
    aiConfidence: 99,
  },
  {
    id: 'email-009',
    senderName: 'Support Technique',
    senderEmail: 'support@service.com',
    subject: '[ACTION REQUISE] Mise à jour de sécurité',
    preview: 'Une mise à jour critique de sécurité est disponible. Veuillez l\'appliquer dans les plus brefs délais...',
    receivedAt: new Date('2024-01-14T20:00:00'),
    category: 'urgent',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 97,
  },

  // ===== EMAILS SPAM =====
  {
    id: 'email-010',
    senderName: 'Promo Incroyable',
    senderEmail: 'noreply@promo-deals.xyz',
    subject: 'Gagnez un iPhone 15 GRATUIT !!!',
    preview: 'Félicitations ! Vous avez été sélectionné pour gagner un iPhone 15 Pro Max. Cliquez ici pour réclamer...',
    receivedAt: new Date('2024-01-15T06:00:00'),
    category: 'spam',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'email-011',
    senderName: 'Investment Opportunity',
    senderEmail: 'invest@crypto-gains.net',
    subject: 'Devenez millionnaire en 30 jours',
    preview: 'Notre système de trading automatique vous garantit des gains de 500% par mois. Inscrivez-vous maintenant...',
    receivedAt: new Date('2024-01-14T03:30:00'),
    category: 'spam',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'email-012',
    senderName: 'Service Client',
    senderEmail: 'security@banque-fake.com',
    subject: 'Votre compte a été compromis',
    preview: 'Nous avons détecté une activité suspecte sur votre compte. Cliquez sur le lien suivant pour vérifier...',
    receivedAt: new Date('2024-01-13T22:00:00'),
    category: 'spam',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },

  // ===== AUTRES EMAILS =====
  {
    id: 'email-013',
    senderName: 'Newsletter Tech',
    senderEmail: 'newsletter@tech-weekly.com',
    subject: 'Les tendances tech de la semaine',
    preview: 'Cette semaine : l\'IA générative révolutionne le recrutement, les nouveautés Next.js 14...',
    receivedAt: new Date('2024-01-15T05:00:00'),
    category: 'other',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 85,
  },
  {
    id: 'email-014',
    senderName: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: '5 personnes ont consulté votre profil',
    preview: 'Vous avez 5 nouvelles vues de profil cette semaine. Découvrez qui s\'intéresse à vous...',
    receivedAt: new Date('2024-01-14T18:00:00'),
    category: 'other',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 92,
  },
]

/**
 * Fonction helper pour filtrer les emails par catégorie
 */
export function getEmailsByCategory(category: string): Email[] {
  if (category === 'all') return mockEmails
  return mockEmails.filter(email => email.category === category)
}

/**
 * Fonction helper pour obtenir le nombre d'emails non lus par catégorie
 */
export function getUnreadCountByCategory(category: string): number {
  const emails = category === 'all' ? mockEmails : mockEmails.filter(e => e.category === category)
  return emails.filter(email => email.status === 'unread').length
}

/**
 * Statistiques des emails
 */
export const emailStats = {
  total: mockEmails.length,
  unread: mockEmails.filter(e => e.status === 'unread').length,
  cv: mockEmails.filter(e => e.category === 'cv').length,
  urgent: mockEmails.filter(e => e.category === 'urgent').length,
  spam: mockEmails.filter(e => e.category === 'spam').length,
}
