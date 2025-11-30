/**
 * =============================================================================
 * SERVICES - EXPORTS
 * =============================================================================
 *
 * Point d'entrée unique pour tous les services de l'application.
 * Ces services gèrent automatiquement le basculement entre mode test et production.
 *
 * =============================================================================
 */

// Service Email
export {
  fetchEmails,
  fetchEmailById,
  fetchEmailsByCategory,
  markEmailAsRead,
  markEmailAsUnread,
  archiveEmail,
  deleteEmail,
  getUnreadCount,
  getEmailStats
} from './email-service'

// Service Candidat
export {
  fetchCandidates,
  fetchCandidateById,
  fetchCandidateByEmailId,
  fetchCandidatesByStatus,
  createCandidate,
  updateCandidateStatus,
  updateCandidateNotes,
  deleteCandidate,
  getCandidateStats,
  getCandidateCountByStatus
} from './candidate-service'

// Service IA
export {
  classifyEmail,
  classifyEmailsBatch,
  extractCVInfo,
  sendChatMessage,
  generateEmail,
  generateJobPosting,
  summarizeEmail,
  hasAIConfiguration,
  getActiveAIProvider
} from './ai-service'

// Types des services
export type {
  ClassificationResult,
  CVExtractionResult,
  ChatContext,
  GeneratedEmail,
  EmailType,
  EmailTone,
  GeneratedJobPosting,
  JobPostingInput,
  EmailSummary
} from './ai-service'
