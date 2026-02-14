# Azure Infra Prompt Kit — Product Overview

## Summary

A guided planning tool that helps application developers define their Azure infrastructure requirements through conversational questions, validates their choices against best practices, and generates comprehensive prompts for coding agents to implement infrastructure as code.

## Planned Sections

1. **Application Definition** — High-level functional overview of the application being deployed - name, description, purpose, and key features that will inform infrastructure requirements.
2. **Context** — Define the landscape the application lives in - enterprise landing zone with existing platform configurations, greenfield deployment, hybrid setup, or other organizational context that affects infrastructure choices.
3. **Application Architecture** — Define the application's components in detail - compute resources (App Service, Container Apps, AKS, Functions), data storage (SQL Database, Cosmos DB, Storage Account), networking (VNet, private endpoints), security (Managed Identity, Key Vault), monitoring (Application Insights), and deployment needs.
4. **Architecture Decisions** — Review and refine the architecture decisions generated based on the application architecture - each decision documented as an ADR with context, options considered, chosen solution, and rationale.
5. **Export** — Generate the complete infrastructure planning package with ready-to-use prompts for coding agents, implementation instructions, ADRs, and all specifications needed to implement the infrastructure as code.

## Product Entities

- **Application** — The application being deployed to Azure. Represents the complete system with its name, description, type (web app, API, microservices, static site), and overall requirements that drive infrastructure decisions.
- **InfrastructureComponent** — A piece of infrastructure needed for the application, such as compute, data storage, networking, security, monitoring, or CI/CD. Can represent either a new Azure resource to be created or a reference to existing platform team resources.
- **ArchitectureDecisionRecord** — Documents an architectural decision made during infrastructure planning. Captures what was decided, why it was chosen, what alternatives were considered, and the requirements that drove the decision.
- **ExportPackage** — The generated output containing ready-to-use prompts for coding agents, implementation instructions, ADR documentation, and structured specifications.

## Design System

**Colors:**
- Primary: blue
- Secondary: cyan
- Neutral: slate

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell with sidebar navigation
2. **Application Definition** — Planning boxes to define application overview, requirements, and components
3. **Context** — Planning boxes to capture infrastructure, platform, and development context
4. **Application Architecture** — Component cards and configuration, plus deployment strategy
5. **Architecture Decisions** — ADR template and list view with detail panel
6. **Export** — Export package generation with IaC tool selection

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
