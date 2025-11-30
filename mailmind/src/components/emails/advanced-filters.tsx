'use client'

/**
 * =============================================================================
 * COMPOSANT ADVANCED FILTERS
 * =============================================================================
 *
 * Panneau de filtres avancés combinables pour la liste des emails.
 * Permet de sélectionner plusieurs catégories, groupes et options en même temps.
 *
 * =============================================================================
 */

import { useState, useRef, useEffect } from 'react'
import {
  Filter,
  X,
  Check,
  ChevronDown,
  Users,
  Briefcase,
  MessageSquare,
  ShieldAlert,
  MoreHorizontal,
  FileCheck,
  AlertCircle,
  Clock,
  Mail,
  MailOpen,
  Star,
  Trash2,
} from 'lucide-react'
import { EmailCategory, EmailCategoryGroup, EmailStatus } from '@/types'
import { Button, Badge } from '@/components/ui'
import { categoryGroups, defaultCategories, getCategoryConfig } from '@/data/default-categories'

/**
 * Structure des filtres actifs
 */
export interface ActiveFilters {
  categories: EmailCategory[]
  groups: EmailCategoryGroup[]
  status: EmailStatus[]
  hasCv: boolean | null
  isDoubtful: boolean | null
  hasAttachment: boolean | null
  dateRange: 'all' | 'today' | 'week' | 'month'
}

/**
 * Filtres par défaut (tout désactivé)
 */
export const defaultFilters: ActiveFilters = {
  categories: [],
  groups: [],
  status: [],
  hasCv: null,
  isDoubtful: null,
  hasAttachment: null,
  dateRange: 'all',
}

/**
 * Mapping des icônes de groupe
 */
const groupIcons: Record<EmailCategoryGroup, React.ReactNode> = {
  recrutement: <Users className="w-4 h-4" />,
  business: <Briefcase className="w-4 h-4" />,
  communication: <MessageSquare className="w-4 h-4" />,
  indesirables: <ShieldAlert className="w-4 h-4" />,
  autre: <MoreHorizontal className="w-4 h-4" />,
}

interface AdvancedFiltersProps {
  /** Filtres actifs */
  filters: ActiveFilters
  /** Callback quand les filtres changent */
  onFiltersChange: (filters: ActiveFilters) => void
  /** Compteurs par catégorie */
  categoryCounts?: Record<string, number>
  /** Compteurs par groupe */
  groupCounts?: Record<string, number>
  /** Classes CSS additionnelles */
  className?: string
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  categoryCounts = {},
  groupCounts = {},
  className = '',
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'categories' | 'status' | 'options'>('categories')
  const panelRef = useRef<HTMLDivElement>(null)

  // Fermer le panneau quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Compter les filtres actifs
  const activeFiltersCount =
    filters.categories.length +
    filters.groups.length +
    filters.status.length +
    (filters.hasCv !== null ? 1 : 0) +
    (filters.isDoubtful !== null ? 1 : 0) +
    (filters.hasAttachment !== null ? 1 : 0) +
    (filters.dateRange !== 'all' ? 1 : 0)

  /**
   * Toggle une catégorie dans les filtres
   */
  const toggleCategory = (categoryId: EmailCategory) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  /**
   * Toggle un groupe dans les filtres
   */
  const toggleGroup = (groupId: EmailCategoryGroup) => {
    const newGroups = filters.groups.includes(groupId)
      ? filters.groups.filter(g => g !== groupId)
      : [...filters.groups, groupId]
    onFiltersChange({ ...filters, groups: newGroups })
  }

  /**
   * Toggle un statut dans les filtres
   */
  const toggleStatus = (status: EmailStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    onFiltersChange({ ...filters, status: newStatus })
  }

  /**
   * Réinitialiser tous les filtres
   */
  const resetFilters = () => {
    onFiltersChange(defaultFilters)
  }

