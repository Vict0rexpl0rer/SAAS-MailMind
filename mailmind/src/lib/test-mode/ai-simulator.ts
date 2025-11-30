/**
 * =============================================================================
 * SIMULATEUR D'IA - MODE TEST (Legacy)
 * =============================================================================
 *
 * Version legacy du simulateur IA.
 * Pour les 21 catégories, utilisez ai-simulator-v2.ts
 *
 * Ce fichier est maintenu pour la rétrocompatibilité.
 *
 * =============================================================================
 */

import { Email, EmailCategory, EmailCategoryGroup } from '@/types'
import { ChatMessage, SuggestedAction, ActionType } from '@/types/ai'
import { simulateDelay, generateConfidenceScore } from './config'
import { getMockCVByEmailId, getMockCVByFileName, MockCVData, allMockCVs } from './mock-cvs'

/**
 * =============================================================================
 * CLASSIFICATION D'EMAILS (21 catégories)
 * =============================================================================
 */

interface ClassificationResult {
  category: EmailCategory
  categoryGroup: EmailCategoryGroup
  confidence: number
  reasoning: string
  isDoubtful: boolean
}

// Mots-clés pour la classification - 21 catégories
const categoryKeywords: Record<EmailCategory, string[]> = {
  // Recrutement
  cv_spontane: [
    'candidature spontanée', 'recherche emploi', 'opportunité', 'motivation',
    'profil', 'disponible', 'intéressé par'
  ],
  cv_offre: [
    'suite à votre annonce', 'offre d\'emploi', 'référence', 'poste',
    'candidature pour', 'postule', 'annonce linkedin', 'indeed'
  ],
  relance_candidat: [
    'relance', 'sans nouvelles', 'retour', 'statut candidature',
    'où en est', 'suivi'
  ],
  refus_candidat: [
    'refus', 'ne correspond pas', 'malheureusement', 'regret',
    'candidature non retenue'
  ],
  confirmation_entretien: [
    'confirmation entretien', 'convocation', 'rendez-vous', 'disponible pour',
    'rencontrer', 'visioconférence', 'teams', 'zoom'
  ],
  question_candidat: [
    'question', 'information', 'renseignement', 'précision',
    'clarification', 'je voudrais savoir'
  ],
  // Business
  prospect_chaud: [
    'intéressé', 'devis', 'tarif', 'prestation', 'besoin',
    'projet', 'consultation'
  ],
  client_existant: [
    'client', 'contrat en cours', 'livraison', 'commande',
    'projet actuel'
  ],
  partenaire: [
    'partenariat', 'collaboration', 'accord', 'convention',
    'co-développement'
  ],
  fournisseur: [
    'fournisseur', 'approvisionnement', 'catalogue', 'stock',
    'commande fournisseur'
  ],
  facture_paiement: [
    'facture', 'paiement', 'règlement', 'avoir', 'impayé',
    'relance paiement'
  ],
  devis_proposition: [
    'devis', 'proposition commerciale', 'offre tarifaire', 'estimation',
    'chiffrage'
  ],
  // Communication
  equipe_interne: [
    'équipe', 'interne', 'collègue', 'réunion', 'point',
    'brief', '@mailmind'
  ],
  notification_plateforme: [
    'linkedin', 'indeed', 'glassdoor', 'notification', 'alerte',
    'nouveau message'
  ],
  newsletter_utile: [
    'newsletter', 'veille', 'actualités secteur', 'tendances',
    'webinar', 'événement'
  ],
  newsletter_ignorable: [
    'promo', 'offre spéciale', 'soldes', 'réduction',
    'marketing', 'abonnement'
  ],
  // Indésirables
  spam_evident: [
    'gratuit', 'gagnez', 'félicitations', 'millionnaire', 'bitcoin',
    'crypto', 'cliquez ici', 'winner'
  ],
  pub_promo: [
    'publicité', 'annonce', 'sponsored', 'promotion',
    'offre limitée', 'dernière chance'
  ],
  email_automatique: [
    'noreply', 'no-reply', 'automatique', 'notification système',
    'ne pas répondre'
  ],
  // Autre
  non_classe: [],
  doute: []
}

