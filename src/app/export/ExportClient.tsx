'use client'

import { useEffect } from 'react'
import { Export } from '@/components/export/Export'
import { useWorkflow } from '@/contexts/WorkflowContext'
import type { ExportData } from '@/components/export/types'

interface ExportClientProps {
  data: ExportData
}

export function ExportClient({ data }: ExportClientProps) {
  const { completeStep, uncompleteStep } = useWorkflow()

  // Mark the export step as completed when either bicep or terraform export exists
  // Uncomplete it if neither exists
  useEffect(() => {
    const hasAnyExport = data.bicep.exists || data.terraform.exists
    
    if (hasAnyExport) {
      completeStep('export')
    } else {
      uncompleteStep('export')
    }
  }, [data.bicep.exists, data.terraform.exists, completeStep, uncompleteStep])

  return <Export data={data} />
}
