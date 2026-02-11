/**
 * Architecture Decision Record (ADR)
 * Documents a significant architectural decision with context, options, and rationale
 */
export interface ADR {
  id: string
  title: string
  category: 'compute' | 'data' | 'networking' | 'security' | 'deployment'
  status: 'draft' | 'reviewed' | 'accepted'
  date: string // ISO date string
  context: string // Markdown
  options: ADROption[]
  decision: string // Markdown
  rationale: string // Markdown
  consequences: string // Markdown
  relatedComponents: string[] // Component IDs
}

/**
 * An option considered in an ADR
 */
export interface ADROption {
  name: string
  pros: string[]
  cons: string[]
}

/**
 * ADR Template box data
 */
export interface ADRTemplateBox {
  isCompleted: boolean
  command: string
  content: string | null // Markdown template
}

/**
 * ADRs List box data
 */
export interface ADRsListBox {
  isCompleted: boolean
  command: string
  adrs: ADR[]
}

/**
 * The complete architecture decisions data
 */
export interface ArchitectureDecisionsData {
  template: ADRTemplateBox
  adrsList: ADRsListBox
}
