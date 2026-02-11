import type { ApplicationDefinitionProps } from '@/../product/sections/application-definition/types'
import { PlanningBox } from './PlanningBox'
import { ComponentsBox } from './ComponentsBox'
import { ArrowRight } from 'lucide-react'

export function ApplicationDefinition({
  planningBoxes,
  components,
  onBoxClick,
  onComponentClick,
  onRefresh,
}: ApplicationDefinitionProps) {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Simple header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Application Definition
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Define the core characteristics of your application
        </p>
      </div>

      {/* Planning boxes */}
      <div className="space-y-6">
        {planningBoxes.map((box) => {
          // Use ComponentsBox for the application-components box
          if (box.id === 'application-components') {
            return (
              <ComponentsBox
                key={box.id}
                title={box.title}
                command={box.command}
                isCompleted={box.isCompleted}
                components={components}
                onComponentClick={onComponentClick}
              />
            )
          }
          
          // Use regular PlanningBox for other boxes
          return <PlanningBox key={box.id} box={box} onClick={onBoxClick} />
        })}
      </div>

      {/* Next stage button */}
      <div className="mt-8">
        <button
          onClick={() => onRefresh?.()}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Continue to Context
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
