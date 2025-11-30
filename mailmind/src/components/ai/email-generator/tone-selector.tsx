/**
 * =============================================================================
 * COMPOSANT AI - TONE SELECTOR
 * =============================================================================
 *
 * Sélecteur de ton pour la génération d'emails.
 *
 * =============================================================================
 */

'use client'

import { EmailTone } from '@/types'
import { toneLabels } from '@/data/email-templates'

interface ToneSelectorProps {
  value: EmailTone
  onChange: (tone: EmailTone) => void
}

const TONES: { value: EmailTone; description: string }[] = [
  { value: 'formal', description: 'Vouvoiement, très professionnel' },
  { value: 'professional', description: 'Équilibré et accessible' },
  { value: 'friendly', description: 'Chaleureux mais professionnel' },
]

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--text-secondary)]">
        Ton de l'email
      </label>
      <div className="grid grid-cols-3 gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            className={`
              px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${value === tone.value
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--surface-default)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)]'
              }
            `}
          >
            {toneLabels[tone.value]}
          </button>
        ))}
      </div>
      <p className="text-xs text-[var(--text-tertiary)]">
        {TONES.find((t) => t.value === value)?.description}
      </p>
    </div>
  )
}
