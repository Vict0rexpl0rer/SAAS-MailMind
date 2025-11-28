/**
 * =============================================================================
 * DONNÉES MOCKÉES - CANDIDATS
 * =============================================================================
 *
 * Ces données simulent les candidats extraits des CVs reçus par email.
 * Dans le futur, ces données seront créées automatiquement par OpenAI
 * lors de l'analyse des CVs.
 *
 * =============================================================================
 */

import { Candidate } from '@/types'

/**
 * Liste de candidats de démonstration
 * Couvre différents profils, statuts et niveaux d'expérience
 */
export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@gmail.com',
    phone: '+33 6 12 34 56 78',
    position: 'Développeuse Full Stack',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    experienceLevel: 'mid',
    yearsOfExperience: 4,
    location: 'Paris, France',
    status: 'new',
    source: 'email',
    sourceEmailId: 'email-001',
    cvUrl: '/uploads/cv/CV_Marie_Dupont.pdf',
    cvFileName: 'CV_Marie_Dupont.pdf',
    aiSummary: 'Développeuse polyvalente avec 4 ans d\'expérience. Solide expertise en React et Node.js. A travaillé sur des projets e-commerce et SaaS.',
    matchScore: 92,
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T09:30:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
  },
  {
    id: 'cand-002',
    firstName: 'Thomas',
    lastName: 'Bernard',
    email: 'thomas.bernard@outlook.com',
    phone: '+33 6 98 76 54 32',
    position: 'Chef de Projet Digital',
    skills: ['Gestion de projet', 'Agile', 'Scrum', 'Jira', 'Communication'],
    experienceLevel: 'senior',
    yearsOfExperience: 8,
    location: 'Lyon, France',
    status: 'shortlisted',
    source: 'email',
    sourceEmailId: 'email-002',
    cvUrl: '/uploads/cv/Thomas_Bernard_CV_2024.pdf',
    cvFileName: 'Thomas_Bernard_CV_2024.pdf',
    aiSummary: 'Chef de projet expérimenté avec 8 ans dans le digital. Expert en méthodologies agiles. A géré des équipes de 10+ personnes.',
    matchScore: 88,
    notes: 'Très bon profil, disponible immédiatement',
    createdAt: new Date('2024-01-15T08:15:00'),
    updatedAt: new Date('2024-01-15T14:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
  },
  {
    id: 'cand-003',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin.pro@gmail.com',
    phone: '+33 6 55 44 33 22',
    position: 'UX Designer',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design System', 'Adobe XD'],
    experienceLevel: 'mid',
    yearsOfExperience: 5,
    location: 'Bordeaux, France',
    status: 'interviewing',
    source: 'email',
    sourceEmailId: 'email-003',
    cvUrl: '/uploads/cv/CV_Sophie_Martin_UX.pdf',
    cvFileName: 'CV_Sophie_Martin_UX.pdf',
    aiSummary: 'Designer UX créative avec forte sensibilité utilisateur. Portfolio impressionnant avec des projets B2B et B2C.',
    matchScore: 95,
    notes: 'Entretien prévu le 18/01 à 10h',
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  },
  {
    id: 'cand-004',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@yahoo.fr',
    phone: '+33 6 11 22 33 44',
    position: 'Développeur Backend (Stage)',
    skills: ['Python', 'Django', 'SQL', 'Git', 'Linux'],
    experienceLevel: 'junior',
    yearsOfExperience: 0,
    location: 'Toulouse, France',
    status: 'reviewing',
    source: 'email',
    sourceEmailId: 'email-004',
    cvUrl: '/uploads/cv/CV_Lucas_Petit.pdf',
    cvFileName: 'CV_Lucas_Petit.pdf',
    aiSummary: 'Étudiant motivé en dernière année d\'école d\'ingénieur. Projets personnels intéressants en Python.',
    matchScore: 75,
    createdAt: new Date('2024-01-14T11:20:00'),
    updatedAt: new Date('2024-01-14T11:20:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
  },
  {
    id: 'cand-005',
    firstName: 'Emma',
    lastName: 'Lefevre',
    email: 'emma.lefevre@gmail.com',
    phone: '+33 6 77 88 99 00',
    position: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
    experienceLevel: 'senior',
    yearsOfExperience: 6,
    location: 'Nantes, France',
    status: 'offered',
    source: 'form',
    cvUrl: '/uploads/cv/CV_Emma_Lefevre.pdf',
    cvFileName: 'CV_Emma_Lefevre.pdf',
    aiSummary: 'Data Scientist expérimentée avec expertise en ML. A déployé des modèles en production chez plusieurs startups.',
    matchScore: 98,
    notes: 'Offre envoyée le 14/01, en attente de réponse',
    createdAt: new Date('2024-01-10T14:00:00'),
    updatedAt: new Date('2024-01-14T16:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  {
    id: 'cand-006',
    firstName: 'Alexandre',
    lastName: 'Moreau',
    email: 'alex.moreau@proton.me',
    phone: '+33 6 33 22 11 00',
    position: 'DevOps Engineer',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Docker'],
    experienceLevel: 'senior',
    yearsOfExperience: 7,
    location: 'Remote',
    status: 'hired',
    source: 'linkedin',
    cvUrl: '/uploads/cv/CV_Alexandre_Moreau.pdf',
    cvFileName: 'CV_Alexandre_Moreau.pdf',
    aiSummary: 'Expert DevOps avec certifications AWS et GCP. A mis en place des infrastructures scalables pour des licornes.',
    matchScore: 96,
    notes: 'Commence le 01/02/2024',
    createdAt: new Date('2024-01-05T10:00:00'),
    updatedAt: new Date('2024-01-12T09:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre',
  },
  {
    id: 'cand-007',
    firstName: 'Julie',
    lastName: 'Girard',
    email: 'julie.girard@gmail.com',
    position: 'Product Manager',
    skills: ['Product Strategy', 'User Stories', 'Analytics', 'Roadmap', 'A/B Testing'],
    experienceLevel: 'lead',
    yearsOfExperience: 10,
    location: 'Paris, France',
    status: 'rejected',
    source: 'email',
    cvUrl: '/uploads/cv/CV_Julie_Girard.pdf',
    cvFileName: 'CV_Julie_Girard.pdf',
    aiSummary: 'Product Manager senior avec expérience dans des scale-ups. Forte culture data et orientée résultats.',
    matchScore: 70,
    notes: 'Profil surqualifié pour le poste proposé',
    createdAt: new Date('2024-01-08T11:00:00'),
    updatedAt: new Date('2024-01-10T15:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julie',
  },
  {
    id: 'cand-008',
    firstName: 'Nicolas',
    lastName: 'Blanc',
    email: 'n.blanc@startup.io',
    phone: '+33 6 44 55 66 77',
    position: 'Frontend Developer',
    skills: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Testing'],
    experienceLevel: 'mid',
    yearsOfExperience: 3,
    location: 'Marseille, France',
    status: 'new',
    source: 'form',
    cvUrl: '/uploads/cv/CV_Nicolas_Blanc.pdf',
    cvFileName: 'CV_Nicolas_Blanc.pdf',
    aiSummary: 'Développeur frontend passionné par Vue.js. Contribue à des projets open source.',
    matchScore: 85,
    createdAt: new Date('2024-01-15T12:00:00'),
    updatedAt: new Date('2024-01-15T12:00:00'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas',
  },
]

/**
 * Fonction helper pour filtrer les candidats par statut
 */
export function getCandidatesByStatus(status: string): Candidate[] {
  if (status === 'all') return mockCandidates
  return mockCandidates.filter(candidate => candidate.status === status)
}

/**
 * Fonction helper pour obtenir le nombre de candidats par statut
 */
export function getCandidateCountByStatus(status: string): number {
  if (status === 'all') return mockCandidates.length
  return mockCandidates.filter(c => c.status === status).length
}

/**
 * Statistiques des candidats
 */
export const candidateStats = {
  total: mockCandidates.length,
  new: mockCandidates.filter(c => c.status === 'new').length,
  reviewing: mockCandidates.filter(c => c.status === 'reviewing').length,
  shortlisted: mockCandidates.filter(c => c.status === 'shortlisted').length,
  interviewing: mockCandidates.filter(c => c.status === 'interviewing').length,
  offered: mockCandidates.filter(c => c.status === 'offered').length,
  hired: mockCandidates.filter(c => c.status === 'hired').length,
  rejected: mockCandidates.filter(c => c.status === 'rejected').length,
}

/**
 * Labels pour les statuts (affichage UI)
 */
export const statusLabels: Record<string, string> = {
  new: 'Nouveau',
  reviewing: 'En revue',
  shortlisted: 'Présélectionné',
  interviewing: 'Entretien',
  offered: 'Offre envoyée',
  hired: 'Recruté',
  rejected: 'Refusé',
}

/**
 * Couleurs pour les statuts (classes Tailwind)
 */
export const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-purple-100 text-purple-800',
  interviewing: 'bg-orange-100 text-orange-800',
  offered: 'bg-indigo-100 text-indigo-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}
