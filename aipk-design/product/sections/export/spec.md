# Export Section Specification

## Purpose
Generate the complete infrastructure planning package containing all the artifacts needed to implement the Azure infrastructure as code. The export includes ready-to-use prompts for coding agents, implementation instructions, ADRs, component configurations, and deployment strategy.

## Key Principles
- **Read-only UI**: The export is generated via a coding agent command
- **Single command**: One command generates the entire export package
- **Copy-first UX**: All commands and code snippets have copy buttons
- **Visual summary**: Show what's included in the export package

## User Flow

1. User views the Export page showing export status
2. If not exported yet, user sees the `/export-infrastructure` command
3. User runs the command in a coding agent
4. The agent generates the export package in `infrastructure-plan/` directory
5. Page shows summary of exported artifacts
6. User can download the entire package or copy the export path

## Data Structure

### ExportData
- `isExported` (boolean): Whether the export package has been generated
- `exportPath` (string): Path to the export directory (e.g., "infrastructure-plan/")
- `timestamp` (string): ISO date when exported
- `contents` (ExportContents): What's included in the export

### ExportContents
- `prompts` (ExportItem): Ready-to-use prompts for coding agents
- `instructions` (ExportItem): Implementation instructions
- `adrs` (ExportItem): Architecture decision records
- `configurations` (ExportItem): Component configurations
- `deployment` (ExportItem): Deployment strategy
- `overview` (ExportItem): Product overview and context

### ExportItem
- `path` (string): Relative path in export directory
- `description` (string): What this contains
- `files` (array of strings): List of files included

## UI Components

### Not Exported View
**Layout:**
- Page title: "Export Infrastructure Plan"
- Description explaining what will be generated
- **IaC Tool Selection**: Two large buttons to choose between Bicep or Terraform/OpenTofu
- Preview of what will be included (expandable sections showing different content based on tool selection):
  - Ready-to-use prompts (for selected tool)
  - Implementation instructions (for selected tool)
  - Architecture Decision Records
  - Component configurations
  - Deployment strategy
  - Product overview & context
- Large command box: "Generate infrastructure planning package by running: /export-infrastructure --tool={bicep|terraform}" (command updates based on tool selection)

### Exported View
**Layout:**
- Page title: "Export Infrastructure Plan"
- Export metadata (path, timestamp)
- **IaC Tool Toggle**: Switch between Bicep and Terraform/OpenTofu (updates all file lists and commands)
- Summary cards for each export category:
  - Prompts
  - Instructions
  - Architecture Decisions
  - Component Configurations
  - Deployment Strategy
  - Product Overview
- Each card shows:
  - Icon
  - Title
  - Description
  - File count
  - Primary files listed (different files for Bicep vs Terraform)
- Commands at bottom:
  - "Update export: /export-infrastructure --tool={bicep|terraform}"
  - "View export directory" with copy button for the path
- **Success message** (green box): "Infrastructure Plan Ready" - only visible AFTER export is generated (when isExported=true)
- **How to Use box**: Step-by-step guide on using the export package with coding agents

## Export Package Contents

The `/export-infrastructure` command should generate:

```
infrastructure-plan/
├── README.md                           # Quick start guide
├── product-overview.md                 # Product summary
│
├── prompts/                            # Ready-to-use prompts
│   ├── bicep-prompt.md                # Prompt for Bicep implementation
│   ├── terraform-prompt.md            # Prompt for Terraform implementation
│   └── validation-prompt.md           # Prompt for validation and testing
│
├── instructions/                       # Implementation guidance
│   ├── bicep-instructions.md          # Bicep-specific instructions
│   ├── terraform-instructions.md      # Terraform-specific instructions
│   └── deployment-guide.md            # Deployment process guide
│
├── decisions/                          # Architecture Decision Records
│   ├── adr-001-container-platform.md
│   ├── adr-002-static-web-apps.md
│   └── [all ADRs in markdown format]
│
├── configurations/                     # Component configurations
│   ├── components.json                # All component configurations
│   ├── deployment-strategy.md         # Deployment strategy
│   └── architecture-diagram.md        # Architecture diagram
│
└── context/                            # Additional context
    ├── infrastructure-context.md       # Infrastructure landscape
    ├── platform-context.md             # Platform services
    └── development-context.md          # Development environment
```

## Commands

### `/export-infrastructure --tool={bicep|terraform}`
Generates the complete infrastructure planning package in the `infrastructure-plan/` directory. The package includes:
- Ready-to-use prompts for the selected IaC tool (Bicep or Terraform/OpenTofu)
- Step-by-step implementation instructions for the selected tool
- All ADRs in markdown format
- Component configurations (as JSON and tool-specific formats like bicep-parameters.json or terraform.tfvars.json)
- Deployment strategy and CI/CD workflow templates (GitHub Actions, Azure Pipelines)
- All necessary context from earlier sections

**Parameters:**
- `--tool`: Required. Either `bicep` or `terraform`

**Example:**
- `/export-infrastructure --tool=bicep`
- `/export-infrastructure --tool=terraform`

## Design Requirements
- Mobile responsive
- Light/dark mode support
- Use product design tokens (blue/cyan/slate palette, Inter font)
- Icons for each export category
- File count badges
- Copy buttons on all paths and commands
- Clear visual hierarchy showing what's been exported
- IaC tool toggle clearly indicates which option is selected (blue highlight)
- File lists update immediately when toggling between tools
- Commands dynamically include the selected tool parameter

## How to Use (Displayed in Exported View)

A dedicated section at the bottom of the exported view explains the workflow:

1. **Review the Export Package** - Navigate to the export directory and review generated files
2. **Use the Ready-to-Use Prompt** - Copy the prompt file for your chosen tool and paste into a coding agent (Claude, GitHub Copilot, etc.) to generate production-ready infrastructure code
3. **Reference Architecture Decisions** - Review ADRs to understand the rationale behind infrastructure choices
4. **Set Up CI/CD Pipeline** - Use the workflow templates in the deployment directory
5. **Validate and Deploy** - Use the validation prompt to review infrastructure code before deployment

This section emphasizes the **agent-driven workflow** - users define requirements, the tool generates prompts, and coding agents implement the infrastructure. No manual step-by-step coding instructions are provided.
