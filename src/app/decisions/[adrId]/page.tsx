import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { loadADRById } from '@/lib/architecture-decisions-loader'
import { ADRDetailClient } from './ADRDetailClient'
import { notFound } from 'next/navigation'

interface ADRDetailPageProps {
  params: Promise<{
    adrId: string
  }>
}

export default async function ADRDetailPage({ params }: ADRDetailPageProps) {
  const { adrId } = await params
  const adr = await loadADRById(adrId)

  if (!adr) {
    notFound()
  }

  return (
    <WorkflowLayout>
      <ADRDetailClient adr={adr} />
    </WorkflowLayout>
  )
}
