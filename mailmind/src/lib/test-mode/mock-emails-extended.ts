/**
 * =============================================================================
 * BASE DE DONNÉES D'EMAILS FICTIFS - MODE TEST
 * =============================================================================
 *
 * 50+ emails variés pour tester tous les scénarios :
 * - Emails CV (candidatures, relances, stages)
 * - Emails business (prospects, clients, factures, devis)
 * - Emails communication (LinkedIn, newsletters, équipe)
 * - Emails indésirables (spam, pub, no-reply)
 * - Emails ambigus (cas de doute pour l'IA)
 *
 * =============================================================================
 */

import { Email, EmailCategory } from '@/types'

// Fonction utilitaire pour générer des dates récentes
function daysAgo(days: number, hours = 0): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(date.getHours() - hours)
  return date
}

/**
 * =============================================================================
 * EMAILS CV - CANDIDATURES (15 emails)
 * =============================================================================
 */
export const cvEmails: Email[] = [
  // Candidatures spontanées
  {
    id: 'cv-001',
    senderName: 'Marie Dupont',
    senderEmail: 'marie.dupont@gmail.com',
    subject: 'Candidature - Développeuse Full Stack',
    preview: 'Bonjour, je vous envoie ma candidature pour le poste de développeuse Full Stack. Vous trouverez ci-joint mon CV...',
    body: `Bonjour,

Je me permets de vous contacter car je suis à la recherche d'un nouveau défi professionnel en tant que Développeuse Full Stack.

Diplômée d'une école d'ingénieur et forte de 4 années d'expérience, j'ai travaillé sur des projets variés allant du e-commerce aux applications SaaS B2B.

Mes compétences principales :
- Frontend : React, Next.js, TypeScript, Tailwind CSS
- Backend : Node.js, Python, PostgreSQL
- DevOps : Docker, CI/CD, AWS

Vous trouverez ci-joint mon CV détaillé ainsi que des liens vers mes projets personnels.

Je reste à votre disposition pour un entretien.

Cordialement,
Marie Dupont`,
    receivedAt: daysAgo(0, 2),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Marie_Dupont.pdf'],
    aiConfidence: 95,
  },
  {
    id: 'cv-002',
    senderName: 'Thomas Bernard',
    senderEmail: 'thomas.bernard@outlook.com',
    subject: 'CV - Chef de projet digital',
    preview: 'Suite à votre annonce sur LinkedIn, je me permets de vous transmettre mon CV pour le poste de chef de projet...',
    body: `Madame, Monsieur,

Suite à votre offre publiée sur LinkedIn pour un poste de Chef de Projet Digital, je vous adresse ma candidature.

Avec 8 ans d'expérience en gestion de projets digitaux, j'ai eu l'opportunité de piloter des équipes pluridisciplinaires de 5 à 15 personnes dans des environnements variés (startup, grand groupe, agence).

Points forts :
- Certification PMP et Scrum Master
- Expertise en méthodologies agiles (Scrum, Kanban)
- Gestion de budgets jusqu'à 500K€
- Excellent relationnel client

Je suis disponible immédiatement et mobile sur toute la France.

Dans l'attente de votre retour, je vous prie d'agréer mes salutations distinguées.

Thomas Bernard`,
    receivedAt: daysAgo(0, 5),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['Thomas_Bernard_CV_2024.pdf', 'Lettre_motivation.pdf'],
    aiConfidence: 92,
  },
  {
    id: 'cv-003',
    senderName: 'Sophie Martin',
    senderEmail: 'sophie.martin.pro@gmail.com',
    subject: 'Candidature spontanée - UX Designer',
    preview: "Passionnée par le design et l'expérience utilisateur, je souhaiterais rejoindre votre équipe en tant que UX Designer...",
    body: `Bonjour,

Passionnée par le design et l'expérience utilisateur, je vous contacte car j'aimerais beaucoup rejoindre votre équipe.

J'ai découvert votre entreprise via vos publications sur Medium et j'apprécie particulièrement votre approche centrée utilisateur.

Mon parcours :
- 5 ans d'expérience en UX/UI Design
- Spécialisation en design system et accessibilité
- Expérience en product discovery et user research

Mon portfolio : portfolio.sophiemartin.design

Je serais ravie d'échanger avec vous sur vos projets actuels.

Sophie Martin`,
    receivedAt: daysAgo(1, 3),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Sophie_Martin_UX.pdf', 'Portfolio_Sophie_Martin.pdf'],
    aiConfidence: 88,
  },
  {
    id: 'cv-004',
    senderName: 'Lucas Petit',
    senderEmail: 'lucas.petit@yahoo.fr',
    subject: 'Demande de stage - Développeur Backend',
    preview: "Étudiant en dernière année d'école d'ingénieur, je recherche un stage de fin d'études dans le développement backend...",
    body: `Bonjour,

Actuellement en dernière année à l'ENSEIRB-MATMECA en filière informatique, je recherche un stage de fin d'études de 6 mois à partir de février 2025.

Passionné par le développement backend, j'ai réalisé plusieurs projets personnels en Python et Django, et je contribue régulièrement à des projets open source.

Compétences techniques :
- Python, Django, FastAPI
- PostgreSQL, MongoDB, Redis
- Git, Docker, Linux
- Tests unitaires et intégration

Je suis particulièrement intéressé par les problématiques de scalabilité et d'architecture logicielle.

Je reste disponible pour un entretien téléphonique ou visio.

Cordialement,
Lucas Petit`,
    receivedAt: daysAgo(1, 8),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Lucas_Petit.pdf'],
    aiConfidence: 90,
  },
  {
    id: 'cv-005',
    senderName: 'Emma Lefevre',
    senderEmail: 'emma.lefevre@gmail.com',
    subject: 'Candidature Data Scientist - 6 ans expérience',
    preview: 'Data Scientist expérimentée, je souhaite rejoindre une équipe innovante...',
    body: `Bonjour,

Data Scientist avec 6 ans d'expérience, je recherche un nouveau challenge au sein d'une entreprise innovante.

Mon parcours m'a permis de :
- Déployer des modèles ML en production (TensorFlow, PyTorch)
- Mettre en place des pipelines de données (Airflow, Spark)
- Collaborer avec les équipes produit pour définir les métriques business

Secteurs : fintech, healthtech, e-commerce

Disponible sous 2 mois, je serais ravie d'échanger sur vos projets data.

Cordialement,
Emma Lefevre`,
    receivedAt: daysAgo(2, 1),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Emma_Lefevre_DataScientist.pdf'],
    aiConfidence: 94,
  },

  // Relances de candidats
  {
    id: 'cv-006',
    senderName: 'Marie Dupont',
    senderEmail: 'marie.dupont@gmail.com',
    subject: 'Relance - Candidature Développeuse Full Stack',
    preview: "Je me permets de revenir vers vous concernant ma candidature envoyée il y a une semaine...",
    body: `Bonjour,

Je me permets de revenir vers vous concernant ma candidature pour le poste de Développeuse Full Stack envoyée il y a une semaine.

Je reste très motivée par cette opportunité et serais ravie d'en discuter avec vous lors d'un entretien.

N'hésitez pas à me contacter si vous avez besoin d'informations complémentaires.

Cordialement,
Marie Dupont`,
    receivedAt: daysAgo(0, 1),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 82,
  },
  {
    id: 'cv-007',
    senderName: 'Antoine Rousseau',
    senderEmail: 'antoine.rousseau@protonmail.com',
    subject: 'Suite à notre conversation - CV en PJ',
    preview: 'Comme convenu lors de notre échange téléphonique, voici mon CV...',
    body: `Bonjour,

Suite à notre conversation téléphonique de ce matin, je vous envoie comme convenu mon CV mis à jour.

Comme évoqué, je suis très intéressé par le poste de Product Manager et disponible pour commencer dès janvier.

Je vous confirme mes prétentions salariales : entre 55K et 60K selon le package.

Merci encore pour ce premier échange,
Antoine Rousseau`,
    receivedAt: daysAgo(0, 4),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Antoine_Rousseau_PM.pdf'],
    aiConfidence: 91,
  },

  // Réponses à offres d'emploi
  {
    id: 'cv-008',
    senderName: 'Camille Durand',
    senderEmail: 'camille.durand@live.fr',
    subject: 'RE: [Job] Développeur React Senior - Paris',
    preview: 'En réponse à votre offre sur Welcome to the Jungle...',
    body: `Bonjour,

En réponse à votre offre "Développeur React Senior" publiée sur Welcome to the Jungle, je vous transmets ma candidature.

7 ans d'expérience en développement frontend, dont 5 ans en React/TypeScript.

Points clés :
- Architecture de grosses applications React
- Performance et optimisation
- Mentorat de développeurs juniors
- Expérience en environnement scale-up

Préavis : 2 mois négociable à 1 mois.

Cordialement,
Camille Durand`,
    receivedAt: daysAgo(0, 6),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Camille_Durand_CV.pdf'],
    aiConfidence: 96,
  },
  {
    id: 'cv-009',
    senderName: 'Pierre Garnier',
    senderEmail: 'p.garnier@gmail.com',
    subject: 'Candidature DevOps Engineer - Réf. DEV-2024-001',
    preview: 'Je postule pour le poste DevOps Engineer référence DEV-2024-001...',
    body: `Madame, Monsieur,

Je vous adresse ma candidature pour le poste de DevOps Engineer (Réf. DEV-2024-001).

Certifié AWS Solutions Architect et avec 5 ans d'expérience en DevOps, je maîtrise :
- Infrastructure as Code (Terraform, Pulumi)
- Containerisation (Docker, Kubernetes)
- CI/CD (GitLab CI, GitHub Actions, Jenkins)
- Monitoring (Prometheus, Grafana, DataDog)

Je suis particulièrement intéressé par votre approche cloud-native.

À disposition pour un échange,
Pierre Garnier`,
    receivedAt: daysAgo(1, 2),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Pierre_Garnier_DevOps.pdf', 'Certifications_AWS.pdf'],
    aiConfidence: 93,
  },
  {
    id: 'cv-010',
    senderName: 'Julie Mercier',
    senderEmail: 'julie.mercier.rh@gmail.com',
    subject: 'Candidature - Chargée de recrutement IT',
    preview: 'Spécialisée dans le recrutement tech depuis 4 ans...',
    body: `Bonjour,

Spécialisée dans le recrutement IT depuis 4 ans, je souhaite rejoindre votre équipe RH.

Mon expertise :
- Sourcing candidats tech (LinkedIn Recruiter, GitHub, meetups)
- Entretiens techniques (screening, assessment)
- Process de recrutement end-to-end
- Marque employeur et onboarding

J'ai recruté plus de 150 profils tech (développeurs, data, DevOps).

CV en pièce jointe, je reste à votre disposition.

Julie Mercier`,
    receivedAt: daysAgo(2, 5),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Julie_Mercier_RH.pdf'],
    aiConfidence: 89,
  },

  // Alternances et stages
  {
    id: 'cv-011',
    senderName: 'Maxime Leroy',
    senderEmail: 'maxime.leroy.etudiant@edu.fr',
    subject: 'Recherche alternance - Marketing Digital',
    preview: "Étudiant en Master 2 Marketing, je recherche une alternance pour la rentrée...",
    body: `Bonjour,

Actuellement en Master 1 Marketing Digital à l'ISCOM, je recherche une alternance de 12 mois pour septembre 2025.

Compétences :
- SEO/SEA et Google Analytics
- Social Media Management
- Création de contenu
- Email marketing (Mailchimp, Sendinblue)

J'ai effectué un stage de 6 mois chez une startup où j'ai géré les campagnes social media (+40% d'engagement).

Motivé et rigoureux, je suis prêt à m'investir pleinement.

Cordialement,
Maxime Leroy`,
    receivedAt: daysAgo(3, 2),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Maxime_Leroy_Marketing.pdf'],
    aiConfidence: 87,
  },
  {
    id: 'cv-012',
    senderName: 'Clara Fontaine',
    senderEmail: 'clara.fontaine@icloud.com',
    subject: 'Stage fin études - Designer Produit',
    preview: 'En dernière année de design produit, je cherche un stage de 6 mois...',
    body: `Bonjour,

Étudiante en dernière année à Strate School of Design, je recherche un stage de fin d'études de 6 mois à partir de février.

Mon profil :
- Double compétence UX/UI et design industriel
- Maîtrise Figma, Sketch, Adobe Suite
- Expérience en user research
- Prototypage rapide

Mon portfolio présente mes projets académiques et personnels.

Je serais ravie de mettre mes compétences au service de votre équipe produit.

Clara Fontaine`,
    receivedAt: daysAgo(4, 7),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Clara_Fontaine.pdf', 'Portfolio_Design.pdf'],
    aiConfidence: 85,
  },

  // Profils seniors
  {
    id: 'cv-013',
    senderName: 'François Morel',
    senderEmail: 'francois.morel@executive.com',
    subject: 'Opportunité - Directeur Technique',
    preview: 'CTO avec 15 ans d\'expérience, je suis ouvert aux opportunités...',
    body: `Bonjour,

CTO avec 15 ans d'expérience dans le secteur tech, je suis actuellement en recherche active suite à une restructuration.

Parcours :
- CTO de startup (série B, 80 personnes)
- VP Engineering dans un grand groupe
- Expertise en scaling d'équipes (de 5 à 50 devs)

Je recherche un poste de direction technique dans une entreprise ambitieuse, idéalement dans la fintech ou la healthtech.

Disponible pour un premier échange confidentiel.

François Morel
+33 6 XX XX XX XX`,
    receivedAt: daysAgo(1, 9),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Francois_Morel_CTO.pdf'],
    aiConfidence: 97,
  },
  {
    id: 'cv-014',
    senderName: 'Isabelle Blanc',
    senderEmail: 'i.blanc@consultant.net',
    subject: 'Profil senior - Architecte Cloud',
    preview: 'Architecte Cloud certifié, 12 ans d\'expérience...',
    body: `Bonjour,

Architecte Cloud avec 12 ans d'expérience, je vous contacte car j'ai vu que vous développiez votre infrastructure cloud.

Certifications :
- AWS Solutions Architect Professional
- GCP Professional Cloud Architect
- Kubernetes Administrator (CKA)

Domaines d'expertise :
- Migration cloud (on-premise vers AWS/GCP)
- Architecture microservices
- Optimisation des coûts cloud
- Sécurité cloud

Je peux intervenir en mission ou en CDI selon vos besoins.

Cordialement,
Isabelle Blanc`,
    receivedAt: daysAgo(2, 4),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Isabelle_Blanc_CloudArchitect.pdf'],
    aiConfidence: 94,
  },
  {
    id: 'cv-015',
    senderName: 'Nicolas Petit',
    senderEmail: 'nicolas.petit.dev@gmail.com',
    subject: 'Développeur mobile Flutter - 3 ans exp',
    preview: 'Spécialisé en développement mobile cross-platform...',
    body: `Bonjour,

Développeur mobile spécialisé Flutter depuis 3 ans, je recherche un nouveau projet stimulant.

Réalisations :
- Application e-commerce 100K+ téléchargements
- Application santé avec intégration HealthKit/Google Fit
- Applications internes pour grands comptes

Stack : Flutter/Dart, Firebase, REST APIs, CI/CD mobile

Disponible sous 1 mois de préavis.

Nicolas Petit`,
    receivedAt: daysAgo(0, 3),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Nicolas_Petit_Flutter.pdf'],
    aiConfidence: 91,
  },
]

