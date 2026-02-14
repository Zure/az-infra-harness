'use client'

import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'
import { useWorkflow } from '@/contexts/WorkflowContext'
import { useRouter } from 'next/navigation'

export default function ApplicationDefinitionPage() {
  const { completeCurrentStep } = useWorkflow()
  const router = useRouter()

  const handleContinue = () => {
    completeCurrentStep()
    router.push('/context')
  }

  return (
    <WorkflowLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Application Definition
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Define the core characteristics of your application to inform infrastructure planning.
          </p>
        </div>

        {/* Theme Test Box */}
        <div className="rounded-lg border-2 border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-slate-800 p-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-cyan-400 mb-2">
            Theme Test
          </h2>
          <p className="text-blue-700 dark:text-cyan-300">
            If dark mode is working, this box should have:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-cyan-200">
            <li>• Light mode: Blue background with blue border</li>
            <li>• Dark mode: Dark background with cyan border</li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-slate-600 dark:text-slate-400">
            This section will contain guided questions about your application&apos;s name, description, type, and key features.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Continue to Context
          </button>
        </div>
      </div>
    </WorkflowLayout>
  )
}
