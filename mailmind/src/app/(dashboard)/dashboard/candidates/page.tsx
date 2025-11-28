/**
 * =============================================================================
 * PAGE - DASHBOARD / CANDIDATS
 * =============================================================================
 *
 * Page principale pour afficher et gérer les candidats.
 * Affiche une grille de cartes candidats avec filtres par statut.
 *
 * URL : /dashboard/candidates
 *
 * =============================================================================
 */

import { Header } from '@/components/layout'
import { CandidateGrid } from '@/components/candidates'

export default function CandidatesPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header de la page */}
      <Header
        title="Candidats"
        subtitle="Suivez vos candidats dans le processus de recrutement"
      />

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        <CandidateGrid />
      </div>
    </div>
  )
}
