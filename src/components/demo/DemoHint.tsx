'use client'

import { useState, useEffect } from 'react'

/**
 * A subtle hint that appears briefly to inform users about the demo mode
 * Only shows once per session
 */
export function DemoHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has already seen the hint
    const hasSeenHint = sessionStorage.getItem('demo-hint-dismissed')
    
    if (!hasSeenHint) {
      // Show hint after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      // Auto-hide after 8 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 10000)

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    } else {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('demo-hint-dismissed', 'true')
  }

  if (isDismissed || !isVisible) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-30 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs animate-in slide-in-from-bottom-4 fade-in duration-500"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-xl">
          🎭
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium">Demo Mode Available</p>
          <p className="text-xs opacity-90 mt-1">
            Press <kbd className="px-1 py-0.5 bg-white/20 rounded text-xs font-mono">Cmd+Shift+D</kbd> to quickly switch data states
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
