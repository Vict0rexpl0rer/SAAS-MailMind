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
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
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
              <h3 className="text-lg font-semibold text-slate-900">
                {tool.name}
              </h3>
              {tool.status === 'beta' && (
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                  Beta
                </span>
              )}
              {tool.status === 'coming_soon' && (
                <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">
                  Bientôt
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {tool.description}
            </p>
          </div>

          {/* Flèche */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
