# Terraform Best Practices

Comprehensive best practices for writing production-ready Terraform code.

## Code Organization

### Module Structure
- One module per logical component
- Keep modules focused and reusable
- Use meaningful variable and resource names
- Include descriptions for all variables

### File Naming
- Use lowercase with hyphens: `my-module.tf`
- Standard files: `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf`
- Environment-specific: `dev.tfvars`, `staging.tfvars`, `prod.tfvars`

## Variables and Outputs

### Variables
```hcl
variable "location" {
  description = "The Azure region for resources"
  type        = string
  validation {
    condition     = contains(["eastus", "westus", "northeurope"], var.location)
    error_message = "Location must be one of: eastus, westus, northeurope"
  }
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be: dev, staging, or prod"
  }
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
```

### Outputs
```hcl
output "key_vault_id" {
  description = "The resource ID of the Key Vault"
  value       = azurerm_key_vault.main.id
}

output "key_vault_uri" {
  description = "The URI of the Key Vault"
  value       = azurerm_key_vault.main.vault_uri
  sensitive   = true
}
```

## Resource Naming

Use locals for consistent naming:

```hcl
locals {
  resource_group_name    = "rg-${var.project_name}-${var.environment}-${var.location}"
  storage_account_name   = "st${var.project_name}${var.environment}${random_string.unique.result}"
  key_vault_name         = "kv-${var.project_name}-${var.environment}-${random_string.unique.result}"
  
  common_tags = merge(var.tags, {
    Environment = var.environment
    ManagedBy   = "Terraform"
  })
}
```

## Security

### Sensitive Variables
Mark sensitive variables:

```hcl
variable "admin_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}
```

### Managed Identity
Always prefer managed identity:

```hcl
resource "azurerm_linux_web_app" "main" {
  name                = var.app_name
  location            = var.location
  resource_group_name = var.resource_group_name
  
  identity {
    type = "SystemAssigned"
  }
}
```

### Private Endpoints
Enable private endpoints for PaaS services:

```hcl
resource "azurerm_private_endpoint" "storage" {
  name                = "${azurerm_storage_account.main.name}-pe"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.subnet_id

  private_service_connection {
    name                           = "${azurerm_storage_account.main.name}-connection"
    private_connection_resource_id = azurerm_storage_account.main.id
    subresource_names              = ["blob"]
    is_manual_connection           = false
  }
}
```

## State Management

### Remote State
Always use remote state for team environments:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "sttfstate"
    container_name       = "tfstate"
    key                  = "infrastructure.tfstate"
  }
}
```

### State Locking
Azure Storage backend includes automatic state locking.

## Data Sources

Use data sources for existing resources:

```hcl
data "azurerm_client_config" "current" {}

data "azurerm_virtual_network" "existing" {
  name                = var.vnet_name
  resource_group_name = var.network_rg_name
}
```

## Conditionals and Loops

### Count
```hcl
resource "azurerm_storage_account" "main" {
  count               = var.deploy_storage ? 1 : 0
  name                = local.storage_account_name
  location            = var.location
  resource_group_name = var.resource_group_name
}
```

### For Each
```hcl
variable "environments" {
  type    = map(object({
    sku  = string
    size = string
  }))
  default = {
    dev = {
      sku  = "B1"
      size = "Small"
    }
    prod = {
      sku  = "P1v2"
      size = "Large"
    }
  }
}

resource "azurerm_service_plan" "main" {
  for_each            = var.environments
  name                = "asp-${each.key}"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = each.value.sku
}
```

## Testing

### Validate
```bash
terraform fmt -recursive
terraform validate
```

### Plan
```bash
terraform plan -var-file="environments/dev.tfvars" -out=tfplan
```

### Apply
```bash
terraform apply tfplan
```

## Version Constraints

Pin provider versions:

```hcl
terraform {
  required_version = ">= 1.5"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.75"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}
```
