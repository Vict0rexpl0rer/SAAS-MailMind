/**
 * =============================================================================
 * COMPOSANT - EMAIL FILTERS (Legacy)
 * =============================================================================
 *
 * Barre de filtres simplifiée pour la liste des emails.
 * Version legacy pour la rétrocompatibilité.
 *
 * Pour les 21 catégories, utilisez le composant CategoryFilters.
 *
 * =============================================================================
 */

'use client'

import { Inbox, FileText, MessageSquare, Trash2, AlertTriangle, Users, Briefcase } from 'lucide-react'
import { EmailCategory, EmailCategoryGroup } from '@/types'

/**
 * Props du composant
 */
interface EmailFiltersProps {
  /** Filtre actif */
  activeFilter: EmailCategory | EmailCategoryGroup | 'all'
  /** Callback lors du changement de filtre */
  onFilterChange: (filter: EmailCategory | 'all') => void
  /** Compteurs par catégorie */
  counts: Record<string, number>
}

/**
 * Configuration des filtres simplifiés (groupes principaux)
 */
const filters: { id: EmailCategoryGroup | 'all'; label: string; icon: typeof Inbox }[] = [
  { id: 'all', label: 'Tous', icon: Inbox },
  { id: 'recrutement', label: 'Recrutement', icon: Users },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'indesirables', label: 'Indésirables', icon: Trash2 },
]

export function EmailFilters({ activeFilter, onFilterChange, counts }: EmailFiltersProps) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border-subtle)] overflow-x-auto">
      <div className="flex items-center gap-1 p-1 bg-[var(--surface-hover)] rounded-[10px]">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id
          const count = counts[filter.id] ?? 0

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id as EmailCategory | 'all')}
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
