/**
 * =============================================================================
 * CLIENT SUPABASE - CÔTÉ CLIENT (BROWSER)
 * =============================================================================
 *
 * Ce fichier crée une instance du client Supabase utilisable dans les
 * composants React côté client (use client).
 *
 * Utilise le package @supabase/ssr pour une gestion optimale des cookies
 * et de l'authentification dans Next.js App Router.
 *
 * UTILISATION :
 * import { createClient } from '@/lib/supabase/client'
 * const supabase = createClient()
 *
 * =============================================================================
 */

import { createBrowserClient } from '@supabase/ssr'

/**
 * Crée un client Supabase pour utilisation côté navigateur
 * Les cookies sont automatiquement gérés par le navigateur
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
