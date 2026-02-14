'use client'

import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export default function ContextPage() {
  const { completeCurrentStep } = useWorkflow()
  const router = useRouter()

  const handleContinue = () => {
    completeCurrentStep()
    router.push('/architecture')
  }

  return (
    <WorkflowLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Context
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Define the landscape your application lives in - enterprise landing zone, greenfield, or hybrid setup.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-slate-600 dark:text-slate-400">
            This section will contain questions about your infrastructure context and organizational setup.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => router.push('/application-definition')}
            className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Continue to Architecture
          </button>
        </div>
      </div>
    </WorkflowLayout>
  )
}
