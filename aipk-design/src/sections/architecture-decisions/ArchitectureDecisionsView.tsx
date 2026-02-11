import { useNavigate } from 'react-router-dom'
import { ArchitectureDecisions } from './components'
import architectureDecisionsData from '@/../product/sections/architecture-decisions/data.json'
import type { ArchitectureDecisionsData } from '@/../product/sections/architecture-decisions/types'

export default function ArchitectureDecisionsView() {
  const navigate = useNavigate()
  
  const data = architectureDecisionsData as ArchitectureDecisionsData

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleContinue = () => {
    navigate('/sections/export')
  }

  return (
    <ArchitectureDecisions 
      data={data} 
      onNavigate={handleNavigate}
      onContinue={handleContinue}
    />
  )
}
