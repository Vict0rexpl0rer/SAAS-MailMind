/**
 * =============================================================================
 * COMPOSANT AI - CHAT CONTAINER (Style MIRA)
 * =============================================================================
 *
 * Container principal du chat avec l'assistant IA.
 * Layout en 2 colonnes : messages à gauche, panneau d'actions à droite.
 *
 * =============================================================================
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { ActionPanel } from './action-panel'
import { ChatMessage as ChatMessageType, ActionPanel as ActionPanelType, QuickReply, PanelAction } from '@/types'
import { getActiveAPIKey } from '@/lib/ai'
import { Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ChatContainerProps {
  onAction?: (action: string) => void
}

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: `Bonjour ! Je suis MIRA, votre assistant IA MailMind.

Je peux vous aider à :
• Gérer vos emails et candidatures
• Rédiger des réponses professionnelles
• Analyser des profils de candidats
• Organiser votre processus de recrutement

Comment puis-je vous aider aujourd'hui ?`,
  timestamp: new Date(),
}

export function ChatContainer({ onAction }: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [hasAPIKey, setHasAPIKey] = useState<boolean | null>(null)
  const [currentPanel, setCurrentPanel] = useState<ActionPanelType | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Vérifier si une clé API est configurée
  useEffect(() => {
    const apiConfig = getActiveAPIKey()
    setHasAPIKey(!!apiConfig)
  }, [])

  // Scroll vers le bas quand un nouveau message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Parser le panneau d'actions depuis la réponse de l'IA
  const parseActionPanel = (content: string): { cleanContent: string; panel: ActionPanelType | null } => {
    const panelMatch = content.match(/\[ACTION_PANEL\]([\s\S]*?)\[\/ACTION_PANEL\]/)

    if (!panelMatch) {
      return { cleanContent: content, panel: null }
    }

    const cleanContent = content.replace(/\[ACTION_PANEL\][\s\S]*?\[\/ACTION_PANEL\]/, '').trim()

    try {
      const panelData = JSON.parse(panelMatch[1].trim())
      return {
        cleanContent,
        panel: {
          visible: true,
          title: panelData.title,
          question: panelData.question,
          quickReplies: panelData.quickReplies,
          suggestedActions: panelData.suggestedActions,
        },
      }
    } catch {
      return { cleanContent: content, panel: null }
    }
  }

  const handleSend = async (content: string) => {
    const apiConfig = getActiveAPIKey()
    if (!apiConfig) {
      setHasAPIKey(false)
      return
    }

    // Masquer le panneau précédent
    setCurrentPanel(null)

    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          provider: apiConfig.provider,
          apiKey: apiConfig.apiKey,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la génération')
      }

      // Parser le contenu et le panneau d'actions
      const { cleanContent, panel } = parseActionPanel(data.message.content)

      // Ajouter la réponse de l'assistant
      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: cleanContent,
        timestamp: new Date(),
        actionPanel: panel || undefined,
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Afficher le panneau si présent
      if (panel) {
        setCurrentPanel(panel)
      }
    } catch (error) {
      console.error('Erreur chat:', error)
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply: QuickReply) => {
    handleSend(reply.value)
  }

  const handlePanelAction = (action: PanelAction) => {
    handleSend(action.label)
    onAction?.(action.action)
  }

  return (
    <div className="flex h-full gap-4">
      {/* Colonne principale : Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Zone des messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Alerte si pas de clé API */}
          {hasAPIKey === false && (
            <div className="bg-[var(--warning)]/10 backdrop-blur-sm border border-[var(--warning)]/30 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Clé API non configurée
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Pour utiliser l'assistant, configurez une clé API dans les{' '}
                    <Link href="/dashboard/settings" className="underline font-medium text-[var(--accent-primary)]">
                      paramètres
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Liste des messages */}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[var(--accent-primary)] animate-pulse" />
              </div>
              <div className="bg-[var(--bg-elevated)] backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[var(--border-default)]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-[var(--accent-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[var(--accent-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[var(--accent-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="p-4">
          <ChatInput
            onSend={handleSend}
            isLoading={isLoading}
            disabled={hasAPIKey === false}
          />
        </div>
      </div>

      {/* Colonne droite : Panneau d'actions (conditionnel) */}
      <ActionPanel
        panel={currentPanel}
        onQuickReply={handleQuickReply}
        onAction={handlePanelAction}
      />
    </div>
  )
}
