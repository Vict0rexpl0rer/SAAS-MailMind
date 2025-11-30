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
    <div className="h-full flex flex-col bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] overflow-hidden">
      {/* Barre d'actions */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm text-[var(--text-secondary)]">
            {emailStats.unread} non lu{emailStats.unread > 1 ? 's' : ''}
          </span>
        </div>
        <Button
          variant="ghost"
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
      <div className="flex-1 overflow-auto">
        {sortedEmails.length === 0 ? (
          // État vide
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Mail className="w-16 h-16 text-[var(--text-disabled)] mb-4" />
            <p className="text-[var(--text-secondary)] font-medium">Aucun email dans cette catégorie</p>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">Les emails apparaîtront ici</p>
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
      <div className="px-4 py-2.5 border-t border-[var(--border-subtle)] text-center">
        <p className="text-xs text-[var(--text-tertiary)]">
          {sortedEmails.length} email{sortedEmails.length > 1 ? 's' : ''} affiché{sortedEmails.length > 1 ? 's' : ''}
          {' • '}
          Données de démonstration
        </p>
      </div>
    </div>
  )
}
