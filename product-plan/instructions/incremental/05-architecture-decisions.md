# Milestone 5: Architecture Decisions

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, Milestone 2-4 (all prior sections) complete

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
