---
name: application-components
description: Identify and document application components (compute, data, networking) through codebase scanning and conversation
---

## Purpose

This skill identifies and documents the components that make up the application for the Azure Infrastructure Prompt Kit. It generates `src/data/application-definition/application-components.md` which is used to drive the architecture planning phase — each component will later be mapped to Azure services.

The generated file will be displayed in the UI when the user runs `npm run dev` and navigates to the Application Definition section.

## When to Use

Run this skill when:
- Continuing from `/non-functional-requirements` to complete the application definition
- The application components need to be defined or updated
- User explicitly runs `/application-components`

## Component Types

Components must be classified into exactly one of three types:

| Type | Examples |
|------|---------|
| `Compute` | Web servers, APIs, containers, serverless functions, background workers, scheduled jobs |
| `Data` | Databases (SQL, NoSQL), caches (Redis), blob/file storage, message queues, event streams |
| `Networking` | Load balancers, application gateways, VNets, private endpoints, CDN, DNS, firewalls |

---

## Critical Rule: Always Interact Before Writing

**You MUST interact with the user and wait for their responses before writing the output file.** Never generate the file silently based on what you read from the filesystem or codebase alone.

There are two modes depending on whether a file already exists:

- **File exists** → Read it, present the current component list to the user, and ask what they want to change, add, or remove. Only write after they confirm.
- **File does not exist** → Scan the codebase for a draft list to present, then ask the user to confirm, correct, and add to it before writing.

---

## Workflow

### Step 1: Check for Existing File

Check whether `src/data/application-definition/application-components.md` already exists and has content.

**If the file exists and has content → follow the "Update Mode" workflow (Step 2a).**

