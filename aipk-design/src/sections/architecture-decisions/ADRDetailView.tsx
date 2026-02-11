import { useNavigate, useParams } from 'react-router-dom'
import { ADRDetail } from './components'
import architectureDecisionsData from '@/../product/sections/architecture-decisions/data.json'
import type { ArchitectureDecisionsData } from '@/../product/sections/architecture-decisions/types'

export function ADRDetailView() {
  const navigate = useNavigate()
  const { adrId } = useParams<{ adrId: string }>()
  
  const data = architectureDecisionsData as ArchitectureDecisionsData
  const adr = data.adrsList.adrs.find(a => a.id === adrId)

  const handleBack = () => {
    navigate('/sections/architecture-decisions')
  }

  if (!adr) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-slate-600 dark:text-slate-400">ADR not found</p>
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Architecture Decisions
        </button>
      </div>
    )
  }

  return <ADRDetail adr={adr} onBack={handleBack} />
}
