'use client'

import { useEffect } from 'react'
import { ApplicationDefinition as ApplicationDefinitionComponent } from '@/components/application-definition'
import type { ApplicationDefinitionProps } from '@/components/application-definition/types'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export function ApplicationDefinitionClient(props: ApplicationDefinitionProps) {
  const { completeCurrentStep, completeStep } = useWorkflow()
  const router = useRouter()

  // Auto-complete step if all boxes are filled
  useEffect(() => {
    const allBoxesCompleted = props.planningBoxes.every(box => box.isCompleted)
    if (allBoxesCompleted) {
      completeStep('application-definition')
    }
  }, [props.planningBoxes, completeStep])

  const handleBoxClick = (boxId: string) => {
    console.log('Box clicked:', boxId)
    // Could navigate to detail view or trigger action
  }

  const handleComponentClick = (componentId: string) => {
    console.log('Component clicked:', componentId)
    // Could navigate to component detail view or trigger action
  }

  const handleNext = () => {
    // Mark current step as complete in workflow context
    completeCurrentStep()
    // Navigate to context page
    router.push('/context')
  }

  return (
    <ApplicationDefinitionComponent
      {...props}
      onBoxClick={handleBoxClick}
      onComponentClick={handleComponentClick}
      onNext={handleNext}
    />
  )
}
