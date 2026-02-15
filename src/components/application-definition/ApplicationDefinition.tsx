import type { ApplicationDefinitionProps } from './types'
import { PlanningBox } from './PlanningBox'
import { ComponentsBox } from './ComponentsBox'
import { ArrowRight } from 'lucide-react'

export function ApplicationDefinition({
  planningBoxes,
  components,
  onBoxClick,
  onComponentClick,
  onNext,
}: ApplicationDefinitionProps) {
  // Check if all planning boxes are completed
  const allBoxesCompleted = planningBoxes.every(box => box.isCompleted)
  
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
          // Use ComponentsBox for application-components
          if (box.id === 'application-components') {
            return (
              <ComponentsBox
                key={box.id}
                title={box.title}
                command={box.command}
                description={box.description}
                isCompleted={box.isCompleted}
                components={components}
                onComponentClick={onComponentClick}
              />
            )
          }
          // Use PlanningBox for other boxes
          return <PlanningBox key={box.id} box={box} onClick={onBoxClick} />
        })}
      </div>

      {/* Next stage button */}
      <div className="mt-8">
        <button
          onClick={() => onNext?.()}
          disabled={!allBoxesCompleted}
          className={`w-full flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold transition-all ${
            allBoxesCompleted
              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
          }`}
          title={!allBoxesCompleted ? 'Complete all planning boxes to continue' : 'Continue to Context'}
        >
          Continue to Context
          <ArrowRight className="h-5 w-5" />
        </button>
        {!allBoxesCompleted && (
          <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
            Complete all three planning boxes to continue
          </p>
        )}
      </div>
    </div>
  )
}
