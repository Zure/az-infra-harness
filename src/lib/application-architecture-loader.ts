import { promises as fs } from 'fs'
import path from 'path'
import type { 
  Component, 
  ComponentConfiguration,
  Deployment, 
  ArchitectureDiagram 
} from '@/components/application-architecture/types'
import { DATA_DIR as BASE_DATA_DIR } from '@/lib/paths'

const DATA_DIR = path.join(BASE_DATA_DIR, 'application-architecture')
const APP_DEF_DIR = path.join(BASE_DATA_DIR, 'application-definition')

/**
 * Reads a markdown file from the data directory
 * Returns null if the file doesn't exist
 */
async function readMarkdownFile(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return content.trim()
  } catch (error) {
    // File doesn't exist or can't be read
    return null
  }
}

/**
 * Reads a JSON file from a directory
 */
async function readJsonFile<T>(dir: string, filename: string): Promise<T | null> {
  try {
    const filePath = path.join(dir, filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    return null
  }
}

/**
 * Parses application-components.md to extract component information
 * Same format as application-definition loader
 */
function parseComponentsFromMarkdown(markdown: string): Array<{ id: string; name: string; type: 'compute' | 'data' | 'networking'; description: string }> {
  const components: Array<{ id: string; name: string; type: 'compute' | 'data' | 'networking'; description: string }> = []
  
  // Split by ## headers (h2 headings)
  const sections = markdown.split(/^## /m).filter(s => s.trim())
  
  for (const section of sections) {
    const lines = section.split('\n')
    if (lines.length === 0) continue
    
    // First line is the component name
    const name = lines[0].trim()
    
    // Skip the title "Application Components"
    if (name === 'Application Components') continue
    
    // Find the type line
    const typeLine = lines.find(line => line.startsWith('**Type:**'))
    if (!typeLine) continue
    
    // Extract type (Compute, Data, or Networking)
    const typeMatch = typeLine.match(/\*\*Type:\*\*\s*(Compute|Data|Networking)/i)
    if (!typeMatch) continue
    
    const type = typeMatch[1].toLowerCase() as 'compute' | 'data' | 'networking'
    
    // Everything after the type line is the description
    const typeLineIndex = lines.findIndex(line => line.startsWith('**Type:**'))
    const descriptionLines = lines.slice(typeLineIndex + 1)
      .filter(line => line.trim() && !line.startsWith('#'))
      .join(' ')
      .trim()
    
    // Generate ID from name (lowercase with hyphens)
    const id = name.toLowerCase().replace(/\s+/g, '-')
    
    components.push({
      id,
      name,
      type,
      description: descriptionLines
    })
  }
  
  return components
}

/**
 * Loads all component definitions from application-definition markdown
 */
async function loadComponentDefinitions(): Promise<Array<{ id: string; name: string; type: 'compute' | 'data' | 'networking'; description: string }>> {
  try {
    const filePath = path.join(APP_DEF_DIR, 'application-components.md')
    const content = await fs.readFile(filePath, 'utf-8')
    const parsed = parseComponentsFromMarkdown(content)
    return parsed
  } catch (error) {
    console.error('[loadComponentDefinitions] Error:', error)
    return []
  }
}

/**
 * Loads the configuration for a specific component
 */
async function loadComponentConfiguration(componentId: string): Promise<ComponentConfiguration | null> {
  const componentsDir = path.join(DATA_DIR, 'components')
  return readJsonFile<ComponentConfiguration>(componentsDir, `${componentId}.json`)
}

/**
 * Loads all components with their configurations
 */
export async function loadComponents(): Promise<Component[]> {
  // Load component definitions from application-definition
  const definitions = await loadComponentDefinitions()
  
  // For each definition, check if it has a configuration in application-architecture
  const components = await Promise.all(
    definitions.map(async (def) => {
      const configuration = await loadComponentConfiguration(def.id)
      return {
        id: def.id,
        name: def.name,
        type: def.type,
        description: def.description,
        isConfigured: configuration !== null,
        configuration,
      }
    })
  )
  
  return components
}

/**
 * Loads the deployment strategy
 */
export async function loadDeployment(): Promise<Deployment> {
  const content = await readMarkdownFile('deployment-strategy.md')
  
  return {
    isConfigured: content !== null,
    command: '/deployment-strategy',
    content,
  }
}

/**
 * Loads the architecture diagram
 */
export async function loadArchitectureDiagram(): Promise<ArchitectureDiagram> {
  const content = await readMarkdownFile('architecture-diagram.md')
  
  return {
    isConfigured: content !== null,
    command: '/architecture-diagram',
    content,
  }
}

/**
 * Loads all application architecture data
 */
export async function loadApplicationArchitectureData() {
  const [components, deployment, architectureDiagram] = await Promise.all([
    loadComponents(),
    loadDeployment(),
    loadArchitectureDiagram(),
  ])

  return {
    components,
    deployment,
    architectureDiagram,
  }
}
