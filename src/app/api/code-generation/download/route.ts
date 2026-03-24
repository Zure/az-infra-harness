import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import archiver from 'archiver'
import { EXPORT_BICEP_DIR, EXPORT_TERRAFORM_DIR } from '@/lib/paths'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Get tool from query parameter
  const { searchParams } = new URL(request.url)
  const tool = searchParams.get('tool') // 'bicep' or 'terraform'

  if (!tool || (tool !== 'bicep' && tool !== 'terraform')) {
    return NextResponse.json(
      { error: 'Invalid tool parameter. Use ?tool=bicep or ?tool=terraform' },
      { status: 400 }
    )
  }

  const EXPORT_DIR = tool === 'bicep' ? EXPORT_BICEP_DIR : EXPORT_TERRAFORM_DIR

  try {
    // Check if export directory exists
    const stat = await fs.stat(EXPORT_DIR)
    if (!stat.isDirectory()) {
      return NextResponse.json(
        { error: 'Export directory not found' },
        { status: 404 }
      )
    }

    // Create a ZIP archive
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    })

    // Create a readable stream from the archive
    const stream = new ReadableStream({
      start(controller) {
        archive.on('data', (chunk) => {
          controller.enqueue(chunk)
        })
        archive.on('end', () => {
          controller.close()
        })
        archive.on('error', (err) => {
          controller.error(err)
        })
      }
    })

    // Add all files from export directory to the archive
    archive.directory(EXPORT_DIR, false)
    
    // Finalize the archive
    archive.finalize()

    // Return the ZIP file as a download
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="infrastructure-export-${tool}-${Date.now()}.zip"`
      }
    })
  } catch (error) {
    console.error('Error creating ZIP:', error)
    return NextResponse.json(
      { error: 'Failed to create export archive' },
      { status: 500 }
    )
  }
}
