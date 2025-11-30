'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { useState, useRef, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const options = [
    { value: 'light' as const, label: 'Clair', icon: Sun },
    { value: 'dark' as const, label: 'Sombre', icon: Moon },
    { value: 'system' as const, label: 'Système', icon: Monitor },
  ]

  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg
          bg-[var(--surface-default)] hover:bg-[var(--surface-hover)]
          border border-[var(--border-default)]
          text-[var(--text-secondary)] hover:text-[var(--text-primary)]
          transition-all duration-200"
        aria-label="Changer le thème"
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 py-1
          bg-[var(--bg-elevated)] border border-[var(--border-default)]
          rounded-xl shadow-lg z-50
          animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
                transition-colors duration-150
                ${theme === option.value
                  ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                }`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
              {theme === option.value && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
