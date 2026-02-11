/**
 * Represents one planning box in the Application Definition section
 */
export interface PlanningBox {
  /** Unique identifier for the planning box */
  id: string
  /** Display title shown in the box header */
  title: string
  /** The coding agent command to run (e.g., "/application-overview") */
  command: string
  /** Whether this box has been filled with content */
  isCompleted: boolean
  /** The generated markdown content, or null if not yet filled */
  content: string | null
}

/**
 * Represents an application component
 */
export interface Component {
  /** Unique identifier for the component */
  id: string
  /** Display name of the component */
  name: string
  /** Component type: compute, data, or networking */
  type: 'compute' | 'data' | 'networking'
  /** Description of what this component does */
  description: string
}

/**
 * Overall application definition status and metadata
 */
export interface ApplicationDefinition {
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
 * Props for the Application Definition section component
 */
export interface ApplicationDefinitionProps {
  /** The three planning boxes to display */
  planningBoxes: PlanningBox[]
  /** List of application components */
  components: Component[]
  /** Overall application definition status */
  applicationDefinition: ApplicationDefinition
  
  /** Called when user clicks on a planning box to view/edit */
  onBoxClick?: (boxId: string) => void
  
  /** Called when user clicks on a component to view/edit details */
  onComponentClick?: (componentId: string) => void
  
  /** Called when user wants to refresh/reload the content */
  onRefresh?: () => void
}
