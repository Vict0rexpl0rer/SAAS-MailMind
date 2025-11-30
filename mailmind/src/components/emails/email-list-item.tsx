/**
 * =============================================================================
 * COMPOSANT - EMAIL LIST ITEM V2
 * =============================================================================
 *
 * Élément de liste pour afficher un email dans la liste.
 * Affiche : expéditeur, sujet, aperçu, date, catégorie (21), CV, confiance IA.
 *
 * =============================================================================
 */

'use client'

import { Paperclip, FileCheck, AlertCircle } from 'lucide-react'
import { Email } from '@/types'
import { CategoryBadge, CVIndicator, DoubtIndicator } from '@/components/categories'

/**
 * Props du composant
 */
interface EmailListItemProps {
  /** Données de l'email */
  email: Email
  /** Callback lors du clic sur l'email */
  onClick?: () => void
  /** Indique si l'email est sélectionné */
  isSelected?: boolean
}

/**
 * Formate une date relative (ex: "il y a 2 heures")
 */
function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'À l\'instant'
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

export function EmailListItem({ email, onClick, isSelected = false }: EmailListItemProps) {
  const isUnread = email.status === 'unread'

  return (
    <article
      onClick={onClick}
      className={`
        px-4 py-3.5 border-b border-[var(--border-subtle)]
        cursor-pointer
        transition-colors duration-150
        ${isSelected
          ? 'bg-[var(--accent-primary)]/10'
          : 'hover:bg-[var(--surface-hover)]'
        }
        ${isUnread && !isSelected ? 'bg-[var(--accent-primary)]/5' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Indicateur de non-lu */}
        <div className="pt-1.5 flex-shrink-0">
          <div
            className={`
              w-2 h-2 rounded-full transition-colors
              ${isUnread ? 'bg-[var(--accent-primary)]' : 'bg-transparent'}
            `}
          />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          {/* Ligne 1 : Expéditeur + Indicateurs + Date */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`
                  text-sm truncate
                  ${isUnread
                    ? 'font-semibold text-[var(--text-primary)]'
                    : 'font-medium text-[var(--text-secondary)]'
                  }
                `}
              >
                {email.senderName}
              </span>

              {/* Indicateurs inline */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Indicateur CV */}
                {email.hasCv && (
                  <CVIndicator size="sm" />
                )}

                {/* Indicateur doute */}
                {email.isDoubtful && (
                  <DoubtIndicator confidence={email.aiConfidence} size="sm" />
                )}
              </div>
            </div>

            <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap flex-shrink-0">
              {formatRelativeDate(email.receivedAt)}
            </span>
          </div>

          {/* Ligne 2 : Sujet */}
          <h3
            className={`
              text-sm truncate mb-0.5
              ${isUnread
                ? 'font-medium text-[var(--text-primary)]'
                : 'text-[var(--text-secondary)]'
              }
            `}
          >
            {email.subject}
          </h3>

          {/* Ligne 3 : Aperçu */}
          <p className="text-[13px] text-[var(--text-tertiary)] truncate mb-2">
            {email.preview}
          </p>

          {/* Ligne 4 : Badge catégorie et indicateurs */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Badge catégorie avec nouvelle version */}
            <CategoryBadge
              category={email.category}
              showIcon={true}
              shortLabel={true}
              confidence={email.aiConfidence}
              isDoubtful={email.isDoubtful}
              size="sm"
            />

            {/* Indicateur pièce jointe */}
            {email.hasAttachment && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                <Paperclip className="w-3 h-3" />
                {email.attachments?.length || 1}
              </span>
            )}

            {/* Score de confiance IA (affiché seulement si pas douteux) */}
            {email.aiConfidence !== undefined && !email.isDoubtful && (
              <span className="text-xs text-[var(--text-tertiary)]">
                IA: {email.aiConfidence}%
              </span>
            )}

            {/* Indicateur de classification manuelle */}
            {email.manuallyClassified && (
              <span className="text-xs text-green-600 dark:text-green-400">
                Classé manuellement
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
