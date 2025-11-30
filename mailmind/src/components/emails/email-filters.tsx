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
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border-subtle)] overflow-x-auto">
      <div className="flex items-center gap-1 p-1 bg-[var(--surface-hover)] rounded-[10px]">
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
                h-9 px-3
                rounded-lg
                text-[13px] font-medium
                whitespace-nowrap
                transition-all duration-150
                ${isActive
                  ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              <span
                className={`
                  min-w-[20px] h-5 px-1.5 text-[11px] rounded-md flex items-center justify-center font-semibold
                  ${isActive
                    ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]'
                    : 'bg-[var(--surface-default)] text-[var(--text-tertiary)]'
                  }
                `}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
