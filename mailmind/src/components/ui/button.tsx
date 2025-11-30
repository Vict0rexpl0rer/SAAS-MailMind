/**
 * =============================================================================
 * COMPOSANT UI - BUTTON
 * =============================================================================
 *
 * Bouton réutilisable avec plusieurs variantes et tailles.
 * Design inspiré de Linear/Notion avec support dark/light mode.
 *
 * USAGE :
 * <Button variant="primary" size="md">Texte</Button>
 * <Button variant="secondary" size="sm">Texte</Button>
 * <Button variant="ghost">Texte</Button>
 * <Button variant="icon" size="icon-md"><Icon /></Button>
 *
 * =============================================================================
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'

/**
 * Types de variantes disponibles pour le bouton
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon'

/**
 * Tailles disponibles pour le bouton
 */
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'

/**
 * Props du composant Button
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style visuel du bouton */
  variant?: ButtonVariant
  /** Taille du bouton */
  size?: ButtonSize
  /** Affiche un spinner de chargement */
  isLoading?: boolean
}

/**
 * Classes Tailwind pour chaque variante (light + dark mode)
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)]
    text-white font-semibold
    shadow-sm hover:shadow-md
  `,
  secondary: `
    bg-[var(--surface-default)] hover:bg-[var(--surface-hover)] active:bg-[var(--surface-active)]
    text-[var(--text-primary)]
    border border-[var(--border-strong)]
  `,
  ghost: `
    bg-transparent hover:bg-[var(--surface-hover)] active:bg-[var(--surface-active)]
    text-[var(--text-secondary)] hover:text-[var(--text-primary)]
  `,
  danger: `
    bg-[var(--error)] hover:opacity-90 active:opacity-80
    text-white font-semibold
    shadow-sm
  `,
  icon: `
    bg-transparent hover:bg-[var(--surface-hover)] active:bg-[var(--surface-active)]
    text-[var(--text-tertiary)] hover:text-[var(--text-primary)]
  `,
}

/**
 * Classes Tailwind pour chaque taille
 */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-11 px-5 text-sm rounded-lg',
  'icon-sm': 'h-8 w-8 rounded-md',
  'icon-md': 'h-9 w-9 rounded-lg',
  'icon-lg': 'h-10 w-10 rounded-lg',
}

/**
 * Composant Button
 * forwardRef permet de passer une ref au composant
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--bg-primary)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
