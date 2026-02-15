'use client'

import type { ContextProps } from './types'
import { PlanningBox } from '@/components/application-definition/PlanningBox'
import { ContinueButton } from '@/components/shared/ContinueButton'

export function Context({
  planningBoxes,
  onBoxClick,
  onNext,
}: ContextProps) {
  // Check if all boxes are completed
  const allBoxesCompleted = planningBoxes.every(box => box.isCompleted)

  return (
    <div className="mx-auto max-w-4xl">
      {/* Simple header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Context
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Define the landscape your application will be deployed into
        </p>
      </div>

      {/* Planning boxes */}
      <div className="space-y-6">
        {planningBoxes.map((box) => (
          <PlanningBox key={box.id} box={box} onClick={onBoxClick} />
        ))}
      </div>

      {/* Next stage button */}
      <ContinueButton
        onClick={() => onNext?.()}
        disabled={!allBoxesCompleted}
        label="Continue to Application Architecture"
        disabledMessage="Complete all context boxes to continue"
      />
    </div>
  )
}
