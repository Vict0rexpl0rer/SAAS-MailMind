/**
 * =============================================================================
 * COMPOSANT AI - EMAIL PREVIEW
 * =============================================================================
 *
 * Affiche l'aperçu de l'email généré avec options de copie.
 *
 * =============================================================================
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, Button } from '@/components/ui'
import { GeneratedEmail } from '@/types'
import { Copy, Check, Mail, Sparkles } from 'lucide-react'

interface EmailPreviewProps {
  email: GeneratedEmail | null
  isLoading: boolean
  error?: string
}

export function EmailPreview({ email, isLoading, error }: EmailPreviewProps) {
  const [copiedField, setCopiedField] = useState<'subject' | 'body' | null>(null)

  const handleCopy = async (text: string, field: 'subject' | 'body') => {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (error) {
    return (
      <Card className="border-[var(--error)]/30 bg-[var(--error-subtle)]">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 text-[var(--error)]">
            <Mail className="w-5 h-5" />
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
            <div className="w-12 h-12 rounded-xl bg-[var(--success-subtle)] flex items-center justify-center animate-pulse">
              <Mail className="w-6 h-6 text-[var(--success)]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--text-secondary)]">Rédaction en cours...</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">L'IA génère votre email</p>
            </div>
            <div className="w-full space-y-3 mt-4">
              <div className="h-6 bg-[var(--surface-hover)] rounded animate-pulse w-2/3" />
              <div className="h-4 bg-[var(--surface-hover)] rounded animate-pulse w-full" />
              <div className="h-4 bg-[var(--surface-hover)] rounded animate-pulse w-full" />
              <div className="h-4 bg-[var(--surface-hover)] rounded animate-pulse w-4/5" />
              <div className="h-4 bg-[var(--surface-hover)] rounded animate-pulse w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!email) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-3 text-[var(--text-tertiary)]">
            <Mail className="w-8 h-8" />
            <p className="text-sm text-center">
              Configurez les paramètres et cliquez<br />sur "Générer" pour créer votre email
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="py-6 space-y-4">
        {/* En-tête */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--success)]" />
          <span className="font-medium text-[var(--text-primary)]">Email généré</span>
        </div>

        {/* Objet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Objet</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(email.subject, 'subject')}
            >
              {copiedField === 'subject' ? (
                <>
                  <Check className="w-3 h-3 mr-1 text-[var(--success)]" />
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
          <div className="bg-[var(--surface-hover)] rounded-lg p-3 border border-[var(--border-default)]">
            <p className="text-sm text-[var(--text-primary)] font-medium">{email.subject}</p>
          </div>
        </div>

        {/* Corps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Corps de l'email</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(email.body, 'body')}
            >
              {copiedField === 'body' ? (
                <>
                  <Check className="w-3 h-3 mr-1 text-[var(--success)]" />
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
          <div className="bg-[var(--surface-hover)] rounded-lg p-4 border border-[var(--border-default)] max-h-[400px] overflow-y-auto">
            <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
              {email.body}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => handleCopy(`${email.subject}\n\n${email.body}`, 'body')}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copier tout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
