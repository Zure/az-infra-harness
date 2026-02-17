# Use Managed Identity for Azure Service Authentication

**Status:** accepted  
**Date:** February 10, 2026  
**Category:** security

## Context

The application components need to authenticate to Azure services (Key Vault, SQL Database, Storage Account, Application Insights). Traditional approaches use connection strings or service principals with stored credentials, which create security risks and operational overhead for secret rotation.

## Options Considered

### Managed Identity

**Pros:**
- No credentials to manage or rotate
- Automatic credential rotation by Azure
- Reduces secret sprawl
- Azure RBAC for authorization
- Zero-trust security model
- Audit trail in Azure AD

**Cons:**
- Only works for Azure services
- Requires RBAC setup
- Not supported by all third-party services

### Service Principal with Key Vault

**Pros:**
- Works with non-Azure services
- Familiar to many teams
- Can be shared across environments

**Cons:**
- Requires secret rotation process
- Secrets must be stored in Key Vault
- Higher operational overhead
- Risk of credential exposure

### Connection Strings in Configuration

**Pros:**
- Simple to implement
- Direct connection

**Cons:**
- High security risk - credentials in configuration
- Difficult to rotate
- Does not meet security compliance
- Not recommended for production

## Decision

Use **Managed Identity** (system-assigned) for all Azure service authentication. Store only non-Azure credentials in Key Vault.

## Rationale

Managed Identity is the most secure and operationally simple approach for Azure service authentication. It eliminates credential management overhead and aligns with zero-trust security principles. The application components (Container Apps, Static Web Apps) all support managed identity. Azure RBAC provides fine-grained authorization control. This approach minimizes attack surface and reduces operational burden.

## Consequences

- Zero credentials to manage for Azure services
- Improved security posture and compliance
- RBAC role assignments required for each resource
- Key Vault still needed for non-Azure secrets (on-premises API keys, etc.)
- Local development requires Azure CLI or developer managed identity
- Clear audit trail of service-to-service authentication

## Related Components

- api-backend
- background-worker
- web-frontend
