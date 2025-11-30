/**
 * =============================================================================
 * SIMULATEUR D'IA V2 - MODE TEST
 * =============================================================================
 *
 * Simule les réponses de l'IA sans appeler de vraies API.
 * Version 2 avec support des 21 catégories d'emails.
 *
 * Fonctionnalités simulées :
 * - Classification d'emails (21 catégories)
 * - Détection légère de CV (Step 1)
 * - Extraction d'informations de CV (Step 2)
 * - Réponses du chat IA par candidat
 *
 * =============================================================================
 */

import { Email, EmailCategory, EmailCategoryGroup, ClassificationResult } from '@/types'
import { LightCVDetection, DetectionSignal, CVExtractionResult, ExtractedCVData } from '@/types/cv-detection'
import { getCategoryGroup } from '@/data/default-categories'
import { simulateDelay, generateConfidenceScore } from './config'

/**
 * =============================================================================
 * MOTS-CLÉS POUR LA CLASSIFICATION (21 CATÉGORIES)
 * =============================================================================
 */

const categoryKeywordsV2: Record<EmailCategory, string[]> = {
  // RECRUTEMENT
  cv_spontane: [
    'candidature spontanée', 'cv', 'profil', 'à la recherche', 'nouveau défi',
    'vous contacte', 'ma candidature', 'ci-joint mon cv', 'passionné',
    'expérience', 'compétences', 'disponible', 'postuler'
  ],
  cv_offre: [
    'suite à votre offre', 'référence', 'annonce', 'offre publiée',
    'réf.', 'ref:', 'offre d\'emploi', 'welcome to the jungle', 'indeed',
    'linkedin job', 'en réponse à', 'votre annonce'
  ],
  relance_candidat: [
    'relance', 'revenir vers vous', 'sans nouvelles', 'suivi',
    'ma candidature envoyée', 'il y a une semaine', 'rappel',
    'n\'ayant pas reçu'
  ],
  refus_candidat: [
    'déçu', 'décision', 'retour négatif', 'pas retenu',
    'prends acte', 'merci pour votre retour', 'refus'
  ],
  confirmation_entretien: [
    'confirme ma présence', 'entretien', 'rendez-vous', 'à bientôt',
    'disponible pour', 'test technique', 'visio', 'présentation'
  ],
  question_candidat: [
    'question', 'précisions', 'renseignements', 'informations',
    'salaire', 'télétravail', 'process', 'processus', 'étapes'
  ],

  // BUSINESS
  prospect_chaud: [
    'intéressé', 'démo', 'présentation', 'démonstration', 'budget',
    'besoin', 'solution', 'proposition', 'rendez-vous commercial',
    'discovery call'
  ],
  client_existant: [
    'client', 'abonnement', 'renouvellement', 'support', 'question',
    'feedback', 'retour', 'utilisation', 'fonctionnalité', 'satisfait'
  ],
  partenaire: [
    'partenariat', 'collaboration', 'intégration', 'co-marketing',
    'partenaire', 'partnership', 'alliance', 'joint'
  ],
  fournisseur: [
    'fournisseur', 'service', 'mise à jour', 'maintenance',
    'aws', 'openai', 'stripe', 'vercel', 'infrastructure'
  ],
  facture_paiement: [
    'facture', 'invoice', 'paiement', 'payment', 'règlement',
    'échéance', 'montant', 'receipt', 'confirmation de paiement'
  ],
  devis_proposition: [
    'devis', 'proposition', 'quote', 'estimation', 'tarif',
    'prestation', 'offre commerciale', 'budget', 'prix'
  ],

  // COMMUNICATION
  equipe_interne: [
    'team', 'équipe', 'interne', '@mailmind', 'point hebdo',
    'standup', 'meeting', 'review', 'pr', 'merge', 'deploy',
    'congés', 'rh', 'all hands'
  ],
  notification_plateforme: [
    'linkedin', 'indeed', 'welcome to the jungle', 'notification',
    'alert', 'votre profil', 'candidatures', 'vues', 'connexion'
  ],
  newsletter_utile: [
    'tendances', 'insights', 'guide', 'rapport', 'étude',
    'product hunt', 'tech', 'industrie', 'évolution', 'bonnes pratiques'
  ],
  newsletter_ignorable: [
    'promo', 'offre spéciale', 'deal', 'réduction', '-50%', '-70%',
    'black friday', 'webinar gratuit', 'inscrivez-vous', 'limited time'
  ],

  // INDÉSIRABLES
  spam_evident: [
    'prince', 'nigeria', 'million', 'congratulations', 'winner',
    'bitcoin', 'crypto', 'urgent!!!', 'claim now', 'free money',
    'lottery', 'inheritance', 'transfer'
  ],
  pub_promo: [
    'upgrade', 'premium', 'discount', 'save', 'off', 'sale',
    'limited offer', 'exclusive', 'don\'t miss', 'act now'
  ],
  email_automatique: [
    'no-reply', 'noreply', 'do not reply', 'automated',
    'automatic', 'system notification', 'alert resolved'
  ],

  // AUTRE
  non_classe: [],
  doute: [],
}

