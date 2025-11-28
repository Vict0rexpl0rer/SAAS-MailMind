/**
 * =============================================================================
 * PAGE - DASHBOARD / EMAILS
 * =============================================================================
 *
 * Page principale pour afficher et gérer les emails.
 * Affiche la liste des emails avec filtres par catégorie.
 *
 * URL : /dashboard/emails
 *
 * =============================================================================
 */

import { Header } from '@/components/layout'
import { EmailList } from '@/components/emails'

export default function EmailsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header de la page */}
      <Header
        title="Emails"
        subtitle="Gérez et classez vos emails entrants"
      />

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        <EmailList />
      </div>
    </div>
  )
}
