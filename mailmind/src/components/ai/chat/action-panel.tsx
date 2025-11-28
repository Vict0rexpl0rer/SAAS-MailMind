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
      <div className="bg-pink-100/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-pink-200/30 border border-pink-200/50">
        {/* Titre */}
        {panel.title && (
          <h3 className="text-base font-semibold text-slate-800 mb-3">
            {panel.title}
          </h3>
        )}

        {/* Question */}
        {panel.question && (
          <p className="text-sm text-slate-600 mb-4">
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
                    ? 'bg-pink-300 hover:bg-pink-400 text-pink-900 shadow-md shadow-pink-300/30'
                    : 'bg-white hover:bg-pink-50 text-pink-700 border border-pink-200'
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
                  w-full px-4 py-2.5 rounded-xl text-sm text-slate-700
                  bg-white/60 hover:bg-white border border-pink-200/50
                  transition-all duration-200 text-left
                  hover:shadow-md hover:shadow-pink-100/50
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