/**
 * Bonus de score par type de signal
 */
const signalBonuses = {
  cv_attachment: 5,
  invoice_attachment: 4,
  internal_sender: 3,
  platform_sender: 2,
}

/**
 * =============================================================================
 * CLASSIFICATION D'EMAILS V2
 * =============================================================================
 */

export async function simulateEmailClassificationV2(email: Email): Promise<ClassificationResult> {
  await simulateDelay(300, 800)

  const textToAnalyze = `${email.subject} ${email.preview} ${email.body || ''} ${email.senderEmail}`.toLowerCase()

  // Initialiser les scores pour toutes les catégories
  const scores: Record<EmailCategory, number> = {} as Record<EmailCategory, number>
  for (const cat of Object.keys(categoryKeywordsV2) as EmailCategory[]) {
    scores[cat] = 0
  }

  // Calculer les scores basés sur les mots-clés
  for (const [category, keywords] of Object.entries(categoryKeywordsV2)) {
    for (const keyword of keywords) {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        scores[category as EmailCategory] += 1
      }
    }
  }

  // Bonus pour les pièces jointes
  if (email.hasAttachment && email.attachments) {
    const attachments = email.attachments.join(' ').toLowerCase()
    if (attachments.includes('cv') || attachments.includes('resume') || attachments.includes('candidature')) {
      scores.cv_spontane += signalBonuses.cv_attachment
      scores.cv_offre += signalBonuses.cv_attachment
    }
    if (attachments.includes('facture') || attachments.includes('invoice') || attachments.includes('receipt')) {
      scores.facture_paiement += signalBonuses.invoice_attachment
    }
    if (attachments.includes('devis') || attachments.includes('proposition') || attachments.includes('quote')) {
      scores.devis_proposition += signalBonuses.invoice_attachment
    }
  }

  // Bonus pour les expéditeurs internes
  if (email.senderEmail.includes('@mailmind')) {
    scores.equipe_interne += signalBonuses.internal_sender
  }

  // Bonus pour les plateformes connues
  const platformSenders = ['linkedin', 'indeed', 'wttj', 'welcome', 'stripe', 'vercel', 'aws', 'openai']
  for (const platform of platformSenders) {
    if (email.senderEmail.includes(platform)) {
      scores.notification_plateforme += signalBonuses.platform_sender
      scores.fournisseur += signalBonuses.platform_sender
    }
  }

  // Déterminer la catégorie gagnante
  let bestCategory: EmailCategory = 'non_classe'
  let bestScore = 0

  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score
      bestCategory = category as EmailCategory
    }
  }

  // Calculer le score de confiance
  const baseConfidence = bestScore > 0 ? Math.min(95, 50 + bestScore * 8) : 40
  const randomVariation = generateConfidenceScore()
  const finalConfidence = Math.round((baseConfidence + randomVariation) / 2)

  // Déterminer si c'est un cas de doute
  const isDoubtful = finalConfidence < 70

  // Générer un raisonnement
  const reasoning = generateClassificationReasoningV2(bestCategory, email, finalConfidence)

  return {
    emailId: email.id,
    category: isDoubtful ? 'doute' : bestCategory,
    categoryGroup: isDoubtful ? 'autre' : getCategoryGroup(bestCategory),
    confidence: finalConfidence,
    isDoubtful,
    reasoning,
  }
}

