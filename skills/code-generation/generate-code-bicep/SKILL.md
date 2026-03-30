---
name: generate-code-bicep
description: Generate Azure infrastructure as Bicep code from planning data
---

# Export Bicep — Generate Azure Infrastructure as Code

You are an expert Azure infrastructure engineer. Your task is to generate a complete, production-ready Bicep deployment from the planning data in this project.

## Input: Read Planning Data

Read whatever planning data exists in `infra/`. Use what's available, gracefully default when files are absent.

### Required (must exist)
- `infra/application-definition/application-overview.md` — App name, description, purpose, features

### Optional (use if present, default if absent)
- `infra/application-definition/application-components.md` — Component list in markdown (`## Name`, `**Type:** Compute|Data|Networking`, description)
- `infra/application-definition/non-functional-requirements.md` — Scale, availability, security, etc.
- `infra/context/development-context.md` — CI/CD platform preference (GitHub Actions, Azure DevOps, etc.)
- `infra/context/infrastructure-context.md` — Network topology, landing zones, existing resources, connectivity
- `infra/context/platform-context.md` — Identity, security services, monitoring, platform services
- `infra/application-architecture/` — Architecture details
- `infra/application-architecture/components/*.json` — Azure service configurations per component (`{ azureService, sku, region, settings }`)
- `infra/application-architecture/deployment-strategy.md` — CI/CD and deployment process details
- `infra/application-architecture/architecture-diagram.md` — Mermaid architecture diagram
- `infra/architecture-decisions/adrs/` — ADRs

### Defaults when data is missing
- **Components absent**: If `application-components.md` is missing, generate a minimal setup with one compute module (Container Apps) and one data module (Azure SQL)
- **Component configs absent**: If `application-architecture/components/*.json` files exist, use them for Azure service selection, SKU, region, and settings. If absent, use the Azure Service Mapping table below to infer from component types
- **NFRs absent**: Use sensible defaults (99.9% SLA, single region, Standard SKUs)
- **CI/CD platform absent**: Default to GitHub Actions
- **Architecture absent**: Use a flat resource group layout with VNet isolation

## Azure Service Mapping

Map component types to Azure services automatically:

| Component Type | Default Azure Service | Bicep Resource |
|---|---|---|
| Compute (web/frontend) | Azure Static Web Apps | `Microsoft.Web/staticSites` |
| Compute (api/backend) | Azure Container Apps | `Microsoft.App/containerApps` |
| Compute (worker/background) | Azure Container Apps (scale-to-zero) | `Microsoft.App/containerApps` |
| Compute (function) | Azure Functions (Consumption) | `Microsoft.Web/sites` |
| Data (relational/sql) | Azure SQL Database | `Microsoft.Sql/servers/databases` |
| Data (nosql/document) | Azure Cosmos DB | `Microsoft.DocumentDB/databaseAccounts` |
| Data (cache) | Azure Cache for Redis | `Microsoft.Cache/redis` |
| Data (storage/blob) | Azure Storage Account | `Microsoft.Storage/storageAccounts` |
| Networking (gateway) | Azure Application Gateway | `Microsoft.Network/applicationGateways` |
| Networking (loadbalancer) | Azure Load Balancer | `Microsoft.Network/loadBalancers` |
| Networking (firewall) | Azure Firewall | `Microsoft.Network/azureFirewalls` |

Use the component `type` and `description` fields to pick the best match. If the description mentions "React", "SPA", "static" → Static Web Apps. If it mentions "API", "REST", "container" → Container Apps. And so on.

## Output: Generate Files

Generate all files into the `infra/bicep/` directory (inside the `infra/` directory alongside all other planning data).

### Output Structure

```
infra/bicep/
├── main.bicep                    # Orchestration: calls all modules
├── modules/
│   ├── networking.bicep          # VNet, subnets, NSGs
│   ├── security.bicep            # Key Vault, managed identity
│   ├── monitoring.bicep          # App Insights, Log Analytics
│   ├── compute-<name>.bicep      # One per compute component
│   └── data-<name>.bicep         # One per data component
├── parameters/
│   ├── main.dev.bicepparam       # Dev environment parameters
│   ├── main.staging.bicepparam   # Staging environment parameters
│   └── main.prod.bicepparam      # Production environment parameters
├── .github/workflows/            # (or .azuredevops/ depending on CI/CD platform)
│   └── deploy-infra.yml          # CI/CD pipeline
└── README.md                     # Deployment instructions
```

### File Requirements

#### main.bicep
- `targetScope = 'subscription'` (creates resource group)
- Parameters: `environment`, `location`, `projectName`
- Creates resource group with naming convention: `rg-<projectName>-<environment>`
- Calls each module, passing outputs between them as needed
- Tags all resources with `environment`, `project`, `managedBy: 'bicep'`

