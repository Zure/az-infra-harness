---
name: generate-code-terraform
description: Generate Azure infrastructure as Terraform code from planning data
---

# Export Terraform — Generate Azure Infrastructure as Code

You are an expert Azure infrastructure engineer. Your task is to generate a complete, production-ready Terraform deployment from the planning data in this project.

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

Generate all files into the `infra/tf/` directory (inside the `infra/` directory alongside all other planning data).

### Output Structure

```
infra/tf/
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
- Read CI/CD platform from `infra/context/development-context.md`
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
4. Generate all Terraform files to `infra/tf/`
5. Generate tfvars files for all environments
6. Generate CI/CD pipeline
7. Generate README.md
8. Present summary to user for confirmation (see Pre-Generation section above)
9. Generate files after user confirms
10. Confirm completion to user with summary of generated files
