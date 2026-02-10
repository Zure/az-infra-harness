import { AppShell, type WorkflowStep } from './components/AppShell'

export default function ShellPreview() {
  const steps: WorkflowStep[] = [
    { id: 'app-overview', number: 1, label: 'Application Overview', status: 'completed' },
    { id: 'compute', number: 2, label: 'Compute', status: 'completed' },
    { id: 'data-storage', number: 3, label: 'Data Storage', status: 'current' },
    { id: 'networking', number: 4, label: 'Networking', status: 'upcoming' },
    { id: 'security', number: 5, label: 'Security & Identity', status: 'upcoming' },
    { id: 'monitoring', number: 6, label: 'Monitoring & Observability', status: 'upcoming' },
    { id: 'cicd', number: 7, label: 'CI/CD & Deployment', status: 'upcoming' },
  ]

  return (
    <AppShell
      steps={steps}
      currentStep={3}
      onNavigate={(stepId) => console.log('Navigate to:', stepId)}
    >
      <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Data Storage Requirements
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Let's determine what data storage your application needs.
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              What type of data will your application store?
            </label>
            <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
              <option>Select data type...</option>
              <option>Relational data (tables, SQL)</option>
              <option>Document/JSON data</option>
              <option>Files and blobs</option>
              <option>Key-value pairs</option>
              <option>Time-series data</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              What's your expected data volume?
            </label>
            <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
              <option>Select volume...</option>
              <option>Small (&lt; 10 GB)</option>
              <option>Medium (10-100 GB)</option>
              <option>Large (100 GB - 1 TB)</option>
              <option>Very Large (&gt; 1 TB)</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
              Back
            </button>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Continue
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
