---
name: generate-adrs
description: Read all planning data, propose relevant ADR topics, and generate Architecture Decision Records following the project template
---

## Purpose

This skill reads all available planning data and generates Architecture Decision Records (ADRs) for the most significant architectural decisions. It creates one or more files at `src/data/architecture-decisions/adrs/adr-{NNN}-{slug}.md` following the template in `src/data/architecture-decisions/adr-template.md`.

The generated ADRs will be displayed in the UI when the user runs `npm run dev` and navigates to the Architecture Decisions section.

## When to Use

Run this skill when:
- Application architecture and infrastructure planning data is substantially complete
- The team needs to document architectural decisions for governance or team alignment
- User explicitly runs `/generate-adrs`

**Recommended prerequisites (not strictly required):**
- Application components defined (`/application-components`)
- At least some components configured (`/configure-component`)
- Infrastructure context captured (`/infrastructure-context`)

## Workflow

### Step 1: Read All Planning Data

Read all available planning data files:

1. `src/data/application-definition/application-overview.md`
2. `src/data/application-definition/application-components.md`
3. `src/data/application-definition/non-functional-requirements.md`
4. `src/data/context/infrastructure-context.md`
5. `src/data/context/platform-context.md`
6. `src/data/context/development-context.md`
7. `src/data/application-architecture/components/*.json`
8. `src/data/application-architecture/deployment-strategy.md`
9. `src/data/architecture-decisions/adr-template.md`

Also check `src/data/architecture-decisions/adrs/` for any existing ADRs to:
- Determine the next ADR number (highest existing NNN + 1)
- Avoid proposing ADRs for decisions already documented

---

### Step 2: Propose ADR Topics

Based on the planning data, identify the most significant architectural decisions that warrant an ADR. These are decisions where:
- Multiple reasonable alternatives exist
- The choice significantly affects the architecture
- The rationale is not obvious from the code alone
- The team needs alignment or audit trail

