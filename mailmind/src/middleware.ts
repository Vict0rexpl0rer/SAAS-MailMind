/**
 * =============================================================================
 * MIDDLEWARE NEXT.JS
 * =============================================================================
 *
 * Le middleware est exécuté AVANT chaque requête correspondant au matcher.
 * Son rôle principal ici est de :
 *
 * 1. Rafraîchir automatiquement le token d'authentification Supabase
 * 2. Protéger les routes /dashboard/* des utilisateurs non connectés
 * 3. Rediriger les utilisateurs connectés loin de /login
 *
 * Le middleware s'exécute en "Edge Runtime" (plus rapide que Node.js)
 *
 * =============================================================================
 */

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Délègue la logique au module supabase/middleware
  return await updateSession(request)
}

/**
 * Configuration du matcher
 * Définit sur quelles routes le middleware doit s'exécuter
 *
 * On exclut :
 * - _next/static : fichiers statiques Next.js
 * - _next/image : optimisation d'images
 * - favicon.ico : icône du site
 * - images, svg, png, etc. : fichiers statiques
 */
export const config = {
  matcher: [
    /*
     * Match toutes les routes SAUF :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (icône du site)
     * - fichiers statiques (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
