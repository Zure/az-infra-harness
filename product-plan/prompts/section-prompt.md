# Section Implementation Prompt Template

## Define Section Variables

Before using this prompt, replace these variables:
- **SECTION_NAME** = Shell
- **SECTION_ID** = 01-shell
- **NN** = 01

---

I need you to implement the **SECTION_NAME** section of an application based on detailed UI designs and specifications.

## Context

This is part of a larger application. The shell (navigation and layout) is already implemented. I need you to build this specific section and integrate it with the existing application.

## Instructions

Please carefully read and analyze:
1. **@product-plan/product-overview.md** - Product context, entities, design tokens
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** - Detailed implementation instructions for this section

## Before You Start

Ask me clarifying questions about:
- **Current project structure** - Where should I place the new section files?
- **Routing** - How is routing configured? What path should this section use?
- **State management** - How are you managing state? Do I need to integrate with existing state?
- **Data fetching** - Should I use mock data or integrate with APIs?
- **Testing setup** - What testing framework are you using?
- **Existing conventions** - Any naming conventions or patterns I should follow?

## Your Task

After gathering requirements, implement the **SECTION_NAME** section following the instructions in `instructions/incremental/NN-SECTION_ID.md`. This includes:

1. **Review components** - Examine the pre-built components in `@product-plan/sections/SECTION_ID/components/`
2. **Integrate components** - Add them to your project structure
3. **Set up routing** - Create the route for this section
4. **Connect data** - Wire up the components with appropriate data (mock or real)
5. **Test functionality** - Implement tests based on `@product-plan/sections/SECTION_ID/tests.md`
6. **Verify integration** - Ensure navigation from shell works correctly

## Key Principles

- **Props-based components** - Components receive data via props (see `@product-plan/sections/SECTION_ID/types.ts`)
- **Mobile responsive** - UI adapts to different screen sizes
- **Light & dark mode** - All UI elements work in both themes
- **Design tokens** - Uses the established color palette and typography
- **No duplicate navigation** - Section components don't include nav chrome (shell handles it)
- **Follow existing patterns** - Match the coding style and architecture of the shell

## Resources Available

- `@product-plan/product-overview.md` - Product context
- `@product-plan/instructions/incremental/NN-SECTION_ID.md` - Section implementation guide
- `@product-plan/sections/SECTION_ID/README.md` - Section overview
- `@product-plan/sections/SECTION_ID/components/` - React components
- `@product-plan/sections/SECTION_ID/types.ts` - TypeScript interfaces
- `@product-plan/sections/SECTION_ID/sample-data.json` - Sample data for testing
- `@product-plan/sections/SECTION_ID/tests.md` - Test specifications

## Expected Output

A fully integrated section that:
- Matches the UI designs provided
- Implements all specified functionality
- Passes all tests defined in `tests.md`
- Integrates seamlessly with the existing shell
- Works on mobile and desktop
- Supports light and dark themes

## Getting Started

Please start by:
1. Reading `@product-plan/product-overview.md` to understand the product
2. Asking me the clarifying questions listed above
3. Reading `@product-plan/instructions/incremental/NN-SECTION_ID.md` for detailed steps
4. Examining the components in `@product-plan/sections/SECTION_ID/`
5. Creating a task list for this section implementation
6. Beginning implementation

Ready when you are!
