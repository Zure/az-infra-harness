import { Terminal, ChevronRight, Server, Database, Network } from 'lucide-react'
import type { Component } from '../types'
import { CopyButton } from './PlanningBox'

interface ComponentsBoxProps {
  title: string
  command: string
  isCompleted: boolean
  components: Component[]
  onComponentClick?: (componentId: string) => void
}

const typeIcons = {
  compute: Server,
  data: Database,
  networking: Network,
}

const typeLabels = {
  compute: 'Compute',
  data: 'Data',
  networking: 'Networking',
}

export function ComponentsBox({ title, command, isCompleted, components, onComponentClick }: ComponentsBoxProps) {
  const borderColor = isCompleted
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  return (
    <div className={`rounded-lg border-2 bg-white p-6 dark:bg-slate-800 ${borderColor}`}>
      {/* Header with checkmark and title */}
      <div className="mb-4 flex items-start gap-3">
        <div className="pt-0.5">
          {isCompleted ? (
            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center dark:bg-blue-400">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
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
        {isCompleted && components.length > 0 ? (
          <>
            {/* Component list */}
            <div className="mb-4 space-y-2">
              {components.map((component) => {
                const Icon = typeIcons[component.type]
                return (
                  <button
                    key={component.id}
                    onClick={() => onComponentClick?.(component.id)}
                    className="w-full flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-600 dark:hover:bg-slate-800"
                  >
                    <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {component.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                          {typeLabels[component.type]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {component.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                  </button>
                )
              })}
            </div>
            
            {/* Show update command */}
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Update components by running in coding agent:
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
