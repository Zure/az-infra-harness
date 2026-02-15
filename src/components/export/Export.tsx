'use client'

import { useState } from 'react'
import { Terminal, FileCode, BookOpen, FileCheck, Layers, Package, FileText, Download, Check } from 'lucide-react'
import { ExportCategoryCard } from './ExportCategoryCard'
import { CopyButton } from '@/components/shared/CopyButton'
import type { ExportData, IaCTool } from './types'

interface ExportProps {
  data: ExportData
}

export function Export({ data }: ExportProps) {
  const [selectedTool, setSelectedTool] = useState<IaCTool>('bicep')
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (tool: IaCTool) => {
    setIsDownloading(true)
    try {
      const response = await fetch(`/api/export/download?tool=${tool}`)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `infrastructure-export-${tool}-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download export. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const bicepExport = data.bicep
  const terraformExport = data.terraform
  const hasAnyExport = bicepExport.exists || terraformExport.exists

  // Get current tool export data
  const currentExport = selectedTool === 'bicep' ? bicepExport : terraformExport
  
  // Format the timestamp
  const formattedDate = currentExport.timestamp 
    ? new Date(currentExport.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : ''

  // Reusable "What's Included" section
  const WhatsIncludedSection = () => (
    <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        What&apos;s Included
      </h2>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Ready-to-use Prompts
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Copy-paste prompts for {selectedTool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'} implementation
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Implementation Instructions
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Step-by-step guidance for {selectedTool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Architecture Decision Records
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              All ADRs exported as markdown files
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Component Configurations
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Detailed configurations for all Azure services
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Deployment Strategy
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              CI/CD pipeline and deployment process documentation
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Product Overview & Context
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Complete context about your application and environment
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // Reusable export command section
  const ExportCommandSection = () => (
    <div className="rounded-lg border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Terminal className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Generate infrastructure planning package by running in coding agent:
            </p>
            <code className="mt-1 block font-mono text-sm text-blue-600 dark:text-blue-400">
              /export-infrastructure --tool={selectedTool}
            </code>
          </div>
        </div>
        <CopyButton text={`/export-infrastructure --tool=${selectedTool}`} />
      </div>
    </div>
  )

  // If no exports at all, show initial state
  if (!hasAnyExport) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Export Infrastructure Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Generate the complete infrastructure planning package with prompts, instructions, ADRs, and configurations
          </p>
        </div>

        {/* IaC Tool Selection */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Choose Infrastructure as Code Tool
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTool('bicep')}
              className={`flex-1 rounded-lg border-2 p-4 text-center font-medium transition-all ${
                selectedTool === 'bicep'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Bicep
            </button>
            <button
              onClick={() => setSelectedTool('terraform')}
              className={`flex-1 rounded-lg border-2 p-4 text-center font-medium transition-all ${
                selectedTool === 'terraform'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Terraform / OpenTofu
            </button>
          </div>
        </div>

        <WhatsIncludedSection />
        <ExportCommandSection />
      </div>
    )
  }

  // At least one export exists - show main export view
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Export Infrastructure Plan
        </h1>
        {currentExport.exists && (
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Exported to: <code className="font-mono text-xs">{currentExport.exportPath}</code></span>
            </div>
            {formattedDate && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{formattedDate}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* IaC Tool Toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setSelectedTool('bicep')}
          className={`relative rounded-lg border-2 px-6 py-2.5 font-medium transition-all ${
            selectedTool === 'bicep'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          Bicep
          {bicepExport.exists && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 dark:bg-green-600">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
          )}
        </button>
        <button
          onClick={() => setSelectedTool('terraform')}
          className={`relative rounded-lg border-2 px-6 py-2.5 font-medium transition-all ${
            selectedTool === 'terraform'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          Terraform / OpenTofu
          {terraformExport.exists && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 dark:bg-green-600">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
          )}
        </button>
      </div>

      {/* Show "What's Included" and export command if current tool hasn't been exported */}
      {!currentExport.exists && (
        <div className="mx-auto max-w-4xl space-y-6">
          <WhatsIncludedSection />
          <ExportCommandSection />
        </div>
      )}

      {/* Export contents - only show if current tool has been exported */}
      {currentExport.exists && currentExport.contents && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <ExportCategoryCard
              title="Prompts"
              item={currentExport.contents.prompts}
              icon={<FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
            <ExportCategoryCard
              title="Instructions"
              item={currentExport.contents.instructions}
              icon={<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
            <ExportCategoryCard
              title="Architecture Decisions"
              item={currentExport.contents.adrs}
              icon={<FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
            <ExportCategoryCard
              title="Configurations"
              item={currentExport.contents.configurations}
              icon={<Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
            <ExportCategoryCard
              title="Deployment"
              item={currentExport.contents.deployment}
              icon={<Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
            <ExportCategoryCard
              title="Overview & Context"
              item={currentExport.contents.overview}
              icon={<FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Update or View Export
            </h3>
            
            {/* Update command */}
            <div className="flex items-start justify-between gap-3 rounded border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Terminal className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Regenerate export:
                  </p>
                  <code className="mt-0.5 block font-mono text-xs text-slate-700 dark:text-slate-300">
                    /export-infrastructure --tool={selectedTool}
                  </code>
                </div>
              </div>
              <CopyButton text={`/export-infrastructure --tool=${selectedTool}`} />
            </div>

            {/* Export path */}
            <div className="flex items-start justify-between gap-3 rounded border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Package className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Export directory:
                  </p>
                  <code className="mt-0.5 block font-mono text-xs text-slate-700 dark:text-slate-300">
                    {currentExport.exportPath}
                  </code>
                </div>
              </div>
              <CopyButton text={currentExport.exportPath || ''} />
            </div>
          </div>

          {/* Success message with download */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 flex-1">
                <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                    Infrastructure Plan Ready
                  </h4>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Your infrastructure planning package for {selectedTool === 'bicep' ? 'Bicep' : 'Terraform/OpenTofu'} has been generated. You can now use the prompts and instructions to implement your Azure infrastructure as code.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(selectedTool)}
                disabled={isDownloading}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-600"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? 'Downloading...' : 'Download ZIP'}
              </button>
            </div>
          </div>

          {/* How to Use */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              How to Use This Export
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    1
                  </span>
                  Review the Export Package
                </h4>
                <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">
                  Navigate to the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">{currentExport.exportPath}</code> directory and review the generated files. Each section contains documentation and specifications for your infrastructure.
                </p>
              </div>

              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    2
                  </span>
                  Use the Ready-to-Use Prompt
                </h4>
                <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">
                  Copy the prompt from <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">prompts/{selectedTool === 'bicep' ? 'bicep' : 'terraform'}-prompt.md</code> and paste it into a coding agent (like Claude, GitHub Copilot, or any AI assistant). The agent will generate complete, production-ready infrastructure code based on your specifications.
                </p>
              </div>

              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                  Reference Architecture Decisions
                </h4>
                <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">
                  As you implement, refer to the ADRs in the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">decisions/</code> directory to understand the rationale behind each infrastructure choice. This helps ensure the implementation aligns with the documented decisions.
                </p>
              </div>

              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    4
                  </span>
                  Set Up CI/CD Pipeline
                </h4>
                <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">
                  Use the workflow files in the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">deployment/</code> directory to configure your CI/CD pipeline. These templates are pre-configured for your deployment strategy.
                </p>
              </div>

              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    5
                  </span>
                  Validate and Deploy
                </h4>
                <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">
                  Use the validation prompt in <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">prompts/validation-prompt.md</code> to review your infrastructure code before deployment. This ensures best practices and catches potential issues early.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
