# Export Terraform — Generate Azure Infrastructure as Code

You are an expert Azure infrastructure engineer. Your task is to generate a complete, production-ready Terraform deployment from the planning data in this project.

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

| Component Type | Default Azure Service | Terraform Resource |
|---|---|---|
| Compute (web/frontend) | Azure Static Web Apps | `azurerm_static_web_app` |
| Compute (api/backend) | Azure Container Apps | `azurerm_container_app` |
| Compute (worker/background) | Azure Container Apps (scale-to-zero) | `azurerm_container_app` |
| Compute (function) | Azure Functions (Consumption) | `azurerm_linux_function_app` |
| Data (relational/sql) | Azure SQL Database | `azurerm_mssql_server` / `azurerm_mssql_database` |
| Data (nosql/document) | Azure Cosmos DB | `azurerm_cosmosdb_account` |
| Data (cache) | Azure Cache for Redis | `azurerm_redis_cache` |
| Data (storage/blob) | Azure Storage Account | `azurerm_storage_account` |
| Networking (gateway) | Azure Application Gateway | `azurerm_application_gateway` |
| Networking (loadbalancer) | Azure Load Balancer | `azurerm_lb` |
| Networking (firewall) | Azure Firewall | `azurerm_firewall` |

Use the component `type` and `description` fields to pick the best match. If the description mentions "React", "SPA", "static" → Static Web Apps. If it mentions "API", "REST", "container" → Container Apps. And so on.

## Output: Generate Files

Generate all files into the `export-terraform/` directory at the **project root** (sibling of `src/`).

### Output Structure

```
export-terraform/
├── main.tf                       # Root module: calls child modules
├── variables.tf                  # Input variables
├── outputs.tf                    # Root outputs
├── providers.tf                  # Provider configuration (azurerm)
├── backend.tf                    # Remote state backend (Azure Storage)
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── security/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── monitoring/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── compute-<name>/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── data-<name>/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── environments/
│   ├── dev.tfvars                # Dev environment variables
│   ├── staging.tfvars            # Staging environment variables
│   └── prod.tfvars               # Production environment variables
├── .github/workflows/            # (or .azuredevops/ depending on CI/CD platform)
│   └── deploy-infra.yml          # CI/CD pipeline
└── README.md                     # Deployment instructions
```

### File Requirements

#### providers.tf
- `azurerm` provider with `features {}` block
- Minimum version constraint `~> 4.0`
- `terraform` block with `required_version >= 1.5`

#### backend.tf
- Azure Storage backend configuration (commented out with instructions)
- Resource group, storage account, container, key placeholders

#### variables.tf
- `environment` (string, validation: dev/staging/prod)
- `location` (string, default: chosen region)
- `project_name` (string)
- All variables with `description` and sensible `default` where appropriate

#### main.tf
- Creates resource group: `rg-<project_name>-<environment>`
- Calls each module, passing outputs between them
- Tags all resources with `environment`, `project`, `managed_by = "terraform"`

#### outputs.tf
- Key outputs: resource group name, key vault URI, app URLs, connection info

#### modules/networking/
- VNet with address space `10.0.0.0/16`
- Subnets for each component type (compute, data, integration)
- NSGs with least-privilege rules
- Output subnet IDs

#### modules/security/
- Key Vault (Premium SKU, RBAC authorization, purge protection)
- User-assigned managed identity
- Role assignments
- Output Key Vault URI and identity ID

#### modules/monitoring/
- Log Analytics workspace
- Application Insights
- Output instrumentation key and workspace ID

#### modules/compute-<name>/
- One module per compute component
- Resource configured based on Azure service mapping
- App Insights integration
- Managed identity
- Environment-appropriate SKU (variable-driven)

#### modules/data-<name>/
- One module per data component
- Resource configured based on Azure service mapping
- Private endpoint or VNet integration
- Backup configuration based on NFRs

#### environments/*.tfvars
- Dev: smallest SKUs, minimal redundancy
- Staging: mid-tier SKUs, zone redundancy
- Prod: production SKUs, full redundancy, geo-replication

#### CI/CD Pipeline
- Read CI/CD platform from `src/data/context/development-context.md`
- If GitHub Actions (or default): generate `.github/workflows/deploy-infra.yml`
- If Azure DevOps: generate `.azuredevops/pipelines/deploy-infra.yml`
- Pipeline stages: validate → plan → deploy-dev → deploy-staging → deploy-prod
- Manual approval gate before production
- Use `terraform init`, `terraform plan`, `terraform apply`

#### README.md
- Project name and description (from application overview)
- Prerequisites (Terraform CLI, Azure CLI)
- Quick start: how to deploy to dev
- Remote state setup instructions
- Environment details (dev/staging/prod differences)
- Module descriptions
- CI/CD setup instructions

## Code Quality Standards

- Use `description` on all variables and outputs
- Use `validation` blocks for constrained variables
- Follow Azure naming conventions: `<resource-abbreviation>-<project>-<environment>`
- Use `random_string` for globally unique names where needed
- All secrets go to Key Vault, never in tfvars
- Mark sensitive outputs with `sensitive = true`
- Prefer managed identity over connection strings
- Use `depends_on` only when implicit dependencies aren't sufficient
- Use `locals` for computed values and naming conventions
- Include `# Generated by Az Infra Harness` comment at top of each file

## Execution Steps

1. Read all available planning data from `src/data/`
2. Determine components and map to Azure services
3. Determine CI/CD platform preference
4. Generate all Terraform files to `export-terraform/`
5. Generate tfvars files for all environments
6. Generate CI/CD pipeline
7. Generate README.md
8. Confirm completion to user with summary of generated files
