/**
 * =============================================================================
 * LIB AI - INDEX
 * =============================================================================
 *
 * Point d'entrée pour toutes les fonctionnalités AI.
 *
 * =============================================================================
 */

export * from './config'
export * from './providers/openai'
export * from './providers/mistral'

// Re-export AIProvider type for convenience
export type { AIProvider } from '@/types'

import { AIProvider } from '@/types'
import { openaiCompletion } from './providers/openai'
import { mistralCompletion } from './providers/mistral'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Appelle le provider AI configuré (OpenAI ou Mistral)
 */
export async function aiCompletion(
  provider: AIProvider,
  apiKey: string,
  messages: Message[],
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<string> {
  if (provider === 'mistral') {
    return mistralCompletion(apiKey, messages, options)
  }
  return openaiCompletion(apiKey, messages, options)
}

/**
 * Génère du contenu avec le provider configuré
 */
export async function aiGenerate(
  provider: AIProvider,
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string
    temperature?: number
  } = {}
): Promise<string> {
  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]

  return aiCompletion(provider, apiKey, messages, options)
}
