/**
 * =============================================================================
 * COMPOSANT - EMAIL LIST V2
 * =============================================================================
 *
 * Liste complète des emails avec filtres pour 21 catégories.
 * Composant principal de la page /dashboard/emails.
 * Utilise les données du mode test quand il est activé.
 *
 * =============================================================================
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { Mail, RefreshCw, FileCheck, AlertCircle, Search, Calendar, Filter } from 'lucide-react'
import { Email, EmailCategory, EmailCategoryGroup } from '@/types'
import { mockEmails, emailStats } from '@/data/mock-emails'
import { allTestEmailsV2, testEmailStatsV2 } from '@/lib/test-mode/mock-emails-v2'
import { useTestMode } from '@/contexts/test-mode-context'
import { EmailListItem } from './email-list-item'
import { CategoryFilters } from '@/components/categories/category-filters'
import { Button, Input } from '@/components/ui'
import { categoryGroups, defaultCategories } from '@/data/default-categories'

export function EmailList() {
  // Mode test
  const { isTestMode } = useTestMode()

  // Sélection des emails selon le mode (V2 avec 21 catégories)
  const emails = isTestMode ? allTestEmailsV2 : mockEmails
  const stats = isTestMode ? testEmailStatsV2 : emailStats

  // États des filtres
  const [activeCategory, setActiveCategory] = useState<EmailCategory | 'all'>('all')
  const [activeGroup, setActiveGroup] = useState<EmailCategoryGroup | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCvOnly, setShowCvOnly] = useState(false)
  const [showDoubtOnly, setShowDoubtOnly] = useState(false)

  // État de l'email sélectionné
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)

  // État de chargement (pour simulation)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calcul des compteurs par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: emails.length }

    for (const category of defaultCategories) {
      counts[category.id] = emails.filter(e => e.category === category.id).length
    }

    // Compteur spéciaux
    counts['doute'] = emails.filter(e => e.isDoubtful).length
    counts['cv'] = emails.filter(e => e.hasCv).length

    return counts
  }, [emails])

  // Calcul des compteurs par groupe
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    for (const group of categoryGroups) {
      counts[group.id] = emails.filter(e => e.categoryGroup === group.id).length
    }

    return counts
  }, [emails])

  // Filtrage des emails
  const filteredEmails = useMemo(() => {
    let result = [...emails]

    // Filtre par catégorie
    if (activeCategory !== 'all') {
      result = result.filter(email => email.category === activeCategory)
    }

    // Filtre par groupe
    if (activeGroup !== 'all') {
      result = result.filter(email => email.categoryGroup === activeGroup)
    }

    // Filtre CV uniquement
    if (showCvOnly) {
      result = result.filter(email => email.hasCv)
    }

    // Filtre douteux uniquement
    if (showDoubtOnly) {
      result = result.filter(email => email.isDoubtful)
    }

    // Recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(email =>
        email.senderName.toLowerCase().includes(query) ||
        email.senderEmail.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
      )
    }

    return result
  }, [emails, activeCategory, activeGroup, showCvOnly, showDoubtOnly, searchQuery])

  // Tri par date (plus récent en premier)
  const sortedEmails = useMemo(() => {
    return [...filteredEmails].sort(
      (a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()
    )
  }, [filteredEmails])

  // Stats visibles
  const unreadCount = useMemo(() => {
    return sortedEmails.filter(e => e.status === 'unread').length
  }, [sortedEmails])

  /**
   * Simule un rafraîchissement des emails
   */
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  /**
   * Gère le clic sur un email
   */
  const handleEmailClick = useCallback((email: Email) => {
    setSelectedEmailId(email.id)
    console.log('Email sélectionné:', email)
  }, [])

  /**
   * Réinitialise tous les filtres
   */
  const handleResetFilters = useCallback(() => {
    setActiveCategory('all')
    setActiveGroup('all')
    setSearchQuery('')
    setShowCvOnly(false)
    setShowDoubtOnly(false)
  }, [])

  const hasActiveFilters = activeCategory !== 'all' || activeGroup !== 'all' || showCvOnly || showDoubtOnly || searchQuery.trim()

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] overflow-hidden">
      {/* Barre d'actions */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {sortedEmails.length} emails
            </span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Indicateurs de filtres spéciaux */}
          <div className="flex items-center gap-2">
            {categoryCounts['cv'] > 0 && (
              <button
                onClick={() => setShowCvOnly(!showCvOnly)}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors
                  ${showCvOnly
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }
                `}
              >
                <FileCheck className="w-3 h-3" />
                {categoryCounts['cv']} CV
              </button>
            )}

            {categoryCounts['doute'] > 0 && (
              <button
                onClick={() => setShowDoubtOnly(!showDoubtOnly)}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors
                  ${showDoubtOnly
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }
                `}
              >
                <AlertCircle className="w-3 h-3" />
                {categoryCounts['doute']} À vérifier
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-red-500 hover:text-red-600"
            >
              Réinitialiser filtres
            </Button>
          )}
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
      </div>

      {/* Barre de recherche */}
      <div className="px-4 py-2 border-b border-[var(--border-subtle)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, sujet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filtres par catégorie (mode compact) */}
      <div className="px-4 py-2 border-b border-[var(--border-subtle)] overflow-x-auto">
        <CategoryFilters
          selectedCategory={activeCategory}
          selectedGroup={activeGroup}
          onCategoryChange={setActiveCategory}
          onGroupChange={setActiveGroup}
          categoryCounts={categoryCounts}
          groupCounts={groupCounts}
          compact={true}
        />
      </div>

      {/* Liste des emails */}
      <div className="flex-1 overflow-auto">
        {sortedEmails.length === 0 ? (
          // État vide
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Mail className="w-16 h-16 text-[var(--text-disabled)] mb-4" />
            <p className="text-[var(--text-secondary)] font-medium">
              {hasActiveFilters ? 'Aucun email ne correspond aux filtres' : 'Aucun email dans cette catégorie'}
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">
              {hasActiveFilters ? 'Essayez de modifier vos critères de recherche' : 'Les emails apparaîtront ici'}
            </p>
            {hasActiveFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            )}
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
          {hasActiveFilters && ` (filtré${sortedEmails.length > 1 ? 's' : ''})`}
          {' • '}
          {isTestMode ? `Mode Test (${stats.total} emails • 21 catégories)` : 'Données de démonstration'}
        </p>
      </div>
    </div>
  )
}
