/**
 * =============================================================================
 * COMPOSANT UI - BADGE
 * =============================================================================
 *
 * Badge pour afficher des labels, statuts ou catégories.
 * Design inspiré de Linear/Notion avec support dark/light mode.
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
 * Classes Tailwind pour chaque variante (utilise CSS variables pour dark/light mode)
 */
const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--surface-hover)] text-[var(--text-secondary)]',
  primary: 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]',
  success: 'bg-[var(--success-subtle)] text-[var(--success)]',
  warning: 'bg-[var(--warning-subtle)] text-[var(--warning)]',
  danger: 'bg-[var(--error-subtle)] text-[var(--error)]',
  info: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]',
  purple: 'bg-purple-500/15 text-purple-500 dark:bg-purple-400/15 dark:text-purple-400',
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
          h-[22px] px-2
          text-[11px] font-semibold
          rounded-md
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
