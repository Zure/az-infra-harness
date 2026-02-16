# Architecture Decision Records (ADRs)

This directory contains the Architecture Decision Records for the Azure infrastructure.

## File Structure

```
architecture-decisions/
├── adr-template.md          # Template for new ADRs
├── adrs/                    # Directory containing all ADRs
│   ├── adr-001-*.md
│   ├── adr-002-*.md
│   └── ...
└── README.md               # This file
```

## ADR Format

Each ADR is stored as a markdown file with the following structure:

```markdown
# Decision Title

**Status:** draft|reviewed|accepted  
**Date:** February 10, 2026  
**Category:** compute|data|networking|security|deployment

## Context

Description of the problem and context...

## Options Considered

### Option 1 Name

**Pros:**
- Advantage 1
- Advantage 2

**Cons:**
- Disadvantage 1
- Disadvantage 2

### Option 2 Name

**Pros:**
- Advantage 1

**Cons:**
- Disadvantage 1

## Decision

The chosen option and summary...

## Rationale

Why this option was chosen...

## Consequences

Impact of this decision...

## Related Components

- component-id-1
- component-id-2
```

## File Naming Convention

ADR files should follow this naming pattern:
- `adr-NNN-short-description.md`
- NNN is a zero-padded sequential number (001, 002, etc.)
- short-description is kebab-case

Examples:
- `adr-001-container-platform.md`
- `adr-002-static-web-apps.md`
- `adr-003-azure-sql-database.md`

## Status Values

- **draft**: Initial version, still being refined
- **reviewed**: Reviewed by team, pending final approval
- **accepted**: Approved and implemented

## Category Values

- **compute**: Compute and hosting decisions
- **data**: Database and storage decisions
- **networking**: Network architecture decisions
- **security**: Security and identity decisions
- **deployment**: CI/CD and deployment decisions

## Coding Agent Commands

Use these commands in your coding agent to work with ADRs:

### View ADR Template
```
/adr-template
```
Shows the ADR template that you can use to create new ADRs.

### Generate ADRs
```
/generate-adrs
```
Generates Architecture Decision Records based on the application definition and architecture.

### Refine Specific ADR
```
/refine-adr <adr-id>
```
Example: `/refine-adr adr-001-container-platform`

Refines a specific ADR based on feedback or additional context.

### Regenerate ADR
```
/regenerate-adr <adr-id>
```
Example: `/regenerate-adr adr-001-container-platform`

Completely regenerates an ADR from scratch, useful when architecture has changed significantly.

## Creating New ADRs

1. Copy `adr-template.md` to `adrs/adr-NNN-description.md`
2. Fill in all sections following the template structure
3. Ensure metadata is correct (Status, Date, Category)
4. Link to related components using their IDs
5. The ADR will automatically appear in the UI once saved

## Best Practices

- Keep ADRs focused on a single decision
- Document the "why" not just the "what"
- Include real trade-offs in pros/cons
- Link to related components and other ADRs
- Update status as decisions evolve
- Date reflects when decision was made/updated
