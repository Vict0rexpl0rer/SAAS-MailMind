/**
 * =============================================================================
 * COMPOSANT LAYOUT - HEADER
 * =============================================================================
 *
 * En-tête du dashboard avec :
 * - Titre de la page actuelle
 * - Barre de recherche (placeholder)
 * - Avatar utilisateur avec menu déconnexion
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, LogOut, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, getInitials } from '@/components/ui'

/**
 * Props du Header
 */
interface HeaderProps {
  /** Titre de la page courante */
  title: string
  /** Sous-titre optionnel */
  subtitle?: string
  /** Informations utilisateur */
  user?: {
    name: string
    email: string
    avatarUrl?: string
  }
}

export function Header({ title, subtitle, user }: HeaderProps) {
  const router = useRouter()
  // État du menu utilisateur
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // État de chargement de la déconnexion
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  /**
   * Gère la déconnexion de l'utilisateur
   */
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const supabase = createClient()
      await supabase.auth.signOut()

      // Redirige vers la page de login
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      setIsLoggingOut(false)
    }
  }

  // Données utilisateur par défaut (pour le MVP)
  const displayUser = user || {
    name: 'Utilisateur Demo',
    email: 'demo@mailmind.io',
    avatarUrl: undefined,
  }

  return (
    <header className="h-16 bg-white border-b border-blue-100 flex items-center justify-between px-6 shadow-lg shadow-blue-200/30">
      {/* Titre de la page */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      {/* Actions à droite */}
      <div className="flex items-center gap-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-64 pl-10 pr-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
          />
        </div>

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Avatar
              src={displayUser.avatarUrl}
              fallback={getInitials(displayUser.name)}
              size="sm"
            />
            <span className="text-sm font-medium text-slate-700">
              {displayUser.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Menu déroulant */}
          {isMenuOpen && (
            <>
              {/* Overlay pour fermer le menu */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg shadow-blue-200/50 border border-blue-100 py-2 z-20">
                {/* Infos utilisateur */}
                <div className="px-4 py-3 border-b border-blue-100">
                  <p className="text-sm font-medium text-slate-900">
                    {displayUser.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {displayUser.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
