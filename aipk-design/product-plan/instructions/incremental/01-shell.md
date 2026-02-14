# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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
