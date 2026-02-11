# Context Specification

## Overview
The Context section helps users define the landscape their application will be deployed into through three planning boxes. Each box captures different aspects of the existing environment - infrastructure, platform services, and development tooling - to understand what's already available versus what needs to be provisioned.

## User Flows
- View the three planning boxes with completion status
- See "Run in coding agent: /command" prompt for unfilled boxes
- View full markdown content for completed boxes
- Copy commands to clipboard via copy button
- Navigate to next section (Application Architecture) when ready

## UI Requirements
- Display three distinct planning boxes: Infrastructure Context, Platform Context, and Development Context
- Each box shows a checkbox indicator (checked when filled, unchecked when empty)
- Empty boxes display instructional text with copy button: "Run in coding agent: /[command]"
- Filled boxes render the full markdown content plus "Update this section" prompt with copy button
- Blue border for completed boxes, grey border for incomplete boxes
- Commands in completed boxes shown in grey, commands in incomplete boxes shown in blue
- Large "Continue to Application Architecture" button at the bottom
- Responsive layout that stacks well on mobile devices

## Configuration
- shell: true
