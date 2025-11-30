'use client'

/**
 * =============================================================================
 * WRAPPER BANNIÈRE MODE TEST
 * =============================================================================
 *
 * Composant client qui affiche la bannière du mode test
 * uniquement si le mode test est activé.
 *
 * =============================================================================
 */

import { useTestMode } from '@/contexts/test-mode-context'
import { TestModeBanner } from './TestModeBanner'

export function TestModeBannerWrapper() {
  const { isTestMode, showBanner, setShowBanner } = useTestMode()

  // Ne rien afficher si le mode test n'est pas activé ou si la bannière est masquée
  if (!isTestMode || !showBanner) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <TestModeBanner onDismiss={() => setShowBanner(false)} />
    </div>
  )
}
