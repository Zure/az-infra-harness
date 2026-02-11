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
      <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-16 text-center dark:border-slate-600 dark:bg-slate-800/50">
        <div className="mx-auto max-w-md space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
            <svg 
              className="h-8 w-8 text-slate-400 dark:text-slate-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Content Goes Here
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This is a preview of the application shell with navigation sidebar
          </p>
        </div>
      </div>
    </AppShell>
  )
}
