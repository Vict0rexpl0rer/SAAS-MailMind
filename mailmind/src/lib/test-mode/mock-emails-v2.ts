/**
 * =============================================================================
 * BASE DE DONNÉES D'EMAILS FICTIFS - MODE TEST V2
 * =============================================================================
 *
 * 60+ emails pour les 21 catégories (minimum 2-3 par catégorie) :
 *
 * RECRUTEMENT (6 catégories):
 * - cv_spontane, cv_offre, relance_candidat, refus_candidat, confirmation_entretien, question_candidat
 *
 * BUSINESS (6 catégories):
 * - prospect_chaud, client_existant, partenaire, fournisseur, facture_paiement, devis_proposition
 *
 * COMMUNICATION (4 catégories):
 * - equipe_interne, notification_plateforme, newsletter_utile, newsletter_ignorable
 *
 * INDESIRABLES (3 catégories):
 * - spam_evident, pub_promo, email_automatique
 *
 * AUTRE (2 catégories):
 * - non_classe, doute
 *
 * =============================================================================
 */

import { Email, EmailCategory, EmailCategoryGroup } from '@/types'
import { getCategoryGroup } from '@/data/default-categories'

// Fonction utilitaire pour générer des dates récentes
function daysAgo(days: number, hours = 0): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(date.getHours() - hours)
  return date
}

// Helper pour créer un email avec les nouveaux champs
function createEmail(
  id: string,
  senderName: string,
  senderEmail: string,
  subject: string,
  preview: string,
  body: string,
  receivedAt: Date,
  category: EmailCategory,
  status: 'read' | 'unread',
  hasAttachment: boolean,
  attachments: string[] = [],
  aiConfidence: number = 85,
  hasCv: boolean = false,
  candidateId?: string
): Email {
  const isDoubtful = aiConfidence < 70
  return {
    id,
    senderName,
    senderEmail,
    subject,
    preview,
    body,
    receivedAt,
    category: isDoubtful ? 'doute' : category,
    categoryGroup: isDoubtful ? 'autre' : getCategoryGroup(category),
    status,
    hasAttachment,
    attachments,
    aiConfidence,
    isDoubtful,
    manuallyClassified: false,
    classifiedAt: receivedAt,
    hasCv,
    cvDetectionStep: hasCv ? 'full' : 'none',
    candidateId,
  }
}

/**
 * =============================================================================
 * RECRUTEMENT - CV SPONTANÉ (3 emails)
 * =============================================================================
 */
export const cvSpontaneEmails: Email[] = [
  createEmail(
    'cv-spon-001',
    'Marie Dupont',
    'marie.dupont@gmail.com',
    'Candidature - Développeuse Full Stack',
    'Bonjour, je vous envoie ma candidature spontanée pour un poste de développeuse Full Stack...',
    `Bonjour,

Je me permets de vous contacter car je suis à la recherche d'un nouveau défi professionnel en tant que Développeuse Full Stack.

Diplômée d'une école d'ingénieur et forte de 4 années d'expérience, j'ai travaillé sur des projets variés.

Mes compétences principales :
- Frontend : React, Next.js, TypeScript, Tailwind CSS
- Backend : Node.js, Python, PostgreSQL
- DevOps : Docker, CI/CD, AWS

Vous trouverez ci-joint mon CV détaillé.

Cordialement,
Marie Dupont`,
    daysAgo(0, 2),
    'cv_spontane',
    'unread',
    true,
    ['CV_Marie_Dupont.pdf'],
    95,
    true,
    'cand-001'
  ),
  createEmail(
    'cv-spon-002',
    'Sophie Martin',
    'sophie.martin.pro@gmail.com',
    'Candidature spontanée - UX Designer',
    "Passionnée par le design et l'expérience utilisateur, je souhaiterais rejoindre votre équipe...",
    `Bonjour,

Passionnée par le design et l'expérience utilisateur, je vous contacte spontanément.

Mon parcours :
- 5 ans d'expérience en UX/UI Design
- Spécialisation en design system et accessibilité
- Expérience en product discovery

Mon portfolio : portfolio.sophiemartin.design

Sophie Martin`,
    daysAgo(1, 3),
    'cv_spontane',
    'unread',
    true,
    ['CV_Sophie_Martin_UX.pdf'],
    88,
    true,
    'cand-002'
  ),
  createEmail(
    'cv-spon-003',
    'Lucas Petit',
    'lucas.petit@yahoo.fr',
    'Demande de stage - Développeur Backend',
    "Étudiant en dernière année, je recherche un stage de fin d'études...",
    `Bonjour,

Actuellement en dernière année à l'ENSEIRB-MATMECA, je recherche un stage de 6 mois.

Compétences techniques :
- Python, Django, FastAPI
- PostgreSQL, MongoDB
- Git, Docker

Cordialement,
Lucas Petit`,
    daysAgo(1, 8),
    'cv_spontane',
    'read',
    true,
    ['CV_Lucas_Petit.pdf'],
    90,
    true,
    'cand-003'
  ),
]

/**
 * =============================================================================
 * RECRUTEMENT - CV EN RÉPONSE À UNE OFFRE (3 emails)
 * =============================================================================
 */
