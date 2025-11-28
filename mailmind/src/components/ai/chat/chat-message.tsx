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
            ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-purple-300/30'
            : 'bg-pink-200 shadow-md shadow-pink-200/30'
          }
        `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-pink-600" />
        )}
      </div>

      {/* Bulle de message */}
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-3
          ${isUser
            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-tr-sm shadow-md shadow-purple-300/30'
            : 'bg-white/80 backdrop-blur-sm border border-pink-100 text-slate-700 rounded-tl-sm shadow-sm'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
        <span
          className={`text-xs mt-2 block ${isUser ? 'text-purple-200' : 'text-slate-400'}`}
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
