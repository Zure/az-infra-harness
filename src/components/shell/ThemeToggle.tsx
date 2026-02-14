'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9" />
    )
  }

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    console.log('Current theme:', theme, 'Resolved:', resolvedTheme, 'Setting to:', newTheme)
    setTheme(newTheme)
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      aria-label="Toggle theme"
      title={`Current theme: ${resolvedTheme || 'loading'}`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
