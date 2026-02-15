'use client'

import { ADRDetail } from '@/components/architecture-decisions'
import type { ADR } from '@/components/architecture-decisions/types'
import { useRouter } from 'next/navigation'

interface ADRDetailClientProps {
  adr: ADR
}

export function ADRDetailClient({ adr }: ADRDetailClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/decisions')
  }

  return <ADRDetail adr={adr} onBack={handleBack} />
}
