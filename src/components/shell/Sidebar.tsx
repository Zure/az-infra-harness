'use client'

import { Check } from 'lucide-react'
import type { WorkflowStep } from './AppShell'

export interface SidebarProps {
  steps: WorkflowStep[]
  currentStep: number
  onNavigate?: (stepId: string) => void
  isOpen?: boolean
  isStepClickable?: (stepId: string) => boolean
}

export function Sidebar({ steps, currentStep, onNavigate, isOpen = false, isStepClickable }: SidebarProps) {
  return (
    <aside 
      className={`
        w-64 h-full border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 flex flex-col
        fixed md:relative inset-y-0 left-0 z-30 md:z-0
        transform transition-transform duration-200 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Workflow Steps */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Workflow progress">
        <div className="space-y-1">
          {steps.map((step) => {
            // Use the isStepClickable function from context if available, otherwise fall back to completed check
            const isClickable = isStepClickable 
              ? isStepClickable(step.id) && onNavigate
              : step.status === 'completed' && onNavigate
            const isActive = step.number === currentStep

            return (
              <button
                key={step.id}
                onClick={() => isClickable && onNavigate?.(step.id)}
                disabled={!isClickable}
                className={`
                  w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                    : isClickable
                    ? 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                    : 'text-slate-400 dark:text-slate-500'
                  }
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {/* Step Number/Icon */}
                <span
                  className={`
                    flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold mt-0.5
                    ${isActive
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : step.status === 'completed'
                      ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400'
                      : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                    }
                  `}
                >
                  {step.status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </span>

                {/* Step Label */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {step.label}
                  </div>
                  {isActive && (
                    <div className="mt-0.5 text-xs text-blue-600 dark:text-blue-400">
                      Current step
                    </div>
                  )}
                  {step.status === 'completed' && !isActive && (
                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                      Completed
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Footer - Progress indicator */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>Progress</span>
          <span>
            {steps.filter(s => s.status === 'completed').length} of {steps.length}
          </span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
            style={{
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`
            }}
          />
        </div>
      </div>
    </aside>
  )
}
