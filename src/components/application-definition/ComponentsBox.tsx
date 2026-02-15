import { Terminal, CheckCircle2, Circle, Server, Database, Network, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { CopyButton } from './PlanningBox'
import type { Component } from './types'

interface ComponentsBoxProps {
  title: string
  command: string
  description?: string
  isCompleted: boolean
  components: Component[]
  onComponentClick?: (componentId: string) => void
}

function ComponentCard({ component, onClick }: { component: Component; onClick?: (id: string) => void }) {
  const handleClick = () => {
    onClick?.(component.id)
  }

  // Icon based on component type
  const Icon = component.type === 'compute' ? Server : component.type === 'data' ? Database : Network

  // Badge color based on type
  const badgeColor =
    component.type === 'compute'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      : component.type === 'data'
        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'

  // Badge text
  const badgeText =
    component.type === 'compute' ? 'Compute' : component.type === 'data' ? 'Data' : 'Networking'

  return (
    <div
      className="group cursor-pointer rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-700">
          <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{component.name}</h4>
            <ChevronRight className="h-5 w-5 text-slate-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </div>

          {/* Type badge */}
          <div className="mb-2">
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badgeColor}`}>
              {badgeText}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{component.description}</p>
        </div>
      </div>
    </div>
  )
}

export function ComponentsBox({ title, command, description, isCompleted, components, onComponentClick }: ComponentsBoxProps) {
  // Blue border for completed, grey for incomplete
  const borderColor = isCompleted
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  return (
    <div
      className={`relative rounded-lg border-2 bg-white p-6 dark:bg-slate-800 ${borderColor}`}
    >
      {/* Header with checkmark and title */}
      <div className="mb-4 flex items-start gap-3">
        <div className="pt-0.5">
          {isCompleted ? (
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
        {isCompleted && components.length > 0 ? (
          <>
            {/* Component cards grid */}
            <div className="mb-4 grid gap-3">
              {components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onClick={onComponentClick}
                />
              ))}
            </div>

            {/* Show update command even for filled boxes - grey text */}
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
          // Show command prompt for empty boxes - blue text
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div className="min-w-0">
                {description && (
                  <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                )}
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
