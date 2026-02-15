import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { loadApplicationArchitectureData } from '@/lib/application-architecture-loader'
import { ApplicationArchitectureClient } from './ApplicationArchitectureClient'

export default async function ArchitecturePage() {
  const data = await loadApplicationArchitectureData()

  return (
    <WorkflowLayout>
      <ApplicationArchitectureClient
        components={data.components}
        deployment={data.deployment}
        architectureDiagram={data.architectureDiagram}
      />
    </WorkflowLayout>
  )
}