/**
 * =============================================================================
 * EMAILS BUSINESS (12 emails)
 * =============================================================================
 */
export const businessEmails: Email[] = [
  // Prospects
  {
    id: 'biz-001',
    senderName: 'Jean-Marc Dupuis',
    senderEmail: 'jm.dupuis@entreprise-abc.com',
    subject: 'Demande de démo - Solution RH',
    preview: "Nous cherchons une solution pour automatiser notre processus de recrutement...",
    body: `Bonjour,

Je suis DRH chez Entreprise ABC (350 salariés) et nous cherchons une solution pour automatiser notre processus de recrutement.

Nous recevons environ 200 CV par mois et le tri manuel nous prend un temps considérable.

Seriez-vous disponible cette semaine pour une démo de 30 minutes ?

Cordialement,
Jean-Marc Dupuis
DRH - Entreprise ABC`,
    receivedAt: daysAgo(0, 1),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 96,
  },
  {
    id: 'biz-002',
    senderName: 'Sophie Lecomte',
    senderEmail: 'sophie.lecomte@startup-xyz.io',
    subject: 'Intéressés par votre solution',
    preview: 'Nous sommes une startup en forte croissance et votre solution nous intéresse...',
    body: `Bonjour,

Nous sommes une startup en série A (40 personnes) avec des plans de recrutement ambitieux : 30 personnes en 2025.

Votre solution IA pour le recrutement nous intéresse beaucoup. Pouvez-vous nous envoyer :
- Une présentation détaillée
- Vos tarifs
- Des cas clients

Merci d'avance,
Sophie Lecomte
Head of People`,
    receivedAt: daysAgo(1, 4),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 94,
  },

  // Clients existants
  {
    id: 'biz-003',
    senderName: 'Claire Rousseau',
    senderEmail: 'claire.rousseau@client-fidele.fr',
    subject: 'Question sur le devis',
    preview: "J'aurais quelques questions concernant le devis que vous m'avez envoyé...",
    body: `Bonjour,

J'aurais quelques questions concernant le devis que vous m'avez envoyé la semaine dernière :

1. Le prix inclut-il la formation de nos équipes ?
2. Quelle est la durée d'engagement minimum ?
3. Pouvons-nous commencer par un pilote sur 3 mois ?

Merci de votre retour rapide, nous devons valider le budget avant fin janvier.

Claire Rousseau`,
    receivedAt: daysAgo(0, 7),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 98,
  },
  {
    id: 'biz-004',
    senderName: 'Marc Antoine',
    senderEmail: 'mantoine@groupe-industrie.com',
    subject: 'RE: Renouvellement contrat annuel',
    preview: 'Nous souhaitons renouveler notre contrat mais avec quelques ajustements...',
    body: `Bonjour,

Suite à notre année de collaboration, nous souhaitons renouveler notre contrat.

Cependant, nous aimerions discuter de quelques ajustements :
- Ajout de 5 utilisateurs supplémentaires
- Intégration avec notre SIRH (Workday)
- Formation avancée pour notre équipe RH

Pouvons-nous planifier un call cette semaine ?

Marc Antoine
Directeur des Achats`,
    receivedAt: daysAgo(2, 2),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 95,
  },

  // Factures et devis
  {
    id: 'biz-005',
    senderName: 'Comptabilité Tech Solutions',
    senderEmail: 'facturation@tech-solutions.com',
    subject: 'Facture #FAC-2024-0892 - Décembre 2024',
    preview: 'Veuillez trouver ci-joint notre facture pour les services de décembre...',
    body: `Bonjour,

Veuillez trouver ci-joint notre facture #FAC-2024-0892 pour les services de décembre 2024.

Montant : 2 400,00 € HT
TVA (20%) : 480,00 €
Total TTC : 2 880,00 €

Date d'échéance : 30 janvier 2025

Merci de votre confiance,
Service Comptabilité
Tech Solutions`,
    receivedAt: daysAgo(3, 1),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Facture_FAC-2024-0892.pdf'],
    aiConfidence: 97,
  },
  {
    id: 'biz-006',
    senderName: 'AWS Billing',
    senderEmail: 'no-reply@amazon.com',
    subject: 'Your AWS Invoice is Available',
    preview: 'Your invoice for December 2024 is now available...',
    body: `Dear Customer,

Your AWS invoice for December 2024 is now available in your AWS console.

Summary:
- EC2: $234.56
- S3: $45.23
- RDS: $156.78
- Other: $23.45
Total: $460.02

View your detailed invoice in the AWS Billing Dashboard.

Thank you for using Amazon Web Services.`,
    receivedAt: daysAgo(1, 5),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['AWS_Invoice_Dec2024.pdf'],
    aiConfidence: 93,
  },
  {
    id: 'biz-007',
    senderName: 'Pierre Martin - WebAgency',
    senderEmail: 'pierre@webagency.fr',
    subject: 'Devis - Refonte site carrières',
    preview: 'Suite à notre réunion, voici le devis pour la refonte de votre site carrières...',
    body: `Bonjour,

Suite à notre réunion de mardi, veuillez trouver ci-joint notre devis pour la refonte de votre site carrières.

Le projet comprend :
- Audit UX du site actuel
- Maquettes responsive (desktop, tablet, mobile)
- Développement Next.js
- Intégration ATS
- Tests et recette

Budget total : 25 000 € HT
Délai : 8 semaines

N'hésitez pas si vous avez des questions.

Pierre Martin
Directeur de projet - WebAgency`,
    receivedAt: daysAgo(4, 3),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Devis_Refonte_Site_Carrieres.pdf'],
    aiConfidence: 94,
  },

  // Partenaires
  {
    id: 'biz-008',
    senderName: 'Antoine Leroy',
    senderEmail: 'a.leroy@partenaire-rh.com',
    subject: 'Proposition de collaboration',
    preview: 'Nous souhaitons vous proposer une collaboration sur un nouveau projet...',
    body: `Cher partenaire,

Nous souhaitons vous proposer une collaboration sur un nouveau projet innovant dans le domaine du recrutement.

Notre idée : combiner nos forces pour créer une solution complète de matching candidat/entreprise.

Points clés :
- Vous apportez : IA et automatisation
- Nous apportons : Base de 50K candidats qualifiés
- Objectif : Lancement Q2 2025

Intéressés ? Je propose un call exploratoire.

Antoine Leroy
CEO - Partenaire RH`,
    receivedAt: daysAgo(5, 6),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Proposition_collaboration_2025.pdf'],
    aiConfidence: 92,
  },

  // Support et SAV
  {
    id: 'biz-009',
    senderName: 'Support Technique Vercel',
    senderEmail: 'support@vercel.com',
    subject: 'RE: [Ticket #45678] Problème déploiement',
    preview: "Nous avons identifié la cause de votre problème de déploiement...",
    body: `Bonjour,

Nous avons identifié la cause de votre problème de déploiement.

Il s'agissait d'un conflit de versions Node.js. Nous avons mis à jour la configuration de votre projet.

Actions effectuées :
- Mise à jour Node.js vers 20.x
- Correction des variables d'environnement
- Rebuild complet du projet

Votre déploiement devrait maintenant fonctionner. Merci de confirmer.

Support Technique Vercel`,
    receivedAt: daysAgo(0, 8),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 96,
  },
  {
    id: 'biz-010',
    senderName: 'Juridique - Cabinet Conseil',
    senderEmail: 'contact@cabinet-juridique.fr',
    subject: 'Contrat de prestation - Relecture',
    preview: 'Veuillez trouver ci-joint le contrat relu et annoté...',
    body: `Maître,

Veuillez trouver ci-joint le contrat de prestation relu et annoté.

Points d'attention :
- Article 5.2 : Clause de non-concurrence à modifier
- Article 8 : Précision nécessaire sur la propriété intellectuelle
- Article 12 : Délai de préavis à négocier

Je reste disponible pour en discuter.

Cordialement,
Cabinet Juridique Conseil`,
    receivedAt: daysAgo(2, 7),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Contrat_prestation_annote.pdf'],
    aiConfidence: 91,
  },
  {
    id: 'biz-011',
    senderName: 'Banque Professionnelle',
    senderEmail: 'pro@banque-entreprise.fr',
    subject: 'Votre relevé de compte - Décembre 2024',
    preview: 'Votre relevé de compte professionnel est disponible...',
    body: `Bonjour,

Votre relevé de compte professionnel pour le mois de décembre 2024 est disponible en pièce jointe.

Solde au 31/12/2024 : 45 678,90 €

Pour toute question, contactez votre conseiller dédié.

Banque Professionnelle`,
    receivedAt: daysAgo(1, 1),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Releve_Decembre_2024.pdf'],
    aiConfidence: 95,
  },
  {
    id: 'biz-012',
    senderName: 'Service Commercial',
    senderEmail: 'commercial@fournisseur-saas.com',
    subject: 'Votre essai gratuit expire dans 3 jours',
    preview: 'N\'oubliez pas : votre essai gratuit de notre solution expire bientôt...',
    body: `Bonjour,

Votre essai gratuit de 14 jours expire dans 3 jours.

Pendant cette période, vous avez :
- Créé 12 projets
- Invité 3 collaborateurs
- Utilisé 45% des fonctionnalités

Passez à la version Pro maintenant et bénéficiez de -20% sur votre première année !

Code promo : TRIAL20

L'équipe Fournisseur SaaS`,
    receivedAt: daysAgo(0, 2),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 88,
  },
]

