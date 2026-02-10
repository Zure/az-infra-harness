# Application Shell Specification

## Overview
The Azure Infra Prompt Kit shell provides a sidebar-based navigation system that guides developers through the infrastructure planning process. The shell uses a vertical sidebar on the left showing the workflow steps with clear visual indicators for progress, and a content area on the right for the guided questions and forms.

## Navigation Structure
- Step 1: Application Overview
- Step 2: Compute
- Step 3: Data Storage
- Step 4: Networking
- Step 5: Security & Identity
- Step 6: Monitoring & Observability
- Step 7: CI/CD & Deployment

## Layout Pattern
**Sidebar Navigation** - A fixed-width sidebar (256px) on the left side showing all workflow steps vertically, with a flexible content area on the right.

**Sidebar Components:**
- Product branding at top
- Vertical list of workflow steps with:
  - Completed steps (checkmark, clickable)
  - Current step (highlighted with primary color)
  - Upcoming steps (muted, not accessible)
- Progress bar at bottom showing completion percentage

**Content Area:**
- Maximum width container (800px) for optimal readability
- Scrollable area for form content
- Clean, spacious layout for questions and inputs

## Responsive Behavior
- **Desktop:** Full sidebar visible (256px) with content area beside it
- **Tablet:** Sidebar remains visible, content area adjusts
- **Mobile:** Sidebar collapses to hamburger menu (future enhancement)

## Design Notes
- Azure Portal aesthetic using blue/cyan/slate color palette
- Clean, professional appearance matching Microsoft design language
- Progress bar provides quick visual feedback on workflow completion
- Sidebar reinforces the sequential, guided nature of the planning process
- Each step shows its status: "Current step", "Completed", or upcoming (no label)
- Vertical layout accommodates any number of steps without cramping
- Inter font family for consistent typography
