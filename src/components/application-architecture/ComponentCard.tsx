import { ChevronRight, Server, Database, Network, CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'
import type { Component } from './types'

interface ComponentCardProps {
  component: Component
  onClick?: (componentId: string) => void
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

export function ComponentCard({ component, onClick }: ComponentCardProps) {
  const Icon = typeIcons[component.type]
  
  const borderColor = component.isConfigured
    ? 'border-blue-500 dark:border-blue-600'
    : 'border-slate-300 dark:border-slate-600'

  const handleClick = () => {
    onClick?.(component.id)
  }

  return (
    <Link
      href={`/architecture/${component.id}`}
      onClick={handleClick}
      className={`block w-full rounded-lg border-2 bg-white p-4 transition-all hover:shadow-md dark:bg-slate-800 ${borderColor}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon and status indicator */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <Icon className="h-6 w-6 text-slate-400 dark:text-slate-500 shrink-0" />
          {component.isConfigured ? (
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {component.name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              {typeLabels[component.type]}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            {component.description}
          </p>

          {/* Configuration summary */}
          {component.isConfigured && component.configuration ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {component.configuration.azureService}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {component.configuration.sku}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {component.configuration.region}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-500">
              Not configured
            </div>
          )}
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 mt-1 shrink-0" />
      </div>
    </Link>
  )
}
