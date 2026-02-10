import React from 'react'
import { Check } from 'lucide-react'
import type { WorkflowStep } from './AppShell'

export interface MainNavProps {
  steps: WorkflowStep[]
  currentStep: number
  onNavigate?: (stepId: string) => void
}

export function MainNav({ steps, currentStep, onNavigate }: MainNavProps) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Azure Infra Prompt Kit
            </h1>
          </div>

          {/* Workflow Stepper - Desktop */}
          <nav className="hidden md:flex items-center space-x-2" aria-label="Workflow progress">
            {steps.map((step, index) => {
              const isClickable = step.status === 'completed' && onNavigate
              const isActive = step.number === currentStep

              return (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <div className="h-px w-8 bg-slate-300 dark:bg-slate-600" />
                  )}
                  
                  <button
                    onClick={() => isClickable && onNavigate(step.id)}
                    disabled={!isClickable}
                    title={step.label}
                    className={`
                      flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : step.status === 'completed'
                        ? 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                        : 'text-slate-400 dark:text-slate-500'
                      }
                      ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {/* Step Number/Icon */}
                    <span
                      className={`
                        flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold
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

                    {/* Step Label - show on medium screens and up */}
                    <span className="hidden md:inline">{step.label}</span>
                  </button>
                </React.Fragment>
              )
            })}
          </nav>

          {/* Mobile Stepper */}
          <div className="md:hidden flex flex-col items-end">
            <div className="text-xs text-slate-500 dark:text-slate-500">
              Step {currentStep} of {steps.length}
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {steps.find(s => s.number === currentStep)?.label}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
