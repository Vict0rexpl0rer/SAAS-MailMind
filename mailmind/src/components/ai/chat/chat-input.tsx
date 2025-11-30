/**
 * =============================================================================
 * COMPOSANT AI - CHAT INPUT (Style MIRA)
 * =============================================================================
 *
 * Zone de saisie pour le chat avec l'assistant.
 * Inclut des icônes visuelles (pièce jointe, paramètres, micro).
 *
 * =============================================================================
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Paperclip, Settings, Mic } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-3 bg-[var(--bg-elevated)] backdrop-blur-sm rounded-2xl border border-[var(--border-default)] p-3 shadow-lg dark:shadow-black/20">
        {/* Icônes à gauche */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            title="Pièce jointe (bientôt disponible)"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            title="Paramètres (bientôt disponible)"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Zone de texte */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Configurez une clé API pour utiliser l'assistant" : "Comment puis-je vous aider aujourd'hui?"}
          disabled={disabled || isLoading}
          rows={1}
          className="flex-1 resize-none border-0 bg-transparent py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Icônes à droite */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            title="Dictée vocale (bientôt disponible)"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            className="
              p-2.5 rounded-xl
              bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]
              text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              shadow-md dark:shadow-black/30
            "
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