export const cvOffreEmails: Email[] = [
  createEmail(
    'cv-offre-001',
    'Thomas Bernard',
    'thomas.bernard@outlook.com',
    'Réf. DEV2024-15 : Candidature Chef de projet digital',
    'Suite à votre annonce sur LinkedIn pour le poste DEV2024-15, je vous adresse ma candidature...',
    `Madame, Monsieur,

Suite à votre offre référence DEV2024-15 publiée sur LinkedIn pour un poste de Chef de Projet Digital, je vous adresse ma candidature.

Avec 8 ans d'expérience en gestion de projets digitaux, j'ai piloté des équipes de 5 à 15 personnes.

Points forts :
- Certification PMP et Scrum Master
- Expertise en méthodologies agiles
- Gestion de budgets jusqu'à 500K€

Thomas Bernard`,
    daysAgo(0, 5),
    'cv_offre',
    'read',
    true,
    ['Thomas_Bernard_CV_2024.pdf', 'Lettre_motivation.pdf'],
    92,
    true,
    'cand-004'
  ),
  createEmail(
    'cv-offre-002',
    'Emma Lefevre',
    'emma.lefevre@gmail.com',
    'Candidature Data Scientist - Offre TECH-42',
    'En réponse à votre offre TECH-42 pour un Data Scientist, je vous envoie mon dossier...',
    `Bonjour,

Je postule pour le poste de Data Scientist (réf. TECH-42) publié sur Welcome to the Jungle.

Mon parcours :
- 6 ans d'expérience en Data Science
- Déploiement de modèles ML en production
- Expertise TensorFlow, PyTorch, Spark

Disponible sous 2 mois.

Emma Lefevre`,
    daysAgo(2, 1),
    'cv_offre',
    'unread',
    true,
    ['CV_Emma_Lefevre_DataScientist.pdf'],
    94,
    true,
    'cand-005'
  ),
  createEmail(
    'cv-offre-003',
    'Pierre Durand',
    'p.durand@hotmail.com',
    'RE: Offre Commercial B2B - Ma candidature',
    'Suite à notre échange au salon VivaTech, je postule officiellement pour le poste commercial...',
    `Bonjour Monsieur,

Suite à notre rencontre au salon VivaTech, je vous adresse ma candidature officielle pour le poste de Commercial B2B.

Comme évoqué, j'ai 10 ans d'expérience dans la vente de solutions SaaS.

Je reste disponible pour un entretien.

Pierre Durand`,
    daysAgo(3, 4),
    'cv_offre',
    'read',
    true,
    ['CV_Pierre_Durand.pdf'],
    87,
    true,
    'cand-006'
  ),
]

/**
 * =============================================================================
 * RECRUTEMENT - RELANCE CANDIDAT (2 emails)
 * =============================================================================
 */
export const relanceCandidatEmails: Email[] = [
  createEmail(
    'relance-001',
    'Marie Dupont',
    'marie.dupont@gmail.com',
    'Relance - Candidature Développeuse Full Stack',
    'Je me permets de revenir vers vous concernant ma candidature envoyée il y a une semaine...',
    `Bonjour,

Je me permets de revenir vers vous concernant ma candidature pour le poste de Développeuse Full Stack.

Je reste très motivée par cette opportunité et serais ravie d'en discuter.

N'hésitez pas à me contacter si vous avez besoin d'informations complémentaires.

Marie Dupont`,
    daysAgo(0, 1),
    'relance_candidat',
    'unread',
    false,
    [],
    91
  ),
  createEmail(
    'relance-002',
    'Thomas Bernard',
    'thomas.bernard@outlook.com',
    'Suivi candidature - Chef de projet (DEV2024-15)',
    'Sans nouvelles de votre part, je me permets de vous relancer...',
    `Bonjour,

Je vous ai envoyé ma candidature pour le poste de Chef de Projet il y a 2 semaines (réf DEV2024-15).

N'ayant pas reçu de réponse, je me permets de vous relancer.

Ma motivation reste intacte et je suis disponible pour un entretien.

Cordialement,
Thomas Bernard`,
    daysAgo(1, 2),
    'relance_candidat',
    'read',
    false,
    [],
    89
  ),
]

/**
 * =============================================================================
 * RECRUTEMENT - REFUS CANDIDAT (2 emails)
 * =============================================================================
 */
export const refusCandidatEmails: Email[] = [
  createEmail(
    'refus-001',
    'Julie Moreau',
    'julie.moreau@gmail.com',
    'RE: Votre réponse - Poste Marketing Manager',
    'Je vous remercie pour votre retour concernant ma candidature. Bien que déçue...',
    `Bonjour,

Je vous remercie pour votre retour concernant ma candidature au poste de Marketing Manager.

Bien que déçue par cette décision, je comprends que vous ayez trouvé un profil plus adapté.

Je reste ouverte à de futures opportunités au sein de votre entreprise.

Cordialement,
Julie Moreau`,
    daysAgo(2, 5),
    'refus_candidat',
    'read',
    false,
    [],
    85
  ),
  createEmail(
    'refus-002',
    'Antoine Roux',
    'antoine.roux@proton.me',
    'Suite à notre entretien - Candidature développeur',
    'Je prends acte de votre décision de ne pas retenir ma candidature...',
    `Bonjour,

Suite à votre email, je prends acte de votre décision.

Je vous remercie pour le temps accordé lors de l'entretien et pour les retours constructifs.

Je vous souhaite une bonne continuation.

Antoine Roux`,
    daysAgo(3, 1),
    'refus_candidat',
    'read',
    false,
    [],
    82
  ),
]

