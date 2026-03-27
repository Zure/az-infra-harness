# Az Infra Harness

This project is an interactive planning tool for Azure infrastructure. A coding agent generates markdown and JSON files in `data/` which are displayed in a read-only UI.

## Key References

- `AGENTS.md` — Agent guide with workflow and conventions
- `DATA-STRUCTURE.md` — File formats and output locations for generated data
- `skills/` — Shared skill definitions (detailed prompts for each planning step)

## Available Commands

Run these as slash commands to generate infrastructure planning data:

- `/application-overview` — Generate application overview
- `/application-components` — Identify and document application components
- `/non-functional-requirements` — Gather non-functional requirements
- `/infrastructure-context` — Gather infrastructure context (network topology, landing zones, existing resources)
- `/generate-code-bicep` — Generate Azure infrastructure as Bicep code
- `/generate-code-terraform` — Generate Azure infrastructure as Terraform code

Each command reads its corresponding skill file from `skills/` and follows the instructions within.
