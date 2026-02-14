import { WorkflowLayout } from '@/components/layouts/WorkflowLayout'

export default function ArchitecturePage() {
  return (
    <WorkflowLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Application Architecture
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Define your application&apos;s components - compute, storage, networking, security, and monitoring.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-slate-600 dark:text-slate-400">
            This section will contain component configuration for your Azure infrastructure.
          </p>
        </div>
      </div>
    </WorkflowLayout>
  )
}