/**
 * =============================================================================
 * RECRUTEMENT - CONFIRMATION ENTRETIEN (2 emails)
 * =============================================================================
 */
export const confirmationEntretienEmails: Email[] = [
  createEmail(
    'entretien-001',
    'Sophie Martin',
    'sophie.martin.pro@gmail.com',
    'RE: Invitation entretien - UX Designer',
    'Je confirme ma présence pour l\'entretien du 15 décembre à 14h...',
    `Bonjour,

Je confirme ma présence pour l'entretien du 15 décembre à 14h dans vos locaux.

Je vous remercie pour cette opportunité.

À bientôt,
Sophie Martin`,
    daysAgo(0, 4),
    'confirmation_entretien',
    'unread',
    false,
    [],
    93
  ),
  createEmail(
    'entretien-002',
    'Emma Lefevre',
    'emma.lefevre@gmail.com',
    'Confirmation entretien technique - Data Scientist',
    'C\'est noté pour le test technique le 18 décembre. J\'ai bien reçu les instructions...',
    `Bonjour,

Je confirme ma disponibilité pour le test technique le 18 décembre.

J'ai bien reçu les instructions et l'accès à la plateforme.

Merci pour votre organisation.

Emma Lefevre`,
    daysAgo(1, 6),
    'confirmation_entretien',
    'read',
    false,
    [],
    90
  ),
]

/**
 * =============================================================================
 * RECRUTEMENT - QUESTION CANDIDAT (2 emails)
 * =============================================================================
 */
export const questionCandidatEmails: Email[] = [
  createEmail(
    'question-001',
    'Lucas Petit',
    'lucas.petit@yahoo.fr',
    'Question sur le poste de stage',
    'J\'aurais quelques questions concernant le stage proposé...',
    `Bonjour,

Suite à l'offre de stage, j'aurais quelques questions :

1. Le stage est-il éligible à une convention CIFRE ?
2. Y a-t-il possibilité de télétravail ?
3. Quel est le processus de recrutement ?

Merci pour vos éclaircissements.

Lucas Petit`,
    daysAgo(0, 6),
    'question_candidat',
    'unread',
    false,
    [],
    86
  ),
  createEmail(
    'question-002',
    'Pierre Durand',
    'p.durand@hotmail.com',
    'Précisions sur le package salarial',
    'Avant de confirmer ma participation au process, j\'aurais besoin de précisions...',
    `Bonjour,

Avant de poursuivre le processus de recrutement, j'aurais besoin de précisions :

- Quelle est la fourchette salariale pour ce poste ?
- Y a-t-il une part variable ?
- Quels sont les avantages (mutuelle, tickets resto, etc.) ?

Merci,
Pierre Durand`,
    daysAgo(2, 3),
    'question_candidat',
    'read',
    false,
    [],
    84
  ),
]

/**
 * =============================================================================
 * BUSINESS - PROSPECT CHAUD (3 emails)
 * =============================================================================
 */
export const prospectChaudEmails: Email[] = [
  createEmail(
    'prospect-001',
    'Alexandre Mercier',
    'a.mercier@techvision.fr',
    'Demande de démo - Solution RH',
    'Nous sommes très intéressés par votre solution. Pourrions-nous organiser une démo...',
    `Bonjour,

Je suis DRH chez TechVision (350 employés) et nous recherchons une solution pour automatiser notre tri de CVs.

Votre produit correspond parfaitement à nos besoins.

Pourrions-nous organiser une démonstration cette semaine ?

Budget prévu : 15-20K€/an

Alexandre Mercier
DRH - TechVision`,
    daysAgo(0, 3),
    'prospect_chaud',
    'unread',
    false,
    [],
    96
  ),
  createEmail(
    'prospect-002',
    'Caroline Blanc',
    'c.blanc@recrut-plus.com',
    'Suite salon HR Tech - Votre solution nous intéresse',
    'Suite à notre échange au salon, je souhaite approfondir notre discussion...',
    `Bonjour,

Suite à notre rencontre au salon HR Tech, je reviens vers vous.

J'ai présenté votre solution à notre direction et nous sommes très intéressés.

Pourrions-nous organiser un call avec notre DSI ?

Cordialement,
Caroline Blanc`,
    daysAgo(1, 4),
    'prospect_chaud',
    'read',
    false,
    [],
    94
  ),
  createEmail(
    'prospect-003',
    'Marc Leroy',
    'marc.leroy@startup.io',
    'Urgent - Besoin solution recrutement',
    'Nous recrutons 50 personnes en 3 mois et avons besoin d\'une solution immédiatement...',
    `Bonjour,

Notre startup vient de lever 10M€ et nous devons recruter 50 personnes d'ici mars.

Nous avons besoin d'une solution robuste et rapide à déployer.

Pouvez-vous m'envoyer une proposition commerciale en urgence ?

Marc Leroy
CEO - Startup.io`,
    daysAgo(0, 1),
    'prospect_chaud',
    'unread',
    false,
    [],
    98
  ),
]

/**
 * =============================================================================
 * BUSINESS - CLIENT EXISTANT (3 emails)
 * =============================================================================
 */
