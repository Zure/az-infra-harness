import type { ContextProps } from '@/../product/sections/context/types'
import { PlanningBox } from '@/sections/application-definition/components/PlanningBox'
import { ArrowRight } from 'lucide-react'

export function Context({
  planningBoxes,
  onBoxClick,
  onNext,
}: ContextProps) {
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
      <div className="mt-8">
        <button
          onClick={() => onNext?.()}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Continue to Application Architecture
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
