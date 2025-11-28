/**
 * =============================================================================
 * LAYOUT - DASHBOARD
 * =============================================================================
 *
 * Layout partagé par toutes les pages du dashboard.
 * Inclut la sidebar et structure la mise en page principale.
 *
 * Ce layout est protégé par le middleware - seuls les utilisateurs
 * authentifiés peuvent y accéder.
 *
 * STRUCTURE :
 * ┌──────────────────────────────────────────┐
 * │ Sidebar │           Main Content         │
 * │         │  ┌──────────────────────────┐  │
 * │         │  │        Header            │  │
 * │         │  ├──────────────────────────┤  │
 * │         │  │                          │  │
 * │         │  │     Page Content         │  │
 * │         │  │                          │  │
 * │         │  └──────────────────────────┘  │
 * └──────────────────────────────────────────┘
 *
 * =============================================================================
 */

import { Sidebar } from '@/components/layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar - fixe sur la gauche */}
      <Sidebar />

      {/* Contenu principal - scrollable */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
