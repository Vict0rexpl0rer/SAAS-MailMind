/**
 * =============================================================================
 * LIB AI - PROVIDER MISTRAL
 * =============================================================================
 *
 * Intégration avec l'API Mistral AI.
 *
 * =============================================================================
 */

import { DEFAULT_MODELS } from '../config'

interface MistralMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface MistralCompletionResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

/**
 * Appelle l'API Mistral pour générer une complétion
 */
export async function mistralCompletion(
  apiKey: string,
  messages: MistralMessage[],
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<string> {
  const { model = DEFAULT_MODELS.mistral, temperature = 0.7, maxTokens = 2000 } = options

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Mistral API error: ${response.status}`)
  }

  const data: MistralCompletionResponse = await response.json()
  return data.choices[0]?.message?.content || ''
}

/**
 * Génère une réponse de chat
 */
export async function mistralChat(
  apiKey: string,
  systemPrompt: string,
  userMessage: string,
  conversationHistory: MistralMessage[] = []
): Promise<string> {
  const messages: MistralMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ]

  return mistralCompletion(apiKey, messages)
}

/**
 * Génère du contenu avec un prompt simple
 */
export async function mistralGenerate(
  apiKey: string,
  prompt: string,
  options: {
    model?: string
    temperature?: number
  } = {}
): Promise<string> {
  const messages: MistralMessage[] = [{ role: 'user', content: prompt }]

  return mistralCompletion(apiKey, messages, options)
}
