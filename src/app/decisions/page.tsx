import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { loadArchitectureDecisionsData } from '@/lib/architecture-decisions-loader'
import { DecisionsClient } from './DecisionsClient'

export default async function DecisionsPage() {
  const data = await loadArchitectureDecisionsData()

  return (
    <WorkflowLayout>
      <DecisionsClient data={data} />
    </WorkflowLayout>
  )
}
