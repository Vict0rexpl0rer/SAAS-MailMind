/**
 * =============================================================================
 * COMPOSANT - EMAIL LIST ITEM
 * =============================================================================
 *
 * Élément de liste pour afficher un email dans la liste.
 * Affiche : expéditeur, sujet, aperçu, date, catégorie, pièces jointes.
 *
 * =============================================================================
 */

'use client'

import { Mail, Paperclip, Clock } from 'lucide-react'
import { Email } from '@/types'
import { Badge, emailCategoryBadge } from '@/components/ui'

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
 * Labels pour les catégories d'email
 */
const categoryLabels: Record<string, string> = {
  cv: 'CV',
  message: 'Message',
  spam: 'Spam',
  urgent: 'Urgent',
  other: 'Autre',
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
          {/* Ligne 1 : Expéditeur + Date */}
          <div className="flex items-center justify-between gap-4 mb-0.5">
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
            <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
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

          {/* Ligne 4 : Tags et indicateurs */}
          <div className="flex items-center gap-2">
            {/* Badge catégorie */}
            <Badge variant={emailCategoryBadge[email.category]}>
              {categoryLabels[email.category]}
            </Badge>

            {/* Indicateur pièce jointe */}
            {email.hasAttachment && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                <Paperclip className="w-3 h-3" />
                {email.attachments?.length || 1}
              </span>
            )}

            {/* Score de confiance IA */}
            {email.aiConfidence && (
              <span className="text-xs text-[var(--text-tertiary)]">
                IA: {email.aiConfidence}%
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
