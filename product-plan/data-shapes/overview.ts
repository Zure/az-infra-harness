// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/application-definition
// -----------------------------------------------------------------------------

export interface PlanningBox {
  id: string
  title: string
  command: string
  isCompleted: boolean
  content: string | null
}

export interface Component {
  id: string
  name: string
  type: 'compute' | 'data' | 'networking'
  description: string
}

export interface ApplicationDefinition {
  completionPercentage: number
  completedBoxes: number
  totalBoxes: number
  lastUpdated: string
}

// -----------------------------------------------------------------------------
// From: sections/context
// -----------------------------------------------------------------------------

export interface ContextDefinition {
  completionPercentage: number
  completedBoxes: number
  totalBoxes: number
  lastUpdated: string
}

// -----------------------------------------------------------------------------
// From: sections/application-architecture
// -----------------------------------------------------------------------------

export interface ComponentConfiguration {
  azureService: string
  sku: string
  region: string
  settings: Record<string, unknown>
}

export interface ComponentWithConfig extends Component {
  isConfigured: boolean
  configuration: ComponentConfiguration | null
}

export interface Deployment {
  isConfigured: boolean
  command: string
  content: string | null
}

export interface ArchitectureDiagram {
  isConfigured: boolean
  command: string
  content: string | null
}

// -----------------------------------------------------------------------------
// From: sections/architecture-decisions
// -----------------------------------------------------------------------------

export interface ADR {
  id: string
  title: string
  category: 'compute' | 'data' | 'networking' | 'security' | 'deployment'
  status: 'draft' | 'reviewed' | 'accepted'
  date: string
  context: string
  options: ADROption[]
  decision: string
  rationale: string
  consequences: string
  relatedComponents: string[]
}

export interface ADROption {
  name: string
  pros: string[]
  cons: string[]
}

export interface ADRTemplateBox {
  isCompleted: boolean
  command: string
  content: string | null
}

export interface ADRsListBox {
  isCompleted: boolean
  command: string
  adrs: ADR[]
}

// -----------------------------------------------------------------------------
// From: sections/export
// -----------------------------------------------------------------------------

export interface ExportData {
  isExported: boolean
  exportPath: string | null
  timestamp: string | null
  bicep: ExportContents | null
  terraform: ExportContents | null
}

export interface ExportContents {
  prompts: ExportItem
  instructions: ExportItem
  adrs: ExportItem
  configurations: ExportItem
  deployment: ExportItem
  overview: ExportItem
}

export interface ExportItem {
  path: string
  description: string
  files: string[]
}

export type IaCTool = 'terraform' | 'bicep'
