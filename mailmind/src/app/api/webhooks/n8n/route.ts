/**
 * =============================================================================
 * API ROUTE - WEBHOOK N8N
 * =============================================================================
 *
 * Route API pour recevoir des webhooks de n8n ou d'autres services.
 *
 * CAS D'USAGE :
 * - Recevoir des CV depuis un formulaire externe
 * - Recevoir des notifications de services tiers
 * - Déclencher des actions automatisées
 *
 * =============================================================================
 */

import { NextResponse } from 'next/server'

/**
 * POST /api/webhooks/n8n
 * Reçoit un webhook de n8n
 */
export async function POST(request: Request) {
  try {
    // Parse le body du webhook
    const body = await request.json()

    // Log pour debug (à retirer en production)
    console.log('Webhook n8n reçu:', body)

    // TODO: Implémenter la logique selon le type de webhook
    // 1. Vérifier la signature/authentification du webhook
    // 2. Parser le type d'événement
    // 3. Traiter l'événement (créer candidat, etc.)
    // 4. Retourner une confirmation

    const { type } = body

    switch (type) {
      case 'new_cv_form':
        // Un CV a été soumis via un formulaire externe
        return NextResponse.json({
          success: true,
          message: 'CV reçu (placeholder)',
          placeholder: true,
          receivedData: body,
        })

      case 'email_forward':
        // Un email a été forwardé depuis n8n
        return NextResponse.json({
          success: true,
          message: 'Email reçu (placeholder)',
          placeholder: true,
          receivedData: body,
        })

      default:
        return NextResponse.json({
          success: true,
          message: 'Webhook reçu (type non reconnu)',
          placeholder: true,
          receivedData: body,
          supportedTypes: ['new_cv_form', 'email_forward'],
        })
    }
  } catch (error) {
    console.error('Erreur webhook n8n:', error)
    return NextResponse.json({
      success: false,
      message: 'Erreur de traitement du webhook',
    }, { status: 500 })
  }
}

/**
 * GET /api/webhooks/n8n
 * Documentation du webhook
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Webhook n8n - Documentation',
    placeholder: true,
    documentation: {
      description: 'Endpoint pour recevoir des webhooks de n8n',
      method: 'POST',
      contentType: 'application/json',
      authentication: 'À implémenter (signature HMAC ou API key)',
      payloadExamples: {
        new_cv_form: {
          type: 'new_cv_form',
          candidate: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            position: 'Developer',
            cvUrl: 'https://...',
          },
        },
        email_forward: {
          type: 'email_forward',
          email: {
            from: 'sender@example.com',
            subject: 'CV - John Doe',
            body: '...',
            attachments: [],
          },
        },
      },
      n8nSetup: [
        '1. Créer un workflow n8n',
        '2. Ajouter un trigger (form, email, etc.)',
        '3. Ajouter un noeud HTTP Request',
        '4. Configurer l\'URL: https://votre-domaine.com/api/webhooks/n8n',
        '5. Méthode: POST, Content-Type: application/json',
        '6. Configurer le body selon les exemples ci-dessus',
      ],
    },
  })
}
