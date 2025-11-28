/**
 * =============================================================================
 * API ROUTE - SUMMARIZE EMAIL
 * =============================================================================
 *
 * Endpoint pour résumer un email avec l'IA.
 *
 * POST /api/ai/summarize
 *
 * =============================================================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { aiGenerate } from '@/lib/ai'
import { SUMMARY_SYSTEM_PROMPT, createSummaryPrompt } from '@/lib/ai/prompts/summary-prompts'
import { SummarizeResponse, EmailSummary, AIProvider } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { emailId, emailContent, emailSubject, provider, apiKey } = body

    // Validation
    if (!emailContent || !emailSubject) {
      return NextResponse.json<SummarizeResponse>(
        {
          success: false,
          error: 'Le contenu et le sujet de l\'email sont requis',
          summary: {} as EmailSummary,
        },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json<SummarizeResponse>(
        {
          success: false,
          error: 'Clé API non configurée. Veuillez configurer une clé API dans les paramètres.',
          summary: {} as EmailSummary,
        },
        { status: 400 }
      )
    }

    const aiProvider: AIProvider = provider || 'openai'
    const userPrompt = createSummaryPrompt(emailSubject, emailContent)

    // Appel à l'IA
    const response = await aiGenerate(aiProvider, apiKey, SUMMARY_SYSTEM_PROMPT, userPrompt)

    // Parser la réponse JSON
    let parsedResponse
    try {
      // Extraire le JSON de la réponse (peut être entouré de markdown)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch {
      // Fallback si le parsing échoue
      parsedResponse = {
        summary: response,
        keyPoints: [],
        sentiment: 'neutral',
        suggestedActions: [],
      }
    }

    const summary: EmailSummary = {
      emailId: emailId || 'unknown',
      summary: parsedResponse.summary || response,
      keyPoints: parsedResponse.keyPoints || [],
      sentiment: parsedResponse.sentiment || 'neutral',
      suggestedActions: parsedResponse.suggestedActions || [],
    }

    return NextResponse.json<SummarizeResponse>({
      success: true,
      summary,
    })
  } catch (error) {
    console.error('Erreur lors du résumé:', error)

    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'

    return NextResponse.json<SummarizeResponse>(
      {
        success: false,
        error: errorMessage,
        summary: {} as EmailSummary,
      },
      { status: 500 }
    )
  }
}
