/**
 * =============================================================================
 * COMPOSANT LAYOUT - SIDEBAR
 * =============================================================================
 *
 * Barre de navigation latérale du dashboard.
 * Affiche le logo, les liens de navigation et les statistiques.
 *
 * Design minimaliste style Apple avec :
 * - Logo en haut
 * - Navigation principale
 * - Statistiques (nombre d'emails, candidats)
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
  Trash2
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

export function Sidebar() {
  // Récupère le chemin actuel pour mettre en surbrillance le lien actif
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Logo et nom de l'app */}
      <div className="p-6 border-b border-slate-200">
        <Link href="/dashboard/emails" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-slate-900">MailMind</span>
        </Link>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 p-4">
        {/* Section principale */}
        <div className="mb-6">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href.split('?')[0])
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center justify-between
                      px-3 py-2.5 rounded-lg
                      text-sm font-medium
                      transition-colors duration-200
                      ${isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`
                          px-2 py-0.5 text-xs rounded-full
                          ${isActive
                            ? 'bg-white text-slate-900'
                            : 'bg-slate-200 text-slate-700'
                          }
                        `}
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

        {/* Catégories d'emails */}
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Catégories
          </p>
          <ul className="space-y-1">
            {emailCategories.map((item) => {
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Section statistiques en bas */}
      <div className="p-4 border-t border-slate-200">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Statistiques
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Emails reçus</span>
              <span className="font-semibold text-slate-900">{emailStats.total}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">CV détectés</span>
              <span className="font-semibold text-slate-900">{emailStats.cv}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Candidats</span>
              <span className="font-semibold text-slate-900">{candidateStats.total}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
