/**
 * =============================================================================
 * COMPOSANT UI - CARD
 * =============================================================================
 *
 * Carte réutilisable pour afficher du contenu dans une boîte stylisée.
 * Design épuré avec ombre subtile style Apple.
 *
 * USAGE :
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Titre</CardTitle>
 *   </CardHeader>
 *   <CardContent>Contenu</CardContent>
 * </Card>
 *
 * =============================================================================
 */

import { HTMLAttributes, forwardRef } from 'react'

/**
 * Props du composant Card
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Ajoute un effet hover */
  hoverable?: boolean
}

/**
 * Composant Card - Container principal
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-2xl border border-blue-100
          shadow-lg shadow-blue-200/50
          ${hoverable ? 'transition-shadow hover:shadow-xl hover:shadow-blue-300/50' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Composant CardHeader - En-tête de la carte
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-6 py-4 border-b border-blue-100 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

/**
 * Composant CardTitle - Titre de la carte
 */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-lg font-semibold text-slate-900 ${className}`}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

/**
 * Composant CardDescription - Description sous le titre
 */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-slate-500 mt-1 ${className}`}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

/**
 * Composant CardContent - Contenu principal de la carte
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-6 py-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

/**
 * Composant CardFooter - Pied de la carte
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-6 py-4 border-t border-blue-100 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'
