/**
 * =============================================================================
 * COMPOSANT UI - INPUT
 * =============================================================================
 *
 * Champ de saisie stylisé avec support de label et erreur.
 * Design épuré style Apple.
 *
 * USAGE :
 * <Input label="Email" type="email" placeholder="john@example.com" />
 * <Input label="Mot de passe" type="password" error="Champ requis" />
 *
 * =============================================================================
 */

import { InputHTMLAttributes, forwardRef } from 'react'

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
    // Génère un ID unique si non fourni
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Champ de saisie */}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5
            bg-white
            border rounded-lg
            text-slate-900 text-sm
            placeholder:text-slate-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${error
              ? 'border-red-300 focus:ring-red-400'
              : 'border-blue-200 hover:border-blue-300'
            }
            ${className}
          `}
          {...props}
        />

        {/* Message d'erreur */}
        {error && (
          <p className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Texte d'aide */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">
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
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-2.5
            bg-white
            border rounded-lg
            text-slate-900 text-sm
            placeholder:text-slate-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            resize-none
            ${error
              ? 'border-red-300 focus:ring-red-400'
              : 'border-blue-200 hover:border-blue-300'
            }
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
