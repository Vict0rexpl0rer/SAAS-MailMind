'use client'

/**
 * =============================================================================
 * COMPOSANT CATEGORY FILTERS
 * =============================================================================
 *
 * Filtres de catégories groupés pour la liste des emails.
 * Affiche les 21 catégories organisées par groupe (Recrutement, Business, etc.)
 *
 * =============================================================================
 */

import { useState } from 'react'
import { EmailCategory, EmailCategoryGroup } from '@/types'
import { categoryGroups, defaultCategories, getCategoryColorClasses } from '@/data/default-categories'
import { CategoryBadge } from './category-badge'
import {
  ChevronDown,
  ChevronRight,
  Users,
  Briefcase,
  MessageSquare,
  ShieldAlert,
  MoreHorizontal,
  Filter,
  X,
} from 'lucide-react'

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

interface CategoryFiltersProps {
  /** Catégorie sélectionnée */
  selectedCategory: EmailCategory | 'all'
  /** Groupe sélectionné (optionnel) */
  selectedGroup?: EmailCategoryGroup | 'all'
  /** Callback quand une catégorie est sélectionnée */
  onCategoryChange: (category: EmailCategory | 'all') => void
  /** Callback quand un groupe est sélectionné (optionnel) */
  onGroupChange?: (group: EmailCategoryGroup | 'all') => void
  /** Compteurs par catégorie */
  categoryCounts?: Record<string, number>
  /** Compteurs par groupe */
  groupCounts?: Record<string, number>
  /** Afficher les groupes collapsibles */
  collapsible?: boolean
  /** Mode compact (une seule ligne) */
  compact?: boolean
  /** Classes CSS additionnelles */
  className?: string
}

export function CategoryFilters({
  selectedCategory,
  selectedGroup = 'all',
  onCategoryChange,
  onGroupChange,
  categoryCounts = {},
  groupCounts = {},
  collapsible = true,
  compact = false,
  className = '',
}: CategoryFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<EmailCategoryGroup>>(
    new Set(['recrutement', 'business']) // Par défaut, ouvrir les 2 premiers groupes
  )

  const toggleGroup = (groupId: EmailCategoryGroup) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(groupId)) {
        next.delete(groupId)
      } else {
        next.add(groupId)
      }
      return next
    })
  }

  // Mode compact : une seule ligne avec tous les filtres principaux
  if (compact) {
    return (
      <CompactFilters
        selectedCategory={selectedCategory}
        selectedGroup={selectedGroup}
        onCategoryChange={onCategoryChange}
        onGroupChange={onGroupChange}
        categoryCounts={categoryCounts}
        groupCounts={groupCounts}
        className={className}
      />
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Bouton "Tous" */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium
          transition-colors
          ${selectedCategory === 'all'
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }
        `}
      >
        <span className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Tous les emails
        </span>
        {categoryCounts['all'] !== undefined && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700">
            {categoryCounts['all']}
          </span>
        )}
      </button>

      {/* Groupes de catégories */}
      {categoryGroups.map(group => {
        const groupCategories = defaultCategories.filter(c => c.group === group.id)
        const isExpanded = expandedGroups.has(group.id)
        const hasSelectedCategory = groupCategories.some(c => c.id === selectedCategory)

        return (
          <div key={group.id} className="border-b border-gray-100 dark:border-gray-800 pb-2">
            {/* Header du groupe */}
            <button
              onClick={() => collapsible ? toggleGroup(group.id) : onGroupChange?.(group.id)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium
                transition-colors
                ${hasSelectedCategory || selectedGroup === group.id
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              `}
            >
              <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                {groupIcons[group.id]}
                {group.label}
              </span>
              <span className="flex items-center gap-2">
                {groupCounts[group.id] !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700">
                    {groupCounts[group.id]}
                  </span>
                )}
                {collapsible && (
                  isExpanded
                    ? <ChevronDown className="w-4 h-4 text-gray-400" />
                    : <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </span>
            </button>

            {/* Catégories du groupe */}
            {(!collapsible || isExpanded) && (
              <div className="ml-4 mt-1 space-y-1">
                {groupCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id as EmailCategory)}
                    className={`
                      w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm
                      transition-colors
                      ${selectedCategory === category.id
                        ? getCategoryColorClasses(category.color)
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                      }
                    `}
                  >
                    <span className="truncate">{category.labelShort}</span>
                    {categoryCounts[category.id] !== undefined && (
                      <span className="text-xs ml-2">
                        {categoryCounts[category.id]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Version compacte des filtres (une seule ligne)
 */
function CompactFilters({
  selectedCategory,
  selectedGroup,
  onCategoryChange,
  onGroupChange,
  categoryCounts,
  groupCounts,
  className = '',
}: Omit<CategoryFiltersProps, 'collapsible' | 'compact'>) {
  const [showAll, setShowAll] = useState(false)

  // Catégories prioritaires à afficher en premier
  const priorityCategories: EmailCategory[] = [
    'cv_spontane',
    'cv_offre',
    'prospect_chaud',
    'client_existant',
    'equipe_interne',
    'doute',
  ]

  const visibleCategories = showAll
    ? defaultCategories
    : defaultCategories.filter(c => priorityCategories.includes(c.id as EmailCategory))

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Tous */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
          transition-colors
          ${selectedCategory === 'all'
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }
        `}
      >
        Tous
        {categoryCounts?.['all'] !== undefined && (
          <span className="text-xs opacity-70">({categoryCounts['all']})</span>
        )}
      </button>

      {/* Séparateur */}
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      {/* Filtres par groupe */}
      {categoryGroups.slice(0, 3).map(group => (
        <button
          key={group.id}
          onClick={() => onGroupChange?.(group.id)}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-colors
            ${selectedGroup === group.id
              ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }
          `}
        >
          {groupIcons[group.id]}
          {group.label}
          {groupCounts?.[group.id] !== undefined && (
            <span className="text-xs opacity-70">({groupCounts[group.id]})</span>
          )}
        </button>
      ))}

      {/* Séparateur */}
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      {/* Catégories prioritaires */}
      {visibleCategories.map(category => (
        <CategoryBadge
          key={category.id}
          category={category.id as EmailCategory}
          showIcon={false}
          shortLabel={true}
          size="md"
          className={`
            cursor-pointer transition-all
            ${selectedCategory === category.id
              ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900'
              : 'opacity-70 hover:opacity-100'
            }
          `}
          onClick={() => onCategoryChange(category.id as EmailCategory)}
        />
      ))}

      {/* Bouton voir plus/moins */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {showAll ? (
          <>
            <X className="w-3 h-3" />
            Moins
          </>
        ) : (
          <>
            <MoreHorizontal className="w-3 h-3" />
            Plus
          </>
        )}
      </button>

      {/* Indicateur de filtre actif */}
      {selectedCategory !== 'all' && (
        <button
          onClick={() => onCategoryChange('all')}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          <X className="w-3 h-3" />
          Réinitialiser
        </button>
      )}
    </div>
  )
}

export default CategoryFilters
