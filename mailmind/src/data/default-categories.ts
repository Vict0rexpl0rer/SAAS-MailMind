/**
 * =============================================================================
 * DONNÉES - CATÉGORIES PAR DÉFAUT
 * =============================================================================
 *
 * Définition des 21 catégories par défaut avec leurs métadonnées.
 * Ces données sont en lecture seule et servent de base pour la configuration
 * personnalisée de chaque utilisateur.
 *
 * =============================================================================
 */

import { EmailCategory, EmailCategoryGroup } from '@/types/email'
import { CategoryMetadata, CategoryGroupMetadata } from '@/types/category'

/**
 * Métadonnées des groupes de catégories
 */
export const categoryGroups: CategoryGroupMetadata[] = [
  {
    id: 'recrutement',
    label: 'Recrutement',
    icon: 'Users',
    color: 'blue',
    order: 1,
  },
  {
    id: 'business',
    label: 'Business',
    icon: 'Briefcase',
    color: 'emerald',
    order: 2,
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageSquare',
    color: 'purple',
    order: 3,
  },
  {
    id: 'indesirables',
    label: 'Indésirables',
    icon: 'ShieldAlert',
    color: 'gray',
    order: 4,
  },
  {
    id: 'autre',
    label: 'Autre',
    icon: 'MoreHorizontal',
    color: 'slate',
    order: 5,
  },
]

/**
 * 21 catégories par défaut avec leurs métadonnées complètes
 */
export const defaultCategories: CategoryMetadata[] = [
  // ==================== RECRUTEMENT (6) ====================
  {
    id: 'cv_spontane',
    label: 'CV spontané',
    labelShort: 'CV Spontané',
    group: 'recrutement',
    color: 'blue',
    icon: 'FileUser',
    order: 1,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'cv_offre',
    label: 'CV en réponse à une offre',
    labelShort: 'CV Offre',
    group: 'recrutement',
    color: 'indigo',
    icon: 'FileCheck',
    order: 2,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'relance_candidat',
    label: 'Relance candidat',
    labelShort: 'Relance',
    group: 'recrutement',
    color: 'cyan',
    icon: 'RotateCcw',
    order: 3,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'refus_candidat',
    label: 'Refus candidat',
    labelShort: 'Refus',
    group: 'recrutement',
    color: 'rose',
    icon: 'UserX',
    order: 4,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'confirmation_entretien',
    label: 'Confirmation entretien',
    labelShort: 'Entretien',
    group: 'recrutement',
    color: 'teal',
    icon: 'CalendarCheck',
    order: 5,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'question_candidat',
    label: 'Question candidat',
    labelShort: 'Question',
    group: 'recrutement',
    color: 'sky',
    icon: 'HelpCircle',
    order: 6,
    isDefault: true,
    isSystemCategory: false,
  },

  // ==================== BUSINESS (6) ====================
  {
    id: 'prospect_chaud',
    label: 'Prospect chaud',
    labelShort: 'Prospect',
    group: 'business',
    color: 'emerald',
    icon: 'Flame',
    order: 1,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'client_existant',
    label: 'Client existant',
    labelShort: 'Client',
    group: 'business',
    color: 'green',
    icon: 'UserCheck',
    order: 2,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'partenaire',
    label: 'Partenaire',
    labelShort: 'Partenaire',
    group: 'business',
    color: 'lime',
    icon: 'Handshake',
    order: 3,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'fournisseur',
    label: 'Fournisseur',
    labelShort: 'Fournisseur',
    group: 'business',
    color: 'amber',
    icon: 'Package',
    order: 4,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'facture_paiement',
    label: 'Facture / Paiement',
    labelShort: 'Facture',
    group: 'business',
    color: 'orange',
    icon: 'Receipt',
    order: 5,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'devis_proposition',
    label: 'Devis / Proposition',
    labelShort: 'Devis',
    group: 'business',
    color: 'yellow',
    icon: 'FileText',
    order: 6,
    isDefault: true,
    isSystemCategory: false,
  },

  // ==================== COMMUNICATION (4) ====================
  {
    id: 'equipe_interne',
    label: 'Équipe interne',
    labelShort: 'Interne',
    group: 'communication',
    color: 'purple',
    icon: 'Users',
    order: 1,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'notification_plateforme',
    label: 'Notification plateforme',
    labelShort: 'Notification',
    group: 'communication',
    color: 'violet',
    icon: 'Bell',
    order: 2,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'newsletter_utile',
    label: 'Newsletter utile',
    labelShort: 'Newsletter',
    group: 'communication',
    color: 'fuchsia',
    icon: 'Newspaper',
    order: 3,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'newsletter_ignorable',
    label: 'Newsletter ignorable',
    labelShort: 'Newsletter -',
    group: 'communication',
    color: 'pink',
    icon: 'MailMinus',
    order: 4,
    isDefault: true,
    isSystemCategory: false,
  },

  // ==================== INDÉSIRABLES (3) ====================
  {
    id: 'spam_evident',
    label: 'Spam évident',
    labelShort: 'Spam',
    group: 'indesirables',
    color: 'red',
    icon: 'ShieldX',
    order: 1,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'pub_promo',
    label: 'Pub / Promo',
    labelShort: 'Pub',
    group: 'indesirables',
    color: 'gray',
    icon: 'Megaphone',
    order: 2,
    isDefault: true,
    isSystemCategory: false,
  },
  {
    id: 'email_automatique',
    label: 'Email automatique',
    labelShort: 'Auto',
    group: 'indesirables',
    color: 'zinc',
    icon: 'Bot',
    order: 3,
    isDefault: true,
    isSystemCategory: false,
  },

  // ==================== AUTRE (2) ====================
  {
    id: 'non_classe',
    label: 'Non classé / À trier',
    labelShort: 'À trier',
    group: 'autre',
    color: 'slate',
    icon: 'Inbox',
    order: 1,
    isDefault: true,
    isSystemCategory: true,
  },
  {
    id: 'doute',
    label: 'Doute',
    labelShort: 'Doute',
    group: 'autre',
    color: 'amber',
    icon: 'AlertCircle',
    order: 2,
    isDefault: true,
    isSystemCategory: true,
  },
]

