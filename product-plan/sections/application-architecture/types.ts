/**
 * Azure service configuration for a component
 */
export interface ComponentConfiguration {
  /** The Azure service being used (e.g., "Container Apps", "Azure SQL Database") */
  azureService: string
  /** SKU/tier of the service */
  sku: string
  /** Azure region where the service is deployed */
  region: string
  /** Additional service-specific settings */
  settings: Record<string, unknown>
}

/**
 * An application component with its infrastructure configuration
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
  /** Whether this component has been configured */
  isConfigured: boolean
  /** The Azure infrastructure configuration, or null if not configured */
  configuration: ComponentConfiguration | null
}

/**
 * Deployment strategy information
 */
export interface Deployment {
  /** Whether deployment strategy has been configured */
  isConfigured: boolean
  /** Command to run to configure deployment */
  command: string
  /** Markdown content describing the deployment strategy, or null if not configured */
  content: string | null
}

/**
 * Architecture diagram information
 */
export interface ArchitectureDiagram {
  /** Whether architecture diagram has been generated */
  isConfigured: boolean
  /** Command to run to generate diagram */
  command: string
  /** Markdown content with Mermaid diagram, or null if not generated */
  content: string | null
}

/**
 * Props for the Application Architecture section component
 */
export interface ApplicationArchitectureProps {
  /** List of application components with their configurations */
  components: Component[]
  /** Deployment strategy */
  deployment: Deployment
  /** Architecture diagram */
  architectureDiagram: ArchitectureDiagram
  
  /** Called when user clicks on a component to view/edit configuration */
  onComponentClick?: (componentId: string) => void
  
  /** Called when user clicks on deployment box */
  onDeploymentClick?: () => void
  
  /** Called when user clicks on architecture diagram box */
  onDiagramClick?: () => void
  
  /** Called when user clicks continue to next section */
  onNext?: () => void
}
