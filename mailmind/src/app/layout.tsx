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
import { Open_Sans } from 'next/font/google'
import './globals.css'

/**
 * Police Open Sans - Police moderne et très lisible
 * Variable font avec weights de 300 à 800
 */
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
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
    <html lang="fr" className={openSans.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
