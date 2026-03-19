---
name: development-context
description: Gather development workflow, version control, CI/CD pipeline, deployment strategy, and tooling information
---

## Purpose

This skill gathers information about the development process, CI/CD pipeline, and tooling used by the team. It generates `src/data/context/development-context.md` which informs deployment strategy and infrastructure design decisions.

The generated file will be displayed in the UI when the user runs `npm run dev` and navigates to the Context section.

## When to Use

Run this skill when:
- Continuing from `/platform-context` to complete the Context phase
- The development context needs to be defined or updated
- User explicitly runs `/development-context`

## Workflow

### Step 1: Codebase Discovery (Optional but Recommended)

Before asking questions, scan the codebase for existing CI/CD and development configuration.

**Files to scan:**
1. `src/data/context/development-context.md` — existing content (Update Mode trigger)
2. `.github/workflows/` — CI/CD platform and workflow structure
3. `.gitlab-ci.yml`, `azure-pipelines.yml`, `Jenkinsfile` — alternative CI/CD platforms
4. `package.json` (scripts, test frameworks), `jest.config.*`, `playwright.config.*`
5. `.gitignore`, `.editorconfig`, `commitlint.config.*` — dev tool hints
6. `README.md` — development setup instructions

**If existing file found with content → follow Update Mode (Step 2a).**
**If no existing file → follow Fresh Mode (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present the current content to the user.

```
I found your existing development context. Here's what's currently documented:

[Summary of each section currently in the file]

What would you like to update? You can modify any section, or say "looks good" to confirm everything is correct.
```

Wait for the user's response, then make changes. Ask "Anything else to update, or shall I save?" before proceeding to Step 6.

---

### Step 2b: Fresh Mode — Interactive Information Gathering

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to create a task list at the start with these high-priority items:
1. Development Workflow
2. Version Control
3. Development Environment
4. Testing Strategy
5. CI/CD Pipeline
6. Deployment Strategy
7. Monitoring & Observability
8. Development Tools

Ask one logical group at a time, wait for the response, then mark the task complete before moving to the next. You may combine closely related sections (e.g., Development Workflow + Version Control) if the user is providing information fluidly.

If codebase scanning found useful information (e.g., GitHub Actions workflows, test configs), present those findings and ask for confirmation rather than asking from scratch.

---

#### Section 1: Development Workflow

```
Let's start with your development workflow. Please describe:

1. **Methodology**: How does your team work? (e.g., Agile with 2-week sprints, Kanban, Scrum)
2. **Code review process**: Is code review required before merging? (e.g., 1 reviewer, 2 reviewers, team lead approval)
3. **Quality gates**: What must pass before a PR can be merged? (e.g., tests, security scans, linting)
```

---

#### Section 2: Version Control

```
Now let's capture your version control setup:

1. **Platform**: Where is your code hosted? (e.g., GitHub, GitHub Enterprise, Azure DevOps Repos, GitLab)
2. **Branching strategy**: What branching model do you use? (e.g., Git Flow with main/develop/feature/hotfix, trunk-based, GitHub Flow)
3. **Commit conventions**: Do you use conventional commits, semantic versioning, or any other commit message standards?
```

**If GitHub Actions found in codebase:**
```
I can see you're using GitHub. Is this GitHub.com or GitHub Enterprise Server?
And what branching strategy do you follow?
```

---

#### Section 3: Development Environment

```
How do developers set up their local environment?

1. **Local tooling**: What tools do developers run locally? (e.g., Docker Desktop, local Kubernetes, dev containers)
2. **Azure access**: Do developers have personal Azure subscriptions for testing, or do they use shared dev environments?
3. **Infrastructure tools**: Do developers run Terraform/Bicep locally, or is IaC only run through CI/CD?
```

---

#### Section 4: Testing Strategy

```
Describe your testing approach:

1. **Unit tests**: What framework and coverage target? (e.g., Jest with 80% target, xUnit, pytest)
2. **Integration tests**: Are there integration tests that run against real services or test databases?
3. **End-to-end tests**: Do you have E2E tests? (e.g., Playwright, Cypress, Selenium)
4. **Security scanning**: Any SAST/DAST tools or dependency vulnerability scanning? (e.g., Snyk, SonarQube, OWASP ZAP)
5. **Load/performance testing**: Any load testing tools? (e.g., k6, JMeter, Azure Load Testing)
```

---

#### Section 5: CI/CD Pipeline

```
Now let's capture your CI/CD setup:

1. **Platform**: What CI/CD platform do you use? (e.g., GitHub Actions, Azure Pipelines, GitLab CI, Jenkins)
2. **Workflow structure**: Is there one pipeline for the whole app, or per-component pipelines?
3. **Trigger rules**: What triggers a pipeline run? (e.g., PR opened, push to develop, push to main)
4. **Secrets management**: How are secrets (API keys, credentials) passed to the pipeline? (e.g., GitHub Secrets, Azure Key Vault, pipeline variables)
```

---

#### Section 6: Deployment Strategy

```
How do you deploy to production?

1. **Deployment model**: What deployment approach do you use? (e.g., blue-green, canary, rolling update, feature flags)
2. **Environments**: What environments exist and how does code flow through them? (e.g., dev → staging → production)
3. **Approval gates**: Are there manual approval gates before production deployment?
4. **Rollback**: How do you roll back a bad deployment? (e.g., automated rollback, manual redeploy, previous container image)
```

---

#### Section 7: Monitoring & Observability

```
How does your team monitor the application in production?

1. **APM tools**: What application performance monitoring tools do you use? (e.g., Application Insights, Datadog, New Relic)
2. **Logging**: Where do logs go and how are they accessed? (e.g., Log Analytics, Splunk, CloudWatch)
3. **Alerting**: How are you alerted on incidents? (e.g., PagerDuty, email, Slack via Azure Monitor)
4. **Dashboards**: Do you have operational dashboards? (e.g., Grafana, Azure Workbooks)
```

---

#### Section 8: Development Tools

```
Finally, what are the main development tools your team uses?

1. **IDE**: What editor/IDE do most developers use? (e.g., VS Code, Visual Studio, JetBrains)
2. **API testing**: Any API testing tools? (e.g., Postman, Bruno, REST Client)
3. **Database tools**: How do developers access databases? (e.g., Azure Data Studio, TablePlus, pgAdmin)
4. **IaC tools**: What tools do you use for infrastructure-as-code? (e.g., Bicep with Azure CLI, Terraform CLI, Pulumi)
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
# Development Context

## Development Workflow

[Methodology. Code review process. Quality gates before merge.]

## Version Control

[Platform (GitHub/ADO/GitLab). Branching strategy. Commit conventions.]

## Development Environment

[Local tooling. Azure access for developers. IaC local vs CI-only.]

## Testing Strategy

[Unit test framework and coverage target. Integration tests. E2E tests. Security scanning. Load testing.]

## CI/CD Pipeline

[Platform. Workflow structure. Trigger rules. Secrets management.]

## Deployment Strategy

[Deployment model (blue-green/canary/rolling). Environments and flow. Approval gates. Rollback approach.]

## Monitoring & Observability

[APM tools. Logging platform. Alerting mechanism. Dashboards.]

## Development Tools

[IDE. API testing. Database tools. IaC tools.]
```

**Formatting rules:**
- H1 (`#`) for the file title: exactly `# Development Context`
- H2 (`##`) for each of the 8 sections
- Plain prose paragraphs per section (bullet lists acceptable for tools/lists)
- No placeholder text in final output
- No trailing whitespace

---

### Step 5: Validation

Before saving:

- ✅ Exactly one H1: `# Development Context`
- ✅ Eight H2 sections present
- ✅ No section is empty
- ✅ No placeholder text remains
- ✅ All TodoWrite tasks marked complete
- ✅ Zero open items

---

### Step 6: Save File

**Target location:** `src/data/context/development-context.md`

**Pre-save checks:**
1. Verify directory `src/data/context/` exists
2. If not, show error and stop

**Error handling:**
- If directory missing: "Error: Directory 'src/data/context/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Created development context successfully!

📄 File location: src/data/context/development-context.md

🌐 To view in the UI:
   1. Ensure the development server is running: npm run dev
   2. Refresh your browser
   3. Navigate to the Context section
   4. The development context card should now show a blue border with a checkmark
   5. Once all context cards are complete, the "Continue to Application Architecture" button will be enabled

You have now completed the Context section! 🎉
The next step is to run /configure-component to begin defining your application architecture.
```

---

## Error Handling

### If codebase scanning finds CI/CD config:
- Present the findings and ask for confirmation: "I found GitHub Actions workflows in your repo. Is this your primary CI/CD platform?"

### If directory doesn't exist:
- Show clear error, do NOT create directory
- Message: "Error: Directory 'src/data/context/' not found. Are you in the project root directory?"

### If user skips sections:
- Allow "TBD" or "not decided yet" for non-critical sections (e.g., load testing tools)
- Document the TBD explicitly in the output

### If write fails:
- Show clear error with actionable advice

---

## Example Interaction

**Agent:** "Let's gather your development context. I'll ask about 8 areas. I can see you have GitHub Actions workflows in your repo — is GitHub Actions your primary CI/CD platform?"

**User:** "Yes, GitHub Actions on GitHub Enterprise."

**Agent:** "Great. What branching strategy do you follow?"

**User:** "Git Flow — main, develop, feature branches, and hotfix branches."

[Conversation continues through all sections]

**Agent:** "✅ Created development context successfully!

📄 File location: src/data/context/development-context.md"

---

## Reference Files

- **Sample output**: `src/data/context/development-context.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ File created at `src/data/context/development-context.md`
- ✅ Content matches the required format exactly
- ✅ All eight sections are populated with concrete information
- ✅ All TodoWrite tasks were used and completed
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
