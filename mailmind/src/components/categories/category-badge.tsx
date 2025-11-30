'use client'

/**
 * =============================================================================
 * COMPOSANT CATEGORY BADGE
 * =============================================================================
 *
 * Badge coloré affichant la catégorie d'un email.
 * Supporte les 21 catégories avec couleurs et icônes.
 *
 * =============================================================================
 */

import { EmailCategory } from '@/types'
import { getCategoryMetadata, getCategoryColorClasses } from '@/data/default-categories'
import {
  FileUser,
  FileCheck,
  RotateCcw,
  UserX,
  CalendarCheck,
  HelpCircle,
  Flame,
  UserCheck,
  Handshake,
  Package,
  Receipt,
  FileText,
  Users,
  Bell,
  Newspaper,
  MailMinus,
  ShieldX,
  Megaphone,
  Bot,
  Inbox,
  AlertCircle,
  Tag,
  LucideIcon,
} from 'lucide-react'

/**
 * Mapping des noms d'icônes vers les composants Lucide
 */
const iconMap: Record<string, LucideIcon> = {
  FileUser,
  FileCheck,
  RotateCcw,
  UserX,
  CalendarCheck,
  HelpCircle,
  Flame,
  UserCheck,
  Handshake,
  Package,
  Receipt,
  FileText,
  Users,
  Bell,
  Newspaper,
  MailMinus,
  ShieldX,
  Megaphone,
  Bot,
  Inbox,
  AlertCircle,
  Tag,
}

interface CategoryBadgeProps {
  /** Catégorie de l'email */
  category: EmailCategory | string
  /** Afficher l'icône */
  showIcon?: boolean
  /** Utiliser le label court */
  shortLabel?: boolean
  /** Score de confiance IA (0-100) */
  confidence?: number
  /** Email marqué comme douteux */
  isDoubtful?: boolean
  /** Taille du badge */
  size?: 'sm' | 'md' | 'lg'
  /** Classes CSS additionnelles */
  className?: string
  /** Afficher le tooltip avec la confiance */
  showTooltip?: boolean
  /** Callback au clic */
  onClick?: () => void
}

export function CategoryBadge({
  category,
  showIcon = true,
  shortLabel = true,
  confidence,
  isDoubtful = false,
  size = 'md',
  className = '',
  showTooltip = true,
  onClick,
}: CategoryBadgeProps) {
  const metadata = getCategoryMetadata(category as EmailCategory)

  if (!metadata) {
    // Catégorie inconnue
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 ${className}`}>
        <Tag className="w-3 h-3" />
        {category}
      </span>
    )
  }

  const colorClasses = getCategoryColorClasses(metadata.color)
  const IconComponent = iconMap[metadata.icon] || Tag

  // Tailles
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] gap-0.5',
    md: 'px-2 py-0.5 text-xs gap-1',
    lg: 'px-2.5 py-1 text-sm gap-1.5',
  }

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const label = shortLabel ? metadata.labelShort : metadata.label

  // Construire le tooltip
  const tooltipText = showTooltip && confidence !== undefined
    ? `${metadata.label} - Confiance: ${confidence}%${isDoubtful ? ' (À vérifier)' : ''}`
    : metadata.label

  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    ${sizeClasses[size]}
    ${colorClasses}
    ${isDoubtful ? 'ring-2 ring-amber-400 ring-offset-1 dark:ring-offset-gray-900' : ''}
    ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
    ${className}
  `

  const content = (
    <>
      {showIcon && (
        <IconComponent className={iconSizes[size]} />
      )}
      <span className="truncate max-w-[100px]">{label}</span>
      {isDoubtful && (
        <AlertCircle className={`${iconSizes[size]} text-amber-500`} />
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={baseClasses}
        title={tooltipText}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <span
      className={baseClasses}
      title={tooltipText}
    >
      {content}
    </span>
  )
}

/**
 * Badge spécial pour les emails avec CV
 */
export function CVIndicator({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <span
      className="inline-flex items-center justify-center text-blue-600 dark:text-blue-400"
      title="CV détecté"
    >
      <FileCheck className={sizeClasses[size]} />
    </span>
  )
}

/**
 * Badge spécial pour les emails douteux
 */
export function DoubtIndicator({ confidence, size = 'md' }: { confidence?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <span
      className="inline-flex items-center justify-center text-amber-500 dark:text-amber-400"
      title={confidence !== undefined ? `Classification incertaine (${confidence}%)` : 'Classification incertaine'}
    >
      <AlertCircle className={sizeClasses[size]} />
    </span>
  )
}

export default CategoryBadge
