'use client'

import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'
import { Context } from '@/components/context'
import type { ContextProps } from '@/components/context/types'

type ContextClientProps = Omit<ContextProps, 'onBoxClick' | 'onNext'>

export function ContextClient({ planningBoxes, contextDefinition }: ContextClientProps) {
  const { completeCurrentStep } = useWorkflow()
  const router = useRouter()

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