/**
 * Mapping couleur Tailwind vers classes CSS
 * Pour les badges et éléments colorés
 */
export const categoryColorClasses: Record<string, { bg: string; text: string; bgDark: string; textDark: string }> = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    bgDark: 'dark:bg-blue-900/30',
    textDark: 'dark:text-blue-300',
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    bgDark: 'dark:bg-indigo-900/30',
    textDark: 'dark:text-indigo-300',
  },
  cyan: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-800',
    bgDark: 'dark:bg-cyan-900/30',
    textDark: 'dark:text-cyan-300',
  },
  rose: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    bgDark: 'dark:bg-rose-900/30',
    textDark: 'dark:text-rose-300',
  },
  teal: {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    bgDark: 'dark:bg-teal-900/30',
    textDark: 'dark:text-teal-300',
  },
  sky: {
    bg: 'bg-sky-100',
    text: 'text-sky-800',
    bgDark: 'dark:bg-sky-900/30',
    textDark: 'dark:text-sky-300',
  },
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    bgDark: 'dark:bg-emerald-900/30',
    textDark: 'dark:text-emerald-300',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    bgDark: 'dark:bg-green-900/30',
    textDark: 'dark:text-green-300',
  },
  lime: {
    bg: 'bg-lime-100',
    text: 'text-lime-800',
    bgDark: 'dark:bg-lime-900/30',
    textDark: 'dark:text-lime-300',
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    bgDark: 'dark:bg-amber-900/30',
    textDark: 'dark:text-amber-300',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    bgDark: 'dark:bg-orange-900/30',
    textDark: 'dark:text-orange-300',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    bgDark: 'dark:bg-yellow-900/30',
    textDark: 'dark:text-yellow-300',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    bgDark: 'dark:bg-purple-900/30',
    textDark: 'dark:text-purple-300',
  },
  violet: {
    bg: 'bg-violet-100',
    text: 'text-violet-800',
    bgDark: 'dark:bg-violet-900/30',
    textDark: 'dark:text-violet-300',
  },
  fuchsia: {
    bg: 'bg-fuchsia-100',
    text: 'text-fuchsia-800',
    bgDark: 'dark:bg-fuchsia-900/30',
    textDark: 'dark:text-fuchsia-300',
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    bgDark: 'dark:bg-pink-900/30',
    textDark: 'dark:text-pink-300',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    bgDark: 'dark:bg-red-900/30',
    textDark: 'dark:text-red-300',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    bgDark: 'dark:bg-gray-800/30',
    textDark: 'dark:text-gray-300',
  },
  zinc: {
    bg: 'bg-zinc-100',
    text: 'text-zinc-800',
    bgDark: 'dark:bg-zinc-800/30',
    textDark: 'dark:text-zinc-300',
  },
  slate: {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    bgDark: 'dark:bg-slate-800/30',
    textDark: 'dark:text-slate-300',
  },
}

/**
 * Helper pour obtenir les métadonnées d'une catégorie
 */
export function getCategoryMetadata(categoryId: EmailCategory | string): CategoryMetadata | undefined {
  return defaultCategories.find(c => c.id === categoryId)
}

/**
 * Helper pour obtenir les métadonnées d'un groupe
 */
export function getCategoryGroupMetadata(groupId: EmailCategoryGroup): CategoryGroupMetadata | undefined {
  return categoryGroups.find(g => g.id === groupId)
}

/**
 * Helper pour obtenir les catégories d'un groupe
 */
export function getCategoriesByGroup(groupId: EmailCategoryGroup): CategoryMetadata[] {
  return defaultCategories.filter(c => c.group === groupId).sort((a, b) => a.order - b.order)
}

/**
 * Helper pour obtenir les classes CSS d'une couleur
 */
export function getCategoryColorClasses(color: string): string {
  const classes = categoryColorClasses[color] || categoryColorClasses.slate
  return `${classes.bg} ${classes.text} ${classes.bgDark} ${classes.textDark}`
}

/**
 * Helper pour obtenir le groupe d'une catégorie
 */
export function getCategoryGroup(categoryId: EmailCategory): EmailCategoryGroup {
  const category = getCategoryMetadata(categoryId)
  return category?.group || 'autre'
}

/**
 * Labels des statuts candidats (français)
 */
export const candidateStatusLabels: Record<string, string> = {
  new: 'Nouveau',
  reviewing: 'En revue',
  shortlisted: 'Présélectionné',
  interviewing: 'Entretien',
  offered: 'Offre envoyée',
  hired: 'Recruté',
  rejected: 'Refusé',
}

/**
 * Couleurs des statuts candidats
 */
export const candidateStatusColors: Record<string, string> = {
  new: 'blue',
  reviewing: 'amber',
  shortlisted: 'purple',
  interviewing: 'orange',
  offered: 'indigo',
  hired: 'emerald',
  rejected: 'red',
}
