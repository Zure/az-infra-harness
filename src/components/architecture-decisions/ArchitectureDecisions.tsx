import { PlanningBox } from '@/components/application-definition/PlanningBox'
import { ADRsListBox } from './ADRsListBox'
import { ContinueButton } from '@/components/shared/ContinueButton'
import type { ArchitectureDecisionsData } from './types'

interface ArchitectureDecisionsProps {
  data: ArchitectureDecisionsData
  onNavigate: (path: string) => void
  onContinue: () => void
}

export function ArchitectureDecisions({ 
  data, 
  onNavigate,
  onContinue 
}: ArchitectureDecisionsProps) {
  const handleADRClick = (adrId: string) => {
    onNavigate(`/decisions/${adrId}`)
  }

  // Convert template to PlanningBox format
  const templateBox = {
    id: 'adr-template',
    title: 'ADR Template',
    command: data.template.command,
    isCompleted: data.template.isCompleted,
    content: data.template.content
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Architecture Decisions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Define the ADR template and generate architecture decision records for your infrastructure
        </p>
      </div>

      {/* Box 1: ADR Template */}
      <PlanningBox box={templateBox} />

      {/* Box 2: ADRs List */}
      <ADRsListBox 
        box={data.adrsList} 
        onADRClick={handleADRClick}
      />

      {/* Continue button */}
      <ContinueButton
        onClick={onContinue}
        disabled={!data.template.isCompleted || !data.adrsList.isCompleted}
        label="Continue to Export"
        disabledMessage="Complete the ADR template and generate ADRs to continue"
      />
    </div>
  )
}
