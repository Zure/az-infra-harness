---
name: adr-template
description: Write the canonical ADR template file used by all architecture decision records in this project
---

## Purpose

This skill writes the canonical Architecture Decision Record (ADR) template to `src/data/architecture-decisions/adr-template.md`. This file serves as the master template that the `/generate-adrs` skill uses when creating individual ADRs.

The generated file will be displayed in the UI when the user runs `npm run dev` and navigates to the Architecture Decisions section.

## When to Use

Run this skill when:
- Setting up the Architecture Decisions section for the first time
- The ADR template needs to be customized for this project
- User explicitly runs `/adr-template`

## Workflow

### Step 1: Check for Existing File

Check whether `src/data/architecture-decisions/adr-template.md` already exists and has content.

**If the file exists → follow Update Mode (Step 2a).**
**If the file does not exist → follow Fresh Mode (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing template and present it to the user.

```
I found your existing ADR template. Here's what's currently in it:

[Show current template content]

Would you like to customize it, or keep it as-is? You can:
- Add or remove sections
- Rename section headings
- Add project-specific guidance text
- Say "keep as-is" to confirm without changes
```

Wait for the user's response, then make the requested changes. Ask "Shall I save the updated template?" before writing.

---

### Step 2b: Fresh Mode — Confirm and Optionally Customize

This skill has minimal required interaction — the default template is well-defined. Present the default template and ask if the user wants to customize it.

```
I'll create the standard ADR template for this project. Here's the default template:

---
# [Short descriptive title of the decision]

**Status:** [draft | reviewed | accepted]
**Date:** [YYYY-MM-DD]
**Category:** [compute | data | networking | security | cicd | auth | other]

## Context

[Describe the context and problem statement. What forces are at play? What are the constraints?]

## Options Considered

### Option 1: [Name]
**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

### Option 2: [Name]
**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

## Decision

[Describe the chosen solution]

## Rationale

[Explain why this option was chosen over the alternatives]

## Consequences

[What are the implications of this decision? Both positive and negative outcomes.]

## Related Components

[List component IDs this decision affects]
---

Would you like to use this default template, or would you like to customize any sections?

Options:
- Say "use default" to proceed with this template
- Tell me what you'd like to change (add sections, rename headings, add project-specific fields)
```

**If user says "use default" or similar:** proceed directly to save.
**If user requests customization:** apply changes, show the updated template, confirm before saving.

---

### Step 3: Validation

Before saving:

- ✅ Template contains at least these sections: Title (H1), Status, Context, Options Considered, Decision, Rationale, Consequences, Related Components
- ✅ No accidental placeholder removal (e.g., `[YYYY-MM-DD]` should remain as a placeholder — it's part of the template)
- ✅ Template is syntactically valid markdown

---

### Step 4: Save File

**Target location:** `src/data/architecture-decisions/adr-template.md`

**Pre-save checks:**
1. Verify directory `src/data/architecture-decisions/` exists
2. If not, show error and stop

**Error handling:**
- If directory missing: "Error: Directory 'src/data/architecture-decisions/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 5: Confirm to User

```
✅ Created ADR template successfully!

📄 File location: src/data/architecture-decisions/adr-template.md

This template will be used by /generate-adrs when creating individual architecture decision records.

🌐 To view in the UI:
   1. Ensure the development server is running: npm run dev
   2. Refresh your browser
   3. Navigate to the Architecture Decisions section

You can now run /generate-adrs to generate ADRs based on your planning data.
```

---

## Error Handling

### If directory doesn't exist:
- Show clear error, do NOT create directory
- Message: "Error: Directory 'src/data/architecture-decisions/' not found. Are you in the project root directory?"

### If write fails:
- Show clear error with actionable advice

### If user requests unusual customizations:
- Apply any reasonable customization (the template is a guide, not a strict format)
- Ensure all key sections (Context, Decision, Rationale, Consequences) remain present

---

## Example Interaction

**Agent:** "I'll create the standard ADR template for this project. [Shows default template] Would you like to use this default template, or would you like to customize any sections?"

**User:** "Use default."

**Agent:** "✅ Created ADR template successfully!

📄 File location: src/data/architecture-decisions/adr-template.md"

---

### With Customization

**Agent:** "I'll create the standard ADR template for this project. [Shows default template] Would you like to use this default template, or customize any sections?"

**User:** "Add a 'Risk Assessment' section after Consequences."

**Agent:** "I'll add a Risk Assessment section. Here's the updated template: [shows updated template with new section]. Shall I save this?"

**User:** "Yes."

**Agent:** "✅ Created ADR template successfully!"

---

## Reference Files

- **Sample output**: `src/data/architecture-decisions/adr-template.md`
- **ADR example**: `src/data/architecture-decisions/adrs/adr-001-container-platform.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ File created at `src/data/architecture-decisions/adr-template.md`
- ✅ Template contains all required sections (Title, Status, Context, Options, Decision, Rationale, Consequences, Related Components)
- ✅ File is not empty and is readable
- ✅ User confirmed the template before saving (either "use default" or approved customizations)
- ✅ User is informed of successful creation
- ✅ UI displays the content after browser refresh
