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
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 text-red-600">
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
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center animate-pulse">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Rédaction en cours...</p>
              <p className="text-xs text-slate-400 mt-1">L'IA génère votre email</p>
            </div>
            <div className="w-full space-y-3 mt-4">
              <div className="h-6 bg-slate-200 rounded animate-pulse w-2/3" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
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
          <div className="flex flex-col items-center gap-3 text-slate-400">
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
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="font-medium text-slate-900">Email généré</span>
        </div>

        {/* Objet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-600">Objet</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(email.subject, 'subject')}
            >
              {copiedField === 'subject' ? (
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
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-sm text-slate-900 font-medium">{email.subject}</p>
          </div>
        </div>

        {/* Corps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-600">Corps de l'email</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(email.body, 'body')}
            >
              {copiedField === 'body' ? (
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
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-h-[400px] overflow-y-auto">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
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
