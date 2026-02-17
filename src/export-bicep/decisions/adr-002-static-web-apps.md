# Use Azure Static Web Apps for Frontend Hosting

**Status:** accepted  
**Date:** February 10, 2026  
**Category:** compute

## Context

The frontend is a React-based single-page application that needs global distribution, fast performance, and integration with the API backend. The application requires custom domain support and authentication.

## Options Considered

### Azure Static Web Apps

**Pros:**
- Optimized for SPA frameworks (React, Vue, Angular)
- Built-in global CDN
- Integrated authentication providers
- GitHub Actions integration
- Free SSL certificates
- Cost-effective for static content

**Cons:**
- Limited to static content and APIs
- Less control over CDN configuration

### Azure Blob Storage + Azure CDN

**Pros:**
- Maximum control over CDN settings
- Very low cost for storage
- Flexible configuration

**Cons:**
- Requires manual setup of CDN, SSL, authentication
- More components to manage
- No built-in CI/CD

### Azure App Service

**Pros:**
- Familiar platform for many teams
- Can handle both static and dynamic content

**Cons:**
- Overkill for static SPA
- Higher cost than alternatives
- Does not include global CDN

## Decision

Use **Azure Static Web Apps** with Azure Front Door for custom domain and WAF capabilities.

## Rationale

Static Web Apps is purpose-built for modern SPA frameworks and provides the best developer experience with built-in CI/CD, global distribution, and authentication. The integration with Azure Front Door provides enterprise-grade custom domain support and web application firewall capabilities needed for production deployment. The cost is optimal for serving static content with global reach.

## Consequences

- Simplified deployment pipeline for frontend
- Global performance with minimal configuration
- Built-in authentication reduces custom auth code
- Tightly coupled to Azure ecosystem
- May need to add Azure Front Door for advanced WAF and routing

## Related Components

- web-frontend
