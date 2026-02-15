'use client'

import { ApplicationArchitecture } from '@/components/application-architecture'
import type { ApplicationArchitectureProps } from '@/components/application-architecture/types'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export function ApplicationArchitectureClient(
  props: Omit<ApplicationArchitectureProps, 'onComponentClick' | 'onDeploymentClick' | 'onDiagramClick' | 'onNext'>
) {
  const { completeCurrentStep } = useWorkflow()
  const router = useRouter()

  const handleComponentClick = (componentId: string) => {
    console.log('Component clicked:', componentId)
    // Could navigate to component detail view or trigger action
  }

  const handleDeploymentClick = () => {
    console.log('Deployment box clicked')
    // Could navigate to deployment detail view or trigger action
  }

  const handleDiagramClick = () => {
    console.log('Diagram box clicked')
    // Could navigate to diagram detail view or trigger action
  }

  const handleNext = () => {
    // Mark current step as complete in workflow context
    completeCurrentStep()
    // Navigate to architecture decisions page
    router.push('/decisions')
  }

  return (
    <ApplicationArchitecture
      {...props}
      onComponentClick={handleComponentClick}
      onDeploymentClick={handleDeploymentClick}
      onDiagramClick={handleDiagramClick}
      onNext={handleNext}
    />
  )
}
