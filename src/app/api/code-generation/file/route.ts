import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tool = searchParams.get('tool')
  const filePath = searchParams.get('path')

  if (!tool || (tool !== 'bicep' && tool !== 'terraform')) {
    return NextResponse.json(
      { error: 'Invalid tool parameter. Use ?tool=bicep or ?tool=terraform' },
      { status: 400 }
    )
  }

  if (!filePath) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    )
  }

  // Prevent path traversal
  const normalizedPath = path.normalize(filePath)
  if (normalizedPath.startsWith('..') || path.isAbsolute(normalizedPath)) {
    return NextResponse.json(
      { error: 'Invalid file path' },
      { status: 400 }
    )
  }

  const exportDir = path.join(
    process.cwd(),
    '..',
    tool === 'bicep' ? 'export-bicep' : 'export-terraform'
  )

  const fullPath = path.join(exportDir, normalizedPath)

  // Ensure resolved path is still within export directory
  const resolvedPath = path.resolve(fullPath)
  const resolvedExportDir = path.resolve(exportDir)
  if (!resolvedPath.startsWith(resolvedExportDir)) {
    return NextResponse.json(
      { error: 'Invalid file path' },
      { status: 400 }
    )
  }

  try {
    const content = await fs.readFile(fullPath, 'utf-8')
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}
