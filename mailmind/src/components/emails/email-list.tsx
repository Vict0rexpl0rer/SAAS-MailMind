/**
 * =============================================================================
 * COMPOSANT - EMAIL LIST V3
 * =============================================================================
 *
 * Liste complète des emails avec filtres avancés combinables pour 21 catégories.
 * Composant principal de la page /dashboard/emails.
 * Utilise les données du mode test quand il est activé.
 *
 * Nouveautés V3:
 * - Bouton Filtres avec panneau déroulant
 * - Filtres multi-sélection combinables (catégories, groupes, statuts)
 * - Options de filtrage avancées (CV, douteux, pièces jointes, période)
 *
 * =============================================================================
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { Mail, RefreshCw, Search, X } from 'lucide-react'
import { Email } from '@/types'
import { mockEmails, emailStats } from '@/data/mock-emails'
import { allTestEmailsV2, testEmailStatsV2 } from '@/lib/test-mode/mock-emails-v2'
import { useTestMode } from '@/contexts/test-mode-context'
import { EmailListItem } from './email-list-item'
import { AdvancedFilters, ActiveFilters, defaultFilters } from './advanced-filters'
import { Button } from '@/components/ui'
import { categoryGroups, defaultCategories } from '@/data/default-categories'

export function EmailList() {
  // Mode test
  const { isTestMode } = useTestMode()

  // Sélection des emails selon le mode (V2 avec 21 catégories)
  const emails = isTestMode ? allTestEmailsV2 : mockEmails
  const stats = isTestMode ? testEmailStatsV2 : emailStats

  // État des filtres avancés combinables
  const [filters, setFilters] = useState<ActiveFilters>(defaultFilters)
  const [searchQuery, setSearchQuery] = useState('')

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

  // Filtrage des emails avec les filtres combinables
  const filteredEmails = useMemo(() => {
    let result = [...emails]

    // Filtre par catégories (multi-sélection - OR logic)
    if (filters.categories.length > 0) {
      result = result.filter(email => filters.categories.includes(email.category))
    }

    // Filtre par groupes (multi-sélection - OR logic)
    if (filters.groups.length > 0) {
      result = result.filter(email => email.categoryGroup && filters.groups.includes(email.categoryGroup))
    }

    // Filtre par statut (multi-sélection - OR logic)
    if (filters.status.length > 0) {
      result = result.filter(email => filters.status.includes(email.status))
    }

    // Filtre CV
    if (filters.hasCv === true) {
      result = result.filter(email => email.hasCv === true)
    } else if (filters.hasCv === false) {
      result = result.filter(email => !email.hasCv)
    }

    // Filtre douteux
    if (filters.isDoubtful === true) {
      result = result.filter(email => email.isDoubtful === true)
    } else if (filters.isDoubtful === false) {
      result = result.filter(email => !email.isDoubtful)
    }

    // Filtre pièces jointes
    if (filters.hasAttachment === true) {
      result = result.filter(email => email.hasAttachment === true)
    } else if (filters.hasAttachment === false) {
      result = result.filter(email => !email.hasAttachment)
    }

    // Filtre par période
    if (filters.dateRange !== 'all') {
      const now = new Date()
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      if (filters.dateRange === 'today') {
        result = result.filter(email => email.receivedAt >= startOfDay)
      } else if (filters.dateRange === 'week') {
        const startOfWeek = new Date(startOfDay)
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
        result = result.filter(email => email.receivedAt >= startOfWeek)
      } else if (filters.dateRange === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        result = result.filter(email => email.receivedAt >= startOfMonth)
      }
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
  }, [emails, filters, searchQuery])

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

  // Compter les filtres actifs
  const activeFiltersCount =
    filters.categories.length +
    filters.groups.length +
    filters.status.length +
    (filters.hasCv !== null ? 1 : 0) +
    (filters.isDoubtful !== null ? 1 : 0) +
    (filters.hasAttachment !== null ? 1 : 0) +
    (filters.dateRange !== 'all' ? 1 : 0)

  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.trim()

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
    setFilters(defaultFilters)
    setSearchQuery('')
  }, [])

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] overflow-hidden">
      {/* Barre d'actions avec bouton Filtres */}
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

          {/* Bouton Filtres avancés */}
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            categoryCounts={categoryCounts}
            groupCounts={groupCounts}
          />
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4 mr-1" />
              Réinitialiser
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
            className="w-full pl-10 pr-10 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Résumé des filtres actifs */}
      {hasActiveFilters && (
        <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[var(--text-tertiary)]">Filtres actifs:</span>

            {filters.categories.map(cat => {
              const config = defaultCategories.find(c => c.id === cat)
              return (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                >
                  {config?.labelShort || cat}
                  <button
                    onClick={() => setFilters({
                      ...filters,
                      categories: filters.categories.filter(c => c !== cat)
                    })}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })}

            {filters.groups.map(group => {
              const config = categoryGroups.find(g => g.id === group)
              return (
                <span
                  key={group}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  {config?.label || group}
                  <button
                    onClick={() => setFilters({
                      ...filters,
                      groups: filters.groups.filter(g => g !== group)
                    })}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })}

            {filters.status.map(status => (
              <span
                key={status}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              >
                {status === 'unread' ? 'Non lu' : status === 'read' ? 'Lu' : status === 'starred' ? 'Favoris' : 'Archivé'}
                <button
                  onClick={() => setFilters({
                    ...filters,
                    status: filters.status.filter(s => s !== status)
                  })}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.hasCv !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                CV: {filters.hasCv ? 'Oui' : 'Non'}
                <button
                  onClick={() => setFilters({ ...filters, hasCv: null })}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.isDoubtful !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Douteux: {filters.isDoubtful ? 'Oui' : 'Non'}
                <button
                  onClick={() => setFilters({ ...filters, isDoubtful: null })}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.hasAttachment !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Pièce jointe: {filters.hasAttachment ? 'Oui' : 'Non'}
                <button
                  onClick={() => setFilters({ ...filters, hasAttachment: null })}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                {filters.dateRange === 'today' ? "Aujourd'hui" : filters.dateRange === 'week' ? 'Cette semaine' : 'Ce mois'}
                <button
                  onClick={() => setFilters({ ...filters, dateRange: 'all' })}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                Recherche: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

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
          {hasActiveFilters && ` sur ${emails.length}`}
          {' • '}
          {isTestMode ? `Mode Test (${stats.total} emails • 21 catégories)` : 'Données de démonstration'}
        </p>
      </div>
    </div>
  )
}
