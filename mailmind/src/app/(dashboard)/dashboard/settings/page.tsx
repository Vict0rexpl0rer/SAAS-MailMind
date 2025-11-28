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
  Sparkles
} from 'lucide-react'
import { getAISettings, saveAISettings, AIProvider } from '@/lib/ai'

export default function SettingsPage() {
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
      <div className="flex-1 overflow-auto p-6 bg-blue-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Section : Intégration Gmail */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-600" />
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
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
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
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
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
                <label className="block text-sm font-medium text-slate-700">
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
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
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
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
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
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
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
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://console.mistral.ai/api-keys/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Obtenir une clé API Mistral
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
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
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-orange-600" />
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
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-slate-600">
                <p className="font-medium mb-2 text-slate-700">Données envoyées au webhook :</p>
                <pre className="bg-blue-900 text-blue-100 p-3 rounded-md text-xs overflow-x-auto">
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
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Note :</strong> Ces paramètres sont actuellement des placeholders
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
