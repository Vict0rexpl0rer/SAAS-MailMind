/**
 * =============================================================================
 * COMPOSANT AI - ACTION PANEL (Style MIRA)
 * =============================================================================
 *
 * Panneau d'actions contextuel qui apparaît à droite du chat
 * quand l'IA détecte une question ou propose des actions.
 *
 * =============================================================================
 */

'use client'

import { ActionPanel as ActionPanelType, QuickReply, PanelAction } from '@/types'

interface ActionPanelProps {
  panel: ActionPanelType | null
  onQuickReply: (reply: QuickReply) => void
  onAction: (action: PanelAction) => void
}

export function ActionPanel({ panel, onQuickReply, onAction }: ActionPanelProps) {
  if (!panel || !panel.visible) return null

  return (
    <div className="w-80 flex-shrink-0 p-4">
      <div className="bg-[var(--surface-default)] backdrop-blur-sm rounded-2xl p-5 shadow-lg dark:shadow-black/30 border border-[var(--border-default)]">
        {/* Titre */}
        {panel.title && (
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
            {panel.title}
          </h3>
        )}

        {/* Question */}
        {panel.question && (
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            {panel.question}
          </p>
        )}

        {/* Quick Replies (Oui/Non) */}
        {panel.quickReplies && panel.quickReplies.length > 0 && (
          <div className="flex gap-2 mb-4">
            {panel.quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => onQuickReply(reply)}
                className={`
                  flex-1 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${reply.variant === 'primary'
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-md dark:shadow-black/30'
                    : 'bg-[var(--bg-elevated)] hover:bg-[var(--surface-hover)] text-[var(--accent-primary)] border border-[var(--border-default)]'
                  }
                `}
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}

        {/* Actions suggérées */}
        {panel.suggestedActions && panel.suggestedActions.length > 0 && (
          <div className="space-y-2">
            {panel.suggestedActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onAction(action)}
                className="
                  w-full px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)]
                  bg-[var(--bg-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-default)]
                  transition-all duration-200 text-left
                  hover:shadow-md dark:hover:shadow-black/20
                "
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
