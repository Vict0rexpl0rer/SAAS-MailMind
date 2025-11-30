/**
 * =============================================================================
 * LAYOUT - DASHBOARD
 * =============================================================================
 *
 * Layout partagé par toutes les pages du dashboard.
 * Inclut la sidebar flottante et structure la mise en page principale.
 * Support dark/light mode avec design inspiré de Linear.
 * Intègre la bannière du mode test quand celui-ci est activé.
 *
 * La sidebar est en position fixed avec effet hover expand.
 * Le contenu principal a un margin-left pour compenser la sidebar collapsed.
 *
 * STRUCTURE :
 * ┌──────────────────────────────────────────┐
 * │ [Test Mode Banner - if enabled]          │
 * ├──────────────────────────────────────────┤
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
import { TestModeBannerWrapper } from '@/components/ui/TestModeBannerWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Bannière mode test - affichée seulement si le mode test est activé */}
      <TestModeBannerWrapper />

      {/* Sidebar - fixed position avec hover expand */}
      <Sidebar />

      {/* Contenu principal - avec margin pour la sidebar collapsed (72px + 24px padding) */}
      <main className="ml-[96px] min-h-screen overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
