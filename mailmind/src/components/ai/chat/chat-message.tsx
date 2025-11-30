/**
 * =============================================================================
 * COMPOSANT AI - CHAT MESSAGE (Style MIRA)
 * =============================================================================
 *
 * Affiche un message dans le chat (utilisateur ou assistant).
 * Design inspiré de MIRA avec bulles arrondies et thème rose/violet.
 *
 * =============================================================================
 */

'use client'

import { ChatMessage as ChatMessageType } from '@/types'
import { User, Sparkles } from 'lucide-react'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar rond */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
          ${isUser
            ? 'bg-[var(--accent-primary)] shadow-md dark:shadow-black/30'
            : 'bg-[var(--accent-primary)]/20 shadow-md dark:shadow-black/20'
          }
        `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
        )}
      </div>

      {/* Bulle de message */}
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-3
          ${isUser
            ? 'bg-[var(--accent-primary)] text-white rounded-tr-sm shadow-md dark:shadow-black/30'
            : 'bg-[var(--bg-elevated)] backdrop-blur-sm border border-[var(--border-default)] text-[var(--text-secondary)] rounded-tl-sm shadow-sm'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
        <span
          className={`text-xs mt-2 block ${isUser ? 'text-white/70' : 'text-[var(--text-tertiary)]'}`}
        >
          {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}
