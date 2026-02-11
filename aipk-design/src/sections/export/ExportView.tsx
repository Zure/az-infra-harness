import { Export } from './components'
import exportData from '@/../product/sections/export/data.json'
import type { ExportData } from '@/../product/sections/export/types'

export default function ExportView() {
  const data = exportData as ExportData

  return <Export data={data} />
}
