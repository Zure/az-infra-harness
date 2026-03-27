---
name: application-overview
description: Generate high-level application overview with name, description, purpose, and key features
---

## Purpose

This skill creates a structured overview of the application for the Az Infra Harness. It generates `data/application-definition/application-overview.md` which serves as the foundation for infrastructure planning.

The generated file will be displayed in the UI when the user runs `npx @zureltd/az-infra-harness` and navigates to the Application Definition section.

## When to Use

Run this skill when:
- Starting a new infrastructure planning session
- The application overview needs to be defined or updated
- User explicitly runs `/application-overview`

## Workflow

### Step 1: Codebase Discovery (Optional but Recommended)

Before asking questions, scan the codebase to infer information about the application. This provides helpful context and reduces the number of questions the user needs to answer.

**Files to scan (in priority order):**
1. `README.md` (project root and subdirectories)
2. `package.json`, `composer.json`, `pom.xml`, `requirements.txt`, `Cargo.toml`, etc.
3. Documentation files in `docs/`, `documentation/`, or similar directories
4. About pages or configuration files that describe the project
5. `.git/config` for repository name/description

**Information to extract:**
- **Project name**: Look for titles in README, package name in manifests
- **Description**: Look for project descriptions, taglines, or "About" sections
- **Purpose**: Look for "Why", "Mission", "Goals" sections
- **Features**: Look for feature lists, capabilities, or "What does it do" sections
- **Technology stack**: Helps understand the type of application

**How to present findings:**

If you find useful information, present it to the user like this:

```
Based on scanning your codebase, I found the following information:

- **Project name**: Az Infra Harness
- **Inferred description**: [your inferred description based on README/docs]
- **Potential purpose**: [inferred business purpose]
- **Detected features**:
  1. [feature 1]
  2. [feature 2]
  3. [feature 3]
  ...

Is this information accurate? Would you like to use this as a starting point, or would you prefer to provide your own descriptions?
```

**If codebase scanning fails or provides limited info:**
- Don't mention the scanning attempt
- Proceed directly to interactive questions
- Inform user conversationally: "I'll help you create an application overview. Let me ask you a few questions about your application."

---

### Step 2: Interactive Information Gathering

Ask the following questions **one-by-one** in a conversational manner. If information was successfully inferred from the codebase, present it and ask for confirmation or refinement instead of asking from scratch.

This skill MUST comply with the shared Interaction & Validation Standard:
`.opencode/skills/_shared/interaction-validation-standard.md`

All required questions (Name, Description, Purpose, 5 Features) must be fully answered and validated before proceeding to Step 3.

#### Question 1: Application Name

**If found in codebase:**
```
I found that your application is called "[detected name]" - is this correct?
```

**If NOT found or user wants to change it:**
```
What is the name of your application?
```

**Guidelines:**
- Accept proper nouns (capitalized names)
- This will be used as the H1 heading in the output
- Should be concise (2-5 words ideally)

**Validation:**
- Must not be empty
- Should be a reasonable length (not a full sentence)

---

#### Question 2: Description (2-3 sentences)

**If inferred from codebase:**
```
Based on your documentation, here's a draft description:

"[Your drafted 2-3 sentence description]"

Does this accurately describe your application? Feel free to refine or replace it.
```

**If NOT inferred:**
```
Please provide a 2-3 sentence description of your application. This should explain:
- What the application does
- Who uses it
- How it helps them

For example: "A self-service customer portal that allows users to manage their accounts, view order history, track shipments, and access support resources. The portal integrates with existing backend systems and provides a modern, responsive web experience."
```

**Guidelines:**
- Must be 2-3 sentences (strictly enforced)
- Should answer: What? Who? How?
- Should be clear and concise
- Avoid marketing language - focus on functionality

**Validation:**
- Count periods/sentence endings
- Must have 2 or 3 sentences (not 1, not 4+)
- If incorrect count: "I need exactly 2-3 sentences for the description. You provided [N] sentences. Please adjust."

---

#### Question 3: Purpose (Business Problem)

**If inferred from codebase:**
```
Based on your documentation, it seems the purpose of your application is:

"[Inferred purpose]"

Is this accurate? What business problem does your application solve?
```

**If NOT inferred:**
```
What is the main business problem this application solves? Why does it exist?

Think about the value it provides or the pain point it addresses. For example: "Reduce support call volume by enabling customers to handle common tasks themselves while providing 24/7 access to account information."
```

**Guidelines:**
- Should be a clear, focused statement
- Should articulate business value or impact
- Can be 1-2 sentences
- Should answer "Why does this exist?"

**Validation:**
- Must not be empty
- Should be substantive (not just "to help users")

---

#### Question 4: Key Features (5 items)

**If features found in codebase:**
```
I found these potential features in your documentation:

1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
4. [Feature 4]
5. [Feature 5]

Are these accurate? Would you like to add, remove, or modify any features?
```

**If NOT found or fewer than 5 found:**
```
What are the 5 key features of your application?

These can be technical features or user-facing functionality. Please list exactly 5 features.

For example:
- Account management (profile, preferences, billing)
- Order history and tracking
- Support ticket creation and tracking
- Knowledge base and FAQ search
- Document download center
```

**Guidelines:**
- Must gather exactly 5 features
- Each should be concise (ideally 5-10 words)
- Can include technical and user-facing features
- Each feature can optionally have sub-details in parentheses

**Validation:**
- Must have exactly 5 items
- If more or fewer: "I need exactly 5 key features. You provided [N]. Please provide 5 features."
- Each feature must have content (not empty)

---

### Step 3: Generate Content

Once all information is gathered and validated, create the markdown file with this **exact structure**:

```markdown
# [Application Name]

## Description
[2-3 sentence description]

## Purpose
[Business purpose statement]

## Key Features
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]
- [Feature 5]
```

