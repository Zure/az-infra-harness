# Azure Infra Prompt Kit

## Description
A guided planning tool that helps application developers define their Azure infrastructure requirements through conversational questions, validates their choices against best practices, and generates comprehensive prompts for coding agents to implement infrastructure as code.

## Problems & Solutions

### Problem 1: IaC Complexity
Writing infrastructure as code is complex, error-prone, and requires deep expertise in both Azure services and IaC languages. Azure Infra Prompt Kit eliminates this by generating detailed, validated prompts that coding agents can use to write correct IaC.

### Problem 2: Knowledge Gap
Developers don't know which Azure services to use for their application requirements or how to configure them appropriately. The tool asks requirements-focused questions (traffic, scaling, data needs) and recommends the right Azure services based on answers.

### Problem 3: Poor Documentation
Architectural decisions aren't captured or explained, making it hard for teams to understand why certain infrastructure choices were made. Azure Infra Prompt Kit automatically generates Architecture Decision Records (ADRs) that document the rationale behind each choice.

### Problem 4: Lack of Decision Guidance
No structured way to validate if infrastructure choices align with actual application requirements, leading to over-provisioning or inadequate resources. The tool validates choices through guided questions and can recommend alternatives when misalignments are detected.

## Key Features
- Guided requirements gathering through conversational questions focused on application needs, not Azure service knowledge
- Smart service recommendations that translate requirements into appropriate Azure resources (Container Apps vs App Service vs AKS, etc.)
- Validation and override capability - validates choices against requirements while allowing manual overrides
- Automatic ADR generation documenting why each infrastructure component was chosen
- Adaptive flow that skips irrelevant sections based on application type (e.g., no data storage for static sites)
- Platform integration to reference existing configurations from platform teams (networking, security, monitoring, CI/CD)
- Comprehensive export package with ready-to-use prompts and implementation instructions for coding agents
- IaC language agnostic - lets implementation phase decide between Bicep, Terraform, or other tools
