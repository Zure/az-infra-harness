import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Server, Database, Network } from 'lucide-react'
import data from '@/../product/sections/application-architecture/data.json'
import type { Component } from '@/../product/sections/application-architecture/types'
import { CopyButton } from '@/sections/application-definition/components/PlanningBox'

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

export default function ComponentDetailView() {
  const { componentId } = useParams<{ componentId: string }>()
  const navigate = useNavigate()
  
  const component = (data.components as Component[]).find((c) => c.id === componentId)

  if (!component) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">Component not found</p>
        </div>
      </div>
    )
  }

  const Icon = typeIcons[component.type]
  const command = `/configure-component ${componentId}`

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => navigate('/sections/application-architecture')}
        className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Application Architecture
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-2">
          <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {component.name}
              </h2>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                {typeLabels[component.type]}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {component.description}
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Content */}
      <div className="space-y-6">
        {component.isConfigured && component.configuration ? (
          <>
            {/* Configuration Details */}
            <div className="rounded-lg border-2 border-blue-500 bg-white p-6 dark:border-blue-600 dark:bg-slate-800">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Azure Service
                  </div>
                  <div className="mt-1 text-base text-slate-900 dark:text-slate-100">
                    {component.configuration.azureService}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    SKU / Tier
                  </div>
                  <div className="mt-1 text-base text-slate-900 dark:text-slate-100">
                    {component.configuration.sku}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Region
                  </div>
                  <div className="mt-1 text-base text-slate-900 dark:text-slate-100">
                    {component.configuration.region}
                  </div>
                </div>

                {Object.keys(component.configuration.settings).length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Settings
                    </div>
                    <div className="space-y-2">
                      {Object.entries(component.configuration.settings).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-2 text-sm">
                          <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Update command */}
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Update this component by running in coding agent:
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
          /* Not configured */
          <div className="rounded-lg border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Configure this component by running in coding agent:
                  </p>
                  <code className="mt-1 block font-mono text-sm text-blue-600 dark:text-blue-400">
                    {command}
                  </code>
                </div>
              </div>
              <CopyButton text={command} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
