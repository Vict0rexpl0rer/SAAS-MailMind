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
      <label className="block text-sm font-medium text-slate-700">
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
                ? 'bg-blue-600 text-white shadow-md shadow-blue-300/50'
                : 'bg-white text-slate-700 border border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            {toneLabels[tone.value]}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        {TONES.find((t) => t.value === value)?.description}
      </p>
    </div>
  )
}
