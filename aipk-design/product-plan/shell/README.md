# Application Shell

## Overview

The Azure Infra Prompt Kit shell provides a sidebar-based navigation system that guides developers through the infrastructure planning process. The shell uses a vertical sidebar on the left showing the workflow steps with clear visual indicators for progress, and a content area on the right for the guided questions and forms.

## Components

- **AppShell.tsx** — Main layout wrapper with header and sidebar
- **Sidebar.tsx** — Vertical sidebar navigation with progress tracking
- **MainNav.tsx** — Alternative horizontal navigation (optional)

## Navigation Structure

The shell displays a 5-step workflow:

1. Application Definition
2. Context
3. Application Architecture
4. Architecture Decisions
5. Export

## Progress Tracking

- Completed steps show checkmarks and are clickable
- Current step is highlighted in blue
- Upcoming steps are muted and not clickable
- Progress bar at bottom shows completion percentage

## Responsive Behavior

- **Desktop:** Full sidebar visible (256px) with content area beside it
- **Tablet:** Sidebar remains visible, content area adjusts
- **Mobile:** Sidebar collapses to hamburger menu

## Design Notes

- Uses blue/cyan/slate color palette
- Clean, professional appearance matching Microsoft design language
- Progress bar provides quick visual feedback on workflow completion
- Sidebar reinforces the sequential, guided nature of the planning process
