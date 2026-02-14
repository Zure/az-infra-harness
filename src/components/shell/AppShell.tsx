'use client'

import { useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'

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

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* GitHub link */}
            <a
              href="https://github.com/zure/azure-infra-prompt-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
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
            
            {/* Attribution */}
            <div className="mt-12 flex items-center justify-center gap-1.5 text-xs text-slate-300 dark:text-slate-600">
              <span>Made with</span>
              <svg 
                className="h-3 w-3 text-red-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-label="love"
              >
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>for the Azure community by</span>
              <a 
                href="https://zure.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                <svg 
                  className="h-3.5 w-auto" 
                  viewBox="0 0 100 25" 
                  fill="currentColor"
                  aria-label="Zure"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.88759 0.5H40.4611L36.3204 15.9534C36.0933 16.8002 36.8757 17.4876 37.944 17.4876C39.0123 17.4876 39.9643 16.8002 40.1914 15.9534L44.3326 0.5H53.1805L49.0397 15.9534C47.7758 20.6702 44.0182 24.5 37.2414 24.5C30.4647 24.5 26.2092 20.6707 27.4731 15.9534L31.6138 0.5L13.7895 15.4561H26.2823L23.9922 24.0027H0.280273L18.1045 9.04661H5.59803L7.88759 0.5ZM91.4228 24.0027H72.6212L78.9183 0.5H97.72L96.0024 6.90996H86.0486L85.4761 9.04661H94.324L92.6064 15.4566H83.7586L83.1861 17.5932H93.1398L91.4223 24.0032L91.4228 24.0027ZM67.9475 0.5C72.831 0.5 75.4832 5.39764 74.2193 10.1149C73.5096 12.7631 71.7159 14.7946 69.4152 16.0672L72.6212 24.0027H62.9727L61.2551 17.5927H59.4969L57.7794 24.0027H48.9315L55.2287 0.5H67.9475ZM64.0182 6.90996C65.2389 6.90996 65.9734 7.86754 65.6575 9.04661C65.3415 10.2257 64.0938 11.1833 62.8731 11.1833H61.214L62.359 6.90996H64.0182Z" />
                </svg>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
