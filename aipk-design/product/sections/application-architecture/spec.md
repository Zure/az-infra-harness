# Application Architecture Specification

## Overview
The Application Architecture section shows all application components (defined in Application Definition) with their Azure infrastructure configurations, plus a unified deployment strategy. Components are grouped by type (compute, data, networking) and each component can be clicked to view or configure its Azure service details.

## User Flows
- View all application components grouped by type
- See configuration status for each component (configured vs not configured)
- Click on a component to view/configure its Azure service details
- View the deployment strategy box
- Copy deployment commands via copy button
- Navigate to Architecture Decisions when ready

## UI Requirements
- Display component cards grouped by type (Compute, Data, Networking)
- Each component card shows: name, description, type badge, configuration status
- Configured components have blue border, unconfigured have grey border
- Component cards are clickable to view/edit configuration
- Deployment box at the bottom (same style as other planning boxes)
- Deployment box shows command prompt when empty, markdown content when filled
- Large "Continue to Architecture Decisions" button at the bottom
- Responsive layout that stacks well on mobile devices

## Configuration
- shell: true