export const clientExistantEmails: Email[] = [
  createEmail(
    'client-001',
    'Support MediaCorp',
    'support@mediacorp.fr',
    'Question sur la fonctionnalité de tri automatique',
    'Nos équipes ont une question concernant le paramétrage du tri automatique...',
    `Bonjour,

Nous utilisons votre solution depuis 6 mois et nous en sommes très satisfaits.

Cependant, nos équipes ont une question sur le paramétrage des catégories personnalisées.

Pourriez-vous nous organiser un call de support ?

Merci,
Support MediaCorp`,
    daysAgo(0, 5),
    'client_existant',
    'unread',
    false,
    [],
    89
  ),
  createEmail(
    'client-002',
    'Anne Dubois',
    'anne.dubois@groupe-alpha.com',
    'Renouvellement abonnement Pro',
    'Notre abonnement arrive à échéance le mois prochain. Nous souhaitons renouveler...',
    `Bonjour,

Notre abonnement Pro arrive à échéance le 31 janvier.

Nous souhaitons renouveler et passer à l'offre Enterprise (5 utilisateurs supplémentaires).

Pouvez-vous nous envoyer le nouveau devis ?

Anne Dubois
Groupe Alpha`,
    daysAgo(1, 7),
    'client_existant',
    'read',
    false,
    [],
    91
  ),
  createEmail(
    'client-003',
    'Julien Martin',
    'j.martin@innovation-lab.fr',
    'Feedback positif - Votre solution a changé notre process',
    'Je tenais à vous faire un retour après 3 mois d\'utilisation...',
    `Bonjour,

Après 3 mois d'utilisation, je tenais à vous faire un retour.

Votre solution a transformé notre processus de recrutement :
- Temps de tri divisé par 5
- 30% de candidatures traitées en plus
- Équipe RH beaucoup plus sereine

Merci pour votre travail !

Julien Martin`,
    daysAgo(2, 2),
    'client_existant',
    'read',
    false,
    [],
    87
  ),
]

/**
 * =============================================================================
 * BUSINESS - PARTENAIRE (2 emails)
 * =============================================================================
 */
export const partenaireEmails: Email[] = [
  createEmail(
    'partenaire-001',
    'LinkedIn Partnership',
    'partnerships@linkedin.com',
    'Proposition de partenariat - Intégration LinkedIn Recruiter',
    'Nous avons identifié votre solution comme compatible avec LinkedIn Recruiter...',
    `Bonjour,

L'équipe LinkedIn Partnerships a identifié votre solution MailMind comme un excellent candidat pour notre programme de partenaires.

Nous proposons une intégration native avec LinkedIn Recruiter qui pourrait bénéficier à vos clients.

Seriez-vous disponible pour un call la semaine prochaine ?

LinkedIn Partnership Team`,
    daysAgo(1, 5),
    'partenaire',
    'unread',
    false,
    [],
    88
  ),
  createEmail(
    'partenaire-002',
    'Indeed France',
    'partenaires@indeed.fr',
    'Collaboration Indeed x MailMind',
    'Suite à notre webinar commun, discutons des prochaines étapes...',
    `Bonjour,

Le webinar que nous avons organisé ensemble a été un succès (450 participants).

Nous aimerions approfondir notre collaboration :
- Co-marketing
- Intégration technique
- Offre commune

Qu'en pensez-vous ?

Indeed France`,
    daysAgo(3, 6),
    'partenaire',
    'read',
    true,
    ['Presentation_Partenariat_Indeed.pdf'],
    85
  ),
]

/**
 * =============================================================================
 * BUSINESS - FOURNISSEUR (2 emails)
 * =============================================================================
 */
export const fournisseurEmails: Email[] = [
  createEmail(
    'fournisseur-001',
    'AWS France',
    'aws-sales@amazon.com',
    'Votre utilisation AWS - Optimisation possible',
    'Nous avons analysé votre usage et identifié des optimisations possibles...',
    `Bonjour,

En tant que partenaire AWS, nous avons analysé votre utilisation de nos services.

Nous avons identifié plusieurs optimisations qui pourraient réduire votre facture de 20%.

Souhaitez-vous qu'on en discute ?

AWS France`,
    daysAgo(2, 4),
    'fournisseur',
    'read',
    false,
    [],
    83
  ),
  createEmail(
    'fournisseur-002',
    'OpenAI Enterprise',
    'enterprise@openai.com',
    'Mise à jour API - Nouvelles fonctionnalités GPT-4',
    'De nouvelles fonctionnalités sont disponibles pour votre compte Enterprise...',
    `Hello,

We're excited to announce new features available for your Enterprise account:

- GPT-4 Turbo with 128K context
- Improved function calling
- Better JSON mode

Check our documentation for migration guide.

OpenAI Team`,
    daysAgo(1, 1),
    'fournisseur',
    'unread',
    true,
    ['OpenAI_Release_Notes.pdf'],
    86
  ),
]

/**
 * =============================================================================
 * BUSINESS - FACTURE / PAIEMENT (2 emails)
 * =============================================================================
 */
