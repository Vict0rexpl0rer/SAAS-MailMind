/**
 * =============================================================================
 * PAGE - HUB OUTILS IA
 * =============================================================================
 *
 * Page principale listant tous les outils IA disponibles.
 *
 * URL: /dashboard/ia
 *
 * =============================================================================
 */

'use client'

import { Header } from '@/components/layout'
import { AIToolCard } from '@/components/ai'
import { Card, CardContent } from '@/components/ui'
import { AITool } from '@/types'
import { Sparkles, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { hasAPIKey } from '@/lib/ai'
import Link from 'next/link'

/**
 * Liste des outils IA disponibles
 */
const AI_TOOLS: AITool[] = [
  {
    id: 'assistant',
    name: 'Assistant IA',
    description: 'Discutez avec l\'IA pour obtenir de l\'aide sur vos tâches de recrutement',
    icon: 'message-square',
    href: '/dashboard/ia/assistant',
    color: 'blue',
    status: 'available',
  },
  {
    id: 'email-generator',
    name: 'Générateur d\'Emails',
    description: 'Créez des emails professionnels pour vos candidats en quelques clics',
    icon: 'mail',
    href: '/dashboard/ia/email-generator',
    color: 'green',
    status: 'available',
  },
  {
    id: 'job-writer',
    name: 'Rédacteur d\'Offres',
    description: 'Générez des offres d\'emploi attractives et optimisées SEO',
    icon: 'file-text',
    href: '/dashboard/ia/job-writer',
    color: 'purple',
    status: 'available',
  },
  {
    id: 'email-summarizer',
    name: 'Résumeur d\'Emails',
    description: 'Obtenez un résumé rapide de vos emails reçus',
    icon: 'sparkles',
    href: '/dashboard/ia/email-summarizer',
    color: 'orange',
    status: 'available',
  },
]

export default function IAHubPage() {
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    setApiKeyConfigured(hasAPIKey())
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Outils IA"
        subtitle="Boostez votre recrutement avec l'intelligence artificielle"
      />

      <div className="flex-1 overflow-auto p-6 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Alerte si pas de clé API */}
          {apiKeyConfigured === false && (
            <Card className="border-[var(--warning)]/30 bg-[var(--warning-subtle)]">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      Clé API non configurée
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Pour utiliser les outils IA, vous devez configurer une clé API OpenAI ou Mistral dans les{' '}
                      <Link href="/dashboard/settings" className="underline font-medium text-[var(--accent-primary)]">
                        paramètres
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Introduction */}
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 mb-4">
              <Sparkles className="w-8 h-8 text-[var(--accent-primary)]" />
            </div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Vos outils IA
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Sélectionnez un outil pour commencer. L'IA vous assistera dans vos tâches quotidiennes de recrutement.
            </p>
          </div>

          {/* Grille des outils */}
          <div className="grid gap-4 md:grid-cols-2">
            {AI_TOOLS.map((tool) => (
              <AIToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Footer info */}
          <p className="text-center text-sm text-[var(--text-tertiary)] pt-4">
            Propulsé par OpenAI & Mistral AI
          </p>
        </div>
      </div>
    </div>
  )
}
