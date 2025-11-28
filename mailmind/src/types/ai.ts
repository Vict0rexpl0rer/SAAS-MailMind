/**
 * =============================================================================
 * TYPES TYPESCRIPT - AI TOOLS
 * =============================================================================
 *
 * Types pour les outils IA : Chat, Générateur d'emails, Rédacteur d'offres,
 * Résumeur d'emails.
 *
 * =============================================================================
 */

// ============================================================================
// CONFIGURATION AI PROVIDER
// ============================================================================

export type AIProvider = 'openai' | 'mistral'

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  model?: string
}

export interface AISettings {
  openaiKey?: string
  mistralKey?: string
  preferredProvider: AIProvider
}

// ============================================================================
// CHAT ASSISTANT
// ============================================================================

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  actions?: SuggestedAction[]
  actionPanel?: ActionPanel
}

// ============================================================================
// ACTION PANEL (Style MIRA)
// ============================================================================

export interface QuickReply {
  label: string
  value: string
  variant?: 'primary' | 'secondary'
}

export interface PanelAction {
  label: string
  action: string
}

export interface ActionPanel {
  visible: boolean
  title?: string
  question?: string
  quickReplies?: QuickReply[]
  suggestedActions?: PanelAction[]
}

export type ActionType =
  | 'send_email'
  | 'create_task'
  | 'schedule_followup'
  | 'view_candidate'
  | 'view_email'

export interface SuggestedAction {
  id: string
  type: ActionType
  label: string
  description?: string
  payload: Record<string, unknown>
}

export interface ChatContext {
  recentEmails?: number
  recentCandidates?: number
  currentPage?: string
}

export interface ChatRequest {
  messages: ChatMessage[]
  context?: ChatContext
}

export interface ChatResponse {
  message: ChatMessage
  success: boolean
  error?: string
}

// ============================================================================
// EMAIL GENERATOR
// ============================================================================

export type EmailTone = 'formal' | 'friendly' | 'professional'

export type EmailType =
  | 'acceptance'
  | 'rejection'
  | 'info_request'
  | 'followup'
  | 'interview_invite'
  | 'custom'

export interface EmailTemplate {
  id: string
  name: string
  type: EmailType
  description: string
  defaultTone: EmailTone
}

export interface GenerateEmailRequest {
  type: EmailType
  tone: EmailTone
  candidateName?: string
  position?: string
  companyName?: string
  customInstructions?: string
}

export interface GeneratedEmail {
  subject: string
  body: string
  tone: EmailTone
  type: EmailType
}

export interface GenerateEmailResponse {
  email: GeneratedEmail
  success: boolean
  error?: string
}

// ============================================================================
// JOB WRITER
// ============================================================================

export interface JobPostingInput {
  title: string
  company?: string
  location?: string
  contractType?: 'cdi' | 'cdd' | 'freelance' | 'stage' | 'alternance'
  remote?: 'full' | 'hybrid' | 'none'
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'lead'
  skills?: string[]
  description?: string
  salary?: string
  benefits?: string[]
}

export interface GeneratedJobPosting {
  title: string
  content: string
  seoKeywords: string[]
}

export interface GenerateJobResponse {
  posting: GeneratedJobPosting
  success: boolean
  error?: string
}

// ============================================================================
// EMAIL SUMMARIZER
// ============================================================================

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface SummarizeRequest {
  emailId: string
  emailContent?: string
  emailSubject?: string
}

export interface EmailSummary {
  emailId: string
  summary: string
  keyPoints: string[]
  sentiment: Sentiment
  suggestedActions?: string[]
}

export interface SummarizeResponse {
  summary: EmailSummary
  success: boolean
  error?: string
}

// ============================================================================
// AI TOOL CARD (HUB)
// ============================================================================

export interface AITool {
  id: string
  name: string
  description: string
  icon: string
  href: string
  color: 'blue' | 'green' | 'purple' | 'orange'
  status: 'available' | 'coming_soon' | 'beta'
}
