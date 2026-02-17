# Use Azure SQL Database for Customer Data

**Status:** accepted  
**Date:** February 10, 2026  
**Category:** data

## Context

The application requires a relational database for customer profiles, preferences, and authentication data. The data has strong consistency requirements and complex relational queries. The team has strong SQL Server expertise from on-premises systems.

## Options Considered

### Azure SQL Database

**Pros:**
- Familiar SQL Server engine
- Strong consistency and ACID guarantees
- Rich query capabilities and tooling
- Automated backups and point-in-time restore
- Zone-redundant high availability
- Easy migration from on-premises SQL Server

**Cons:**
- Higher cost than some NoSQL alternatives
- Vertical scaling limits (though high)
- Schema changes require coordination

### Azure Cosmos DB (SQL API)

**Pros:**
- Global distribution built-in
- Massive scale capability
- Multiple consistency models
- Schema-less flexibility

**Cons:**
- Higher cost for typical workloads
- Different query model than SQL
- Team would require training
- Overkill for single-region app

### PostgreSQL

**Pros:**
- Open source, no licensing
- Advanced features (JSONB, full-text search)
- Strong community support

**Cons:**
- Team less familiar with PostgreSQL
- Migration from on-premises SQL requires more work
- Some Azure SQL features not available

## Decision

Use **Azure SQL Database** with General Purpose tier and zone-redundant configuration.

## Rationale

Azure SQL Database leverages the team's existing SQL Server expertise and provides a straightforward migration path from on-premises systems. The application's consistency requirements and relational data model are a natural fit for SQL Database. The managed service eliminates patching and maintenance overhead while providing enterprise-grade features like automated backups, high availability, and encryption. The General Purpose tier provides the right balance of performance and cost for the expected workload.

## Consequences

- Team can be immediately productive with familiar SQL Server tools and practices
- Smooth migration path for existing on-premises data
- Strong consistency guarantees simplify application logic
- High availability and disaster recovery built-in
- Schema evolution requires coordination across deployments
- May need to optimize for Azure SQL specific features and pricing model

## Related Components

- customer-database
