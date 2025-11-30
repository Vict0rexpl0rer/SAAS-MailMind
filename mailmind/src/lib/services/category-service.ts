/**
 * =============================================================================
 * SERVICE DE GESTION DES CATÉGORIES
 * =============================================================================
 *
 * Service responsable de la gestion des catégories d'emails :
 * - Récupération des catégories (par défaut + personnalisées)
 * - Création de catégories personnalisées
 * - Modification (renommage, couleur, ordre)
 * - Suppression de catégories
 *
 * =============================================================================
 */

import { EmailCategory, EmailCategoryGroup } from '@/types'
import {
  CategoryMetadata,
  UserCategoryConfig,
  CustomCategory,
  CreateCustomCategoryInput,
  UpdateCategoryConfigInput,
} from '@/types/category'
import {
  defaultCategories,
  categoryGroups,
  getCategoryMetadata,
  getCategoryColorClasses,
} from '@/data/default-categories'

/**
 * Stockage en mémoire pour le mode test
 * TODO: Remplacer par Supabase en production
 */
let userCategoryConfigs: Map<string, UserCategoryConfig[]> = new Map()
let customCategories: Map<string, CustomCategory[]> = new Map()

/**
 * Récupère toutes les catégories pour un utilisateur
 * Combine les catégories par défaut avec les configurations utilisateur
 */
export function getUserCategories(userId: string): CategoryMetadata[] {
  const userConfigs = userCategoryConfigs.get(userId) || []
  const userCustomCats = customCategories.get(userId) || []

  // Convertir les catégories par défaut en les combinant avec les configs utilisateur
  const categories: CategoryMetadata[] = defaultCategories.map(defaultCat => {
    const userConfig = userConfigs.find(c => c.categoryId === defaultCat.id)

    if (userConfig) {
      return {
        ...defaultCat,
        label: userConfig.customLabel || defaultCat.label,
        labelShort: userConfig.customLabel
          ? userConfig.customLabel.slice(0, 15)
          : defaultCat.labelShort,
        color: userConfig.customColor || defaultCat.color,
        order: userConfig.displayOrder,
      }
    }

    return defaultCat
  })

  // Ajouter les catégories personnalisées
  for (const customCat of userCustomCats) {
    categories.push({
      id: customCat.id,
      label: customCat.label,
      labelShort: customCat.label.slice(0, 15),
      group: customCat.group,
      color: customCat.color,
      icon: customCat.icon,
      order: customCat.order,
      isDefault: false,
      isSystemCategory: false,
    })
  }

  // Trier par groupe puis par ordre
  return categories.sort((a, b) => {
    const groupOrder = categoryGroups.findIndex(g => g.id === a.group) -
                       categoryGroups.findIndex(g => g.id === b.group)
    if (groupOrder !== 0) return groupOrder
    return a.order - b.order
  })
}

/**
 * Récupère les catégories groupées par groupe
 */
export function getUserCategoriesByGroup(
  userId: string
): Record<EmailCategoryGroup, CategoryMetadata[]> {
  const allCategories = getUserCategories(userId)

  const grouped: Record<EmailCategoryGroup, CategoryMetadata[]> = {
    recrutement: [],
    business: [],
    communication: [],
    indesirables: [],
    autre: [],
  }

  for (const category of allCategories) {
    grouped[category.group].push(category)
  }

  return grouped
}

/**
 * Réordonne les catégories pour un utilisateur
 */
