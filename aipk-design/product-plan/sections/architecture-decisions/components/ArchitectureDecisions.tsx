import { PlanningBox } from '@/sections/application-definition/components/PlanningBox'
import { ADRsListBox } from './ADRsListBox'
import type { ArchitectureDecisionsData } from '../types'

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
    onNavigate(`/sections/architecture-decisions/${adrId}`)
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

      {/* Continue button - show only if both boxes are completed */}
      {data.template.isCompleted && data.adrsList.isCompleted && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onContinue}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Continue to Export →
          </button>
        </div>
      )}
    </div>
  )
}
