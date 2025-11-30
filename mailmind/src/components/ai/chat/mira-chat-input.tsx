/**
 * =============================================================================
 * COMPOSANT AI - MIRA CHAT INPUT
 * =============================================================================
 *
 * Barre de saisie avec effet de lueur bleue pulsante.
 * Design intégré au design system MailMind.
 *
 * =============================================================================
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Loader2, Paperclip, Mic } from 'lucide-react'

interface MiraChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export function MiraChatInput({ onSend, isLoading }: MiraChatInputProps) {
  const [message, setMessage] = useState('')
  const [boxShadowPosition, setBoxShadowPosition] = useState(0)
  const [isMicActive, setIsMicActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Animation de l'ombre pulsante
  useEffect(() => {
    const interval = setInterval(() => {
      setBoxShadowPosition((prev) => (prev + 0.25) % 200)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
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

  // Calcul de l'ombre animée - lueur bleue
  const glowRadius = 6 + Math.sin(boxShadowPosition / 10) * 6
  const glowOpacity = 0.3 + Math.abs(Math.sin(boxShadowPosition / 10)) * 0.5

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      {/* Container principal avec effet de lueur bleue */}
      <div
        className="relative w-full max-w-[600px] bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl overflow-hidden"
        style={{
          boxShadow: `0 0 ${glowRadius}px rgba(59, 130, 246, ${glowOpacity}), 0 0 ${glowRadius * 2}px rgba(59, 130, 246, ${glowOpacity * 0.3})`,
        }}
      >
        {/* Zone de saisie principale */}
        <div className="flex flex-col">
          {/* Input text - sans bordure au focus */}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question à MIRA..."
            disabled={isLoading}
            className="w-full bg-transparent px-4 pt-4 pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-sm outline-none border-none ring-0 focus:outline-none focus:border-none focus:ring-0"
            style={{ fontSize: '16px' }}
          />

          {/* Barre d'actions en bas */}
          <div className="flex items-center justify-between px-3 pb-3">
            {/* Boutons gauche */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                title="Joindre un fichier"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMicActive(!isMicActive)}
                className={`p-2 rounded-lg transition-colors ${
                  isMicActive
                    ? 'text-blue-500 bg-blue-500/10'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                }`}
                title="Microphone"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Bouton d'envoi */}
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                transition-all duration-200 outline-none focus:outline-none
                ${message.trim() && !isLoading
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-[var(--surface-hover)] text-[var(--text-disabled)] cursor-not-allowed'
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
