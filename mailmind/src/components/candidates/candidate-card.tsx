/**
 * =============================================================================
 * COMPOSANT - CANDIDATE CARD
 * =============================================================================
 *
 * Carte pour afficher un candidat dans la grille.
 * Design moderne avec :
 * - Avatar
 * - Nom et poste
 * - Compétences (tags)
 * - Statut
 * - Score de matching
 *
 * =============================================================================
 */

'use client'

import { MapPin, Briefcase, Star, FileText, ExternalLink } from 'lucide-react'
import { Candidate } from '@/types'
import { Card, CardContent, Badge, Avatar, getInitials, candidateStatusBadge } from '@/components/ui'
import { statusLabels } from '@/data/mock-candidates'

/**
 * Props du composant
 */
interface CandidateCardProps {
  /** Données du candidat */
  candidate: Candidate
  /** Callback lors du clic sur la carte */
  onClick?: () => void
}

/**
 * Labels pour les niveaux d'expérience
 */
const experienceLevelLabels: Record<string, string> = {
  junior: 'Junior',
  mid: 'Confirmé',
  senior: 'Senior',
  lead: 'Lead',
  executive: 'Exécutif',
}

export function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  // Limite le nombre de compétences affichées
  const displayedSkills = candidate.skills.slice(0, 4)
  const remainingSkills = candidate.skills.length - displayedSkills.length

  return (
    <Card
      hoverable
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* En-tête : Avatar + Infos principales */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar
            src={candidate.avatarUrl}
            fallback={getInitials(`${candidate.firstName} ${candidate.lastName}`)}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] truncate">
              {candidate.firstName} {candidate.lastName}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] truncate flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              {candidate.position}
            </p>
            {candidate.location && (
              <p className="text-xs text-[var(--text-tertiary)] flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {candidate.location}
              </p>
            )}
          </div>
        </div>

        {/* Compétences */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {displayedSkills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-[var(--surface-hover)] text-[var(--text-secondary)] text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {remainingSkills > 0 && (
            <span className="px-2 py-0.5 bg-[var(--surface-default)] text-[var(--text-tertiary)] text-xs rounded-md">
              +{remainingSkills}
            </span>
          )}
        </div>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            {experienceLevelLabels[candidate.experienceLevel]}
            {candidate.yearsOfExperience !== undefined && (
              <span>• {candidate.yearsOfExperience} ans</span>
            )}
          </span>
          {candidate.cvFileName && (
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              CV
            </span>
          )}
        </div>

        {/* Footer : Statut + Score */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
          <Badge variant={candidateStatusBadge[candidate.status]}>
            {statusLabels[candidate.status]}
          </Badge>

          {candidate.matchScore !== undefined && (
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-[var(--surface-hover)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    candidate.matchScore >= 80
                      ? 'bg-emerald-500'
                      : candidate.matchScore >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${candidate.matchScore}%` }}
                />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {candidate.matchScore}%
              </span>
            </div>
          )}
        </div>

        {/* Résumé IA (si disponible) */}
        {candidate.aiSummary && (
          <p className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-tertiary)] line-clamp-2">
            {candidate.aiSummary}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
