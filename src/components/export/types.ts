/**
 * An item in the export package
 */
export interface ExportItem {
  path: string
  description: string
  files: string[]
}

/**
 * Contents of the export package — IaC-oriented categories
 */
export interface ExportContents {
  rootFiles: ExportItem
  modules: ExportItem
  parameters: ExportItem
  pipelines: ExportItem
  documentation: ExportItem
}

/**
 * IaC tool selection
 */
export type IaCTool = 'terraform' | 'bicep'

/**
 * Tool-specific export data
 */
export interface ToolExportData {
  exists: boolean
  exportPath: string | null
  timestamp: string | null
  contents: ExportContents | null
}

/**
 * Export data
 */
export interface ExportData {
  bicep: ToolExportData
  terraform: ToolExportData
}
