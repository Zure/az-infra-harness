import { ArrowLeft, Terminal } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/shared/CopyButton'
import type { ADR } from './types'

interface ADRDetailProps {
  adr: ADR
  onBack: () => void
}

export function ADRDetail({ adr, onBack }: ADRDetailProps) {
  // Construct the full ADR markdown from the structured data
  // This is temporary - in real usage, the ADR would be stored as raw markdown
  const adrMarkdown = `# ${adr.title}

**Status:** ${adr.status}  
**Date:** ${new Date(adr.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}  
**Category:** ${adr.category}

## Context

${adr.context}

## Options Considered

${adr.options.map(option => `### ${option.name}

**Pros:**
${option.pros.map(pro => `- ${pro}`).join('\n')}

**Cons:**
${option.cons.map(con => `- ${con}`).join('\n')}
`).join('\n')}

## Decision

${adr.decision}

## Rationale

${adr.rationale}

## Consequences

${adr.consequences}

## Related Components

${adr.relatedComponents.map(id => `- ${id}`).join('\n')}
`

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Architecture Decisions
      </button>

      {/* ADR Content - Single box with markdown */}
      <div className="rounded-lg border-2 border-blue-500 bg-white p-6 dark:border-blue-600 dark:bg-slate-800">
        <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6 prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold">
          <ReactMarkdown>{adrMarkdown}</ReactMarkdown>
        </div>
      </div>

      {/* Action boxes */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Refine command */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Refine this ADR
                </p>
                <code className="block font-mono text-xs text-slate-600 dark:text-slate-400">
                  /refine-adr {adr.id}
                </code>
              </div>
            </div>
            <CopyButton text={`/refine-adr ${adr.id}`} />
          </div>
        </div>

        {/* Regenerate command */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Regenerate this ADR
                </p>
                <code className="block font-mono text-xs text-slate-600 dark:text-slate-400">
                  /regenerate-adr {adr.id}
                </code>
              </div>
            </div>
            <CopyButton text={`/regenerate-adr ${adr.id}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
