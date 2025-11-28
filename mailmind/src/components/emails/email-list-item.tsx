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
        p-4 border-b border-slate-100
        cursor-pointer
        transition-colors duration-200
        ${isSelected ? 'bg-slate-100' : 'hover:bg-slate-50'}
        ${isUnread ? 'bg-blue-50/50' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Indicateur de non-lu */}
        <div className="pt-1">
          <div
            className={`
              w-2.5 h-2.5 rounded-full
              ${isUnread ? 'bg-blue-500' : 'bg-transparent'}
            `}
          />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          {/* Ligne 1 : Expéditeur + Date */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <span
              className={`
                text-sm truncate
                ${isUnread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}
              `}
            >
              {email.senderName}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
              <Clock className="w-3 h-3" />
              {formatRelativeDate(email.receivedAt)}
            </span>
          </div>

          {/* Ligne 2 : Sujet */}
          <h3
            className={`
              text-sm truncate mb-1
              ${isUnread ? 'font-medium text-slate-900' : 'text-slate-700'}
            `}
          >
            {email.subject}
          </h3>

          {/* Ligne 3 : Aperçu */}
          <p className="text-sm text-slate-500 truncate mb-2">
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
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Paperclip className="w-3 h-3" />
                {email.attachments?.length || 1}
              </span>
            )}

            {/* Score de confiance IA */}
            {email.aiConfidence && (
              <span className="text-xs text-slate-400">
                IA: {email.aiConfidence}%
              </span>
            )}
          </div>
        </div>

        {/* Icône email */}
        <div className="text-slate-300">
          <Mail className="w-5 h-5" />
        </div>
      </div>
    </article>
  )
}
