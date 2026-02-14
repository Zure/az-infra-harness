# Milestone 2: Application Definition

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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
