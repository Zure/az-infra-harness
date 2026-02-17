# Use Azure Container Apps for API and Worker Compute

**Status:** accepted  
**Date:** February 10, 2026  
**Category:** compute

## Context

The application requires hosting for containerized workloads (API backend and background worker) that need to scale dynamically based on load. The API handles HTTP requests with variable traffic patterns, while the worker processes asynchronous tasks event-driven by queue messages.

## Options Considered

### Azure Container Apps

**Pros:**
- Serverless scaling (scale to zero for cost savings)
- Built-in event-driven scaling for queue-based workers
- Simpler operations - no cluster management
- Lower cost for variable workloads
- Quick deployment and updates

**Cons:**
- Less control over underlying infrastructure
- Limited to supported scaling triggers
- May not suit very large scale requirements (1000+ instances)

### Azure Kubernetes Service (AKS)

**Pros:**
- Maximum flexibility and control
- Rich ecosystem of tools and integrations
- Suitable for very large scale
- Advanced networking and service mesh options

**Cons:**
- Requires cluster management and maintenance
- Higher operational complexity
- Higher baseline cost (always-on cluster)
- Team requires Kubernetes expertise

### Azure App Service (Containers)

**Pros:**
- Simple PaaS experience
- Easy integration with Azure services
- Built-in CI/CD and staging slots

**Cons:**
- Less flexible scaling options
- Higher cost for always-on instances
- Not optimized for event-driven workers

## Decision

Use **Azure Container Apps** for both the API backend and background worker components.

## Rationale

Container Apps provides the right balance of simplicity and capability for this application. The serverless scaling model aligns with variable traffic patterns and allows cost optimization by scaling to zero during low usage. The built-in event-driven scaling is ideal for the queue-based background worker. The team does not require the advanced features of AKS, and the reduced operational burden allows focus on application development rather than infrastructure management.

## Consequences

- Faster time to market due to simpler operations
- Lower operational costs during low-traffic periods
- Team does not need to develop Kubernetes expertise
- May need to migrate to AKS in future if scale requirements exceed Container Apps limits
- Limited to Container Apps supported scaling triggers and features

## Related Components

- api-backend
- background-worker
