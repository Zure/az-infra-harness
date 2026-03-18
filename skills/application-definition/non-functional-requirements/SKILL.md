---
name: non-functional-requirements
description: Capture scale, availability, security, and integrity requirements for infrastructure planning
---

## Purpose

This skill captures the non-functional requirements of the application for the Azure Infrastructure Prompt Kit. It generates `src/data/application-definition/non-functional-requirements.md` which is used to inform infrastructure sizing, availability targets, and security configuration.

The generated file will be displayed in the UI when the user runs `npm run dev` and navigates to the Application Definition section.

## When to Use

Run this skill when:

- Continuing from `/application-overview` to complete the application definition
- The non-functional requirements need to be defined or updated
- User explicitly runs `/non-functional-requirements`

## Critical Rule: Always Interact Before Writing

**You MUST interact with the user and wait for their responses before writing the output file.** Never generate the file silently based on what you read from the filesystem or codebase alone.

There are two modes depending on whether a file already exists:

- **File exists** → Read it, present the current values to the user section by section, and ask what they want to change or confirm. Only update sections the user explicitly addresses.
- **File does not exist** → Ask all questions fresh. Use codebase hints as context, but the user must answer each section.

---

## Workflow

### Step 1: Check for Existing File

Check whether `src/data/application-definition/non-functional-requirements.md` already exists and has content.

**If the file exists and has content → follow the "Update Mode" workflow (Step 2a).**

**If the file does not exist or is empty → follow the "Fresh Mode" workflow (Step 2b).**

---

### Step 2a: Update Mode (File Already Exists)

Read the existing file and present its current contents to the user, section by section. Ask what they want to change.

```
I found your existing non-functional requirements. Here's what's currently captured:

**Scale**
- Expected Users: [current value]
- Concurrent Users: [current value]
- Growth: [current value]
- Data Volume: [current value]

**Availability**
- Target Uptime: [current value]
- Maintenance Windows: [current value]
- Critical Period: [current value]

**Security & Confidentiality**
- Data Sensitivity: [current value]
- Compliance: [current value]
- Authentication: [current value]
- Data at Rest: [current value]
- Data in Transit: [current value]

**Integrity**
- Backup Frequency: [current value]
- RTO: [current value]
- RPO: [current value]
- Data Consistency: [current value]

**Usage Patterns**
- Traffic Type: [current value]
- Peak Times: [current value]
- Seasonal Variance: [current value]
- Geographic Distribution: [current value]

What would you like to update? You can tell me which section(s) to change, or say "all" to go through everything again from scratch.
```

Wait for the user's response. Then:

- If the user specifies sections to change, ask only those questions (using the format from Step 2b below)
- If the user says "all" or "everything", run the full fresh-mode Q&A
- If the user says the data looks good or confirms it, ask: "Is there anything else you'd like to adjust before I save?" — if not, proceed to Step 3

---

### Step 2b: Fresh Mode (No Existing File) — Interactive Information Gathering

**Ask each section and STOP to wait for the user's answer before continuing to the next section.**

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

All five sections (Scale, Availability, Security & Confidentiality, Integrity, Usage Patterns) must be fully answered before proceeding to Step 3.

Before asking questions, optionally scan the codebase for hints:

**Files to scan (for context hints only):**

1. `README.md` — may mention scale, compliance, or SLA requirements
2. Configuration files (`.env.example`, `docker-compose.yml`, `kubernetes/`, `helm/`) — may reveal scaling setup
3. CI/CD files (`.github/`, `azure-pipelines.yml`) — may reveal environment tiers
4. `docs/` or `documentation/` — may contain architecture or SLA documentation

If you find relevant hints, surface them naturally as part of the question (e.g., "I noticed a GDPR mention in your README — what compliance requirements apply?"). Do not present all hints upfront as a block.

Ask questions **one section at a time**. Present all questions for a section together, then wait for the user's response before moving to the next.

---

#### Section 1: Scale

Ask:

```
Let's start with scale. I need a few numbers to understand the size of your application:

1. How many registered (total) users do you expect?
2. How many daily active users on a typical day?
3. How many concurrent users at peak?
4. What year-over-year growth rate do you expect? (e.g., 30%)
5. What is the current data volume, and where do you expect it in 2 years?
```

**Guidelines:**

- All five fields are required
- Users can give approximate ranges (e.g., "around 50,000")
- Growth rate can be a percentage or a descriptive answer ("doubling every year")
- Data volume can be in MB, GB, or TB

**Validation:**

- Must not be empty
- Numbers must be plausible (not negative, not astronomically large without context)

---

#### Section 2: Availability

Ask:

