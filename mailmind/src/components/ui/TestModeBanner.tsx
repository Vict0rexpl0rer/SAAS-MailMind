'use client'

/**
 * =============================================================================
 * BANNIÈRE MODE TEST
 * =============================================================================
 *
 * Indicateur visuel affiché quand l'application est en mode test/simulation.
 * Rappelle à l'utilisateur qu'il travaille avec des données fictives.
 *
 * =============================================================================
 */

import { useState } from 'react'
import { AlertTriangle, X, FlaskConical, Database, Bot } from 'lucide-react'

interface TestModeBannerProps {
  /** Afficher en mode compact (juste un badge) */
  compact?: boolean
  /** Callback quand l'utilisateur ferme la bannière */
  onDismiss?: () => void
  /** Permettre de fermer la bannière */
  dismissible?: boolean
}

export function TestModeBanner({
  compact = false,
  onDismiss,
  dismissible = true
}: TestModeBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  // Mode compact : juste un badge
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-medium">
        <FlaskConical className="w-3 h-3" />
        <span>Mode Test</span>
      </div>
    )
  }

  // Mode complet : bannière informative
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800">
              <FlaskConical className="w-4 h-4 text-amber-700 dark:text-amber-300" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                Mode Simulation Actif
              </span>
              <div className="flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300">
                <span className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Données fictives
                </span>
                <span className="flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  IA simulée
                </span>
              </div>
            </div>
          </div>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
              aria-label="Fermer la bannière"
            >
              <X className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Badge flottant pour le mode test
 * Peut être placé n'importe où dans l'interface
 */
export function TestModeBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-pulse">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500 text-white shadow-lg">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm font-medium">Mode Test</span>
      </div>
    </div>
  )
}

/**
 * Indicateur discret pour la sidebar
 */
export function TestModeIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 mx-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
      <FlaskConical className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
          Simulation
        </span>
        <span className="text-[10px] text-amber-600 dark:text-amber-400">
          Données fictives
        </span>
      </div>
    </div>
  )
}

/**
 * Message d'avertissement pour les pages
 */
export function TestModeWarning({ message }: { message?: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1">
        <span className="font-medium text-amber-800 dark:text-amber-200">
          Mode Test Actif
        </span>
        <span className="text-sm text-amber-700 dark:text-amber-300">
          {message || "Les données affichées sont fictives. Pour utiliser des données réelles, désactivez le mode test dans la configuration."}
        </span>
      </div>
    </div>
  )
}
