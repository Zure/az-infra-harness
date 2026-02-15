# Infrastructure Validation Prompt

Please review the infrastructure code and validate it against Azure best practices.

## Validation Checklist

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Managed Identity used for authentication
- [ ] Private endpoints configured for PaaS services
- [ ] Network security groups properly configured
- [ ] Key Vault integration for sensitive data

### Performance
- [ ] Auto-scaling configured appropriately
- [ ] Resource SKUs match requirements
- [ ] Geo-replication enabled where needed

### Reliability
- [ ] Availability zones used where supported
- [ ] Backup and disaster recovery configured
- [ ] Health checks and monitoring in place

### Cost Optimization
- [ ] Right-sized resources
- [ ] Cost management tags applied
- [ ] Auto-shutdown for non-production resources

### Operational Excellence
- [ ] Resource naming follows conventions
- [ ] Tagging strategy implemented
- [ ] Documentation complete
- [ ] CI/CD pipeline ready

## Testing

Please verify:
1. Syntax validation passes
2. Plan/what-if shows expected changes
3. No security warnings from static analysis tools
4. Cost estimates are within budget
