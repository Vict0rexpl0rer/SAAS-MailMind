/**
 * =============================================================================
 * COMPOSANT AI - ACTION SUGGESTION
 * =============================================================================
 *
 * Affiche les actions suggérées par l'assistant.
 *
 * =============================================================================
 */

'use client'

import { SuggestedAction } from '@/types'
import { Mail, CheckSquare, Clock, User, FileText } from 'lucide-react'

interface ActionSuggestionProps {
  actions: SuggestedAction[]
  onAction?: (action: SuggestedAction) => void
}

const ACTION_ICONS = {
  send_email: Mail,
  create_task: CheckSquare,
  schedule_followup: Clock,
  view_candidate: User,
  view_email: FileText,
}

const ACTION_COLORS = {
  send_email: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30 hover:bg-[var(--success)]/20',
  create_task: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/20',
  schedule_followup: 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/30 hover:bg-[var(--warning)]/20',
  view_candidate: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
  view_email: 'bg-[var(--surface-default)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--surface-hover)]',
}

export function ActionSuggestion({ actions, onAction }: ActionSuggestionProps) {
  if (!actions || actions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3 ml-11">
      {actions.map((action) => {
        const Icon = ACTION_ICONS[action.type] || FileText
        const colors = ACTION_COLORS[action.type] || ACTION_COLORS.view_email

        return (
          <button
            key={action.id}
            onClick={() => onAction?.(action)}
            className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
              border transition-colors duration-200
              ${colors}
            `}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </button>
        )
      })}
    </div>
  )
}
