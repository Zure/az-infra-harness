/**
 * An item in the export package
 */
export interface ExportItem {
  path: string
  description: string
  files: string[]
}

/**
 * Contents of the export package
 */
export interface ExportContents {
  prompts: ExportItem
  instructions: ExportItem
  adrs: ExportItem
  configurations: ExportItem
  deployment: ExportItem
  overview: ExportItem
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
