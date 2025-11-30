'use client'

/**
 * =============================================================================
 * COMPOSANT CANDIDATE DETAIL MODAL
 * =============================================================================
 *
 * Modal de détail d'un candidat avec 3 onglets :
 * - Profil : Informations générales extraites du CV
 * - CV : Visualisation du CV complet
 * - Chat : Chat IA contextuel sur le candidat
 *
 * =============================================================================
 */

import { useState } from 'react'
import {
  X,
  User,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  ExternalLink,
} from 'lucide-react'
import { Candidate } from '@/types'
import { Button, Badge, Avatar } from '@/components/ui'

/**
 * Types des onglets
 */
type TabId = 'profile' | 'cv' | 'chat'

interface Tab {
  id: TabId
  label: string
  icon: typeof User
}

const tabs: Tab[] = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'chat', label: 'Chat IA', icon: MessageSquare },
]

/**
 * Props du composant
 */
interface CandidateDetailModalProps {
  /** Candidat à afficher */
  candidate: Candidate
  /** Callback de fermeture */
  onClose: () => void
  /** Onglet initial */
  initialTab?: TabId
}

/**
 * Labels pour les niveaux d'expérience
 */
const experienceLevelLabels: Record<string, string> = {
  junior: 'Junior',
  mid: 'Confirmé',
  senior: 'Senior',
  lead: 'Lead',
  executive: 'Executive',
}

/**
 * Composant d'onglet Profil
 */
function ProfileTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="space-y-6">
      {/* Header avec avatar et infos principales */}
      <div className="flex items-start gap-4">
        <Avatar
          src={candidate.avatarUrl}
          fallback={`${candidate.firstName?.[0] || ''}${candidate.lastName?.[0] || ''}`}
          size="xl"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {candidate.firstName} {candidate.lastName}
          </h2>
          <p className="text-[var(--text-secondary)]">{candidate.position}</p>

          <div className="flex flex-wrap gap-3 mt-3">
            {candidate.email && (
              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-primary)]"
              >
                <Mail className="w-4 h-4" />
                {candidate.email}
              </a>
            )}
            {candidate.phone && (
              <a
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-primary)]"
              >
                <Phone className="w-4 h-4" />
                {candidate.phone}
              </a>
            )}
            {candidate.location && (
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)]">
                <MapPin className="w-4 h-4" />
                {candidate.location}
              </span>
            )}
          </div>
        </div>

        {/* Score de matching */}
        {candidate.matchScore !== undefined && (
          <div className="text-center">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold
              ${candidate.matchScore >= 80
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : candidate.matchScore >= 60
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }
            `}>
              {candidate.matchScore}%
            </div>
            <span className="text-xs text-[var(--text-tertiary)] mt-1 block">
              Match
            </span>
          </div>
        )}
      </div>

      {/* Informations clés */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-[var(--surface-hover)] rounded-lg">
          <div className="text-xs text-[var(--text-tertiary)] mb-1">Niveau</div>
          <div className="font-medium text-[var(--text-primary)]">
            {experienceLevelLabels[candidate.experienceLevel] || candidate.experienceLevel}
          </div>
        </div>
        {candidate.yearsOfExperience !== undefined && (
          <div className="p-3 bg-[var(--surface-hover)] rounded-lg">
            <div className="text-xs text-[var(--text-tertiary)] mb-1">Expérience</div>
            <div className="font-medium text-[var(--text-primary)]">
              {candidate.yearsOfExperience} ans
            </div>
          </div>
        )}
        <div className="p-3 bg-[var(--surface-hover)] rounded-lg">
          <div className="text-xs text-[var(--text-tertiary)] mb-1">Source</div>
          <div className="font-medium text-[var(--text-primary)] capitalize">
            {candidate.source}
          </div>
        </div>
        <div className="p-3 bg-[var(--surface-hover)] rounded-lg">
          <div className="text-xs text-[var(--text-tertiary)] mb-1">Ajouté le</div>
          <div className="font-medium text-[var(--text-primary)]">
            {candidate.createdAt.toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>

      {/* Résumé IA */}
      {candidate.aiSummary && (
        <div className="p-4 bg-[var(--surface-hover)] rounded-xl">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Résumé IA
          </h3>
          <p className="text-sm text-[var(--text-primary)]">{candidate.aiSummary}</p>
        </div>
      )}

      {/* Compétences */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Compétences
        </h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <Badge key={index} variant="default">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Notes */}
      {candidate.notes && (
        <div>
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
            Notes internes
          </h3>
          <div className="p-3 bg-[var(--surface-hover)] rounded-lg text-sm text-[var(--text-primary)]">
            {candidate.notes}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Composant d'onglet CV (visualisation du PDF)
 */
function CVTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-[var(--text-secondary)]">
            CV de {candidate.firstName} {candidate.lastName}
          </h3>
          {candidate.cvFileName && (
            <p className="text-xs text-[var(--text-tertiary)]">
              {candidate.cvFileName}
            </p>
          )}
        </div>
        {candidate.cvUrl && (
          <a
            href={candidate.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Ouvrir dans un nouvel onglet
          </a>
        )}
      </div>

      {candidate.cvUrl ? (
        <div className="flex-1 min-h-[500px] bg-[var(--surface-hover)] rounded-xl overflow-hidden">
          <iframe
            src={candidate.cvUrl}
            className="w-full h-full"
            title={`CV de ${candidate.firstName} ${candidate.lastName}`}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[var(--surface-hover)] rounded-xl">
          <div className="text-center text-[var(--text-tertiary)]">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Aucun CV disponible</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Composant d'onglet Chat (placeholder - sera développé séparément)
 */
function ChatTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-[var(--surface-hover)] rounded-xl">
        <div className="text-center text-[var(--text-tertiary)] p-6">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            Chat IA sur {candidate.firstName}
          </h3>
          <p className="text-sm max-w-md">
            Posez vos questions sur ce candidat. L'IA a accès au CV complet
            et peut vous aider à évaluer le profil.
          </p>
          <div className="mt-6">
            <Button variant="primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Démarrer le chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Composant principal de la modal
 */
export function CandidateDetailModal({
  candidate,
  onClose,
  initialTab = 'profile',
}: CandidateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-primary)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[var(--surface-hover)] rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${isActive
                        ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
                        : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'profile' && <ProfileTab candidate={candidate} />}
          {activeTab === 'cv' && <CVTab candidate={candidate} />}
          {activeTab === 'chat' && <ChatTab candidate={candidate} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--surface-hover)]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-tertiary)]">
              Statut :
            </span>
            <Badge
              variant={
                candidate.status === 'hired'
                  ? 'success'
                  : candidate.status === 'rejected'
                  ? 'danger'
                  : 'default'
              }
            >
              {candidate.status === 'new' && 'Nouveau'}
              {candidate.status === 'reviewing' && 'En revue'}
              {candidate.status === 'shortlisted' && 'Présélectionné'}
              {candidate.status === 'interviewing' && 'Entretien'}
              {candidate.status === 'offered' && 'Offre envoyée'}
              {candidate.status === 'hired' && 'Recruté'}
              {candidate.status === 'rejected' && 'Refusé'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onClose}>
              Fermer
            </Button>
            <Button variant="primary">
              <Mail className="w-4 h-4 mr-2" />
              Contacter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDetailModal
