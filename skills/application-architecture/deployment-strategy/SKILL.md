---
name: deployment-strategy
description: Document source control, CI/CD platform, environments, deployment process, and quality gates for the application
---

## Purpose

This skill documents the end-to-end deployment strategy for the application. It generates `data/application-architecture/deployment-strategy.md` which serves as the reference for CI/CD pipeline design and IaC deployment automation.

The generated file will be displayed in the UI when the user runs `npx @zureltd/az-infra-harness` and navigates to the Application Architecture section.

## When to Use

Run this skill when:
- Working through the Application Architecture phase
- The deployment strategy needs to be defined or updated
- User explicitly runs `/deployment-strategy`

## Workflow

### Step 1: Check for Existing File + Codebase Discovery

Check whether `data/application-architecture/deployment-strategy.md` already exists.

Also scan the codebase for existing CI/CD configuration:
- `.github/workflows/` — GitHub Actions workflows
- `azure-pipelines.yml` — Azure Pipelines
- `.gitlab-ci.yml` — GitLab CI
- `data/context/development-context.md` — already-captured development context (reuse this!)

**If existing deployment strategy file found → follow Update Mode (Step 2a).**
**If no existing file → follow Fresh Mode (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present the current content to the user.

```
I found your existing deployment strategy. Here's what's currently documented:

[Summary of each section]

What would you like to update? You can modify any section, or say "looks good" to confirm everything is correct.
```

Wait for the user's response, then make changes. Ask "Anything else to update, or shall I save?" before proceeding to Step 5.

---

### Step 2b: Fresh Mode — Interactive Information Gathering

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

**Important:** First check `data/context/development-context.md` — if it exists, many answers may already be captured there. Pre-populate what you can from that file and ask the user to confirm rather than asking from scratch.

Use the **TodoWrite** tool to create a task list at the start with these high-priority items:
1. Source Control
2. CI/CD Platform
3. Environments
4. Deployment Process
5. Quality Gates

Ask one section at a time, wait for the response, then mark the task complete before moving to the next.

---

#### Section 1: Source Control

```
Let's start with your source control setup:

1. **Repository URL**: What is the repository URL or name? (e.g., github.com/contoso/customer-portal)
2. **Branching strategy**: What branching strategy do you use? (e.g., GitFlow with main/develop/feature/hotfix, trunk-based development)
3. **Branch protection**: Are there branch protection rules on main/develop? (e.g., require PR, required reviewers, status checks)
```

**If development-context.md exists:** "Based on your development context, you're using [platform] with [branching strategy]. Can you confirm the repository URL and branch protection rules?"

---

#### Section 2: CI/CD Platform

```
Now let's capture your CI/CD setup:

1. **Platform**: What CI/CD platform do you use? (e.g., GitHub Actions, Azure Pipelines)
2. **Workflow structure**: Is there a single pipeline for the whole application, or separate pipelines per component?
3. **Secrets management**: How are secrets (Azure credentials, API keys) passed to the pipeline? (e.g., GitHub Secrets + Azure Key Vault reference, pipeline library variables)
```

**If development-context.md or CI config found:** "I can see you're using [platform]. Is there a separate pipeline per component or one shared pipeline?"

---

#### Section 3: Environments

```
What environments does your application have, and how does code flow through them?

For each environment, please describe:
- **Name** (e.g., dev, staging, production)
- **Trigger**: What causes a deployment to this environment? (e.g., push to develop branch, manual approval, merge to main)
- **Approval gate**: Is there a manual approval required? Who approves?
- **Azure subscription/resource group**: Does each environment use a separate subscription?

Common example: dev (auto on PR merge to develop) → staging (manual approval) → production (manual approval + change ticket)
```

**Validation:**
- At least 2 environments must be defined
- Production environment must have some form of approval gate (manual or automated)

---

#### Section 4: Deployment Process

```
Walk me through the numbered steps of your deployment process from code commit to production:

For example:
1. Developer opens PR → CI runs tests and scans
2. PR is reviewed and merged to develop
3. CI/CD auto-deploys to dev environment
4. QA validates in staging after manual approval
5. Release manager approves production deployment
6. CI/CD deploys to production using Bicep/Terraform what-if then apply

Please describe your actual process.
```

**Validation:**
- Must have at least 3 numbered steps
- Steps must include: CI trigger, deployment to at least one environment, production gate

---

#### Section 5: Quality Gates

```
What quality gates must pass before a deployment proceeds?

Common gates to describe:
- **Test coverage**: Minimum test coverage threshold (e.g., 80%)
- **Integration tests**: Do integration tests run in the pipeline?
- **Security scanning**: Any SAST/DAST/dependency scanning (e.g., Snyk, SonarQube)?
- **IaC validation**: Is Bicep lint / Terraform validate / plan run before apply?
- **Performance tests**: Any load/performance gates in staging?
```

---

### Step 3: Open Items Gate

Before generating the file, summarize any missing information:

```
Open Items:
- [Missing Item 1]
- [Missing Item 2]
```

Resolve all open items. Only proceed when there are zero open items.

---

### Step 4: Generate Content

Once all sections are complete and validated, create the markdown file with this **exact structure**:

```markdown
# Deployment Strategy

## Source Control

[Repository URL. Branching strategy. Branch protection rules.]

## CI/CD Platform

[Platform name. Workflow structure (per-component or shared). Secrets management approach.]

## Environments

[List of environments with trigger, approval gate, and subscription details.]

## Deployment Process

1. [Step 1]
2. [Step 2]
3. [Step 3]
...

## Quality Gates

[Test coverage requirements. Integration test approach. Security scanning tools. IaC validation steps. Performance testing.]
```

**Formatting rules:**
- H1 (`#`) for the file title: exactly `# Deployment Strategy`
- H2 (`##`) for each section
- Numbered list for Deployment Process steps
- Prose or bullet lists for other sections
- No placeholder text in final output
- No trailing whitespace

---

### Step 5: Validation

Before saving:

- ✅ Exactly one H1: `# Deployment Strategy`
- ✅ Five H2 sections present
- ✅ Deployment Process has numbered steps
- ✅ At least 2 environments described
- ✅ No section is empty
- ✅ No placeholder text remains
- ✅ All TodoWrite tasks marked complete
- ✅ Zero open items

---

### Step 6: Save File

**Target location:** `data/application-architecture/deployment-strategy.md`

**Pre-save checks:**
1. Verify directory `data/application-architecture/` exists
2. If not, show error and stop

**Error handling:**
- If directory missing: "Error: Directory 'data/application-architecture/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Created deployment strategy successfully!

📄 File location: data/application-architecture/deployment-strategy.md

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Application Architecture section
   4. The deployment strategy card should now show a blue border with a checkmark

You can now run /configure-component to configure individual components, or /architecture-diagram to generate the architecture diagram.
```

---

## Error Handling

### If development-context.md exists:
- Reuse its CI/CD and deployment information as a starting point
- Confirm with the user rather than re-asking the same questions

### If directory doesn't exist:
- Show clear error, do NOT create directory

### If user provides fewer than 2 environments:
- Ask: "Most applications have at least a dev and a production environment. Can you describe the additional environment(s)?"

### If write fails:
- Show clear error with actionable advice

---

## Example Interaction

**Agent:** "Let's document your deployment strategy. I can see from your development context that you're using GitHub Actions with GitFlow. Can you confirm the repository URL?"

**User:** "github.com/contoso/customer-portal"

**Agent:** "And is there a separate GitHub Actions workflow per component, or one shared workflow?"

**User:** "Separate workflows per component."

[Conversation continues through all sections]

**Agent:** "✅ Created deployment strategy successfully!

📄 File location: data/application-architecture/deployment-strategy.md"

---

## Reference Files

- **Sample output**: `data/application-architecture/deployment-strategy.md`
- **Related data**: `data/context/development-context.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ File created at `data/application-architecture/deployment-strategy.md`
- ✅ Content matches the required format exactly
- ✅ All five sections are populated with concrete information
- ✅ Deployment Process section has numbered steps
- ✅ At least 2 environments are described
- ✅ All TodoWrite tasks were used and completed
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
