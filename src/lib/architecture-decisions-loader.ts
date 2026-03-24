import { promises as fs } from 'fs'
import path from 'path'
import type { 
  ADR,
  ADRTemplateBox,
  ADRsListBox,
  ArchitectureDecisionsData,
  ADROption
} from '@/components/architecture-decisions/types'
import { DATA_DIR as BASE_DATA_DIR } from '@/lib/paths'

const DATA_DIR = path.join(BASE_DATA_DIR, 'architecture-decisions')

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
 * Parses ADR markdown file and extracts metadata and structured content
 * Expected format follows the ADR template structure
 */
function parseADRMarkdown(content: string, filename: string): ADR {
  const lines = content.split('\n')
  
  // Extract ID from filename (e.g., "adr-001-container-platform.md" -> "adr-001-container-platform")
  const id = filename.replace('.md', '')
  
  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : id
  
  // Extract metadata from front matter or inline
  const statusMatch = content.match(/\*\*Status:\*\*\s*(draft|reviewed|accepted)/i)
  const status = (statusMatch ? statusMatch[1].toLowerCase() : 'draft') as 'draft' | 'reviewed' | 'accepted'
  
  const dateMatch = content.match(/\*\*Date:\*\*\s*(.+)$/m)
  const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString()
  
  const categoryMatch = content.match(/\*\*Category:\*\*\s*(compute|data|networking|security|deployment)/i)
  const category = (categoryMatch ? categoryMatch[1].toLowerCase() : 'compute') as ADR['category']
  
  // Extract sections
  const contextMatch = content.match(/##\s+Context\s*\n+([\s\S]*?)(?=\n##|$)/)
  const context = contextMatch ? contextMatch[1].trim() : ''
  
  const decisionMatch = content.match(/##\s+Decision\s*\n+([\s\S]*?)(?=\n##|$)/)
  const decision = decisionMatch ? decisionMatch[1].trim() : ''
  
  const rationaleMatch = content.match(/##\s+Rationale\s*\n+([\s\S]*?)(?=\n##|$)/)
  const rationale = rationaleMatch ? rationaleMatch[1].trim() : ''
  
  const consequencesMatch = content.match(/##\s+Consequences\s*\n+([\s\S]*?)(?=\n##|$)/)
  const consequences = consequencesMatch ? consequencesMatch[1].trim() : ''
  
  // Extract options
  const optionsMatch = content.match(/##\s+Options Considered\s*\n+([\s\S]*?)(?=\n##\s+Decision|$)/)
  const options: ADROption[] = []
  
  if (optionsMatch) {
    const optionsText = optionsMatch[1]
    // Match each option (### heading)
    const optionMatches = optionsText.matchAll(/###\s+(.+?)\n([\s\S]*?)(?=\n###|$)/g)
    
    for (const match of optionMatches) {
      const name = match[1].trim()
      const optionContent = match[2]
      
      // Extract pros
      const prosMatch = optionContent.match(/\*\*Pros:\*\*\s*\n((?:[-*]\s+.+\n?)+)/)
      const pros = prosMatch 
        ? prosMatch[1].split('\n').filter(l => l.trim()).map(l => l.replace(/^[-*]\s+/, '').trim())
        : []
      
      // Extract cons
      const consMatch = optionContent.match(/\*\*Cons:\*\*\s*\n((?:[-*]\s+.+\n?)+)/)
      const cons = consMatch
        ? consMatch[1].split('\n').filter(l => l.trim()).map(l => l.replace(/^[-*]\s+/, '').trim())
        : []
      
      options.push({ name, pros, cons })
    }
  }
  
  // Extract related components
  const relatedMatch = content.match(/##\s+Related Components\s*\n+([\s\S]*?)(?=\n##|$)/)
  const relatedComponents: string[] = []
  
  if (relatedMatch) {
    const relatedText = relatedMatch[1]
    const componentMatches = relatedText.matchAll(/[-*]\s+(.+?)(?:\n|$)/g)
    for (const match of componentMatches) {
      relatedComponents.push(match[1].trim())
    }
  }
  
  return {
    id,
    title,
    category,
    status,
    date,
    context,
    options,
    decision,
    rationale,
    consequences,
    relatedComponents
  }
}

/**
 * Loads all ADR files from the adrs directory
 */
async function loadADRs(): Promise<ADR[]> {
  try {
    const adrsDir = path.join(DATA_DIR, 'adrs')
    const files = await fs.readdir(adrsDir)
    const adrFiles = files.filter(f => f.endsWith('.md'))
    
    const adrs = await Promise.all(
      adrFiles.map(async (filename) => {
        const content = await fs.readFile(path.join(adrsDir, filename), 'utf-8')
        return parseADRMarkdown(content, filename)
      })
    )
    
    // Sort by ID for consistent ordering
    return adrs.sort((a, b) => a.id.localeCompare(b.id))
  } catch (error) {
    // Directory doesn't exist or is empty
    return []
  }
}

/**
 * Loads the ADR template
 */
export async function loadADRTemplate(): Promise<ADRTemplateBox> {
  const content = await readMarkdownFile('adr-template.md')
  
  return {
    isCompleted: content !== null,
    command: '/adr-template',
    content,
  }
}

/**
 * Loads the ADRs list
 */
export async function loadADRsList(): Promise<ADRsListBox> {
  const adrs = await loadADRs()
  
  return {
    isCompleted: adrs.length > 0,
    command: '/generate-adrs',
    adrs,
  }
}

/**
 * Loads a single ADR by ID
 */
export async function loadADRById(id: string): Promise<ADR | null> {
  try {
    const adrsDir = path.join(DATA_DIR, 'adrs')
    const filePath = path.join(adrsDir, `${id}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    return parseADRMarkdown(content, `${id}.md`)
  } catch (error) {
    return null
  }
}

/**
 * Loads all architecture decisions data
 */
export async function loadArchitectureDecisionsData(): Promise<ArchitectureDecisionsData> {
  const [template, adrsList] = await Promise.all([
    loadADRTemplate(),
    loadADRsList(),
  ])

  return {
    template,
    adrsList,
  }
}
