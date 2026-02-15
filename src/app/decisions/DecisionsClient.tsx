'use client'

import { useEffect } from 'react'
import { ArchitectureDecisions } from '@/components/architecture-decisions'
import type { ArchitectureDecisionsData } from '@/components/architecture-decisions/types'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

interface DecisionsClientProps {
  data: ArchitectureDecisionsData
}

export function DecisionsClient({ data }: DecisionsClientProps) {
  const { completeCurrentStep, completeStep } = useWorkflow()
  const router = useRouter()

  // Auto-complete step if template and ADRs are complete
  useEffect(() => {
    if (data.template.isCompleted && data.adrsList.isCompleted) {
      completeStep('decisions')
    }
  }, [data.template.isCompleted, data.adrsList.isCompleted, completeStep])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const handleContinue = () => {
    // Mark current step as complete in workflow context
    completeCurrentStep()
    // Navigate to export page
    router.push('/export')
  }

  return (
    <ArchitectureDecisions
      data={data}
      onNavigate={handleNavigate}
      onContinue={handleContinue}
    />
  )
}