export function reorderCategories(
  userId: string,
  orderedCategoryIds: string[]
): void {
  const userConfigs = userCategoryConfigs.get(userId) || []

  for (let i = 0; i < orderedCategoryIds.length; i++) {
    const categoryId = orderedCategoryIds[i]

    // Chercher si une config existe déjà
    const existingConfig = userConfigs.find(c => c.categoryId === categoryId)

    if (existingConfig) {
      existingConfig.displayOrder = i
      existingConfig.updatedAt = new Date()
    } else {
      // Créer une nouvelle config pour cet ordre
      userConfigs.push({
        id: `config-${userId}-${categoryId}`,
        userId,
        categoryId,
        displayOrder: i,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  userCategoryConfigs.set(userId, userConfigs)
}

/**
 * Renomme une catégorie pour un utilisateur
 */
export function renameCategory(
  userId: string,
  categoryId: string,
  newLabel: string
): void {
  const userConfigs = userCategoryConfigs.get(userId) || []
  const existingConfig = userConfigs.find(c => c.categoryId === categoryId)

  if (existingConfig) {
    existingConfig.customLabel = newLabel
    existingConfig.updatedAt = new Date()
  } else {
    const defaultCat = getCategoryMetadata(categoryId as EmailCategory)
    userConfigs.push({
      id: `config-${userId}-${categoryId}`,
      userId,
      categoryId,
      displayOrder: defaultCat?.order || 999,
      customLabel: newLabel,
      isHidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  userCategoryConfigs.set(userId, userConfigs)
}

/**
 * Change la couleur d'une catégorie pour un utilisateur
 */
export function changeCategoryColor(
  userId: string,
  categoryId: string,
  newColor: string
): void {
  const userConfigs = userCategoryConfigs.get(userId) || []
  const existingConfig = userConfigs.find(c => c.categoryId === categoryId)

  if (existingConfig) {
    existingConfig.customColor = newColor
    existingConfig.updatedAt = new Date()
  } else {
    const defaultCat = getCategoryMetadata(categoryId as EmailCategory)
    userConfigs.push({
      id: `config-${userId}-${categoryId}`,
      userId,
      categoryId,
      displayOrder: defaultCat?.order || 999,
      customColor: newColor,
      isHidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  userCategoryConfigs.set(userId, userConfigs)
}

/**
 * Supprime une catégorie pour un utilisateur
 * Note: Les catégories système (non_classe, doute) ne peuvent pas être supprimées
 * Les emails de cette catégorie passent en "non_classe"
 */
export function deleteCategory(
  userId: string,
  categoryId: string
): { success: boolean; error?: string } {
  // Vérifier si c'est une catégorie système
  const defaultCat = getCategoryMetadata(categoryId as EmailCategory)
  if (defaultCat?.isSystemCategory) {
    return {
      success: false,
      error: 'Les catégories système ne peuvent pas être supprimées',
    }
  }

  // Si c'est une catégorie personnalisée, la supprimer
  const userCustomCats = customCategories.get(userId) || []
  const customCatIndex = userCustomCats.findIndex(c => c.id === categoryId)

  if (customCatIndex !== -1) {
    userCustomCats.splice(customCatIndex, 1)
    customCategories.set(userId, userCustomCats)
    return { success: true }
  }

  // Si c'est une catégorie par défaut, on ne peut que la masquer
  const userConfigs = userCategoryConfigs.get(userId) || []
  const existingConfig = userConfigs.find(c => c.categoryId === categoryId)

  if (existingConfig) {
    existingConfig.isHidden = true
    existingConfig.updatedAt = new Date()
  } else {
    userConfigs.push({
      id: `config-${userId}-${categoryId}`,
      userId,
      categoryId,
      displayOrder: defaultCat?.order || 999,
      isHidden: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  userCategoryConfigs.set(userId, userConfigs)

  return {
    success: true,
  }
}

/**
 * Crée une catégorie personnalisée pour un utilisateur
 */
export function createCustomCategory(
  userId: string,
  input: CreateCustomCategoryInput
): CustomCategory {
  const userCustomCats = customCategories.get(userId) || []

  // Trouver le prochain ordre disponible
  const maxOrder = userCustomCats.reduce((max, c) => Math.max(max, c.order), 0)

  const newCategory: CustomCategory = {
    id: `custom-${userId}-${Date.now()}`,
    userId,
    label: input.label,
    color: input.color,
    icon: input.icon || 'Tag',
    group: input.group || 'autre',
    order: maxOrder + 1,
    createdAt: new Date(),
  }

  userCustomCats.push(newCategory)
  customCategories.set(userId, userCustomCats)

  return newCategory
}

/**
 * Met à jour la configuration d'une catégorie
 */
export function updateCategoryConfig(
  userId: string,
  categoryId: string,
  updates: UpdateCategoryConfigInput
): void {
  const userConfigs = userCategoryConfigs.get(userId) || []
  const existingConfig = userConfigs.find(c => c.categoryId === categoryId)

  if (existingConfig) {
    if (updates.displayOrder !== undefined) {
      existingConfig.displayOrder = updates.displayOrder
    }
    if (updates.customLabel !== undefined) {
      existingConfig.customLabel = updates.customLabel
    }
    if (updates.customColor !== undefined) {
      existingConfig.customColor = updates.customColor
    }
    if (updates.isHidden !== undefined) {
      existingConfig.isHidden = updates.isHidden
    }
    existingConfig.updatedAt = new Date()
  } else {
    const defaultCat = getCategoryMetadata(categoryId as EmailCategory)
    const newConfig: UserCategoryConfig = {
      id: `config-${userId}-${categoryId}`,
      userId,
      categoryId,
      displayOrder: updates.displayOrder ?? defaultCat?.order ?? 999,
      customLabel: updates.customLabel,
      customColor: updates.customColor,
      isHidden: updates.isHidden ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    userConfigs.push(newConfig)
  }

  userCategoryConfigs.set(userId, userConfigs)
}

/**
 * Réinitialise les configurations de catégories d'un utilisateur
 */
export function resetUserCategoryConfigs(userId: string): void {
  userCategoryConfigs.delete(userId)
  customCategories.delete(userId)
}

/**
 * Récupère les informations d'un groupe de catégories
 */
export function getCategoryGroupInfo(groupId: EmailCategoryGroup) {
  return categoryGroups.find(g => g.id === groupId)
}

/**
 * Récupère toutes les couleurs disponibles
 */
export function getAvailableColors(): string[] {
  return [
    'blue', 'indigo', 'cyan', 'rose', 'teal', 'sky',
    'emerald', 'green', 'lime', 'amber', 'orange', 'yellow',
    'purple', 'violet', 'fuchsia', 'pink', 'red', 'gray', 'zinc', 'slate',
  ]
}

/**
 * Récupère les icônes disponibles pour les catégories
 */
export function getAvailableIcons(): string[] {
  return [
    'FileUser', 'FileCheck', 'RotateCcw', 'UserX', 'CalendarCheck', 'HelpCircle',
    'Flame', 'UserCheck', 'Handshake', 'Package', 'Receipt', 'FileText',
    'Users', 'Bell', 'Newspaper', 'MailMinus',
    'ShieldX', 'Megaphone', 'Bot',
    'Inbox', 'AlertCircle', 'Tag', 'Folder', 'Star', 'Heart', 'Bookmark',
  ]
}

/**
 * Export des helpers
 */
export {
  getCategoryMetadata,
  getCategoryColorClasses,
  categoryGroups,
  defaultCategories,
}
