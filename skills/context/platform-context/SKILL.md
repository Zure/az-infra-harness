---
name: platform-context
description: Gather identity & access, security services, monitoring, and platform services available in the Azure environment
---

## Purpose

This skill gathers information about the Azure platform services available to the application. It generates `infra/context/platform-context.md` which informs security, monitoring, and identity decisions during architecture planning.

The generated file will be displayed in the UI when the user runs `npx @zureltd/az-infra-harness` and navigates to the Context section.

## When to Use

Run this skill when:
- Continuing from `/infrastructure-context` in the Context phase
- The platform context needs to be defined or updated
- User explicitly runs `/platform-context`

## Workflow

### Step 1: Check for Existing File

Check whether `infra/context/platform-context.md` already exists and has content.

**If the file exists and has content → follow Update Mode (Step 2a).**
**If the file does not exist or is empty → follow Fresh Mode (Step 2b).**

---

### Step 1b: Ask Before Azure CLI Scanning

**Always ask the user before running any Azure CLI commands.** Present this prompt:

```
Would you like me to scan your existing Azure environment using the Azure CLI to pre-populate the platform context?

1. **Yes, scan my Azure environment** — I'm logged in (or can run `az login`) and platform services already exist
2. **No, this is a greenfield scenario** — No platform services are set up yet; I'll answer questions manually
3. **No, I'll answer manually** — I prefer not to run CLI commands

```

Wait for the user's response before proceeding:
- If **option 1**: proceed to Azure CLI Discovery (Step 1c)
- If **option 2** or **option 3**: skip directly to Fresh Mode (Step 2b)

> The user may also type a custom response. Accept any confirmation of intent to scan ("yes", "go ahead", "scan it") as option 1, and any refusal ("no", "skip", "greenfield") as options 2/3.

---

### Step 1c: Azure CLI Discovery

Only run these commands if the user explicitly consented in Step 1b.

If the Azure CLI (`az`) is available and the user is logged in, run discovery commands to pre-populate platform context automatically.

**Check if logged in first:**
```bash
az account show --query "{subscription:name, id:id}" -o json 2>/dev/null
```

If logged in, run these discovery commands:

```bash
# Discover Key Vaults
az keyvault list --query "[].{name:name, location:location, rg:resourceGroup, sku:properties.sku.name, enableRbac:properties.enableRbacAuthorization, enablePurgeProtection:properties.enablePurgeProtection}" -o json 2>/dev/null

# Discover Log Analytics workspaces
az monitor log-analytics workspace list --query "[].{name:name, location:location, rg:resourceGroup, sku:sku.name, retentionDays:retentionInDays}" -o json 2>/dev/null

# Discover Application Insights instances
az monitor app-insights component show --query "[].{name:name, location:location, rg:resourceGroup, kind:kind, workspaceId:workspaceResourceId}" -o json 2>/dev/null

# Check Microsoft Defender for Cloud status
az security pricing list --query "[?pricingTier=='Standard'].{name:name, tier:pricingTier}" -o json 2>/dev/null

# Discover Container Registries
az acr list --query "[].{name:name, location:location, sku:sku.name, adminEnabled:adminUserEnabled}" -o json 2>/dev/null

# Discover Managed Identities (user-assigned)
az identity list --query "[].{name:name, location:location, rg:resourceGroup, clientId:clientId}" -o json 2>/dev/null

# Check Azure Policy assignments on the subscription
az policy assignment list --query "[].{name:name, displayName:displayName, enforcement:enforcementMode, scope:scope}" -o json 2>/dev/null

# Check role assignments for the current user
az role assignment list --assignee $(az ad signed-in-user show --query id -o tsv 2>/dev/null) --query "[].{role:roleDefinitionName, scope:scope}" -o json 2>/dev/null
```

**How to present findings:**

```
I've scanned your Azure subscription "[subscription name]" and found:

**Identity & Access:**
- [N] user-assigned managed identities found
- Your RBAC roles: [list of roles]

**Security Services:**
- Key Vault: [kv-name] ([sku], RBAC: [yes/no], Purge Protection: [yes/no])
- Defender for Cloud: [enabled services or "not enabled"]

**Monitoring & Logging:**
- Log Analytics: [workspace-name] ([retention] days retention)
- Application Insights: [instance-name or "none found"]

**Platform Services:**
- Container Registry: [acr-name] ([sku]) or "none found"
- Azure Policy: [N] assignments active — [list key ones like required tags, allowed locations]

Is this information accurate? Let me ask a few clarifying questions about how these are managed.
```

**If `az` is not available or not logged in:**
- Inform the user and fall back to interactive questions (Step 2b)

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present the current content to the user.

```
I found your existing platform context. Here's what's currently documented:

**Identity & Access**: [current content]
**Security Services**: [current content]
**Monitoring & Logging**: [current content]
**Platform Services Available**: [current content]

What would you like to update? You can modify any section, or say "looks good" to confirm everything is correct.
```

Wait for the user's response, then make changes. Ask "Anything else to update, or shall I save?" before proceeding to Step 5.

---

### Step 2b: Fresh Mode — Interactive Information Gathering

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to create a task list at the start with these high-priority items:
1. Identity & Access
2. Security Services
3. Monitoring & Logging
4. Platform Services Available

Ask one section at a time, wait for the response, then mark the task complete before moving to the next.

---

#### Section 1: Identity & Access

