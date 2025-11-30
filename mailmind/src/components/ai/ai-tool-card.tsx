/**
 * =============================================================================
 * COMPOSANT AI - TOOL CARD
 * =============================================================================
 *
 * Carte pour afficher un outil IA dans le hub.
 *
 * =============================================================================
 */

'use client'

import Link from 'next/link'
import {
  MessageSquare,
  Mail,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Card } from '@/components/ui'
import { AITool } from '@/types'

const ICON_MAP: Record<string, typeof MessageSquare> = {
  'message-square': MessageSquare,
  mail: Mail,
  'file-text': FileText,
  sparkles: Sparkles,
}

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-500/30',
  },
  green: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-500/30',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-500/30',
  },
  orange: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-500/30',
  },
}

interface AIToolCardProps {
  tool: AITool
}

export function AIToolCard({ tool }: AIToolCardProps) {
  const Icon = ICON_MAP[tool.icon] || Sparkles
  const colors = COLOR_CLASSES[tool.color] || COLOR_CLASSES.blue

  return (
    <Link href={tool.href}>
      <Card
        hoverable
        className="p-6 cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
      >
        <div className="flex items-start gap-4">
          {/* Icône */}
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              ${colors.bg} ${colors.border} border
              transition-transform duration-200 group-hover:scale-110
            `}
          >
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>

          {/* Contenu */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {tool.name}
              </h3>
              {tool.status === 'beta' && (
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--warning-subtle)] text-[var(--warning)] rounded-full">
                  Beta
                </span>
              )}
              {tool.status === 'coming_soon' && (
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--surface-hover)] text-[var(--text-tertiary)] rounded-full">
                  Bientôt
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {tool.description}
            </p>
          </div>

          {/* Flèche */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowRight className="w-5 h-5 text-[var(--text-tertiary)]" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