  /**
   * Sélectionner toutes les catégories d'un groupe
   */
  const selectAllInGroup = (groupId: EmailCategoryGroup) => {
    const groupCategories = defaultCategories
      .filter(c => c.group === groupId)
      .map(c => c.id as EmailCategory)

    const allSelected = groupCategories.every(c => filters.categories.includes(c))

    if (allSelected) {
      // Désélectionner toutes les catégories du groupe
      const newCategories = filters.categories.filter(c => !groupCategories.includes(c))
      onFiltersChange({ ...filters, categories: newCategories })
    } else {
      // Sélectionner toutes les catégories du groupe
      const newCategories = [...new Set([...filters.categories, ...groupCategories])]
      onFiltersChange({ ...filters, categories: newCategories })
    }
  }

  return (
    <div className={`relative ${className}`} ref={panelRef}>
      {/* Bouton principal */}
      <Button
        variant={activeFiltersCount > 0 ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        Filtres
        {activeFiltersCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-white/20">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Panneau de filtres */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[500px] max-h-[70vh] bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header du panneau */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[var(--accent-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">Filtres avancés</span>
              {activeFiltersCount > 0 && (
                <Badge variant="default">{activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--surface-hover)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Onglets de sections */}
          <div className="flex border-b border-[var(--border-subtle)]">
            {[
              { id: 'categories', label: 'Catégories', icon: <Users className="w-4 h-4" /> },
              { id: 'status', label: 'Statut', icon: <Mail className="w-4 h-4" /> },
              { id: 'options', label: 'Options', icon: <Filter className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as typeof activeSection)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
                  ${activeSection === tab.id
                    ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des sections */}
          <div className="p-4 overflow-y-auto max-h-[400px]">
            {/* Section Catégories */}
            {activeSection === 'categories' && (
              <div className="space-y-4">
                {/* Filtres par groupe */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Groupes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryGroups.map(group => {
                      const isSelected = filters.groups.includes(group.id)
                      const count = groupCounts[group.id] || 0
                      return (
                        <button
                          key={group.id}
                          onClick={() => toggleGroup(group.id)}
                          className={`
                            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${isSelected
                              ? 'bg-[var(--accent-primary)] text-white shadow-md'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {groupIcons[group.id]}
                          {group.label}
                          <span className={`text-xs ${isSelected ? 'text-white/70' : 'text-[var(--text-tertiary)]'}`}>
                            ({count})
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Catégories par groupe */}
                {categoryGroups.map(group => {
                  const groupCategories = defaultCategories.filter(c => c.group === group.id)
                  const allSelected = groupCategories.every(c => filters.categories.includes(c.id as EmailCategory))

                  return (
                    <div key={group.id} className="border-t border-[var(--border-subtle)] pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                          {groupIcons[group.id]}
                          {group.label}
                        </h4>
                        <button
                          onClick={() => selectAllInGroup(group.id)}
                          className="text-xs text-[var(--accent-primary)] hover:underline"
                        >
                          {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {groupCategories.map(category => {
                          const isSelected = filters.categories.includes(category.id as EmailCategory)
                          const count = categoryCounts[category.id] || 0
                          const config = getCategoryConfig(category.id as EmailCategory)

                          return (
                            <button
                              key={category.id}
                              onClick={() => toggleCategory(category.id as EmailCategory)}
                              className={`
                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all
                                ${isSelected
                                  ? `ring-2 ring-offset-1 ring-${category.color}-500`
                                  : 'opacity-70 hover:opacity-100'
                                }
                              `}
                              style={{
                                backgroundColor: isSelected ? `var(--${category.color}-100, #e0e0e0)` : 'var(--bg-tertiary)',
                                color: isSelected ? `var(--${category.color}-800, #333)` : 'var(--text-secondary)',
                              }}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              {category.labelShort}
                              <span className="opacity-60">({count})</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Section Statut */}
            {activeSection === 'status' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                    Statut de lecture
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'unread', label: 'Non lu', icon: <Mail className="w-4 h-4" /> },
                      { id: 'read', label: 'Lu', icon: <MailOpen className="w-4 h-4" /> },
                      { id: 'starred', label: 'Favoris', icon: <Star className="w-4 h-4" /> },
                      { id: 'archived', label: 'Archivé', icon: <Trash2 className="w-4 h-4" /> },
                    ].map(status => {
                      const isSelected = filters.status.includes(status.id as EmailStatus)
                      return (
                        <button
                          key={status.id}
                          onClick={() => toggleStatus(status.id as EmailStatus)}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all
                            ${isSelected
                              ? 'bg-[var(--accent-primary)] text-white shadow-md'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          {status.icon}
                          {status.label}
                          {isSelected && <Check className="w-4 h-4 ml-auto" />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-4">
                  <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                    Période
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'all', label: 'Tout' },
                      { id: 'today', label: "Aujourd'hui" },
                      { id: 'week', label: 'Cette semaine' },
                      { id: 'month', label: 'Ce mois' },
                    ].map(range => {
                      const isSelected = filters.dateRange === range.id
                      return (
                        <button
                          key={range.id}
                          onClick={() => onFiltersChange({ ...filters, dateRange: range.id as ActiveFilters['dateRange'] })}
                          className={`
                            flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-medium transition-all
                            ${isSelected
                              ? 'bg-[var(--accent-primary)] text-white shadow-md'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          <Clock className="w-3 h-3" />
                          {range.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Section Options */}
            {activeSection === 'options' && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                  Options spéciales
                </h4>

                <div className="space-y-2">
                  {/* Filtre CV */}
                  <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Contient un CV</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Emails avec CV détecté</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        { value: null, label: 'Tous' },
                        { value: true, label: 'Oui' },
                        { value: false, label: 'Non' },
                      ].map(option => (
                        <button
                          key={String(option.value)}
                          onClick={() => onFiltersChange({ ...filters, hasCv: option.value })}
                          className={`
                            px-3 py-1 rounded-md text-xs font-medium transition-all
                            ${filters.hasCv === option.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtre Douteux */}
                  <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Classification douteuse</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Emails à vérifier manuellement</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        { value: null, label: 'Tous' },
                        { value: true, label: 'Oui' },
                        { value: false, label: 'Non' },
                      ].map(option => (
                        <button
                          key={String(option.value)}
                          onClick={() => onFiltersChange({ ...filters, isDoubtful: option.value })}
                          className={`
                            px-3 py-1 rounded-md text-xs font-medium transition-all
                            ${filters.isDoubtful === option.value
                              ? 'bg-amber-500 text-white'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtre Pièces jointes */}
                  <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Pièces jointes</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Emails avec fichiers attachés</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        { value: null, label: 'Tous' },
                        { value: true, label: 'Oui' },
                        { value: false, label: 'Non' },
                      ].map(option => (
                        <button
                          key={String(option.value)}
                          onClick={() => onFiltersChange({ ...filters, hasAttachment: option.value })}
                          className={`
                            px-3 py-1 rounded-md text-xs font-medium transition-all
                            ${filters.hasAttachment === option.value
                              ? 'bg-purple-500 text-white'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer avec résumé */}
          {activeFiltersCount > 0 && (
            <div className="px-4 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
              <div className="flex flex-wrap gap-1.5">
                {filters.categories.map(cat => {
                  const config = getCategoryConfig(cat)
                  return (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                    >
                      {config?.labelShort || cat}
                      <button
                        onClick={() => toggleCategory(cat)}
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
                        onClick={() => toggleGroup(group)}
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
                    {status}
                    <button
                      onClick={() => toggleStatus(status)}
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
                      onClick={() => onFiltersChange({ ...filters, hasCv: null })}
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
                      onClick={() => onFiltersChange({ ...filters, isDoubtful: null })}
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
                      onClick={() => onFiltersChange({ ...filters, dateRange: 'all' })}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdvancedFilters
