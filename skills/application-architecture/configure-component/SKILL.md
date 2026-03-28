---
name: configure-component
description: Configure an individual application component by mapping it to an Azure service with SKU, region, and service-specific settings
---

## Purpose

This skill configures a single application component by mapping it to a specific Azure service and capturing the configuration details. It generates `infra/application-architecture/components/{component-id}.json` for each configured component.

These JSON files are used by the IaC generation skills (`/generate-code-bicep` and `/generate-code-terraform`) to produce infrastructure code.

The configured component will be displayed in the UI when the user runs `npx @zureltd/az-infra-harness` and navigates to the Application Architecture section.

## When to Use

Run this skill when:
- An application component needs to be mapped to an Azure service
- A component's Azure configuration needs to be updated
- User explicitly runs `/configure-component`

**Prerequisite:** `infra/application-definition/application-components.md` must exist with at least one component defined. Run `/application-components` first if it doesn't.

## Component ID Convention

The `{component-id}` used in the filename is derived from the component name in `application-components.md`:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Examples: "API Backend" → `api-backend`, "Web Frontend" → `web-frontend`, "Customer Database" → `customer-database`

## Workflow

### Step 0: Read Context for Defaults

Before starting the interactive flow, read existing context data to provide smart defaults:

1. **`infra/context/infrastructure-context.md`** — extract the preferred Azure region from network topology
2. **`infra/context/platform-context.md`** — extract shared services (Key Vault, Log Analytics) that may inform settings
3. **`infra/application-definition/non-functional-requirements.md`** — extract scale/availability requirements to suggest appropriate SKUs
4. **`infra/application-architecture/components/*.json`** — check what region and patterns already-configured components use for consistency

Use these as suggestions (clearly labelled) during the interactive flow. For example:
- If prior components use `eastus2`, suggest that as the default region
- If NFRs specify 99.9% uptime, recommend HA-capable SKUs
- If NFRs mention high concurrent users, suggest higher scaling limits

### Step 0b: Azure CLI Discovery (Optional)

If the user has Azure CLI (`az`) available, run discovery commands to suggest existing resources:

```bash
# Check if logged in
az account show --query "{subscription:name, id:id}" -o tsv 2>/dev/null

# List existing Container App Environments (for compute components)
az containerapp env list --query "[].{name:name, location:location, rg:resourceGroup}" -o table 2>/dev/null

# List existing SQL Servers (for data components)
az sql server list --query "[].{name:name, location:location, rg:resourceGroup}" -o table 2>/dev/null

# List existing Redis caches
az redis list --query "[].{name:name, location:location, sku:sku.name}" -o table 2>/dev/null

# List available regions
az account list-locations --query "[?metadata.regionType=='Physical'].{name:name, displayName:displayName}" -o table 2>/dev/null
```

**If `az` is not available or not logged in:** Skip silently and proceed with manual questions.

**If resources are found:** Present them as context: "I found an existing Container Apps Environment in eastus2 — would you like to deploy to the same region?"

### Step 1: Read Existing Components

Read `infra/application-definition/application-components.md` to get the list of defined components.

If the file doesn't exist or is empty:
```
I need a list of application components before I can configure them. Please run /application-components first to define your application's components.
```
Stop the skill.

Also check `infra/application-architecture/components/` for any already-configured component JSON files.

---

### Step 2: Present Component Selection

Present the list of components to the user and indicate which are already configured.

```
Here are your application components:

1. **API Backend** (Compute) — [description] ✅ Already configured
2. **Web Frontend** (Compute) — [description] ⬜ Not yet configured
3. **Customer Database** (Data) — [description] ⬜ Not yet configured
4. **Application Gateway** (Networking) — [description] ⬜ Not yet configured

Which component would you like to configure? (Enter the number or name)
```

Wait for the user's selection before proceeding.

---

### Step 3: Interactive Configuration

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to create a task list at the start with these high-priority items (adjust based on component type):
1. Azure Service selection
2. SKU / Tier
3. Region
4. Service-specific settings

---

#### Question 1: Azure Service

First, suggest appropriate Azure services based on the component type:

