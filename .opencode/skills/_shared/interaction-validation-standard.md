# Interaction & Validation Standard

This standard applies to all interactive skills that gather structured input before generating files.

## Core Principles

1. Never generate output without explicit user interaction.
2. Never silently infer required values without confirmation.
3. Never proceed to file generation with incomplete required fields.

---

## Required Interaction Pattern

### 1. Question Tracking

For every required question or section, track its status as:

- answered
- partially answered
- unanswered

Do not proceed until all required items are marked as **answered**.

---

### 2. Progressive Section Handling

- Ask one logical group at a time.
- Wait for the user's response before continuing.
- Validate immediately after each section.
- If validation fails, re-ask only the failing portion.

---

### 3. Open Items Gate

Before file generation:

- Summarize any missing or unclear inputs under:

```
Open Items:
- [Missing Item 1]
- [Missing Item 2]
```

- Resolve all open items.
- Only proceed when there are zero open items.

---

### 4. Explicit Confirmation Rule

If the workflow involves:

- Updating an existing file
- Confirming inferred content
- Modifying a generated list

You must explicitly ask for confirmation before generating the file.

---

### 5. No Silent Defaults

- You may suggest defaults, but clearly label them as suggestions.
- Require explicit user approval before using them.
- Never auto-apply defaults silently.

---

## Completion Criteria

A skill may proceed to file generation only when:

- All required inputs are provided
- All validation checks pass
- No open items remain
- User confirmation is obtained (if applicable)

If any condition fails, return to clarification.

---

## Required Inputs Contract (Reusable)

All context-generating skills must define a mandatory input contract.

Rules:

- All required sections must contain concrete, actionable information.
- No placeholders are allowed in final generated files.
- No implicit assumptions may replace explicit user confirmation.
- File generation is blocked if any required input is missing.

---

## Runtime Todo Enforcement (Reusable)

All interactive context skills must use the TodoWrite tool.

Initialization Rules:

1. Create a todo list at skill start.
2. Each required input must be represented as a high-priority task.
3. Only one task may be marked `in_progress` at a time.
4. Immediately mark tasks `completed` once fully answered.
5. Never auto-complete tasks based on assumptions.

Pre-Generation Rules:

- All high-priority tasks must be `completed` before file generation.
- If any task is `pending` or `in_progress`, trigger the Open Items Gate.

Strict Enforcement:

- If TodoWrite has not been initialized during the session, file generation is prohibited.
- If required inputs exist without corresponding high-priority todo items, file generation is prohibited.
- If more than one task is marked `in_progress`, execution must stop and be corrected before continuing.
- The absence of a todo list is treated as a validation failure.

---

## Validation Gate (Reusable Enforcement Layer)

Before generating any file:

1. Re-evaluate all required inputs.
2. Confirm zero unanswered checklist items.
3. Confirm zero pending high-priority todo items.
4. Confirm no vague or inferred content remains.

If validation fails:

- Print an "Open Items" section.
- Explicitly request the missing information.
- Stop execution.
- Do NOT generate the file.

File generation is allowed only when all enforcement layers pass.
