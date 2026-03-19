'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { ExportFileDetail } from '@/components/export/ExportFileDetail'
import type { IaCTool } from '@/components/export/types'

function getShikiLanguage(filePath: string): string {
  if (filePath.endsWith('.bicep') || filePath.endsWith('.bicepparam')) return 'bicep'
  if (filePath.endsWith('.tf') || filePath.endsWith('.tfvars')) return 'hcl'
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) return 'yaml'
  if (filePath.endsWith('.md')) return 'markdown'
  if (filePath.endsWith('.json')) return 'json'
  if (filePath.endsWith('.sh')) return 'bash'
  return 'text'
}

interface ExportFileDetailClientProps {
  filePath: string
  tool: IaCTool
}

export function ExportFileDetailClient({ filePath, tool }: ExportFileDetailClientProps) {
  const [content, setContent] = useState<string | null>(null)
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFile() {
      try {
        const response = await fetch(`/api/code-generation/file?tool=${tool}&path=${encodeURIComponent(filePath)}`)
        if (!response.ok) {
          setError('File not found')
          return
        }
        const data = await response.json()
        setContent(data.content)

        // Highlight with Shiki
        const lang = getShikiLanguage(filePath)
        try {
          const html = await codeToHtml(data.content, {
            lang,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
          })
          setHighlightedHtml(html)
        } catch (e) {
          console.error('Shiki highlighting failed:', e)
          setHighlightedHtml(null)
        }
      } catch {
        setError('Failed to load file')
      } finally {
        setLoading(false)
      }
    }
    loadFile()
  }, [filePath, tool])

  return (
    <ExportFileDetail
      filePath={filePath}
      tool={tool}
      content={content}
      highlightedHtml={highlightedHtml}
      loading={loading}
      error={error}
    />
  )
}
