/**
 * =============================================================================
 * LIB AI - PROVIDER OPENAI
 * =============================================================================
 *
 * Intégration avec l'API OpenAI (ChatGPT).
 *
 * =============================================================================
 */

import { DEFAULT_MODELS } from '../config'

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface OpenAICompletionResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

/**
 * Appelle l'API OpenAI pour générer une complétion
 */
export async function openaiCompletion(
  apiKey: string,
  messages: OpenAIMessage[],
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<string> {
  const { model = DEFAULT_MODELS.openai, temperature = 0.7, maxTokens = 2000 } = options

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
    throw new Error(error.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data: OpenAICompletionResponse = await response.json()
  return data.choices[0]?.message?.content || ''
}

/**
 * Génère une réponse de chat
 */
export async function openaiChat(
  apiKey: string,
  systemPrompt: string,
  userMessage: string,
  conversationHistory: OpenAIMessage[] = []
): Promise<string> {
  const messages: OpenAIMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ]

  return openaiCompletion(apiKey, messages)
}

/**
 * Génère du contenu avec un prompt simple
 */
export async function openaiGenerate(
  apiKey: string,
  prompt: string,
  options: {
    model?: string
    temperature?: number
  } = {}
): Promise<string> {
  const messages: OpenAIMessage[] = [{ role: 'user', content: prompt }]

  return openaiCompletion(apiKey, messages, options)
}
