/**
 * =============================================================================
 * PAGE - DASHBOARD / PARAMÈTRES
 * =============================================================================
 *
 * Page de configuration de l'application.
 * Permet de gérer les intégrations (Gmail, OpenAI, Mistral, n8n).
 *
 * URL : /dashboard/settings
 *
 * =============================================================================
 */

'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Badge
} from '@/components/ui'
import {
  Mail,
  Brain,
  Webhook,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Key,
  Link as LinkIcon,
  Sparkles,
  FlaskConical,
  Database,
  Bot,
  ToggleLeft,
  ToggleRight,
  Tags
} from 'lucide-react'
import { getAISettings, saveAISettings, AIProvider } from '@/lib/ai'
import { useTestMode } from '@/contexts/test-mode-context'
import { testEmailStats } from '@/lib/test-mode/mock-emails-extended'
import { mockCVStats } from '@/lib/test-mode/mock-cvs'
import { CategoryManager } from '@/components/categories'

export default function SettingsPage() {
  // Mode test
  const { isTestMode, toggleTestMode, testStats, setShowBanner } = useTestMode()

  // États pour les différentes intégrations
  const [gmailConnected, setGmailConnected] = useState(false)
  const [openaiKey, setOpenaiKey] = useState('')
  const [mistralKey, setMistralKey] = useState('')
  const [preferredProvider, setPreferredProvider] = useState<AIProvider>('openai')
  const [n8nUrl, setN8nUrl] = useState('')

  // États de chargement
  const [isConnectingGmail, setIsConnectingGmail] = useState(false)
  const [isSavingAI, setIsSavingAI] = useState(false)
  const [isSavingN8n, setIsSavingN8n] = useState(false)
  const [aiSaved, setAiSaved] = useState(false)

  // Charger les paramètres AI au montage
  useEffect(() => {
    const settings = getAISettings()
    if (settings.openaiKey) setOpenaiKey(settings.openaiKey)
    if (settings.mistralKey) setMistralKey(settings.mistralKey)
    if (settings.preferredProvider) setPreferredProvider(settings.preferredProvider)
  }, [])

  /**
   * Simule la connexion Gmail
   * Dans le futur, cela déclenchera le flow OAuth Gmail
   */
  const handleConnectGmail = async () => {
    setIsConnectingGmail(true)
    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 1500))
    setGmailConnected(true)
    setIsConnectingGmail(false)
  }

  /**
   * Simule la déconnexion Gmail
   */
  const handleDisconnectGmail = async () => {
    setIsConnectingGmail(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setGmailConnected(false)
    setIsConnectingGmail(false)
  }

  /**
   * Sauvegarde les clés API AI dans localStorage
   */
  const handleSaveAIKeys = async () => {
    setIsSavingAI(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    saveAISettings({
      openaiKey: openaiKey || undefined,
      mistralKey: mistralKey || undefined,
      preferredProvider,
    })

    setIsSavingAI(false)
    setAiSaved(true)
    setTimeout(() => setAiSaved(false), 3000)
  }

  /**
   * Simule la sauvegarde de l'URL n8n
   */
  const handleSaveN8nUrl = async () => {
    setIsSavingN8n(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSavingN8n(false)
    alert('URL webhook n8n sauvegardée (simulation)')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header de la page */}
      <Header
        title="Paramètres"
        subtitle="Configurez vos intégrations et préférences"
      />

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto p-6 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Section : Mode Test / Simulation */}
          <Card className={isTestMode ? 'ring-2 ring-amber-400' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isTestMode ? 'bg-amber-500/20' : 'bg-[var(--bg-tertiary)]'}`}>
                    <FlaskConical className={`w-5 h-5 ${isTestMode ? 'text-amber-500' : 'text-[var(--text-tertiary)]'}`} />
                  </div>
                  <div>
                    <CardTitle>Mode Test / Simulation</CardTitle>
                    <CardDescription>
                      Testez l&apos;application avec des données fictives sans connexion externe
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={isTestMode ? 'warning' : 'default'}>
                  {isTestMode ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Activé
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Désactivé
                    </span>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Toggle principal */}
              <div className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-lg">
                <div className="flex items-center gap-3">
                  {isTestMode ? (
                    <ToggleRight className="w-8 h-8 text-amber-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[var(--text-tertiary)]" />
                  )}
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {isTestMode ? 'Mode Simulation Actif' : 'Mode Production'}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {isTestMode
                        ? 'Utilise des données fictives et simule les réponses IA'
                        : 'Utilise Gmail et OpenAI réels (nécessite configuration)'}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isTestMode ? 'secondary' : 'primary'}
                  onClick={toggleTestMode}
                >
                  {isTestMode ? 'Désactiver' : 'Activer'}
                </Button>
              </div>

              {/* Stats du mode test */}
              {isTestMode && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-lg p-3 text-center">
                    <Database className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{testEmailStats.total}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Emails fictifs</p>
                  </div>
                  <div className="bg-green-500/10 dark:bg-green-500/20 rounded-lg p-3 text-center">
                    <Database className="w-5 h-5 mx-auto text-green-500 mb-1" />
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{mockCVStats.total}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">CVs fictifs</p>
                  </div>
                  <div className="bg-purple-500/10 dark:bg-purple-500/20 rounded-lg p-3 text-center">
                    <Bot className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{testStats.classificationsCount}</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Classifications</p>
                  </div>
                  <div className="bg-orange-500/10 dark:bg-orange-500/20 rounded-lg p-3 text-center">
                    <Bot className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{testStats.chatMessagesCount}</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">Messages chat</p>
                  </div>
                </div>
              )}

              {/* Info box */}
              <div className={`rounded-lg p-4 text-sm ${isTestMode ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}>
                <p className="flex items-start gap-2">
                  <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isTestMode ? 'text-amber-500' : 'text-[var(--accent-primary)]'}`} />
                  <span>
                    {isTestMode ? (
                      <>
                        <strong>Mode Test activé :</strong> Toutes les données sont fictives.
                        Vous pouvez tester toutes les fonctionnalités sans API Gmail ou OpenAI.
                        Quand vous serez prêt, désactivez ce mode et configurez vos clés API ci-dessous.
                      </>
                    ) : (
                      <>
                        <strong>Mode Production :</strong> Pour utiliser l&apos;application avec vos vraies données,
                        configurez votre connexion Gmail et vos clés API ci-dessous.
                        En attendant, vous pouvez activer le mode test pour explorer les fonctionnalités.
                      </>
                    )}
                  </span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {isTestMode && (
                <Button
                  variant="ghost"
                  onClick={() => setShowBanner(true)}
                >
                  Afficher la bannière
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Section : Gestion des Catégories */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Tags className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle>Gestion des Catégories</CardTitle>
                  <CardDescription>
                    Personnalisez vos catégories d&apos;emails : réordonnez, renommez, changez les couleurs
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 text-sm text-[var(--text-secondary)] mb-4">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Glissez-déposez</strong> les catégories pour les réordonner dans chaque groupe.
                    Cliquez sur une catégorie pour modifier son nom ou sa couleur.
                    Les catégories personnalisées peuvent être supprimées.
                  </span>
                </p>
              </div>
              <CategoryManager />
            </CardContent>
          </Card>

          {/* Section : Intégration Gmail */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <CardTitle>Connexion Gmail</CardTitle>
                    <CardDescription>
                      Connectez votre compte Gmail pour importer vos emails
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={gmailConnected ? 'success' : 'default'}>
                  {gmailConnected ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Connecté
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Non connecté
                    </span>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 text-sm text-[var(--text-secondary)]">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>
                    La connexion Gmail vous permettra d&apos;importer automatiquement vos emails
                    et de les classer grâce à l&apos;IA. Vos données restent privées et sécurisées.
                  </span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {gmailConnected ? (
                <Button
                  variant="danger"
                  onClick={handleDisconnectGmail}
                  isLoading={isConnectingGmail}
                >
                  Déconnecter Gmail
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleConnectGmail}
                  isLoading={isConnectingGmail}
                >
                  <Mail className="w-4 h-4" />
                  Connecter Gmail
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Section : Configuration IA */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle>Configuration IA</CardTitle>
                    <CardDescription>
                      Configurez vos clés API pour les outils IA (ChatGPT ou Mistral)
                    </CardDescription>
                  </div>
                </div>
                {aiSaved && (
                  <Badge variant="success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Sauvegardé
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sélection du provider préféré */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Provider préféré
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredProvider('openai')}
                    className={`
                      flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${preferredProvider === 'openai'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-secondary)]'
                      }
                    `}
                  >
                    <Brain className="w-4 h-4 inline mr-2" />
                    OpenAI (ChatGPT)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredProvider('mistral')}
                    className={`
                      flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${preferredProvider === 'mistral'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-secondary)]'
                      }
                    `}
                  >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Mistral AI
                  </button>
                </div>
              </div>

              {/* Clé OpenAI */}
              <div className="space-y-2">
                <Input
                  label="Clé API OpenAI"
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                />
                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-primary)] hover:underline"
                  >
                    Obtenir une clé API OpenAI
                  </a>
                </div>
              </div>

              {/* Clé Mistral */}
              <div className="space-y-2">
                <Input
                  label="Clé API Mistral"
                  type="password"
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                  value={mistralKey}
                  onChange={(e) => setMistralKey(e.target.value)}
                />
                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://console.mistral.ai/api-keys/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-primary)] hover:underline"
                  >
                    Obtenir une clé API Mistral
                  </a>
                </div>
              </div>

              <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 text-sm text-[var(--text-secondary)]">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>
                    Vos clés API sont stockées localement dans votre navigateur.
                    Vous pouvez configurer les deux providers et basculer entre eux à tout moment.
                  </span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                onClick={handleSaveAIKeys}
                isLoading={isSavingAI}
                disabled={!openaiKey && !mistralKey}
              >
                <Key className="w-4 h-4" />
                Sauvegarder les clés API
              </Button>
            </CardFooter>
          </Card>

          {/* Section : Webhook n8n */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle>Webhook n8n</CardTitle>
                  <CardDescription>
                    Configurez un webhook n8n pour automatiser vos workflows
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="URL du webhook"
                type="url"
                placeholder="https://votre-instance.n8n.io/webhook/xxx"
                value={n8nUrl}
                onChange={(e) => setN8nUrl(e.target.value)}
                helperText="L'URL sera appelée lors de la réception de nouveaux CVs"
              />
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 text-sm text-[var(--text-secondary)]">
                <p className="font-medium mb-2 text-[var(--text-primary)]">Données envoyées au webhook :</p>
                <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-3 rounded-md text-xs overflow-x-auto">
{`{
  "type": "new_cv",
  "candidate": {
    "name": "...",
    "email": "...",
    "position": "...",
    "skills": [...]
  },
  "email": {
    "subject": "...",
    "from": "..."
  }
}`}
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                onClick={handleSaveN8nUrl}
                isLoading={isSavingN8n}
                disabled={!n8nUrl}
              >
                <LinkIcon className="w-4 h-4" />
                Sauvegarder l&apos;URL
              </Button>
            </CardFooter>
          </Card>

          {/* Note d'information */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl p-4 text-sm text-[var(--text-secondary)]">
            <p className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-[var(--text-primary)]">Note :</strong> Ces paramètres sont actuellement des placeholders
                pour le MVP. Les intégrations réelles seront disponibles dans une
                prochaine version.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
