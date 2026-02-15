'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import type { WorkflowStep } from '@/components/shell'

interface WorkflowContextType {
  steps: WorkflowStep[]
  currentStep: number
  completedStepsCount: number
  navigateToStep: (stepId: string) => void
  completeCurrentStep: () => void
  completeStep: (stepId: string) => void
  uncompleteStep: (stepId: string) => void
  isStepClickable: (stepId: string) => boolean
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

// Map route paths to step IDs
const ROUTE_TO_STEP_MAP: Record<string, string> = {
  '/application-definition': 'application-definition',
  '/context': 'context',
  '/architecture': 'architecture',
  '/decisions': 'decisions',
  '/export': 'export',
}

// Get step ID from pathname
function getStepIdFromPathname(pathname: string): string | null {
  return ROUTE_TO_STEP_MAP[pathname] || null
}

// Load workflow state from localStorage
function loadWorkflowState(): { completedSteps: string[]; currentStepNumber: number } | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('workflow-state')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

// Save workflow state to localStorage
function saveWorkflowState(completedSteps: string[], currentStepNumber: number) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('workflow-state', JSON.stringify({ completedSteps, currentStepNumber }))
  } catch {
    // Ignore localStorage errors
  }
}

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [steps, setSteps] = useState<WorkflowStep[]>(WORKFLOW_STEPS)
  const [currentStep, setCurrentStep] = useState(1)
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(new Set())
  const [initialized, setInitialized] = useState(false)

  // Initialize workflow state from localStorage and current route on mount
  useEffect(() => {
    if (initialized) return

    const saved = loadWorkflowState()
    const currentStepId = getStepIdFromPathname(pathname)
    const currentStepObj = WORKFLOW_STEPS.find(s => s.id === currentStepId)

    if (saved && currentStepObj) {
      // Use saved state but sync with current route
      const savedCompletedSteps = new Set(saved.completedSteps)
      const currentStepNum = currentStepObj.number

      setCompletedStepIds(savedCompletedSteps)
      setSteps(WORKFLOW_STEPS.map(s => {
        if (s.number === currentStepNum) {
          return { ...s, status: 'current' as const }
        } else if (savedCompletedSteps.has(s.id)) {
          return { ...s, status: 'completed' as const }
        } else {
          return { ...s, status: 'upcoming' as const }
        }
      }))
      setCurrentStep(currentStepNum)
    } else if (currentStepObj) {
      // No saved state, initialize based on current route
      const currentStepNum = currentStepObj.number
      
      setSteps(WORKFLOW_STEPS.map(s => {
        if (s.number === currentStepNum) {
          return { ...s, status: 'current' as const }
        } else if (s.number < currentStepNum) {
          return { ...s, status: 'completed' as const }
        } else {
          return { ...s, status: 'upcoming' as const }
        }
      }))
      setCurrentStep(currentStepNum)
    }

    setInitialized(true)
  }, [pathname, initialized])

  // Sync workflow state when pathname changes (after initialization)
  useEffect(() => {
    if (!initialized) return

    const currentStepId = getStepIdFromPathname(pathname)
    if (!currentStepId) return

    const stepObj = WORKFLOW_STEPS.find(s => s.id === currentStepId)
    if (!stepObj) return

    setCurrentStep(stepObj.number)
    setSteps(prevSteps =>
      prevSteps.map(s => {
        if (s.number === stepObj.number) {
          return { ...s, status: 'current' as const }
        } else if (completedStepIds.has(s.id)) {
          // Keep completed status for all completed steps
          return { ...s, status: 'completed' as const }
        } else {
          return { ...s, status: 'upcoming' as const }
        }
      })
    )
  }, [pathname, initialized, completedStepIds])

  // Sync step statuses whenever completedStepIds changes
  useEffect(() => {
    if (!initialized) return

    setSteps(prevSteps =>
      prevSteps.map(s => {
        if (completedStepIds.has(s.id) && s.status !== 'current') {
          // Mark as completed if in completedStepIds and not currently active
          return { ...s, status: 'completed' as const }
        }
        return s
      })
    )
  }, [completedStepIds, initialized])

  // Save workflow state whenever it changes
  useEffect(() => {
    if (!initialized) return

    const completedSteps = Array.from(completedStepIds)
    saveWorkflowState(completedSteps, currentStep)
  }, [completedStepIds, currentStep, initialized])

  const navigateToStep = useCallback((stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    if (!step) return

    // Find the highest completed step number
    const maxCompletedStep = Math.max(
      0,
      ...Array.from(completedStepIds).map(id => steps.find(s => s.id === id)?.number || 0)
    )

    // Allow navigation to completed steps OR the next step after the last completed one
    if (completedStepIds.has(stepId) || step.number === maxCompletedStep + 1) {
      setCurrentStep(step.number)
      setSteps(prevSteps =>
        prevSteps.map(s =>
          s.number === step.number
            ? { ...s, status: 'current' }
            : completedStepIds.has(s.id)
            ? { ...s, status: 'completed' }
            : { ...s, status: 'upcoming' }
        )
      )
    }
  }, [steps, completedStepIds])

  const completeCurrentStep = useCallback(() => {
    const currentStepObj = steps.find(s => s.number === currentStep)
    if (currentStepObj) {
      setCompletedStepIds(prev => new Set([...prev, currentStepObj.id]))
    }
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
  }, [currentStep, steps])

  const completeStep = useCallback((stepId: string) => {
    // Mark a specific step as complete (for auto-completion based on data)
    // Only update if not already completed to prevent infinite loops
    setCompletedStepIds(prev => {
      if (prev.has(stepId)) {
        return prev // Already completed, no update needed
      }
      return new Set([...prev, stepId])
    })
  }, [])

  const uncompleteStep = useCallback((stepId: string) => {
    // Remove a step from the completed list
    setCompletedStepIds(prev => {
      if (!prev.has(stepId)) {
        return prev // Not completed, no update needed
      }
      const newSet = new Set(prev)
      newSet.delete(stepId)
      return newSet
    })
  }, [])

  const isStepClickable = useCallback((stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    if (!step) return false

    // Find the highest completed step number
    const maxCompletedStep = Math.max(
      0,
      ...Array.from(completedStepIds).map(id => steps.find(s => s.id === id)?.number || 0)
    )

    // Allow clicking on completed steps OR the next step after the last completed one
    return completedStepIds.has(stepId) || step.number === maxCompletedStep + 1
  }, [steps, completedStepIds])

  return (
    <WorkflowContext.Provider
      value={{
        steps,
        currentStep,
        completedStepsCount: completedStepIds.size,
        navigateToStep,
        completeCurrentStep,
        completeStep,
        uncompleteStep,
        isStepClickable,
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
