# Tailwind Color Configuration

## Color Choices

- **Primary:** `blue` — Used for buttons, links, key accents, active states
- **Secondary:** `cyan` — Used for completion indicators, secondary accents
- **Neutral:** `slate` — Used for backgrounds, text, borders

## Tailwind Classes

### Primary (Blue)

- Backgrounds: `bg-blue-50` through `bg-blue-900`
- Text: `text-blue-50` through `text-blue-900`
- Borders: `border-blue-50` through `border-blue-900`
- Dark mode: Use `dark:` prefix (e.g., `dark:bg-blue-500`)

### Secondary (Cyan)

- Backgrounds: `bg-cyan-50` through `bg-cyan-900`
- Text: `text-cyan-50` through `text-cyan-900`
- Borders: `border-cyan-50` through `border-cyan-900`

### Neutral (Slate)

- Backgrounds: `bg-slate-50` through `bg-slate-900`
- Text: `text-slate-50` through `text-slate-900`
- Borders: `border-slate-50` through `border-slate-900`

## Usage Examples

**Primary button:**
```html
<button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
  Click me
</button>
```

**Secondary badge:**
```html
<span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-400">
  Completed
</span>
```

**Neutral text:**
```html
<p className="text-slate-600 dark:text-slate-400">
  Description text
</p>
```

## Design Principles

- Use blue for primary actions and current state
- Use cyan for completion indicators and success states
- Use slate for all neutral UI (backgrounds, borders, text)
- Always provide dark mode variants with `dark:` prefix
- Maintain sufficient contrast for accessibility
