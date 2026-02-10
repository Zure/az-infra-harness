# Product Roadmap

## Sections

### 1. Application Overview
Define the application being deployed - name, description, type, and core requirements that determine which infrastructure sections are relevant.

### 2. Compute
Determine compute requirements through guided questions (users, traffic, scaling, availability) and recommend appropriate Azure services (App Service, Container Apps, AKS, Functions, Static Web Apps).

### 3. Data Storage
If needed based on app type, gather data requirements (type, volume, consistency, distribution) and recommend storage solutions (SQL Database, Cosmos DB, Storage Account, Redis Cache).

### 4. Networking
Configure network infrastructure including VNet integration, private endpoints, and load balancing - can reference existing platform team configurations.

### 5. Security & Identity
Define security requirements including Managed Identity, Key Vault integration, and access policies - can reference existing platform configurations.

### 6. Monitoring & Observability
Set up Application Insights, Log Analytics, and alerting - can reference existing platform monitoring infrastructure.

### 7. CI/CD & Deployment
Define deployment pipelines and strategies (GitHub Actions, Azure DevOps) including environment configuration and IaC language choice.
