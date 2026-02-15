import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { loadApplicationDefinitionData } from '@/lib/application-definition-loader'
import { ApplicationDefinitionClient } from './ApplicationDefinitionClient'

export default async function ApplicationDefinitionPage() {
  const data = await loadApplicationDefinitionData()

  return (
    <WorkflowLayout>
      <ApplicationDefinitionClient
        planningBoxes={data.planningBoxes}
        applicationDefinition={data.applicationDefinition}
        components={data.components}
      />
    </WorkflowLayout>
  )
}
