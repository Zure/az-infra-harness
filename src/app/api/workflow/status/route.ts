import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

/**
 * GET /api/workflow/status
 * Returns the completion status of all workflow steps based on actual data files
 */
export async function GET() {
  try {
    const cwd = process.cwd()
    const dataDir = cwd.endsWith('src')
      ? path.join(cwd, 'data')
      : path.join(cwd, 'src', 'data')

    const completedSteps: string[] = []

    // Check Application Definition
    const hasAppDef = await checkFiles(dataDir, [
      'application-definition/application-overview.md',
      'application-definition/application-components.md',
      'application-definition/non-functional-requirements.md',
    ])
    if (hasAppDef) completedSteps.push('application-definition')

    // Check Context
    const hasContext = await checkFiles(dataDir, [
      'context/infrastructure-context.md',
      'context/platform-context.md',
      'context/development-context.md',
    ])
    if (hasContext) completedSteps.push('context')

    // Check Architecture
    const hasArchitecture = await checkFiles(dataDir, [
      'application-architecture/architecture-diagram.md',
      'application-architecture/deployment-strategy.md',
    ])
    if (hasArchitecture) completedSteps.push('architecture')

    // Check Architecture Decisions (need at least 1 ADR)
    const hasADRs = await checkDirectoryHasFiles(
      path.join(dataDir, 'architecture-decisions/adrs')
    )
    if (hasADRs) completedSteps.push('decisions')

    // Check Export (check for export folders in root)
    const rootDir = cwd.endsWith('src')
      ? path.dirname(cwd)
      : cwd
    const hasExportBicep = await checkDirectoryExists(path.join(rootDir, 'export-bicep'))
    const hasExportTerraform = await checkDirectoryExists(path.join(rootDir, 'export-terraform'))
    const hasExport = hasExportBicep || hasExportTerraform
    if (hasExport) completedSteps.push('export')

    return NextResponse.json({
      completedSteps,
      stepCount: completedSteps.length,
    })
  } catch (error) {
    console.error('Error getting workflow status:', error)
    return NextResponse.json(
      { error: 'Failed to get workflow status' },
      { status: 500 }
    )
  }
}

async function checkFiles(baseDir: string, files: string[]): Promise<boolean> {
  try {
    for (const file of files) {
      const filePath = path.join(baseDir, file)
      await fs.access(filePath)
    }
    return true
  } catch {
    return false
  }
}

async function checkDirectoryHasFiles(dir: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dir)
    const mdFiles = files.filter((f) => f.endsWith('.md') && f !== 'README.md')
    return mdFiles.length > 0
  } catch {
    return false
  }
}

async function checkDirectoryExists(dir: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dir)
    return stat.isDirectory()
  } catch {
    return false
  }
}
