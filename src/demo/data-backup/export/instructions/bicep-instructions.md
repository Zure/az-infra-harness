# Bicep Implementation Instructions

Step-by-step guide to implementing the Azure infrastructure using Bicep.

## Prerequisites

- Azure CLI installed and authenticated
- Bicep CLI installed
- Appropriate Azure permissions (Contributor or Owner on subscription)

## Project Structure

```
infrastructure/
├── main.bicep                 # Main orchestration file
├── modules/
│   ├── container-apps.bicep
│   ├── static-web-app.bicep
│   ├── sql-database.bicep
│   ├── networking.bicep
│   ├── security.bicep
│   └── monitoring.bicep
├── parameters/
│   ├── dev.bicepparam
│   ├── staging.bicepparam
│   └── prod.bicepparam
└── README.md
```

## Implementation Steps

### 1. Set Up Project Structure

Create the directory structure above and initialize your repository.

### 2. Implement Networking Module

Start with the foundational networking components:
- Virtual network with hub-spoke topology
- Subnets for each service
- Network security groups
- Private DNS zones

### 3. Implement Security Module

Set up security components:
- Managed Identity resources
- Key Vault for secrets
- RBAC role assignments

### 4. Implement Data Module

Create database resources:
- Azure SQL Server
- SQL Database
- Private endpoints

### 5. Implement Compute Modules

Deploy application hosting:
- Container Apps environment
- Static Web Apps

### 6. Implement Monitoring Module

Add observability:
- Application Insights
- Log Analytics workspace
- Alerts and dashboards

### 7. Create Main Orchestration File

Wire everything together in main.bicep, respecting dependency order.

### 8. Create Parameter Files

Define environment-specific values for dev, staging, and production.

## Deployment

```bash
# Validate
az bicep build --file main.bicep

# Preview changes
az deployment sub what-if --template-file main.bicep --parameters parameters/dev.bicepparam --location eastus

# Deploy
az deployment sub create --template-file main.bicep --parameters parameters/dev.bicepparam --location eastus
```

## Best Practices

- Use symbolic names for resources
- Leverage Bicep modules for reusability
- Add descriptions to all parameters and outputs
- Use parameter files instead of inline parameters
- Enable deployment scopes appropriately
