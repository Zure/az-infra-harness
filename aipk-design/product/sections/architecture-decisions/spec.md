# Architecture Decisions Section Specification

## Purpose
Review and refine the architecture decision records (ADRs) that have been automatically generated based on the application architecture. Each ADR documents a significant architectural decision with context, options considered, the chosen solution, and rationale.

## Key Principles
- **Read-only UI**: All ADR generation and refinement happens via coding agent commands
- **Agent-driven workflow**: Users run commands to generate or refine ADRs
- **Copy-first UX**: Every command has a copy button for easy execution
- **Visual feedback**: Clear status indicators show which ADRs exist and which are being refined

## User Flow

1. User views a list of generated ADRs grouped by category
2. Each ADR shows title, status, and brief context
3. User can click on an ADR to see full details
4. User can run commands to:
   - Generate all ADRs: `/generate-adrs`
   - Refine a specific ADR: `/refine-adr {id}`
   - Regenerate a specific ADR: `/regenerate-adr {id}`
5. When all ADRs are reviewed, user clicks "Continue to Export"

## Data Structure

### ADR (Architecture Decision Record)
- `id` (string): Unique identifier (kebab-case)
- `title` (string): Decision title
- `category` (string): Category like "compute", "data", "networking", "security", "deployment"
- `status` (string): "draft" | "reviewed" | "accepted"
- `date` (string): ISO date when generated
- `context` (string): Markdown - Why this decision is needed
- `options` (array): Options considered
  - `name` (string): Option name
  - `pros` (array of strings): Advantages
  - `cons` (array of strings): Disadvantages
- `decision` (string): Markdown - The chosen solution
- `rationale` (string): Markdown - Why this option was chosen
- `consequences` (string): Markdown - Impact of this decision
- `relatedComponents` (array of strings): Component IDs this affects

## UI Components

### Main View
**Layout:**
- Page title: "Architecture Decisions"
- Description: "Review the architecture decision records generated for your application"
- Command box (if no ADRs): "Generate all architecture decisions by running: /generate-adrs"
- ADR list grouped by category (Compute, Data, Networking, Security, Deployment)
- Continue button at bottom

**ADR Card:**
- Title
- Status badge (draft/reviewed/accepted) - grey for draft, blue for reviewed, green for accepted
- Brief context snippet (first 100 chars)
- Click to view full details
- Shows related components count

### Detail View
**Layout:**
- Back button
- ADR title
- Status badge
- Date
- Related components (linked if possible)
- Full ADR content:
  - Context section
  - Options considered (each option with pros/cons)
  - Decision section
  - Rationale section
  - Consequences section
- Commands at bottom:
  - "Refine this ADR: /refine-adr {id}"
  - "Regenerate this ADR: /regenerate-adr {id}"

## Commands

### `/generate-adrs`
Generates all ADRs based on the application architecture, context, and component configurations.

### `/refine-adr {id}`
Opens a conversational refinement session for a specific ADR where the user can provide additional context or constraints.

### `/regenerate-adr {id}`
Completely regenerates a specific ADR from scratch based on current architecture.

## Sample ADRs

The sample data should include ADRs covering:
1. **Compute**: Why Container Apps vs App Service vs AKS
2. **Data**: Why Azure SQL vs Cosmos DB for primary database
3. **Networking**: Hub-spoke topology vs single VNet
4. **Security**: Managed Identity vs Service Principal
5. **Deployment**: Why GitHub Actions vs Azure DevOps

## Design Requirements
- Mobile responsive
- Light/dark mode support
- Use product design tokens (blue/cyan/slate palette, Inter font)
- Status badges with appropriate colors
- Markdown rendering for all content sections
- Copy buttons on all commands
