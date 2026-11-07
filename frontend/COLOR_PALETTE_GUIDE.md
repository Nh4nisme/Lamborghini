# Lamborghini Color Palette & Usage Guide

## Brand Colors

### Primary Colors
```css
Primary:   #D8A016  (rgb: 216, 160, 22)  - Main brand gold
Hover:     #F9CE5C  (rgb: 249, 206, 92)  - Lighter gold for hover states
Pressed:   #9F6B08  (rgb: 159, 107, 8)   - Darker gold for pressed/active states
```

### Secondary Colors
```css
Secondary: #F7DE9F  (rgb: 247, 222, 159) - Light gold for accents
Tertiary:  #282928  (rgb: 40, 41, 40)    - Dark gray for disabled/tertiary elements
```

### Background Colors
```css
Bold Black: #040404 (rgb: 4, 4, 4)       - Main background (darker than pure black)
Dark:       #070707 (rgb: 7, 7, 7)       - Alternative dark background
Dark Light: #0a0a0a (rgb: 10, 10, 10)    - Card/section backgrounds
```

## Tailwind CSS Classes

### Background Colors
```tsx
bg-lambo-primary        // #D8A016
bg-lambo-hover          // #F9CE5C
bg-lambo-pressed        // #9F6B08
bg-lambo-secondary      // #F7DE9F
bg-lambo-tertiary       // #282928
bg-lambo-disabled       // #282928
bg-lambo-bold-black     // #040404
bg-lambo-dark           // #070707
bg-lambo-dark-light     // #0a0a0a
```

### Text Colors
```tsx
text-lambo-primary
text-lambo-hover
text-lambo-pressed
text-lambo-secondary
text-lambo-tertiary
text-lambo-bold-black
```

### Border Colors
```tsx
border-lambo-primary
border-lambo-hover
border-lambo-pressed
border-lambo-secondary
```

## Button State Examples

### Primary Button (Gold)
```tsx
// Default state
<button className="bg-lambo-primary text-lambo-bold-black">
  Click Me
</button>

// With hover
<button className="bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black">
  Click Me
</button>

// With all states
<button className="bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black transition-all duration-300">
  Click Me
</button>
```

### Secondary Button (Outline)
```tsx
// White outline
<button className="border-2 border-white hover:bg-white text-white hover:text-lambo-bold-black">
  Click Me
</button>

// Gold outline
<button className="border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black">
  Click Me
</button>
```

### Disabled Button
```tsx
<button 
  disabled 
  className="bg-lambo-disabled text-gray-600 cursor-not-allowed opacity-50"
>
  Disabled
</button>
```

## Card & Component States

### Card with Hover Effects
```tsx
<div className="bg-lambo-dark-light border border-[#1a1a1a] hover:border-lambo-primary/50 transition-all duration-500">
  {/* Card content */}
</div>
```

### Accent Line (Bottom Border)
```tsx
<div className="relative group">
  {/* Content */}
  <div className="absolute bottom-0 left-0 w-0 h-1 bg-lambo-primary group-hover:w-full transition-all duration-500" />
</div>
```

### Loading Spinner
```tsx
<div className="inline-block w-12 h-12 border-4 border-lambo-primary border-t-transparent rounded-full animate-spin" />
```

## Color Usage Guidelines

### When to Use Primary (#D8A016)
- Main CTA buttons
- Brand elements
- Active navigation items
- Icons and decorative elements
- Accent lines and borders
- Loading indicators

### When to Use Hover (#F9CE5C)
- Button hover states
- Interactive element highlights
- Focus states
- Scrollbar hover

### When to Use Pressed (#9F6B08)
- Active/pressed button states
- Selected items (when darker emphasis needed)
- Focus rings (alternative to hover)

### When to Use Secondary (#F7DE9F)
- Subtle highlights
- Badge backgrounds
- Light text on dark backgrounds
- Alternative accent color

### When to Use Tertiary (#282928)
- Disabled states
- Inactive elements
- Subtle backgrounds
- Muted borders

### When to Use Bold Black (#040404)
- Main page background
- Large content areas
- Text on light backgrounds
- High contrast sections

## Accessibility Notes

### Contrast Ratios
- Primary (#D8A016) on Bold Black (#040404): ✓ WCAG AA
- Secondary (#F7DE9F) on Bold Black (#040404): ✓ WCAG AA
- White (#FFFFFF) on Bold Black (#040404): ✓ WCAG AAA

### Color Blindness Considerations
- Primary gold (#D8A016) is distinguishable from backgrounds in most color blindness types
- Always pair color with icons or text for important information
- Don't rely solely on color to convey state

## Migration from Old Colors

### Color Mapping
```
Old                 →  New
#d4af37 (old gold)  →  #D8A016 (lambo-primary)
#e6be43 (old hover) →  #F9CE5C (lambo-hover)
#c5a045 (old dark)  →  #9F6B08 (lambo-pressed)
#070707 (old bg)    →  #040404 (lambo-bold-black)
```

### Update Pattern
```tsx
// Before
className="bg-[#d4af37] hover:bg-[#e6be43]"

// After
className="bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed"
```

## Design System Integration

### Tailwind Config
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      lambo: {
        primary: '#D8A016',
        secondary: '#F7DE9F',
        tertiary: '#282928',
        hover: '#F9CE5C',
        pressed: '#9F6B08',
        disabled: '#282928',
        'bold-black': '#040404',
        dark: '#070707',
        'dark-light': '#0a0a0a',
      }
    }
  }
}
```

### CSS Variables (Optional)
```css
:root {
  --color-lambo-primary: #D8A016;
  --color-lambo-hover: #F9CE5C;
  --color-lambo-pressed: #9F6B08;
  --color-lambo-secondary: #F7DE9F;
  --color-lambo-tertiary: #282928;
  --color-lambo-disabled: #282928;
  --color-lambo-bold-black: #040404;
}
```

## Common Patterns

### Navigation Link
```tsx
<Link 
  className="text-[#c4c4c4] hover:text-lambo-primary transition-colors"
  to="/path"
>
  Link Text
</Link>
```

### Active Navigation
```tsx
<Link 
  className={pathname === '/path' ? 'text-lambo-primary' : 'text-[#c4c4c4] hover:text-lambo-primary'}
  to="/path"
>
  Link Text
</Link>
```

### Icon Button
```tsx
<button className="p-2 text-[#a3a3a3] hover:text-lambo-primary transition-colors">
  <Icon className="w-5 h-5" />
</button>
```

### Badge
```tsx
<span className="bg-lambo-primary text-lambo-bold-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
  New
</span>
```

### Input Focus Ring
```tsx
<input className="focus:ring-2 focus:ring-lambo-primary focus:border-lambo-primary" />
```

## Testing Checklist

- [ ] All buttons have proper hover states (lambo-hover)
- [ ] Active/pressed states use lambo-pressed
- [ ] Disabled states use lambo-disabled with reduced opacity
- [ ] Background uses lambo-bold-black (#040404)
- [ ] Text has sufficient contrast (WCAG AA minimum)
- [ ] Loading indicators use lambo-primary
- [ ] Navigation active states use lambo-primary
- [ ] Cards hover effects use lambo-primary with opacity
- [ ] Border hover states transition smoothly
- [ ] Dark mode is default (no light mode toggle needed)

## Browser Compatibility

All colors work in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Tailwind purges unused color classes in production
- Use Tailwind classes over inline styles for better caching
- Avoid CSS-in-JS for colors (use Tailwind utilities)
- Color transitions are GPU-accelerated (use `transition-colors`)
