import { Terminal, CheckCircle2, Circle, FileText } from 'lucide-react'
import { CopyButton } from '@/sections/application-definition/components/PlanningBox'
import type { ADRsListBox as ADRsListBoxType } from '@/../product/sections/architecture-decisions/types'

interface ADRsListBoxProps {
  box: ADRsListBoxType
  onADRClick: (adrId: string) => void
}

export function ADRsListBox({ box, onADRClick }: ADRsListBoxProps) {
  // Blue border for completed, grey for incomplete
  const borderColor = box.isCompleted
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  return (
    <div
      className={`group relative rounded-lg border-2 bg-white p-6 transition-all dark:bg-slate-800 ${borderColor}`}
    >
      {/* Header with checkmark and title */}
      <div className="mb-4 flex items-start gap-3">
        <div className="pt-0.5">
          {box.isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          ) : (
            <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Architecture Decision Records
          </h3>
          {box.isCompleted && box.adrs.length > 0 && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {box.adrs.length} {box.adrs.length === 1 ? 'ADR' : 'ADRs'} generated
            </p>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="ml-8">
        {box.isCompleted && box.adrs.length > 0 ? (
          <>
            {/* List of ADRs */}
            <div className="mb-4 space-y-2">
              {box.adrs.map((adr) => (
                <button
                  key={adr.id}
                  onClick={() => onADRClick(adr.id)}
                  className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white p-3 text-left transition-all hover:border-blue-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500"
                >
                  <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="flex-1 text-sm text-slate-900 dark:text-slate-100">
                    {adr.title}
                  </span>
                  <svg 
                    className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Show update command for filled box - grey text */}
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Update ADRs by running in coding agent:
                  </p>
                  <code className="mt-1 block font-mono text-xs text-slate-500 dark:text-slate-400">
                    {box.command}
                  </code>
                </div>
              </div>
              <CopyButton text={box.command} />
            </div>
          </>
        ) : (
          // Show command prompt for empty box - blue text
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Run in coding agent:
                </p>
                <code className="mt-1 block font-mono text-sm text-blue-600 dark:text-blue-400">
                  {box.command}
                </code>
              </div>
            </div>
            <CopyButton text={box.command} />
          </div>
        )}
      </div>
    </div>
  )
}
