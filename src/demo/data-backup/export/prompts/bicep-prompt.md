# Bicep Implementation Prompt

You are an expert Azure infrastructure engineer. Please implement the following infrastructure using Azure Bicep based on the specifications provided.

## Overview

Implement a production-ready Azure infrastructure for a modern web application with the following components:
- Container hosting platform (Azure Container Apps)
- Static web frontend (Azure Static Web Apps)
- Database (Azure SQL Database)
- Networking (Hub-spoke topology)
- Security (Managed Identity, Key Vault)

## Requirements

1. Follow Azure best practices for resource naming, tagging, and organization
2. Implement security by default (private endpoints, RBAC, no passwords)
3. Use parameterized Bicep modules for reusability
4. Include environment-specific parameter files
5. Add comprehensive comments and descriptions

## Architecture Decisions

Refer to the ADR files in the `decisions/` directory for detailed context on each architectural choice.

## Component Specifications

See `configurations/components.json` for detailed specifications of each Azure resource.

## Deliverables

1. Main Bicep file with module orchestration
2. Separate modules for each major component
3. Parameter files for dev, staging, and production
4. README with deployment instructions
5. Validation and testing approach