export const facturePaiementEmails: Email[] = [
  createEmail(
    'facture-001',
    'Comptabilité Vercel',
    'billing@vercel.com',
    'Facture #VRC-2024-1234 - Décembre 2024',
    'Veuillez trouver ci-joint votre facture pour le mois de décembre...',
    `Bonjour,

Votre facture Vercel pour décembre 2024 est disponible.

Montant : 89.00€ TTC
Échéance : 15 janvier 2025

Merci de procéder au règlement.

Vercel Billing`,
    daysAgo(0, 8),
    'facture_paiement',
    'unread',
    true,
    ['Facture_VRC_2024_1234.pdf'],
    95
  ),
  createEmail(
    'facture-002',
    'Stripe Payments',
    'receipts@stripe.com',
    'Confirmation de paiement reçu - 2,500€',
    'Nous confirmons la réception de votre paiement...',
    `Bonjour,

Nous confirmons la réception de votre paiement :

Montant : 2,500.00€
Référence : PAY-2024-5678
Client : Groupe Alpha

Le virement sera effectué sous 2 jours ouvrés.

Stripe`,
    daysAgo(1, 3),
    'facture_paiement',
    'read',
    true,
    ['Stripe_Receipt_5678.pdf'],
    92
  ),
]

/**
 * =============================================================================
 * BUSINESS - DEVIS / PROPOSITION (2 emails)
 * =============================================================================
 */
export const devisPropositionEmails: Email[] = [
  createEmail(
    'devis-001',
    'Agence WebDesign Pro',
    'commercial@webdesign-pro.fr',
    'Devis refonte landing page - V2',
    'Suite à notre échange, voici le devis révisé pour la refonte de votre landing...',
    `Bonjour,

Suite à vos retours, voici le devis révisé :

Prestation : Refonte landing page
Montant : 4,500€ HT
Délai : 3 semaines

Le devis est valable 30 jours.

WebDesign Pro`,
    daysAgo(2, 5),
    'devis_proposition',
    'unread',
    true,
    ['Devis_WebDesign_V2.pdf'],
    88
  ),
  createEmail(
    'devis-002',
    'Consultant SEO Expert',
    'contact@seo-expert.fr',
    'Proposition audit SEO complet',
    'Suite à notre premier échange, voici ma proposition pour un audit SEO...',
    `Bonjour,

Voici ma proposition pour l'audit SEO de votre site :

1. Audit technique complet
2. Analyse de la concurrence
3. Plan d'action sur 6 mois
4. Accompagnement mensuel

Budget total : 3,200€ HT

SEO Expert`,
    daysAgo(3, 2),
    'devis_proposition',
    'read',
    true,
    ['Proposition_SEO_MailMind.pdf'],
    84
  ),
]

/**
 * =============================================================================
 * COMMUNICATION - ÉQUIPE INTERNE (3 emails)
 * =============================================================================
 */
export const equipeInterneEmails: Email[] = [
  createEmail(
    'interne-001',
    'Sarah Chen',
    'sarah.chen@mailmind.io',
    'Point hebdo équipe produit - Notes',
    'Voici le récap de notre réunion hebdo...',
    `Hey team,

Voici les notes de notre point hebdo :

✅ Fait cette semaine :
- Feature catégories custom livrée
- Bug fix extraction CV

📋 À faire :
- Tests utilisateurs
- Documentation API

📅 Prochaine release : vendredi

Sarah`,
    daysAgo(0, 2),
    'equipe_interne',
    'unread',
    false,
    [],
    97
  ),
  createEmail(
    'interne-002',
    'David Lee',
    'david.lee@mailmind.io',
    'Review de code urgente - PR #234',
    'Peux-tu review ma PR sur le fix de classification ? C\'est urgent...',
    `Salut,

J'ai besoin d'une review urgente sur ma PR #234 :
https://github.com/mailmind/app/pull/234

C'est le fix pour le bug de classification en prod.

Merci !
David`,
    daysAgo(0, 4),
    'equipe_interne',
    'unread',
    false,
    [],
    95
  ),
  createEmail(
    'interne-003',
    'Lisa Dumont',
    'lisa.dumont@mailmind.io',
    'Congés de fin d\'année - Rappel',
    'Petit rappel pour poser vos congés de fin d\'année avant le 15 décembre...',
    `Bonjour à tous,

Rappel : merci de poser vos congés de fin d'année avant le 15 décembre sur Payfit.

La fermeture est prévue du 24 décembre au 2 janvier inclus.

Bonne journée,
Lisa - RH`,
    daysAgo(1, 6),
    'equipe_interne',
    'read',
    false,
    [],
    93
  ),
]

/**
 * =============================================================================
 * COMMUNICATION - NOTIFICATION PLATEFORME (3 emails)
 * =============================================================================
 */
