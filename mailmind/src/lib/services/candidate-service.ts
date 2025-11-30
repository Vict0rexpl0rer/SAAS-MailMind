/**
 * =============================================================================
 * SERVICE CANDIDAT UNIFIÉ
 * =============================================================================
 *
 * Ce service gère les candidats.
 * Il bascule automatiquement entre les données de test et les données réelles
 * selon la configuration du mode test.
 *
 * =============================================================================
 */

import { Candidate, CandidateFilters, CandidateStatus, CreateCandidateInput } from '@/types'
import { isTestMode } from '@/lib/test-mode/config'
import { generateMockCandidates, allMockCVs, cvDataToCandidate } from '@/lib/test-mode/mock-cvs'
import { mockCandidates, candidateStats } from '@/data/mock-candidates'

// Combiner les candidats existants avec ceux générés depuis les CVs
function getAllTestCandidates(): Candidate[] {
  const generatedCandidates = generateMockCandidates()

  // Créer un Set des emails existants pour éviter les doublons
  const existingEmails = new Set(mockCandidates.map(c => c.email))

  // Ajouter seulement les candidats générés qui n'existent pas déjà
  const newCandidates = generatedCandidates.filter(c => !existingEmails.has(c.email))

  return [...mockCandidates, ...newCandidates]
}

/**
 * Récupère tous les candidats (test ou réels)
 */
export async function fetchCandidates(filters?: CandidateFilters): Promise<Candidate[]> {
  if (isTestMode()) {
    return fetchTestCandidates(filters)
  }
  return fetchRealCandidates(filters)
}

/**
 * Récupère les candidats de test
 */
async function fetchTestCandidates(filters?: CandidateFilters): Promise<Candidate[]> {
  // Simuler un léger délai réseau
  await new Promise(resolve => setTimeout(resolve, 300))

  let candidates = getAllTestCandidates()

  if (filters) {
    // Filtrer par statut
    if (filters.status && filters.status !== 'all') {
      candidates = candidates.filter(c => c.status === filters.status)
    }

    // Filtrer par niveau d'expérience
    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      candidates = candidates.filter(c => c.experienceLevel === filters.experienceLevel)
    }

    // Filtrer par compétence
    if (filters.skill) {
      const skillLower = filters.skill.toLowerCase()
      candidates = candidates.filter(c =>
        c.skills.some(s => s.toLowerCase().includes(skillLower))
      )
    }

    // Recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      candidates = candidates.filter(c =>
        c.firstName.toLowerCase().includes(searchLower) ||
        c.lastName.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower) ||
        c.position.toLowerCase().includes(searchLower)
      )
    }

    // Filtrer par score minimum
    if (filters.minMatchScore !== undefined) {
      candidates = candidates.filter(c =>
        (c.matchScore ?? 0) >= filters.minMatchScore!
      )
    }
  }

  // Trier par date de création décroissante
  return candidates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

/**
 * Récupère les candidats réels via Supabase
 * TODO: Implémenter quand la DB sera configurée
 */
async function fetchRealCandidates(filters?: CandidateFilters): Promise<Candidate[]> {
  // Pour l'instant, on retourne les candidats de test
  console.warn('Database not configured - using test data as fallback')
  return fetchTestCandidates(filters)
}

/**
 * Récupère un candidat par son ID
 */
export async function fetchCandidateById(id: string): Promise<Candidate | null> {
  if (isTestMode()) {
    const candidates = getAllTestCandidates()
    return candidates.find(c => c.id === id) || null
  }

  // TODO: Implémenter la récupération réelle
  const candidates = getAllTestCandidates()
  return candidates.find(c => c.id === id) || null
}

/**
 * Récupère un candidat par l'ID de son email source
 */
export async function fetchCandidateByEmailId(emailId: string): Promise<Candidate | null> {
  if (isTestMode()) {
    const candidates = getAllTestCandidates()
    return candidates.find(c => c.sourceEmailId === emailId) || null
  }

  // TODO: Implémenter la récupération réelle
  const candidates = getAllTestCandidates()
  return candidates.find(c => c.sourceEmailId === emailId) || null
}

/**
 * Crée un nouveau candidat
 */
export async function createCandidate(input: CreateCandidateInput): Promise<Candidate> {
  if (isTestMode()) {
    // En mode test, on crée un candidat fictif
    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      ...input,
      experienceLevel: input.experienceLevel || 'mid',
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${input.firstName}`,
    }
    return newCandidate
  }

  // TODO: Implémenter la création réelle en BDD
  throw new Error('Database not configured')
}

/**
 * Met à jour le statut d'un candidat
 */
export async function updateCandidateStatus(
  id: string,
  status: CandidateStatus
): Promise<Candidate | null> {
  if (isTestMode()) {
    // En mode test, on simule la mise à jour
    const candidate = await fetchCandidateById(id)
    if (candidate) {
      return { ...candidate, status, updatedAt: new Date() }
    }
    return null
  }

  // TODO: Implémenter la mise à jour réelle
  return null
}

/**
 * Met à jour les notes d'un candidat
 */
export async function updateCandidateNotes(
  id: string,
  notes: string
): Promise<Candidate | null> {
  if (isTestMode()) {
    const candidate = await fetchCandidateById(id)
    if (candidate) {
      return { ...candidate, notes, updatedAt: new Date() }
    }
    return null
  }

  // TODO: Implémenter la mise à jour réelle
  return null
}

/**
 * Supprime un candidat
 */
export async function deleteCandidate(id: string): Promise<boolean> {
  if (isTestMode()) {
    return true
  }

  // TODO: Implémenter la suppression réelle
  return false
}

/**
 * Récupère les statistiques des candidats
 */
export async function getCandidateStats() {
  if (isTestMode()) {
    const candidates = getAllTestCandidates()
    return {
      total: candidates.length,
      new: candidates.filter(c => c.status === 'new').length,
      reviewing: candidates.filter(c => c.status === 'reviewing').length,
      shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
      interviewing: candidates.filter(c => c.status === 'interviewing').length,
      offered: candidates.filter(c => c.status === 'offered').length,
      hired: candidates.filter(c => c.status === 'hired').length,
      rejected: candidates.filter(c => c.status === 'rejected').length,
    }
  }

  // TODO: Implémenter les stats réelles
  return candidateStats
}

/**
 * Récupère les candidats par statut
 */
export async function fetchCandidatesByStatus(
  status: CandidateStatus | 'all'
): Promise<Candidate[]> {
  return fetchCandidates({ status })
}

/**
 * Récupère le nombre de candidats par statut
 */
export async function getCandidateCountByStatus(
  status: CandidateStatus | 'all'
): Promise<number> {
  const candidates = await fetchCandidates(
    status === 'all' ? undefined : { status }
  )
  return candidates.length
}
