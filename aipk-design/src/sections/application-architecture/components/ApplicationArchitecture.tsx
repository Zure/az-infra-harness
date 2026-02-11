import type { ApplicationArchitectureProps } from '@/../product/sections/application-architecture/types'
import { ComponentCard } from './ComponentCard'
import { PlanningBox } from '@/sections/application-definition/components/PlanningBox'
import { DiagramBox } from './DiagramBox'
import { ArrowRight } from 'lucide-react'

export function ApplicationArchitecture({
  components,
  deployment,
  architectureDiagram,
  onComponentClick,
  onDeploymentClick,
  onDiagramClick,
  onNext,
}: ApplicationArchitectureProps) {
  // Group components by type
  const computeComponents = components.filter((c) => c.type === 'compute')
  const dataComponents = components.filter((c) => c.type === 'data')
  const networkingComponents = components.filter((c) => c.type === 'networking')

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Application Architecture
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Configure Azure infrastructure for each component
        </p>
      </div>

      {/* Compute Components */}
      {computeComponents.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Compute
          </h3>
          <div className="space-y-3">
            {computeComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onClick={onComponentClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Data Components */}
      {dataComponents.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Data
          </h3>
          <div className="space-y-3">
            {dataComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onClick={onComponentClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Networking Components */}
      {networkingComponents.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Networking
          </h3>
          <div className="space-y-3">
            {networkingComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onClick={onComponentClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Deployment Strategy Box */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Deployment
        </h3>
        <PlanningBox
          box={{
            id: 'deployment',
            title: 'Deployment Strategy',
            command: deployment.command,
            isCompleted: deployment.isConfigured,
            content: deployment.content,
          }}
          onClick={() => onDeploymentClick?.()}
        />
      </div>

      {/* Architecture Diagram Box */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Architecture Diagram
        </h3>
        <DiagramBox
          title="Architecture Diagram"
          command={architectureDiagram.command}
          isConfigured={architectureDiagram.isConfigured}
          content={architectureDiagram.content}
          onClick={() => onDiagramClick?.()}
        />
      </div>

      {/* Next stage button */}
      <div className="mt-8">
        <button
          onClick={() => onNext?.()}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Continue to Architecture Decisions
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
