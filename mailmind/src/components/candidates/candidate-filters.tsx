/**
 * =============================================================================
 * COMPOSANT - CANDIDATE FILTERS
 * =============================================================================
 *
 * Barre de filtres pour la liste des candidats.
 * Permet de filtrer par statut dans le processus de recrutement.
 *
 * =============================================================================
 */

'use client'

import {
  Users,
  Clock,
  UserCheck,
  Calendar,
  Send,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { CandidateStatus } from '@/types'

/**
 * Props du composant
 */
interface CandidateFiltersProps {
  /** Filtre actif */
  activeFilter: CandidateStatus | 'all'
  /** Callback lors du changement de filtre */
  onFilterChange: (filter: CandidateStatus | 'all') => void
  /** Compteurs par statut */
  counts: Record<string, number>
}

/**
 * Configuration des filtres
 */
const filters = [
  { id: 'all' as const, label: 'Tous', icon: Users },
  { id: 'new' as const, label: 'Nouveaux', icon: Clock },
  { id: 'reviewing' as const, label: 'En revue', icon: Clock },
  { id: 'shortlisted' as const, label: 'Présélectionnés', icon: UserCheck },
  { id: 'interviewing' as const, label: 'Entretien', icon: Calendar },
  { id: 'offered' as const, label: 'Offre', icon: Send },
  { id: 'hired' as const, label: 'Recrutés', icon: CheckCircle },
  { id: 'rejected' as const, label: 'Refusés', icon: XCircle },
]

export function CandidateFilters({ activeFilter, onFilterChange, counts }: CandidateFiltersProps) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border-subtle)] overflow-x-auto">
      <div className="flex items-center gap-1 p-1 bg-[var(--surface-hover)] rounded-[10px]">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id
          const count = counts[filter.id] || 0

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
              {count > 0 && (
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
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
