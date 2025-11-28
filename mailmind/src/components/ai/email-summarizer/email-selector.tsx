/**
 * =============================================================================
 * COMPOSANT AI - EMAIL SELECTOR
 * =============================================================================
 *
 * Sélecteur d'email pour le résumeur. Affiche la liste des emails
 * reçus et permet d'en sélectionner un.
 *
 * =============================================================================
 */

'use client'

import { useState, useMemo } from 'react'
import { Search, Mail, Paperclip, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui'
import { Email } from '@/types'
import { mockEmails } from '@/data/mock-emails'

interface EmailSelectorProps {
  onSelect: (email: Email) => void
  selectedId?: string
}

export function EmailSelector({ onSelect, selectedId }: EmailSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrer les emails (exclure les spams)
  const filteredEmails = useMemo(() => {
    const nonSpamEmails = mockEmails.filter((e) => e.category !== 'spam')

    if (!searchQuery.trim()) {
      return nonSpamEmails
    }

    const query = searchQuery.toLowerCase()
    return nonSpamEmails.filter(
      (email) =>
        email.senderName.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Hier'
    } else if (days < 7) {
      return date.toLocaleDateString('fr-FR', { weekday: 'long' })
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher un email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
        />
      </div>

      {/* Liste des emails */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            Aucun email trouvé
          </p>
        ) : (
          filteredEmails.map((email) => (
            <Card
              key={email.id}
              hoverable
              className={`
                p-3 cursor-pointer transition-all duration-200
                ${selectedId === email.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
              `}
              onClick={() => onSelect(email)}
            >
              <div className="flex items-start gap-3">
                {/* Icône */}
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${email.status === 'unread' ? 'bg-blue-100' : 'bg-slate-100'}
                `}>
                  <Mail className={`w-5 h-5 ${email.status === 'unread' ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className={`text-sm truncate ${email.status === 'unread' ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                      {email.senderName}
                    </span>
                    <span className="text-xs text-slate-400 flex-shrink-0">
                      {formatDate(email.receivedAt)}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${email.status === 'unread' ? 'font-medium text-slate-800' : 'text-slate-600'}`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {email.preview}
                  </p>
                  {email.hasAttachment && (
                    <div className="flex items-center gap-1 mt-1">
                      <Paperclip className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {email.attachments?.length} pièce(s) jointe(s)
                      </span>
                    </div>
                  )}
                </div>

                {/* Flèche de sélection */}
                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-colors ${selectedId === email.id ? 'text-blue-500' : 'text-slate-300'}`} />
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Info */}
      <p className="text-xs text-slate-400 text-center">
        {filteredEmails.length} email(s) disponible(s)
      </p>
    </div>
  )
}