function generateClassificationReasoningV2(
  category: EmailCategory,
  email: Email,
  confidence: number
): string {
  const reasons: Partial<Record<EmailCategory, string[]>> = {
    cv_spontane: [
      'Candidature spontanée identifiée',
      'CV en pièce jointe détecté',
      'Mots-clés de recherche d\'emploi'
    ],
    cv_offre: [
      'Référence d\'offre mentionnée',
      'Réponse à une annonce',
      'Format de candidature formelle'
    ],
    relance_candidat: [
      'Email de suivi détecté',
      'Relance après candidature',
      'Demande de nouvelles'
    ],
    refus_candidat: [
      'Réponse à un refus',
      'Prise en compte d\'une décision',
      'Remerciements post-décision'
    ],
    confirmation_entretien: [
      'Confirmation de présence',
      'Date d\'entretien mentionnée',
      'Organisation de rendez-vous'
    ],
    question_candidat: [
      'Question sur le poste',
      'Demande de précisions',
      'Renseignements sur le process'
    ],
    prospect_chaud: [
      'Intérêt commercial exprimé',
      'Demande de démonstration',
      'Budget mentionné'
    ],
    client_existant: [
      'Client identifié',
      'Question sur le service',
      'Demande de support'
    ],
    partenaire: [
      'Proposition de partenariat',
      'Collaboration évoquée',
      'Intégration technique'
    ],
    fournisseur: [
      'Communication fournisseur',
      'Mise à jour service',
      'Information technique'
    ],
    facture_paiement: [
      'Facture en pièce jointe',
      'Confirmation de paiement',
      'Montant et échéance mentionnés'
    ],
    devis_proposition: [
      'Devis joint',
      'Proposition commerciale',
      'Tarification détaillée'
    ],
    equipe_interne: [
      'Expéditeur interne',
      'Communication d\'équipe',
      'Sujet projet/technique'
    ],
    notification_plateforme: [
      'Notification automatique',
      'Plateforme RH identifiée',
      'Alerte/digest'
    ],
    newsletter_utile: [
      'Newsletter professionnelle',
      'Contenu informatif',
      'Source fiable'
    ],
    newsletter_ignorable: [
      'Newsletter promotionnelle',
      'Contenu marketing',
      'Non prioritaire'
    ],
    spam_evident: [
      'Indicateurs de spam',
      'Expéditeur suspect',
      'Promesses irréalistes'
    ],
    pub_promo: [
      'Contenu publicitaire',
      'Offre commerciale non sollicitée',
      'Marketing agressif'
    ],
    email_automatique: [
      'Email automatique',
      'Système no-reply',
      'Notification technique'
    ],
    non_classe: [
      'Contenu non identifiable',
      'Catégorisation incertaine',
      'Revue manuelle recommandée'
    ],
    doute: [
      'Classification incertaine',
      'Confiance insuffisante',
      'Vérification manuelle requise'
    ],
  }

  const categoryReasons = reasons[category] || reasons.non_classe!
  const selectedReasons = categoryReasons.slice(0, 2).join('. ')

  if (confidence < 70) {
    return `${selectedReasons}. Classification incertaine, vérification recommandée.`
  }

  return `${selectedReasons}. Confiance: ${confidence}%.`
}

/**
 * =============================================================================
 * DÉTECTION LÉGÈRE DE CV (STEP 1)
 * =============================================================================
 */