// Mapping catégorie -> groupe
const categoryGroupMap: Record<EmailCategory, EmailCategoryGroup> = {
  cv_spontane: 'recrutement',
  cv_offre: 'recrutement',
  relance_candidat: 'recrutement',
  refus_candidat: 'recrutement',
  confirmation_entretien: 'recrutement',
  question_candidat: 'recrutement',
  prospect_chaud: 'business',
  client_existant: 'business',
  partenaire: 'business',
  fournisseur: 'business',
  facture_paiement: 'business',
  devis_proposition: 'business',
  equipe_interne: 'communication',
  notification_plateforme: 'communication',
  newsletter_utile: 'communication',
  newsletter_ignorable: 'communication',
  spam_evident: 'indesirables',
  pub_promo: 'indesirables',
  email_automatique: 'indesirables',
  non_classe: 'autre',
  doute: 'autre'
}

/**
 * Simule la classification d'un email par l'IA
 */
export async function simulateEmailClassification(email: Email): Promise<ClassificationResult> {
  await simulateDelay(500, 1500)

  const textToAnalyze = `${email.subject} ${email.preview} ${email.body || ''}`.toLowerCase()

  // Comptage des mots-clés par catégorie
  const scores: Record<string, number> = {}

  for (const category of Object.keys(categoryKeywords) as EmailCategory[]) {
    scores[category] = 0
  }

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        scores[category] += 1
      }
    }
  }

  // Bonus pour les pièces jointes CV
  if (email.hasAttachment) {
    const attachments = email.attachments?.join(' ').toLowerCase() || ''
    if (attachments.includes('cv') || attachments.includes('resume')) {
      scores.cv_spontane += 3
      scores.cv_offre += 3
    }
    if (attachments.includes('facture') || attachments.includes('invoice')) {
      scores.facture_paiement += 3
    }
    if (attachments.includes('devis')) {
      scores.devis_proposition += 3
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

  // Générer un score de confiance
  const baseConfidence = Math.min(95, 50 + bestScore * 10)
  const confidence = generateConfidenceScore()
  const finalConfidence = Math.round((baseConfidence + confidence) / 2)

  // Déterminer si c'est un cas de doute
  const isDoubtful = finalConfidence < 70

  // Si doute, on peut changer la catégorie en 'doute'
  if (isDoubtful && bestScore < 2) {
    bestCategory = 'doute'
  }

  // Générer un raisonnement
  const reasoning = generateClassificationReasoning(bestCategory, finalConfidence)

  return {
    category: bestCategory,
    categoryGroup: categoryGroupMap[bestCategory],
    confidence: finalConfidence,
    reasoning,
    isDoubtful
  }
}

function generateClassificationReasoning(
  category: EmailCategory,
  confidence: number
): string {
  const reasons: Partial<Record<EmailCategory, string[]>> = {
    cv_spontane: [
      'CV envoyé spontanément détecté',
      'Candidature sans référence à une offre',
    ],
    cv_offre: [
      'Candidature en réponse à une offre',
      'Référence à une annonce identifiée',
    ],
    spam_evident: [
      'Contenu spam évident',
      'Mots-clés de spam détectés',
    ],
    equipe_interne: [
      'Communication interne détectée',
      'Message d\'un collègue',
    ],
    non_classe: [
      'Impossible de classifier automatiquement',
      'Contenu ambigu',
    ],
    doute: [
      'Classification incertaine',
      'Plusieurs catégories possibles',
    ],
  }

  const categoryReasons = reasons[category] || ['Classification automatique']
  const selectedReason = categoryReasons[0]

  if (confidence < 70) {
    return `${selectedReason}. Note : Classification incertaine (${confidence}%), vérification manuelle recommandée.`
  }

  return `${selectedReason}. Confiance: ${confidence}%.`
}

/**
 * =============================================================================
 * EXTRACTION D'INFORMATIONS CV
 * =============================================================================
 */

interface CVExtractionResult {
  success: boolean
  data?: MockCVData
  error?: string
  confidence: number
}

/**
 * Simule l'extraction d'informations d'un CV
 */
export async function simulateCVExtraction(
  emailId?: string,
  fileName?: string
): Promise<CVExtractionResult> {
  await simulateDelay(1000, 2500)

  // Chercher le CV correspondant
  let cvData: MockCVData | undefined

  if (emailId) {
    cvData = getMockCVByEmailId(emailId)
  } else if (fileName) {
    cvData = getMockCVByFileName(fileName)
  }

  if (!cvData) {
    // Retourner un CV aléatoire pour la simulation
    const randomIndex = Math.floor(Math.random() * allMockCVs.length)
    cvData = allMockCVs[randomIndex]
  }

  // Simuler parfois une extraction partielle (10% des cas)
  const isPartial = Math.random() < 0.1

  if (isPartial) {
    // Retourner des données partielles
    return {
      success: true,
      data: {
        ...cvData,
        phone: undefined,
        linkedinUrl: undefined,
        experiences: cvData.experiences.slice(0, 1),
        education: cvData.education.slice(0, 1),
      },
      confidence: 65
    }
  }

  return {
    success: true,
    data: cvData,
    confidence: cvData.extractionConfidence
  }
}

/**
 * =============================================================================
 * CHAT IA (MIRA)
 * =============================================================================
 */

interface ChatContext {
  candidateName?: string
  candidatePosition?: string
  emailSubject?: string
  currentPage?: string
}

// Réponses prédéfinies par type de question
const chatResponses: Record<string, string[]> = {
  greeting: [
    "Bonjour ! Je suis MIRA, votre assistante IA pour le recrutement. Comment puis-je vous aider aujourd'hui ?",
    "Hello ! Ravie de vous aider. Que souhaitez-vous faire ?",
    "Bienvenue ! Je suis là pour vous assister dans vos tâches de recrutement."
  ],
  candidateInfo: [
    "D'après son CV, ce candidat possède {years} ans d'expérience en {position}. Ses points forts sont : {skills}. Son score de matching est de {score}%.",
    "Ce profil montre une expertise en {skills}. Le candidat est basé à {location} et recherche un poste de {position}.",
    "Voici ce que je retiens de ce candidat : {summary}"
  ],
  emailHelp: [
    "Je peux vous aider à rédiger un email. Souhaitez-vous envoyer une réponse positive, un refus, ou demander des informations complémentaires ?",
    "Pour cet email, je vous suggère de répondre rapidement. Voulez-vous que je génère un brouillon ?",
    "Cet email semble être une candidature. Souhaitez-vous que je crée une fiche candidat ?"
  ],
  suggestion: [
    "Je vous suggère de contacter ce candidat dans les 24h pour maintenir son engagement.",
    "Ce profil pourrait correspondre à votre offre de {position}. Voulez-vous que je vérifie la compatibilité ?",
    "Basé sur les candidatures reçues aujourd'hui, je recommande de prioriser les profils seniors."
  ],
  unknown: [
    "Je ne suis pas sûre de comprendre votre demande. Pouvez-vous reformuler ?",
    "Désolée, je n'ai pas saisi. Pouvez-vous être plus précis ?",
    "Je suis encore en apprentissage sur ce sujet. Pouvez-vous détailler votre besoin ?"
  ]
}

// Patterns pour détecter le type de question
const questionPatterns: Record<string, RegExp[]> = {
  greeting: [/bonjour/i, /hello/i, /salut/i, /hey/i, /coucou/i],
  candidateInfo: [
    /candidat/i, /profil/i, /cv/i, /compétences/i, /expérience/i,
    /qui est/i, /parle.*moi/i, /résume/i, /summary/i
  ],
  emailHelp: [
    /email/i, /mail/i, /répondre/i, /écrire/i, /rédiger/i,
    /message/i, /contacter/i
  ],
  suggestion: [
    /suggère/i, /recommande/i, /conseil/i, /que faire/i,
    /quoi faire/i, /aide/i, /help/i
  ]
}

function detectQuestionType(message: string): string {
  for (const [type, patterns] of Object.entries(questionPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        return type
      }
    }
  }
  return 'unknown'
}