**Important formatting rules:**
- H1 (`#`) for application name - exactly one
- H2 (`##`) for sections: Description, Purpose, Key Features
- Unordered list (`-`) for features
- No extra blank lines between sections (one blank line is fine)
- No trailing whitespace

---

### Step 4: Validation

Before saving, verify the generated content meets all requirements:

**Structure validation:**
- ✅ Exactly one H1 heading (application name)
- ✅ Three H2 headings (Description, Purpose, Key Features)
- ✅ Description section has 2-3 sentences
- ✅ Purpose section has content (1-2 sentences)
- ✅ Key Features section has exactly 5 bullet points
- ✅ No empty sections
- ✅ Proper markdown syntax

**Content validation:**
- ✅ Application name is not empty
- ✅ Description answers: What? Who? How?
- ✅ Purpose articulates business value
- ✅ Each feature has meaningful content
- ✅ No placeholder text like "[Feature 1]" remains

**If validation fails:**
- Show the specific validation error to the user
- Ask for corrected information for the failing section
- Re-validate before proceeding

---

### Step 5: Save File

**Target location:** `data/application-definition/application-overview.md`

**Pre-save checks:**
1. Verify the directory exists: `data/application-definition/`
2. If directory doesn't exist, show error and stop (don't create the directory)

**Save process:**
1. Write the validated markdown content to the file
2. Verify the file was written successfully
3. Check the file is not empty
4. Check the file is readable

**Error handling:**
- If directory missing: "Error: Directory 'data/application-definition/' not found. Please ensure you're in the correct project directory."
- If write fails: "Error: Failed to write file. Please check file permissions and try again."
- If file empty after write: "Error: File was created but appears empty. Please try again."

---

### Step 6: Confirm to User

After successful file creation, inform the user with this message format:

```
✅ Created application overview successfully!

📄 File location: data/application-definition/application-overview.md

🌐 To view in the UI:
   1. Ensure the Az Infra Harness is running: `npx @zureltd/az-infra-harness`
   2. Refresh your browser
   3. Navigate to the Application Definition section
   4. The overview box should now show a blue border with a checkmark

You can now run /non-functional-requirements to continue with the next step.
```

---

## Error Handling

### If codebase scanning fails:
- **Action**: Gracefully fall back to questions without showing inferred context
- **Message**: Don't mention the scanning failure - just proceed with questions
- **Reasoning**: User doesn't need to know about internal process failures

### If directory doesn't exist:
- **Action**: Show clear error, do NOT create directory
- **Message**: "Error: Directory 'data/application-definition/' not found. Are you in the project root directory? This skill expects to be run from the az-infra-harness project root."
- **Reasoning**: Creating directories might put files in wrong location

### If file write fails:
- **Action**: Show clear error with actionable advice
- **Message**: "Error: Failed to write file. Possible causes:
  - Insufficient permissions
  - Disk full
  - File system is read-only
  
Please check permissions and try again."
- **Next step**: Start over (clean slate approach)

### If validation fails:
- **Action**: Show specific validation error with what was expected vs what was provided
- **Message**: "[Specific validation error]. Please provide corrected information."
- **Next step**: Ask for corrected information for that specific field only
- **Re-validate**: Always re-validate before saving

### If user provides unclear or incomplete information:
- **Action**: Ask clarifying questions politely
- **Message**: "I need a bit more detail about [specific aspect]. Could you elaborate on [what you need]?"
- **Reasoning**: Better to ask than to generate low-quality output

---

## Example Interaction

**Agent:** "I'll help you create an application overview for your infrastructure planning. Let me scan your codebase first to see what I can learn about your application..."

[Scanning happens]

**Agent:** "Based on scanning your codebase, I found:
- Project name: Az Infra Harness
- Description: An interactive planning tool for Azure infrastructure
- Features related to application definition, architecture, and deployment

Is this information accurate? I'll use this as a starting point and ask a few clarifying questions."

**User:** "Yes, that's correct!"

**Agent:** "Great! Let me refine the description. Your application helps teams plan Azure infrastructure. Could you describe in 2-3 sentences what it does and who uses it?"

[User provides description]

**Agent:** "Perfect. Now, what business problem does this solve? Why does this application exist?"

[User provides purpose]

**Agent:** "Excellent. Finally, what are the 5 key features of the Az Infra Harness?"

[User provides 5 features]

**Agent:** "Thank you! Let me create the application overview file..."

[Validation and file creation]

**Agent:** "✅ Created application overview successfully!

📄 File location: data/application-definition/application-overview.md

🌐 Refresh your browser to see the content in the UI."

---

## Reference Files

- **Sample output**: See `data/application-definition/application-overview.md` for a complete example
- **Template reference**: See `data/application-definition/README.md` for format specification
- **Documentation**: See `DATA-STRUCTURE.md` for overall structure

---

## Tips for Best Results

1. **Use codebase scanning**: It provides valuable context and reduces user effort
2. **Be conversational**: Don't just ask questions mechanically - engage with the user
3. **Show what you found**: When presenting inferred info, show confidence in findings but allow user to refine
4. **Validate strictly**: The UI expects exact format - better to catch errors early
5. **Provide clear feedback**: Always confirm successful creation with file path
6. **Guide next steps**: Suggest running `/non-functional-requirements` next

---

## Success Criteria

The skill is successful when:
- ✅ File created at `data/application-definition/application-overview.md`
- ✅ Content matches the required format exactly
- ✅ All validation rules pass
- ✅ File is not empty and is readable
- ✅ User is informed of successful creation
- ✅ UI displays the content with blue border after browser refresh
- ✅ All interaction requirements defined in the Interaction & Validation Standard were satisfied