export const notificationPlateformeEmails: Email[] = [
  createEmail(
    'notif-001',
    'LinkedIn',
    'notifications@linkedin.com',
    '5 personnes ont consulté votre profil',
    'Votre profil a été consulté par 5 personnes cette semaine...',
    `Bonjour,

Cette semaine sur LinkedIn :
- 5 personnes ont consulté votre profil
- 3 nouvelles demandes de connexion
- 12 réactions à vos publications

Voir les détails →

LinkedIn`,
    daysAgo(0, 7),
    'notification_plateforme',
    'read',
    false,
    [],
    91
  ),
  createEmail(
    'notif-002',
    'Indeed Recruiter',
    'alerts@indeed.com',
    '12 nouvelles candidatures pour vos offres',
    'Vous avez reçu 12 nouvelles candidatures depuis hier...',
    `Bonjour,

12 nouvelles candidatures pour vos offres :

• Développeur Full Stack (8)
• Data Scientist (3)
• Product Manager (1)

Consultez-les sur Indeed Recruiter →

Indeed`,
    daysAgo(0, 9),
    'notification_plateforme',
    'unread',
    false,
    [],
    89
  ),
  createEmail(
    'notif-003',
    'Welcome to the Jungle',
    'notifications@wttj.co',
    'Votre offre arrive à expiration',
    'Votre offre "Développeur Backend" expire dans 3 jours...',
    `Bonjour,

Votre offre "Développeur Backend" expire dans 3 jours.

Actions possibles :
- Prolonger l'offre (7 jours gratuits)
- Archiver l'offre
- Créer une nouvelle offre

Welcome to the Jungle`,
    daysAgo(1, 2),
    'notification_plateforme',
    'read',
    false,
    [],
    87
  ),
]

/**
 * =============================================================================
 * COMMUNICATION - NEWSLETTER UTILE (2 emails)
 * =============================================================================
 */
export const newsletterUtileEmails: Email[] = [
  createEmail(
    'news-utile-001',
    'HR Tech Weekly',
    'digest@hrtech-weekly.com',
    'Les tendances RH 2025 - Dossier complet',
    'Intelligence artificielle, bien-être au travail, flexibilité... Les tendances qui vont marquer 2025...',
    `📊 HR Tech Weekly - Édition Spéciale

Les tendances RH 2025 :

1. IA générative dans le recrutement
2. Bien-être et santé mentale
3. Travail hybride pérennisé
4. Upskilling massif

Lire le dossier complet →

HR Tech Weekly`,
    daysAgo(1, 8),
    'newsletter_utile',
    'read',
    false,
    [],
    82
  ),
  createEmail(
    'news-utile-002',
    'Product Hunt',
    'digest@producthunt.com',
    'Top 10 AI Tools for HR - This Week',
    'Discover the best AI-powered HR tools launched this week...',
    `🚀 Product Hunt Weekly

Top AI Tools for HR this week:

1. ResumeAI - CV parsing
2. InterviewBot - AI interviews
3. MailMind - Email sorting (that's you! 🎉)

See all launches →

Product Hunt`,
    daysAgo(2, 4),
    'newsletter_utile',
    'unread',
    false,
    [],
    79
  ),
]

/**
 * =============================================================================
 * COMMUNICATION - NEWSLETTER IGNORABLE (2 emails)
 * =============================================================================
 */
export const newsletterIgnorableEmails: Email[] = [
  createEmail(
    'news-ignore-001',
    'Tech Deals Daily',
    'deals@techdeals.com',
    '🔥 Black Friday prolongé - Jusqu\'à -70%',
    'Les meilleures offres tech de la semaine...',
    `BLACK FRIDAY PROLONGÉ ! 🔥

Jusqu'à -70% sur :
- MacBook Pro M3
- iPhone 15 Pro
- Samsung Galaxy

Offre valable 48h seulement !

Tech Deals Daily`,
    daysAgo(0, 10),
    'newsletter_ignorable',
    'read',
    false,
    [],
    76
  ),
  createEmail(
    'news-ignore-002',
    'Webinar Spam Inc',
    'invites@webinar-spam.com',
    'Webinar gratuit : Devenez millionnaire en 30 jours',
    'Inscrivez-vous maintenant à notre webinar exclusif...',
    `WEBINAR EXCLUSIF 🚀

Apprenez à gagner 10,000€/mois grâce à l'IA !

✅ 100% gratuit
✅ 0 compétence requise
✅ Résultats garantis

Inscrivez-vous maintenant →

(Ceci est clairement du spam déguisé en newsletter)`,
    daysAgo(1, 11),
    'newsletter_ignorable',
    'read',
    false,
    [],
    71
  ),
]

/**
 * =============================================================================
 * INDÉSIRABLES - SPAM ÉVIDENT (3 emails)
 * =============================================================================
 */
export const spamEvidentEmails: Email[] = [
  createEmail(
    'spam-001',
    'Prince Nigeria',
    'prince.urgent@suspicious-domain.ng',
    'URGENT: $10,000,000 USD waiting for you!!!',
    'Dear friend, I am Prince of Nigeria and I need your help...',
    `DEAR FRIEND,

I AM PRINCE ADEBAYO OF NIGERIA. MY FATHER KING LEFT $10,000,000 USD.

I NEED YOUR BANK ACCOUNT TO TRANSFER MONEY.

YOU WILL RECEIVE 30% = $3,000,000 USD!!!

REPLY URGENT WITH YOUR DETAILS.

PRINCE ADEBAYO`,
    daysAgo(0, 6),
    'spam_evident',
    'read',
    false,
    [],
    99
  ),
  createEmail(
    'spam-002',
    'Crypto Winner',
    'bitcoin@free-crypto.scam',
    'Congratulations! You won 2.5 BTC',
    'Click here to claim your free Bitcoin...',
    `🎉 CONGRATULATIONS!

You have been selected to receive 2.5 BTC ($150,000 USD)!

CLAIM NOW →

Enter your wallet address and seed phrase to receive.

(This is obviously a scam)`,
    daysAgo(1, 4),
    'spam_evident',
    'read',
    false,
    [],
    98
  ),
  createEmail(
    'spam-003',
    'Account Security',
    'security@paypa1-secure.com',
    'Your PayPal account has been limited',
    'We detected unusual activity. Click to verify...',
    `⚠️ PayPal Security Alert

Your account has been LIMITED due to suspicious activity.

VERIFY NOW to restore access:
[SUSPICIOUS LINK]

If you don't verify within 24h, your account will be CLOSED.

(Note: fake PayPal phishing email)`,
    daysAgo(0, 8),
    'spam_evident',
    'unread',
    false,
    [],
    97
  ),
]

