# Development Context

## Development Workflow

The development team follows an Agile methodology with 2-week sprints. Code reviews are mandatory for all pull requests, and CI/CD pipelines automatically run tests and security scans before deployment.

## Version Control

- **Repository**: GitHub Enterprise
- **Branching Strategy**: Git Flow (main, develop, feature/, hotfix/)
- **Commit Convention**: Conventional Commits

## Development Environment

Developers work on local machines with Docker Desktop for containerized development. Each developer has access to a personal development Azure subscription for testing.

## Testing Strategy

- **Unit Tests**: Jest and React Testing Library (target: 80% coverage)
- **Integration Tests**: Playwright for E2E testing
- **Performance Tests**: k6 for load testing critical APIs
- **Security Scans**: Snyk for dependency scanning, SonarQube for code quality

## CI/CD Pipeline

GitHub Actions handles the full CI/CD pipeline:
1. Build and test on pull requests
2. Deploy to staging on merge to develop
3. Manual approval for production deployment
4. Automated rollback on health check failures

## Deployment Strategy

Blue-green deployments with traffic shifting over 30 minutes. Feature flags enable gradual rollout of new features to subsets of users.

## Monitoring & Observability

- **Application Insights**: For application telemetry and performance monitoring
- **Log Analytics**: Centralized logging for all services
- **Alerting**: PagerDuty integration for critical incidents
- **Dashboards**: Grafana for real-time metrics visualization

## Development Tools

- **IDE**: Visual Studio Code with recommended extensions
- **API Testing**: Postman collections for all endpoints
- **Database Tools**: Azure Data Studio for database management
- **Infrastructure**: Terraform for infrastructure as code
