import { promises as fs } from 'fs'
import path from 'path'
import type { ExportData, ToolExportData, ExportContents, ExportItem } from '@/components/export/types'
import { EXPORT_BICEP_DIR, EXPORT_TERRAFORM_DIR } from '@/lib/paths'

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
    const allFiles = await scanDirectory(dir)

    const isBicep = tool === 'bicep'
    const toolLabel = isBicep ? 'Bicep' : 'Terraform/OpenTofu'

    // Root IaC files (*.bicep or *.tf in export root, excluding modules/)
    const rootFileExts = isBicep ? ['.bicep'] : ['.tf']
    const rootFileList = allFiles.filter(f =>
      !f.includes('/') && rootFileExts.some(ext => f.endsWith(ext))
    )

    const rootFiles: ExportItem = {
      path: './',
      description: `Root ${toolLabel} files — main orchestration and configuration`,
      files: rootFileList
    }

    // Modules: files under modules/
    const moduleFiles = allFiles.filter(f => f.startsWith('modules/'))
    const modules: ExportItem = {
      path: 'modules/',
      description: `${toolLabel} modules for each infrastructure component`,
      files: moduleFiles.map(f => f.replace(/^modules\//, ''))
    }

    // Parameters / Variables: *.bicepparam, *.tfvars, or files under parameters/ or environments/
    const paramFiles = allFiles.filter(f =>
      f.endsWith('.bicepparam') ||
      f.endsWith('.tfvars') ||
      f.startsWith('parameters/') ||
      f.startsWith('environments/')
    )
    const paramPath = isBicep ? 'parameters/' : 'environments/'
    const parameters: ExportItem = {
      path: paramPath,
      description: `Environment-specific ${isBicep ? 'parameter' : 'variable'} files (dev, staging, prod)`,
      files: paramFiles.map(f => f.replace(/^(parameters|environments)\//, ''))
    }

    // Pipelines: files under .github/workflows/ or .azuredevops/
    const pipelineFiles = allFiles.filter(f =>
      f.startsWith('.github/workflows/') || f.startsWith('.azuredevops/')
    )
    const pipelines: ExportItem = {
      path: pipelineFiles.length > 0 && pipelineFiles[0].startsWith('.azuredevops/')
        ? '.azuredevops/'
        : '.github/workflows/',
      description: 'CI/CD pipeline for automated infrastructure deployment',
      files: pipelineFiles.map(f => f.replace(/^(\.github\/workflows\/|\.azuredevops\/)/, ''))
    }

    // Documentation: README.md and other .md files
    const docFiles = allFiles.filter(f => f.endsWith('.md'))
    const documentation: ExportItem = {
      path: './',
      description: 'Deployment documentation and setup instructions',
      files: docFiles.map(f => path.basename(f))
    }

    return {
      rootFiles,
      modules,
      parameters,
      pipelines,
      documentation
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
    loadToolExport(EXPORT_BICEP_DIR, 'bicep', 'export-bicep/'),
    loadToolExport(EXPORT_TERRAFORM_DIR, 'terraform', 'export-terraform/')
  ])

  return {
    bicep,
    terraform
  }
}