/**
 * =============================================================================
 * INDÉSIRABLES - PUB / PROMO (2 emails)
 * =============================================================================
 */
export const pubPromoEmails: Email[] = [
  createEmail(
    'pub-001',
    'SaaS Tools Pro',
    'marketing@saas-tools.io',
    '50% OFF our Premium Plan - Limited Time!',
    'Upgrade now and save 50% on your annual subscription...',
    `🎁 SPECIAL OFFER!

Get 50% OFF SaaS Tools Pro Premium Plan!

- Unlimited users
- Priority support
- Advanced analytics

Use code: SAVE50

Offer ends in 24h!`,
    daysAgo(0, 11),
    'pub_promo',
    'read',
    false,
    [],
    85
  ),
  createEmail(
    'pub-002',
    'CRM Competitor',
    'sales@competitor-crm.com',
    'Switching from your current solution? We\'ll pay for it!',
    'We\'ll cover your migration costs and first 3 months free...',
    `Thinking about switching CRM?

We'll make it easy:
✅ Free migration
✅ 3 months free
✅ 24/7 support

Book a demo today!

(We know you already have a solution...)`,
    daysAgo(2, 7),
    'pub_promo',
    'read',
    false,
    [],
    81
  ),
]

/**
 * =============================================================================
 * INDÉSIRABLES - EMAIL AUTOMATIQUE (2 emails)
 * =============================================================================
 */
export const emailAutomatiqueEmails: Email[] = [
  createEmail(
    'auto-001',
    'no-reply@service.com',
    'no-reply@generic-service.com',
    'Do not reply - Automatic message',
    'This is an automated message. Please do not reply...',
    `This is an automated message.

Your request has been received and is being processed.

Reference: REQ-2024-789456

Do not reply to this email.

---
Automated System`,
    daysAgo(0, 12),
    'email_automatique',
    'read',
    false,
    [],
    94
  ),
  createEmail(
    'auto-002',
    'System Notifications',
    'noreply@monitoring.io',
    '[RESOLVED] Server CPU Alert',
    'Alert: CPU usage returned to normal levels...',
    `🟢 RESOLVED

Alert: High CPU Usage
Server: prod-api-01
Status: RESOLVED

CPU dropped from 95% to 23%
No action required.

---
Monitoring System`,
    daysAgo(1, 5),
    'email_automatique',
    'read',
    false,
    [],
    92
  ),
]

/**
 * =============================================================================
 * AUTRE - NON CLASSÉ (2 emails)
 * =============================================================================
 */
export const nonClasseEmails: Email[] = [
  createEmail(
    'nonclasse-001',
    'Random Person',
    'random@email.com',
    'Hello',
    'Just wanted to say hi...',
    `Hi,

Just wanted to say hello.

Best,
Random Person`,
    daysAgo(2, 8),
    'non_classe',
    'read',
    false,
    [],
    45
  ),
  createEmail(
    'nonclasse-002',
    'Unknown Sender',
    'unknown@mystery.com',
    'RE: RE: FW: Something',
    'See attached...',
    `...

See thread below.

---
From: Someone
Subject: Something
...`,
    daysAgo(3, 3),
    'non_classe',
    'read',
    false,
    [],
    42
  ),
]

/**
 * =============================================================================
 * AUTRE - DOUTE (4 emails - confiance < 70%)
 * =============================================================================
 */
export const douteEmails: Email[] = [
  createEmail(
    'doute-001',
    'Jean Dupuis',
    'jean.dupuis@entreprise.fr',
    'Documents demandés',
    'Voici les documents que vous avez demandés...',
    `Bonjour,

Voici les documents demandés.

Cordialement,
Jean Dupuis`,
    daysAgo(0, 9),
    'non_classe', // La vraie catégorie serait client_existant ou partenaire
    'unread',
    true,
    ['Documents.zip'],
    55 // Confiance basse → sera marqué "doute"
  ),
  createEmail(
    'doute-002',
    'Service RH',
    'rh@entreprise.com',
    'Candidature reçue',
    'Nous avons bien reçu votre candidature...',
    `Bonjour,

Nous avons bien reçu votre candidature et la transmettons à l'équipe concernée.

Cordialement,
Service RH`,
    daysAgo(1, 7),
    'cv_offre', // Pourrait être email_automatique ou confirmation
    'read',
    false,
    [],
    62
  ),
  createEmail(
    'doute-003',
    'Contact Form',
    'contact@website.com',
    'Nouveau message depuis le site',
    'Quelqu\'un a rempli le formulaire de contact...',
    `Nouveau message depuis le formulaire de contact :

Nom: Marie Martin
Email: marie@test.com
Message: Je suis intéressée par vos services

---
Formulaire de contact`,
    daysAgo(2, 3),
    'prospect_chaud', // Pourrait être spam ou question_candidat
    'unread',
    false,
    [],
    58
  ),
  createEmail(
    'doute-004',
    'HR Tech News',
    'digest@hrtech-weekly.com',
    'Évolution légale : nouvelles obligations RH 2025',
    'Les nouvelles réglementations qui impactent le recrutement...',
    `📋 Évolutions légales 2025

Nouvelles obligations pour les recruteurs :

1. Index égalité professionnelle
2. Entretiens professionnels
3. RGPD Recrutement

Consultez notre guide complet →`,
    daysAgo(1, 7),
    'newsletter_utile', // Pourrait être newsletter_ignorable
    'read',
    false,
    [],
    65
  ),
]

