# One-Shot Implementation Prompt

I need you to implement a complete web application based on detailed UI designs and specifications that I'll provide. This is a full implementation request covering all milestones from shell to individual sections.

## Instructions

Please carefully read and analyze:
1. **@product-plan/product-overview.md** - Product context, entities, design tokens
2. **@product-plan/instructions/one-shot-instructions.md** - Complete implementation instructions for all milestones

## Before You Start

Ask me clarifying questions about:
- **Tech stack preferences** - Which React framework? (Next.js, Vite, etc.)
- **Routing approach** - File-based routing? React Router?
- **State management** - Context? Zustand? Redux?
- **Backend integration** - Will this connect to APIs? Mock data for now?
- **Testing requirements** - Unit tests? Integration tests? E2E tests?
- **Build and deployment** - Any specific requirements?

## Your Task

After gathering requirements, implement the complete application following the instructions in `one-shot-instructions.md`. This includes:

1. **Project Setup** - Initialize the project with appropriate tooling
2. **Design System** - Set up design tokens from `@product-plan/design-system/`
3. **Shell** - Implement the application shell from `@product-plan/shell/`
4. **Sections** - Implement all sections from `@product-plan/sections/`
5. **Testing** - Implement tests based on `tests.md` in each section
6. **Documentation** - Update README with setup and usage instructions

## Key Principles

- **Props-based components** - All components receive data via props (refer to `@product-plan/data-shapes/overview.ts`)
- **Mobile responsive** - Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- **Light & dark mode** - Implement `dark:` variants for all UI elements
- **Design tokens** - Use the color palette and typography from the design system
- **No navigation in section screens** - The shell handles all navigation
- **Framework-agnostic designs** - Adapt the React components to your chosen framework

## Resources Available

- `@product-plan/product-overview.md` - Product context
- `@product-plan/instructions/one-shot-instructions.md` - Implementation guide
- `@product-plan/design-system/` - Design tokens and styling guides
- `@product-plan/data-shapes/` - TypeScript interfaces
- `@product-plan/shell/` - Shell components and README
- `@product-plan/sections/` - All section components, sample data, and tests

## Expected Output

A fully functional application that:
- Matches the UI designs provided
- Implements all specified functionality
- Passes all tests defined in `tests.md` files
- Works on mobile and desktop
- Supports light and dark themes
- Follows React and accessibility best practices

## Getting Started

Please start by:
1. Reading `@product-plan/product-overview.md` to understand the product
2. Asking me the clarifying questions listed above
3. Reading `@product-plan/instructions/one-shot-instructions.md` for detailed implementation steps
4. Creating a task list of all milestones you'll implement
5. Beginning implementation milestone by milestone

Ready when you are!
