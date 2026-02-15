'use client'

import { useEffect } from 'react'
import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'
import { Context } from '@/components/context'
import type { ContextProps } from '@/components/context/types'

type ContextClientProps = Omit<ContextProps, 'onBoxClick' | 'onNext'>

export function ContextClient({ planningBoxes, contextDefinition }: ContextClientProps) {
  const { completeCurrentStep, completeStep } = useWorkflow()
  const router = useRouter()

  // Auto-complete step if all boxes are filled
  useEffect(() => {
    const allBoxesCompleted = planningBoxes.every(box => box.isCompleted)
    if (allBoxesCompleted) {
      completeStep('context')
    }
  }, [planningBoxes, completeStep])

  const handleBoxClick = (boxId: string) => {
    // Optional: Could implement modal or detail view
    console.log('Box clicked:', boxId)
  }

  const handleNext = () => {
    completeCurrentStep()
    router.push('/architecture')
  }

  return (
    <WorkflowLayout>
      <Context
        planningBoxes={planningBoxes}
        contextDefinition={contextDefinition}
        onBoxClick={handleBoxClick}
        onNext={handleNext}
      />
    </WorkflowLayout>
  )
}
