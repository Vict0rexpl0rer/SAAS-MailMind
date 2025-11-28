/**
 * =============================================================================
 * COMPOSANT AI - SUMMARY DISPLAY
 * =============================================================================
 *
 * Affiche le résumé généré par l'IA pour un email.
 *
 * =============================================================================
 */

'use client'

import { Card, CardContent, Badge } from '@/components/ui'
import { EmailSummary, Sentiment } from '@/types'
import { Sparkles, CheckCircle, AlertCircle, MinusCircle, Lightbulb } from 'lucide-react'

interface SummaryDisplayProps {
  summary: EmailSummary | null
  isLoading: boolean
  error?: string
}

const SENTIMENT_CONFIG: Record<Sentiment, { icon: typeof CheckCircle; label: string; color: string }> = {
  positive: {
    icon: CheckCircle,
    label: 'Positif',
    color: 'text-green-600 bg-green-100',
  },
  neutral: {
    icon: MinusCircle,
    label: 'Neutre',
    color: 'text-slate-600 bg-slate-100',
  },
  negative: {
    icon: AlertCircle,
    label: 'Négatif',
    color: 'text-red-600 bg-red-100',
  },
}

export function SummaryDisplay({ summary, isLoading, error }: SummaryDisplayProps) {
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
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Analyse en cours...</p>
              <p className="text-xs text-slate-400 mt-1">L'IA résume votre email</p>
            </div>
            {/* Skeleton */}
            <div className="w-full space-y-3 mt-4">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Sparkles className="w-8 h-8" />
            <p className="text-sm text-center">
              Sélectionnez un email pour obtenir<br />un résumé généré par l'IA
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const sentimentConfig = SENTIMENT_CONFIG[summary.sentiment]
  const SentimentIcon = sentimentConfig.icon

  return (
    <Card>
      <CardContent className="py-6 space-y-5">
        {/* En-tête avec sentiment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-slate-900">Résumé IA</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${sentimentConfig.color}`}>
            <SentimentIcon className="w-4 h-4" />
            <span className="font-medium">{sentimentConfig.label}</span>
          </div>
        </div>

        {/* Résumé principal */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            {summary.summary}
          </p>
        </div>

        {/* Points clés */}
        {summary.keyPoints && summary.keyPoints.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">Points clés</h4>
            <ul className="space-y-2">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                    {index + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions suggérées */}
        {summary.suggestedActions && summary.suggestedActions.length > 0 && (
          <div className="border-t border-blue-100 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-medium text-slate-900">Actions suggérées</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.suggestedActions.map((action, index) => (
                <Badge key={index} variant="info">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
