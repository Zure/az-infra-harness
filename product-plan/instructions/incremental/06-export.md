# Milestone 6: Export

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, Milestone 2-5 (all prior sections) complete

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the Export section — where users generate and download the complete infrastructure planning package containing ready-to-use prompts, implementation instructions, ADRs, and configurations for their chosen IaC tool (Bicep or Terraform).

## Overview

The Export section is the final step where users select their Infrastructure as Code tool (Bicep or Terraform/OpenTofu), run a command to generate the export package, and review what was exported. The export includes tool-specific prompts and instructions, all ADRs, component configurations, deployment strategy, and context documentation. Users can toggle between Bicep and Terraform views to see tool-specific content.

**Key Functionality:**
- Select IaC tool (Bicep or Terraform/OpenTofu)
- Preview what will be included in export (before generating)
- Run command to generate export package (tool-specific)
- View export summary with file counts and categories
- Toggle between Bicep and Terraform to see different file lists
- Copy export directory path
- View "How to Use" guide for the export package
- Success message after export is generated

## Components Provided

Copy the section components from `product-plan/sections/export/components/`:

- `Export.tsx` — Main section component
- `ExportCategoryCard.tsx` — Card showing an export category (prompts, instructions, ADRs, etc.)
- `index.ts` — Component exports

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
interface ExportData {
  isExported: boolean
  exportPath: string | null // e.g., "infrastructure-plan/"
  timestamp: string | null // ISO date
  bicep: ExportContents | null
  terraform: ExportContents | null
}

interface ExportContents {
  prompts: ExportItem
  instructions: ExportItem
  adrs: ExportItem
  configurations: ExportItem
  deployment: ExportItem
  overview: ExportItem
}

interface ExportItem {
  path: string // Relative path in export directory
  description: string
  files: string[] // List of files included
}

type IaCTool = 'terraform' | 'bicep'
```

**No callback props for this section** — The UI is read-only. The export is generated via coding agent command.

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: Select IaC Tool and Preview Export

1. User navigates to Export section
2. User sees page title "Export Infrastructure Plan" with description
3. User sees two large buttons: "Bicep" and "Terraform/OpenTofu"
4. User clicks on preferred tool (e.g., "Bicep")
5. Button highlights in blue to show selection
6. Preview section below shows what will be included (expandable cards):
   - Ready-to-use prompts (for Bicep)
   - Implementation instructions (for Bicep)
   - Architecture Decision Records
   - Component configurations
   - Deployment strategy
   - Product overview & context
7. User sees command box: "Generate infrastructure planning package by running: /export-infrastructure --tool=bicep"
8. **Outcome:** User understands what will be exported and which command to run

### Flow 2: Generate Export Package

1. User copies command "/export-infrastructure --tool=bicep"
2. User pastes command into coding agent
3. Agent generates complete export package in `infrastructure-plan/` directory:
   - Tool-specific prompts and instructions
   - All ADRs in markdown format
   - Component configurations as JSON and tool-specific formats
   - Deployment strategy and CI/CD templates
   - All context documentation
   - README with quick start guide
4. User returns to Export UI
5. Page updates to "Exported" view
6. **Outcome:** Export package is generated and ready to use

### Flow 3: Review Exported Package

1. After export is generated, page shows:
   - Export metadata (path: "infrastructure-plan/", timestamp)
   - IaC tool toggle (Bicep / Terraform)
   - Summary cards for each export category (6 cards)
2. Each card shows:
   - Icon
   - Category title (e.g., "Ready-to-Use Prompts")
   - Description (e.g., "Prompts for coding agents to implement infrastructure")
   - File count (e.g., "3 files")
   - Primary files listed (e.g., "bicep-prompt.md, terraform-prompt.md, validation-prompt.md")
3. User can toggle between Bicep and Terraform — file lists update to show tool-specific files
4. Success message at top: "Infrastructure Plan Ready" (green box)
5. Commands at bottom:
   - "Update export: /export-infrastructure --tool=bicep"
   - "View export directory" with copy button for path
6. **Outcome:** User understands what was exported and where to find it

### Flow 4: Toggle Between IaC Tools

1. User views exported package (Bicep selected)
2. User clicks "Terraform/OpenTofu" toggle button
3. File lists update immediately:
   - Prompts card shows "terraform-prompt.md" instead of "bicep-prompt.md"
   - Instructions card shows "terraform-instructions.md" instead of "bicep-instructions.md"
   - Configurations card shows "terraform.tfvars.json" instead of "bicep-parameters.json"
4. Command at bottom updates: "/export-infrastructure --tool=terraform"
5. **Outcome:** User can see tool-specific files for their chosen tool

### Flow 5: Use Export Package

1. User scrolls to "How to Use" section at bottom
2. User sees step-by-step guide:
   - Review the Export Package
   - Use the Ready-to-Use Prompt (copy prompt file, paste into coding agent)
   - Reference Architecture Decisions
   - Set Up CI/CD Pipeline
   - Validate and Deploy
3. User navigates to `infrastructure-plan/` directory
4. User opens `prompts/bicep-prompt.md` (or terraform)
5. User copies entire prompt and pastes into coding agent (Claude, GitHub Copilot, etc.)
6. Coding agent reads the instructions, ADRs, and configurations
7. Coding agent asks clarifying questions about environment and implementation details
8. Coding agent generates production-ready Bicep or Terraform code
9. **Outcome:** Infrastructure as code is implemented by the coding agent

## Empty States

The components include empty state designs. Make sure to handle:

- **Not exported yet:** Show IaC tool selection buttons and preview of what will be included
- **Export command shown:** Display command with selected tool parameter
- **Export generated:** Show summary cards and metadata

## Testing

See `product-plan/sections/export/tests.md` for UI behavior test specs covering:
- IaC tool selection button states
- Preview content display
- Export command generation with tool parameter
- Exported view rendering
- Summary cards with correct file counts
- Tool toggle functionality
- Success message display
- "How to Use" guide rendering

## Files to Reference

- `product-plan/sections/export/README.md` — Feature overview and design intent
- `product-plan/sections/export/tests.md` — UI behavior test specs
- `product-plan/sections/export/components/` — React components
- `product-plan/sections/export/types.ts` — TypeScript interfaces
- `product-plan/sections/export/sample-data.json` — Test data

## Done When

- [ ] IaC tool selection buttons render and highlight on click
- [ ] Preview shows what will be included (before export)
- [ ] Export command updates based on selected tool
- [ ] Copy button works for export command
- [ ] After export, page shows "Exported" view
- [ ] Export metadata displays (path, timestamp)
- [ ] All 6 summary cards render with icons, titles, descriptions, file counts
- [ ] File lists show tool-specific files correctly
- [ ] Toggle between Bicep and Terraform updates file lists immediately
- [ ] Success message appears after export (green box)
- [ ] "How to Use" guide displays step-by-step instructions
- [ ] Commands at bottom include correct tool parameter
- [ ] Responsive on mobile
