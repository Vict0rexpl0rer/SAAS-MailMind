/**
 * =============================================================================
 * COMPOSANT LAYOUT - HEADER
 * =============================================================================
 *
 * En-tête du dashboard avec :
 * - Titre de la page actuelle
 * - Barre de recherche
 * - Toggle thème (dark/light)
 * - Avatar utilisateur avec menu déconnexion
 *
 * Design inspiré de Linear avec support dark/light mode.
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, LogOut, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, getInitials } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/theme-toggle'

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
    <header className="h-14 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] flex items-center justify-between px-5">
      {/* Titre de la page */}
      <div>
        <h1 className="text-base font-semibold text-[var(--text-primary)]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        )}
      </div>

      {/* Actions à droite */}
      <div className="flex items-center gap-3">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-64 h-10 pl-10 pr-4
              bg-[var(--surface-default)]
              border border-[var(--border-default)]
              rounded-[10px]
              text-sm text-[var(--text-primary)]
              placeholder:text-[var(--text-tertiary)]
              focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]/30 focus:border-[var(--accent-primary)]
              transition-all duration-200"
          />
        </div>

        {/* Toggle thème */}
        <ThemeToggle />

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg
              hover:bg-[var(--surface-hover)]
              transition-colors duration-150"
          >
            <Avatar
              src={displayUser.avatarUrl}
              fallback={getInitials(displayUser.name)}
              size="sm"
            />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {displayUser.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
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
              <div className="absolute right-0 mt-2 w-64
                bg-[var(--bg-elevated)]
                rounded-xl shadow-lg
                border border-[var(--border-default)]
                py-1.5 z-20
                animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Infos utilisateur */}
                <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {displayUser.name}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {displayUser.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5
                      text-sm text-[var(--error)]
                      hover:bg-[var(--error-subtle)]
                      transition-colors duration-150
                      disabled:opacity-50"
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
