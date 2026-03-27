---
name: refine-adr
description: List existing ADRs, let the user select one, and interactively refine its sections (status, alternatives, rationale, consequences)
---

## Purpose

This skill allows interactive refinement of an existing Architecture Decision Record. It reads all ADRs in `data/architecture-decisions/adrs/`, lets the user select one, and guides them through updating specific sections.

The updated ADR will be reflected in the UI when the user refreshes after running `npx @zureltd/az-infra-harness`.

## When to Use

Run this skill when:
- An existing ADR needs its status changed (e.g., draft → reviewed → accepted)
- New alternatives or rationale need to be added to an ADR
- The consequences of a decision became clearer after implementation
- User explicitly runs `/refine-adr`

## Workflow

### Step 1: Discover Existing ADRs

Read all files in `data/architecture-decisions/adrs/` and list them.

If no ADRs exist:
```
No ADRs found in data/architecture-decisions/adrs/. Please run /generate-adrs first to create architecture decision records.
```
Stop the skill.

---

### Step 2: Present ADR List

Show all existing ADRs with their current status:

```
Here are your existing Architecture Decision Records:

1. **adr-001-container-platform.md** — Use Azure Container Apps for API and Worker Compute
   Status: draft | Category: compute

2. **adr-002-database-selection.md** — Use Azure SQL Database Serverless for Customer Data
   Status: reviewed | Category: data

3. **adr-003-networking-model.md** — Hub-Spoke Network with Private Endpoints
   Status: accepted | Category: networking

Which ADR would you like to refine? (Enter the number or filename)
```

Wait for the user's selection.

---

### Step 3: Show Current ADR Content

Read and display the selected ADR in full:

```
Here's the current content of **[ADR filename]**:

---
[Full ADR content]
---

What would you like to change? Options:
1. **Update status** — Change from [current status] to draft/reviewed/accepted
2. **Update context** — Add or refine the problem statement
3. **Add or update options considered** — Add a new alternative or update pros/cons
4. **Update decision** — Clarify or change the chosen option
5. **Update rationale** — Add more detail to the reasoning
6. **Update consequences** — Add newly discovered implications
7. **Update related components** — Add or remove component references
8. **Multiple sections** — Tell me what you'd like to change in free text

What would you like to do?
```

Wait for the user's response.

---

### Step 4: Interactive Refinement

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to track each requested change as a task.

Apply changes conversationally based on the user's selection:

**If updating status:**
```
What should the new status be?
- **draft** — Work in progress, not yet ready for review
- **reviewed** — Reviewed by the team, pending final decision
- **accepted** — Decision finalized and accepted by the team
```

**If updating context:**
```
Please describe the additional context or clarifications you'd like to add to the Context section. I'll show you the current text and you can tell me what to change or append.
```

**If adding/updating options:**
```
What option would you like to add or update?

For a new option, please provide:
- Name of the option
- 2-4 pros
- 2-4 cons

For updating an existing option, tell me the option name and what to change.
```

**If updating rationale:**
```
What additional reasoning would you like to add to the Rationale section? This is your chance to capture why this decision was made in the context of this specific project.
```

**If updating consequences:**
```
What consequences would you like to add or update? These can be:
- Positive outcomes that have been realized
- Negative trade-offs discovered
- Future actions required as a result of this decision
```

After each change, show the updated section and ask: "Does this look right?"

---

### Step 5: Final Review

After all requested changes have been made, show the complete updated ADR:

```
Here's the updated ADR:

---
[Full updated ADR content]
---

Does this look correct? Would you like to make any additional changes before saving?
```

Wait for confirmation before writing.

---

### Step 6: Save Updated File

**Target location:** `data/architecture-decisions/adrs/[original-filename]`

Overwrite the existing file with the updated content.

**Pre-save checks:**
1. Verify the file still exists at its original path
2. Verify directory is writeable

**Error handling:**
- If file no longer exists: "Error: The original ADR file could not be found. It may have been moved or deleted."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Updated [ADR filename] successfully!

📄 File location: data/architecture-decisions/adrs/[filename]

Changes made:
- [Brief summary of what was changed]

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Architecture Decisions section

Would you like to refine another ADR?
```

If the user wants to refine another ADR, return to Step 2.

---

## Error Handling

### If no ADRs exist:
- Stop with clear message directing user to run `/generate-adrs` first

### If user selects an invalid ADR number:
- "I didn't find that ADR. Please enter a number from the list (1-[N]) or the exact filename."

### If user wants to change a section to something that violates the template:
- Apply the change but note the deviation: "Note: The standard template includes [section]. This change removes it — are you sure?"

### If user wants to split one ADR into two:
- Offer: "I can update this ADR with the refined content. To create a separate ADR for a related decision, run /generate-adrs after we're done here."

### If write fails:
- Show clear error with actionable advice

---

## Example Interaction

**Agent:** "Here are your existing ADRs:
1. **adr-001-container-platform.md** — Use Azure Container Apps (Status: draft)
2. **adr-002-database-selection.md** — Use Azure SQL Database (Status: draft)

Which would you like to refine?"

**User:** "1"

**Agent:** "Here's the current content of adr-001-container-platform.md: [shows full ADR]. What would you like to change?"

**User:** "Update the status to accepted, and add a consequence about needing to monitor scaling behavior closely."

**Agent:** "I'll change the status to 'accepted' and add to the Consequences section: 'Scaling behavior must be monitored closely during initial production rollout to validate that the Consumption plan scaling triggers are correctly configured for the expected traffic patterns.' Here's the updated ADR: [shows updated content]. Does this look right?"

**User:** "Yes, save it."

**Agent:** "✅ Updated adr-001-container-platform.md successfully!"

---

## Reference Files

- **ADR template**: `data/architecture-decisions/adr-template.md`
- **ADR examples**: `data/architecture-decisions/adrs/`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ Existing ADR file updated at `data/architecture-decisions/adrs/[filename]`
- ✅ All requested changes applied correctly
- ✅ ADR structure (H1, status, all required sections) remains intact
- ✅ User reviewed the full updated ADR before saving
- ✅ User confirmed changes before file was written
- ✅ File is not empty and is readable after update
- ✅ User is informed of successful update
- ✅ UI reflects the updated ADR after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