/**
 * =============================================================================
 * EMAILS COMMUNICATION (12 emails)
 * =============================================================================
 */
export const communicationEmails: Email[] = [
  // LinkedIn
  {
    id: 'com-001',
    senderName: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: '5 personnes ont consulté votre profil',
    preview: 'Vous avez 5 nouvelles vues de profil cette semaine...',
    body: `5 personnes ont consulté votre profil cette semaine

Découvrez qui s'intéresse à vous :
- Recruteur chez Tech Corp
- DRH chez Startup Innovation
- Et 3 autres professionnels

Améliorez votre profil pour attirer plus de recruteurs.

L'équipe LinkedIn`,
    receivedAt: daysAgo(1, 3),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 92,
  },
  {
    id: 'com-002',
    senderName: 'LinkedIn',
    senderEmail: 'messages-noreply@linkedin.com',
    subject: 'Nouveau message de Sarah Chen (Recruiter)',
    preview: 'Sarah Chen vous a envoyé un message concernant une opportunité...',
    body: `Bonjour,

Je suis Sarah Chen, recruteuse chez TechCorp International.

Votre profil a retenu mon attention et j'aimerais vous présenter une opportunité de Senior Developer.

Poste : Senior Full Stack Developer
Lieu : Paris (2j remote)
Salaire : 65-75K€

Intéressé(e) ?

Sarah Chen
Talent Acquisition - TechCorp`,
    receivedAt: daysAgo(0, 4),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 78, // Ambiguïté : recruteur ou candidat ?
  },
  {
    id: 'com-003',
    senderName: 'LinkedIn',
    senderEmail: 'invitations@linkedin.com',
    subject: 'Marc Dupont souhaite rejoindre votre réseau',
    preview: 'Marc Dupont, CEO chez InnovateTech, souhaite se connecter...',
    body: `Marc Dupont souhaite rejoindre votre réseau

Marc Dupont
CEO chez InnovateTech
Paris, France

Message : "Bonjour, j'ai vu votre travail sur l'IA appliquée au recrutement. Impressionnant ! J'aimerais échanger avec vous."

Accepter ou ignorer l'invitation ?`,
    receivedAt: daysAgo(2, 6),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 89,
  },

  // Indeed
  {
    id: 'com-004',
    senderName: 'Indeed',
    senderEmail: 'no-reply@indeed.com',
    subject: '15 nouveaux CV correspondent à votre recherche',
    preview: 'De nouveaux candidats correspondent à vos critères de recherche...',
    body: `15 nouveaux candidats cette semaine

Recherche : "Développeur React Paris"

Top profils :
- Julie M. - 5 ans d'exp. - Disponible
- Thomas B. - 3 ans d'exp. - En poste
- Sarah K. - 7 ans d'exp. - Disponible

Voir tous les profils sur Indeed.

L'équipe Indeed`,
    receivedAt: daysAgo(0, 5),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 94,
  },
  {
    id: 'com-005',
    senderName: 'Indeed',
    senderEmail: 'alert@indeed.com',
    subject: 'Nouvelle candidature pour : Développeur Senior',
    preview: 'Un candidat vient de postuler à votre offre...',
    body: `Nouvelle candidature !

Offre : Développeur Senior React/Node
Candidat : Alexandre Martin
Expérience : 6 ans
Localisation : Lyon

Le candidat a répondu à vos questions de présélection :
✓ Disponibilité : Immédiate
✓ Prétentions : 55-60K€
✓ Remote : OK 2j/semaine

Voir le profil complet sur Indeed.`,
    receivedAt: daysAgo(0, 1),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 91,
  },

  // Newsletters tech
  {
    id: 'com-006',
    senderName: 'Newsletter Tech',
    senderEmail: 'newsletter@tech-weekly.com',
    subject: 'Les tendances tech de la semaine',
    preview: 'Cette semaine : l\'IA générative révolutionne le recrutement...',
    body: `📰 Tech Weekly #234

Cette semaine dans la tech :

1. L'IA générative révolutionne le recrutement
Les outils d'IA permettent désormais de trier 1000 CV en quelques minutes...

2. Next.js 15 : les nouveautés
Server Actions, Turbopack stable, et plus encore...

3. Le remote en 2025
Étude : 67% des développeurs préfèrent le full remote...

Bonne lecture !`,
    receivedAt: daysAgo(0, 6),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 95,
  },
  {
    id: 'com-007',
    senderName: 'Product Hunt',
    senderEmail: 'hello@producthunt.com',
    subject: 'Daily Digest - Top Products',
    preview: 'Découvrez les meilleurs lancements du jour...',
    body: `🚀 Product Hunt Daily

Top 5 du jour :

1. AI Recruiter Pro - IA pour le recrutement
2. DesignFlow - Outil de design collaboratif
3. CodeReview AI - Analyse de code automatique
4. MeetingBot - Transcription de réunions
5. DataViz 3D - Visualisation de données

Voir tous les produits sur producthunt.com`,
    receivedAt: daysAgo(1, 7),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 93,
  },

  // Équipe interne
  {
    id: 'com-008',
    senderName: 'Direction RH',
    senderEmail: 'rh@mailmind.io',
    subject: '[URGENT] Validation contrat avant 17h',
    preview: "Merci de valider le contrat de Thomas Bernard avant 17h aujourd'hui...",
    body: `URGENT

Merci de valider le contrat de Thomas Bernard avant 17h aujourd'hui.

Le candidat a confirmé son accord sur les conditions et attend notre contrat signé.

Documents à valider :
- Contrat CDI
- Fiche de poste
- Conditions de rémunération

Merci de votre réactivité,
L'équipe RH`,
    receivedAt: daysAgo(0, 3),
    category: 'equipe_interne',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Contrat_Thomas_Bernard.pdf'],
    aiConfidence: 99,
  },
  {
    id: 'com-009',
    senderName: 'Équipe Produit',
    senderEmail: 'product@mailmind.io',
    subject: 'Réunion sprint planning - Demain 10h',
    preview: 'Rappel : réunion de sprint planning demain matin...',
    body: `Rappel : Sprint Planning

📅 Demain 10h
📍 Salle Innovation (ou Teams)
⏱️ 1h30

Ordre du jour :
1. Review du sprint précédent
2. Démo des features livrées
3. Planning du prochain sprint
4. Questions diverses

Préparez vos estimations !

L'équipe Produit`,
    receivedAt: daysAgo(0, 8),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 97,
  },
  {
    id: 'com-010',
    senderName: 'CEO MailMind',
    senderEmail: 'ceo@mailmind.io',
    subject: 'Update mensuel - Janvier 2025',
    preview: 'Bonjour à tous, voici les news du mois...',
    body: `Bonjour à tous,

Voici les actualités de janvier :

🎉 Victoires du mois :
- 15 nouveaux clients signés
- MRR +25% vs décembre
- NPS à 72

📊 Métriques clés :
- 5000+ emails traités
- 95% satisfaction client
- 0 incident majeur

🎯 Focus février :
- Lancement nouvelle feature IA
- Salon HR Tech Paris

Bravo à toute l'équipe !

Le CEO`,
    receivedAt: daysAgo(3, 4),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 96,
  },

  // Welcome to the Jungle
  {
    id: 'com-011',
    senderName: 'Welcome to the Jungle',
    senderEmail: 'notifications@welcometothejungle.com',
    subject: 'Votre offre a reçu 23 candidatures',
    preview: 'Votre offre "Développeur Full Stack" a reçu de nouvelles candidatures...',
    body: `📊 Statistiques de votre offre

"Développeur Full Stack Senior"
Publiée il y a 7 jours

Performances :
- 1,234 vues
- 23 candidatures
- 8 candidats qualifiés

Top candidatures à traiter :
- Marie D. (95% match)
- Thomas B. (92% match)
- Sophie M. (88% match)

Gérer les candidatures →

Welcome to the Jungle`,
    receivedAt: daysAgo(0, 2),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 90,
  },
  {
    id: 'com-012',
    senderName: 'Slack',
    senderEmail: 'no-reply@slack.com',
    subject: '3 messages non lus dans #recrutement',
    preview: 'Vous avez des messages non lus dans vos channels...',
    body: `📬 Résumé Slack

Vous avez des messages non lus :

#recrutement (3 messages)
- @Marie : "Le candidat de ce matin était top !"
- @Thomas : "Je valide pour le second entretien"
- @Sophie : "Dispo demain pour le debrief ?"

#général (12 messages)
#random (8 messages)

Ouvrir Slack →`,
    receivedAt: daysAgo(0, 1),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 94,
  },
]