/**
 * =============================================================================
 * BASE DE DONNÉES COMPLÈTE - TOUS LES EMAILS V2
 * =============================================================================
 */
export const allTestEmailsV2: Email[] = [
  // Recrutement
  ...cvSpontaneEmails,
  ...cvOffreEmails,
  ...relanceCandidatEmails,
  ...refusCandidatEmails,
  ...confirmationEntretienEmails,
  ...questionCandidatEmails,
  // Business
  ...prospectChaudEmails,
  ...clientExistantEmails,
  ...partenaireEmails,
  ...fournisseurEmails,
  ...facturePaiementEmails,
  ...devisPropositionEmails,
  // Communication
  ...equipeInterneEmails,
  ...notificationPlateformeEmails,
  ...newsletterUtileEmails,
  ...newsletterIgnorableEmails,
  // Indésirables
  ...spamEvidentEmails,
  ...pubPromoEmails,
  ...emailAutomatiqueEmails,
  // Autre
  ...nonClasseEmails,
  ...douteEmails,
].sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime())

/**
 * =============================================================================
 * FONCTIONS UTILITAIRES
 * =============================================================================
 */

export function getTestEmailsByCategoryV2(category: EmailCategory | 'all'): Email[] {
  if (category === 'all') return allTestEmailsV2
  return allTestEmailsV2.filter(e => e.category === category)
}

export function getTestEmailsByGroupV2(group: EmailCategoryGroup | 'all'): Email[] {
  if (group === 'all') return allTestEmailsV2
  return allTestEmailsV2.filter(e => e.categoryGroup === group)
}

export function getTestEmailByIdV2(id: string): Email | undefined {
  return allTestEmailsV2.find(e => e.id === id)
}

export function getTestUnreadCountV2(category?: EmailCategory | 'all'): number {
  const emails = category ? getTestEmailsByCategoryV2(category) : allTestEmailsV2
  return emails.filter(e => e.status === 'unread').length
}

export function getDoubtfulEmailsV2(): Email[] {
  return allTestEmailsV2.filter(e => e.isDoubtful)
}

export function getEmailsWithCvV2(): Email[] {
  return allTestEmailsV2.filter(e => e.hasCv)
}

/**
 * Statistiques des emails de test V2
 */
export const testEmailStatsV2 = {
  total: allTestEmailsV2.length,
  unread: allTestEmailsV2.filter(e => e.status === 'unread').length,
  byCategory: {
    cv_spontane: cvSpontaneEmails.length,
    cv_offre: cvOffreEmails.length,
    relance_candidat: relanceCandidatEmails.length,
    refus_candidat: refusCandidatEmails.length,
    confirmation_entretien: confirmationEntretienEmails.length,
    question_candidat: questionCandidatEmails.length,
    prospect_chaud: prospectChaudEmails.length,
    client_existant: clientExistantEmails.length,
    partenaire: partenaireEmails.length,
    fournisseur: fournisseurEmails.length,
    facture_paiement: facturePaiementEmails.length,
    devis_proposition: devisPropositionEmails.length,
    equipe_interne: equipeInterneEmails.length,
    notification_plateforme: notificationPlateformeEmails.length,
    newsletter_utile: newsletterUtileEmails.length,
    newsletter_ignorable: newsletterIgnorableEmails.length,
    spam_evident: spamEvidentEmails.length,
    pub_promo: pubPromoEmails.length,
    email_automatique: emailAutomatiqueEmails.length,
    non_classe: nonClasseEmails.length,
    doute: douteEmails.length,
  },
  byGroup: {
    recrutement: cvSpontaneEmails.length + cvOffreEmails.length + relanceCandidatEmails.length +
                 refusCandidatEmails.length + confirmationEntretienEmails.length + questionCandidatEmails.length,
    business: prospectChaudEmails.length + clientExistantEmails.length + partenaireEmails.length +
              fournisseurEmails.length + facturePaiementEmails.length + devisPropositionEmails.length,
    communication: equipeInterneEmails.length + notificationPlateformeEmails.length +
                   newsletterUtileEmails.length + newsletterIgnorableEmails.length,
    indesirables: spamEvidentEmails.length + pubPromoEmails.length + emailAutomatiqueEmails.length,
    autre: nonClasseEmails.length + douteEmails.length,
  },
  doubtful: allTestEmailsV2.filter(e => e.isDoubtful).length,
  withCv: allTestEmailsV2.filter(e => e.hasCv).length,
}
