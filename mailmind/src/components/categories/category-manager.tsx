'use client'

/**
 * =============================================================================
 * COMPOSANT CATEGORY MANAGER
 * =============================================================================
 *
 * Gestionnaire de catégories pour la page Settings.
 * Permet de :
 * - Réordonner les catégories par drag & drop
 * - Renommer les catégories
 * - Changer les couleurs
 * - Supprimer les catégories personnalisées
 * - Créer de nouvelles catégories
 *
 * =============================================================================
 */

import { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Palette,
} from 'lucide-react'
import { EmailCategory, EmailCategoryGroup } from '@/types'
import { CategoryMetadata, CategoryGroupMetadata } from '@/types/category'
import {
  defaultCategories,
  categoryGroups,
  categoryColorClasses,
  getCategoryColorClasses,
} from '@/data/default-categories'
import { Button, Input } from '@/components/ui'

/**
 * Props pour un item de catégorie sortable
 */
interface SortableCategoryItemProps {
  category: CategoryMetadata
  onEdit: (id: string, newLabel: string) => void
  onDelete: (id: string) => void
  onColorChange: (id: string, newColor: string) => void
}

/**
 * Item de catégorie avec drag & drop
 */
function SortableCategoryItem({
  category,
  onEdit,
  onDelete,
  onColorChange,
}: SortableCategoryItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(category.label)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleSaveEdit = () => {
    if (editValue.trim() && editValue !== category.label) {
      onEdit(category.id, editValue.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditValue(category.label)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const availableColors = Object.keys(categoryColorClasses)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 p-3 bg-[var(--surface-default)] rounded-lg border border-[var(--border-subtle)]
        ${isDragging ? 'shadow-lg' : ''}
      `}
    >
      {/* Handle de drag */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Badge couleur */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${getCategoryColorClasses(category.color)}
          hover:ring-2 hover:ring-[var(--accent-primary)] hover:ring-offset-2
          transition-all
        `}
        title="Changer la couleur"
      >
        <Palette className="w-4 h-4" />
      </button>

      {/* Color picker dropdown */}
      {showColorPicker && (
        <div className="absolute mt-32 ml-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-2 shadow-lg z-10 grid grid-cols-5 gap-1">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                onColorChange(category.id, color)
                setShowColorPicker(false)
              }}
              className={`
                w-6 h-6 rounded-full ${getCategoryColorClasses(color)}
                ${color === category.color ? 'ring-2 ring-[var(--accent-primary)]' : ''}
                hover:scale-110 transition-transform
              `}
              title={color}
            />
          ))}
        </div>
      )}

      {/* Label éditable */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 text-sm"
              autoFocus
            />
            <button
              onClick={handleSaveEdit}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--text-primary)] truncate">
              {category.label}
            </span>
            {category.labelShort !== category.label && (
              <span className="text-xs text-[var(--text-tertiary)]">
                ({category.labelShort})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded"
            title="Renommer"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {!category.isSystemCategory && (
            <button
              onClick={() => onDelete(category.id)}
              className="p-1.5 text-[var(--text-tertiary)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Section de groupe de catégories (collapsable)
 */
interface CategoryGroupSectionProps {
  group: CategoryGroupMetadata
  categories: CategoryMetadata[]
  onReorder: (groupId: EmailCategoryGroup, newOrder: CategoryMetadata[]) => void
  onEdit: (id: string, newLabel: string) => void
  onDelete: (id: string) => void
  onColorChange: (id: string, newColor: string) => void
}

function CategoryGroupSection({
  group,
  categories,
  onReorder,
  onEdit,
  onDelete,
  onColorChange,
}: CategoryGroupSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id)
      const newIndex = categories.findIndex((c) => c.id === over.id)

      const newOrder = arrayMove(categories, oldIndex, newIndex).map(
        (cat, index) => ({
          ...cat,
          order: index + 1,
        })
      )

      onReorder(group.id as EmailCategoryGroup, newOrder)
    }
  }

  return (
    <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
      {/* Header du groupe */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-[var(--surface-hover)] hover:bg-[var(--surface-active)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`text-lg font-semibold ${getCategoryColorClasses(group.color)}`}>
            {group.label}
          </span>
          <span className="text-sm text-[var(--text-tertiary)]">
            ({categories.length} catégories)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
        )}
      </button>

      {/* Liste des catégories */}
      {isExpanded && (
        <div className="p-4 space-y-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {categories.map((category) => (
                <SortableCategoryItem
                  key={category.id}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onColorChange={onColorChange}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}

/**
 * Props du composant principal
 */
interface CategoryManagerProps {
  /** Callback quand les catégories sont modifiées */
  onCategoriesChange?: (categories: CategoryMetadata[]) => void
}

/**
 * Composant principal de gestion des catégories
 */
export function CategoryManager({ onCategoriesChange }: CategoryManagerProps) {
  // État local des catégories (initialisation avec les défauts)
  const [categories, setCategories] = useState<CategoryMetadata[]>(defaultCategories)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryGroup, setNewCategoryGroup] = useState<EmailCategoryGroup>('autre')
  const [newCategoryColor, setNewCategoryColor] = useState('slate')

  // Grouper les catégories par groupe
  const groupedCategories = categoryGroups.map((group) => ({
    group,
    categories: categories
      .filter((c) => c.group === group.id)
      .sort((a, b) => a.order - b.order),
  }))

  // Handlers
  const handleReorder = useCallback(
    (groupId: EmailCategoryGroup, newOrder: CategoryMetadata[]) => {
      setCategories((prev) => {
        const updated = prev.map((cat) => {
          const reordered = newOrder.find((c) => c.id === cat.id)
          return reordered || cat
        })
        onCategoriesChange?.(updated)
        return updated
      })
    },
    [onCategoriesChange]
  )

  const handleEdit = useCallback(
    (id: string, newLabel: string) => {
      setCategories((prev) => {
        const updated = prev.map((cat) =>
          cat.id === id ? { ...cat, label: newLabel } : cat
        )
        onCategoriesChange?.(updated)
        return updated
      })
    },
    [onCategoriesChange]
  )

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        setCategories((prev) => {
          const updated = prev.filter((cat) => cat.id !== id)
          onCategoriesChange?.(updated)
          return updated
        })
      }
    },
    [onCategoriesChange]
  )

  const handleColorChange = useCallback(
    (id: string, newColor: string) => {
      setCategories((prev) => {
        const updated = prev.map((cat) =>
          cat.id === id ? { ...cat, color: newColor } : cat
        )
        onCategoriesChange?.(updated)
        return updated
      })
    },
    [onCategoriesChange]
  )

  const handleAddCategory = useCallback(() => {
    if (!newCategoryName.trim()) return

    const id = newCategoryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')

    const groupCategories = categories.filter((c) => c.group === newCategoryGroup)
    const newOrder = Math.max(...groupCategories.map((c) => c.order), 0) + 1

    const newCategory: CategoryMetadata = {
      id: id as EmailCategory,
      label: newCategoryName.trim(),
      labelShort: newCategoryName.trim().substring(0, 12),
      group: newCategoryGroup,
      color: newCategoryColor,
      icon: 'Tag',
      order: newOrder,
      isDefault: false,
      isSystemCategory: false,
    }

    setCategories((prev) => {
      const updated = [...prev, newCategory]
      onCategoriesChange?.(updated)
      return updated
    })

    setNewCategoryName('')
    setShowAddForm(false)
  }, [newCategoryName, newCategoryGroup, newCategoryColor, categories, onCategoriesChange])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Gestion des catégories
          </h2>
          <p className="text-sm text-[var(--text-tertiary)]">
            Personnalisez et réordonnez vos catégories d'emails
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="p-4 bg-[var(--surface-hover)] rounded-xl border border-[var(--border-subtle)] space-y-4">
          <h3 className="font-medium text-[var(--text-primary)]">
            Créer une nouvelle catégorie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                Nom
              </label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Ex: Partenaires stratégiques"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                Groupe
              </label>
              <select
                value={newCategoryGroup}
                onChange={(e) => setNewCategoryGroup(e.target.value as EmailCategoryGroup)}
                className="w-full h-10 px-3 bg-[var(--surface-default)] border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-primary)]"
              >
                {categoryGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                Couleur
              </label>
              <div className="flex flex-wrap gap-1">
                {Object.keys(categoryColorClasses).slice(0, 10).map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategoryColor(color)}
                    className={`
                      w-6 h-6 rounded-full ${getCategoryColorClasses(color)}
                      ${color === newCategoryColor ? 'ring-2 ring-[var(--accent-primary)]' : ''}
                      hover:scale-110 transition-transform
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddForm(false)
                setNewCategoryName('')
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Créer
            </Button>
          </div>
        </div>
      )}

      {/* Liste des groupes */}
      <div className="space-y-4">
        {groupedCategories.map(({ group, categories: groupCats }) => (
          <CategoryGroupSection
            key={group.id}
            group={group}
            categories={groupCats}
            onReorder={handleReorder}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onColorChange={handleColorChange}
          />
        ))}
      </div>

      {/* Info */}
      <p className="text-xs text-[var(--text-tertiary)] text-center">
        Glissez-déposez les catégories pour les réordonner. Les catégories système ne peuvent pas être supprimées.
      </p>
    </div>
  )
}

export default CategoryManager
