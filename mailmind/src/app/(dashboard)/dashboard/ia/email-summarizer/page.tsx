/**
 * =============================================================================
 * PAGE - RÉSUMEUR D'EMAILS
 * =============================================================================
 *
 * Permet de sélectionner un email et d'obtenir un résumé généré par l'IA.
 *
 * URL: /dashboard/ia/email-summarizer
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { EmailSelector, SummaryDisplay } from '@/components/ai/email-summarizer'
import { Email, EmailSummary } from '@/types'
import { getActiveAPIKey } from '@/lib/ai'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function EmailSummarizerPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [summary, setSummary] = useState<EmailSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email)
    setSummary(null)
    setError(undefined)
  }

  const handleSummarize = async () => {
    if (!selectedEmail) return

    const apiConfig = getActiveAPIKey()
    if (!apiConfig) {
      setError('Aucune clé API configurée. Rendez-vous dans les paramètres pour en ajouter une.')
      return
    }

    setIsLoading(true)
    setError(undefined)

    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId: selectedEmail.id,
          emailSubject: selectedEmail.subject,
          emailContent: selectedEmail.preview, // Dans un vrai cas, on utiliserait le body complet
          provider: apiConfig.provider,
          apiKey: apiConfig.apiKey,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Une erreur est survenue')
        return
      }

      setSummary(data.summary)
    } catch (err) {
      setError('Impossible de contacter le serveur')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Résumeur d'Emails"
        subtitle="Obtenez un résumé rapide de vos emails"
      />

      <div className="flex-1 overflow-auto p-6 bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          {/* Retour */}
          <Link
            href="/dashboard/ia"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux outils IA
          </Link>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Colonne gauche : Sélection d'email */}
            <Card>
              <CardHeader>
                <CardTitle>Sélectionner un email</CardTitle>
              </CardHeader>
              <CardContent>
                <EmailSelector
                  onSelect={handleSelectEmail}
                  selectedId={selectedEmail?.id}
                />
              </CardContent>
            </Card>

            {/* Colonne droite : Résumé */}
            <div className="space-y-4">
              {/* Email sélectionné */}
              {selectedEmail && (
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {selectedEmail.subject}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          De : {selectedEmail.senderName}
                        </p>
                      </div>
                      <Button
                        onClick={handleSummarize}
                        disabled={isLoading}
                        size="sm"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isLoading ? 'Analyse...' : 'Résumer'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Affichage du résumé */}
              <SummaryDisplay
                summary={summary}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
