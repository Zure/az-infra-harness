import { promises as fs } from 'fs'
import path from 'path'
import type { PlanningBox, Component, ApplicationDefinition } from '@/components/application-definition/types'

const DATA_DIR = path.join(process.cwd(), 'data', 'application-definition')

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
 * Parses application-components.md to extract component information
 * Expected format:
 * ## Component Name
 * **Type:** Compute|Data|Networking
 * 
 * Description text...
 */
function parseComponentsFromMarkdown(markdown: string): Component[] {
  const components: Component[] = []
  
  // Split by ## headers (h2 headings)
  const sections = markdown.split(/^## /m).filter(s => s.trim())
  
  for (const section of sections) {
    const lines = section.split('\n')
    if (lines.length === 0) continue
    
    // First line is the component name
    const name = lines[0].trim()
    
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
 * Loads all application definition data from the filesystem
 * This is a server-side only function (uses Node.js fs)
 */
export async function loadApplicationDefinitionData(): Promise<{
  planningBoxes: PlanningBox[]
  components: Component[]
  applicationDefinition: ApplicationDefinition
}> {
  // Load markdown content for each planning box
  const [overviewContent, requirementsContent, componentsContent] = await Promise.all([
    readMarkdownFile('application-overview.md'),
    readMarkdownFile('non-functional-requirements.md'),
    readMarkdownFile('application-components.md'),
  ])

  // Parse components from markdown
  const components = componentsContent ? parseComponentsFromMarkdown(componentsContent) : []

  // Define the three planning boxes
  const planningBoxes: PlanningBox[] = [
    {
      id: 'app-overview',
      title: 'Application Overview',
      command: '/application-overview',
      description: 'Describe your application purpose, target users, and key business objectives.',
      isCompleted: overviewContent !== null,
      content: overviewContent,
    },
    {
      id: 'non-functional-reqs',
      title: 'Non-Functional Requirements',
      command: '/non-functional-requirements',
      description: 'Define performance, security, compliance, and scalability requirements.',
      isCompleted: requirementsContent !== null,
      content: requirementsContent,
    },
    {
      id: 'application-components',
      title: 'Application Components',
      command: '/application-components',
      description: 'List the major components of your application (compute, data, networking).',
      isCompleted: components.length > 0,
      content: null, // Components use special rendering
    },
  ]

  // Calculate completion stats
  const completedBoxes = planningBoxes.filter(box => box.isCompleted).length
  const totalBoxes = planningBoxes.length
  const completionPercentage = Math.round((completedBoxes / totalBoxes) * 100)

  const applicationDefinition: ApplicationDefinition = {
    completionPercentage,
    completedBoxes,
    totalBoxes,
    lastUpdated: new Date().toISOString(),
  }

  return {
    planningBoxes,
    components,
    applicationDefinition,
  }
}
