# Infrastructure Context

## Network Topology
- **Model**: Hub-spoke architecture
- **Hub VNet**: Shared services VNet managed by platform team (10.0.0.0/16)
- **Spoke VNets**: Application-specific VNets peered to hub
- **Connectivity**: ExpressRoute to on-premises datacenter

## Landing Zone
- **Type**: Enterprise-scale landing zone (CAF)
- **Management Groups**: Corp → Landing Zones → Production
- **Subscription**: Prod-CustomerPortal-001
- **Resource Group Naming**: rg-{workload}-{environment}-{region}-{instance}

## Existing Resources
- **VNet**: Not yet provisioned - will create spoke VNet
- **Subnets Required**: Web tier, app tier, data tier
- **Private DNS Zones**: Managed centrally by platform team
- **Network Security**: NSGs and Azure Firewall rules managed by network team

## Connectivity Requirements
- Outbound internet via Azure Firewall in hub
- Inbound traffic via Azure Application Gateway in hub
- Private connectivity to on-premises SQL Server
