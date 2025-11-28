/**
 * =============================================================================
 * COMPOSANT UI - AVATAR
 * =============================================================================
 *
 * Avatar pour afficher une image de profil ou les initiales de l'utilisateur.
 * Utilisé dans le header et les cartes candidats.
 *
 * USAGE :
 * <Avatar src="/path/to/image.jpg" alt="Nom" />
 * <Avatar fallback="AB" />
 *
 * =============================================================================
 */

import { ImgHTMLAttributes, forwardRef } from 'react'

/**
 * Tailles disponibles pour l'avatar
 */
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Props du composant Avatar
 */
interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** URL de l'image */
  src?: string | null
  /** Texte de fallback (initiales) si pas d'image */
  fallback?: string
  /** Taille de l'avatar */
  size?: AvatarSize
}

/**
 * Classes Tailwind pour chaque taille
 */
const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

/**
 * Composant Avatar
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback = '?', alt = '', size = 'md', className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          rounded-full overflow-hidden
          bg-slate-200 text-slate-600 font-medium
          ${sizeClasses[size]}
          ${className}
        `}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            {...props}
          />
        ) : (
          // Affiche les initiales si pas d'image
          <span className="uppercase">
            {fallback.slice(0, 2)}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

/**
 * Génère les initiales à partir d'un nom complet
 * "John Doe" -> "JD"
 * "Jean-Pierre Martin" -> "JM"
 */
export function getInitials(name: string): string {
  if (!name) return '?'

  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
