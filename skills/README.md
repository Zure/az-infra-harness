# Az Infra Harness - Shared Skills

This directory contains agent-agnostic skill definitions for the Az Infra Harness. Each skill is a detailed prompt (SKILL.md) that guides a coding agent through generating infrastructure planning data.

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

### Context

| Skill | Path | Status |
|-------|------|--------|
| Infrastructure Context | `context/infrastructure-context/SKILL.md` | Implemented |
| Platform Context | `context/platform-context/SKILL.md` | Implemented |
| Development Context | `context/development-context/SKILL.md` | Implemented |

### Application Architecture

| Skill | Path | Status |
|-------|------|--------|
| Configure Component | `application-architecture/configure-component/SKILL.md` | Implemented |
| Deployment Strategy | `application-architecture/deployment-strategy/SKILL.md` | Implemented |
| Architecture Diagram | `application-architecture/architecture-diagram/SKILL.md` | Implemented |

### Architecture Decisions

| Skill | Path | Status |
|-------|------|--------|
| Generate ADRs | `architecture-decisions/generate-adrs/SKILL.md` | Implemented |
| Refine ADR | `architecture-decisions/refine-adr/SKILL.md` | Implemented |
| ADR Template | `architecture-decisions/adr-template/SKILL.md` | Implemented |

### Code Generation (Implemented)

| Skill | Path | Status |
|-------|------|--------|
| Generate Code Bicep | `code-generation/generate-code-bicep/SKILL.md` | Implemented |
| Generate Code Terraform | `code-generation/generate-code-terraform/SKILL.md` | Implemented |
