/**
 * =============================================================================
 * COMPOSANT UI - BUTTON
 * =============================================================================
 *
 * Bouton réutilisable avec plusieurs variantes et tailles.
 * Design minimaliste style Apple.
 *
 * USAGE :
 * <Button variant="primary" size="md">Texte</Button>
 * <Button variant="secondary" size="sm">Texte</Button>
 * <Button variant="ghost">Texte</Button>
 *
 * =============================================================================
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'

/**
 * Types de variantes disponibles pour le bouton
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/**
 * Tailles disponibles pour le bouton
 */
type ButtonSize = 'sm' | 'md' | 'lg'

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
 * Classes Tailwind pour chaque variante
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-300/50',
  secondary: 'bg-white text-slate-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-lg shadow-blue-200/50',
  ghost: 'bg-transparent text-slate-600 hover:bg-blue-100 hover:text-slate-900',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-300/50',
}

/**
 * Classes Tailwind pour chaque taille
 */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
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
          font-medium rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
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
