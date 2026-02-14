# Azure Infra Prompt Kit — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Azure Infra Prompt Kit — Product Overview

## Summary

A guided planning tool that helps application developers define their Azure infrastructure requirements through conversational questions, validates their choices against best practices, and generates comprehensive prompts for coding agents to implement infrastructure as code.

## Planned Sections

1. **Application Definition** — High-level functional overview of the application being deployed - name, description, purpose, and key features that will inform infrastructure requirements.
2. **Context** — Define the landscape the application lives in - enterprise landing zone with existing platform configurations, greenfield deployment, hybrid setup, or other organizational context that affects infrastructure choices.
3. **Application Architecture** — Define the application's components in detail - compute resources (App Service, Container Apps, AKS, Functions), data storage (SQL Database, Cosmos DB, Storage Account), networking (VNet, private endpoints), security (Managed Identity, Key Vault), monitoring (Application Insights), and deployment needs.
4. **Architecture Decisions** — Review and refine the architecture decisions generated based on the application architecture - each decision documented as an ADR with context, options considered, chosen solution, and rationale.
5. **Export** — Generate the complete infrastructure planning package with ready-to-use prompts for coding agents, implementation instructions, ADRs, and all specifications needed to implement the infrastructure as code.

## Product Entities

- **Application** — The application being deployed to Azure. Represents the complete system with its name, description, type (web app, API, microservices, static site), and overall requirements that drive infrastructure decisions.
- **InfrastructureComponent** — A piece of infrastructure needed for the application, such as compute, data storage, networking, security, monitoring, or CI/CD. Can represent either a new Azure resource to be created or a reference to existing platform team resources.
- **ArchitectureDecisionRecord** — Documents an architectural decision made during infrastructure planning. Captures what was decided, why it was chosen, what alternatives were considered, and the requirements that drove the decision.
- **ExportPackage** — The generated output containing ready-to-use prompts for coding agents, implementation instructions, ADR documentation, and structured specifications.

## Design System

**Colors:**
- Primary: blue
- Secondary: cyan
- Neutral: slate

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell with sidebar navigation
2. **Application Definition** — Planning boxes to define application overview, requirements, and components
3. **Context** — Planning boxes to capture infrastructure, platform, and development context
4. **Application Architecture** — Component cards and configuration, plus deployment strategy
5. **Architecture Decisions** — ADR template and list view with detail panel
6. **Export** — Export package generation with IaC tool selection

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

---


## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections with sidebar navigation.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Color Palette:**
- Primary: `blue` (Used for buttons, active states, primary accents)
- Secondary: `cyan` (Used for completion indicators, secondary accents)
- Neutral: `slate` (Used for backgrounds, text, borders)

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with header and sidebar
- `Sidebar.tsx` — Sidebar navigation component
- `MainNav.tsx` — Alternative horizontal navigation (optional)

**Wire Up Navigation:**

The shell displays a 5-step workflow:

1. **Application Definition** — Define application overview, requirements, and components
2. **Context** — Define infrastructure, platform, and development context
3. **Application Architecture** — Configure components and deployment strategy
4. **Architecture Decisions** — Review and refine ADRs
5. **Export** — Generate infrastructure planning package

**Navigation Props:**

The `AppShell` component expects:
- `steps: WorkflowStep[]` — Array of workflow steps with id, number, label, and status
- `currentStep: number` — Current step number (1-5)
- `onNavigate?: (stepId: string) => void` — Navigation callback

**Workflow Step Interface:**
```typescript
interface WorkflowStep {
  id: string // e.g., "application-definition"
  number: number // 1-5
  label: string // e.g., "Application Definition"
  status: 'completed' | 'current' | 'upcoming'
}
```

**Progress Tracking:**

The sidebar shows:
- Checkmarks for completed steps (clickable)
- Numbered badge for current step (highlighted in blue)
- Numbered badge for upcoming steps (muted, not clickable)
- Progress bar at bottom showing completion percentage

**Responsive Behavior:**

