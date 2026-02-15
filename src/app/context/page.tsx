import { loadContextData } from '@/lib/context-loader'
import { ContextClient } from './ContextClient'

export default async function ContextPage() {
  const data = await loadContextData()

  return <ContextClient {...data} />
}
