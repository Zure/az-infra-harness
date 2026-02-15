# Deployment Strategy

## Source Control
- **Repository**: GitHub (github.com/contoso/customer-portal)
- **Branching**: GitFlow (main, develop, feature branches)
- **Protection**: Branch protection on main and develop

## CI/CD Platform
- **Platform**: GitHub Actions
- **Workflows**: Separate workflows per component
- **Secrets**: Stored in GitHub Secrets, synced from Azure Key Vault

## Environments
- **Development**: Auto-deploy from develop branch
- **Staging**: Manual approval required
- **Production**: Manual approval + change management ticket

## Deployment Process
1. Developer creates PR to develop branch
2. Automated tests and security scans run on PR
3. Merge triggers deployment to Development environment
4. Staging deployment requires approval from tech lead
5. Production deployment requires approval from change board
6. All deployments use infrastructure-as-code (Bicep)
7. Rollback capability via GitHub Actions rerun with previous commit

## Quality Gates
- Unit tests must pass (80% coverage minimum)
- Integration tests must pass
- Security scan (no high/critical vulnerabilities)
- Infrastructure validation (Bicep lint + what-if)
- Performance tests (staging only)
