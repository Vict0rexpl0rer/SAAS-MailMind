/**
 * =============================================================================
 * SERVICE EMAIL UNIFIÉ V2
 * =============================================================================
 *
 * Ce service gère la récupération et le traitement des emails.
 * Il bascule automatiquement entre les données de test et les données réelles
 * selon la configuration du mode test.
 *
 * Supporte les 21 catégories et les nouvelles fonctionnalités :
 * - Filtrage par groupe de catégories
 * - Filtrage par date
 * - Filtrage des emails douteux
 * - Filtrage des emails avec CV
 *
 * =============================================================================
 */

import { Email, EmailCategory, EmailCategoryGroup, EmailFilters, EmailStats } from '@/types'
import { isTestMode } from '@/lib/test-mode/config'
import {
  allTestEmails,
  getTestEmailsByCategory,
  getTestEmailById,
  getTestUnreadCount,
  testEmailStats
} from '@/lib/test-mode/mock-emails-extended'
import {
  allTestEmailsV2,
  getTestEmailsByCategoryV2,
  getTestEmailsByGroupV2,
  getTestEmailByIdV2,
  getTestUnreadCountV2,
  getDoubtfulEmailsV2,
  getEmailsWithCvV2,
  testEmailStatsV2
} from '@/lib/test-mode/mock-emails-v2'

/**
 * Flag pour utiliser la nouvelle version V2 (21 catégories)
 */
const USE_V2 = true

/**
 * Récupère tous les emails (test ou réels)
 */
export async function fetchEmails(filters?: EmailFilters): Promise<Email[]> {
  if (isTestMode()) {
    return fetchTestEmails(filters)
  }
  return fetchRealEmails(filters)
}

/**
 * Récupère les emails de test
 */
async function fetchTestEmails(filters?: EmailFilters): Promise<Email[]> {
  // Simuler un léger délai réseau
  await new Promise(resolve => setTimeout(resolve, 300))

  let emails = USE_V2 ? [...allTestEmailsV2] : [...allTestEmails]

  if (filters) {
    // Filtrer par catégorie
    if (filters.category && filters.category !== 'all') {
      emails = emails.filter(e => e.category === filters.category)
    }

    // Filtrer par groupe de catégories (V2)
    if (filters.categoryGroup && filters.categoryGroup !== 'all' && USE_V2) {
      emails = emails.filter(e => e.categoryGroup === filters.categoryGroup)
    }

    // Filtrer par statut
    if (filters.status && filters.status !== 'all') {
      emails = emails.filter(e => e.status === filters.status)
    }

    // Filtrer par date de début
    if (filters.dateFrom) {
      emails = emails.filter(e => e.receivedAt >= filters.dateFrom!)
    }

    // Filtrer par date de fin
    if (filters.dateTo) {
      emails = emails.filter(e => e.receivedAt <= filters.dateTo!)
    }

    // Filtrer les emails avec CV uniquement
    if (filters.hasCvOnly && USE_V2) {
      emails = emails.filter(e => e.hasCv)
    }

    // Filtrer les emails douteux uniquement
    if (filters.doubtfulOnly && USE_V2) {
      emails = emails.filter(e => e.isDoubtful)
    }

    // Recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      emails = emails.filter(e =>
        e.senderName.toLowerCase().includes(searchLower) ||
        e.senderEmail.toLowerCase().includes(searchLower) ||
        e.subject.toLowerCase().includes(searchLower) ||
        e.preview.toLowerCase().includes(searchLower)
      )
    }
  }

  return emails
}

/**
 * Récupère les emails réels via Gmail API
 * TODO: Implémenter quand l'API Gmail sera configurée
 */
async function fetchRealEmails(filters?: EmailFilters): Promise<Email[]> {
  // Pour l'instant, on retourne les emails de test même en mode "réel"
  // jusqu'à ce que l'API Gmail soit configurée
  console.warn('Gmail API not configured - using test data as fallback')
  return fetchTestEmails(filters)
}

/**
 * Récupère un email par son ID
 */
export async function fetchEmailById(id: string): Promise<Email | null> {
  if (isTestMode()) {
    const email = USE_V2 ? getTestEmailByIdV2(id) : getTestEmailById(id)
    return email || null
  }

  // TODO: Implémenter la récupération réelle
  const email = USE_V2 ? getTestEmailByIdV2(id) : getTestEmailById(id)
  return email || null
}

/**
 * Marque un email comme lu
 */
