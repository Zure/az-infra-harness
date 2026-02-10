# Data Shape

## Entities

### Application
The application being deployed to Azure. Represents the complete system with its name, description, type (web app, API, microservices, static site), and overall requirements that drive infrastructure decisions.

### InfrastructureComponent
A piece of infrastructure needed for the application, such as compute, data storage, networking, security, monitoring, or CI/CD. Can represent either a new Azure resource to be created or a reference to existing platform team resources. Contains the component type, requirements gathered through questions, recommended Azure service, configuration details, and whether it's new or existing.

### ArchitectureDecisionRecord
Documents an architectural decision made during infrastructure planning. Captures what was decided, why it was chosen, what alternatives were considered, and the requirements that drove the decision. Provides crucial context for teams to understand infrastructure choices.

### ExportPackage
The generated output containing ready-to-use prompts for coding agents, implementation instructions, ADR documentation, and structured specifications. This is what gets handed off to development teams or coding agents to implement the actual infrastructure as code.

## Relationships

- Application has many InfrastructureComponents
- InfrastructureComponent has many ArchitectureDecisionRecords
- Application has one ExportPackage
- InfrastructureComponent can reference existing platform resources (networking, security, monitoring set up by platform teams)
