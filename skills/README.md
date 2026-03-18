# Azure Infrastructure Prompt Kit - Shared Skills

This directory contains agent-agnostic skill definitions for the Azure Infrastructure Prompt Kit. Each skill is a detailed prompt (SKILL.md) that guides a coding agent through generating infrastructure planning data.

These skills are referenced by thin wrappers in each supported agent's config directory:
- **OpenCode**: `.opencode/commands/`
- **Claude Code**: `.claude/commands/`
- **GitHub Copilot**: `.github/prompts/`

## Available Skills

### Application Definition (Implemented)

| Skill | Path | Status |
|-------|------|--------|
| Application Overview | `application-definition/application-overview/SKILL.md` | Implemented |
| Application Components | `application-definition/application-components/SKILL.md` | Implemented |
| Non-Functional Requirements | `application-definition/non-functional-requirements/SKILL.md` | Implemented |

### Context (Stubs)

| Skill | Path | Status |
|-------|------|--------|
| Infrastructure Context | `context/infrastructure-context/SKILL.md` | Not yet implemented |
| Platform Context | `context/platform-context/SKILL.md` | Not yet implemented |
| Development Context | `context/development-context/SKILL.md` | Not yet implemented |

### Application Architecture (Stubs)

| Skill | Path | Status |
|-------|------|--------|
| Configure Component | `application-architecture/configure-component/SKILL.md` | Not yet implemented |
| Deployment Strategy | `application-architecture/deployment-strategy/SKILL.md` | Not yet implemented |
| Architecture Diagram | `application-architecture/architecture-diagram/SKILL.md` | Not yet implemented |

### Architecture Decisions (Stubs)

| Skill | Path | Status |
|-------|------|--------|
| Generate ADRs | `architecture-decisions/generate-adrs/SKILL.md` | Not yet implemented |
| Refine ADR | `architecture-decisions/refine-adr/SKILL.md` | Not yet implemented |
| ADR Template | `architecture-decisions/adr-template/SKILL.md` | Not yet implemented |

### Export (Implemented)

| Skill | Path | Status |
|-------|------|--------|
| Export Bicep | `export/export-bicep/SKILL.md` | Implemented |
| Export Terraform | `export/export-terraform/SKILL.md` | Implemented |