export async function markEmailAsRead(id: string): Promise<boolean> {
  if (isTestMode()) {
    // En mode test, on simule juste le succès
    // Dans une vraie app, on mettrait à jour le state local
    return true
  }

  // TODO: Implémenter l'appel API Gmail
  return true
}

/**
 * Marque un email comme non lu
 */
export async function markEmailAsUnread(id: string): Promise<boolean> {
  if (isTestMode()) {
    return true
  }

  // TODO: Implémenter l'appel API Gmail
  return true
}

/**
 * Archive un email
 */
export async function archiveEmail(id: string): Promise<boolean> {
  if (isTestMode()) {
    return true
  }

  // TODO: Implémenter l'appel API Gmail
  return true
}

/**
 * Supprime un email
 */
export async function deleteEmail(id: string): Promise<boolean> {
  if (isTestMode()) {
    return true
  }

  // TODO: Implémenter l'appel API Gmail
  return true
}

/**
 * Récupère le nombre d'emails non lus
 */
export async function getUnreadCount(category?: EmailCategory | 'all'): Promise<number> {
  if (isTestMode()) {
    return USE_V2 ? getTestUnreadCountV2(category) : getTestUnreadCount(category)
  }

  // TODO: Implémenter l'appel API Gmail
  return USE_V2 ? getTestUnreadCountV2(category) : getTestUnreadCount(category)
}

/**
 * Récupère les statistiques des emails
 */
export async function getEmailStats(): Promise<EmailStats> {
  if (isTestMode()) {
    if (USE_V2) {
      return testEmailStatsV2 as EmailStats
    }
    // Convertir les anciennes stats au nouveau format
    return {
      total: testEmailStats.total,
      unread: testEmailStats.unread,
      byCategory: {} as Record<EmailCategory, number>,
      byGroup: {} as Record<EmailCategoryGroup, number>,
      doubtful: testEmailStats.doubt,
      withCv: testEmailStats.cv,
    }
  }

  // TODO: Implémenter les stats réelles
  return testEmailStatsV2 as EmailStats
}

/**
 * Récupère les emails par catégorie
 */
export async function fetchEmailsByCategory(
  category: EmailCategory | 'all'
): Promise<Email[]> {
  if (isTestMode()) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return USE_V2
      ? getTestEmailsByCategoryV2(category)
      : getTestEmailsByCategory(category as EmailCategory | 'all' | 'doubt')
  }

  // TODO: Implémenter avec l'API Gmail
  return USE_V2
    ? getTestEmailsByCategoryV2(category)
    : getTestEmailsByCategory(category as EmailCategory | 'all' | 'doubt')
}

/**
 * Récupère les emails par groupe de catégories
 */
export async function fetchEmailsByGroup(
  group: EmailCategoryGroup | 'all'
): Promise<Email[]> {
  if (isTestMode()) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return getTestEmailsByGroupV2(group)
  }

  // TODO: Implémenter avec l'API Gmail
  return getTestEmailsByGroupV2(group)
}

/**
 * Récupère les emails douteux (confiance < 70%)
 */
export async function fetchDoubtfulEmails(): Promise<Email[]> {
  if (isTestMode()) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return getDoubtfulEmailsV2()
  }

  // TODO: Implémenter avec l'API Gmail
  return getDoubtfulEmailsV2()
}

/**
 * Récupère les emails contenant un CV
 */
export async function fetchEmailsWithCv(): Promise<Email[]> {
  if (isTestMode()) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return getEmailsWithCvV2()
  }

  // TODO: Implémenter avec l'API Gmail
  return getEmailsWithCvV2()
}

/**
 * Compte les emails par catégorie
 */
export async function getEmailCountByCategory(): Promise<Record<EmailCategory, number>> {
  if (isTestMode() && USE_V2) {
    return testEmailStatsV2.byCategory as Record<EmailCategory, number>
  }

  // TODO: Implémenter les stats réelles
  return testEmailStatsV2.byCategory as Record<EmailCategory, number>
}

/**
 * Compte les emails par groupe
 */
export async function getEmailCountByGroup(): Promise<Record<EmailCategoryGroup, number>> {
  if (isTestMode() && USE_V2) {
    return testEmailStatsV2.byGroup as Record<EmailCategoryGroup, number>
  }

  // TODO: Implémenter les stats réelles
  return testEmailStatsV2.byGroup as Record<EmailCategoryGroup, number>
}

/**
 * Reclassifie un email manuellement
 */
export async function reclassifyEmailManually(
  emailId: string,
  newCategory: EmailCategory
): Promise<boolean> {
  // TODO: Implémenter la mise à jour en base
  console.log(`Reclassifying email ${emailId} to ${newCategory}`)
  return true
}
