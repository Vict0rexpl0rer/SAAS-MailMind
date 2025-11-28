/**
 * =============================================================================
 * COMPOSANT - EMAIL FILTERS
 * =============================================================================
 *
 * Barre de filtres pour la liste des emails.
 * Permet de filtrer par catégorie (Tous, CV, Messages, Spam, Urgent).
 *
 * =============================================================================
 */

'use client'

import { Inbox, FileText, MessageSquare, Trash2, AlertTriangle } from 'lucide-react'
import { EmailCategory } from '@/types'

/**
 * Props du composant
 */
interface EmailFiltersProps {
  /** Filtre actif */
  activeFilter: EmailCategory | 'all'
  /** Callback lors du changement de filtre */
  onFilterChange: (filter: EmailCategory | 'all') => void
  /** Compteurs par catégorie */
  counts: {
    all: number
    cv: number
    message: number
    spam: number
    urgent: number
  }
}

/**
 * Configuration des filtres
 */
const filters = [
  { id: 'all' as const, label: 'Tous', icon: Inbox },
  { id: 'cv' as const, label: 'CV', icon: FileText },
  { id: 'message' as const, label: 'Messages', icon: MessageSquare },
  { id: 'urgent' as const, label: 'Urgents', icon: AlertTriangle },
  { id: 'spam' as const, label: 'Spam', icon: Trash2 },
]

export function EmailFilters({ activeFilter, onFilterChange, counts }: EmailFiltersProps) {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-slate-200 bg-white overflow-x-auto">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = activeFilter === filter.id
        const count = counts[filter.id]

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center gap-2
              px-4 py-2
              rounded-lg
              text-sm font-medium
              whitespace-nowrap
              transition-all duration-200
              ${isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
            <span
              className={`
                px-1.5 py-0.5 text-xs rounded-full
                ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-500'
                }
              `}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
