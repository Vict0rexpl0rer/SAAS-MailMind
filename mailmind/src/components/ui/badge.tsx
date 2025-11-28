/**
 * =============================================================================
 * COMPOSANT UI - BADGE
 * =============================================================================
 *
 * Badge pour afficher des labels, statuts ou catégories.
 * Utilisé pour les catégories d'emails et les statuts de candidats.
 *
 * USAGE :
 * <Badge variant="success">Recruté</Badge>
 * <Badge variant="warning">En attente</Badge>
 *
 * =============================================================================
 */

import { HTMLAttributes, forwardRef } from 'react'

/**
 * Variantes de couleur pour le badge
 */
type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'

/**
 * Props du composant Badge
 */
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Style visuel du badge */
  variant?: BadgeVariant
}

/**
 * Classes Tailwind pour chaque variante
 */
const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  primary: 'bg-slate-900 text-white',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
}

/**
 * Composant Badge
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center
          px-2.5 py-0.5
          text-xs font-medium
          rounded-full
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

/**
 * Mapping des catégories d'email vers les variantes de badge
 */
export const emailCategoryBadge: Record<string, BadgeVariant> = {
  cv: 'info',
  message: 'default',
  spam: 'danger',
  urgent: 'warning',
  other: 'default',
}

/**
 * Mapping des statuts de candidat vers les variantes de badge
 */
export const candidateStatusBadge: Record<string, BadgeVariant> = {
  new: 'info',
  reviewing: 'warning',
  shortlisted: 'purple',
  interviewing: 'warning',
  offered: 'purple',
  hired: 'success',
  rejected: 'danger',
}
