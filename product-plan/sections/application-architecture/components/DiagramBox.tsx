import { CheckCircle2, Circle, Terminal } from 'lucide-react'
import { CopyButton } from '@/sections/application-definition/components/PlanningBox'
import { MermaidDiagram } from './MermaidDiagram'

interface DiagramBoxProps {
  title: string
  command: string
  isConfigured: boolean
  content: string | null
  onClick?: () => void
}

export function DiagramBox({ title, command, isConfigured, content, onClick }: DiagramBoxProps) {
  const handleClick = () => {
    onClick?.()
  }

  const borderColor = isConfigured
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  // Extract mermaid code from markdown code block
  const extractMermaidCode = (markdown: string | null): string | null => {
    if (!markdown) return null
    const match = markdown.match(/```mermaid\n([\s\S]*?)\n```/)
    return match ? match[1] : null
  }

  const mermaidCode = extractMermaidCode(content)

  return (
    <div
      className={`cursor-pointer rounded-lg border-2 bg-white p-6 transition-all hover:shadow-md dark:bg-slate-800 ${borderColor}`}
      onClick={handleClick}
    >
      {/* Header with checkmark and title */}
      <div className="mb-4 flex items-start gap-3">
        <div className="pt-0.5">
          {isConfigured ? (
            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          ) : (
            <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        </div>
      </div>

      {/* Content area */}
      <div className="ml-8">
        {isConfigured && mermaidCode ? (
          <>
            {/* Render mermaid diagram */}
            <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <MermaidDiagram chart={mermaidCode} />
            </div>
            
            {/* Show update command */}
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Update diagram by running in coding agent:
                  </p>
                  <code className="mt-1 block font-mono text-xs text-slate-500 dark:text-slate-400">
                    {command}
                  </code>
                </div>
              </div>
              <CopyButton text={command} />
            </div>
          </>
        ) : (
          // Show command prompt for empty box
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Run in coding agent:
                </p>
                <code className="mt-1 block font-mono text-sm text-blue-600 dark:text-blue-400">
                  {command}
                </code>
              </div>
            </div>
            <CopyButton text={command} />
          </div>
        )}
      </div>
    </div>
  )
}
