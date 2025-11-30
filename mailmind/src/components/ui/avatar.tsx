/**
 * =============================================================================
 * COMPOSANT UI - AVATAR
 * =============================================================================
 *
 * Avatar pour afficher une image de profil ou les initiales de l'utilisateur.
 * Design inspiré de Linear/Notion avec palette de couleurs variée.
 *
 * USAGE :
 * <Avatar src="/path/to/image.jpg" alt="Nom" />
 * <Avatar fallback="AB" colorIndex={2} />
 *
 * =============================================================================
 */

import { ImgHTMLAttributes, forwardRef } from 'react'

/**
 * Tailles disponibles pour l'avatar
 */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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
  /** Index de couleur (0-7) pour le fallback */
  colorIndex?: number
}

/**
 * Classes Tailwind pour chaque taille
 */
const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]' },
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-12 h-12', text: 'text-base' },
  xl: { container: 'w-16 h-16', text: 'text-xl' },
}

/**
 * Palette de couleurs pour les avatars (du design system)
 */
const avatarColors = [
  { bg: 'bg-indigo-500', text: 'text-white' },
  { bg: 'bg-purple-500', text: 'text-white' },
  { bg: 'bg-pink-500', text: 'text-white' },
  { bg: 'bg-orange-500', text: 'text-white' },
  { bg: 'bg-emerald-500', text: 'text-white' },
  { bg: 'bg-cyan-500', text: 'text-white' },
  { bg: 'bg-amber-400', text: 'text-black' },
  { bg: 'bg-red-500', text: 'text-white' },
]

/**
 * Génère un index de couleur basé sur une chaîne (pour cohérence)
 */
function getColorIndexFromString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % avatarColors.length
}

/**
 * Composant Avatar
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback = '?', alt = '', size = 'md', colorIndex, className = '', ...props }, ref) => {
    // Détermine la couleur basée sur le fallback ou l'index fourni
    const resolvedColorIndex = colorIndex ?? getColorIndexFromString(fallback)
    const colors = avatarColors[resolvedColorIndex]
    const sizeConfig = sizeClasses[size]

    return (
      <div
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          rounded-full overflow-hidden
          font-semibold
          ${sizeConfig.container}
          ${!src ? `${colors.bg} ${colors.text}` : ''}
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
          <span className={`uppercase ${sizeConfig.text}`}>
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