**If the file does not exist or is empty → follow the "Fresh Mode" workflow (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present the current component list to the user.

```
I found your existing application components. Here's what's currently documented:

1. **[Component Name]** (Compute) — [current description]
2. **[Component Name]** (Data) — [current description]
3. **[Component Name]** (Networking) — [current description]
...

What would you like to change? You can:
- Add a new component
- Remove a component
- Rename or reclassify a component
- Update a description
- Say "looks good" to confirm everything is correct
```

Wait for the user's response, then make the requested changes conversationally. After each round of changes, ask: "Anything else to update, or shall I save?" before proceeding to Step 4.

---

### Step 2b: Fresh Mode (No Existing File) — Codebase Discovery + Confirmation

Actively scan the codebase to build a draft component list. The goal is to present a starting point to the user — not to skip the conversation.

**Scan targets and what to look for:**

#### Infrastructure & Deployment Files (highest signal)
- `docker-compose.yml` / `docker-compose*.yml` — each service is likely a component
- `kubernetes/`, `k8s/`, `helm/` — each Deployment/StatefulSet/Service is a component
- `azure-pipelines.yml`, `.github/workflows/` — may list deployment targets
- `bicep/`, `terraform/`, `infrastructure/` — directly describe infrastructure components
- `Dockerfile` files — each one signals a compute component

#### Application Code Structure (medium signal)
- Multi-project solutions (`.sln`, multiple `package.json`, `pom.xml` submodules) — each project may be a component
- `src/` subdirectories with distinct names (e.g., `src/api/`, `src/web/`, `src/worker/`) — likely separate components
- Microservice patterns: multiple service directories at the root

#### Configuration Files (medium signal)
- Database connection strings or config (look for SQL, MongoDB, Redis, Cosmos DB mentions)
- Message queue config (Azure Service Bus, RabbitMQ, Kafka)
- Storage account references (Azure Blob Storage, Azure Files)
- API gateway or reverse proxy configs (nginx, APIM)

#### Documentation (lower signal, but useful)
- `README.md` — architecture sections, component diagrams described in text
- `docs/` — architecture documents
- `src/data/application-definition/application-overview.md` — already-captured application context

**How to present findings:**

```
I've scanned your codebase and found the following components:

1. **[Component Name]** (Compute) — [brief reason: e.g., "Dockerfile in /api directory"]
2. **[Component Name]** (Data) — [brief reason: e.g., "PostgreSQL connection string in config"]
3. **[Component Name]** (Networking) — [brief reason: e.g., "nginx.conf found at root"]

Are these accurate? Would you like to add, remove, or rename any components? Are there components I might have missed (e.g., external services, background workers, caches)?
```

**If no components found:**
- Don't mention the scanning failure
- Proceed directly to interactive questions: "I'll help you document your application components. Let me ask a few questions about how your application is structured."

---

### Step 3: User Confirmation (Mandatory in Both Modes)

**Always stop here and present your findings or current state to the user. Wait for their response before proceeding to Step 4.**

#### If codebase scanning found components (fresh mode):

```
Based on my scan, I found these components:

[List from Step 1]

Before we finalize:
- Are all of these correct?
- Are there any components I missed? (e.g., background workers, caches, external APIs, CDN, storage)
- Would you like to rename or reclassify any of them?
```

#### If codebase scanning found nothing (fresh mode):

Ask the following questions conversationally:

**Question 1: How is the application structured?**
```
How is your application structured? For example:
- Is it a monolith (single deployable unit)?
- A frontend + backend split?
- A set of microservices?
- Something else?
```

**Question 2: List the components**
```
Based on that structure, what are the main components? For each, I'll need:
- A name (e.g., "Web Frontend", "Order API", "Customer Database")
- A type: Compute, Data, or Networking
- A one-sentence description of what it does

You can list them in any format — I'll help structure them.
```

**After receiving the initial list, always ask:**
```
Are there any additional components I should include? Common ones that are sometimes overlooked:
- Caches (e.g., Redis, Memcached)
- Message queues or event buses
- Background workers or scheduled jobs
- CDN or static asset delivery
- API gateway or reverse proxy
- External databases or third-party services that are part of the architecture
```

---

### Step 4: Refine Each Component (Fresh Mode Only)

**For any component that doesn't yet have a confirmed description, ask for one before generating the file. In update mode, this was handled conversationally in Step 2a.**

**For each component, verify:**
1. **Name** — Is it clear and meaningful? (e.g., "Web Frontend" is better than "Frontend")
2. **Type** — Is it correctly classified as Compute, Data, or Networking?
3. **Description** — Is it a clear single sentence explaining what the component does?

**Type classification guidance:**
- If the user is unsure, offer: "This sounds like a [Compute/Data/Networking] component because [reason]. Does that make sense?"
- Compute = things that run code and process requests
- Data = things that store or stream data
- Networking = things that route, protect, or connect traffic

**Description guidance:**
- Should be one sentence
- Should explain the component's role in the application (not its technology)
- Good: "Handles customer authentication, order processing, and business logic for the application."
- Bad: "It's a Node.js Express API."

---

### Step 5: Generate Content

**Only proceed here after the user has interacted and confirmed what they want written.** In update mode this means they've reviewed the current list and confirmed their changes. In fresh mode this means they've confirmed the draft list and provided descriptions.

Once all components are confirmed, create the markdown file with this **exact structure**:

```markdown
# Application Components

## [Component Name]
**Type:** Compute

[One-sentence description of what this component does in the application.]

## [Component Name]
**Type:** Data

[One-sentence description of what this component does in the application.]

## [Component Name]
**Type:** Networking

[One-sentence description of what this component does in the application.]
```

**Important formatting rules:**
- H1 (`#`) for the file title: exactly `# Application Components`
- H2 (`##`) for each component name
- Bold type label: `**Type:** Compute` (or `Data` or `Networking`) — on its own line immediately after the H2
- One blank line between the type line and the description
- One blank line between components (after the description, before the next `##`)
- No trailing whitespace
- No numbered lists — each component is its own H2 section
- No other markdown (no tables, no code blocks, no nested lists)
- Valid type values are exactly: `Compute`, `Data`, `Networking` (capitalized, no other values)

**Minimum components:** 2 (a valid application has at least 2 components)  
**Maximum components:** No hard limit, but encourage keeping the list meaningful (not exhaustive)

---

### Step 6: Validation

Before saving, verify the generated content meets all requirements:

**Structure validation:**
- ✅ Exactly one H1 heading: `# Application Components`
- ✅ At least 2 H2 headings (one per component)
- ✅ Each H2 is immediately followed by `**Type:**` line
- ✅ Type value is exactly one of: `Compute`, `Data`, `Networking`
- ✅ Each component has a non-empty description paragraph
- ✅ No placeholder text remains (e.g., `[Component Name]`)
- ✅ No empty sections

**Content validation:**
- ✅ Component names are meaningful and not just "Component 1"
- ✅ Descriptions explain the component's role (not just its technology)
- ✅ Types are correctly classified

**If validation fails:**
- Show the specific validation error to the user
- Ask for corrected information for the failing component only
- Re-validate before proceeding

---

### Step 7: Save File

**Target location:** `src/data/application-definition/application-components.md`

**Pre-save checks:**
1. Verify the directory exists: `src/data/application-definition/`
2. If directory doesn't exist, show error and stop (don't create the directory)

**Save process:**
1. Write the validated markdown content to the file
2. Verify the file was written successfully
3. Check the file is not empty
4. Check the file is readable

