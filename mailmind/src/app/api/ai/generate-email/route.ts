/**
 * =============================================================================
 * API ROUTE - GENERATE EMAIL
 * =============================================================================
 *
 * Endpoint pour générer un email avec l'IA.
 *
 * POST /api/ai/generate-email
 *
 * =============================================================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { aiGenerate } from '@/lib/ai'
import { EMAIL_GENERATOR_SYSTEM_PROMPT, createEmailPrompt } from '@/lib/ai/prompts/email-prompts'
import { GenerateEmailResponse, GeneratedEmail, AIProvider } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type,
      tone,
      candidateName,
      position,
      companyName,
      customInstructions,
      provider,
      apiKey,
    } = body

    // Validation
    if (!type || !tone) {
      return NextResponse.json<GenerateEmailResponse>(
        {
          success: false,
          error: 'Le type et le ton sont requis',
          email: {} as GeneratedEmail,
        },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json<GenerateEmailResponse>(
        {
          success: false,
          error: 'Clé API non configurée. Veuillez configurer une clé API dans les paramètres.',
          email: {} as GeneratedEmail,
        },
        { status: 400 }
      )
    }

    const aiProvider: AIProvider = provider || 'openai'
    const userPrompt = createEmailPrompt({
      type,
      tone,
      candidateName,
      position,
      companyName,
      customInstructions,
    })

    // Appel à l'IA
    const response = await aiGenerate(aiProvider, apiKey, EMAIL_GENERATOR_SYSTEM_PROMPT, userPrompt)

    // Parser la réponse JSON
    let parsedResponse
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch {
      // Fallback si le parsing échoue
      parsedResponse = {
        subject: 'Email généré',
        body: response,
      }
    }

    const email: GeneratedEmail = {
      subject: parsedResponse.subject || 'Email généré',
      body: parsedResponse.body || response,
      tone,
      type,
    }

    return NextResponse.json<GenerateEmailResponse>({
      success: true,
      email,
    })
  } catch (error) {
    console.error('Erreur lors de la génération:', error)

    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'

    return NextResponse.json<GenerateEmailResponse>(
      {
        success: false,
        error: errorMessage,
        email: {} as GeneratedEmail,
      },
      { status: 500 }
    )
  }
}
