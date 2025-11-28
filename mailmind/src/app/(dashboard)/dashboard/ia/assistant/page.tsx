/**
 * =============================================================================
 * PAGE - ASSISTANT IA (Style MIRA)
 * =============================================================================
 *
 * Interface de chat avec l'assistant IA MIRA.
 * Design avec fond dégradé rose/violet et layout moderne.
 *
 * URL: /dashboard/ia/assistant
 *
 * =============================================================================
 */

'use client'

import { Header } from '@/components/layout'
import { ChatContainer } from '@/components/ai/chat'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AssistantPage() {
  const router = useRouter()

  const handleAction = (action: string) => {
    // Gérer les actions du panneau MIRA
    switch (action) {
      case 'send_email':
      case 'schedule_send':
        router.push('/dashboard/ia/email-generator')
        break
      case 'view_candidate':
        router.push('/dashboard/candidates')
        break
      case 'view_email':
        router.push('/dashboard/emails')
        break
      default:
        console.log('Action:', action)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Assistant MIRA"
        subtitle="Votre assistant de recrutement intelligent"
      />

      {/* Fond dégradé rose/violet style MIRA */}
      <div className="flex-1 overflow-hidden p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-violet-100">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          {/* Retour */}
          <Link
            href="/dashboard/ia"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux outils IA
          </Link>

          {/* Chat Container pleine largeur pour le layout 2 colonnes */}
          <div className="flex-1 min-h-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-pink-100/50 shadow-xl shadow-pink-200/20 overflow-hidden">
            <ChatContainer onAction={handleAction} />
          </div>
        </div>
      </div>
    </div>
  )
}
