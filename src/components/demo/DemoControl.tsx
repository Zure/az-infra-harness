'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type DemoState = 0 | 1 | 2 | 3 | 4 | 5

interface PageConfig {
  name: string
  states: {
    state: DemoState
    label: string
    description: string
  }[]
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
  '/application-definition': {
    name: 'Application Definition',
    states: [
      { state: 0, label: 'Clean', description: 'Remove all data' },
      { state: 1, label: 'Filled', description: 'Show example data' },
    ],
  },
  '/context': {
    name: 'Context',
    states: [
      { state: 0, label: 'Clean', description: 'Remove all data' },
      { state: 1, label: 'With App Def', description: 'App Definition only' },
      { state: 2, label: 'Filled', description: 'Include Context data' },
    ],
  },
  '/architecture': {
    name: 'Application Architecture',
    states: [
      { state: 0, label: 'Clean', description: 'Remove all data' },
      { state: 2, label: 'With Context', description: 'App Def + Context' },
      { state: 3, label: 'Filled', description: 'Include Architecture' },
    ],
  },
  '/decisions': {
    name: 'Architecture Decisions',
    states: [
      { state: 0, label: 'Clean', description: 'Remove all data' },
      { state: 3, label: 'With Arch', description: 'Up to Architecture' },
      { state: 4, label: 'Filled', description: 'Include ADRs' },
    ],
  },
  '/code-generation': {
    name: 'Code Generation',
    states: [
      { state: 0, label: 'Clean', description: 'Remove all data' },
      { state: 4, label: 'With ADRs', description: 'Ready for code generation' },
      { state: 5, label: 'Complete', description: 'All data including generated code' },
    ],
  },
}

export function DemoControl() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentState, setCurrentState] = useState<DemoState | null>(null)
  const pathname = usePathname()

  // Keyboard shortcut listener (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
      // ESC to close
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  // Fetch current demo state on mount
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch('/api/demo/state')
        if (response.ok) {
          const data = await response.json()
          setCurrentState(data.state)
        }
      } catch (error) {
        console.error('Failed to fetch demo state:', error)
      }
    }
    
    if (isVisible) {
      fetchState()
    }
  }, [isVisible])

  const handleSetState = async (state: DemoState) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/demo/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, currentPath: pathname }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentState(state)
        
        // Clear workflow state from localStorage to reset checkboxes
        localStorage.removeItem('workflow-state')
        
        // Redirect to the appropriate page if API says so
        if (data.redirectTo) {
          window.location.href = data.redirectTo
        } else {
          // Just reload the current page to refresh data
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Failed to set demo state:', error)
      setIsLoading(false) // Only reset loading if there's an error
    }
    // Don't reset loading on success since we're redirecting/reloading anyway
  }

  // Get config for current page or default to all states
  const pageConfig = PAGE_CONFIGS[pathname] || {
    name: 'All Sections',
    states: [
      { state: 0, label: 'Clean', description: 'No data' },
      { state: 1, label: 'Step 1', description: 'Application Definition' },
      { state: 2, label: 'Step 2', description: '+ Context' },
      { state: 3, label: 'Step 3', description: '+ Architecture' },
      { state: 4, label: 'Step 4', description: '+ Decisions' },
      { state: 5, label: 'Complete', description: 'All data' },
    ],
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />

      {/* Floating Modal */}
      <div className="fixed top-4 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              🎭 Demo Mode
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {pageConfig.name}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-2">
            {pageConfig.states.map(({ state, label, description }) => (
              <button
                key={state}
                onClick={() => handleSetState(state)}
                disabled={isLoading || currentState === state}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  currentState === state
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {description}
                    </div>
                  </div>
                  {currentState === state && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Help text */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">Ctrl+Shift+D</kbd> to toggle
            </p>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Applying changes...</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