function selectRandomResponse(type: string): string {
  const responses = chatResponses[type] || chatResponses.unknown
  return responses[Math.floor(Math.random() * responses.length)]
}

function personalizeResponse(response: string, context?: ChatContext): string {
  if (!context) return response

  return response
    .replace('{candidateName}', context.candidateName || 'ce candidat')
    .replace('{position}', context.candidatePosition || 'ce poste')
    .replace('{years}', '4')
    .replace('{skills}', 'React, Node.js, TypeScript')
    .replace('{location}', 'Paris')
    .replace('{score}', '85')
    .replace('{summary}', 'Un profil solide avec une bonne expérience technique.')
}

/**
 * Simule une réponse du chat IA
 */
export async function simulateChatResponse(
  userMessage: string,
  context?: ChatContext
): Promise<ChatMessage> {
  await simulateDelay(1000, 2000)

  const questionType = detectQuestionType(userMessage)
  let response = selectRandomResponse(questionType)
  response = personalizeResponse(response, context)

  // Ajouter des actions suggérées selon le contexte
  const suggestedActions = generateSuggestedActions(questionType, context)

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: response,
    timestamp: new Date(),
    actions: suggestedActions.length > 0 ? suggestedActions : undefined,
    actionPanel: suggestedActions.length > 0 ? {
      visible: true,
      title: 'Actions suggérées',
      suggestedActions: suggestedActions.map(action => ({
        label: action.label,
        action: action.type
      }))
    } : undefined
  }
}

