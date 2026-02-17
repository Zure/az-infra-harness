# Use GitHub Actions for CI/CD Pipeline

**Status:** reviewed  
**Date:** February 10, 2026  
**Category:** deployment

## Context

The application requires automated build, test, and deployment pipelines. Source code is hosted in GitHub. The team values simplicity and wants to keep the DevOps toolchain consolidated.

## Options Considered

### GitHub Actions

**Pros:**
- Native integration with GitHub repos
- YAML-based workflows in repo
- Free minutes for public repos, affordable for private
- Rich marketplace of actions
- Simple to get started
- Good Azure integration

**Cons:**
- Less mature than some alternatives
- Limited advanced pipeline features
- Smaller runner capacity than Azure DevOps

### Azure DevOps Pipelines

**Pros:**
- Enterprise-grade features
- Advanced deployment strategies
- Larger runner capacity
- Tighter Azure integration
- More control over pipeline agents

**Cons:**
- Separate system from GitHub
- More complex setup
- Requires separate permissions management
- Additional tool to learn and manage

### GitLab CI

**Pros:**
- Comprehensive DevOps platform
- Strong container registry integration

**Cons:**
- Would require migrating from GitHub
- Additional platform to manage
- Team not familiar with GitLab

## Decision

Use **GitHub Actions** for all CI/CD pipelines with separate workflows per component.

## Rationale

GitHub Actions provides the best developer experience when source code is already in GitHub. The native integration eliminates context switching and keeps pipeline definitions (YAML) in the same repository as code. The team values simplicity and consolidation, and GitHub Actions meets the application's CI/CD requirements without adding another platform. The Azure integration is sufficient for deploying to Container Apps, Static Web Apps, and running Bicep deployments.

## Consequences

- Simplified toolchain (one less platform to manage)
- Pipeline YAML lives in repo (version controlled with code)
- Team learns GitHub Actions (transferable skill)
- May need to revisit if advanced deployment features are required
- Self-hosted runners may be needed for private network access
- GitHub Secrets used for credentials (synced from Key Vault)

## Related Components

- web-frontend
- api-backend
- background-worker
