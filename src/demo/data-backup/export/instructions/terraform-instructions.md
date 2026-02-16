# Terraform Implementation Instructions

Step-by-step guide to implementing the Azure infrastructure using Terraform/OpenTofu.

## Prerequisites

- Terraform or OpenTofu installed
- Azure CLI installed and authenticated
- Appropriate Azure permissions (Contributor or Owner on subscription)

## Project Structure

```
infrastructure/
├── main.tf                    # Root configuration
├── variables.tf               # Variable definitions
├── outputs.tf                 # Output definitions
├── providers.tf               # Provider configuration
├── terraform.tfvars          # Default values
├── environments/
│   ├── dev.tfvars
│   ├── staging.tfvars
│   └── prod.tfvars
└── modules/
    ├── container-apps/
    ├── static-web-app/
    ├── sql-database/
    ├── networking/
    ├── security/
    └── monitoring/
```

## Implementation Steps

### 1. Set Up Project Structure

Create the directory structure above and initialize your repository.

### 2. Configure Provider

Set up the AzureRM provider with appropriate features:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}
```

### 3. Implement Networking Module

Start with the foundational networking components:
- Virtual network with hub-spoke topology
- Subnets for each service
- Network security groups
- Private DNS zones

### 4. Implement Security Module

Set up security components:
- Managed Identity resources
- Key Vault for secrets
- RBAC role assignments

### 5. Implement Data Module

Create database resources:
- Azure SQL Server
- SQL Database
- Private endpoints

### 6. Implement Compute Modules

Deploy application hosting:
- Container Apps environment
- Static Web Apps

### 7. Implement Monitoring Module

Add observability:
- Application Insights
- Log Analytics workspace
- Alerts and dashboards

### 8. Create Root Configuration

Wire everything together in main.tf using module blocks.

### 9. Create Variable Files

Define environment-specific values for dev, staging, and production.

## Deployment

```bash
# Initialize
terraform init

# Format and validate
terraform fmt
terraform validate

# Preview changes
terraform plan -var-file="environments/dev.tfvars"

# Deploy
terraform apply -var-file="environments/dev.tfvars"
```

## Best Practices

- Use remote state (Azure Storage Account with state locking)
- Leverage modules for reusability
- Add descriptions to all variables and outputs
- Use variables instead of hardcoded values
- Implement proper tagging strategy
- Use data sources for existing resources
