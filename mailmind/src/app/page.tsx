/**
 * =============================================================================
 * PAGE D'ACCUEIL
 * =============================================================================
 *
 * Landing page de MailMind.
 * Redirige automatiquement les utilisateurs connectés vers le dashboard.
 *
 * =============================================================================
 */

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Mail, Users, Zap, Shield, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  // Vérifie si l'utilisateur est connecté
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si connecté, redirige vers le dashboard
  if (user) {
    redirect('/dashboard/emails')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">MailMind</span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Organisez vos emails.
            <br />
            <span className="text-slate-500">Recrutez plus vite.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            MailMind classe automatiquement vos emails et CV grâce à l&apos;intelligence
            artificielle. Concentrez-vous sur l&apos;essentiel : trouver les meilleurs talents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Découvrir les fonctionnalités
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
            MailMind combine la puissance de l&apos;IA avec une interface épurée
            pour simplifier votre quotidien de recruteur.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Classement automatique
              </h3>
              <p className="text-slate-600 text-sm">
                L&apos;IA analyse vos emails et les classe automatiquement :
                CV, messages, spam, urgents.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Gestion des candidats
              </h3>
              <p className="text-slate-600 text-sm">
                Visualisez tous vos candidats dans un tableau de bord intuitif
                avec leur statut et leurs compétences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Extraction intelligente
              </h3>
              <p className="text-slate-600 text-sm">
                Les informations des CVs sont extraites automatiquement :
                compétences, expérience, contact.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Sécurisé
              </h3>
              <p className="text-slate-600 text-sm">
                Vos données sont chiffrées et sécurisées. Connexion via Google
                pour une authentification fiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à transformer votre recrutement ?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Rejoignez les recruteurs qui gagnent des heures chaque semaine
              grâce à MailMind.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-colors"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Mail className="w-4 h-4" />
            <span>MailMind - MVP 2024</span>
          </div>
          <p className="text-slate-400 text-sm">
            Développé avec Next.js, Tailwind CSS et Supabase
          </p>
        </div>
      </footer>
    </div>
  )
}