**For Compute components:**
```
For the **[Component Name]** component ([description]), which Azure service would you like to use?

Common options for compute:
- **Azure Container Apps** — serverless containers with auto-scaling (recommended for APIs, workers)
- **Azure App Service** — PaaS web hosting (recommended for web frontends, simple APIs)
- **Azure Kubernetes Service (AKS)** — full container orchestration (for complex microservices)
- **Azure Functions** — serverless event-driven compute (for short-running tasks)
- **Azure Container Instances** — simple container hosting (for batch jobs)

Which would you like to use?
```

**For Data components:**
```
For the **[Component Name]** component ([description]), which Azure service would you like to use?

Common options for data:
- **Azure SQL Database** — managed relational database (SQL Server compatible)
- **Azure Database for PostgreSQL Flexible Server** — managed PostgreSQL
- **Azure Cosmos DB** — globally distributed NoSQL database
- **Azure Cache for Redis** — managed Redis cache
- **Azure Service Bus** — enterprise messaging (queues and topics)
- **Azure Storage Account** — blob, file, queue, and table storage
- **Azure Event Hubs** — event streaming at scale

Which would you like to use?
```

**For Networking components:**
```
For the **[Component Name]** component ([description]), which Azure service would you like to use?

Common options for networking:
- **Azure Application Gateway** — L7 load balancer with WAF
- **Azure Front Door** — global CDN + load balancing
- **Azure API Management** — API gateway with policies, developer portal
- **Azure Load Balancer** — L4 load balancer (internal or public)
- **Azure Firewall** — network-level traffic filtering

Which would you like to use?
```

---

#### Question 2: SKU / Pricing Tier

After the user selects an Azure service, ask about the SKU. Present the relevant options for that specific service:

**Example for Container Apps:**
```
Which pricing tier would you like for Container Apps?
- **Consumption** — pay per use, scale to zero (recommended for variable workloads)
- **Dedicated** — dedicated compute with reserved capacity (for predictable, high-volume workloads)
```

**Example for Azure SQL Database:**
```
Which service tier would you like for Azure SQL Database?
- **General Purpose** — balanced compute and storage (most common)
- **Business Critical** — high performance with in-memory OLTP
- **Serverless** — auto-pause during inactivity, pay per vCore-second
- **Hyperscale** — very large databases (100TB+)
```

---

#### Question 3: Region

```
Which Azure region should this component be deployed to?

If you're not sure, the most common choices are:
- East US 2 (eastus2)
- West Europe (westeurope)
- North Europe (northeurope)
- UK South (uksouth)

Or specify another region if required.
```

**Validation:** Must match a valid Azure region name or common alias.

---

#### Question 4: Service-Specific Settings

Ask for the most important configuration settings for the chosen service. Focus on the settings that affect IaC generation.

**For Container Apps (Consumption):**
```
For Container Apps, please provide:
1. **Minimum replicas**: How many instances should always be running? (e.g., 0 for scale-to-zero, 1 to keep warm, 2 for HA)
2. **Maximum replicas**: Maximum number of instances during peak load? (e.g., 10)
3. **CPU**: vCPU allocation per replica? (e.g., 0.5, 1.0)
4. **Memory**: Memory per replica? (e.g., 1Gi, 2Gi)
5. **Ingress**: Should this component accept external traffic (external) or only internal traffic (internal)?
6. **Private endpoint**: Should this component be accessible only via private endpoint (internal VNet)?
```

**For Azure SQL Database:**
```
For Azure SQL Database, please provide:
1. **Compute tier**: Serverless or Provisioned?
2. **vCores**: How many vCores? (e.g., 2, 4, 8 for Provisioned; min/max for Serverless)
3. **Storage**: Maximum storage size? (e.g., 32 GB, 128 GB)
4. **Backup retention**: How many days of backup retention? (default: 7)
5. **Geo-redundancy**: Enable geo-redundant backups? (yes/no)
6. **Private endpoint**: Should the database only be accessible via private endpoint?
```

**For other services:** Ask for the equivalent critical settings based on the service type. Focus on what will actually vary in the Bicep/Terraform code.

---

### Step 4: Open Items Gate