const cvFilenamePatterns = [
  /cv[-_\s]?/i,
  /resume[-_\s]?/i,
  /candidature[-_\s]?/i,
  /lettre[-_\s]?(de[-_\s]?)?motivation/i,
  /curriculum[-_\s]?vitae/i,
]

const cvContextKeywords = [
  'candidature', 'poste', 'offre', 'emploi', 'stage', 'alternance',
  'profil', 'cv ci-joint', 'cv en pièce jointe', 'mon parcours',
  'mes compétences', 'ma candidature', 'recherche d\'emploi'
]

export async function simulateLightCVDetection(email: Email): Promise<LightCVDetection> {
  await simulateDelay(100, 300)

  const signals: DetectionSignal[] = []
  let totalWeight = 0

  // 1. Vérifier les noms de fichiers
  if (email.hasAttachment && email.attachments) {
    for (const attachment of email.attachments) {
      const lowerAttachment = attachment.toLowerCase()

      // Vérifier les patterns de nom de fichier
      for (const pattern of cvFilenamePatterns) {
        if (pattern.test(lowerAttachment)) {
          signals.push({
            type: 'filename',
            value: attachment,
            weight: 4,
            description: `Nom de fichier contient un pattern CV: ${attachment}`
          })
          totalWeight += 4
          break
        }
      }

      // Bonus pour les fichiers PDF
      if (lowerAttachment.endsWith('.pdf')) {
        signals.push({
          type: 'attachment_type',
          value: 'PDF',
          weight: 2,
          description: 'Fichier PDF (format courant pour les CV)'
        })
        totalWeight += 2
      }
    }
  }

  // 2. Vérifier les mots-clés dans le sujet
  const subjectLower = email.subject.toLowerCase()
  for (const keyword of cvContextKeywords) {
    if (subjectLower.includes(keyword)) {
      signals.push({
        type: 'subject',
        value: keyword,
        weight: 3,
        description: `Sujet contient "${keyword}"`
      })
      totalWeight += 3
      break // Un seul signal par type
    }
  }

  // 3. Vérifier les mots-clés dans le corps
  const bodyLower = (email.body || email.preview).toLowerCase()
  let bodyKeywordsFound = 0
  for (const keyword of cvContextKeywords) {
    if (bodyLower.includes(keyword) && bodyKeywordsFound < 2) {
      signals.push({
        type: 'body',
        value: keyword,
        weight: 2,
        description: `Corps contient "${keyword}"`
      })
      totalWeight += 2
      bodyKeywordsFound++
    }
  }

  // 4. Calculer la confiance
  const confidence = Math.min(100, totalWeight * 8)
  const isLikelyCV = confidence >= 40
  const shouldProceedToFullExtraction = confidence >= 40

  // Trouver le fichier CV potentiel
  let potentialCVFileName: string | undefined
  if (email.attachments) {
    potentialCVFileName = email.attachments.find(a => {
      const lower = a.toLowerCase()
      return cvFilenamePatterns.some(p => p.test(lower)) && lower.endsWith('.pdf')
    }) || email.attachments.find(a => a.toLowerCase().endsWith('.pdf'))
  }

  return {
    isLikelyCV,
    confidence,
    signals,
    shouldProceedToFullExtraction,
    potentialCVFileName,
  }
}

/**
 * =============================================================================
 * EXTRACTION DE CV (STEP 2) - SIMULATION
 * =============================================================================
 */

