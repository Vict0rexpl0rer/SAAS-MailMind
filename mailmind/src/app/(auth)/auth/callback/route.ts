/**
 * =============================================================================
 * ROUTE CALLBACK OAUTH
 * =============================================================================
 *
 * Cette route est appelée par Google après l'authentification OAuth.
 * Elle reçoit un code d'autorisation qu'elle échange contre une session.
 *
 * FLUX :
 * 1. Google redirige vers cette route avec ?code=xxx
 * 2. Supabase échange le code contre des tokens
 * 3. Une session est créée (cookies)
 * 4. L'utilisateur est redirigé vers /dashboard/emails
 *
 * =============================================================================
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  // Récupère l'URL de la requête
  const requestUrl = new URL(request.url)

  // Extrait le code d'autorisation des paramètres
  const code = requestUrl.searchParams.get('code')

  // Récupère l'origine pour la redirection
  const origin = requestUrl.origin

  if (code) {
    // Crée le client Supabase côté serveur
    const supabase = await createClient()

    // Échange le code contre une session
    // Cette opération crée automatiquement les cookies de session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Erreur lors de l\'échange du code:', error)
      // En cas d'erreur, redirige vers login avec un message
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }
  }

  // Redirection vers le dashboard après connexion réussie
  return NextResponse.redirect(`${origin}/dashboard/emails`)
}