**Common ADR topics to consider (based on what's in the planning data):**

| Topic | Trigger |
|-------|---------|
| Compute platform | Compute components are defined and configured |
| Database platform | Data components include a database |
| Caching strategy | Data components include Redis or similar |
| API design | Compute components include APIs |
| Networking model | Hub-spoke vs. flat topology in infrastructure context |
| Authentication & authorization | Identity & access info in platform context |
| Secret management | Key Vault strategy mentioned in platform context |
| CI/CD platform | CI/CD platform captured in development context |
| Deployment strategy | Blue-green/canary choices in deployment strategy |
| Observability stack | Monitoring tools mentioned in development context |
| IaC toolchain | Bicep vs. Terraform decision if apparent |

Present the proposed topics to the user:

```
Based on your planning data, here are the architectural decisions I recommend documenting as ADRs:

1. **Compute platform** — [brief rationale for why this is worth documenting, e.g., "You've chosen Container Apps over AKS or App Service — document the trade-offs"]
2. **Database platform** — [brief rationale]
3. **Networking model** — [brief rationale]
4. **Authentication approach** — [brief rationale]
5. **CI/CD platform** — [brief rationale]

Which of these would you like to generate? You can:
- Say "all" to generate all of them
- List the numbers (e.g., "1, 3, 5")
- Add a topic I haven't listed (describe it and I'll generate it)
- Say "skip" to skip any topic

Existing ADRs (already documented, won't regenerate): [list if any]
```

Wait for the user's selection before proceeding.

---

### Step 3: Gather Missing Details (If Needed)

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to track each ADR to be generated as a high-priority task.

For each selected ADR topic, check whether the planning data provides enough information to write a complete ADR. If key information is missing, ask:

```
For the **[Topic]** ADR, I need a bit more information:

- What alternatives did you consider? (I found [X] from your planning data — are there others you evaluated?)
- What were the key factors in your decision?
- Are there any known risks or trade-offs from this choice?
```

Only ask if the information isn't already in the planning data. If the planning data is sufficient, proceed directly to generation.

---

### Step 4: Generate ADRs

For each selected topic, generate an ADR following the template in `src/data/architecture-decisions/adr-template.md`.

**File naming convention:**
- `adr-001-{slug}.md` where NNN is zero-padded (3 digits)
- Slug is derived from the topic: lowercase, hyphens for spaces
- Examples: `adr-001-container-platform.md`, `adr-002-database-selection.md`, `adr-003-networking-model.md`

**Content guidelines:**
- **Status**: Set to `draft` for newly generated ADRs
- **Date**: Use today's date in YYYY-MM-DD format
- **Category**: Select appropriate category (compute, data, networking, security, cicd, auth, other)
- **Context**: Describe the specific need from this project's planning data
- **Options Considered**: List 2-4 realistic alternatives (derive from planning data + common alternatives)
- **Decision**: State the chosen option clearly
- **Rationale**: Explain why based on the project's actual context (NFRs, constraints, team skills)
- **Consequences**: Be honest about trade-offs — both positive and negative
- **Related Components**: List actual component IDs from the planning data

**Do not use generic placeholder text.** The ADRs must be specific to this application's context.

---

### Step 5: Review Before Saving

After drafting all ADRs, show a summary to the user:

```
I've drafted [N] ADR(s):

1. **adr-001-container-platform.md** — Use Azure Container Apps for API Backend and Background Worker
   Status: draft | Category: compute

2. **adr-002-database-selection.md** — Use Azure SQL Database for Customer Database
   Status: draft | Category: data

[etc.]

Would you like to review any of these before saving? Or shall I save all of them?
```

If the user wants to review a specific ADR, show its full content and allow edits before saving.

---

### Step 6: Save Files

**Target location:** `src/data/architecture-decisions/adrs/`

**Pre-save checks:**
1. Verify directory `src/data/architecture-decisions/adrs/` exists
2. If not, show error and stop
3. Check for filename conflicts (existing ADRs with the same number)

**Conflict resolution:** If `adr-001-*.md` already exists, increment to `adr-002-*.md` for the new ADR (don't overwrite).

**Error handling:**
- If directory missing: "Error: Directory 'src/data/architecture-decisions/adrs/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write [filename]. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Generated [N] ADR(s) successfully!

📄 Files created:
   - src/data/architecture-decisions/adrs/adr-001-container-platform.md
   - src/data/architecture-decisions/adrs/adr-002-database-selection.md
   [etc.]

🌐 To view in the UI:
   1. Ensure the development server is running: npm run dev
   2. Refresh your browser
   3. Navigate to the Architecture Decisions section
   4. Each ADR card should now appear with a blue border

You can use /refine-adr to update the status of any ADR (e.g., from draft to accepted), or add more context to any section.
```

---

## Error Handling

### If no planning data exists:
- Warn the user: "I couldn't find any planning data to base ADRs on. Please complete at least the application components and infrastructure context sections first."
- Offer to generate a generic set of ADRs with placeholder content (but warn these will need heavy customization)

### If ADR template is missing:
- Warn the user: "No ADR template found at src/data/architecture-decisions/adr-template.md. Run /adr-template first, or I can use the default template."
- Use the built-in default template if the user agrees

### If user selects no topics:
- "No problem! When you're ready to document your architectural decisions, run /generate-adrs again."

### If directory doesn't exist:
- Show clear error, do NOT create directory

---

## Example Interaction

**Agent:** "I've read your planning data. Based on your choices, I recommend documenting these decisions as ADRs:

1. **Compute platform** — You've chosen Container Apps (from your component config) over AKS or App Service
2. **Database selection** — Azure SQL Database choice with its tier and configuration
3. **Networking model** — Hub-spoke with private endpoints
4. **CI/CD platform** — GitHub Actions with your environment promotion strategy

Which would you like to generate? Say 'all' or list numbers."

**User:** "All of them."

**Agent:** "I have enough information from your planning data to draft all four. Let me generate them now..."

[Generates 4 ADRs]

**Agent:** "Here's a summary of the 4 ADRs I've drafted: [shows summary]. Would you like to review any before I save?"

**User:** "Looks good, save them all."

**Agent:** "✅ Generated 4 ADR(s) successfully!"

---

## Reference Files

- **ADR template**: `src/data/architecture-decisions/adr-template.md`
- **ADR example**: `src/data/architecture-decisions/adrs/adr-001-container-platform.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ At least one ADR file created at `src/data/architecture-decisions/adrs/`
- ✅ Each ADR follows the template structure
- ✅ ADRs contain project-specific content (not generic placeholders)
- ✅ File naming follows the `adr-{NNN}-{slug}.md` convention
- ✅ Numbers are sequential and do not conflict with existing ADRs
- ✅ All TodoWrite tasks were used and completed
- ✅ User confirmed which ADRs to generate before files were written
- ✅ User is informed of successful creation
- ✅ UI displays the ADR cards after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