// Base de données de CVs fictifs pour la simulation
const mockExtractedCVs: Record<string, ExtractedCVData> = {
  'CV_Marie_Dupont.pdf': {
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@gmail.com',
    phone: '+33 6 12 34 56 78',
    position: 'Développeuse Full Stack',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    allSkills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Git'],
    yearsOfExperience: 4,
    location: 'Paris, France',
    education: 'Diplôme d\'ingénieur - EPITA',
    languages: ['Français (natif)', 'Anglais (courant)'],
    summary: 'Développeuse Full Stack passionnée avec 4 ans d\'expérience. Expertise en React/Next.js côté frontend et Node.js côté backend. Forte culture DevOps avec Docker et AWS.'
  },
  'CV_Sophie_Martin_UX.pdf': {
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin.pro@gmail.com',
    phone: '+33 6 98 76 54 32',
    position: 'UX Designer Senior',
    skills: ['Figma', 'User Research', 'Design System', 'Accessibilité', 'Prototypage'],
    allSkills: ['Figma', 'User Research', 'Design System', 'Accessibilité', 'Prototypage', 'Adobe XD', 'Sketch', 'HTML/CSS'],
    yearsOfExperience: 5,
    location: 'Lyon, France',
    education: 'Master Design - Strate École de Design',
    languages: ['Français (natif)', 'Anglais (professionnel)'],
    summary: 'UX Designer avec 5 ans d\'expérience, spécialisée en design system et accessibilité. Expertise en product discovery et user research.'
  },
  'CV_Lucas_Petit.pdf': {
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@yahoo.fr',
    phone: '+33 6 55 44 33 22',
    position: 'Développeur Backend (stage)',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Git'],
    allSkills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'Linux'],
    yearsOfExperience: 0,
    location: 'Bordeaux, France',
    education: 'Élève ingénieur - ENSEIRB-MATMECA',
    languages: ['Français (natif)', 'Anglais (B2)'],
    summary: 'Étudiant en dernière année d\'école d\'ingénieur, passionné par le développement backend. Expérience en Python/Django et contributions open source.'
  },
  'Thomas_Bernard_CV_2024.pdf': {
    firstName: 'Thomas',
    lastName: 'Bernard',
    email: 'thomas.bernard@outlook.com',
    phone: '+33 6 11 22 33 44',
    position: 'Chef de Projet Digital',
    skills: ['Gestion de projet', 'Scrum', 'Management', 'Budget', 'Stakeholders'],
    allSkills: ['Gestion de projet', 'Scrum', 'Kanban', 'Management', 'Budget', 'PMP', 'JIRA', 'Confluence', 'MS Project'],
    yearsOfExperience: 8,
    location: 'Paris, France',
    education: 'MBA Digital - HEC Paris',
    languages: ['Français (natif)', 'Anglais (bilingue)', 'Espagnol (intermédiaire)'],
    summary: 'Chef de Projet Digital expérimenté avec 8 ans d\'expérience. Certifié PMP et Scrum Master. Gestion de budgets jusqu\'à 500K€ et équipes de 15 personnes.'
  },
  'CV_Emma_Lefevre_DataScientist.pdf': {
    firstName: 'Emma',
    lastName: 'Lefevre',
    email: 'emma.lefevre@gmail.com',
    phone: '+33 6 77 88 99 00',
    position: 'Data Scientist Senior',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'SQL'],
    allSkills: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'SQL', 'Airflow', 'MLflow', 'Scikit-learn', 'Pandas'],
    yearsOfExperience: 6,
    location: 'Paris, France',
    education: 'Doctorat en Machine Learning - ENS Paris',
    languages: ['Français (natif)', 'Anglais (courant)'],
    summary: 'Data Scientist avec 6 ans d\'expérience. Expertise en déploiement de modèles ML en production. Spécialisation en NLP et computer vision.'
  },
  'CV_Pierre_Durand.pdf': {
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'p.durand@hotmail.com',
    phone: '+33 6 33 44 55 66',
    position: 'Commercial B2B Senior',
    skills: ['Vente', 'Négociation', 'CRM', 'SaaS', 'Account Management'],
    allSkills: ['Vente', 'Négociation', 'CRM', 'SaaS', 'Account Management', 'Salesforce', 'HubSpot', 'Prospection'],
    yearsOfExperience: 10,
    location: 'Nantes, France',
    education: 'Master Commerce - ESSCA',
    languages: ['Français (natif)', 'Anglais (professionnel)'],
    summary: 'Commercial B2B avec 10 ans d\'expérience dans la vente de solutions SaaS. Track record de dépassement d\'objectifs de 120%.'
  },
}

