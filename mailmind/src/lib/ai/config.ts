/**
 * =============================================================================
 * LIB AI - CONFIGURATION
 * =============================================================================
 *
 * Configuration et gestion des providers AI (OpenAI, Mistral).
 * Les clés API sont stockées en localStorage pour le MVP.
 *
 * =============================================================================
 */

import { AIProvider, AISettings } from '@/types'

const STORAGE_KEY = 'mailmind_ai_settings'

/**
 * Récupère les paramètres AI depuis localStorage
 */
export function getAISettings(): AISettings {
  if (typeof window === 'undefined') {
    return { preferredProvider: 'openai' }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    console.error('Erreur lors de la lecture des paramètres AI')
  }

  return { preferredProvider: 'openai' }
}

/**
 * Sauvegarde les paramètres AI dans localStorage
 */
export function saveAISettings(settings: AISettings): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    console.error('Erreur lors de la sauvegarde des paramètres AI')
  }
}

/**
 * Récupère la clé API du provider actif
 */
export function getActiveAPIKey(): { provider: AIProvider; apiKey: string } | null {
  const settings = getAISettings()

  if (settings.preferredProvider === 'mistral' && settings.mistralKey) {
    return { provider: 'mistral', apiKey: settings.mistralKey }
  }

  if (settings.preferredProvider === 'openai' && settings.openaiKey) {
    return { provider: 'openai', apiKey: settings.openaiKey }
  }

  // Fallback: utiliser n'importe quelle clé disponible
  if (settings.mistralKey) {
    return { provider: 'mistral', apiKey: settings.mistralKey }
  }

  if (settings.openaiKey) {
    return { provider: 'openai', apiKey: settings.openaiKey }
  }

  return null
}

/**
 * Vérifie si une clé API est configurée
 */
export function hasAPIKey(): boolean {
  const settings = getAISettings()
  return !!(settings.openaiKey || settings.mistralKey)
}

/**
 * Modèles par défaut pour chaque provider
 */
export const DEFAULT_MODELS: Record<AIProvider, string> = {
  openai: 'gpt-4o-mini',
  mistral: 'mistral-small-latest',
}

/**
 * Modèles disponibles pour chaque provider
 */
export const AVAILABLE_MODELS: Record<AIProvider, string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  mistral: ['mistral-large-latest', 'mistral-small-latest', 'mistral-medium-latest'],
}