- Desktop: Sidebar visible at 256px width
- Mobile: Sidebar hidden behind hamburger menu
- Header shows current step info on mobile

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured
- [ ] Shell renders with sidebar navigation
- [ ] All 5 workflow steps are visible in sidebar
- [ ] Navigation highlights current step correctly
- [ ] Completed steps can be clicked to navigate
- [ ] Progress bar reflects completion status
- [ ] Responsive on mobile with hamburger menu
- [ ] Header shows product branding and theme toggle

---


## Goal

Implement the Application Definition section — the first step where users define the core characteristics of their application through three planning boxes.

## Overview

The Application Definition section guides users through defining their application's identity, requirements, and component structure. Users interact with the UI by running commands in a coding agent which fills the planning boxes with generated content. This agent-driven workflow keeps the UI simple while enabling powerful AI-assisted planning.

**Key Functionality:**
- View three planning boxes showing completion status
- See "Run in coding agent" prompts for unfilled boxes
- View full markdown content for completed boxes
- Copy commands to clipboard via copy buttons
- Track progress via checkmarks on each box
- Navigate to Context section when ready

## Components Provided

Copy the section components from `product-plan/sections/application-definition/components/`:

- `ApplicationDefinition.tsx` — Main section component
- `PlanningBox.tsx` — Reusable planning box component
- `ComponentsBox.tsx` — Specialized box showing application components list
- `index.ts` — Component exports

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
interface PlanningBox {
  id: string
  title: string
  command: string // e.g., "/application-overview"
  isCompleted: boolean
  content: string | null // Markdown content
}

interface Component {
  id: string
  name: string
  type: 'compute' | 'data' | 'networking'
  description: string
}

