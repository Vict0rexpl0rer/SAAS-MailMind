/**
 * =============================================================================
 * CLIENT SUPABASE - MIDDLEWARE
 * =============================================================================
 *
 * Ce fichier crée une instance du client Supabase spécifiquement pour
 * le middleware Next.js.
 *
 * Le middleware intercepte TOUTES les requêtes et peut :
 * - Rafraîchir le token de session automatiquement
 * - Rediriger les utilisateurs non authentifiés
 * - Protéger les routes
 *
 * C'est différent du client serveur car le middleware a accès à la
 * requête ET à la réponse, permettant de modifier les deux.
 *
 * =============================================================================
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Met à jour la session Supabase dans le middleware
 * Cette fonction est appelée à chaque requête pour :
 * 1. Rafraîchir le token si nécessaire
 * 2. Vérifier si l'utilisateur est authentifié
 * 3. Rediriger vers /login si non authentifié et route protégée
 */
export async function updateSession(request: NextRequest) {
  // Crée une réponse qui sera potentiellement modifiée
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Crée le client Supabase avec gestion des cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Met à jour les cookies dans la requête
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Crée une nouvelle réponse avec les cookies mis à jour
          supabaseResponse = NextResponse.next({
            request,
          })
          // Applique les cookies à la réponse
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Ne pas exécuter de code entre createServerClient et
  // supabase.auth.getUser(). Une simple erreur pourrait rendre difficile
  // le débogage des problèmes de déconnexion aléatoire des utilisateurs.

  // Récupère l'utilisateur actuel (et rafraîchit le token si nécessaire)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // =========================================================================
  // PROTECTION DES ROUTES
  // =========================================================================
  // Si l'utilisateur n'est pas connecté et essaie d'accéder au dashboard,
  // on le redirige vers la page de login
  // =========================================================================

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // Si pas d'utilisateur et tentative d'accès au dashboard -> redirection login
  if (!user && isDashboardRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Si utilisateur connecté et sur page login -> redirection dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/emails'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: Toujours retourner la réponse supabaseResponse
  // Si vous retournez NextResponse.next() sans les cookies,
  // le navigateur et le serveur seront désynchronisés
  return supabaseResponse
}