Before generating the JSON, summarize any missing information:

```
Open Items:
- [Missing Item 1]
- [Missing Item 2]
```

Resolve all open items. Only proceed when there are zero open items.

---

### Step 5: Generate JSON

Once all information is gathered, create the JSON file with this structure:

```json
{
  "azureService": "Container Apps",
  "sku": "Consumption",
  "region": "eastus2",
  "settings": {
    "minReplicas": 2,
    "maxReplicas": 10,
    "cpu": 1.0,
    "memory": "2Gi",
    "ingress": "external",
    "privateEndpoint": true
  }
}
```

**JSON formatting rules:**
- `azureService`: full Azure service name (e.g., "Container Apps", "Azure SQL Database")
- `sku`: tier/SKU name as it appears in Azure portal
- `region`: Azure region short name (e.g., "eastus2", "westeurope")
- `settings`: service-specific key-value pairs; keys in camelCase; values must be correct types (numbers, strings, booleans)
- No trailing commas
- Properly formatted with 2-space indentation

---

### Step 6: Validation

Before saving:

- ✅ All required fields present: `azureService`, `sku`, `region`, `settings`
- ✅ `settings` contains at least 2 service-specific values
- ✅ JSON is valid (no syntax errors)
- ✅ No placeholder text remains
- ✅ All TodoWrite tasks marked complete

---

### Step 7: Save File

**Target location:** `infra/application-architecture/components/{component-id}.json`

**Pre-save checks:**
1. Verify directory `infra/application-architecture/components/` exists
2. If the directory does not exist, create it (including all parent directories) and continue.

**Error handling:**
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 8: Confirm to User and Offer to Continue

```
✅ Configured [Component Name] successfully!

📄 File location: infra/application-architecture/components/[component-id].json

Azure Service: [Azure Service]
SKU: [SKU]
Region: [Region]

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Application Architecture section

Would you like to configure another component? Remaining unconfigured components:
- [Component 2]
- [Component 3]

Say "yes" to continue, or "done" when you've configured all the components you need.
```

If the user wants to configure another component, return to Step 2 with the updated list.

When the user says "done" (or all components are configured), display:

```
The next step is to run /architecture-diagram to generate the architecture diagram for your application.
```

---

## Error Handling

### If application-components.md doesn't exist:
- Stop immediately with clear message directing user to run `/application-components` first

### If all components are already configured:
- Present the list of configured components
- Ask which one to reconfigure: "All components are already configured. Which would you like to update?"

### If directory doesn't exist:
- Create the directory (including all parent directories) and continue

### If user selects an Azure service outside the suggested list:
- Accept it — the suggestions are guides, not constraints
- Ask for the SKU and settings appropriate to that service

### If write fails:
- Show clear error with actionable advice

---

## Example Interaction

**Agent:** "Here are your application components:
1. **API Backend** (Compute) — Handles customer authentication, order processing, and business logic ⬜ Not yet configured
2. **Customer Database** (Data) — Stores customer profiles and application state ⬜ Not yet configured
3. **Application Gateway** (Networking) — Entry point with SSL termination and WAF ⬜ Not yet configured

Which component would you like to configure?"

**User:** "1"

**Agent:** "For the API Backend (Compute), which Azure service would you like to use? [Shows Compute options]"

**User:** "Container Apps"

**Agent:** "Which pricing tier? Consumption or Dedicated?"

**User:** "Consumption"

[Conversation continues through region and settings]

**Agent:** "✅ Configured API Backend successfully!

📄 File location: infra/application-architecture/components/api-backend.json

Would you like to configure another component?"

---

## Reference Files

- **Sample output**: `infra/application-architecture/components/api-backend.json`
- **Component list**: `infra/application-definition/application-components.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ JSON file created at `infra/application-architecture/components/{component-id}.json`
- ✅ All required JSON fields are present and correctly typed (`azureService`, `sku`, `region`, `settings`)
- ✅ All TodoWrite tasks were used and completed
- ✅ All validation rules pass
- ✅ File is valid JSON (parseable)
- ✅ User is informed of successful creation
- ✅ UI displays the component configuration after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
