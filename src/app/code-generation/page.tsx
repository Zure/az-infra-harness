import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { loadExportData } from '@/lib/export-loader'
import { ExportClient } from './ExportClient'

export default async function ExportPage() {
  const data = await loadExportData()

  return (
    <WorkflowLayout>
      <ExportClient data={data} />
    </WorkflowLayout>
  )
}
