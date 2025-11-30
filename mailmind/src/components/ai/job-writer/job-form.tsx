/**
 * =============================================================================
 * COMPOSANT AI - JOB FORM
 * =============================================================================
 *
 * Formulaire pour créer une offre d'emploi.
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui'
import { JobPostingInput } from '@/types'
import { Sparkles, FileText, Plus, X } from 'lucide-react'

interface JobFormProps {
  onGenerate: (input: JobPostingInput) => void
  isLoading: boolean
}

const CONTRACT_TYPES = [
  { value: 'cdi', label: 'CDI' },
  { value: 'cdd', label: 'CDD' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'stage', label: 'Stage' },
  { value: 'alternance', label: 'Alternance' },
]

const REMOTE_OPTIONS = [
  { value: 'full', label: 'Full remote' },
  { value: 'hybrid', label: 'Hybride' },
  { value: 'none', label: 'Sur site' },
]

const EXPERIENCE_LEVELS = [
  { value: 'junior', label: 'Junior (0-2 ans)' },
  { value: 'mid', label: 'Confirmé (2-5 ans)' },
  { value: 'senior', label: 'Senior (5+ ans)' },
  { value: 'lead', label: 'Lead / Manager' },
]

export function JobForm({ onGenerate, isLoading }: JobFormProps) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [contractType, setContractType] = useState<JobPostingInput['contractType']>('cdi')
  const [remote, setRemote] = useState<JobPostingInput['remote']>('hybrid')
  const [experienceLevel, setExperienceLevel] = useState<JobPostingInput['experienceLevel']>('mid')
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate({
      title,
      company: company || undefined,
      location: location || undefined,
      contractType,
      remote,
      experienceLevel,
      skills: skills.length > 0 ? skills : undefined,
      salary: salary || undefined,
      description: description || undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
          Détails de l'offre
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre du poste */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Titre du poste <span className="text-[var(--error)]">*</span>
            </label>
            <Input
              placeholder="Ex: Développeur Full Stack React/Node.js"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Entreprise et localisation */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Entreprise
              </label>
              <Input
                placeholder="Ex: MailMind"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Localisation
              </label>
              <Input
                placeholder="Ex: Paris, France"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Type de contrat */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Type de contrat
            </label>
            <div className="flex flex-wrap gap-2">
              {CONTRACT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setContractType(type.value as JobPostingInput['contractType'])}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${contractType === type.value
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--surface-default)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)]'
                    }
                  `}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Télétravail */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Télétravail
            </label>
            <div className="flex flex-wrap gap-2">
              {REMOTE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRemote(option.value as JobPostingInput['remote'])}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${remote === option.value
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--surface-default)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)]'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Niveau d'expérience */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Niveau d'expérience
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setExperienceLevel(level.value as JobPostingInput['experienceLevel'])}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${experienceLevel === level.value
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--surface-default)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)]'
                    }
                  `}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Compétences clés
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: React, TypeScript..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Salaire */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Fourchette salariale
              <span className="text-[var(--text-tertiary)] font-normal ml-1">(optionnel)</span>
            </label>
            <Input
              placeholder="Ex: 45-55K€ / an"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          {/* Description additionnelle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Description additionnelle
              <span className="text-[var(--text-tertiary)] font-normal ml-1">(optionnel)</span>
            </label>
            <Textarea
              placeholder="Ajoutez des informations spécifiques sur le poste, l'équipe, les avantages..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Bouton de génération */}
          <Button type="submit" className="w-full" disabled={isLoading || !title}>
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? 'Génération en cours...' : 'Générer l\'offre'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
