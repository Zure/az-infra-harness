---
name: infrastructure-context
description: Gather network topology, landing zones, existing resources, and connectivity requirements for Azure infrastructure planning
---

## Purpose

This skill gathers information about the existing (or planned) Azure infrastructure context. It generates `infra/context/infrastructure-context.md` which serves as the foundation for infrastructure architecture decisions and IaC code generation.

The generated file will be displayed in the UI when the user runs `npx @zureltd/az-infra-harness` and navigates to the Context section.

## When to Use

Run this skill when:
- Starting the Context phase after completing Application Definition
- The infrastructure context needs to be defined or updated
- User explicitly runs `/infrastructure-context`

## Workflow

### Step 1: Codebase Discovery (Optional but Recommended)

Before asking questions, scan the codebase for any existing infrastructure definitions that might reveal context.

**Files to scan:**
1. `infra/context/infrastructure-context.md` — existing content (Update Mode trigger)
2. `bicep/`, `terraform/`, `infrastructure/` — VNet names, address spaces, hub/spoke patterns
3. `*.bicep`, `*.tf` — resource group names, location, subscription references
4. `README.md`, `docs/` — architecture or network diagrams described in text

**If existing file found with content → follow Update Mode (Step 2a).**
**If no existing file → follow Fresh Mode (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present the current content to the user.

```
I found your existing infrastructure context. Here's what's currently documented:

**Network Topology**: [current content]
**Landing Zone**: [current content]
**Existing Resources**: [current content]
**Connectivity Requirements**: [current content]

What would you like to update? You can modify any section, or say "looks good" to confirm everything is correct.
```

Wait for the user's response, then make the requested changes. Ask "Anything else to update, or shall I save?" before proceeding to Step 5.

---

### Step 1b: Azure CLI Discovery (Recommended)

If the Azure CLI (`az`) is available and the user is logged in, run discovery commands to pre-populate context automatically. This dramatically reduces the number of questions the user needs to answer.

**Check if logged in first:**
```bash
az account show --query "{subscription:name, id:id, tenantId:tenantId}" -o json 2>/dev/null
```

If logged in, run these discovery commands:

```bash
# Discover existing VNets and their address spaces
az network vnet list --query "[].{name:name, addressSpace:addressSpace.addressPrefixes[0], location:location, rg:resourceGroup, subnets:subnets[].{name:name, prefix:addressPrefix}}" -o json 2>/dev/null

# Check for hub-spoke pattern (look for VNet peerings)
az network vnet peering list --vnet-name <hub-vnet-name> --resource-group <hub-rg> --query "[].{name:name, remoteVnet:remoteVirtualNetwork.id, peeringState:peeringState}" -o json 2>/dev/null

# Discover ExpressRoute circuits
az network express-route list --query "[].{name:name, location:location, peeringLocation:peeringLocation, bandwidth:bandwidthInMbps, sku:sku.tier}" -o json 2>/dev/null

# Discover VPN Gateways
az network vnet-gateway list --resource-group <rg> --query "[].{name:name, type:vpnType, sku:sku.name}" -o json 2>/dev/null

# Discover NSGs
az network nsg list --query "[].{name:name, rg:resourceGroup, location:location, rules:securityRules[].{name:name, direction:direction, access:access}}" -o json 2>/dev/null

# Discover Route Tables (UDRs)
az network route-table list --query "[].{name:name, rg:resourceGroup, routes:routes[].{name:name, prefix:addressPrefix, nextHop:nextHopType}}" -o json 2>/dev/null

# Discover Private DNS Zones
az network private-dns zone list --query "[].{name:name, rg:resourceGroup}" -o json 2>/dev/null

# Discover Azure Firewall
az network firewall list --query "[].{name:name, location:location, rg:resourceGroup, sku:sku.tier}" -o json 2>/dev/null

# List resource groups to understand existing structure
az group list --query "[].{name:name, location:location, tags:tags}" -o json 2>/dev/null

# Check management group hierarchy
az account management-group list --query "[].{name:name, displayName:displayName}" -o json 2>/dev/null
```

**How to present findings:**

```
I've scanned your Azure subscription "[subscription name]" and found:

**Network Topology:**
- VNet: [vnet-name] (10.0.0.0/16) in [location] — with [N] subnets
- VNet: [spoke-vnet] (10.1.0.0/16) in [location] — peered to [hub-vnet]
- [ExpressRoute/VPN Gateway found or "No on-premises connectivity detected"]

**Existing Resources:**
- [N] NSGs, [N] Route Tables, [N] Private DNS Zones
- Azure Firewall: [found/not found]

**Landing Zone:**
- Subscription: [name] ([id])
- Management Group: [group name or "not detected"]
- Resource Groups: [list of relevant RGs]

Is this information accurate? I'll use this as a starting point — let me ask a few clarifying questions.
```

**If `az` is not available or not logged in:**
- Don't mention the scanning attempt
- Proceed directly to interactive questions
- Optionally suggest: "If you have Azure CLI available, logging in with `az login` would let me auto-discover your existing infrastructure."

---

### Step 2b: Fresh Mode — Interactive Information Gathering

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

Use the **TodoWrite** tool to create a task list at the start with these high-priority items:
1. Network Topology
2. Landing Zone
3. Existing Resources
4. Connectivity Requirements

Ask one section at a time, wait for the response, then mark the task complete before moving to the next.

---

#### Section 1: Network Topology

```
Let's start with your network topology. Which model best describes your Azure network design?

- **Hub-spoke**: A central hub VNet connected to spoke VNets via peering (most common for enterprise)
- **Virtual WAN**: Microsoft-managed hub with automated routing
- **Flat/single VNet**: All resources in one VNet (simpler, smaller deployments)
- **Greenfield**: No VNet exists yet — we'll design from scratch

Once you tell me the model, I'll ask about the specific VNet address spaces and spoke VNets.
```

**Follow-up questions based on response:**
- Hub VNet address space (e.g., 10.0.0.0/16)
- Spoke VNet address space(s) for this application
- Whether ExpressRoute or VPN Gateway is used for on-premises connectivity

**Validation:**
- Network model must be one of the recognized types
- Address spaces must look like valid CIDR notation if provided

---

#### Section 2: Landing Zone

```
Now let's capture your Azure landing zone setup. Please answer:

1. **Landing zone type**: Is this Enterprise-Scale (CAF), a custom landing zone, or no formal landing zone?
2. **Management group hierarchy**: What management group does this subscription sit under? (e.g., Corp → Landing Zones → Production)
3. **Subscription**: What is the subscription name or ID for this application?
4. **Naming conventions**: Does your organization have a naming convention for Azure resources? (e.g., rg-{app}-{env}-{region})
```

**Validation:**
- At minimum, subscription name must be provided
- If no formal landing zone, accept "none" or "custom"

---

#### Section 3: Existing Resources

```
What Azure resources already exist that this application will use or connect to?

Common examples:
- **VNets/Subnets**: Are the VNets already provisioned, or do we need to create them?
- **Private DNS Zones**: Are private DNS zones managed centrally by a platform team?
- **NSGs/Route Tables**: Are there existing NSGs or UDRs (User Defined Routes) the application must comply with?
- **Shared services**: Key Vault, Log Analytics workspace, Container Registry — are these shared resources?

If this is a greenfield deployment and no resources exist yet, please say so.
```

**Validation:**
- Must get a clear answer (even "greenfield — nothing exists yet" is valid)

---

#### Section 4: Connectivity Requirements

```
Finally, let's capture your connectivity requirements:

1. **Inbound traffic**: How does traffic reach your application? (e.g., via Application Gateway, Azure Front Door, public IP directly, private only)
2. **Outbound routing**: How does outbound internet traffic leave? (e.g., via Azure Firewall in hub, NAT Gateway, direct internet)
3. **On-premises connectivity**: Does this application need to reach on-premises systems? If so, via ExpressRoute, VPN, or not at all?
4. **Inter-service connectivity**: Should communication between components be private (private endpoints) or can it use public endpoints with service restrictions?
```

**Validation:**
- Inbound and outbound routing must be specified
- On-premises connectivity must be explicitly confirmed or denied

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
# Infrastructure Context

## Network Topology

[Network model description. Hub VNet address space. Spoke VNet details. Connectivity to hub.]

## Landing Zone

[Landing zone type. Management group path. Subscription name. Naming conventions.]

## Existing Resources

[VNets and subnets status. Private DNS management. NSGs and route tables. Shared resources.]

## Connectivity Requirements

[Inbound routing. Outbound routing. On-premises connectivity. Inter-service connectivity approach.]
```

**Formatting rules:**
- H1 (`#`) for the file title: exactly `# Infrastructure Context`
- H2 (`##`) for each section
- Plain prose paragraphs (no nested lists required, but acceptable)
- No placeholder text in final output
- No trailing whitespace

---

### Step 5: Validation

Before saving:

- ✅ Exactly one H1: `# Infrastructure Context`
- ✅ Four H2 sections present
- ✅ No section is empty
- ✅ No placeholder text remains (e.g., `[Network model]`)
- ✅ All TodoWrite tasks marked complete
- ✅ Zero open items

---

### Step 6: Save File

**Target location:** `infra/context/infrastructure-context.md`

**Pre-save checks:**
1. Verify directory `infra/context/` exists
2. If the directory does not exist, create it (including all parent directories) and continue.

**Error handling:**
- If write fails: "Error: Failed to write file. Please check file permissions and try again."

---

### Step 7: Confirm to User

```
✅ Created infrastructure context successfully!

📄 File location: infra/context/infrastructure-context.md

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Context section
   4. The infrastructure context card should now show a blue border with a checkmark

You can now run /platform-context to continue with the next step.
```

---

## Error Handling

### If codebase scanning fails:
- Fall back to questions without mentioning the failure

### If directory doesn't exist:
- Create the directory (including all parent directories) and continue

### If file write fails:
- Show clear error with actionable advice

### If user provides incomplete information:
- Ask clarifying questions: "I need a bit more detail about [aspect]. Could you clarify [what you need]?"

### If user says "greenfield" or "nothing exists":
- Accept this as valid for the Existing Resources section — document it explicitly

---

## Example Interaction

**Agent:** "Let's gather your infrastructure context. I'll ask about four areas: network topology, landing zone, existing resources, and connectivity. Let's start with your network topology — which model best describes your Azure network design?"

**User:** "Hub-spoke. Hub is 10.0.0.0/16, spoke will be 10.1.0.0/16."

**Agent:** "Got it. Does the hub use ExpressRoute or a VPN Gateway for on-premises connectivity?"

**User:** "ExpressRoute."

**Agent:** "Now let's capture your landing zone. Is this Enterprise-Scale CAF, a custom landing zone, or no formal landing zone?"

[Conversation continues through all four sections]

**Agent:** "✅ Created infrastructure context successfully!

📄 File location: infra/context/infrastructure-context.md"

---

## Reference Files

- **Sample output**: `infra/context/infrastructure-context.md`
- **Interaction standard**: `.opencode/skills/_shared/interaction-validation-standard.md`
- **Documentation**: `DATA-STRUCTURE.md`

---

## Success Criteria

- ✅ File created at `infra/context/infrastructure-context.md`
- ✅ Content matches the required format exactly
- ✅ All four sections are populated with concrete information
- ✅ All TodoWrite tasks were used and completed
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