/**
 * =============================================================================
 * EMAILS INDÉSIRABLES (8 emails)
 * =============================================================================
 */
export const spamEmails: Email[] = [
  // Spam évident
  {
    id: 'spam-001',
    senderName: 'Promo Incroyable',
    senderEmail: 'noreply@promo-deals.xyz',
    subject: 'Gagnez un iPhone 15 GRATUIT !!!',
    preview: 'Félicitations ! Vous avez été sélectionné pour gagner un iPhone 15 Pro Max...',
    body: `🎉 FÉLICITATIONS !!! 🎉

Vous avez été sélectionné parmi 1,000,000 de personnes pour gagner un iPhone 15 Pro Max GRATUIT !!!

Cliquez ICI pour réclamer votre prix →→→

⚠️ Offre limitée : expire dans 2 heures ⚠️

NE MANQUEZ PAS CETTE CHANCE !!!`,
    receivedAt: daysAgo(0, 6),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-002',
    senderName: 'Investment Opportunity',
    senderEmail: 'invest@crypto-gains.net',
    subject: 'Devenez millionnaire en 30 jours',
    preview: 'Notre système de trading automatique vous garantit des gains de 500% par mois...',
    body: `💰 DEVENEZ RICHE RAPIDEMENT 💰

Notre système de trading crypto automatique garantit :
- 500% de gains par mois
- Aucune expertise requise
- Retrait à tout moment

Témoignage : "J'ai gagné 50,000€ en 2 semaines !" - Jean P.

Inscrivez-vous MAINTENANT avec seulement 250€

🚀 NE RATEZ PAS CETTE OPPORTUNITÉ 🚀`,
    receivedAt: daysAgo(1, 8),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-003',
    senderName: 'Service Client',
    senderEmail: 'security@banque-fake.com',
    subject: 'Votre compte a été compromis',
    preview: 'Nous avons détecté une activité suspecte sur votre compte...',
    body: `⚠️ ALERTE SÉCURITÉ ⚠️

Cher client,

Nous avons détecté une activité suspecte sur votre compte.

Votre compte sera BLOQUÉ dans 24 heures si vous ne vérifiez pas vos informations.

Cliquez ici pour vérifier votre identité →

Service Sécurité
Banque Nationale (fake)`,
    receivedAt: daysAgo(2, 4),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-004',
    senderName: 'Régime Miracle',
    senderEmail: 'contact@regime-magique.com',
    subject: 'Perdez 10kg en 1 semaine - Méthode secrète',
    preview: 'Les médecins ne veulent pas que vous sachiez ceci...',
    body: `🔥 PERDEZ DU POIDS SANS EFFORT 🔥

Les médecins détestent cette astuce !

Découvrez la méthode secrète pour perdre 10kg en 7 jours :
- Sans régime
- Sans sport
- Sans effort

Témoignage : "J'ai perdu 15kg en 2 semaines !" - Marie L.

Commandez maintenant : SEULEMENT 49,99€

💊 Stock limité ! 💊`,
    receivedAt: daysAgo(3, 2),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },

  // Pub et marketing agressif
  {
    id: 'spam-005',
    senderName: 'Super Deals',
    senderEmail: 'offers@marketing-mass.com',
    subject: '-80% sur TOUT le site - DERNIÈRES HEURES',
    preview: 'Profitez de nos soldes exceptionnelles avant minuit...',
    body: `🛍️ SOLDES FOLLES 🛍️

-80% SUR TOUT LE SITE

Plus que quelques heures pour profiter :
- Électronique : -80%
- Mode : -80%
- Maison : -80%

⏰ EXPIRE À MINUIT ⏰

Code promo : SOLDES80

ACHETEZ MAINTENANT →`,
    receivedAt: daysAgo(0, 3),
    category: 'spam_evident',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 97,
  },
  {
    id: 'spam-006',
    senderName: 'Casino en ligne',
    senderEmail: 'bonus@casino-vip-online.net',
    subject: '500€ de bonus OFFERTS - Jouez maintenant',
    preview: 'Inscrivez-vous et recevez 500€ de bonus de bienvenue...',
    body: `🎰 CASINO VIP ONLINE 🎰

BONUS DE BIENVENUE : 500€ OFFERTS !

Inscrivez-vous maintenant et recevez :
- 500€ de bonus
- 100 tours gratuits
- VIP access immédiat

🃏 Les meilleurs jeux : Poker, Blackjack, Roulette 🃏

Jouer maintenant →

⚠️ Jouez responsablement ⚠️`,
    receivedAt: daysAgo(1, 9),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },

  // No-reply automatiques
  {
    id: 'spam-007',
    senderName: 'Newsletter Marketing',
    senderEmail: 'noreply@newsletter-random.com',
    subject: 'Vous ne devinerez jamais ce qui s\'est passé...',
    preview: 'Cliquez pour découvrir les dernières actualités...',
    body: `Bonjour,

Vous ne devinerez jamais ce qui s'est passé cette semaine...

Cliquez ici pour découvrir :
→ Les dernières tendances
→ Les secrets des pros
→ Ce que tout le monde ignore

Ne manquez pas nos prochaines newsletters !

Se désabonner (lien cassé)`,
    receivedAt: daysAgo(2, 1),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 96,
  },
  {
    id: 'spam-008',
    senderName: 'Formation Express',
    senderEmail: 'contact@formation-cpf.info',
    subject: 'Formez-vous GRATUITEMENT avec votre CPF',
    preview: 'Utilisez votre CPF avant qu\'il n\'expire...',
    body: `📚 FORMATION 100% FINANCÉE PAR LE CPF 📚

Votre CPF expire bientôt !

Formez-vous gratuitement en :
- Marketing Digital (certifiant)
- Développement Web (certifiant)
- Management (certifiant)

Aucun frais, tout est pris en charge !

📞 Appelez-nous : 01 XX XX XX XX

Un conseiller vous rappelle sous 5 minutes !`,
    receivedAt: daysAgo(0, 7),
    category: 'spam_evident',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 95,
  },
]

/**
 * =============================================================================
 * EMAILS CV SUPPLÉMENTAIRES (15 emails)
 * =============================================================================
 */
