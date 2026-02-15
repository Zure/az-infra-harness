'use client'

import { ApplicationDefinition as ApplicationDefinitionComponent } from '@/components/application-definition'
import type { ApplicationDefinitionProps } from '@/components/application-definition/types'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export function ApplicationDefinitionClient(props: ApplicationDefinitionProps) {
  const { completeCurrentStep } = useWorkflow()
  const router = useRouter()

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
