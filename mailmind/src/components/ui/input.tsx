/**
 * =============================================================================
 * COMPOSANT UI - INPUT
 * =============================================================================
 *
 * Champ de saisie stylisé avec support de label et erreur.
 * Design inspiré de Linear/Notion avec support dark/light mode.
 *
 * USAGE :
 * <Input label="Email" type="email" placeholder="john@example.com" />
 * <Input label="Mot de passe" type="password" error="Champ requis" />
 *
 * =============================================================================
 */

import { InputHTMLAttributes, forwardRef, useId } from 'react'

/**
 * Props du composant Input
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label affiché au-dessus du champ */
  label?: string
  /** Message d'erreur */
  error?: string
  /** Texte d'aide affiché sous le champ */
  helperText?: string
}

/**
 * Composant Input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    // Génère un ID unique stable (SSR-compatible)
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Champ de saisie */}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-11 px-3.5
            bg-[var(--surface-default)]
            border rounded-lg
            text-[var(--text-primary)] text-sm
            placeholder:text-[var(--text-disabled)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]/30 focus:border-[var(--accent-primary)]
            hover:border-[var(--border-strong)]
            disabled:bg-[var(--surface-hover)] disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed
            ${error
              ? 'border-[var(--error)] focus:ring-[var(--error)]/30 focus:border-[var(--error)]'
              : 'border-[var(--border-default)]'
            }
            ${className}
          `}
          {...props}
        />

        {/* Message d'erreur */}
        {error && (
          <p className="mt-1.5 text-sm text-[var(--error)]">
            {error}
          </p>
        )}

        {/* Texte d'aide */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--text-tertiary)]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/**
 * Composant Textarea - Variante pour texte multiligne
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    // Génère un ID unique stable (SSR-compatible)
    const generatedId = useId()
    const textareaId = id || generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-3.5 py-3
            bg-[var(--surface-default)]
            border rounded-xl
            text-[var(--text-primary)] text-sm
            placeholder:text-[var(--text-disabled)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]/30 focus:border-[var(--accent-primary)]
            hover:border-[var(--border-strong)]
            disabled:bg-[var(--surface-hover)] disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed
            resize-none
            ${error
              ? 'border-[var(--error)] focus:ring-[var(--error)]/30 focus:border-[var(--error)]'
              : 'border-[var(--border-default)]'
            }
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--text-tertiary)]">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
