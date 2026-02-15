'use client'

import { Terminal, Server, Database, Network, CheckCircle2, Circle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Component } from './types'
import { CopyButton } from '@/components/shared/CopyButton'

interface ComponentDetailProps {
  component: Component
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

/**
 * Renders a single setting row with label and value
 */
function SettingRow({ label, value }: { label: string; value: unknown }) {
  // Format the value for display
  const displayValue = typeof value === 'object' && value !== null
    ? JSON.stringify(value, null, 2)
    : String(value)

  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[140px]">
        {label}:
      </span>
      <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">
        {displayValue}
      </span>
    </div>
  )
}

export function ComponentDetail({ component }: ComponentDetailProps) {
  const Icon = typeIcons[component.type]
  const command = `/configure-component ${component.id}`

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back button */}
      <Link 
        href="/architecture"
        className="inline-flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Application Architecture
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-2">
          <div className="pt-0.5">
            {component.isConfigured ? (
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            ) : (
              <Circle className="h-6 w-6 text-slate-300 dark:text-slate-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {component.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                {typeLabels[component.type]}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {component.description}
            </p>
          </div>
        </div>
      </div>

      {/* Configuration details or prompt */}
      {component.isConfigured && component.configuration ? (
        <>
          {/* Configuration details */}
          <div className="mb-6 rounded-lg border-2 border-blue-500 bg-white p-6 dark:border-blue-600 dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Azure Configuration
            </h3>
            <div className="space-y-0">
              <SettingRow label="Azure Service" value={component.configuration.azureService} />
              <SettingRow label="SKU/Tier" value={component.configuration.sku} />
              <SettingRow label="Region" value={component.configuration.region} />
              
              {/* Settings */}
              {Object.entries(component.configuration.settings).map(([key, value]) => (
                <SettingRow 
                  key={key} 
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                  value={value} 
                />
              ))}
            </div>
          </div>

          {/* Update command */}
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Update this configuration by running in coding agent:
                </p>
                <code className="mt-1 block font-mono text-sm text-slate-500 dark:text-slate-400">
                  {command}
                </code>
              </div>
            </div>
            <CopyButton text={command} />
          </div>
        </>
      ) : (
        // Show command prompt for unconfigured component
        <div className="rounded-lg border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Not Yet Configured
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            This component hasn't been configured yet. Run the command below in your coding agent to configure the Azure infrastructure for this component.
          </p>
          <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Run in coding agent:
                </p>
                <code className="mt-2 block font-mono text-sm text-blue-600 dark:text-blue-400">
                  {command}
                </code>
              </div>
            </div>
            <CopyButton text={command} />
          </div>
        </div>
      )}
    </div>
  )
}
