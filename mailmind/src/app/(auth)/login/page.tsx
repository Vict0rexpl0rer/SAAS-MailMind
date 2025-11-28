/**
 * =============================================================================
 * PAGE DE CONNEXION
 * =============================================================================
 *
 * Page de connexion avec authentification Google via Supabase.
 * Design minimaliste style Apple pour une expérience utilisateur premium.
 *
 * FONCTIONNEMENT :
 * 1. L'utilisateur clique sur "Se connecter avec Google"
 * 2. Supabase redirige vers Google OAuth
 * 3. Après authentification, Google redirige vers /auth/callback
 * 4. Le callback échange le code contre une session
 * 5. L'utilisateur est redirigé vers /dashboard/emails
 *
 * =============================================================================
 */

import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      {/* Container principal */}
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          {/* Logo MailMind */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
            MailMind
          </h1>
          <p className="mt-2 text-slate-600">
            Organisez vos emails et candidatures intelligemment
          </p>
        </div>

        {/* Card de connexion */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          <h2 className="text-xl font-medium text-slate-900 text-center mb-6">
            Connexion
          </h2>

          {/* Formulaire de connexion (Client Component) */}
          <LoginForm />

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">
                Première visite ?
              </span>
            </div>
          </div>

          {/* Information */}
          <p className="text-center text-sm text-slate-600">
            Votre compte sera créé automatiquement lors de votre première connexion avec Google.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          En vous connectant, vous acceptez nos{' '}
          <a href="#" className="text-slate-700 hover:underline">
            conditions d&apos;utilisation
          </a>{' '}
          et notre{' '}
          <a href="#" className="text-slate-700 hover:underline">
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </div>
  )
}
