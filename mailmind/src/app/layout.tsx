/**
 * =============================================================================
 * ROOT LAYOUT
 * =============================================================================
 *
 * Layout racine de l'application MailMind.
 * Définit les métadonnées, la police et la structure HTML de base.
 * Intègre le ThemeProvider pour le support dark/light mode.
 * Intègre le TestModeProvider pour la simulation sans API externes.
 *
 * =============================================================================
 */

import type { Metadata } from 'next'
import { Inter, Notable } from 'next/font/google'
import { ThemeProvider } from '@/contexts/theme-context'
import { TestModeProvider } from '@/contexts/test-mode-context'
import './globals.css'

/**
 * Police Inter - Police moderne recommandée par le design system
 * Variable font avec weights de 400 à 700
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '500', '600', '700'],
})

/**
 * Police Notable - Pour le branding MIRA
 */
const notable = Notable({
  subsets: ['latin'],
  variable: '--font-notable',
  weight: ['400'],
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
    <html lang="fr" className={`${inter.variable} ${notable.variable}`} suppressHydrationWarning>
      <head>
        {/* Script pour éviter le flash de thème incorrect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('mailmind-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored === 'dark' || (stored === 'system' && prefersDark) || (!stored && prefersDark) ? 'dark' : 'light';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider>
          <TestModeProvider>
            {children}
          </TestModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
