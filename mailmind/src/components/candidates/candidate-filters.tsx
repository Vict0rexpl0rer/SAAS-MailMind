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
    <div className="flex items-center gap-2 p-4 bg-white overflow-x-auto">
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
              px-3 py-1.5
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
            {count > 0 && (
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
            )}
          </button>
        )
      })}
    </div>
  )
}
