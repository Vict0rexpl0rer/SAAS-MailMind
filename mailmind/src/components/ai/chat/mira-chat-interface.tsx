/**
 * =============================================================================
 * COMPOSANT AI - MIRA CHAT INTERFACE
 * =============================================================================
 *
 * Interface de chat pleine page avec barre d'input fixe en bas.
 * Design intégré au design system MailMind (Linear/Notion style).
 *
 * =============================================================================
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { MiraChatMessage } from './mira-chat-message'
import { MiraChatInput } from './mira-chat-input'
import { ChatMessage as ChatMessageType } from '@/types'
import { getActiveAPIKey } from '@/lib/ai'
import { Sparkles } from 'lucide-react'

// Réponses de test simulées quand pas d'API
const TEST_RESPONSES = [
  "Je comprends votre demande. En tant qu'assistant MIRA, je suis là pour vous aider dans vos tâches de recrutement. Que souhaitez-vous faire aujourd'hui ?",
  "Excellente question ! Je peux vous aider à rédiger des emails professionnels, analyser des candidatures, ou organiser votre pipeline de recrutement.",
  "Bien sûr ! Pour cette tâche, je vous suggère de commencer par définir clairement vos critères. Voulez-vous que je vous guide pas à pas ?",
  "J'ai bien noté votre demande. Voici ce que je propose : nous pourrions d'abord examiner les profils existants, puis créer une stratégie de contact personnalisée.",
  "C'est une approche intéressante. Je peux vous aider à automatiser ce processus pour gagner du temps. Par où souhaitez-vous commencer ?",
]

export function MiraChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTestMode, setIsTestMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  // Vérifier si une clé API est configurée
  useEffect(() => {
    const apiConfig = getActiveAPIKey()
    setIsTestMode(!apiConfig)
  }, [])

  // Scroll vers le bas quand un nouveau message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (content: string) => {
    setShowWelcome(false)

    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Mode test : simuler une réponse après un délai
    if (isTestMode) {
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

      const randomResponse = TEST_RESPONSES[Math.floor(Math.random() * TEST_RESPONSES.length)]
      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
      return
    }

    // Mode normal avec API
    try {
      const apiConfig = getActiveAPIKey()
      if (!apiConfig) {
        throw new Error('Pas de clé API configurée')
      }

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

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
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

  return (
    <div className="relative flex flex-col h-full bg-[var(--bg-secondary)]">
      {/* Header avec titre MIRA */}
      <div className="sticky top-0 z-20 bg-[var(--bg-secondary)] border-b border-[var(--border-default)] px-6 py-4">
        <h1
          className="text-4xl text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-notable), sans-serif' }}
        >
          MIRA
        </h1>
      </div>

      {/* Zone des messages - scrollable avec padding pour la barre fixe */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Message de bienvenue */}
          {showWelcome && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              {/* Logo MIRA */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                {/* Effet de lueur subtil */}
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-blue-500 blur-xl opacity-30 animate-pulse" />
              </div>

              <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Comment puis-je vous aider ?
              </h1>
              <p className="text-[var(--text-secondary)] max-w-md mb-6 text-sm">
                Je suis MIRA, votre assistant IA pour le recrutement.
              </p>

              {/* Mode test badge */}
              {isTestMode && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--warning-subtle)] text-[var(--warning)] text-xs font-medium mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
                  Mode démo
                </div>
              )}

              {/* Suggestions de démarrage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {[
                  "Aide-moi à rédiger un email de relance",
                  "Analyse ce profil de candidat",
                  "Crée une offre d'emploi",
                  "Résume mes emails non lus",
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-3 text-left text-sm text-[var(--text-secondary)] bg-[var(--surface-default)] hover:bg-[var(--surface-hover)] border border-[var(--border-default)] rounded-xl transition-all duration-200 hover:border-blue-500/30 hover:text-[var(--text-primary)]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Liste des messages */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MiraChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}

            {/* Indicateur de chargement */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Zone de saisie fixe en bas */}
      <div className="fixed bottom-0 right-0 left-[96px] bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-transparent pt-6 pb-4 px-4 z-30">
        <div className="max-w-3xl mx-auto">
          <MiraChatInput onSend={handleSend} isLoading={isLoading} />
          <p className="text-xs text-center text-[var(--text-tertiary)] mt-2">
            MIRA peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  )
}