function generateSuggestedActions(
  questionType: string,
  _context?: ChatContext
): SuggestedAction[] {
  const actions: Record<string, SuggestedAction[]> = {
    candidateInfo: [
      { id: 'view-cv', label: 'Voir le CV complet', type: 'view_candidate' as ActionType, payload: {} },
      { id: 'contact', label: 'Contacter le candidat', type: 'send_email' as ActionType, payload: {} },
      { id: 'schedule', label: 'Planifier un entretien', type: 'schedule_followup' as ActionType, payload: {} }
    ],
    emailHelp: [
      { id: 'write-positive', label: 'Rédiger une réponse positive', type: 'send_email' as ActionType, payload: { template: 'acceptance' } },
      { id: 'write-negative', label: 'Rédiger un refus', type: 'send_email' as ActionType, payload: { template: 'rejection' } },
      { id: 'write-info', label: 'Demander plus d\'infos', type: 'send_email' as ActionType, payload: { template: 'info_request' } }
    ],
    suggestion: [
      { id: 'see-today', label: 'Voir les candidatures du jour', type: 'view_email' as ActionType, payload: { filter: 'today' } },
      { id: 'see-top', label: 'Voir les meilleurs profils', type: 'view_candidate' as ActionType, payload: { filter: 'top' } }
    ]
  }

  return actions[questionType] || []
}

/**
 * =============================================================================
 * GÉNÉRATION D'EMAILS
 * =============================================================================
 */

interface GeneratedEmail {
  subject: string
  body: string
  tone: string
}