```
Let's start with identity and access management. Please answer:

1. **Azure AD / Entra ID**: Is Azure AD managed centrally by a platform team, or does your team manage it?
2. **Managed Identity**: Will your application use managed identities to authenticate to Azure services? (recommended)
3. **RBAC**: Does your organization use custom RBAC roles, or standard built-in roles?
4. **Service principals**: If the application needs service principals (e.g., for CI/CD), are these requested through a platform team or self-managed?
```

**Validation:**
- Managed identity question must be answered (yes/no/unknown)
- At minimum, confirm who manages Azure AD

---

#### Section 2: Security Services

```
Now let's capture the security services available to your application:

1. **Key Vault**: Is there a shared Key Vault managed by the platform team, or will you create a dedicated one? (e.g., kv-prod-shared-eastus2)
2. **Secrets management**: How are secrets (connection strings, API keys) expected to be stored and accessed?
3. **Certificates**: Who manages TLS certificates — your team, the platform team, or a third-party CA?
4. **Defender for Cloud**: Is Microsoft Defender for Cloud (formerly Security Center) enabled on the subscription?
```

**Validation:**
- Key Vault strategy must be clarified (shared vs. dedicated vs. TBD)
- Defender for Cloud status must be answered (even "unknown" is acceptable)

---

#### Section 3: Monitoring & Logging

```
Now let's cover monitoring and logging:

1. **Log Analytics Workspace**: Is there a centralized Log Analytics workspace the application should send logs to, or will you create a dedicated one?
2. **Application Insights**: Will you use Application Insights for application-level telemetry? Is there a shared instance or do you create your own?
3. **Diagnostic settings**: Does a platform policy automatically configure diagnostic settings, or does your application team set these up?
4. **Alerting**: Is alerting managed centrally (e.g., Azure Monitor alert rules provisioned by policy) or by your team?
```

**Validation:**
- Log Analytics workspace approach must be specified (centralized/dedicated/TBD)
- Application Insights usage must be confirmed or denied

---

#### Section 4: Platform Services Available

```
Finally, which of these platform-level Azure services are available and relevant to your application?

Please confirm which apply and whether they are managed by the platform team or your application team:
- **Azure Monitor**: Metrics, alerts, and dashboards
- **Azure Policy**: Are policies enforced on your subscription (e.g., allowed locations, required tags, mandatory diagnostics)?
- **Microsoft Defender for Cloud**: Security posture and threat protection
- **Azure Backup**: Is backup managed by the platform team for databases?
- **Azure Cost Management**: Are there budget alerts or cost policies on the subscription?
- **Azure Container Registry**: Is there a shared container registry, or will you create one?

List any additional platform services your organization provides.
```

**Validation:**
- Must get a clear answer for at least Azure Policy (enforced policies affect IaC design)

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

Once all four sections are complete and validated, create the markdown file with this **exact structure**:

```markdown
# Platform Context

## Identity & Access

[Azure AD management. Managed identity usage. RBAC approach. Service principal process.]

## Security Services

[Key Vault strategy (name if known). Secrets management approach. Certificate management. Defender for Cloud status.]

## Monitoring & Logging

[Log Analytics workspace (name if known). Application Insights approach. Diagnostic settings policy. Alerting ownership.]

## Platform Services Available

[List of available platform services with notes on whether platform team or application team manages them.]
```

**Formatting rules:**
- H1 (`#`) for the file title: exactly `# Platform Context`
- H2 (`##`) for each section
- Plain prose or short bullet lists per section
- No placeholder text in final output
- No trailing whitespace

---

### Step 5: Validation

Before saving:

- ✅ Exactly one H1: `# Platform Context`
- ✅ Four H2 sections present
- ✅ No section is empty
- ✅ No placeholder text remains
- ✅ All TodoWrite tasks marked complete
- ✅ Zero open items

---

### Step 6: Save File

**Target location:** `infra/context/platform-context.md`

**Pre-save checks:**
1. Verify directory `infra/context/` exists
2. If the directory does not exist, create it (including all parent directories) and continue.

**Error handling:**
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Created platform context successfully!

📄 File location: infra/context/platform-context.md

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Context section
   4. The platform context card should now show a blue border with a checkmark

You can now run /development-context to continue with the next step.
```

---

## Error Handling

### If codebase scanning fails:
- Fall back to questions without mentioning the failure

### If directory doesn't exist:
- Create the directory (including all parent directories) and continue

### If user is unsure about platform-managed services:
- Suggest marking items as "TBD — confirm with platform team" rather than leaving them blank
- Include the TBD note in the generated file

### If write fails:
- Show clear error with actionable advice

---

## Example Interaction

**Agent:** "Let's gather your platform context. I'll ask about four areas: identity & access, security services, monitoring & logging, and available platform services. Starting with identity — is Azure AD managed centrally by a platform team, or does your team manage it?"

**User:** "Centrally by the platform team. We use managed identities for app-to-service auth."

**Agent:** "And for RBAC — does your organization use custom roles or standard built-in roles?"

**User:** "Custom roles provisioned by the platform team."

[Conversation continues through all four sections]

**Agent:** "✅ Created platform context successfully!

📄 File location: infra/context/platform-context.md"

---

## Reference Files

- **Sample output**: `infra/context/platform-context.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ File created at `infra/context/platform-context.md`
- ✅ Content matches the required format exactly
- ✅ All four sections are populated with concrete information
- ✅ All TodoWrite tasks were used and completed
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
