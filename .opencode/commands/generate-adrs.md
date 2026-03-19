---
description: Read all planning data, propose relevant ADR topics, and generate Architecture Decision Records
agent: build
---

Please use the generate-adrs skill to generate Architecture Decision Records.

This skill reads all available planning data, proposes relevant ADR topics (compute platform, database selection, networking model, CI/CD, authentication, etc.), lets you confirm which to generate, and creates individual ADR files following the project template.
Once complete, ADR files will be generated at
`src/data/architecture-decisions/adrs/adr-{NNN}-{slug}.md`.
