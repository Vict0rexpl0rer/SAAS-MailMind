/**
 * =============================================================================
 * MODE TEST / SIMULATION - EXPORTS
 * =============================================================================
 */

export * from './config'
export * from './mock-emails-extended'
export * from './mock-cvs'

// Legacy AI simulator
export {
  simulateEmailClassification,
  simulateCVExtraction,
  simulateChatResponse,
  simulateEmailGeneration,
  simulateJobGeneration,
  simulateEmailSummary
} from './ai-simulator'

// V2 - Nouveau système avec 21 catégories
export * from './mock-emails-v2'
export {
  simulateEmailClassificationV2,
  simulateLightCVDetection,
  simulateCVExtraction as simulateCVExtractionV2,
  simulateCandidateChat
} from './ai-simulator-v2'