```
Now, availability. Help me understand your uptime needs:

1. What is your target uptime? (e.g., 99.5%, 99.9%, "four nines")
2. When are acceptable maintenance windows? (e.g., "weekends 2-6 AM")
3. What are your most critical business hours? (e.g., "Monday-Friday 8 AM - 6 PM EST")
```

**Guidelines:**

- Uptime can be expressed as a percentage or SLA tier
- If the user says "high availability", ask them to be specific — "99.9% or more?"
- Maintenance windows and critical periods help size DR and deployment strategies

**Validation:**

- Must not be empty
- Uptime percentage should be between 95% and 99.999%

---

#### Section 3: Security & Confidentiality

Ask:

```
Let's cover security and confidentiality:

1. What types of sensitive data does your application handle? (e.g., PII, payment data, health records)
2. Are there any compliance requirements? (e.g., GDPR, HIPAA, CCPA, SOC 2, PCI-DSS — or "none")
3. What are your authentication requirements? (e.g., MFA, SSO, username/password only)
4. Is encryption required for data at rest?
5. What TLS version or transport security is required?
```

**Guidelines:**

- Compliance can be "none" or "not yet determined" — both are valid answers
- Sensitive data types help determine what Azure services are appropriate
- Authentication requirements inform identity provider choices

**Validation:**

- Data sensitivity and authentication fields must not be empty
- Compliance can explicitly be "none"

---

#### Section 4: Integrity

Ask:

```
Now let's talk about data integrity and recovery:

1. How frequently should backups run? (e.g., daily, hourly)
2. What is your Recovery Time Objective (RTO)? — the maximum acceptable downtime after a failure
3. What is your Recovery Point Objective (RPO)? — the maximum acceptable data loss (e.g., "up to 24 hours of data")
4. What data consistency model is acceptable? (e.g., strong consistency, eventually consistent)
```

**Guidelines:**

- RTO and RPO are often not well-known by users — offer examples: "For RTO: 4 hours means you can be down for up to 4 hours after a failure before it's a problem."
- If the user doesn't know, suggest conservative defaults: RTO 4h, RPO 24h
- Data consistency helps choose the right Azure database services

**Validation:**

- RTO and RPO must be provided (even if "not defined yet")
- Backup frequency must not be empty

---

#### Section 5: Usage Patterns

Ask:

```
Finally, some questions about usage patterns:

1. What type of traffic does your application receive? (e.g., steady baseline, bursty, batch jobs)
2. When are traffic peaks? (e.g., Monday mornings, after marketing emails)
3. Are there seasonal variations? (e.g., holiday season spikes)
4. Where are your users geographically located? (e.g., 80% North America, global)
```

**Guidelines:**

- Traffic type helps choose between autoscaling approaches
- Geographic distribution informs multi-region vs. single-region decisions
- Seasonal patterns help with pre-scaling strategies

**Validation:**

- Traffic type and geographic distribution must not be empty
- Seasonal variance can be "none"

---

### Step 3: Generate Content

**Only proceed here after the user has interacted and confirmed what they want written.** In update mode this means they've reviewed the current values and confirmed changes. In fresh mode this means all five sections have been answered.

Once all information is gathered and validated, create the markdown file with this **exact structure**:

```markdown
# Non-Functional Requirements

## Scale

- **Expected Users**: [total registered users, daily active users]
- **Concurrent Users**: [peak concurrent users]
- **Growth**: [year-over-year growth expectation]
- **Data Volume**: [current size and projected size]

## Availability

- **Target Uptime**: [percentage or SLA, with equivalent downtime if useful]
- **Maintenance Windows**: [when maintenance is acceptable]
- **Critical Period**: [when uptime is most important]

## Security & Confidentiality

- **Data Sensitivity**: [types of sensitive data handled]
- **Compliance**: [regulations: GDPR, HIPAA, etc. — or "None"]
- **Authentication**: [requirements: MFA, SSO, etc.]
- **Data at Rest**: [encryption requirements]
- **Data in Transit**: [TLS version, etc.]

## Integrity

- **Backup Frequency**: [schedule]
- **Recovery Time Objective (RTO)**: [maximum downtime]
- **Recovery Point Objective (RPO)**: [maximum data loss]
- **Data Consistency**: [requirements: strong, eventual, etc.]

## Usage Patterns

- **Traffic Type**: [steady, bursty, predictable, etc.]
- **Peak Times**: [when traffic is highest]
- **Seasonal Variance**: [holiday patterns, etc. — or "None"]
- **Geographic Distribution**: [where users are located]
```

**Important formatting rules:**

