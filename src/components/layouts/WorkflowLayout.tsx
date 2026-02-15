'use client'

import { AppShell } from '@/components/shell'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export function WorkflowLayout({ children }: { children: React.ReactNode }) {
  const { steps, currentStep, navigateToStep, isStepClickable } = useWorkflow()
  const router = useRouter()

  const handleNavigate = (stepId: string) => {
    navigateToStep(stepId)
    router.push(`/${stepId}`)
  }

  return (
    <AppShell
      steps={steps}
      currentStep={currentStep}
      onNavigate={handleNavigate}
      isStepClickable={isStepClickable}
    >
      {children}
    </AppShell>
  )
}
