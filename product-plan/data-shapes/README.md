# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **PlanningBox** — Represents a planning box in Application Definition and Context sections
- **Component** — Application component with optional Azure infrastructure configuration
- **ADR** — Architecture Decision Record with context, options, decision, and rationale
- **ExportData** — Export package metadata and contents

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/application-definition/types.ts`
- `sections/context/types.ts`
- `sections/application-architecture/types.ts`
- `sections/architecture-decisions/types.ts`
- `sections/export/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
