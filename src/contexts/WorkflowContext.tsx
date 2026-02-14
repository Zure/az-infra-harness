'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { WorkflowStep } from '@/components/shell'

interface WorkflowContextType {
  steps: WorkflowStep[]
  currentStep: number
  navigateToStep: (stepId: string) => void
  completeCurrentStep: () => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'application-definition',
    number: 1,
    label: 'Application Definition',
    status: 'current',
  },
  {
    id: 'context',
    number: 2,
    label: 'Context',
    status: 'upcoming',
  },
  {
    id: 'architecture',
    number: 3,
    label: 'Application Architecture',
    status: 'upcoming',
  },
  {
    id: 'decisions',
    number: 4,
    label: 'Architecture Decisions',
    status: 'upcoming',
  },
  {
    id: 'export',
    number: 5,
    label: 'Export',
    status: 'upcoming',
  },
]

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<WorkflowStep[]>(WORKFLOW_STEPS)
  const [currentStep, setCurrentStep] = useState(1)

  const navigateToStep = useCallback((stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    if (step && step.status === 'completed') {
      setCurrentStep(step.number)
      setSteps(prevSteps =>
        prevSteps.map(s =>
          s.number === step.number
            ? { ...s, status: 'current' }
            : s.number < step.number
            ? { ...s, status: 'completed' }
            : { ...s, status: 'upcoming' }
        )
      )
    }
  }, [steps])

  const completeCurrentStep = useCallback(() => {
    setSteps(prevSteps =>
      prevSteps.map(s =>
        s.number === currentStep
          ? { ...s, status: 'completed' }
          : s.number === currentStep + 1
          ? { ...s, status: 'current' }
          : s
      )
    )
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }, [currentStep, steps.length])

  return (
    <WorkflowContext.Provider
      value={{
        steps,
        currentStep,
        navigateToStep,
        completeCurrentStep,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}
