# Az Infra Harness

This project is an interactive planning tool for Azure infrastructure. A coding agent generates markdown and JSON files in `src/data/` which are displayed in a read-only UI.

## Key References

- `AGENTS.md` — Agent guide with workflow and conventions
- `DATA-STRUCTURE.md` — File formats and output locations for generated data
- `skills/` — Shared skill definitions (detailed prompts for each planning step)

## Command-to-Skill Mapping

When a user runs one of these prompts, read the corresponding skill file and follow its instructions:

| Prompt | Skill File |
|--------|-----------|
| `application-overview` | `skills/application-definition/application-overview/SKILL.md` |
| `application-components` | `skills/application-definition/application-components/SKILL.md` |
| `non-functional-requirements` | `skills/application-definition/non-functional-requirements/SKILL.md` |
| `infrastructure-context` | `skills/context/infrastructure-context/SKILL.md` |
| `generate-code-bicep` | `skills/code-generation/generate-code-bicep/SKILL.md` |
| `generate-code-terraform` | `skills/code-generation/generate-code-terraform/SKILL.md` |
