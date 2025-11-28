/**
 * =============================================================================
 * COMPOSANT AI - EMAIL GENERATOR FORM
 * =============================================================================
 *
 * Formulaire pour configurer et générer un email.
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui'
import { ToneSelector } from './tone-selector'
import { EmailTone, EmailType, GeneratedEmail } from '@/types'
import { emailTemplates, typeLabels } from '@/data/email-templates'
import { Sparkles, Mail } from 'lucide-react'

interface EmailGeneratorFormProps {
  onGenerate: (email: GeneratedEmail) => void
  isLoading: boolean
}

export function EmailGeneratorForm({ onGenerate, isLoading }: EmailGeneratorFormProps) {
  const [emailType, setEmailType] = useState<EmailType>('acceptance')
  const [tone, setTone] = useState<EmailTone>('professional')
  const [candidateName, setCandidateName] = useState('')
  const [position, setPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')

  const selectedTemplate = emailTemplates.find((t) => t.type === emailType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Appeler la fonction de génération parente
    onGenerate({
      subject: '',
      body: '',
      tone,
      type: emailType,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Configurer l'email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
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
  )
}

// Export des données du formulaire pour utilisation dans la page
export function useEmailFormData() {
  const [emailType, setEmailType] = useState<EmailType>('acceptance')
  const [tone, setTone] = useState<EmailTone>('professional')
  const [candidateName, setCandidateName] = useState('')
  const [position, setPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')

  return {
    emailType,
    setEmailType,
    tone,
    setTone,
    candidateName,
    setCandidateName,
    position,
    setPosition,
    companyName,
    setCompanyName,
    customInstructions,
    setCustomInstructions,
  }
}
