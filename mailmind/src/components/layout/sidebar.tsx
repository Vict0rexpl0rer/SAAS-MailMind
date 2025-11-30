/**
 * =============================================================================
 * COMPOSANT LAYOUT - SIDEBAR
 * =============================================================================
 *
 * Barre de navigation latérale du dashboard avec effet hover expand.
 * Style "carte flottante" inspiré du design Linear/Notion.
 * Support complet dark/light mode avec variables CSS.
 *
 * Comportement :
 * - Par défaut (collapsed) : ~72px, icônes seulement
 * - Au hover (expanded) : ~256px, icônes + labels avec animation fluide
 * - À la fermeture : textes disparaissent instantanément
 *
 * =============================================================================
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Mail,
  Users,
  Settings,
  Inbox,
  FileText,
  AlertTriangle,
  Trash2,
  Sparkles
} from 'lucide-react'
import { emailStats } from '@/data/mock-emails'
import { candidateStats } from '@/data/mock-candidates'

/**
 * Éléments de navigation principale
 */
const mainNavItems = [
  {
    label: 'Emails',
    href: '/dashboard/emails',
    icon: Mail,
    badge: emailStats.unread,
  },
  {
    label: 'Candidats',
    href: '/dashboard/candidates',
    icon: Users,
    badge: candidateStats.new,
  },
  {
    label: 'IA',
    href: '/dashboard/ia',
    icon: Sparkles,
  },
  {
    label: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

/**
 * Catégories d'emails pour le filtre rapide
 */
const emailCategories = [
  { label: 'Tous', href: '/dashboard/emails?filter=all', icon: Inbox },
  { label: 'CV', href: '/dashboard/emails?filter=cv', icon: FileText },
  { label: 'Urgents', href: '/dashboard/emails?filter=urgent', icon: AlertTriangle },
  { label: 'Spam', href: '/dashboard/emails?filter=spam', icon: Trash2 },
]

/**
 * Classes pour les textes avec transition asymétrique :
 * - Hover IN : apparition avec délai et slide
 * - Hover OUT : disparition ultra rapide (75ms) sans délai
 */
const textTransitionClasses = `
  opacity-0 group-hover:opacity-100
  translate-x-[-8px] group-hover:translate-x-0
  transition-[opacity,transform]
  duration-75 group-hover:duration-300
  ease-out
  whitespace-nowrap
`

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="group fixed top-0 left-0 z-40 h-screen p-3">
      {/* Conteneur carte flottante avec hover expand et animation glissante */}
      <div
        className="
          w-[72px] group-hover:w-64
          h-full
          bg-[var(--bg-elevated)] rounded-2xl
          shadow-lg dark:shadow-black/40
          border border-[var(--border-default)]
          flex flex-col
          overflow-hidden
          group-hover:shadow-xl
        "
        style={{
          transition: 'width 500ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 300ms ease'
        }}
      >
        {/* Header - Logo et nom */}
        <div className="p-4 border-b border-[var(--border-subtle)]">
          <Link href="/dashboard/emails" className="flex items-center gap-3">
            <div className="
              w-10 h-10 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center flex-shrink-0
              transition-transform duration-300 ease-out
              group-hover:scale-105
            ">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span
              className={`${textTransitionClasses} text-xl font-semibold text-[var(--text-primary)]`}
              style={{ transitionDelay: '0ms' }}
            >
              MailMind
            </span>
          </Link>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden">
          {/* Section Navigation */}
          <div className="mb-4">
            <p
              className={`${textTransitionClasses} px-3 mb-2 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider`}
              style={{ transitionDelay: '0ms' }}
            >
              Navigation
            </p>
            <ul className="space-y-1">
              {mainNavItems.map((item, index) => {
                const isActive = pathname.startsWith(item.href.split('?')[0])
                const Icon = item.icon
                const delayIn = 50 + index * 30

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3
                        px-3 py-2.5 rounded-lg
                        text-sm font-medium
                        transition-colors duration-200
                        ${isActive
                          ? 'bg-[var(--accent-primary)] text-white'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span
                        className={`${textTransitionClasses} flex-1`}
                        style={{
                          transitionDelay: '0ms',
                        }}
                      >
                        <span
                          className="inline-block transition-[opacity,transform] duration-75 group-hover:duration-300 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0"
                          style={{ transitionDelay: `${delayIn}ms` }}
                        >
                          {item.label}
                        </span>
                      </span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`
                            px-2 py-0.5 text-xs rounded-full font-medium
                            opacity-0 group-hover:opacity-100
                            scale-90 group-hover:scale-100
                            transition-[opacity,transform]
                            duration-75 group-hover:duration-300
                            ${isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]'
                            }
                          `}
                          style={{ transitionDelay: `${delayIn + 20}ms` }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Section Catégories */}
          <div>
            <p
              className={`${textTransitionClasses} px-3 mb-2 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider`}
              style={{ transitionDelay: '0ms' }}
            >
              Catégories
            </p>
            <ul className="space-y-1">
              {emailCategories.map((item, index) => {
                const Icon = item.icon
                const delayIn = 120 + index * 30

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        flex items-center gap-3
                        px-3 py-2 rounded-lg
                        text-sm text-[var(--text-secondary)]
                        hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
                        transition-colors duration-200
                      "
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span
                        className="opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-[opacity,transform] duration-75 group-hover:duration-300 ease-out whitespace-nowrap"
                        style={{ transitionDelay: `${delayIn}ms` }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Section utilisateur en bas */}
        <div className="mt-auto p-4 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="
              w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0
              transition-transform duration-300 ease-out
              group-hover:scale-105
            ">
              <span className="text-white font-medium text-sm">VI</span>
            </div>
            <span
              className="opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-[opacity,transform] duration-75 group-hover:duration-300 ease-out whitespace-nowrap text-sm font-medium text-[var(--text-primary)]"
              style={{ transitionDelay: '150ms' }}
            >
              Victor
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
