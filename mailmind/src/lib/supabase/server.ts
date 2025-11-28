/**
 * =============================================================================
 * CLIENT SUPABASE - CÔTÉ SERVEUR
 * =============================================================================
 *
 * Ce fichier crée une instance du client Supabase utilisable dans :
 * - Les Server Components
 * - Les Route Handlers (API routes)
 * - Les Server Actions
 *
 * La gestion des cookies est différente côté serveur car on doit
 * explicitement lire/écrire les cookies via le module 'next/headers'.
 *
 * UTILISATION :
 * import { createClient } from '@/lib/supabase/server'
 * const supabase = await createClient()
 *
 * =============================================================================
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crée un client Supabase pour utilisation côté serveur
 * Gère automatiquement la lecture/écriture des cookies d'authentification
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Récupère tous les cookies de la requête
         * Nécessaire pour que Supabase puisse lire le token de session
         */
        getAll() {
          return cookieStore.getAll()
        },
        /**
         * Définit les cookies dans la réponse
         * Nécessaire pour rafraîchir le token de session
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // La méthode setAll a été appelée depuis un Server Component.
            // Cela peut être ignoré si vous avez un middleware qui rafraîchit
            // les sessions utilisateur.
          }
        },
      },
    }
  )
}