interface ApplicationDefinition {
  completionPercentage: number
  completedBoxes: number
  totalBoxes: number
  lastUpdated: string // ISO timestamp
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onBoxClick` | User clicks on a planning box |
| `onComponentClick` | User clicks on a component in the components box |
| `onRefresh` | User clicks "Continue to Context" button |

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View Empty Planning Boxes

1. User navigates to Application Definition section
2. User sees three planning boxes: "Application Overview", "Non-Functional Requirements", "Application Components"
3. Each box shows unchecked checkbox (grey border)
4. Each box displays "Run in coding agent: /[command]" with copy button
5. **Outcome:** User understands which commands to run to fill each box

### Flow 2: Fill Planning Boxes via Coding Agent

1. User copies command (e.g., "/application-overview")
2. User pastes command into their coding agent
3. Coding agent generates markdown content
4. User saves the generated content (implementation-specific)
5. User returns to Application Definition UI
6. Box now shows completed state: checkmark, blue border, full markdown content
7. Box shows "Update this section" prompt with copy button
8. **Outcome:** Planning box is filled with rich markdown content

### Flow 3: Review Application Components

1. User completes the "/application-components" command in coding agent
2. Application Components box shows list of components grouped by type
3. Each component displays: name, type badge, description
4. User can click on components to view details (optional functionality)
5. **Outcome:** User sees all application components clearly listed

### Flow 4: Continue to Next Section

1. User completes all three planning boxes
2. All boxes show blue borders and checkmarks
3. User clicks "Continue to Context" button at bottom
4. **Outcome:** User navigates to Context section, Application Definition marked complete in sidebar

## Empty States

The components include empty state designs. Make sure to handle:

- **No boxes filled yet:** Show all three boxes with "Run in coding agent" prompts
- **Partially filled:** Some boxes show content, others show command prompts
- **No components yet:** Components box shows "Run in coding agent: /application-components"

## Testing

See `product-plan/sections/application-definition/tests.md` for UI behavior test specs covering:
- Empty state rendering for all boxes
- Filled state rendering with markdown content
- Component list rendering and interaction
- Copy button functionality
- Navigation to next section

## Files to Reference

- `product-plan/sections/application-definition/README.md` — Feature overview and design intent
- `product-plan/sections/application-definition/tests.md` — UI behavior test specs
- `product-plan/sections/application-definition/components/` — React components
- `product-plan/sections/application-definition/types.ts` — TypeScript interfaces
- `product-plan/sections/application-definition/sample-data.json` — Test data

## Done When

- [ ] All three planning boxes render correctly
- [ ] Empty boxes show command prompts with copy buttons
- [ ] Filled boxes render markdown content properly
- [ ] Components box displays component list with type badges
- [ ] Checkmark indicators show completion status correctly
- [ ] Blue border appears on completed boxes
- [ ] Copy buttons work for all commands
- [ ] "Continue to Context" button navigates to next section
- [ ] Responsive on mobile

---


## Goal

Implement the Context section — where users define the landscape their application will be deployed into through three planning boxes.

## Overview

The Context section helps users capture the existing environment and infrastructure landscape. This includes understanding what infrastructure already exists (landing zones, VNets, subscriptions), what platform services are available (monitoring, security, CI/CD), and what development tooling is in place. This context shapes the infrastructure recommendations and decisions later.

**Key Functionality:**
- View three planning boxes showing completion status
- See "Run in coding agent" prompts for unfilled boxes
- View full markdown content for completed boxes
- Copy commands to clipboard via copy buttons
- Track progress via checkmarks on each box
- Navigate to Application Architecture section when ready

## Components Provided

Copy the section components from `product-plan/sections/context/components/`:

- `Context.tsx` — Main section component
- `index.ts` — Component exports

**Note:** This section reuses the `PlanningBox` component from Application Definition. You can either copy it to a shared location or keep it section-specific based on your architecture.

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
interface PlanningBox {
  id: string
  title: string
  command: string // e.g., "/infrastructure-context"
  isCompleted: boolean
  content: string | null // Markdown content
}

interface ContextDefinition {
  completionPercentage: number
  completedBoxes: number
  totalBoxes: number
  lastUpdated: string // ISO timestamp
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onBoxClick` | User clicks on a planning box |
| `onNext` | User clicks "Continue to Application Architecture" button |

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View Empty Planning Boxes

1. User navigates to Context section (after completing Application Definition)
2. User sees three planning boxes: "Infrastructure Context", "Platform Context", "Development Context"
3. Each box shows unchecked checkbox (grey border)
4. Each box displays "Run in coding agent: /[command]" with copy button
5. **Outcome:** User understands which commands to run to define their context

### Flow 2: Define Infrastructure Context

1. User copies command "/infrastructure-context"
2. User pastes command into their coding agent
3. Agent asks questions about landing zones, subscriptions, VNets, resource groups
4. Agent generates markdown summarizing infrastructure landscape
5. User saves the generated content
6. Infrastructure Context box now shows: checkmark, blue border, markdown content
7. **Outcome:** Infrastructure landscape is documented

### Flow 3: Define Platform Context

1. User copies command "/platform-context"
2. User pastes command into their coding agent
3. Agent asks about existing platform services (monitoring, logging, security, networking)
4. Agent generates markdown listing available platform resources
5. User saves the generated content
6. Platform Context box shows completed state
7. **Outcome:** Available platform services are cataloged

### Flow 4: Define Development Context

1. User copies command "/development-context"
2. User pastes command into their coding agent
3. Agent asks about CI/CD pipelines, development tools, deployment processes
4. Agent generates markdown describing development environment
5. User saves the generated content
6. Development Context box shows completed state
7. **Outcome:** Development tooling and processes are documented

### Flow 5: Continue to Next Section

1. User completes all three context boxes
2. All boxes show blue borders and checkmarks
3. User clicks "Continue to Application Architecture" button at bottom
4. **Outcome:** User navigates to Application Architecture, Context marked complete in sidebar

## Empty States

The components include empty state designs. Make sure to handle:

- **No boxes filled yet:** Show all three boxes with "Run in coding agent" prompts
- **Partially filled:** Some boxes show content, others show command prompts

## Testing

See `product-plan/sections/context/tests.md` for UI behavior test specs covering:
- Empty state rendering for all boxes
- Filled state rendering with markdown content
- Copy button functionality
- Progress tracking
- Navigation to next section

## Files to Reference

- `product-plan/sections/context/README.md` — Feature overview and design intent
- `product-plan/sections/context/tests.md` — UI behavior test specs
- `product-plan/sections/context/components/` — React components
- `product-plan/sections/context/types.ts` — TypeScript interfaces
- `product-plan/sections/context/sample-data.json` — Test data

## Done When

- [ ] All three planning boxes render correctly
- [ ] Empty boxes show command prompts with copy buttons
- [ ] Filled boxes render markdown content properly
- [ ] Checkmark indicators show completion status correctly
- [ ] Blue border appears on completed boxes
- [ ] Copy buttons work for all commands
- [ ] "Continue to Application Architecture" button navigates to next section
- [ ] Progress metadata displays correctly (completion percentage, last updated)
- [ ] Responsive on mobile

---


## Goal

Implement the Application Architecture section — where users configure Azure infrastructure for each application component, define deployment strategy, and visualize the architecture.

## Overview

The Application Architecture section takes the components defined in Application Definition and enriches them with Azure infrastructure details. Users see all components grouped by type (Compute, Data, Networking) and can configure each one by running coding agent commands. The section also includes deployment strategy configuration and an optional architecture diagram visualization using Mermaid.

**Key Functionality:**
- View all application components grouped by type
- See configuration status for each component (configured vs not configured)
- Click on components to view/configure Azure infrastructure details
- View deployment strategy with CI/CD workflow
- View architecture diagram (Mermaid visualization)
- Copy configuration commands via copy buttons
- Navigate to Architecture Decisions when ready

## Components Provided

Copy the section components from `product-plan/sections/application-architecture/components/`:

- `ApplicationArchitecture.tsx` — Main section component
- `ComponentCard.tsx` — Component card with configuration status
- `DiagramBox.tsx` — Planning box for deployment strategy
- `MermaidDiagram.tsx` — Mermaid diagram renderer
- `index.ts` — Component exports

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
interface Component {
  id: string
  name: string
  type: 'compute' | 'data' | 'networking'
  description: string
  isConfigured: boolean
  configuration: ComponentConfiguration | null
}

interface ComponentConfiguration {
  azureService: string // e.g., "Container Apps", "Azure SQL Database"
  sku: string // e.g., "Consumption", "Standard"
  region: string // e.g., "East US 2"
  settings: Record<string, unknown> // Service-specific settings
}

interface Deployment {
  isConfigured: boolean
  command: string // e.g., "/deployment-strategy"
  content: string | null // Markdown content
}

interface ArchitectureDiagram {
  isConfigured: boolean
  command: string // e.g., "/generate-architecture-diagram"
  content: string | null // Mermaid diagram code
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onComponentClick` | User clicks on a component card |
| `onDeploymentClick` | User clicks on deployment box |
| `onDiagramClick` | User clicks on architecture diagram box |
| `onNext` | User clicks "Continue to Architecture Decisions" button |

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View Application Components

1. User navigates to Application Architecture section
2. User sees components grouped into three categories: Compute, Data, Networking
3. Each component card shows: name, type badge, description, configuration status
4. Configured components have blue border, unconfigured have grey border
5. **Outcome:** User has clear overview of all components and their configuration status

### Flow 2: Configure a Component

1. User clicks on an unconfigured component card (e.g., "Document Storage")
2. User sees "Run in coding agent: /configure-component {component-id}" prompt
3. User copies and pastes command into coding agent
4. Agent asks questions about requirements, recommends Azure service, suggests SKU and settings
5. Agent generates configuration including Azure service, SKU, region, and settings
6. User saves the configuration
7. Component card updates: blue border, shows Azure service badge
8. Clicking the card now shows full configuration details
9. **Outcome:** Component is configured with appropriate Azure infrastructure

### Flow 3: Review Configured Component

1. User clicks on a configured component card (e.g., "API Backend")
2. User sees full configuration details:
   - Azure Service: Container Apps
   - SKU: Consumption
   - Region: East US 2
   - Settings: minReplicas, maxReplicas, CPU, memory, ingress, privateEndpoint
3. User sees "Update this configuration: /configure-component {component-id}" prompt
4. **Outcome:** User can review and understand the infrastructure choices

### Flow 4: Define Deployment Strategy

1. User scrolls to Deployment Strategy box below components
2. If not configured, box shows "Run in coding agent: /deployment-strategy"
3. User copies command and runs in coding agent
4. Agent asks about CI/CD platform, environments, quality gates, deployment process
5. Agent generates deployment strategy markdown
6. User saves content
7. Deployment box shows: checkmark, blue border, full markdown content
8. **Outcome:** Deployment approach is documented and validated

### Flow 5: Generate Architecture Diagram

1. User scrolls to Architecture Diagram box
2. If not generated, box shows "Run in coding agent: /generate-architecture-diagram"
3. User copies command and runs in coding agent
4. Agent analyzes all components and context, generates Mermaid diagram
5. User saves diagram code
6. Diagram box renders the Mermaid visualization showing VNets, subnets, resources, connections
7. **Outcome:** Visual representation of infrastructure is available

### Flow 6: Continue to Next Section

1. User completes component configurations and deployment strategy
2. User clicks "Continue to Architecture Decisions" button at bottom
3. **Outcome:** User navigates to Architecture Decisions, Application Architecture marked complete

## Empty States

The components include empty state designs. Make sure to handle:

- **No components configured:** All component cards show grey border and "Not configured" status
- **No deployment strategy:** Deployment box shows "Run in coding agent" prompt
- **No diagram:** Diagram box shows "Run in coding agent" prompt
- **Mixed state:** Some components configured, others not

## Testing

See `product-plan/sections/application-architecture/tests.md` for UI behavior test specs covering:
- Component grouping by type
- Configuration status indicators
- Component card interactions
- Deployment box rendering
- Mermaid diagram rendering
- Navigation to next section

## Files to Reference

- `product-plan/sections/application-architecture/README.md` — Feature overview and design intent
- `product-plan/sections/application-architecture/tests.md` — UI behavior test specs
- `product-plan/sections/application-architecture/components/` — React components
- `product-plan/sections/application-architecture/types.ts` — TypeScript interfaces
- `product-plan/sections/application-architecture/sample-data.json` — Test data with configured components

## Done When

- [ ] Components render grouped by type (Compute, Data, Networking)
- [ ] Component cards show configuration status correctly
- [ ] Blue border on configured components, grey on unconfigured
- [ ] Clicking component cards triggers onComponentClick callback
- [ ] Deployment strategy box renders markdown when configured
- [ ] Architecture diagram box renders Mermaid diagrams correctly
- [ ] Copy buttons work for all commands
- [ ] "Continue to Architecture Decisions" button navigates to next section
- [ ] Responsive on mobile with stacked cards

---


## Goal

Implement the Architecture Decisions section — where users review and refine Architecture Decision Records (ADRs) that document the rationale behind infrastructure choices.

## Overview

The Architecture Decisions section displays ADRs that are automatically generated based on the application architecture and context. Each ADR documents a significant infrastructure decision with context, options considered, the chosen solution, rationale, and consequences. Users can view all ADRs in a list grouped by category, click to see details, and run commands to refine or regenerate specific ADRs.

**Key Functionality:**
- View ADR template defining the structure
- View list of generated ADRs grouped by category (Compute, Data, Networking, Security, Deployment)
- Click on an ADR to view full details in a modal or detail view
- See status badges (draft/reviewed/accepted) with color coding
- Copy commands to generate, refine, or regenerate ADRs
- Navigate to Export section when ready

## Components Provided

Copy the section components from `product-plan/sections/architecture-decisions/components/`:

- `ArchitectureDecisions.tsx` — Main section component
- `ADRsListBox.tsx` — List view of ADRs grouped by category
- `ADRDetail.tsx` — Detail view showing full ADR content
- `index.ts` — Component exports

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
interface ADR {
  id: string
  title: string
  category: 'compute' | 'data' | 'networking' | 'security' | 'deployment'
  status: 'draft' | 'reviewed' | 'accepted'
  date: string // ISO date
  context: string // Markdown
  options: ADROption[]
  decision: string // Markdown
  rationale: string // Markdown
  consequences: string // Markdown
  relatedComponents: string[] // Component IDs
}

interface ADROption {
  name: string
  pros: string[]
  cons: string[]
}

interface ADRTemplateBox {
  isCompleted: boolean
  command: string // e.g., "/adr-template"
  content: string | null // Markdown template
}

interface ADRsListBox {
  isCompleted: boolean
  command: string // e.g., "/generate-adrs"
  adrs: ADR[]
}
```

**No callback props for this section** — The UI is read-only. All ADR generation and modification happens via coding agent commands.

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View ADR Template

1. User navigates to Architecture Decisions section
2. User sees "ADR Template" box at the top
3. If template not defined, box shows "Run in coding agent: /adr-template"
4. If template defined, box shows the markdown template structure
5. **Outcome:** User understands the ADR format used throughout the project

### Flow 2: Generate All ADRs

1. User scrolls to "Architecture Decision Records" section
2. If no ADRs generated yet, box shows "Run in coding agent: /generate-adrs"
3. User copies command and runs in coding agent
4. Agent analyzes application architecture, context, and component configurations
5. Agent generates ADRs for key decisions (compute platform, database choice, networking topology, security approach, deployment pipeline)
6. User saves generated ADRs
7. ADRs appear grouped by category with status badges
8. **Outcome:** All significant architectural decisions are documented

### Flow 3: Review ADR Details

1. User sees list of ADRs grouped by category (Compute, Data, Networking, Security, Deployment)
2. Each ADR card shows: title, status badge (grey for draft, blue for reviewed, green for accepted), brief context snippet
3. User clicks on an ADR (e.g., "Use Azure Container Apps for API and Worker Compute")
4. Detail view opens showing:
   - Full title and metadata (status, date, related components)
   - Context section explaining the problem
   - Options considered with pros and cons for each
   - Chosen decision
   - Rationale for the choice
   - Consequences of the decision
5. Detail view includes commands to refine or regenerate this ADR
6. **Outcome:** User understands the reasoning behind each infrastructure choice

### Flow 4: Refine a Specific ADR

1. User clicks on an ADR to view details
2. User sees "Refine this ADR: /refine-adr {id}" command at bottom
3. User copies command and runs in coding agent
4. Agent opens conversational refinement session asking for additional context or constraints
5. Agent updates the ADR based on user input
6. User saves updated ADR
7. ADR shows updated content and potentially updated status
8. **Outcome:** ADR is refined with additional considerations

### Flow 5: Regenerate an ADR

1. User views ADR details
2. User sees "Regenerate this ADR: /regenerate-adr {id}" command
3. User copies command and runs in coding agent
4. Agent completely regenerates the ADR from scratch based on current architecture
5. User saves regenerated ADR
6. **Outcome:** ADR reflects latest architectural state

### Flow 6: Continue to Export

1. User reviews all ADRs
2. User clicks "Continue to Export" button at bottom
3. **Outcome:** User navigates to Export section, Architecture Decisions marked complete

## Empty States

The components include empty state designs. Make sure to handle:

- **No template defined:** Template box shows "Run in coding agent" prompt
- **No ADRs generated:** ADRs list box shows "Run in coding agent: /generate-adrs" prompt
- **ADRs list empty:** Show helpful message encouraging user to generate ADRs

## Testing

See `product-plan/sections/architecture-decisions/tests.md` for UI behavior test specs covering:
- Template box rendering
- ADRs list rendering grouped by category
- Status badge colors (draft/reviewed/accepted)
- ADR detail view rendering
- Markdown content rendering for all sections
- Related components display
- Command copy functionality

## Files to Reference

- `product-plan/sections/architecture-decisions/README.md` — Feature overview and design intent
- `product-plan/sections/architecture-decisions/tests.md` — UI behavior test specs
- `product-plan/sections/architecture-decisions/components/` — React components
- `product-plan/sections/architecture-decisions/types.ts` — TypeScript interfaces
- `product-plan/sections/architecture-decisions/sample-data.json` — Test data with sample ADRs

## Done When

- [ ] ADR template box renders markdown content correctly
- [ ] ADRs list shows all ADRs grouped by category
- [ ] Status badges use correct colors (grey/blue/green for draft/reviewed/accepted)
- [ ] Clicking an ADR opens detail view with full content
- [ ] Detail view renders all ADR sections (context, options, decision, rationale, consequences)
- [ ] Options show pros and cons lists properly
- [ ] Related components are displayed
- [ ] Empty states show command prompts correctly
- [ ] Copy buttons work for all commands
- [ ] "Continue to Export" button navigates to next section
- [ ] Responsive on mobile

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

---

