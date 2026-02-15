'use client'

import { Terminal, CheckCircle2, Circle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/shared/CopyButton'
import type { PlanningBox as PlanningBoxType } from './types'

interface PlanningBoxProps {
  box: PlanningBoxType
  onClick?: (boxId: string) => void
}

export function PlanningBox({ box, onClick }: PlanningBoxProps) {
  const handleClick = () => {
    onClick?.(box.id)
  }

  // Blue border for completed, grey for incomplete
  const borderColor = box.isCompleted
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  return (
    <div
      className={`group relative cursor-pointer rounded-lg border-2 bg-white p-6 transition-all hover:shadow-md dark:bg-slate-800 ${borderColor}`}
      onClick={handleClick}
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
            {box.title}
          </h3>
        </div>
      </div>

      {/* Content area */}
      <div className="ml-8">
        {box.isCompleted && box.content ? (
          <>
            {/* Render markdown content */}
            <div className="mb-4 prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h1:mb-3 prose-h2:text-xl prose-h2:mb-2 prose-h2:mt-4 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
              <ReactMarkdown>{box.content}</ReactMarkdown>
            </div>
            
            {/* Show update command even for filled boxes - grey text */}
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Update this section by running in coding agent:
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
          // Show command prompt for empty boxes - blue text
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div className="min-w-0">
                {box.description && (
                  <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                    {box.description}
                  </p>
                )}
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