export async function simulateCVExtraction(
  fileName?: string,
  emailId?: string
): Promise<CVExtractionResult> {
  await simulateDelay(500, 1500)

  // Chercher les données mockées
  let extractedData: ExtractedCVData | undefined

  if (fileName) {
    extractedData = mockExtractedCVs[fileName]
  }

  // Si pas trouvé par nom de fichier, chercher par patterns similaires
  if (!extractedData && fileName) {
    const fileNameLower = fileName.toLowerCase()
    for (const [key, data] of Object.entries(mockExtractedCVs)) {
      if (fileNameLower.includes(data.lastName.toLowerCase()) ||
          key.toLowerCase().includes(fileNameLower.split('.')[0])) {
        extractedData = data
        break
      }
    }
  }

  // Si toujours pas trouvé, générer des données aléatoires
  if (!extractedData) {
    extractedData = generateRandomCVData()
  }

  // Simuler un taux de succès de 95%
  const success = Math.random() > 0.05
  const confidence = success ? Math.floor(75 + Math.random() * 20) : 0

  if (!success) {
    return {
      success: false,
      confidence: 0,
      errors: ['Impossible d\'extraire les informations du CV. Format non reconnu.'],
    }
  }

  // Générer un avatar
  const avatarSeed = `${extractedData.firstName}-${extractedData.lastName}`
  const photoUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`

  return {
    success: true,
    confidence,
    data: extractedData,
    rawText: generateMockCVRawText(extractedData),
    photoUrl,
  }
}

function generateRandomCVData(): ExtractedCVData {
  const firstNames = ['Jean', 'Claire', 'Antoine', 'Julie', 'Nicolas', 'Camille']
  const lastNames = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard']
  const positions = ['Développeur', 'Designer', 'Product Manager', 'Data Analyst', 'DevOps Engineer']
  const skills = ['JavaScript', 'Python', 'React', 'Figma', 'SQL', 'Docker', 'AWS', 'Agile']

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    phone: '+33 6 XX XX XX XX',
    position: positions[Math.floor(Math.random() * positions.length)],
    skills: skills.slice(0, 5),
    allSkills: skills,
    yearsOfExperience: Math.floor(Math.random() * 10) + 1,
    location: 'France',
    education: 'Formation supérieure',
    languages: ['Français', 'Anglais'],
    summary: `Professionnel expérimenté avec ${Math.floor(Math.random() * 10) + 1} ans d'expérience dans son domaine.`
  }
}

function generateMockCVRawText(data: ExtractedCVData): string {
  return `
CURRICULUM VITAE

${data.firstName} ${data.lastName}
${data.position}

CONTACT
Email: ${data.email}
Téléphone: ${data.phone}
Localisation: ${data.location}

RÉSUMÉ
${data.summary}

COMPÉTENCES
${data.allSkills.join(' • ')}

EXPÉRIENCE
${data.yearsOfExperience} années d'expérience professionnelle

FORMATION
${data.education}

LANGUES
${data.languages?.join(', ')}
`.trim()
}

/**
 * =============================================================================
 * CHAT IA PAR CANDIDAT - SIMULATION
 * =============================================================================
 */

interface CandidateChatContext {
  candidateId: string
  candidateName: string
  candidatePosition: string
  candidateSkills: string[]
  cvRawText?: string
}

interface ChatResponse {
  content: string
  suggestedQuestions?: string[]
}

