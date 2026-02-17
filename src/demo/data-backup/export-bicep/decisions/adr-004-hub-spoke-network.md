# Implement Hub-Spoke Network Topology

**Status:** accepted  
**Date:** February 10, 2026  
**Category:** networking

## Context

The application operates within an enterprise landing zone with existing on-premises connectivity and centralized security services. Multiple applications share common network infrastructure including firewall, VPN gateway, and monitoring. The application requires private connectivity to on-premises systems while maintaining security boundaries.

## Options Considered

### Hub-Spoke Topology

**Pros:**
- Centralized security and routing in hub
- Shared services (VPN, firewall) across applications
- Clear security boundaries between applications
- Aligns with Azure landing zone best practices
- Efficient use of resources

**Cons:**
- More complex setup and configuration
- Network traffic traverses hub (latency consideration)
- Requires VNet peering management

### Single VNet

**Pros:**
- Simpler network architecture
- No VNet peering needed
- Lower latency between components

**Cons:**
- No isolation from other applications
- Shared IP address space
- Cannot independently manage network policies
- Does not align with enterprise landing zone

### Isolated VNet per Application

**Pros:**
- Complete isolation
- Independent IP address management

**Cons:**
- Duplicates shared services (VPN, firewall)
- Higher cost for redundant infrastructure
- Difficult to manage connectivity to on-premises
- Does not leverage landing zone investment

## Decision

Implement **hub-spoke network topology** with the application deployed in a dedicated spoke VNet peered to the existing hub VNet.

## Rationale

The hub-spoke topology aligns with the organization's Azure landing zone architecture and allows the application to leverage existing shared services (VPN gateway, Azure Firewall, monitoring). This approach provides security isolation for the application while enabling required connectivity to on-premises systems. The spoke VNet gives the application team control over their network policies and subnets while centralizing shared concerns in the hub. This is a best practice for enterprise Azure deployments.

## Consequences

- Application benefits from centralized security policies in hub
- Shared infrastructure costs with other applications
- Network traffic to on-premises routes through hub (acceptable latency)
- VNet peering must be maintained and monitored
- Application team can manage spoke VNet independently
- Aligns with organization standards for compliance and auditing

## Related Components

- application-gateway
- api-backend
- background-worker
- customer-database
