'use client'

/**
 * =============================================================================
 * CONTEXTE MODE TEST / SIMULATION
 * =============================================================================
 *
 * Fournit un état global pour le mode test.
 * Permet de basculer facilement entre mode test et mode production.
 *
 * Usage :
 * const { isTestMode, toggleTestMode, testModeConfig } = useTestMode()
 *
 * =============================================================================
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode
} from 'react'
import { TEST_MODE_CONFIG, isTestMode as checkTestMode } from '@/lib/test-mode/config'

interface TestModeContextType {
  /** Mode test activé ou non */
  isTestMode: boolean

  /** Basculer le mode test */
  toggleTestMode: () => void

  /** Activer le mode test */
  enableTestMode: () => void

  /** Désactiver le mode test */
  disableTestMode: () => void

  /** Configuration du mode test */
  testModeConfig: typeof TEST_MODE_CONFIG

  /** Afficher/masquer la bannière de test */
  showBanner: boolean
  setShowBanner: (show: boolean) => void

  /** Stats du mode test */
  testStats: {
    emailsCount: number
    candidatesCount: number
    classificationsCount: number
    chatMessagesCount: number
  }

  /** Incrémenter les stats (pour le tracking) */
  incrementStat: (stat: keyof TestModeContextType['testStats']) => void
}

const TestModeContext = createContext<TestModeContextType | undefined>(undefined)

const STORAGE_KEY = 'mailmind-test-mode'
const BANNER_STORAGE_KEY = 'mailmind-test-banner-dismissed'

export function TestModeProvider({ children }: { children: ReactNode }) {
  // Vérifier si on est côté client
  const [mounted, setMounted] = useState(false)

  // État du mode test
  const [isTestModeEnabled, setIsTestModeEnabled] = useState(() => {
    // Par défaut, utiliser la config de l'environnement
    return checkTestMode()
  })

  // Affichage de la bannière
  const [showBanner, setShowBannerState] = useState(true)

  // Stats pour le tracking
  const [testStats, setTestStats] = useState({
    emailsCount: 0,
    candidatesCount: 0,
    classificationsCount: 0,
    chatMessagesCount: 0
  })

  // Initialiser depuis localStorage
  useEffect(() => {
    setMounted(true)

    // Récupérer le mode test depuis localStorage (override de l'env var)
    const storedMode = localStorage.getItem(STORAGE_KEY)
    if (storedMode !== null) {
      setIsTestModeEnabled(storedMode === 'true')
    }

    // Récupérer l'état de la bannière
    const bannerDismissed = localStorage.getItem(BANNER_STORAGE_KEY)
    if (bannerDismissed === 'true') {
      setShowBannerState(false)
    }
  }, [])

  // Sauvegarder le mode test dans localStorage
  const toggleTestMode = useCallback(() => {
    setIsTestModeEnabled(prev => {
      const newValue = !prev
      localStorage.setItem(STORAGE_KEY, String(newValue))
      return newValue
    })
  }, [])

  const enableTestMode = useCallback(() => {
    setIsTestModeEnabled(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const disableTestMode = useCallback(() => {
    setIsTestModeEnabled(false)
    localStorage.setItem(STORAGE_KEY, 'false')
  }, [])

  // Gérer la bannière
  const setShowBanner = useCallback((show: boolean) => {
    setShowBannerState(show)
    if (!show) {
      localStorage.setItem(BANNER_STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(BANNER_STORAGE_KEY)
    }
  }, [])

  // Incrémenter les stats
  const incrementStat = useCallback(
    (stat: keyof typeof testStats) => {
      setTestStats(prev => ({
        ...prev,
        [stat]: prev[stat] + 1
      }))
    },
    []
  )

  // Éviter le flash de contenu incorrect
  if (!mounted) {
    return null
  }

  return (
    <TestModeContext.Provider
      value={{
        isTestMode: isTestModeEnabled,
        toggleTestMode,
        enableTestMode,
        disableTestMode,
        testModeConfig: TEST_MODE_CONFIG,
        showBanner,
        setShowBanner,
        testStats,
        incrementStat
      }}
    >
      {children}
    </TestModeContext.Provider>
  )
}

/**
 * Hook pour accéder au contexte du mode test
 */
export function useTestMode() {
  const context = useContext(TestModeContext)
  if (context === undefined) {
    throw new Error('useTestMode must be used within a TestModeProvider')
  }
  return context
}

/**
 * Hook conditionnel pour utiliser des données de test ou réelles
 */
export function useTestModeData<TTest, TReal>(
  testData: TTest,
  realDataFetcher: () => TReal | Promise<TReal>
): TTest | TReal | null {
  const { isTestMode } = useTestMode()
  const [realData, setRealData] = useState<TReal | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isTestMode) {
      setLoading(true)
      Promise.resolve(realDataFetcher())
        .then(setRealData)
        .finally(() => setLoading(false))
    }
  }, [isTestMode, realDataFetcher])

  if (isTestMode) {
    return testData
  }

  return loading ? null : realData
}
