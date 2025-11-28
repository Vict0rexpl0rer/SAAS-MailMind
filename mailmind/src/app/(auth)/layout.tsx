/**
 * =============================================================================
 * LAYOUT - PAGES D'AUTHENTIFICATION
 * =============================================================================
 *
 * Layout partagé par toutes les pages d'authentification (login, etc.)
 * Simple wrapper sans éléments visuels particuliers car chaque page
 * d'auth gère son propre design.
 *
 * =============================================================================
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
