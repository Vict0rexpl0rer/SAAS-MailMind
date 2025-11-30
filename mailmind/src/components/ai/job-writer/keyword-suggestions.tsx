/**
 * =============================================================================
 * COMPOSANT AI - KEYWORD SUGGESTIONS
 * =============================================================================
 *
 * Affiche les mots-clés SEO suggérés pour l'offre d'emploi.
 *
 * =============================================================================
 */

'use client'

import { Badge } from '@/components/ui'
import { Search, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface KeywordSuggestionsProps {
  keywords: string[]
}

export function KeywordSuggestions({ keywords }: KeywordSuggestionsProps) {
  const [copied, setCopied] = useState(false)

  if (!keywords || keywords.length === 0) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(keywords.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">Mots-clés SEO</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[var(--success)]" />
              Copié
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copier
            </>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge key={index} variant="purple">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  )
}
