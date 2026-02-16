# Platform Context

## Identity & Access
- **Azure AD Tenant**: Managed by platform team
- **Managed Identity**: Will create app-specific managed identity
- **RBAC**: Custom roles defined at management group level
- **Service Principals**: Created via platform team request process

## Security Services
- **Key Vault**: Centralized Key Vault per subscription (kv-prod-shared-eastus2)
- **Secrets Management**: Application secrets stored in shared Key Vault
- **Certificate Management**: Platform team manages SSL certificates
- **Security Center**: Enabled at subscription level with standard tier

## Monitoring & Logging
- **Log Analytics Workspace**: Centralized workspace (log-prod-eastus2)
- **Application Insights**: Will create app-specific instance, linked to central workspace
- **Diagnostic Settings**: Platform policy auto-configures for all resources
- **Alert Action Groups**: Centralized action groups for different severity levels

## Platform Services Available
- Azure Monitor (centralized)
- Azure Policy (enforced at management group)
- Microsoft Defender for Cloud (enabled)
- Azure Backup (centralized vault)
- Cost Management (subscription-level budgets and alerts)
