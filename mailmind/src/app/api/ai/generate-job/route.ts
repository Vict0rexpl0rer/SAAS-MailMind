/**
 * =============================================================================
 * API ROUTE - GENERATE JOB POSTING
 * =============================================================================
 *
 * Endpoint pour générer une offre d'emploi avec l'IA.
 *
 * POST /api/ai/generate-job
 *
 * =============================================================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { aiGenerate } from '@/lib/ai'
import { JOB_WRITER_SYSTEM_PROMPT, createJobPrompt } from '@/lib/ai/prompts/job-prompts'
import { GenerateJobResponse, GeneratedJobPosting, AIProvider } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      company,
      location,
      contractType,
      remote,
      experienceLevel,
      skills,
      salary,
      description,
      provider,
      apiKey,
    } = body

    // Validation
    if (!title) {
      return NextResponse.json<GenerateJobResponse>(
        {
          success: false,
          error: 'Le titre du poste est requis',
          posting: {} as GeneratedJobPosting,
        },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json<GenerateJobResponse>(
        {
          success: false,
          error: 'Clé API non configurée. Veuillez configurer une clé API dans les paramètres.',
          posting: {} as GeneratedJobPosting,
        },
        { status: 400 }
      )
    }

    const aiProvider: AIProvider = provider || 'openai'
    const userPrompt = createJobPrompt({
      title,
      company,
      location,
      contractType,
      remote,
      experienceLevel,
      skills,
      salary,
      description,
    })

    // Appel à l'IA
    const response = await aiGenerate(aiProvider, apiKey, JOB_WRITER_SYSTEM_PROMPT, userPrompt, {
      temperature: 0.8, // Un peu plus créatif pour les offres
    })

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
        title: title,
        content: response,
        seoKeywords: [],
      }
    }

    const posting: GeneratedJobPosting = {
      title: parsedResponse.title || title,
      content: parsedResponse.content || response,
      seoKeywords: parsedResponse.seoKeywords || [],
    }

    return NextResponse.json<GenerateJobResponse>({
      success: true,
      posting,
    })
  } catch (error) {
    console.error('Erreur lors de la génération:', error)

    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'

    return NextResponse.json<GenerateJobResponse>(
      {
        success: false,
        error: errorMessage,
        posting: {} as GeneratedJobPosting,
      },
      { status: 500 }
    )
  }
}
