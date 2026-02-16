import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

type DemoState = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Detects current demo state by checking which files exist
 */
async function detectCurrentState(): Promise<DemoState> {
  // Determine the correct data directory path
  const cwd = process.cwd()
  const dataDir = cwd.endsWith('src')
    ? path.join(cwd, 'data')
    : path.join(cwd, 'src', 'data')
  
  try {
    const fs = require('fs').promises
    
    // Check each section's key files
    const hasAppDef = await checkFiles(fs, dataDir, [
      'application-definition/application-overview.md',
      'application-definition/application-components.md',
    ])
    
    const hasContext = await checkFiles(fs, dataDir, [
      'context/infrastructure-context.md',
      'context/platform-context.md',
    ])
    
    const hasArchitecture = await checkFiles(fs, dataDir, [
      'application-architecture/architecture-diagram.md',
    ])
    
    const hasADRs = await checkDirectoryHasFiles(fs, path.join(dataDir, 'architecture-decisions/adrs'))
    
    const hasExport = await checkDirectoryHasFiles(fs, path.join(dataDir, 'export/prompts'))
    
    // Determine state based on what exists
    if (hasExport && hasADRs && hasArchitecture && hasContext && hasAppDef) return 5
    if (hasADRs && hasArchitecture && hasContext && hasAppDef) return 4
    if (hasArchitecture && hasContext && hasAppDef) return 3
    if (hasContext && hasAppDef) return 2
    if (hasAppDef) return 1
    return 0
  } catch (error) {
    console.error('Error detecting demo state:', error)
    return 0
  }
}

async function checkFiles(fs: any, baseDir: string, files: string[]): Promise<boolean> {
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

async function checkDirectoryHasFiles(fs: any, dir: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dir)
    const mdFiles = files.filter((f: string) => f.endsWith('.md') && f !== 'README.md')
    return mdFiles.length > 0
  } catch {
    return false
  }
}

/**
 * GET /api/demo/state
 * Returns the current demo state
 */
export async function GET() {
  try {
    const state = await detectCurrentState()
    return NextResponse.json({ state })
  } catch (error) {
    console.error('Error getting demo state:', error)
    return NextResponse.json({ error: 'Failed to get demo state' }, { status: 500 })
  }
}

/**
 * POST /api/demo/state
 * Sets the demo state by running the appropriate shell script
 */
export async function POST(request: NextRequest) {
  try {
    const { state, currentPath } = await request.json() as { state: DemoState; currentPath?: string }
    
    if (![0, 1, 2, 3, 4, 5].includes(state)) {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
    }

    // Detect current state before changing
    const previousState = await detectCurrentState()

    // Determine the correct demo directory path
    // If we're running from src/, process.cwd() will be .../src
    // If we're running from root, process.cwd() will be .../azure-infra-prompt-kit
    const cwd = process.cwd()
    const demoDir = cwd.endsWith('src') 
      ? path.join(cwd, 'demo')
      : path.join(cwd, 'src', 'demo')
    
    const scriptPath = path.join(demoDir, `${state}.sh`)
    
    console.log('Executing demo script:', scriptPath)
    console.log('Working directory:', demoDir)
    
    // Execute the shell script
    const { stdout, stderr } = await execAsync(`"${scriptPath}"`, {
      cwd: demoDir,
      shell: '/bin/bash',
    })
    
    if (stderr && !stderr.includes('find:')) {
      console.warn('Script stderr:', stderr)
    }
    
    console.log('Script output:', stdout)
    
    // Determine if we should redirect
    // - State 0 always redirects to /application-definition
    // - Moving forward (new state > previous state) redirects to the new page
    // - Moving backward stays on current page to show empty state
    const shouldRedirect = state === 0 || !currentPath || state > previousState
    
    const redirectTo = shouldRedirect ? getRedirectPathForState(state) : null
    
    return NextResponse.json({ 
      success: true, 
      state,
      redirectTo,
      message: `Demo state set to ${state}`,
    })
  } catch (error) {
    console.error('Error setting demo state:', error)
    return NextResponse.json({ 
      error: 'Failed to set demo state',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}

/**
 * Determines which page should be active after setting a demo state
 */
function getRedirectPathForState(state: DemoState): string {
  switch (state) {
    case 0: // Clean - redirect to application definition (step 1)
      return '/application-definition'
    case 1: // Application Definition only
      return '/application-definition'
    case 2: // + Context
      return '/context'
    case 3: // + Architecture
      return '/architecture'
    case 4: // + Decisions
      return '/decisions'
    case 5: // Complete
      return '/export'
    default:
      return '/application-definition'
  }
}
