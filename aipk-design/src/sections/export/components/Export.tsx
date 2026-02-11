import { useState } from 'react'
import { Terminal, FileCode, BookOpen, FileCheck, Layers, Package, FileText } from 'lucide-react'
import { ExportCategoryCard } from './ExportCategoryCard'
import { CopyButton } from '@/sections/application-definition/components/PlanningBox'
import type { ExportData, IaCTool } from '@/../product/sections/export/types'

interface ExportProps {
  data: ExportData
}

export function Export({ data }: ExportProps) {
  const [selectedTool, setSelectedTool] = useState<IaCTool>('bicep')

  // If not exported yet, show the export command
  if (!data.isExported || !data.bicep || !data.terraform) {
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

        {/* What will be included */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            What's Included
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

        {/* Export command */}
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
      </div>
    )
  }

  // Format the timestamp
  const formattedDate = data.timestamp 
    ? new Date(data.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : ''

  // Get the contents for the selected tool
  const contents = selectedTool === 'bicep' ? data.bicep : data.terraform

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Export Infrastructure Plan
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Exported to: <code className="font-mono text-xs">{data.exportPath}</code></span>
          </div>
          {formattedDate && (
            <>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>
      </div>

      {/* IaC Tool Toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setSelectedTool('bicep')}
          className={`rounded-lg border-2 px-6 py-2.5 font-medium transition-all ${
            selectedTool === 'bicep'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          Bicep
        </button>
        <button
          onClick={() => setSelectedTool('terraform')}
          className={`rounded-lg border-2 px-6 py-2.5 font-medium transition-all ${
            selectedTool === 'terraform'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          Terraform / OpenTofu
        </button>
      </div>

      {/* Export contents */}
      <div className="grid gap-6 md:grid-cols-2">
        <ExportCategoryCard
          title="Prompts"
          item={contents.prompts}
          icon={<FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <ExportCategoryCard
          title="Instructions"
          item={contents.instructions}
          icon={<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <ExportCategoryCard
          title="Architecture Decisions"
          item={contents.adrs}
          icon={<FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <ExportCategoryCard
          title="Configurations"
          item={contents.configurations}
          icon={<Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <ExportCategoryCard
          title="Deployment"
          item={contents.deployment}
          icon={<Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <ExportCategoryCard
          title="Overview & Context"
          item={contents.overview}
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
                {data.exportPath}
              </code>
            </div>
          </div>
          <CopyButton text={data.exportPath || ''} />
        </div>
      </div>

      {/* Success message */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
        <div className="flex gap-3">
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
              Navigate to the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">{data.exportPath}</code> directory and review the generated files. Each section contains documentation and specifications for your infrastructure.
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
    </div>
  )
}
