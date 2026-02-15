# Architecture Diagram

Visual representation of the Azure infrastructure architecture.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Azure Subscription                       │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Hub Virtual Network                     │  │
│  │                      (10.0.0.0/16)                         │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │ Container    │  │ Data         │  │ Bastion      │   │  │
│  │  │ Apps Subnet  │  │ Subnet       │  │ Subnet       │   │  │
│  │  │ 10.0.1.0/24  │  │ 10.0.2.0/24  │  │ 10.0.3.0/26  │   │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────────┘   │  │
│  └─────────┼──────────────────┼──────────────────────────────┘  │
│            │                  │                                  │
│  ┌─────────┼──────────────────┼──────────────────────────────┐  │
│  │         │  Spoke Virtual Network (10.1.0.0/16)            │  │
│  │         │                  │                              │  │
│  │  ┌──────▼──────┐          │                              │  │
│  │  │ Application │          │                              │  │
│  │  │ Subnet      │          │                              │  │
│  │  │ 10.1.1.0/24 │          │                              │  │
│  │  └─────────────┘          │                              │  │
│  └───────────────────────────┴──────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Application Components                     │  │
│  │                                                            │  │
│  │  ┌────────────────┐        ┌────────────────┐           │  │
│  │  │ Static Web App │        │ Container Apps │           │  │
│  │  │ (Frontend)     │───────▶│ (Backend API)  │           │  │
│  │  └────────────────┘        └────────┬───────┘           │  │
│  │                                     │                    │  │
│  │                                     │                    │  │
│  │                            ┌────────▼────────┐           │  │
│  │                            │ SQL Database    │           │  │
│  │                            │ (Private Endpt) │           │  │
│  │                            └─────────────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Security & Identity                      │  │
│  │                                                            │  │
│  │  ┌────────────────┐        ┌────────────────┐           │  │
│  │  │ Managed        │        │ Key Vault      │           │  │
│  │  │ Identity       │───────▶│ (Secrets)      │           │  │
│  │  └────────────────┘        └────────────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Monitoring & Diagnostics                   │  │
│  │                                                            │  │
│  │  ┌────────────────┐        ┌────────────────┐           │  │
│  │  │ Application    │        │ Log Analytics  │           │  │
│  │  │ Insights       │───────▶│ Workspace      │           │  │
│  │  └────────────────┘        └────────────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Relationships

### Network Flow
1. **Internet** → Static Web App (Frontend)
2. **Static Web App** → Container Apps API (over private network)
3. **Container Apps** → SQL Database (via private endpoint)
4. **Container Apps** → Key Vault (via managed identity)

### Security
- All inter-service communication uses private endpoints
- No public internet access to database or Key Vault
- Managed Identity for passwordless authentication
- Network security groups control traffic flow

### Monitoring
- Application Insights collects telemetry from all services
- Logs aggregated in Log Analytics workspace
- Alerts configured for critical metrics

## Resource Groups

```
rg-networking-prod       → Hub-spoke virtual networks, NSGs
rg-compute-prod          → Container Apps, Static Web Apps
rg-data-prod             → SQL Server and Database
rg-security-prod         → Key Vault, Managed Identities
rg-monitoring-prod       → Application Insights, Log Analytics
```

## Naming Convention

Format: `{resource-type}-{application}-{environment}-{region}`

Examples:
- `vnet-hub-prod-eastus`
- `containerapp-api-prod-eastus`
- `sql-appdb-prod-eastus`
- `kv-app-prod-eastus`

## Regions and Availability

**Primary Region**: East US  
**Availability**: Zone-redundant for supported services  
**Disaster Recovery**: Cross-region replication (future enhancement)
