/**
 * =============================================================================
 * PAGE - RÉDACTEUR D'OFFRES D'EMPLOI
 * =============================================================================
 *
 * Génère des offres d'emploi attractives et optimisées SEO.
 *
 * URL: /dashboard/ia/job-writer
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import { JobForm, JobPreview } from '@/components/ai/job-writer'
import { JobPostingInput, GeneratedJobPosting } from '@/types'
import { getActiveAPIKey } from '@/lib/ai'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function JobWriterPage() {
  const [generatedPosting, setGeneratedPosting] = useState<GeneratedJobPosting | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleGenerate = async (input: JobPostingInput) => {
    const apiConfig = getActiveAPIKey()
    if (!apiConfig) {
      setError('Aucune clé API configurée. Rendez-vous dans les paramètres pour en ajouter une.')
      return
    }

    setIsLoading(true)
    setError(undefined)

    try {
      const response = await fetch('/api/ai/generate-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...input,
          provider: apiConfig.provider,
          apiKey: apiConfig.apiKey,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Une erreur est survenue')
        return
      }

      setGeneratedPosting(data.posting)
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
        title="Rédacteur d'Offres"
        subtitle="Générez des offres d'emploi attractives et optimisées SEO"
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
            {/* Colonne gauche : Formulaire */}
            <JobForm onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Colonne droite : Aperçu */}
            <JobPreview
              posting={generatedPosting}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
