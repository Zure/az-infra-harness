import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'

export interface WorkflowStep {
  id: string
  number: number
  label: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface AppShellProps {
  children: React.ReactNode
  steps: WorkflowStep[]
  currentStep: number
  onNavigate?: (stepId: string) => void
}

export function AppShell({ children, steps, currentStep, onNavigate }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const currentStepData = steps.find(s => s.number === currentStep)

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
      {/* Full-width header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="px-4 sm:px-6 py-4 flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Azure Infra Prompt Kit
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {/* Show current step on mobile */}
              <span className="md:hidden">
                Step {currentStep} of {steps.length}: {currentStepData?.label}
              </span>
              <span className="hidden md:inline">Infrastructure Planning</span>
            </p>
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - hidden on mobile by default, shown when menu open */}
        <Sidebar 
          steps={steps} 
          currentStep={currentStep}
          onNavigate={(stepId) => {
            onNavigate?.(stepId)
            setIsSidebarOpen(false) // Close sidebar after navigation on mobile
          }}
          isOpen={isSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
