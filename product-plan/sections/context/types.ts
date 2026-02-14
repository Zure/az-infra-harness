/**
 * Represents one planning box in the Context section
 */
export interface PlanningBox {
  /** Unique identifier for the planning box */
  id: string
  /** Display title shown in the box header */
  title: string
  /** The coding agent command to run (e.g., "/infrastructure-context") */
  command: string
  /** Whether this box has been filled with content */
  isCompleted: boolean
  /** The generated markdown content, or null if not yet filled */
  content: string | null
}

/**
 * Overall context definition status and metadata
 */
export interface ContextDefinition {
  /** Percentage of boxes completed (0-100) */
  completionPercentage: number
  /** Count of completed boxes */
  completedBoxes: number
  /** Total number of boxes in this section */
  totalBoxes: number
  /** ISO timestamp of last update */
  lastUpdated: string
}

/**
 * Props for the Context section component
 */
export interface ContextProps {
  /** The three planning boxes to display */
  planningBoxes: PlanningBox[]
  /** Overall context definition status */
  contextDefinition: ContextDefinition
  
  /** Called when user clicks on a planning box to view/edit */
  onBoxClick?: (boxId: string) => void
  
  /** Called when user clicks continue to next section */
  onNext?: () => void
}
