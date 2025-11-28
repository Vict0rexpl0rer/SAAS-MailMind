/**
 * =============================================================================
 * ROOT LAYOUT
 * =============================================================================
 *
 * Layout racine de l'application MailMind.
 * Définit les métadonnées, la police et la structure HTML de base.
 *
 * =============================================================================
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/**
 * Police Inter - Police moderne et lisible
 * Utilisée par Apple, Figma, et de nombreuses apps modernes
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

/**
 * Métadonnées SEO de l'application
 */
export const metadata: Metadata = {
  title: {
    default: 'MailMind - Organisez vos emails intelligemment',
    template: '%s | MailMind',
  },
  description:
    'MailMind classe automatiquement vos emails et CV grâce à l\'intelligence artificielle. La solution idéale pour les recruteurs et entrepreneurs.',
  keywords: [
    'email',
    'recrutement',
    'CV',
    'intelligence artificielle',
    'automatisation',
    'SaaS',
  ],
  authors: [{ name: 'MailMind' }],
  openGraph: {
    title: 'MailMind - Organisez vos emails intelligemment',
    description:
      'Classez automatiquement vos emails et CV grâce à l\'IA.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