#### modules/networking.bicep
- VNet with address space `10.0.0.0/16`
- Subnets for each component type (compute, data, integration)
- NSGs with least-privilege rules
- Output subnet IDs for use by other modules

#### modules/security.bicep
- Key Vault (Premium SKU, RBAC authorization, purge protection enabled)
- User-assigned managed identity
- Role assignments for managed identity to access Key Vault
- Output Key Vault URI and managed identity ID

#### modules/monitoring.bicep
- Log Analytics workspace
- Application Insights (connected to Log Analytics)
- Output instrumentation key and workspace ID

#### modules/compute-<name>.bicep
- One file per compute component
- Resource configured based on Azure service mapping
- Connects to monitoring (App Insights)
- Uses managed identity from security module
- Environment-appropriate SKU (param-driven)

#### modules/data-<name>.bicep
- One file per data component
- Resource configured based on Azure service mapping
- Private endpoint or VNet integration where applicable
- Backup configuration based on NFRs (or sensible defaults)

#### parameters/*.bicepparam
- Use `using '../main.bicep'` syntax
- Dev: smallest SKUs, minimal redundancy
- Staging: mid-tier SKUs, zone redundancy
- Prod: production SKUs, full redundancy, geo-replication where applicable

#### CI/CD Pipeline
- Read CI/CD platform from `infra/context/development-context.md`
- If GitHub Actions (or default): generate `.github/workflows/deploy-infra.yml`
- If Azure DevOps: generate `.azuredevops/pipelines/deploy-infra.yml`
- Pipeline stages: validate → what-if → deploy-dev → deploy-staging → deploy-prod
- Manual approval gate before production
- Use `az deployment sub create` for deployment

#### README.md
- Project name and description (from application overview)
- Prerequisites (Azure CLI, Bicep CLI)
- Quick start: how to deploy to dev
- Environment details (dev/staging/prod differences)
- Module descriptions
- CI/CD setup instructions

## Code Quality Standards

- Use `@description()` decorators on all parameters
- Use `@allowed()` for enum-like parameters
- Follow Azure naming conventions: `<resource-abbreviation>-<project>-<environment>`
- Use `uniqueString(resourceGroup().id)` for globally unique names
- All secrets go to Key Vault, never in parameters
- Use `@secure()` decorator for sensitive parameters
- Prefer managed identity over connection strings
- Use `dependsOn` only when implicit dependencies aren't sufficient
- Include `// Generated by Az Infra Harness` comment at top of each file

## Pre-Generation: User Confirmation

Before generating any files, present a summary to the user and get confirmation:

```
Based on your planning data, here's what I'll generate:

**Components → Azure Services:**
- [Component 1] → [Azure Service] ([SKU], [Region])
- [Component 2] → [Azure Service] ([SKU], [Region])
...

**Infrastructure:**
- Networking: [VNet topology from infrastructure-context, or "flat VNet" if absent]
- Security: Key Vault + Managed Identity
- Monitoring: Log Analytics + Application Insights

**CI/CD:** [Platform from development-context, or "GitHub Actions" default]

**Environments:** dev, staging, prod

Does this look correct? Would you like to adjust anything before I generate the code?
```

Wait for user confirmation before proceeding. If the user wants changes, apply them.

## Azure CLI Verification (Optional)

If the user has Azure CLI available, optionally verify:

```bash
# Verify the target subscription
az account show --query "{name:name, id:id}" -o tsv 2>/dev/null

# Check that the target region is valid
az account list-locations --query "[?name=='eastus2']" -o table 2>/dev/null

# Check for existing resource groups that might conflict
az group list --query "[?starts_with(name, 'rg-')].{name:name, location:location}" -o table 2>/dev/null
```

If `az` is available, present findings: "I see you're logged into subscription '[name]'. The generated code will target this subscription."

## Execution Steps

1. Read all available planning data from `infra/` (application-overview.md, application-components.md, non-functional-requirements.md, infrastructure-context.md, platform-context.md, development-context.md, components/*.json, deployment-strategy.md, architecture-diagram.md, adrs/)
2. Determine components: first check `infra/application-architecture/components/*.json` for explicit Azure service configs; fall back to the Azure Service Mapping table for unconfigured components
3. Determine CI/CD platform preference
4. Generate all Bicep files to `infra/bicep/`
5. Generate parameter files for all environments
6. Generate CI/CD pipeline
7. Generate README.md
8. Present summary to user for confirmation (see Pre-Generation section above)
9. Generate files after user confirms
10. Confirm completion to user with summary of generated files
