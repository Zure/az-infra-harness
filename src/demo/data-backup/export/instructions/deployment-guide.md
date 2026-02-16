# Deployment Guide

Complete guide for deploying Azure infrastructure to different environments.

## Environment Strategy

### Development
- Minimal SKUs for cost optimization
- Auto-shutdown enabled
- Shorter retention periods
- Relaxed security for development convenience

### Staging
- Production-like configuration
- Same SKUs as production
- Full monitoring enabled
- Used for final validation before production

### Production
- Production-grade SKUs
- High availability enabled
- Full security hardening
- Comprehensive monitoring and alerting

## Pre-Deployment Checklist

- [ ] Azure subscription selected
- [ ] Service principal or managed identity configured for CI/CD
- [ ] Required resource providers registered
- [ ] Budget and cost alerts configured
- [ ] Naming conventions documented
- [ ] Tagging strategy defined
- [ ] Network addressing planned (no IP conflicts)

## Deployment Process

### 1. Manual Deployment (Initial)

First time deployment is typically manual to verify configuration:

1. Authenticate to Azure
2. Select subscription
3. Validate infrastructure code
4. Preview changes (what-if/plan)
5. Deploy infrastructure
6. Verify deployment
7. Test connectivity and functionality

### 2. Automated Deployment (Ongoing)

Set up CI/CD pipeline for repeatable deployments:

1. Code changes committed to repository
2. Pipeline triggered automatically
3. Code validated and tested
4. Changes previewed in PR comments
5. Approved changes deployed to dev
6. Promoted to staging after testing
7. Deployed to production after approval

## Post-Deployment Tasks

- [ ] Verify all resources created successfully
- [ ] Test application connectivity
- [ ] Configure monitoring alerts
- [ ] Set up backup policies
- [ ] Document connection strings (in Key Vault)
- [ ] Update documentation
- [ ] Train operations team

## Rollback Procedure

If deployment fails or issues are discovered:

1. Assess impact and severity
2. Decide: fix forward or rollback
3. If rollback needed:
   - Restore previous infrastructure version
   - Restore application to previous version
   - Verify functionality
   - Post-mortem to prevent recurrence

## Troubleshooting

### Common Issues

**Insufficient Permissions**
- Verify service principal has appropriate RBAC roles
- Check subscription limits and quotas

**Resource Name Conflicts**
- Ensure globally unique names for resources that require it
- Check if resource was soft-deleted and needs purging

**Network Connectivity**
- Verify NSG rules and private endpoint configuration
- Check DNS resolution for private endpoints

**State Conflicts** (Terraform)
- Ensure state lock is released
- Verify state file is not corrupted
- Consider state import for existing resources
