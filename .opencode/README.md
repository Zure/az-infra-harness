# Azure Infrastructure Prompt Kit - OpenCode Configuration

This directory contains the OpenCode agent configuration for the Azure Infrastructure Prompt Kit.

Skills are defined in the shared `skills/` directory at the project root. The commands in this directory are thin wrappers that reference those shared skills.

## Available Commands

### Application Definition
- `/application-overview`
- `/non-functional-requirements`
- `/application-components`

### Context
- `/infrastructure-context`
- `/platform-context`
- `/development-context`

### Application Architecture
- `/configure-component`
- `/deployment-strategy`
- `/architecture-diagram`

### Architecture Decisions
- `/generate-adrs`
- `/refine-adr`
- `/adr-template`

### Export
- `/export-bicep`
- `/export-terraform`
