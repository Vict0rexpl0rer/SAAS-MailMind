/**
 * =============================================================================
 * API ROUTE - OPENAI
 * =============================================================================
 *
 * Route API placeholder pour l'intégration OpenAI.
 *
 * FUTURE IMPLÉMENTATION :
 * - POST /api/openai/classify : Classifier un email (cv, message, spam, urgent)
 * - POST /api/openai/extract : Extraire les infos d'un CV
 * - POST /api/openai/summarize : Résumer un email ou CV
 *
 * PRÉREQUIS À VENIR :
 * 1. Clé API OpenAI
 * 2. Choix du modèle (GPT-4, GPT-3.5-turbo)
 * 3. Gestion des tokens et coûts
 *
 * =============================================================================
 */

import { NextResponse } from 'next/server'

/**
 * POST /api/openai
 * Endpoint principal pour les appels OpenAI (placeholder)
 */
export async function POST(request: Request) {
  // TODO: Implémenter les appels OpenAI
  // 1. Récupérer la clé API depuis les settings utilisateur
  // 2. Parser le body de la requête
  // 3. Appeler l'API OpenAI
  // 4. Retourner le résultat

  try {
    const body = await request.json()
    const { action } = body

    // Différentes actions possibles
    switch (action) {
      case 'classify':
        return NextResponse.json({
          success: false,
          message: 'Classification non encore implémentée',
          placeholder: true,
          expectedInput: {
            action: 'classify',
            email: {
              subject: 'string',
              from: 'string',
              body: 'string',
            },
          },
          expectedOutput: {
            category: 'cv | message | spam | urgent | other',
            confidence: 'number (0-100)',
            reasoning: 'string',
          },
        })

      case 'extract':
        return NextResponse.json({
          success: false,
          message: 'Extraction CV non encore implémentée',
          placeholder: true,
          expectedInput: {
            action: 'extract',
            cvText: 'string (texte du CV)',
          },
          expectedOutput: {
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            phone: 'string?',
            position: 'string',
            skills: 'string[]',
            experienceLevel: 'junior | mid | senior | lead | executive',
            yearsOfExperience: 'number?',
            location: 'string?',
            summary: 'string',
          },
        })

      case 'summarize':
        return NextResponse.json({
          success: false,
          message: 'Résumé non encore implémenté',
          placeholder: true,
          expectedInput: {
            action: 'summarize',
            text: 'string',
            maxLength: 'number?',
          },
          expectedOutput: {
            summary: 'string',
          },
        })

      default:
        return NextResponse.json({
          success: false,
          message: 'Action non reconnue',
          availableActions: ['classify', 'extract', 'summarize'],
        }, { status: 400 })
    }
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Erreur de parsing du body',
    }, { status: 400 })
  }
}

/**
 * GET /api/openai
 * Documentation de l'API (placeholder)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API OpenAI - Documentation',
    placeholder: true,
    documentation: {
      setup: [
        '1. Obtenir une clé API sur platform.openai.com',
        '2. Ajouter la clé dans les paramètres de l\'application',
        '3. La clé est stockée de manière sécurisée dans Supabase',
      ],
      endpoints: {
        'POST /api/openai': {
          description: 'Endpoint principal pour les opérations IA',
          actions: {
            classify: 'Classifier un email par catégorie',
            extract: 'Extraire les informations d\'un CV',
            summarize: 'Générer un résumé',
          },
        },
      },
      models: {
        recommended: 'gpt-4-turbo-preview',
        alternative: 'gpt-3.5-turbo',
        note: 'GPT-4 est plus précis mais plus coûteux',
      },
      pricing: {
        note: 'Les coûts dépendent du modèle et du nombre de tokens',
        estimate: '~0.01$ par email classifié avec GPT-3.5-turbo',
      },
    },
  })
}
