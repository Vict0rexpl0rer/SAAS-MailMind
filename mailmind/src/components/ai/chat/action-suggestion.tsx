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
  send_email: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
  create_task: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
  schedule_followup: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
  view_candidate: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
  view_email: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
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
