import { promises as fs } from 'fs'
import path from 'path'
import type { ExportData, ToolExportData, ExportContents, ExportItem } from '@/components/export/types'

// The export folders created by the coding agent
const BICEP_EXPORT_DIR = path.join(process.cwd(), '..', 'export-bicep')
const TERRAFORM_EXPORT_DIR = path.join(process.cwd(), '..', 'export-terraform')

/**
 * Checks if a specific export folder exists
 */
async function checkExportExists(dir: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dir)
    return stat.isDirectory()
  } catch {
    return false
  }
}

/**
 * Gets the timestamp of an export folder
 */
async function getExportTimestamp(dir: string): Promise<string | null> {
  try {
    const stat = await fs.stat(dir)
    return stat.mtime.toISOString()
  } catch {
    return null
  }
}

/**
 * Scans a directory and returns all files recursively
 */
async function scanDirectory(dir: string, baseDir: string = dir): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          return scanDirectory(fullPath, baseDir)
        } else {
          // Return relative path from baseDir
          return [path.relative(baseDir, fullPath)]
        }
      })
    )
    return files.flat()
  } catch {
    return []
  }
}

/**
 * Loads export data for a specific IaC tool by scanning the actual export directory
 */
async function loadExportContents(dir: string, tool: 'bicep' | 'terraform'): Promise<ExportContents | null> {
  try {
    // Scan the export directory for all files
    const allFiles = await scanDirectory(dir)
    
    // Filter files by category
    const promptFiles = allFiles.filter(f => f.startsWith('prompts/'))
    const instructionFiles = allFiles.filter(f => f.startsWith('instructions/'))
    const adrFiles = allFiles.filter(f => f.startsWith('decisions/') || f.startsWith('adrs/'))
    const configFiles = allFiles.filter(f => f.startsWith('configurations/'))
    const deploymentFiles = allFiles.filter(f => f.startsWith('deployment/'))
    const overviewFiles = allFiles.filter(f => 
      !f.includes('/') || f.startsWith('context/')
    )
    
    // Prompts
    const prompts: ExportItem = {
      path: 'prompts/',
      description: `Ready-to-use prompts for coding agents to implement infrastructure with ${tool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'}`,
      files: promptFiles.map(f => path.basename(f))
    }

    // Instructions
    const instructions: ExportItem = {
      path: 'instructions/',
      description: `Step-by-step implementation guidance for ${tool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'}`,
      files: instructionFiles.map(f => path.basename(f))
    }

    // ADRs
    const adrs: ExportItem = {
      path: 'decisions/',
      description: 'Architecture Decision Records documenting key infrastructure choices',
      files: adrFiles.map(f => path.basename(f))
    }

    // Configurations
    const configurations: ExportItem = {
      path: 'configurations/',
      description: `Detailed component configurations and ${tool === 'bicep' ? 'Bicep parameters' : 'Terraform variables'}`,
      files: configFiles.map(f => path.basename(f))
    }

    // Deployment
    const deployment: ExportItem = {
      path: 'deployment/',
      description: `CI/CD pipeline configuration for ${tool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'} deployments`,
      files: deploymentFiles.map(f => path.basename(f))
    }

    // Overview & Context
    const overview: ExportItem = {
      path: './',
      description: 'Product overview and context information',
      files: overviewFiles.map(f => path.basename(f))
    }

    return {
      prompts,
      instructions,
      adrs,
      configurations,
      deployment,
      overview
    }
  } catch (error) {
    return null
  }
}

/**
 * Loads export data for a specific tool
 */
async function loadToolExport(dir: string, tool: 'bicep' | 'terraform', folderName: string): Promise<ToolExportData> {
  const exists = await checkExportExists(dir)

  if (!exists) {
    return {
      exists: false,
      exportPath: null,
      timestamp: null,
      contents: null
    }
  }

  const timestamp = await getExportTimestamp(dir)
  const contents = await loadExportContents(dir, tool)

  return {
    exists: true,
    exportPath: folderName,
    timestamp,
    contents
  }
}

/**
 * Loads all export data
 */
export async function loadExportData(): Promise<ExportData> {
  const [bicep, terraform] = await Promise.all([
    loadToolExport(BICEP_EXPORT_DIR, 'bicep', 'export-bicep/'),
    loadToolExport(TERRAFORM_EXPORT_DIR, 'terraform', 'export-terraform/')
  ])

  return {
    bicep,
    terraform
  }
}
