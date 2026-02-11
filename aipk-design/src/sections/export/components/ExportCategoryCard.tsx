import { FileText, FolderOpen } from 'lucide-react'
import type { ExportItem } from '@/../product/sections/export/types'

interface ExportCategoryCardProps {
  title: string
  item: ExportItem
  icon: React.ReactNode
}

export function ExportCategoryCard({ title, item, icon }: ExportCategoryCardProps) {
  return (
    <div className="rounded-lg border-2 border-blue-500 bg-white p-5 dark:border-blue-600 dark:bg-slate-800">
      {/* Header with icon */}
      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-md bg-blue-100 p-2 dark:bg-blue-900">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </div>
        <div className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          {item.files.length} {item.files.length === 1 ? 'file' : 'files'}
        </div>
      </div>

      {/* Path */}
      <div className="mb-3 ml-11 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <FolderOpen className="h-4 w-4" />
        <code className="font-mono text-xs">{item.path}</code>
      </div>

      {/* Files list */}
      <div className="ml-11 space-y-1">
        {item.files.map((file) => (
          <div key={file} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <FileText className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            <code className="font-mono text-xs">{file}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
