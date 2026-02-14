# Azure Infra Prompt Kit - UI Design Handoff Package

This package contains everything you need to implement the Azure Infra Prompt Kit user interface based on the completed design specifications.

## What's Inside

```
product-plan/
├── README.md                      # This file
├── product-overview.md            # Product context and overview
├── prompts/                       # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md         # Prompt for full implementation
│   └── section-prompt.md          # Template for incremental implementation
├── instructions/                  # Detailed implementation guides
│   ├── one-shot-instructions.md   # All milestones combined
│   └── incremental/               # Step-by-step milestone guides
│       ├── 01-shell.md
│       ├── 02-application-definition.md
│       ├── 03-context.md
│       ├── 04-application-architecture.md
│       ├── 05-architecture-decisions.md
│       └── 06-export.md
├── design-system/                 # Design tokens and styling
│   ├── tokens.css                 # CSS custom properties
│   ├── tailwind-colors.md         # Tailwind usage guide
│   └── fonts.md                   # Typography setup
├── data-shapes/                   # TypeScript interfaces
│   ├── README.md
│   └── overview.ts                # All UI data contracts
├── shell/                         # Application shell components
│   ├── README.md
│   └── components/
│       ├── AppShell.tsx
│       ├── Sidebar.tsx
│       ├── MainNav.tsx
│       └── index.ts
└── sections/                      # Feature sections (5 total)
    └── [section-name]/
        ├── README.md              # Section overview
        ├── tests.md               # Test specifications
        ├── types.ts               # TypeScript interfaces
        ├── sample-data.json       # Sample data
        └── components/            # React components
```

## Two Implementation Approaches

### Option 1: Incremental (Recommended)

Build the application step-by-step, milestone by milestone. This approach is better for learning the codebase and catching issues early.

**How to use:**
1. Start with `instructions/incremental/01-shell.md`
2. Implement the shell and verify it works
3. Move to each section (02-06) one at a time
4. Test each milestone before moving to the next

**Use the section prompt template:**
- Copy `prompts/section-prompt.md` for each section
- Replace the variables (SECTION_NAME, SECTION_ID, NN)
- Paste into your coding agent

### Option 2: One-Shot

Implement the entire application in a single session. Best for experienced developers or when using powerful coding agents.

**How to use:**
1. Copy the contents of `prompts/one-shot-prompt.md`
2. Paste into your coding agent
3. Answer the clarifying questions
4. Let the agent implement all milestones

## Quick Start

### For Incremental Implementation

1. **Set up your project**
   ```bash
   # Create your project with your preferred framework
   npx create-next-app@latest my-app
   # or
   npm create vite@latest my-app -- --template react-ts
   ```

2. **Install Tailwind CSS v4**
   ```bash
   npm install tailwindcss@next @tailwindcss/vite@next
   ```

3. **Copy the shell prompt**
   - Open `prompts/section-prompt.md`
   - Replace variables with shell values:
     - SECTION_NAME = "Application Shell"
     - SECTION_ID = "shell"
     - NN = "01"
   - Give it to your coding agent

4. **Implement remaining sections**
   - Repeat for sections 02-06
   - Test each section before moving on

### For One-Shot Implementation

1. **Copy the one-shot prompt**
   - Open `prompts/one-shot-prompt.md`
   - Copy the entire contents

2. **Give it to your coding agent**
   - Paste into Claude, ChatGPT, or your preferred AI
   - Answer the clarifying questions about tech stack

3. **Review and test**
   - The agent will implement everything
   - Test the full application
   - Make adjustments as needed

## Design System

**Colors:**
- Primary: Blue (`blue-600`)
- Secondary: Cyan (`cyan-500`)
- Neutral: Slate (`slate-50` to `slate-950`)

**Typography:**
- Headings & Body: Inter (Google Fonts)
- Code: JetBrains Mono (Google Fonts)

**Key Design Principles:**
- Mobile responsive (uses Tailwind breakpoints)
- Light & dark mode support
- Props-based components (no hard-coded data)
- No navigation in section components (shell handles it)

## Testing

Each section includes a `tests.md` file with framework-agnostic test specifications. These describe:
- What user interactions to test
- Expected behavior
- Edge cases to handle

Implement these tests using your preferred testing framework (Jest, Vitest, Playwright, etc.).

## Data Shapes

The `data-shapes/overview.ts` file contains all TypeScript interfaces that define what data the components expect. Use these as contracts between your data layer and UI components.

Components are designed to be flexible - they accept data via props and don't make assumptions about where that data comes from (API, mock data, state management, etc.).

## Tips for Success

1. **Read product-overview.md first** - Understand the product before diving into code
2. **Follow the milestones in order** - Each builds on the previous
3. **Use the sample data** - It's provided in each section for testing
4. **Check the types** - TypeScript interfaces define the data contracts
5. **Test as you go** - Verify each milestone works before moving on
6. **Adapt the components** - They're designed to be flexible for your chosen framework
7. **Ask questions** - The prompts are designed to start a conversation with your coding agent

## Component Architecture

All components follow these principles:

- **Props-based**: Receive all data via props
- **No hard-coded data**: Use sample data for development
- **No navigation**: Section components don't include shell/nav
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Theme-aware**: Support light and dark modes
- **TypeScript**: Fully typed with interfaces in `types.ts` files

## Need Help?

- Review the detailed instructions in `instructions/incremental/`
- Check section READMEs for component usage examples
- Refer to `data-shapes/overview.ts` for data structure
- Use the test specifications in `tests.md` files

## What This Package Doesn't Include

This is a **UI design handoff**. It includes screen designs, components, and user flows. It does NOT include:

- Backend implementation details
- Database schema or models
- API specifications
- Authentication/authorization logic
- Deployment configuration
- Business logic implementation

These decisions are left to you and your coding agent. The prompts encourage the agent to ask clarifying questions about these aspects.

## Summary

- **58 total files** in this package
- **13 React components** ready to integrate
- **5 feature sections** plus application shell
- **2 implementation approaches** (incremental or one-shot)
- **Complete design system** with colors and typography
- **TypeScript interfaces** for all data shapes
- **Test specifications** for all functionality

Ready to build? Start with `prompts/one-shot-prompt.md` or `prompts/section-prompt.md` and let your coding agent guide you through the implementation!
