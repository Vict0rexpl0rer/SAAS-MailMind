/**
 * =============================================================================
 * PAGE D'ACCUEIL - REDIRECTION
 * =============================================================================
 *
 * Simple page de redirection vers login ou dashboard.
 * Inclut un bouton dev pour accéder directement au dashboard.
 *
 * =============================================================================
 */

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Mail, Code } from 'lucide-react'

export default async function HomePage() {
  // Vérifie si l'utilisateur est connecté
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si connecté, redirige vers le dashboard
  if (user) {
    redirect('/dashboard/emails')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">MailMind</h1>
        <p className="text-slate-600 mb-8">Dashboard de gestion des emails et candidats</p>

        <div className="flex flex-col gap-3">
          {/* Bouton Login */}
          <Link
            href="/login"
            className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
          >
            Se connecter
          </Link>

          {/* Bouton Dev - Accès direct */}
          <Link
            href="/dashboard/emails"
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Code className="w-4 h-4" />
            Mode Dev (sans login)
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Le bouton orange est temporaire pour le développement
        </p>
      </div>
    </div>
  )
}