const emailTemplates: Record<string, { subject: string; body: string }> = {
  acceptance: {
    subject: "Votre candidature pour le poste de {position}",
    body: `Bonjour {candidateName},

Nous avons le plaisir de vous informer que votre candidature pour le poste de {position} a retenu toute notre attention.

Votre profil correspond parfaitement à nos attentes et nous souhaiterions vous rencontrer pour un entretien.

Seriez-vous disponible la semaine prochaine pour un premier échange ?

Cordialement,
L'équipe RH`
  },
  rejection: {
    subject: "Suite à votre candidature",
    body: `Bonjour {candidateName},

Nous vous remercions pour l'intérêt que vous portez à notre entreprise et pour votre candidature au poste de {position}.

Après examen attentif de votre dossier, nous avons le regret de vous informer que votre profil ne correspond pas à nos besoins actuels.

Nous conservons toutefois votre CV et ne manquerons pas de vous recontacter si une opportunité se présente.

Nous vous souhaitons bonne continuation dans vos recherches.

Cordialement,
L'équipe RH`
  },
  info_request: {
    subject: "Informations complémentaires - Candidature {position}",
    body: `Bonjour {candidateName},

Suite à votre candidature pour le poste de {position}, nous aurions besoin de quelques informations complémentaires :

- Quelle est votre disponibilité ?
- Quelles sont vos prétentions salariales ?
- Êtes-vous ouvert(e) au télétravail partiel ?

Merci de nous faire parvenir ces éléments dans les meilleurs délais.

Cordialement,
L'équipe RH`
  },
  interview_invite: {
    subject: "Invitation entretien - {position}",
    body: `Bonjour {candidateName},

Suite à l'étude de votre candidature, nous souhaiterions vous rencontrer pour un entretien.

Nous vous proposons les créneaux suivants :
- Lundi 14h ou 16h
- Mardi 10h ou 15h
- Mercredi 14h

L'entretien durera environ 45 minutes et se déroulera dans nos locaux / en visioconférence.

Merci de nous confirmer votre disponibilité.

Cordialement,
L'équipe RH`
  },
  followup: {
    subject: "Suivi de votre candidature",
    body: `Bonjour {candidateName},

Nous revenons vers vous concernant votre candidature pour le poste de {position}.

Notre processus de recrutement est en cours et nous ne manquerons pas de vous tenir informé(e) de la suite.

Merci pour votre patience.

Cordialement,
L'équipe RH`
  }
}

/**
 * Simule la génération d'un email
 */
export async function simulateEmailGeneration(
  type: string,
  candidateName?: string,
  position?: string,
  tone: string = 'professional'
): Promise<GeneratedEmail> {
  await simulateDelay(800, 1500)

  const template = emailTemplates[type] || emailTemplates.followup

  let subject = template.subject
    .replace('{candidateName}', candidateName || 'Candidat')
    .replace('{position}', position || 'le poste')

  let body = template.body
    .replace(/{candidateName}/g, candidateName || 'Candidat')
    .replace(/{position}/g, position || 'le poste')

  // Ajuster le ton si nécessaire
  if (tone === 'formal') {
    body = body.replace(/Bonjour/g, 'Madame, Monsieur')
    body = body.replace(/Cordialement/g, 'Veuillez agréer nos salutations distinguées')
  } else if (tone === 'friendly') {
    body = body.replace(/Bonjour/g, 'Hello')
    body = body.replace(/Cordialement/g, 'À bientôt')
  }

  return { subject, body, tone }
}

/**
 * =============================================================================
 * GÉNÉRATION D'OFFRES D'EMPLOI
 * =============================================================================
 */

interface GeneratedJobPosting {
  title: string
  content: string
  seoKeywords: string[]
}

/**
 * Simule la génération d'une offre d'emploi
 */