export const additionalCvEmails: Email[] = [
  {
    id: 'cv-016',
    senderName: 'Julien Marchand',
    senderEmail: 'julien.marchand@hotmail.com',
    subject: 'Candidature Ingénieur Logiciel - 5 ans exp.',
    preview: 'Fort de 5 ans d\'expérience en développement Java/Spring...',
    body: `Bonjour,

Fort de 5 ans d'expérience en développement Java/Spring, je souhaite intégrer une équipe dynamique.

Compétences clés :
- Java 17, Spring Boot, Microservices
- Kafka, RabbitMQ
- PostgreSQL, MongoDB
- Docker, Kubernetes

Je suis disponible sous préavis de 2 mois.

Julien Marchand`,
    receivedAt: daysAgo(0, 9),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Julien_Marchand.pdf'],
    aiConfidence: 94,
  },
  {
    id: 'cv-017',
    senderName: 'Amélie Rousseau',
    senderEmail: 'amelie.rousseau@proton.me',
    subject: 'Candidature spontanée - Product Designer',
    preview: 'Passionnée par le design produit, je vous contacte...',
    body: `Bonjour,

Passionnée par le design produit depuis 6 ans, je vous contacte pour explorer les opportunités au sein de votre entreprise.

Mon parcours :
- Product Designer chez Doctolib (2 ans)
- UX Designer chez BlaBlaCar (3 ans)
- UI Designer en agence (1 an)

Portfolio : amelierousseau.design

Amélie`,
    receivedAt: daysAgo(1, 2),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Amelie_Rousseau.pdf', 'Portfolio_2024.pdf'],
    aiConfidence: 92,
  },
  {
    id: 'cv-018',
    senderName: 'Kevin Nguyen',
    senderEmail: 'kevin.nguyen.dev@gmail.com',
    subject: 'RE: Offre Développeur Mobile - Candidature',
    preview: 'Suite à votre offre sur Talent.io, je postule...',
    body: `Bonjour,

Suite à votre offre de Développeur Mobile sur Talent.io, je vous adresse ma candidature.

Profil :
- 4 ans d'exp. en développement mobile
- Spécialiste React Native et Flutter
- Apps publiées : 5 (total 500K téléchargements)

Disponible pour un entretien cette semaine.

Kevin Nguyen`,
    receivedAt: daysAgo(0, 5),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Kevin_Nguyen_CV.pdf'],
    aiConfidence: 96,
  },
  {
    id: 'cv-019',
    senderName: 'Sarah Cohen',
    senderEmail: 'sarah.cohen.pm@outlook.com',
    subject: 'Candidature Product Manager - Fintech',
    preview: 'PM avec 7 ans d\'expérience en fintech...',
    body: `Bonjour,

Product Manager avec 7 ans d'expérience, dont 4 dans la fintech, je recherche un nouveau challenge.

Réalisations clés :
- Lancement de 3 produits B2B (ARR 2M€+)
- Management d'équipes produit de 5 personnes
- Expérience internationale (UK, France)

Sarah Cohen`,
    receivedAt: daysAgo(2, 3),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['Sarah_Cohen_CV.pdf'],
    aiConfidence: 93,
  },
  {
    id: 'cv-020',
    senderName: 'Mathieu Blanc',
    senderEmail: 'mathieu.blanc@edu.polytechnique.fr',
    subject: 'Stage Data Science - Étudiant Polytechnique',
    preview: 'Étudiant en 3e année à Polytechnique, je recherche...',
    body: `Bonjour,

Étudiant en 3e année à l'École Polytechnique, spécialisation Data Science, je recherche un stage de 6 mois à partir d'avril.

Formation :
- Polytechnique (X2022)
- Spécialisation ML/IA
- Projets : NLP, Computer Vision

Motivé et disponible,
Mathieu Blanc`,
    receivedAt: daysAgo(3, 1),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['CV_Mathieu_Blanc_X.pdf'],
    aiConfidence: 89,
  },
  {
    id: 'cv-021',
    senderName: 'Léa Martinez',
    senderEmail: 'lea.martinez.tech@gmail.com',
    subject: 'Candidature Tech Lead Frontend',
    preview: 'Tech Lead avec 8 ans d\'expérience, je...',
    body: `Bonjour,

Tech Lead Frontend avec 8 ans d'expérience, je recherche un poste à responsabilités dans une scale-up ambitieuse.

Expertise :
- Architecture frontend (React, Vue, Angular)
- Management d'équipe (jusqu'à 8 devs)
- Performance & accessibilité
- Mise en place de bonnes pratiques

Léa Martinez`,
    receivedAt: daysAgo(1, 7),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Lea_Martinez_CV.pdf'],
    aiConfidence: 95,
  },
  {
    id: 'cv-022',
    senderName: 'Omar Benali',
    senderEmail: 'omar.benali@consulting.com',
    subject: 'Candidature - Consultant Data',
    preview: 'Consultant Data avec expertise BI et visualisation...',
    body: `Bonjour,

Consultant Data avec 5 ans d'expérience en BI et data visualisation.

Stack technique :
- Power BI, Tableau, Looker
- SQL, Python, dbt
- BigQuery, Snowflake
- Certifications : Google Cloud, Tableau

Disponible immédiatement.

Omar Benali`,
    receivedAt: daysAgo(0, 4),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Omar_Benali_CV.pdf', 'Certifications.pdf'],
    aiConfidence: 91,
  },
  {
    id: 'cv-023',
    senderName: 'Chloé Petit',
    senderEmail: 'chloe.petit.design@icloud.com',
    subject: 'Candidature Motion Designer',
    preview: 'Motion Designer créative, 4 ans d\'expérience...',
    body: `Hello !

Motion Designer créative avec 4 ans d'expérience en agence et startup.

Compétences :
- After Effects, Cinema 4D, Blender
- Illustration (Illustrator, Procreate)
- UI Animation (Lottie, Rive)

Mon showreel : vimeo.com/chloepetit

Chloé`,
    receivedAt: daysAgo(2, 5),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['Chloe_Petit_CV.pdf'],
    aiConfidence: 88,
  },
  {
    id: 'cv-024',
    senderName: 'Vincent Duval',
    senderEmail: 'vincent.duval@securite.io',
    subject: 'Candidature Ingénieur Cybersécurité',
    preview: 'Expert en sécurité informatique, certifié CISSP...',
    body: `Bonjour,

Ingénieur Cybersécurité avec 6 ans d'expérience et certifications reconnues.

Certifications :
- CISSP
- CEH (Certified Ethical Hacker)
- AWS Security Specialty

Domaines : Pentest, SOC, Conformité (RGPD, ISO 27001)

Vincent Duval`,
    receivedAt: daysAgo(1, 8),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Vincent_Duval_CV.pdf'],
    aiConfidence: 94,
  },
  {
    id: 'cv-025',
    senderName: 'Inès Faure',
    senderEmail: 'ines.faure.hr@gmail.com',
    subject: 'Candidature - Talent Acquisition Manager',
    preview: 'Spécialiste du recrutement tech depuis 5 ans...',
    body: `Bonjour,

Talent Acquisition Manager avec 5 ans d'expérience dans le recrutement tech.

Track record :
- 200+ recrutements tech réussis
- Construction d'équipes de 0 à 50 personnes
- Expérience startup et scale-up

Je connais les défis du recrutement en croissance !

Inès Faure`,
    receivedAt: daysAgo(0, 6),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['CV_Ines_Faure.pdf'],
    aiConfidence: 90,
  },
  {
    id: 'cv-026',
    senderName: 'Romain Girard',
    senderEmail: 'romain.girard.sre@protonmail.com',
    subject: 'SRE / Platform Engineer - 7 ans exp.',
    preview: 'SRE senior, expert en fiabilité des systèmes...',
    body: `Bonjour,

SRE / Platform Engineer avec 7 ans d'expérience en systèmes distribués.

Expertise :
- Kubernetes, Istio, Linkerd
- Terraform, Ansible, Pulumi
- Monitoring : Prometheus, Datadog, PagerDuty
- SLO/SLI implementation

Romain Girard`,
    receivedAt: daysAgo(3, 4),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['Romain_Girard_CV.pdf'],
    aiConfidence: 93,
  },
  {
    id: 'cv-027',
    senderName: 'Marine Laurent',
    senderEmail: 'marine.laurent@marketing-digital.fr',
    subject: 'Candidature Growth Marketing Manager',
    preview: 'Growth Marketer avec expertise acquisition...',
    body: `Bonjour,

Growth Marketing Manager avec 5 ans d'expérience en B2B SaaS.

Résultats :
- CAC réduit de 40% en 12 mois
- Pipeline marketing +150%
- Expertise : SEO, Paid, Content, ABM

Marine Laurent`,
    receivedAt: daysAgo(1, 3),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Marine_Laurent_CV.pdf'],
    aiConfidence: 87,
  },
  {
    id: 'cv-028',
    senderName: 'Alexandre Morin',
    senderEmail: 'alex.morin.qa@outlook.fr',
    subject: 'QA Engineer / SDET - Candidature',
    preview: 'QA Engineer avec forte expertise en automatisation...',
    body: `Bonjour,

QA Engineer / SDET avec 4 ans d'expérience en automatisation de tests.

Stack :
- Cypress, Playwright, Selenium
- Jest, Vitest, Testing Library
- CI/CD integration
- Performance testing (k6, Gatling)

Alexandre Morin`,
    receivedAt: daysAgo(2, 6),
    category: 'cv_spontane',
    status: 'read',
    hasAttachment: true,
    attachments: ['Alexandre_Morin_CV.pdf'],
    aiConfidence: 92,
  },
  {
    id: 'cv-029',
    senderName: 'Pauline Renard',
    senderEmail: 'pauline.renard@agile-coach.com',
    subject: 'Candidature Scrum Master / Agile Coach',
    preview: 'Scrum Master certifiée, 6 ans d\'accompagnement...',
    body: `Bonjour,

Scrum Master / Agile Coach avec 6 ans d'expérience.

Certifications :
- PSM II, PSPO I
- SAFe Program Consultant
- ICAgile Coaching

J'accompagne les équipes vers l'excellence agile.

Pauline Renard`,
    receivedAt: daysAgo(0, 7),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Pauline_Renard_CV.pdf'],
    aiConfidence: 89,
  },
  {
    id: 'cv-030',
    senderName: 'Hugo Fernandez',
    senderEmail: 'hugo.fernandez.backend@gmail.com',
    subject: 'Développeur Go/Rust - Candidature',
    preview: 'Développeur backend spécialisé systèmes haute performance...',
    body: `Bonjour,

Développeur backend spécialisé en Go et Rust, 5 ans d'expérience.

Expertise :
- Go : APIs haute performance, microservices
- Rust : Systèmes critiques, WebAssembly
- Contributions open source

Hugo Fernandez`,
    receivedAt: daysAgo(1, 9),
    category: 'cv_spontane',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Hugo_Fernandez_CV.pdf'],
    aiConfidence: 95,
  },
]

