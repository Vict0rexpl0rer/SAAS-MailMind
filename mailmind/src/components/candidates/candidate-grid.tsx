/**
 * =============================================================================
 * COMPOSANT - CANDIDATE GRID
 * =============================================================================
 *
 * Grille de cartes candidats avec filtres.
 * Composant principal de la page /dashboard/candidates.
 *
 * =============================================================================
 */

'use client'

import { useState, useMemo } from 'react'
import { Users, LayoutGrid, List } from 'lucide-react'
import { Candidate, CandidateStatus } from '@/types'
import { mockCandidates, candidateStats } from '@/data/mock-candidates'
import { CandidateCard } from './candidate-card'
import { CandidateFilters } from './candidate-filters'
import { Button } from '@/components/ui'

export function CandidateGrid() {
  // État du filtre actif
  const [activeFilter, setActiveFilter] = useState<CandidateStatus | 'all'>('all')
  // État de la vue (grille ou liste)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Calcul des compteurs par statut
  const counts = useMemo(() => ({
    all: mockCandidates.length,
    new: candidateStats.new,
    reviewing: candidateStats.reviewing,
    shortlisted: candidateStats.shortlisted,
    interviewing: candidateStats.interviewing,
    offered: candidateStats.offered,
    hired: candidateStats.hired,
    rejected: candidateStats.rejected,
  }), [])

  // Filtrage des candidats
  const filteredCandidates = useMemo(() => {
    if (activeFilter === 'all') return mockCandidates
    return mockCandidates.filter(candidate => candidate.status === activeFilter)
  }, [activeFilter])

  // Tri par date (plus récent en premier) et score
  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      // D'abord par score de matching (si disponible)
      if (a.matchScore !== undefined && b.matchScore !== undefined) {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore
        }
      }
      // Ensuite par date
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
  }, [filteredCandidates])

  /**
   * Gère le clic sur une carte candidat
   */
  const handleCandidateClick = (candidate: Candidate) => {
    // Dans le futur, ouvrir un panel de détail ou une modale
    console.log('Candidat sélectionné:', candidate)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Barre d'actions */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-400" />
          <span className="text-sm text-slate-600">
            {filteredCandidates.length} candidat{filteredCandidates.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Toggle vue grille/liste */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`
              p-1.5 rounded-md transition-colors
              ${viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
              }
            `}
            title="Vue grille"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`
              p-1.5 rounded-md transition-colors
              ${viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
              }
            `}
            title="Vue liste"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="border-b border-slate-200">
        <CandidateFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />
      </div>

      {/* Grille/Liste des candidats */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        {sortedCandidates.length === 0 ? (
          // État vide
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Users className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500">Aucun candidat dans cette catégorie</p>
          </div>
        ) : viewMode === 'grid' ? (
          // Vue grille
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => handleCandidateClick(candidate)}
              />
            ))}
          </div>
        ) : (
          // Vue liste (simplifiée)
          <div className="space-y-2">
            {sortedCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => handleCandidateClick(candidate)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer avec informations */}
      <div className="p-3 bg-white border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400">
          {sortedCandidates.length} candidat{sortedCandidates.length > 1 ? 's' : ''} affiché{sortedCandidates.length > 1 ? 's' : ''}
          {' • '}
          Données de démonstration
        </p>
      </div>
    </div>
  )
}
