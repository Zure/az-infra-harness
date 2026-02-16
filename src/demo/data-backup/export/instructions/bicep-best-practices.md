# Bicep Best Practices

Comprehensive best practices for writing production-ready Bicep code.

## Code Organization

### Module Structure
- One module per logical component
- Keep modules focused and reusable
- Use meaningful parameter and variable names
- Include descriptions for all parameters

### File Naming
- Use lowercase with hyphens: `my-module.bicep`
- Match module name to primary resource
- Use `.bicepparam` for parameter files

## Parameters and Variables

### Parameters
```bicep
@description('The Azure region for resources')
@allowed([
  'eastus'
  'westus'
  'northeurope'
])
param location string

@description('Environment name')
@allowed([
  'dev'
  'staging'
  'prod'
])
param environment string

@minLength(3)
@maxLength(24)
@description('Storage account name')
param storageAccountName string
```

### Use Decorators
- `@description()` for all parameters
- `@allowed()` for restricted values
- `@minLength()` and `@maxLength()` for strings
- `@minValue()` and `@maxValue()` for numbers

## Resource Naming

Use consistent naming patterns:

```bicep
var resourceGroupName = 'rg-${projectName}-${environment}-${location}'
var storageAccountName = 'st${projectName}${environment}${uniqueString(resourceGroup().id)}'
var keyVaultName = 'kv-${projectName}-${environment}-${uniqueString(resourceGroup().id)}'
```

## Security

### Managed Identity
Always prefer managed identity over service principals:

```bicep
resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: appName
  identity: {
    type: 'SystemAssigned'
  }
}
```

### Secure Parameters
Use `@secure()` for sensitive values:

```bicep
@secure()
@description('Database administrator password')
param adminPassword string
```

### Private Endpoints
Enable private endpoints for PaaS services:

```bicep
resource privateEndpoint 'Microsoft.Network/privateEndpoints@2022-01-01' = {
  name: '${storageAccount.name}-pe'
  properties: {
    subnet: {
      id: subnetId
    }
    privateLinkServiceConnections: [
      {
        name: '${storageAccount.name}-connection'
        properties: {
          privateLinkServiceId: storageAccount.id
          groupIds: ['blob']
        }
      }
    ]
  }
}
```

## Outputs

Define useful outputs for integration:

```bicep
@description('The resource ID of the Key Vault')
output keyVaultId string = keyVault.id

@description('The name of the Key Vault')
output keyVaultName string = keyVault.name

@description('The URI of the Key Vault')
output keyVaultUri string = keyVault.properties.vaultUri
```

## Conditionals and Loops

### Conditional Deployment
```bicep
param deployDatabase bool = true

resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = if (deployDatabase) {
  name: sqlServerName
  location: location
}
```

### Loops
```bicep
param environments array = ['dev', 'staging', 'prod']

resource storageAccounts 'Microsoft.Storage/storageAccounts@2022-09-01' = [for env in environments: {
  name: 'st${projectName}${env}'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
}]
```

## Testing

### Validate Syntax
```bash
az bicep build --file main.bicep
```

### Preview Changes
```bash
az deployment group what-if --template-file main.bicep --parameters parameters.bicepparam
```

### Test in Dev First
Always deploy to dev environment before promoting to production.
