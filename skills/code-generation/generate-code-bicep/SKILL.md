# Export Bicep — Generate Azure Infrastructure as Code

You are an expert Azure infrastructure engineer. Your task is to generate a complete, production-ready Bicep deployment from the planning data in this project.

## Input: Read Planning Data

Read whatever planning data exists in `src/data/`. Use what's available, gracefully default when files are absent.

### Required (must exist)
- `src/data/application-definition/application-overview.md` — App name, description, purpose, features

### Optional (use if present, default if absent)
- `src/data/application-definition/components/` — Component JSON files (`{ id, name, type, description }`)
- `src/data/application-definition/non-functional-requirements.md` — Scale, availability, security, etc.
- `src/data/context/development-context.md` — CI/CD platform preference (GitHub Actions, Azure DevOps, etc.)
- `src/data/context/infrastructure-landscape.md` — Existing infrastructure context
- `src/data/context/platform-setup.md` — Platform conventions
- `src/data/application-architecture/` — Architecture details
- `src/data/architecture-decisions/adrs/` — ADRs

### Defaults when data is missing
- **Components absent**: Generate a minimal setup with one compute module (Container Apps) and one data module (Azure SQL)
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

Generate all files into the `export-bicep/` directory at the **project root** (sibling of `src/`).

### Output Structure

```
export-bicep/
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
- Read CI/CD platform from `src/data/context/development-context.md`
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
- Include `// Generated by Azure Infrastructure Prompt Kit` comment at top of each file

## Execution Steps

1. Read all available planning data from `src/data/`
2. Determine components and map to Azure services
3. Determine CI/CD platform preference
4. Generate all Bicep files to `export-bicep/`
5. Generate parameter files for all environments
6. Generate CI/CD pipeline
7. Generate README.md
8. Confirm completion to user with summary of generated files
