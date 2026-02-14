# Milestone 3: Context

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, Milestone 2 (Application Definition) complete

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
