import type { ApplicationDefinitionProps } from './types'
import { PlanningBox } from './PlanningBox'
import { ComponentsBox } from './ComponentsBox'
import { ContinueButton } from '@/components/shared/ContinueButton'

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
      <ContinueButton
        onClick={() => onNext?.()}
        disabled={!allBoxesCompleted}
        label="Continue to Context"
        disabledMessage="Complete all three planning boxes to continue"
      />
    </div>
  )
}
