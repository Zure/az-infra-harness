# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or import in your CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

## Font Usage

- **Headings:** Inter (weights: 600, 700)
- **Body text:** Inter (weights: 400, 500)
- **Code/technical:** JetBrains Mono (weights: 400, 500)

## Tailwind Configuration

If using Tailwind CSS, configure in your theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

## CSS Variables

If using CSS custom properties:

```css
:root {
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Usage Examples

**Heading:**
```html
<h1 className="font-sans font-bold">Application Definition</h1>
```

**Body:**
```html
<p className="font-sans font-normal">Define the core characteristics...</p>
```

**Code:**
```html
<code className="font-mono">/application-overview</code>
```