- H1 (`#`) for the file title: exactly `# Non-Functional Requirements`
- H2 (`##`) for each section: Scale, Availability, Security & Confidentiality, Integrity, Usage Patterns
- Unordered list (`-`) with bold labels (`**Label**:`) for each item
- No extra blank lines between list items
- One blank line between sections
- No trailing whitespace
- No placeholder text (e.g., `[total registered users]`) in the final output

---

### Step 4: Validation

Before saving, verify the generated content meets all requirements:

**Structure validation:**

- ✅ Exactly one H1 heading: `# Non-Functional Requirements`
- ✅ Five H2 sections: Scale, Availability, Security & Confidentiality, Integrity, Usage Patterns
- ✅ Scale section has 4 bullet points
- ✅ Availability section has 3 bullet points
- ✅ Security & Confidentiality section has 5 bullet points
- ✅ Integrity section has 4 bullet points
- ✅ Usage Patterns section has 4 bullet points
- ✅ No empty sections
- ✅ Proper markdown syntax

**Content validation:**

- ✅ No placeholder text remains (e.g., `[total registered users]`)
- ✅ All bold labels match the template format
- ✅ RTO and RPO are present and non-empty
- ✅ Uptime percentage is realistic

**If validation fails:**

- Show the specific validation error to the user
- Ask for corrected information for the failing section only
- Re-validate before proceeding

---

### Step 5: Save File

**Target location:** `src/data/application-definition/non-functional-requirements.md`

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

### Step 6: Confirm to User

After successful file creation, inform the user:

```
✅ Created non-functional requirements successfully!

📄 File location: src/data/application-definition/non-functional-requirements.md

🌐 To view in the UI:
   1. Ensure the development server is running: npm run dev
   2. Refresh your browser
   3. Navigate to the Application Definition section
   4. The non-functional requirements box should now show a blue border with a checkmark

You can now run /application-components to continue with the next step.
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

- **Action**: Show specific validation error with what was expected vs what was provided
- **Message**: "[Specific validation error]. Please provide corrected information."
- **Next step**: Ask for corrected information for that specific section only
- **Re-validate**: Always re-validate before saving

### If user doesn't know RTO/RPO:

- **Action**: Offer sensible defaults and explain the concepts
- **Message**: "If you're unsure, here are common defaults:
  - RTO: 4 hours (acceptable to be down for up to 4 hours)
  - RPO: 24 hours (acceptable to lose up to 1 day of data)

  Would you like to use these as starting values?"

---

## Example Interactions

### Fresh Mode (no existing file)

**Agent:** "I'll help you capture the non-functional requirements. Let me start with scale:

1. How many registered users do you expect in total?
2. How many are active on a typical day?
3. Peak concurrent users?
4. Expected year-over-year growth?
5. Current and projected data volume?"

**User:** "About 50,000 registered, 5,000 daily, 500 concurrent, 30% growth, 2GB now growing to 10GB"

**Agent:** "Got it. Now availability:

1. Target uptime? (e.g., 99.5%)
2. When can maintenance happen?
3. Most critical business hours?"

[Continues through Security & Confidentiality, Integrity, and Usage Patterns sections]

**Agent:** "Thank you! Let me generate the requirements file..."

---

### Update Mode (file already exists)

**Agent:** "I found your existing non-functional requirements. Here's what's currently captured:

**Scale**

- Expected Users: 50,000 registered users, ~5,000 daily active users
- Concurrent Users: Peak of 500 concurrent users during business hours
  ...

What would you like to update? You can tell me which section(s) to change, or say 'all' to go through everything again."

**User:** "The scale numbers have changed — we're now expecting 100,000 users and 10,000 daily active."

**Agent:** "Updated. Anything else you'd like to change, or shall I save the updated file?"

**User:** "That's it."

**Agent:** "✅ Updated non-functional requirements successfully!"

---

## Reference Files

- **Sample output**: See `src/data/application-definition/non-functional-requirements.md` for a complete example
- **Template reference**: See `src/data/application-definition/README.md` for format specification
- **Documentation**: See `DATA-STRUCTURE.md` for overall structure

---

## Tips for Best Results

1. **Scan codebase first**: Infrastructure configs and docs often reveal scale and compliance requirements
2. **Explain RTO/RPO**: Most users aren't familiar with these terms — always explain with examples
3. **Group questions by section**: Present all questions for a section together, not one at a time
4. **Accept approximate answers**: "around 50,000 users" is fine — the goal is planning, not precision
5. **Validate strictly**: The UI expects exact format — catch format errors before writing
6. **Guide next steps**: Suggest running `/application-components` next

---

## Success Criteria

The skill is successful when:

- ✅ File created at `src/data/application-definition/non-functional-requirements.md`
- ✅ Content matches the required format exactly
- ✅ All five sections are present and populated
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied

---
