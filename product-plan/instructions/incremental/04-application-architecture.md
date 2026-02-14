# Milestone 4: Application Architecture

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, Milestone 2 (Application Definition) complete, Milestone 3 (Context) complete

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
