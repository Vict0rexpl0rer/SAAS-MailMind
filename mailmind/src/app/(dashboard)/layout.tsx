/**
 * =============================================================================
 * LAYOUT - DASHBOARD
 * =============================================================================
 *
 * Layout partagé par toutes les pages du dashboard.
 * Inclut la sidebar flottante et structure la mise en page principale.
 *
 * La sidebar est en position fixed avec effet hover expand.
 * Le contenu principal a un margin-left pour compenser la sidebar collapsed.
 *
 * STRUCTURE :
 * ┌──────────────────────────────────────────┐
 * │ [Sidebar]│        Main Content           │
 * │ (fixed)  │  ┌──────────────────────────┐ │
 * │          │  │                          │ │
 * │          │  │     Page Content         │ │
 * │          │  │                          │ │
 * │          │  └──────────────────────────┘ │
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
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar - fixed position avec hover expand */}
      <Sidebar />

      {/* Contenu principal - avec margin pour la sidebar collapsed (72px + 24px padding) */}
      <main className="ml-[96px] min-h-screen overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