/**
 * =============================================================================
 * EMAILS BUSINESS SUPPLÉMENTAIRES (15 emails)
 * =============================================================================
 */
export const additionalBusinessEmails: Email[] = [
  {
    id: 'biz-013',
    senderName: 'Marie Leduc - ACME Corp',
    senderEmail: 'marie.leduc@acme-corp.com',
    subject: 'Demande de tarifs - Solution entreprise',
    preview: 'Nous sommes intéressés par votre solution pour 500 utilisateurs...',
    body: `Bonjour,

ACME Corp (2000 employés) est intéressé par votre solution de recrutement.

Besoins :
- 500 utilisateurs
- Intégration SAP SuccessFactors
- Support prioritaire

Pouvez-vous nous faire parvenir un devis ?

Marie Leduc
Directrice RH`,
    receivedAt: daysAgo(0, 3),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 97,
  },
  {
    id: 'biz-014',
    senderName: 'Comptabilité',
    senderEmail: 'compta@notre-entreprise.fr',
    subject: 'Facture en attente de validation',
    preview: 'Merci de valider la facture #2024-1234 avant vendredi...',
    body: `Bonjour,

La facture #2024-1234 de notre fournisseur cloud est en attente de validation.

Montant : 3,450.00 € TTC
Fournisseur : AWS
Échéance : Vendredi

Merci de valider dans l'outil.

Service Comptabilité`,
    receivedAt: daysAgo(1, 4),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Facture_AWS_2024-1234.pdf'],
    aiConfidence: 96,
  },
  {
    id: 'biz-015',
    senderName: 'Jean-Paul Mercier',
    senderEmail: 'jp.mercier@cabinet-conseil.fr',
    subject: 'Proposition accompagnement RGPD',
    preview: 'Suite à notre échange, voici notre proposition d\'accompagnement...',
    body: `Bonjour,

Suite à notre échange sur vos besoins de mise en conformité RGPD, voici notre proposition :

Phase 1 : Audit (2 semaines) - 8,000€
Phase 2 : Mise en conformité (1 mois) - 15,000€
Phase 3 : Formation équipes - 3,000€

Total : 26,000€ HT

Cabinet Conseil Juridique`,
    receivedAt: daysAgo(2, 2),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Proposition_RGPD.pdf'],
    aiConfidence: 94,
  },
  {
    id: 'biz-016',
    senderName: 'Support Stripe',
    senderEmail: 'support@stripe.com',
    subject: 'Votre ticket #STR-78945 - Résolu',
    preview: 'Votre problème de paiement a été résolu...',
    body: `Bonjour,

Votre ticket #STR-78945 concernant l'échec de paiement a été résolu.

Cause : Carte expirée côté client
Solution : Le client a mis à jour ses informations

Le paiement de 299€ a été traité avec succès.

Support Stripe`,
    receivedAt: daysAgo(0, 5),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 95,
  },
  {
    id: 'biz-017',
    senderName: 'Direction Commerciale',
    senderEmail: 'commercial@mailmind.io',
    subject: 'Nouveau contrat signé - TechCorp',
    preview: 'Super nouvelle ! TechCorp a signé pour 3 ans...',
    body: `🎉 Nouveau contrat !

TechCorp a signé un contrat de 3 ans.

Détails :
- ARR : 45,000€
- Durée : 36 mois
- 150 utilisateurs

Bravo à l'équipe commerciale !

Direction Commerciale`,
    receivedAt: daysAgo(1, 6),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Contrat_TechCorp.pdf'],
    aiConfidence: 98,
  },
  {
    id: 'biz-018',
    senderName: 'Google Workspace',
    senderEmail: 'no-reply@google.com',
    subject: 'Votre facture Google Workspace - Janvier 2025',
    preview: 'Votre facture mensuelle est disponible...',
    body: `Bonjour,

Votre facture Google Workspace est disponible.

Période : Janvier 2025
Utilisateurs : 25
Montant : 300.00 € HT

Télécharger la facture dans la console admin.

Google Workspace`,
    receivedAt: daysAgo(2, 1),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 93,
  },
  {
    id: 'biz-019',
    senderName: 'Investisseur Angel',
    senderEmail: 'pierre.dumont@angel-investor.com',
    subject: 'Suite à notre rencontre - Opportunité',
    preview: 'J\'ai bien réfléchi à notre discussion et je serais intéressé...',
    body: `Bonjour,

J'ai bien réfléchi à notre rencontre au salon Tech.

Votre solution m'intéresse et je serais ouvert à discuter d'un investissement potentiel.

Pouvons-nous programmer un call la semaine prochaine ?

Pierre Dumont
Business Angel`,
    receivedAt: daysAgo(3, 3),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 91,
  },
  {
    id: 'biz-020',
    senderName: 'Assurance Pro',
    senderEmail: 'contact@assurance-entreprise.fr',
    subject: 'Renouvellement RC Pro - Action requise',
    preview: 'Votre assurance RC Pro expire le 31 janvier...',
    body: `Bonjour,

Votre assurance Responsabilité Civile Professionnelle expire le 31 janvier 2025.

Pour renouveler :
1. Connectez-vous à votre espace
2. Validez les informations
3. Procédez au paiement

Prime annuelle : 1,200€

Assurance Entreprise`,
    receivedAt: daysAgo(0, 8),
    category: 'equipe_interne',
    status: 'unread',
    hasAttachment: true,
    attachments: ['Conditions_RC_Pro.pdf'],
    aiConfidence: 97,
  },
  {
    id: 'biz-021',
    senderName: 'Fournisseur Mobilier',
    senderEmail: 'commandes@office-furniture.com',
    subject: 'Confirmation commande #CMD-5678',
    preview: 'Votre commande de mobilier de bureau a été confirmée...',
    body: `Confirmation de commande

Commande #CMD-5678

Articles :
- 10x Bureau ajustable : 4,500€
- 10x Chaise ergonomique : 3,500€
- Livraison : 200€

Total : 8,200€ TTC

Livraison prévue : 15 février

Office Furniture`,
    receivedAt: daysAgo(1, 5),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Bon_Commande.pdf'],
    aiConfidence: 94,
  },
  {
    id: 'biz-022',
    senderName: 'Service Juridique',
    senderEmail: 'juridique@cabinet-avocat.fr',
    subject: 'Contrat de travail - Modifications demandées',
    preview: 'Suite à votre demande, voici les modifications au contrat type...',
    body: `Bonjour,

Suite à votre demande, j'ai modifié le contrat de travail type :

Modifications :
- Article 5 : Clause de non-concurrence allégée
- Article 8 : Télétravail 3j/semaine
- Article 12 : Période d'essai 3 mois

Version annotée en PJ.

Cabinet Avocat & Associés`,
    receivedAt: daysAgo(2, 7),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Contrat_Type_Modifie.pdf'],
    aiConfidence: 95,
  },
  {
    id: 'biz-023',
    senderName: 'Prestataire Nettoyage',
    senderEmail: 'contact@clean-office.fr',
    subject: 'Planification intervention mensuelle',
    preview: 'Rappel : intervention de nettoyage ce vendredi...',
    body: `Bonjour,

Rappel de notre intervention mensuelle :

Date : Vendredi 31 janvier
Heure : 19h - 22h
Prestations : Nettoyage complet des locaux

Merci de nous confirmer l'accès aux locaux.

Clean Office Services`,
    receivedAt: daysAgo(0, 4),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 92,
  },
  {
    id: 'biz-024',
    senderName: 'Banquier Entreprise',
    senderEmail: 'conseiller.pro@banque.fr',
    subject: 'Point trimestriel - Disponibilités',
    preview: 'Je souhaiterais faire un point sur votre activité...',
    body: `Bonjour,

Comme convenu, je souhaiterais programmer notre point trimestriel.

Sujets à aborder :
- Évolution de l'activité
- Besoins de financement
- Placements de trésorerie

Êtes-vous disponible la semaine du 3 février ?

Votre conseiller entreprise`,
    receivedAt: daysAgo(3, 5),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 93,
  },
  {
    id: 'biz-025',
    senderName: 'Hubspot',
    senderEmail: 'noreply@hubspot.com',
    subject: 'Votre rapport marketing mensuel',
    preview: 'Découvrez les performances de vos campagnes...',
    body: `📊 Rapport Marketing - Janvier 2025

Performances :
- Emails envoyés : 5,234
- Taux d'ouverture : 24.5%
- Clics : 456
- Leads générés : 89

Top campagne : "Webinar RH 2025"

Voir le rapport complet →`,
    receivedAt: daysAgo(1, 2),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 90,
  },
  {
    id: 'biz-026',
    senderName: 'URSSAF',
    senderEmail: 'contact@urssaf.fr',
    subject: 'Déclaration sociale - Rappel échéance',
    preview: 'Rappel : votre déclaration est attendue avant le 15 février...',
    body: `Rappel important

Votre déclaration sociale nominative (DSN) pour janvier 2025 doit être déposée avant le 15 février.

Connectez-vous à net-entreprises.fr pour effectuer votre déclaration.

URSSAF`,
    receivedAt: daysAgo(0, 6),
    category: 'equipe_interne',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 98,
  },
  {
    id: 'biz-027',
    senderName: 'Agence Immobilière',
    senderEmail: 'gestion@immo-pro.fr',
    subject: 'Renouvellement bail commercial',
    preview: 'Votre bail commercial arrive à échéance dans 6 mois...',
    body: `Bonjour,

Votre bail commercial arrive à échéance le 30 juin 2025.

Nous souhaitons vous proposer un renouvellement aux conditions suivantes :
- Durée : 3-6-9 ans
- Loyer : 2,800€/mois (+3%)
- Charges : 450€/mois

Merci de nous indiquer vos intentions.

Immo Pro Gestion`,
    receivedAt: daysAgo(2, 4),
    category: 'client_existant',
    status: 'read',
    hasAttachment: true,
    attachments: ['Proposition_Bail.pdf'],
    aiConfidence: 94,
  },
]

/**
 * =============================================================================
 * EMAILS COMMUNICATION/NOTIFICATIONS SUPPLÉMENTAIRES (12 emails)
 * =============================================================================
 */