export async function simulateJobGeneration(
  title: string,
  company?: string,
  skills?: string[]
): Promise<GeneratedJobPosting> {
  await simulateDelay(1200, 2500)

  const content = `# ${title}

## À propos de ${company || 'notre entreprise'}

Nous sommes une entreprise innovante en pleine croissance, à la recherche de talents passionnés pour rejoindre notre équipe.

## Le poste

En tant que ${title}, vous serez responsable de :
- Développer et maintenir des solutions techniques de qualité
- Collaborer avec les équipes produit et design
- Participer aux revues de code et au partage de connaissances
- Contribuer à l'amélioration continue de nos pratiques

## Profil recherché

${skills?.map(skill => `- Maîtrise de ${skill}`).join('\n') || '- Compétences techniques solides'}
- Esprit d'équipe et bonne communication
- Autonomie et proactivité
- Curiosité et envie d'apprendre

## Ce que nous offrons

- Un environnement de travail stimulant
- Télétravail flexible
- Mutuelle et tickets restaurant
- Budget formation
- Équipe bienveillante

## Processus de recrutement

1. Entretien téléphonique (30 min)
2. Test technique à domicile
3. Entretien technique (1h)
4. Entretien culture fit (30 min)

Nous avons hâte de vous rencontrer !`

  const seoKeywords = [
    title.toLowerCase(),
    'recrutement',
    'emploi',
    company?.toLowerCase() || 'entreprise',
    ...(skills?.slice(0, 5).map(s => s.toLowerCase()) || [])
  ]

  return {
    title,
    content,
    seoKeywords
  }
}

/**
 * =============================================================================
 * RÉSUMÉ D'EMAIL
 * =============================================================================
 */

interface EmailSummary {
  summary: string
  keyPoints: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  suggestedActions: string[]
}

/**
 * Simule le résumé d'un email
 */
export async function simulateEmailSummary(email: Email): Promise<EmailSummary> {
  await simulateDelay(600, 1200)

  // Déterminer le sentiment basé sur des mots-clés simples
  const text = `${email.subject} ${email.preview}`.toLowerCase()
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral'

  const positiveWords = ['ravi', 'plaisir', 'intéressé', 'merci', 'excellent', 'parfait']
  const negativeWords = ['problème', 'urgent', 'erreur', 'refus', 'annuler', 'désolé']

  if (positiveWords.some(word => text.includes(word))) {
    sentiment = 'positive'
  } else if (negativeWords.some(word => text.includes(word))) {
    sentiment = 'negative'
  }

  // Générer un résumé basé sur le groupe de catégorie
  const summaries: Partial<Record<EmailCategoryGroup, string>> = {
    recrutement: `Candidature reçue de ${email.senderName}. Email lié au recrutement à traiter.`,
    indesirables: 'Email identifié comme indésirable. Contenu promotionnel ou suspect détecté.',
    communication: `Communication de ${email.senderName}.`,
    business: `Communication professionnelle de ${email.senderName} concernant un sujet business.`,
    autre: `Email de ${email.senderName} à classifier.`
  }

  const keyPointsTemplates: Partial<Record<EmailCategoryGroup, string[]>> = {
    recrutement: ['Candidature à traiter', 'Nouveau profil à évaluer'],
    indesirables: ['Contenu suspect', 'À ignorer ou bloquer'],
    communication: ['Message informatif', 'Pas d\'action immédiate'],
    business: ['Communication client/partenaire', 'Réponse attendue'],
    autre: ['À classifier manuellement']
  }

  const actionsTemplates: Partial<Record<EmailCategoryGroup, string[]>> = {
    recrutement: ['Créer fiche candidat', 'Évaluer le profil', 'Répondre au candidat'],
    indesirables: ['Marquer comme spam', 'Bloquer l\'expéditeur', 'Supprimer'],
    communication: ['Lire quand disponible', 'Archiver'],
    business: ['Répondre sous 24h', 'Préparer les éléments', 'Planifier un appel'],
    autre: ['Classifier manuellement', 'Archiver si nécessaire']
  }

  const group = email.categoryGroup || 'autre'

  return {
    summary: summaries[group] || `Email de ${email.senderName}.`,
    keyPoints: keyPointsTemplates[group] || ['À traiter'],
    sentiment,
    suggestedActions: actionsTemplates[group] || ['Aucune action requise']
  }
}
