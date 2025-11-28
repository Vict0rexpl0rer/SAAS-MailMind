/**
 * =============================================================================
 * COMPOSANT - EMAIL LIST
 * =============================================================================
 *
 * Liste complète des emails avec filtres.
 * Composant principal de la page /dashboard/emails.
 *
 * =============================================================================
 */

'use client'

import { useState, useMemo } from 'react'
import { Mail, RefreshCw } from 'lucide-react'
import { Email, EmailCategory } from '@/types'
import { mockEmails, emailStats } from '@/data/mock-emails'
import { EmailListItem } from './email-list-item'
import { EmailFilters } from './email-filters'
import { Button } from '@/components/ui'

export function EmailList() {
  // État du filtre actif
  const [activeFilter, setActiveFilter] = useState<EmailCategory | 'all'>('all')
  // État de l'email sélectionné
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)
  // État de chargement (pour simulation)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calcul des compteurs par catégorie
  const counts = useMemo(() => ({
    all: mockEmails.length,
    cv: mockEmails.filter(e => e.category === 'cv').length,
    message: mockEmails.filter(e => e.category === 'message').length,
    spam: mockEmails.filter(e => e.category === 'spam').length,
    urgent: mockEmails.filter(e => e.category === 'urgent').length,
  }), [])

  // Filtrage des emails
  const filteredEmails = useMemo(() => {
    if (activeFilter === 'all') return mockEmails
    return mockEmails.filter(email => email.category === activeFilter)
  }, [activeFilter])

  // Tri par date (plus récent en premier)
  const sortedEmails = useMemo(() => {
    return [...filteredEmails].sort(
      (a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()
    )
  }, [filteredEmails])

  /**
   * Simule un rafraîchissement des emails
   */
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simule un délai de chargement
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  /**
   * Gère le clic sur un email
   */
  const handleEmailClick = (email: Email) => {
    setSelectedEmailId(email.id)
    // Dans le futur, ouvrir un panel de détail ou une modale
    console.log('Email sélectionné:', email)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Barre d'actions */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-slate-400" />
          <span className="text-sm text-slate-600">
            {emailStats.unread} non lu{emailStats.unread > 1 ? 's' : ''}
          </span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefresh}
          isLoading={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Filtres */}
      <EmailFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Liste des emails */}
      <div className="flex-1 overflow-auto bg-white">
        {sortedEmails.length === 0 ? (
          // État vide
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Mail className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500">Aucun email dans cette catégorie</p>
          </div>
        ) : (
          // Liste des emails
          <div>
            {sortedEmails.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                isSelected={selectedEmailId === email.id}
                onClick={() => handleEmailClick(email)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer avec informations */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400">
          {sortedEmails.length} email{sortedEmails.length > 1 ? 's' : ''} affiché{sortedEmails.length > 1 ? 's' : ''}
          {' • '}
          Données de démonstration
        </p>
      </div>
    </div>
  )
}
