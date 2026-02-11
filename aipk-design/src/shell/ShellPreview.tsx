import { AppShell, type WorkflowStep } from './components/AppShell'

export default function ShellPreview() {
  const steps: WorkflowStep[] = [
    { id: 'app-definition', number: 1, label: 'Application Definition', status: 'completed' },
    { id: 'context', number: 2, label: 'Context', status: 'completed' },
    { id: 'app-architecture', number: 3, label: 'Application Architecture', status: 'current' },
    { id: 'arch-decisions', number: 4, label: 'Architecture Decisions', status: 'upcoming' },
    { id: 'export', number: 5, label: 'Export', status: 'upcoming' },
  ]

  return (
    <AppShell
      steps={steps}
      currentStep={3}
      onNavigate={(stepId) => console.log('Navigate to:', stepId)}
    >
      <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Application Architecture
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Define your application's infrastructure components in detail.
        </p>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Compute Resources
            </h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                What compute service best fits your application?
              </label>
              <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                <option>Select compute service...</option>
                <option>App Service (Web apps, APIs)</option>
                <option>Container Apps (Containerized apps)</option>
                <option>AKS (Kubernetes workloads)</option>
                <option>Functions (Serverless, event-driven)</option>
                <option>Static Web Apps (Static sites, SPAs)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Data Storage
            </h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                What type of data storage do you need?
              </label>
              <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                <option>Select storage type...</option>
                <option>SQL Database (Relational data)</option>
                <option>Cosmos DB (NoSQL, distributed)</option>
                <option>Storage Account (Blobs, files, queues)</option>
                <option>Redis Cache (In-memory cache)</option>
                <option>None (Stateless application)</option>
              </select>
            </div>
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
