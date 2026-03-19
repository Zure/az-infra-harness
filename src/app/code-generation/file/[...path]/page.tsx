import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { ExportFileDetailClient } from './ExportFileDetailClient'

interface ExportFilePageProps {
  params: Promise<{
    path: string[]
  }>
  searchParams: Promise<{
    tool?: string
  }>
}

export default async function ExportFilePage({ params, searchParams }: ExportFilePageProps) {
  const { path: pathSegments } = await params
  const { tool } = await searchParams

  const filePath = pathSegments.join('/')
  const selectedTool = tool === 'terraform' ? 'terraform' : 'bicep'

  return (
    <WorkflowLayout>
      <ExportFileDetailClient filePath={filePath} tool={selectedTool} />
    </WorkflowLayout>
  )
}