const candidateChatTemplates = {
  strengths: (ctx: CandidateChatContext) => ({
    content: `Basé sur l'analyse du CV de ${ctx.candidateName}, voici ses principaux points forts :

**Compétences techniques :**
${ctx.candidateSkills.slice(0, 3).map(s => `• ${s}`).join('\n')}

**Atouts identifiés :**
• Expérience diversifiée dans son domaine
• Profil polyvalent avec des compétences transverses
• Formation solide

Ces éléments font de ${ctx.candidateName} un candidat intéressant pour le poste de ${ctx.candidatePosition}.`,
    suggestedQuestions: [
      'Quels sont ses points faibles potentiels ?',
      'Est-il adapté pour un poste senior ?',
      'Rédige un email pour lui proposer un entretien'
    ]
  }),

  weaknesses: (ctx: CandidateChatContext) => ({
    content: `Voici les points à approfondir lors de l'entretien avec ${ctx.candidateName} :

**Points d'attention :**
• Vérifier la profondeur de l'expertise sur les compétences listées
• Clarifier les gaps éventuels dans le parcours
• Évaluer la capacité à travailler en équipe

**Questions recommandées pour l'entretien :**
1. "Pouvez-vous me donner un exemple de projet complexe que vous avez mené ?"
2. "Comment gérez-vous les situations de pression ?"
3. "Quels sont vos objectifs de carrière à 3 ans ?"`,
    suggestedQuestions: [
      'Quelles questions techniques lui poser ?',
      'Est-ce un bon fit culturel ?',
      'Compare-le aux autres candidats'
    ]
  }),

  generateEmail: (ctx: CandidateChatContext) => ({
    content: `Voici une proposition d'email pour ${ctx.candidateName} :

---

**Objet :** Invitation à un entretien - ${ctx.candidatePosition}

Bonjour ${ctx.candidateName},

Nous avons bien reçu votre candidature pour le poste de ${ctx.candidatePosition} et votre profil a retenu notre attention.

Nous souhaiterions vous rencontrer pour un premier échange. Seriez-vous disponible cette semaine ou la semaine prochaine pour un entretien d'environ 45 minutes ?

Merci de nous indiquer vos disponibilités.

Cordialement,
L'équipe Recrutement

---

Souhaitez-vous que je modifie le ton ou ajoute des informations ?`,
    suggestedQuestions: [
      'Rends l\'email plus formel',
      'Ajoute des détails sur le poste',
      'Rédige un email de refus à la place'
    ]
  }),

  default: (ctx: CandidateChatContext, question: string) => ({
    content: `Concernant ${ctx.candidateName} (${ctx.candidatePosition}) :

J'ai analysé son profil et voici ce que je peux vous dire :

${ctx.candidateName} présente un profil ${ctx.candidateSkills.length > 5 ? 'très complet' : 'intéressant'} avec des compétences en ${ctx.candidateSkills.slice(0, 3).join(', ')}.

Pour répondre plus précisément à votre question "${question}", il serait utile de :
1. Examiner son expérience en détail
2. Vérifier les références si disponibles
3. Organiser un entretien pour valider les compétences

Avez-vous des questions plus spécifiques sur ce candidat ?`,
    suggestedQuestions: [
      'Quels sont ses points forts ?',
      'Rédige un email pour lui',
      'Est-il adapté pour le poste ?'
    ]
  }),
}

export async function simulateCandidateChat(
  message: string,
  context: CandidateChatContext
): Promise<ChatResponse> {
  await simulateDelay(800, 1800)

  const messageLower = message.toLowerCase()

  // Détecter l'intention
  if (messageLower.includes('point fort') || messageLower.includes('qualité') || messageLower.includes('atout')) {
    return candidateChatTemplates.strengths(context)
  }

  if (messageLower.includes('point faible') || messageLower.includes('défaut') || messageLower.includes('attention')) {
    return candidateChatTemplates.weaknesses(context)
  }

  if (messageLower.includes('email') || messageLower.includes('mail') || messageLower.includes('rédige')) {
    return candidateChatTemplates.generateEmail(context)
  }

  return candidateChatTemplates.default(context, message)
}

/**
 * =============================================================================
 * EXPORTS
 * =============================================================================
 */

export {
  categoryKeywordsV2,
  mockExtractedCVs,
}
