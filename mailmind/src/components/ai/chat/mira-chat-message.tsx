/**
 * =============================================================================
 * COMPOSANT AI - MIRA CHAT MESSAGE (Style ChatGPT)
 * =============================================================================
 *
 * Affiche un message dans le chat avec animations d'apparition.
 * Design minimaliste inspiré de ChatGPT.
 *
 * =============================================================================
 */

'use client'

import { ChatMessage as ChatMessageType } from '@/types'
import { User, Sparkles, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState, useEffect } from 'react'

interface MiraChatMessageProps {
  message: ChatMessageType
  isLatest?: boolean
}

export function MiraChatMessage({ message, isLatest }: MiraChatMessageProps) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Animation d'apparition
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Effet de typing pour les messages assistant
  useEffect(() => {
    if (!isUser && isLatest && message.content) {
      setIsTyping(true)
      setDisplayedText('')

      let index = 0
      const text = message.content
      const speed = 15 // ms par caractère

      const typeNextChar = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
          setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
        }
      }

      // Petit délai avant de commencer
      setTimeout(typeNextChar, 100)
    } else {
      setDisplayedText(message.content)
    }
  }, [message.content, isUser, isLatest])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`
        flex gap-4 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isUser ? 'flex-row-reverse' : ''}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
          ${isUser
            ? 'bg-[var(--accent-primary)]'
            : 'bg-gradient-to-br from-[var(--accent-primary)] to-purple-600'
          }
        `}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Contenu du message */}
      <div className={`flex-1 min-w-0 ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`
            ${isUser
              ? 'inline-block bg-[var(--accent-primary)] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]'
              : 'text-[var(--text-primary)]'
            }
          `}
        >
          {/* Texte du message */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 bg-[var(--accent-primary)] ml-0.5 animate-pulse" />
            )}
          </div>

          {/* Actions pour les messages de l'assistant */}
          {!isUser && !isTyping && (
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                title="Copier"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[var(--success)]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                title="Utile"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                title="Pas utile"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp pour les messages utilisateur */}
        {isUser && (
          <div className="text-xs text-[var(--text-tertiary)] mt-1 text-right">
            {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  )
}
