import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'

export default function DecisionsPage() {
  return (
    <WorkflowLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Architecture Decisions
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Review and refine the architecture decisions generated based on your application architecture.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-slate-600 dark:text-slate-400">
            This section will display Architecture Decision Records (ADRs) for your infrastructure choices.
          </p>
        </div>
      </div>
    </WorkflowLayout>
  )
}
