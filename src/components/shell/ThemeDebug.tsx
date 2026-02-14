'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeDebug() {
  const [mounted, setMounted] = useState(false)
  const [htmlClass, setHtmlClass] = useState('')
  const { theme, resolvedTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Watch for class changes on html element
    const observer = new MutationObserver(() => {
      setHtmlClass(document.documentElement.className)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    setHtmlClass(document.documentElement.className)
    
    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return <div className="text-xs text-slate-500">Loading theme...</div>
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 p-3 rounded-lg shadow-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Theme Debug</div>
      <div>theme: {theme || 'undefined'}</div>
      <div>resolvedTheme: {resolvedTheme || 'undefined'}</div>
      <div>systemTheme: {systemTheme || 'undefined'}</div>
      <div className="mt-2">
        HTML class: &quot;{htmlClass}&quot;
      </div>
      <div className="mt-2 text-xs">
        {htmlClass.includes('dark') ? '🌙 Dark class present' : '☀️ No dark class'}
      </div>
    </div>
  )
}
