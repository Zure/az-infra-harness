import { promises as fs } from 'fs'
import path from 'path'
import type { PlanningBox, ContextDefinition } from '@/components/context/types'
import { DATA_DIR as BASE_DATA_DIR } from '@/lib/paths'

const DATA_DIR = path.join(BASE_DATA_DIR, 'context')

/**
 * Loads a markdown file from the context data directory
 */
async function loadMarkdownFile(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return content.trim()
  } catch (error) {
    // File doesn't exist yet - return null to show empty state
    return null
  }
}

/**
 * Loads the infrastructure context markdown
 */
export async function loadInfrastructureContext(): Promise<string | null> {
  return loadMarkdownFile('infrastructure-context.md')
}

/**
 * Loads the platform context markdown
 */
export async function loadPlatformContext(): Promise<string | null> {
  return loadMarkdownFile('platform-context.md')
}

/**
 * Loads the development context markdown
 */
export async function loadDevelopmentContext(): Promise<string | null> {
  return loadMarkdownFile('development-context.md')
}

/**
 * Loads all planning boxes for the Context section
 */
export async function loadContextPlanningBoxes(): Promise<PlanningBox[]> {
  const [infrastructureContext, platformContext, developmentContext] = await Promise.all([
    loadInfrastructureContext(),
    loadPlatformContext(),
    loadDevelopmentContext(),
  ])

  return [
    {
      id: 'infrastructure-context',
      title: 'Infrastructure Context',
      command: '/infrastructure-context',
      description: 'Define existing infrastructure, network topology, and on-premises systems.',
      isCompleted: infrastructureContext !== null,
      content: infrastructureContext,
    },
    {
      id: 'platform-context',
      title: 'Platform Context',
      command: '/platform-context',
      description: 'Specify Azure subscription details, governance policies, and compliance requirements.',
      isCompleted: platformContext !== null,
      content: platformContext,
    },
    {
      id: 'development-context',
      title: 'Development Context',
      command: '/development-context',
      description: 'Describe development workflow, CI/CD pipeline, testing strategy, and deployment process.',
      isCompleted: developmentContext !== null,
      content: developmentContext,
    },
  ]
}

/**
 * Calculates context definition metadata based on completed boxes
 */
export async function loadContextDefinition(): Promise<ContextDefinition> {
  const boxes = await loadContextPlanningBoxes()
  const completedBoxes = boxes.filter(box => box.isCompleted).length
  const totalBoxes = boxes.length
  const completionPercentage = Math.round((completedBoxes / totalBoxes) * 100)

  return {
    completionPercentage,
    completedBoxes,
    totalBoxes,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Loads all context data (planning boxes + metadata)
 */
export async function loadContextData() {
  const [planningBoxes, contextDefinition] = await Promise.all([
    loadContextPlanningBoxes(),
    loadContextDefinition(),
  ])

  return {
    planningBoxes,
    contextDefinition,
  }
}
