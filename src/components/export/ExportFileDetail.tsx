'use client'

import { ArrowLeft, Terminal, FileCode, Copy, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CopyButton } from '@/components/shared/CopyButton'
import type { IaCTool } from './types'

interface ExportFileDetailProps {
  filePath: string
  tool: IaCTool
  content: string | null
  highlightedHtml: string | null
  loading: boolean
  error: string | null
}

function getLanguage(filePath: string): string {
  if (filePath.endsWith('.bicep') || filePath.endsWith('.bicepparam')) return 'bicep'
  if (filePath.endsWith('.tf') || filePath.endsWith('.tfvars')) return 'hcl'
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) return 'yaml'
  if (filePath.endsWith('.md')) return 'markdown'
  if (filePath.endsWith('.json')) return 'json'
  if (filePath.endsWith('.sh')) return 'bash'
  return 'text'
}

function getFileName(filePath: string): string {
  return filePath.split('/').pop() || filePath
}

export function ExportFileDetail({ filePath, tool, content, highlightedHtml, loading, error }: ExportFileDetailProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const toolLabel = tool === 'bicep' ? 'Bicep' : 'Terraform'
  const exportDir = tool === 'bicep' ? 'infra/bicep' : 'infra/tf'
  const fileName = getFileName(filePath)
  const language = getLanguage(filePath)

  const modifyPrompt = `Review the file ${exportDir}/${filePath} and make the following changes:\n\n[describe the changes you want]`

  const handleCopyContent = async () => {
    if (!content) return
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/code-generation')}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Code Generation
      </button>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <FileCode className="h-4 w-4" />
          <code className="font-mono text-xs">{exportDir}/{filePath}</code>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {fileName}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {toolLabel} infrastructure file
        </p>
      </div>

      {/* File content */}
      {loading && (
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading file...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {content !== null && (
        <>
          <div className="rounded-lg border-2 border-blue-500 bg-white dark:border-blue-600 dark:bg-slate-800">
            {/* File header bar */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{fileName}</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">{language}</span>
              </div>
              <button
                onClick={handleCopyContent}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto p-4">
              {highlightedHtml ? (
                <div
                  className="shiki-container text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
              ) : (
                <pre className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  <code>{content}</code>
                </pre>
              )}
            </div>
          </div>

          {/* Modify prompt */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Modify This File
            </h3>
            <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Copy the prompt below into your coding agent, then describe the changes you want to make:
            </p>
            <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <pre className="flex-1 min-w-0 whitespace-pre-wrap font-mono text-xs text-slate-700 dark:text-slate-300">{modifyPrompt}</pre>
              </div>
              <CopyButton text={modifyPrompt} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
