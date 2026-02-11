# Application Definition Specification

## Overview
The Application Definition section guides users through defining the core characteristics of their application through three planning boxes. Each box either prompts the user to run a command in a coding agent or displays the generated markdown content when complete.

## User Flows
- View the three planning boxes with completion status
- See "Run in coding agent: /command" prompt for unfilled boxes
- View full markdown content for completed boxes
- Track progress via checkmarks showing which boxes are complete
- Navigate between boxes to review or update content

## UI Requirements
- Display three distinct planning boxes in sequence: Application Overview, Non-Functional Requirements, and Application Components
- Each box shows a checkbox indicator (checked when filled, unchecked when empty)
- Empty boxes display instructional text with copy button: "Run in coding agent: /[command]"
- Filled boxes render the full markdown content plus "Update this section" prompt with copy button
- Blue border for completed boxes, grey border for incomplete boxes
- Commands in completed boxes shown in grey, commands in incomplete boxes shown in blue
- Boxes should be visually distinct cards with clear boundaries
- Markdown content should be properly formatted with headings, lists, and paragraphs
- Large "Continue to Context" button at the bottom
- Responsive layout that stacks well on mobile devices

## Configuration
- shell: true
