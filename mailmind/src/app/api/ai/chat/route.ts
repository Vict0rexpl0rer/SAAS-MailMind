/**
 * =============================================================================
 * API ROUTE - CHAT
 * =============================================================================
 *
 * Endpoint pour le chat avec l'assistant IA.
 *
 * POST /api/ai/chat
 *
 * =============================================================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { aiCompletion } from '@/lib/ai'
import { createChatSystemPrompt } from '@/lib/ai/prompts/chat-prompts'
import { ChatResponse, ChatMessage, AIProvider, SuggestedAction } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, context, provider, apiKey } = body

    // Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json<ChatResponse>(
        {
          success: false,
          error: 'Les messages sont requis',
          message: {} as ChatMessage,
        },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json<ChatResponse>(
        {
          success: false,
          error: 'Clé API non configurée. Veuillez configurer une clé API dans les paramètres.',
          message: {} as ChatMessage,
        },
        { status: 400 }
      )
    }

    const aiProvider: AIProvider = provider || 'openai'
    const systemPrompt = createChatSystemPrompt(context)

    // Préparer les messages pour l'API
    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ]

    // Appel à l'IA
    const response = await aiCompletion(aiProvider, apiKey, apiMessages)

    // Parser les actions suggérées si présentes
    let content = response
    let actions: SuggestedAction[] = []

    const actionsMatch = response.match(/\[ACTIONS\]([\s\S]*?)\[\/ACTIONS\]/)
    if (actionsMatch) {
      content = response.replace(/\[ACTIONS\][\s\S]*?\[\/ACTIONS\]/, '').trim()
      try {
        const parsedActions = JSON.parse(actionsMatch[1].trim())
        actions = parsedActions.map((a: { type: string; label: string; description?: string }, index: number) => ({
          id: `action-${index}`,
          type: a.type,
          label: a.label,
          description: a.description,
          payload: {},
        }))
      } catch {
        // Ignorer les erreurs de parsing des actions
      }
    }

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content,
      timestamp: new Date(),
      actions: actions.length > 0 ? actions : undefined,
    }

    return NextResponse.json<ChatResponse>({
      success: true,
      message,
    })
  } catch (error) {
    console.error('Erreur lors du chat:', error)

    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'

    return NextResponse.json<ChatResponse>(
      {
        success: false,
        error: errorMessage,
        message: {} as ChatMessage,
      },
      { status: 500 }
    )
  }
}
