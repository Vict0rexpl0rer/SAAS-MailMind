/**
 * =============================================================================
 * PAGE - GÉNÉRATEUR D'EMAILS
 * =============================================================================
 *
 * Génère des emails professionnels pour les candidats.
 *
 * URL: /dashboard/ia/email-generator
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui'
import { ToneSelector, EmailPreview } from '@/components/ai/email-generator'
import { EmailTone, EmailType, GeneratedEmail } from '@/types'
import { emailTemplates, typeLabels } from '@/data/email-templates'
import { getActiveAPIKey } from '@/lib/ai'
import { ArrowLeft, Sparkles, Mail } from 'lucide-react'
import Link from 'next/link'

export default function EmailGeneratorPage() {
  const [emailType, setEmailType] = useState<EmailType>('acceptance')
  const [tone, setTone] = useState<EmailTone>('professional')
  const [candidateName, setCandidateName] = useState('')
  const [position, setPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')

  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const selectedTemplate = emailTemplates.find((t) => t.type === emailType)

  const handleGenerate = async () => {
    const apiConfig = getActiveAPIKey()
    if (!apiConfig) {
      setError('Aucune clé API configurée. Rendez-vous dans les paramètres pour en ajouter une.')
      return
    }

    setIsLoading(true)
    setError(undefined)

    try {
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: emailType,
          tone,
          candidateName: candidateName || undefined,
          position: position || undefined,
          companyName: companyName || undefined,
          customInstructions: customInstructions || undefined,
          provider: apiConfig.provider,
          apiKey: apiConfig.apiKey,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Une erreur est survenue')
        return
      }

      setGeneratedEmail(data.email)
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
        title="Générateur d'Emails"
        subtitle="Créez des emails professionnels en quelques clics"
      />

      <div className="flex-1 overflow-auto p-6 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          {/* Retour */}
          <Link
            href="/dashboard/ia"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux outils IA
          </Link>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Colonne gauche : Formulaire */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Configurer l'email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-5">
                  {/* Type d'email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Type d'email
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {emailTemplates.map((template) => (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() => {
                            setEmailType(template.type)
                            setTone(template.defaultTone)
                          }}
                          className={`
                            px-3 py-2 rounded-xl text-sm text-left transition-all duration-200
                            ${emailType === template.type
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-300/50'
                              : 'bg-white text-slate-700 border border-blue-200 hover:bg-blue-50'
                            }
                          `}
                        >
                          <span className="font-medium">{typeLabels[template.type]}</span>
                        </button>
                      ))}
                    </div>
                    {selectedTemplate && (
                      <p className="text-xs text-slate-400">{selectedTemplate.description}</p>
                    )}
                  </div>

                  {/* Ton */}
                  <ToneSelector value={tone} onChange={setTone} />

                  {/* Nom du candidat */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Nom du candidat
                    </label>
                    <Input
                      placeholder="Ex: Marie Dupont"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                    />
                  </div>

                  {/* Poste */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Poste concerné
                    </label>
                    <Input
                      placeholder="Ex: Développeur Full Stack"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>

                  {/* Nom de l'entreprise */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Nom de l'entreprise
                      <span className="text-slate-400 font-normal ml-1">(optionnel)</span>
                    </label>
                    <Input
                      placeholder="Ex: MailMind"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  {/* Instructions personnalisées */}
                  {emailType === 'custom' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Instructions personnalisées
                      </label>
                      <Textarea
                        placeholder="Décrivez le contenu de l'email que vous souhaitez générer..."
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        rows={4}
                      />
                    </div>
                  )}

                  {/* Bouton de génération */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isLoading ? 'Génération en cours...' : 'Générer l\'email'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Colonne droite : Aperçu */}
            <EmailPreview
              email={generatedEmail}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
