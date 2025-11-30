/**
 * =============================================================================
 * TYPES - CATÉGORIES
 * =============================================================================
 *
 * Définition des types liés aux catégories d'emails.
 * Permet la personnalisation des catégories par utilisateur :
 * - Réorganisation par drag & drop
 * - Renommage
 * - Changement de couleur
 * - Création de catégories personnalisées
 *
 * =============================================================================
 */

import { EmailCategory, EmailCategoryGroup } from './email'

/**
 * Métadonnées d'une catégorie (par défaut ou personnalisée)
 */
export interface CategoryMetadata {
  /** Identifiant unique de la catégorie */
  id: EmailCategory | string

  /** Label complet (ex: "CV en réponse à une offre") */
  label: string

  /** Label court pour les badges (ex: "CV Offre") */
  labelShort: string

  /** Groupe parent de la catégorie */
  group: EmailCategoryGroup

  /** Couleur Tailwind (ex: "blue", "green", "red") */
  color: string

  /** Nom de l'icône Lucide (ex: "FileText", "Mail") */
  icon: string

  /** Ordre d'affichage dans le groupe */
  order: number

  /** Indique si c'est une catégorie par défaut */
  isDefault: boolean

  /** Indique si c'est une catégorie système (non_classe, doute) */
  isSystemCategory: boolean
}

/**
 * Configuration de catégorie personnalisée par utilisateur
 * Permet de modifier l'apparence et l'ordre sans changer la catégorie elle-même
 */
export interface UserCategoryConfig {
  /** ID unique de la configuration */
  id: string

  /** ID de l'utilisateur */
  userId: string

  /** ID de la catégorie (EmailCategory ou custom) */
  categoryId: EmailCategory | string

  /** Ordre d'affichage personnalisé */
  displayOrder: number

  /** Label personnalisé (si l'utilisateur veut renommer) */
  customLabel?: string

  /** Couleur personnalisée */
  customColor?: string

  /** Masquer cette catégorie dans les filtres */
  isHidden: boolean

  /** Date de création */
  createdAt: Date

  /** Date de mise à jour */
  updatedAt: Date
}

/**
 * Catégorie personnalisée créée par l'utilisateur
 */
export interface CustomCategory {
  /** ID unique de la catégorie */
  id: string

  /** ID de l'utilisateur propriétaire */
  userId: string

  /** Label de la catégorie */
  label: string

  /** Couleur Tailwind */
  color: string

  /** Nom de l'icône Lucide */
  icon: string

  /** Groupe parent */
  group: EmailCategoryGroup

  /** Ordre d'affichage */
  order: number

  /** Date de création */
  createdAt: Date
}

/**
 * Métadonnées d'un groupe de catégories
 */
export interface CategoryGroupMetadata {
  /** Identifiant du groupe */
  id: EmailCategoryGroup

  /** Label français du groupe */
  label: string

  /** Icône Lucide du groupe */
  icon: string

  /** Couleur du groupe */
  color: string

  /** Ordre d'affichage */
  order: number
}

/**
 * Input pour créer une catégorie personnalisée
 */
export interface CreateCustomCategoryInput {
  label: string
  color: string
  icon?: string
  group?: EmailCategoryGroup
}

/**
 * Input pour mettre à jour une configuration de catégorie
 */
export interface UpdateCategoryConfigInput {
  displayOrder?: number
  customLabel?: string
  customColor?: string
  isHidden?: boolean
}