**Error handling:**
- If directory missing: "Error: Directory 'src/data/application-definition/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."
- If file empty after write: "Error: File was created but appears empty. Please try again."

---

### Step 8: Confirm to User

After successful file creation, inform the user:

```
✅ Created application components successfully!

📄 File location: src/data/application-definition/application-components.md

🌐 To view in the UI:
   1. Ensure the development server is running: npm run dev
   2. Refresh your browser
   3. Navigate to the Application Definition section
   4. The application components box should now show a blue border with a checkmark
   5. The "Continue to Context" button will be enabled once all three boxes are complete

You have now completed the Application Definition section! 🎉
The next step is to run /infrastructure-context to begin defining your infrastructure context.
```

---

## Error Handling

### If codebase scanning fails:
- **Action**: Gracefully fall back to questions without showing inferred context
- **Message**: Don't mention the scanning failure — just proceed with questions
- **Reasoning**: User doesn't need to know about internal process failures

### If directory doesn't exist:
- **Action**: Show clear error, do NOT create directory
- **Message**: "Error: Directory 'src/data/application-definition/' not found. Are you in the project root directory? This skill expects to be run from the azure-infra-prompt-kit project root."

### If file write fails:
- **Action**: Show clear error with actionable advice
- **Message**: "Error: Failed to write file. Possible causes:
  - Insufficient permissions
  - Disk full
  - File system is read-only

Please check permissions and try again."

### If validation fails:
- **Action**: Show specific validation error
- **Message**: "[Specific validation error]. Please provide corrected information."
- **Next step**: Ask for corrected information for that specific component only

### If user provides fewer than 2 components:
- **Action**: Ask for more
- **Message**: "I need at least 2 components to describe an application architecture. Can you think of any other components? For example, even a simple web app typically has a frontend, a backend, and a database."

### If user is unsure how to classify a component:
- **Action**: Offer guidance and a recommendation
- **Message**: "Based on what you described, this sounds like a [type] component because [reason]. Does that classification make sense for your use case?"

---

## Example Interactions

### Fresh Mode (no existing file)

**Agent:** "I'll help you document the application components. Let me scan your codebase first..."

[Scanning finds docker-compose.yml with web, api, db services; nginx.conf at root]

**Agent:** "I found the following components in your codebase:

1. **Web Frontend** (Compute) — Dockerfile in `/web` directory
2. **API Backend** (Compute) — Dockerfile in `/api` directory
3. **Customer Database** (Data) — PostgreSQL service in docker-compose.yml
4. **Application Gateway** (Networking) — nginx.conf at root

Are these accurate? Are there any I missed — like a cache, message queue, or background worker?"

**User:** "Yes those are right. We also have a Redis cache."

**Agent:** "I'd classify Redis as a **Data** component. Can you give me a one-sentence description of what it caches?"

**User:** "It caches session data and frequently accessed user preferences."

**Agent:** "✅ Created application components successfully!"

---

### Update Mode (file already exists)

**Agent:** "I found your existing application components:

1. **Web Frontend** (Compute) — React-based SPA for the customer-facing interface
2. **API Backend** (Compute) — RESTful API handling business logic
3. **Customer Database** (Data) — Stores customer profiles and application state
4. **Application Gateway** (Networking) — Entry point with SSL termination and WAF

What would you like to change? You can add, remove, rename, reclassify, or update descriptions."

**User:** "Add a Redis cache for session data."

**Agent:** "Added. Redis Cache (Data) — Caches session data and user preferences. Anything else, or shall I save?"

**User:** "That's it."

**Agent:** "✅ Updated application components successfully!"

---

## Reference Files

- **Sample output**: See `src/data/application-definition/application-components.md` for a complete example
- **Template reference**: See `src/data/application-definition/README.md` for format specification
- **Documentation**: See `DATA-STRUCTURE.md` for overall structure

---

## Tips for Best Results

1. **Scan aggressively**: Docker, Kubernetes, Terraform, and Bicep files are goldmines for component detection
2. **Don't over-engineer the list**: Document logical components, not individual microservices if there are dozens
3. **Always ask about overlooked components**: Caches, workers, and message queues are commonly forgotten
4. **Help users classify**: Many users don't know whether Redis is "Compute" or "Data" — guide them
5. **Focus on descriptions that explain role, not technology**: "Handles all customer-facing HTTP requests" > "Nginx reverse proxy"
6. **Validate strictly**: The UI and downstream architecture skills rely on this format

---

## Success Criteria

The skill is successful when:
- ✅ File created at `src/data/application-definition/application-components.md`
- ✅ Content matches the required format exactly
- ✅ At least 2 components are documented
- ✅ All type values are valid (Compute, Data, or Networking)
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
