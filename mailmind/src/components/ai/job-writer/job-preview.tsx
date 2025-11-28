/**
 * =============================================================================
 * COMPOSANT AI - JOB PREVIEW
 * =============================================================================
 *
 * Affiche l'aperçu de l'offre d'emploi générée.
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, Button } from '@/components/ui'
import { GeneratedJobPosting } from '@/types'
import { KeywordSuggestions } from './keyword-suggestions'
import { Copy, Check, FileText, Sparkles, AlertCircle } from 'lucide-react'

interface JobPreviewProps {
  posting: GeneratedJobPosting | null
  isLoading: boolean
  error?: string
}

export function JobPreview({ posting, isLoading, error }: JobPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!posting) return
    await navigator.clipboard.writeText(`# ${posting.title}\n\n${posting.content}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center animate-pulse">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Rédaction en cours...</p>
              <p className="text-xs text-slate-400 mt-1">L'IA génère votre offre d'emploi</p>
            </div>
            <div className="w-full space-y-3 mt-4">
              <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!posting) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <FileText className="w-8 h-8" />
            <p className="text-sm text-center">
              Remplissez les détails de l'offre<br />et cliquez sur "Générer"
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="py-6 space-y-5">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-slate-900">Offre générée</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1 text-green-600" />
                Copié
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copier
              </>
            )}
          </Button>
        </div>

        {/* Titre */}
        <div className="bg-purple-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-slate-900">{posting.title}</h3>
        </div>

        {/* Contenu */}
        <div className="bg-slate-50 rounded-xl p-4 max-h-[400px] overflow-y-auto">
          <div className="prose prose-sm prose-slate max-w-none">
            {posting.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h4 key={index} className="text-base font-semibold text-slate-900 mt-4 mb-2">
                    {paragraph.replace('## ', '')}
                  </h4>
                )
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={index} className="text-sm text-slate-700 ml-4">
                    {paragraph.replace('- ', '')}
                  </li>
                )
              }
              if (paragraph.trim() === '') {
                return <br key={index} />
              }
              return (
                <p key={index} className="text-sm text-slate-700 mb-2">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>

        {/* Mots-clés SEO */}
        <KeywordSuggestions keywords={posting.seoKeywords} />

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="secondary" className="flex-1" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copier l'offre complète
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
