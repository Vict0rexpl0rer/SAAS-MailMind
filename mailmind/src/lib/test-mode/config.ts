/**
 * =============================================================================
 * CONFIGURATION DU MODE TEST / SIMULATION
 * =============================================================================
 *
 * Ce fichier permet de basculer facilement entre le mode test et le mode production.
 *
 * MODE TEST : Utilise des données fictives et simule les réponses IA
 * MODE PRODUCTION : Utilise Gmail réel et OpenAI réel
 *
 * Pour passer en production, changez simplement TEST_MODE_ENABLED à false
 * ou définissez la variable d'environnement NEXT_PUBLIC_TEST_MODE=false
 *
 * =============================================================================
 */

/**
 * Configuration principale du mode test
 * Changez cette valeur pour basculer entre test et production
 */
export const TEST_MODE_CONFIG = {
  /**
   * Active/désactive le mode test globalement
   * En production, mettre à false
   */
  enabled: process.env.NEXT_PUBLIC_TEST_MODE !== 'false',

  /**
   * Simule un délai de réponse pour l'IA (en ms)
   * Rend l'expérience plus réaliste
   */
  simulatedDelay: {
    min: 800,
    max: 2000,
  },

  /**
   * Configuration de la classification des emails
   */
  emailClassification: {
    /** Pourcentage de cas où l'IA montre un "doute" (confiance < 70%) */
    doubtPercentage: 15,
    /** Score de confiance minimum pour les cas normaux */
    minConfidence: 70,
    /** Score de confiance maximum */
    maxConfidence: 99,
  },

  /**
   * Configuration de l'extraction CV
   */
  cvExtraction: {
    /** Pourcentage de CV avec extraction partielle (données manquantes) */
    partialExtractionPercentage: 10,
  },

  /**
   * Configuration du chat IA
   */
  chat: {
    /** Délai avant chaque réponse du chat */
    responseDelay: 1500,
  },
}

/**
 * Vérifie si le mode test est activé
 */
export function isTestMode(): boolean {
  return TEST_MODE_CONFIG.enabled
}

/**
 * Simule un délai de réponse réaliste
 */
export async function simulateDelay(
  min = TEST_MODE_CONFIG.simulatedDelay.min,
  max = TEST_MODE_CONFIG.simulatedDelay.max
): Promise<void> {
  const delay = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Génère un score de confiance aléatoire
 * Inclut parfois des scores bas pour tester la catégorie "Doute"
 */
export function generateConfidenceScore(): number {
  const { doubtPercentage, minConfidence, maxConfidence } =
    TEST_MODE_CONFIG.emailClassification

  // Chance de générer un score "douteux"
  if (Math.random() * 100 < doubtPercentage) {
    return Math.floor(Math.random() * 30 + 40) // Score entre 40-70
  }

  // Score normal
  return Math.floor(Math.random() * (maxConfidence - minConfidence) + minConfidence)
}