export const additionalCommunicationEmails: Email[] = [
  {
    id: 'com-013',
    senderName: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[mailmind/app] New pull request #234',
    preview: 'Marie opened a new pull request: feat: Add dark mode...',
    body: `New pull request in mailmind/app

#234 feat: Add dark mode support
by @marie-dupont

Files changed: 12
Additions: 456 | Deletions: 89

View on GitHub →`,
    receivedAt: daysAgo(0, 2),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 94,
  },
  {
    id: 'com-014',
    senderName: 'Notion',
    senderEmail: 'notify@makenotion.com',
    subject: 'Vous avez été mentionné dans "Sprint Planning Q1"',
    preview: '@victor a été mentionné : "Peux-tu valider cette spec ?"...',
    body: `Vous avez été mentionné

Dans : Sprint Planning Q1 2025
Par : Sophie Martin

"@victor Peux-tu valider cette spec avant demain ?"

Voir la page →`,
    receivedAt: daysAgo(0, 3),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 92,
  },
  {
    id: 'com-015',
    senderName: 'Calendly',
    senderEmail: 'notifications@calendly.com',
    subject: 'Nouveau RDV : Entretien candidat - Marie Dupont',
    preview: 'Un nouveau rendez-vous a été programmé pour demain 14h...',
    body: `Nouveau rendez-vous

Entretien candidat - Marie Dupont

📅 Demain à 14h00
⏱️ 45 minutes
📍 Google Meet

Le lien de la visio a été envoyé aux participants.

Calendly`,
    receivedAt: daysAgo(0, 4),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 95,
  },
  {
    id: 'com-016',
    senderName: 'Figma',
    senderEmail: 'noreply@figma.com',
    subject: 'Sophie a commenté votre design',
    preview: 'Nouveau commentaire sur "Dashboard V2"...',
    body: `Nouveau commentaire

Sur : Dashboard V2 - Maquettes
Par : Sophie Martin

"J'adore cette nouvelle version ! Juste une remarque sur les couleurs du CTA principal."

Voir le commentaire →`,
    receivedAt: daysAgo(1, 1),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 91,
  },
  {
    id: 'com-017',
    senderName: 'Twitter/X',
    senderEmail: 'notify@x.com',
    subject: 'Votre tweet a été aimé 50 fois',
    preview: 'Votre tweet sur l\'IA dans le recrutement performe bien...',
    body: `Votre tweet performe !

"L'IA va révolutionner le recrutement, mais l'humain restera au centre..."

❤️ 50 likes
🔁 12 retweets
💬 8 réponses

Voir le tweet →`,
    receivedAt: daysAgo(1, 3),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 93,
  },
  {
    id: 'com-018',
    senderName: 'Datadog',
    senderEmail: 'alerts@datadog.com',
    subject: '[RESOLVED] High CPU usage on prod-api-1',
    preview: 'L\'alerte CPU a été résolue automatiquement...',
    body: `✅ Alert Resolved

High CPU usage on prod-api-1

Duration: 12 minutes
Peak: 92%
Current: 45%

Auto-scaling a résolu le problème.

Datadog`,
    receivedAt: daysAgo(0, 7),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 96,
  },
  {
    id: 'com-019',
    senderName: 'Intercom',
    senderEmail: 'notifications@intercom.io',
    subject: 'Nouvelle conversation : Question sur les tarifs',
    preview: 'Un visiteur a démarré une conversation sur votre site...',
    body: `Nouvelle conversation

Visiteur : "Bonjour, je voudrais connaître vos tarifs pour une équipe de 50 personnes"

Temps de réponse moyen : 2 min

Répondre maintenant →`,
    receivedAt: daysAgo(0, 1),
    category: 'client_existant',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 94,
  },
  {
    id: 'com-020',
    senderName: 'Spotify for Business',
    senderEmail: 'premium@spotify.com',
    subject: 'Votre playlist d\'équipe de la semaine',
    preview: 'Découvrez les titres les plus écoutés par votre équipe...',
    body: `🎵 Playlist de la semaine

Top 5 de votre équipe :
1. Daft Punk - Get Lucky
2. The Weeknd - Blinding Lights
3. Pharrell - Happy
4. Mark Ronson - Uptown Funk
5. Beyoncé - Crazy In Love

Écouter sur Spotify →`,
    receivedAt: daysAgo(1, 5),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 88,
  },
  {
    id: 'com-021',
    senderName: 'Zoom',
    senderEmail: 'no-reply@zoom.us',
    subject: 'Enregistrement disponible : All Hands Meeting',
    preview: 'L\'enregistrement de votre réunion est prêt...',
    body: `Enregistrement disponible

All Hands Meeting - Janvier 2025

Durée : 45 minutes
Participants : 32
Cloud storage : 1.2 GB

L'enregistrement sera disponible pendant 30 jours.

Voir l'enregistrement →`,
    receivedAt: daysAgo(2, 2),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 92,
  },
  {
    id: 'com-022',
    senderName: 'Apple',
    senderEmail: 'no_reply@email.apple.com',
    subject: 'Reçu de votre achat App Store',
    preview: 'Merci pour votre achat de l\'app MailMind Pro...',
    body: `Reçu Apple

Achat : MailMind Pro - Abonnement annuel
Montant : 49,99 €
Date : 28 janvier 2025

Gérer vos abonnements →

Apple`,
    receivedAt: daysAgo(1, 7),
    category: 'client_existant',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 95,
  },
  {
    id: 'com-023',
    senderName: 'Miro',
    senderEmail: 'noreply@miro.com',
    subject: 'Thomas vous a invité sur un board',
    preview: 'Rejoignez le board "Product Roadmap 2025"...',
    body: `Invitation Miro

Thomas Bernard vous invite à collaborer sur :
"Product Roadmap 2025"

Ce board contient le planning produit pour l'année.

Rejoindre le board →`,
    receivedAt: daysAgo(0, 5),
    category: 'non_classe',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 91,
  },
  {
    id: 'com-024',
    senderName: 'AWS',
    senderEmail: 'aws-marketing@amazon.com',
    subject: 'AWS Summit Paris 2025 - Inscription ouverte',
    preview: 'Rejoignez-nous le 15 mars pour le AWS Summit...',
    body: `AWS Summit Paris 2025

📅 15 mars 2025
📍 Paris Expo Porte de Versailles

Au programme :
- Keynote AWS
- 50+ sessions techniques
- Networking

Inscription gratuite →

Amazon Web Services`,
    receivedAt: daysAgo(3, 1),
    category: 'non_classe',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 89,
  },
]

/**
 * =============================================================================
 * EMAILS SPAM SUPPLÉMENTAIRES (8 emails)
 * =============================================================================
 */
export const additionalSpamEmails: Email[] = [
  {
    id: 'spam-009',
    senderName: 'Prince Nigeria',
    senderEmail: 'prince.offer@nigeria-fortune.ng',
    subject: 'URGENT: $10 Million Inheritance',
    preview: 'I am Prince Emeka, I have chosen you to receive...',
    body: `Dear Friend,

I am Prince Emeka from Nigeria. My late father left $10,000,000 and I need your help to transfer it.

You will receive 30% ($3,000,000) for your assistance.

Send your bank details immediately.

Prince Emeka`,
    receivedAt: daysAgo(0, 8),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-010',
    senderName: 'Viagra Online',
    senderEmail: 'sales@cheap-meds.xyz',
    subject: 'Médicaments à -90% - Sans ordonnance',
    preview: 'Profitez de nos prix imbattables sur tous les médicaments...',
    body: `💊 PHARMACIE EN LIGNE 💊

-90% sur tous les médicaments !
Sans ordonnance !
Livraison discrète !

Commander maintenant →

(Site non vérifié)`,
    receivedAt: daysAgo(2, 3),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-011',
    senderName: 'Work From Home',
    senderEmail: 'jobs@easy-money-online.net',
    subject: 'Gagnez 5000€/mois depuis chez vous !',
    preview: 'Découvrez comment des milliers de personnes gagnent leur vie...',
    body: `💰 TRAVAILLEZ DE CHEZ VOUS 💰

Gagnez 5000€/mois en travaillant 2h/jour !

Aucune compétence requise !
Commencez immédiatement !

Témoignage : "J'ai quitté mon job et je gagne 3x plus !"

Inscrivez-vous GRATUIT →`,
    receivedAt: daysAgo(1, 6),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-012',
    senderName: 'Livraison Colis',
    senderEmail: 'tracking@fake-delivery.com',
    subject: 'Votre colis est en attente de livraison',
    preview: 'Payez 1,99€ de frais de douane pour recevoir votre colis...',
    body: `⚠️ COLIS EN ATTENTE ⚠️

Votre colis est bloqué en douane.

Payez 1,99€ de frais pour le débloquer.

Cliquez ici →

(Arnaque phishing)`,
    receivedAt: daysAgo(0, 9),
    category: 'spam_evident',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 98,
  },
  {
    id: 'spam-013',
    senderName: 'Rencontre Locale',
    senderEmail: 'match@dating-fake.com',
    subject: '5 femmes veulent vous rencontrer !',
    preview: 'Des célibataires de votre région vous attendent...',
    body: `💕 RENCONTRES LOCALES 💕

5 femmes près de chez vous veulent vous rencontrer !

✓ Julie, 28 ans - 2km
✓ Sophie, 32 ans - 5km
✓ Marie, 25 ans - 3km

Voir les profils GRATUIT →`,
    receivedAt: daysAgo(3, 4),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-014',
    senderName: 'Antivirus Urgent',
    senderEmail: 'alert@fake-antivirus.net',
    subject: 'VIRUS DÉTECTÉ sur votre ordinateur !',
    preview: 'Votre PC est infecté ! Téléchargez notre antivirus immédiatement...',
    body: `🔴 ALERTE VIRUS 🔴

Nous avons détecté 5 virus sur votre PC !

Vos données sont en danger !

Téléchargez notre antivirus GRATUIT pour vous protéger →

(Malware déguisé)`,
    receivedAt: daysAgo(1, 4),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-015',
    senderName: 'Loterie Nationale',
    senderEmail: 'winner@fake-lottery.eu',
    subject: 'FÉLICITATIONS ! Vous avez gagné 500,000€',
    preview: 'Votre email a été tiré au sort pour notre grand jeu...',
    body: `🎉 VOUS AVEZ GAGNÉ 🎉

Félicitations !

Votre email a été sélectionné pour notre loterie européenne !

Prix : 500,000€

Pour réclamer, envoyez :
- Copie passeport
- RIB

Loterie Européenne (fake)`,
    receivedAt: daysAgo(2, 5),
    category: 'spam_evident',
    status: 'read',
    hasAttachment: false,
    aiConfidence: 99,
  },
  {
    id: 'spam-016',
    senderName: 'Marketing List',
    senderEmail: 'bulk@mass-email-sender.com',
    subject: 'Achetez notre base de 10M d\'emails !',
    preview: 'Base de données emails B2B qualifiée pour vos campagnes...',
    body: `📧 BASE EMAILS B2B 📧

10 millions d'emails professionnels !

- Dirigeants
- Décideurs RH
- DSI

Prix exceptionnel : 499€

100% légal* (*non)

Acheter maintenant →`,
    receivedAt: daysAgo(0, 7),
    category: 'spam_evident',
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 97,
  },
]

