# Az Infra Harness

> AI-assisted Azure infrastructure planning — from requirements to production-ready Bicep or Terraform.

## Why this exists

Designing Azure infrastructure for a new application typically means context-switching between documentation, architecture diagrams, decision logs, and IaC code — often before you have a clear picture of your requirements. Important decisions get made informally, never documented, and later become tribal knowledge.

**Az Infra Harness** was built to fix that. It provides a structured, conversation-driven workflow that guides you through every planning phase — from describing your application to generating production-ready IaC — with your AI coding agent doing the heavy lifting. The result is a complete, auditable record of your infrastructure decisions alongside ready-to-deploy Bicep or Terraform code.

## What it does

Az Infra Harness is an interactive planning UI that you run locally next to your coding agent (Claude Code, GitHub Copilot, or OpenCode). You drive the process using slash commands in your agent; the agent asks you questions, captures your answers, and writes structured files that appear in the UI.

The workflow has five phases:

| Phase | What you produce |
|-------|-----------------|
| **1. Application Definition** | Overview, components, non-functional requirements |
| **2. Context** | Infrastructure landscape, platform services, development workflow |
| **3. Application Architecture** | Azure service mapping, deployment strategy, architecture diagram |
| **4. Architecture Decisions** | Architecture Decision Records (ADRs) |
| **5. Code Generation** | Production-ready Bicep or Terraform modules |

At the end you have a fully documented infrastructure design and IaC code ready to drop into your repository.

## Quick start

```bash
npx @zureltd/az-infra-harness
```

This starts the planning UI at [http://localhost:3000](http://localhost:3000).

### Options

```bash
npx @zureltd/az-infra-harness                        # default port 3000
npx @zureltd/az-infra-harness --port 8080            # custom port
npx @zureltd/az-infra-harness --data-dir ./my-plan   # custom data directory
```

### Install agent commands into your project

Before using the slash commands, install the agent configuration for your coding agent of choice:

```bash
npx @zureltd/az-infra-harness init --agent claude    # Claude Code
npx @zureltd/az-infra-harness init --agent copilot   # GitHub Copilot
npx @zureltd/az-infra-harness init --agent opencode  # OpenCode
```

This copies the slash command definitions and shared skill files into your project so your agent can use them.

## Using the slash commands

Once the UI is running and agent commands are installed, open your coding agent and run commands like:

```
/application-overview
/application-components
/non-functional-requirements
/infrastructure-context
/platform-context
/development-context
/configure-component
/deployment-strategy
/architecture-diagram
/generate-adrs
/generate-code-bicep
/generate-code-terraform
```

Your agent will ask you questions, then write structured files to `src/data/`. Refresh the browser to see your progress reflected in the UI.

## Requirements

- Node.js >= 18
- A supported coding agent: [Claude Code](https://claude.ai/code), [GitHub Copilot](https://github.com/features/copilot), or [OpenCode](https://opencode.ai)

## Contributing & development

To run from source:

```bash
git clone https://github.com/Zure/az-infra-harness
cd az-infra-harness/src
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) with hot reload.

```bash
npm test          # run unit tests
npm run lint      # run ESLint
npm run build     # build standalone production bundle
```

## License

MIT — see [LICENSE](../LICENSE).