/**
 * =============================================================================
 * EMAILS AMBIGUS - CATÉGORIE "DOUTE" (8 emails)
 * =============================================================================
 */
export const ambiguousEmails: Email[] = [
  // CV ou simple message ?
  {
    id: 'amb-001',
    senderName: 'Alex Moreau',
    senderEmail: 'alex.moreau@gmail.com',
    subject: 'Suite à notre échange',
    preview: 'Comme promis, je vous envoie les informations dont nous avons parlé...',
    body: `Bonjour,

Suite à notre conversation téléphonique d'hier, je vous envoie comme convenu quelques informations sur mon parcours.

J'ai 5 ans d'expérience en développement et je serais intéressé par votre projet, que ce soit en tant que consultant externe ou en rejoignant votre équipe.

Je reste flexible sur la forme de collaboration.

Alex Moreau`,
    receivedAt: daysAgo(0, 4),
    category: 'cv_spontane', // L'IA hésitera
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 55, // Faible confiance
  },
  {
    id: 'amb-002',
    senderName: 'Caroline Dubois',
    senderEmail: 'c.dubois@company.com',
    subject: 'Information profil',
    preview: 'Je vous transmets mon profil LinkedIn pour info...',
    body: `Bonjour,

Un ami m'a parlé de votre entreprise et je me permets de vous contacter.

Je ne cherche pas activement mais si une opportunité se présente, je serais intéressée d'en discuter.

Mon profil LinkedIn : linkedin.com/in/caroline-dubois

Cordialement,
Caroline`,
    receivedAt: daysAgo(1, 6),
    category: 'cv_spontane', // Candidature passive ?
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 48, // Très faible confiance
  },

  // Business ou candidature ?
  {
    id: 'amb-003',
    senderName: 'Freelance Dev',
    senderEmail: 'contact@freelance-dev.io',
    subject: 'Proposition de services',
    preview: 'Je vous propose mes services en tant que développeur freelance...',
    body: `Bonjour,

Développeur freelance spécialisé React/Node, je vous propose mes services pour vos projets de développement.

Mon profil :
- 6 ans d'expérience
- Disponible immédiatement
- TJM : 450€

Je peux intervenir sur des missions ponctuelles ou des projets long terme.

Portfolio : freelance-dev.io

Intéressé ?`,
    receivedAt: daysAgo(0, 8),
    category: 'client_existant', // Candidature ou démarchage commercial ?
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 52, // Ambiguïté candidat/prospect
  },
  {
    id: 'amb-004',
    senderName: 'Agence Recrutement',
    senderEmail: 'talents@cabinet-recrutement.fr',
    subject: 'Profils disponibles pour vos postes',
    preview: 'Nous avons des candidats qualifiés pour vos besoins...',
    body: `Bonjour,

Nous avons plusieurs candidats qualifiés qui correspondent à vos besoins en recrutement.

Profils disponibles :
- 3 développeurs Full Stack (3-7 ans exp.)
- 2 chefs de projet (5-10 ans exp.)
- 1 UX Designer senior

Souhaitez-vous recevoir leurs CVs ?

Cabinet Recrutement Paris`,
    receivedAt: daysAgo(2, 3),
    category: 'client_existant', // Cabinet qui propose des CVs
    status: 'read',
    hasAttachment: false,
    aiConfidence: 61, // Est-ce un CV ou une prospection ?
  },

  // Urgent ou spam ?
  {
    id: 'amb-005',
    senderName: 'System Alert',
    senderEmail: 'alerts@monitoring-system.com',
    subject: '[ALERTE] Activité inhabituelle détectée',
    preview: 'Une activité inhabituelle a été détectée sur votre compte...',
    body: `⚠️ Alerte de sécurité

Une activité inhabituelle a été détectée :
- Tentatives de connexion multiples
- Localisation : Inconnu
- Heure : 03:45 AM

Actions recommandées :
1. Vérifiez vos connexions récentes
2. Changez votre mot de passe
3. Activez la 2FA si pas déjà fait

Support : support@monitoring-system.com`,
    receivedAt: daysAgo(0, 5),
    category: 'equipe_interne', // Légitime ou phishing ?
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 58, // Difficile à déterminer
  },

  // Notification ou message important ?
  {
    id: 'amb-006',
    senderName: 'Indeed for Employers',
    senderEmail: 'employer@indeed.com',
    subject: 'Candidat recommandé pour votre offre',
    preview: 'Un candidat qualifié a été identifié pour votre poste...',
    body: `Candidat recommandé par Indeed

Pour votre offre : "Développeur Full Stack"

Candidat : Jean-Pierre Martin
Match : 87%
Expérience : 5 ans
Localisation : Paris

Le candidat n'a pas encore postulé mais son profil correspond à vos critères.

Voulez-vous l'inviter à postuler ?

Indeed for Employers`,
    receivedAt: daysAgo(0, 2),
    category: 'cv_spontane', // Notification ou vraie candidature ?
    status: 'unread',
    hasAttachment: false,
    aiConfidence: 65, // Entre notification et CV
  },

  // Recruteur externe ou candidat ?
  {
    id: 'amb-007',
    senderName: 'Pierre Recruitment',
    senderEmail: 'pierre@talent-finder.com',
    subject: 'Opportunité intéressante',
    preview: "J'ai un profil qui pourrait vous intéresser, ou peut-être vice-versa...",
    body: `Bonjour,

Je suis chasseur de têtes spécialisé dans la tech.

J'ai un excellent profil de CTO disponible qui pourrait vous intéresser.

Par ailleurs, si vous êtes vous-même ouvert aux opportunités, j'ai également des postes de direction très intéressants à proposer.

Êtes-vous acheteur ou vendeur ? 😉

Pierre
Talent Finder`,
    receivedAt: daysAgo(1, 4),
    category: 'client_existant', // Très ambigu
    status: 'read',
    hasAttachment: false,
    aiConfidence: 45, // Maximum d'ambiguïté
  },

  // Newsletter ou communication importante ?
  {
    id: 'amb-008',
    senderName: 'HR Tech News',
    senderEmail: 'digest@hrtech-weekly.com',
    subject: 'Évolution légale : nouvelles obligations RH 2025',
    preview: 'Les nouvelles réglementations qui impactent le recrutement...',
    body: `📋 Évolutions légales 2025

Nouvelles obligations pour les recruteurs :

1. Index égalité professionnelle
- Nouvelles modalités de calcul
- Publication obligatoire

2. Entretiens professionnels
- Nouveaux délais
- Sanctions renforcées

3. RGPD Recrutement
- Conservation des CVs : 2 ans max
- Consentement explicite requis

Consultez notre guide complet →

HR Tech News`,
    receivedAt: daysAgo(1, 7),
    category: 'non_classe', // Info utile ou simple newsletter ?
    status: 'read',
    hasAttachment: false,
    aiConfidence: 62, // Ambiguïté sur l'importance
  },
]

/**
 * =============================================================================
 * BASE DE DONNÉES COMPLÈTE - 105 EMAILS
 * =============================================================================
 */
export const allTestEmails: Email[] = [
  ...cvEmails,
  ...additionalCvEmails,
  ...businessEmails,
  ...additionalBusinessEmails,
  ...communicationEmails,
  ...additionalCommunicationEmails,
  ...spamEmails,
  ...additionalSpamEmails,
  ...ambiguousEmails,
].sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()) // Tri par date décroissante

/**
 * Fonctions utilitaires pour les emails de test
 */
export function getTestEmailsByCategory(category: EmailCategory | 'all' | 'doubt'): Email[] {
  if (category === 'all') return allTestEmails
  if (category === 'doubt') return allTestEmails.filter(e => (e.aiConfidence ?? 100) < 70)
  return allTestEmails.filter(e => e.category === category)
}

export function getTestEmailById(id: string): Email | undefined {
  return allTestEmails.find(e => e.id === id)
}

export function getTestUnreadCount(category?: EmailCategory | 'all' | 'doubt'): number {
  const emails = category ? getTestEmailsByCategory(category) : allTestEmails
  return emails.filter(e => e.status === 'unread').length
}

export const testEmailStats = {
  total: allTestEmails.length,
  unread: allTestEmails.filter(e => e.status === 'unread').length,
  cv: cvEmails.length,
  business: businessEmails.length,
  communication: communicationEmails.length,
  spam: spamEmails.length,
  ambiguous: ambiguousEmails.length,
  doubt: allTestEmails.filter(e => (e.aiConfidence ?? 100) < 70).length,
}

/**
 * Labels pour les catégories (affichage UI)
 */
export const categoryLabels: Record<string, string> = {
  cv: 'CV / Candidature',
  message: 'Message',
  urgent: 'Urgent',
  spam: 'Spam',
  other: 'Autre',
  doubt: 'Doute',
  all: 'Tous',
}

/**
 * Couleurs pour les catégories (classes Tailwind)
 */
export const categoryColors: Record<string, string> = {
  cv: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  message: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  spam: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  other: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  doubt: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
}
