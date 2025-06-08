# Global Background System Usage Guide

The global background system provides consistent warm cream backgrounds with gradients across all pages and sections, based on the hero section design.

## Available Components

### 1. `GlobalBackground` (Main Component)
The core component with customizable variants:

```tsx
import { GlobalBackground } from '@/components/layout/GlobalBackground'

<GlobalBackground variant="enhanced" interactive>
  {/* Your content */}
</GlobalBackground>
```

**Props:**
- `variant`: `'base' | 'enhanced' | 'hero' | 'section'`
- `interactive`: `boolean` - Adds mouse-responsive layers
- `className`: `string` - Additional CSS classes
- `children`: `React.ReactNode` - Content to render

### 2. Pre-configured Variants

#### `PageBackground` - For main page layouts
```tsx
import { PageBackground } from '@/components/layout/GlobalBackground'

<PageBackground>
  <Header />
  <main>{/* page content */}</main>
  <Footer />
</PageBackground>
```

#### `HeroBackground` - For hero sections
```tsx
import { HeroBackground } from '@/components/layout/GlobalBackground'

<HeroBackground>
  {/* Hero content with interactive mouse effects */}
</HeroBackground>
```

#### `SectionBackground` - For individual sections
```tsx
import { SectionBackground } from '@/components/layout/GlobalBackground'

<SectionBackground>
  <VehicleShowcase />
</SectionBackground>
```

#### `BaseBackground` - For basic layouts
```tsx
import { BaseBackground } from '@/components/layout/GlobalBackground'

<BaseBackground>
  {/* Cards, modals, etc. */}
</BaseBackground>
```

## CSS Classes Available

The system also provides CSS classes for direct use:

- `.mint-background` - Base gradient background
- `.mint-background-enhanced` - Enhanced with subtle radial gradients
- `.mint-section` - Section-level background
- `.mint-hero-background` - Hero section background
- `.mint-background-layer-1` - Interactive layer 1
- `.mint-background-layer-2` - Interactive layer 2

## CSS Variables

Global CSS variables for consistent theming:

```css
:root {
  --background-primary: #FEF7ED;        /* Warm cream primary */
  --background-secondary: #FDF4E7;      /* Section backgrounds */
  --background-card: #FCF0E1;           /* Card backgrounds */
  
  --background-gradient-base: linear-gradient(135deg, #FEF7ED 0%, #FDF4E7 50%, #FCF0E1 100%);
  --background-gradient-subtle: /* Base + subtle radial gradients */;
  --background-gradient-enhanced: /* Base + enhanced radial gradients */;
}
```

## Usage Examples

### Complete Page Layout
```tsx
import { PageBackground, SectionBackground } from '@/components/layout/GlobalBackground'

export default function MyPage() {
  return (
    <PageBackground>
      <Header />
      
      <main>
        <HeroSection />
        
        <SectionBackground>
          <FeatureSection />
        </SectionBackground>
        
        <SectionBackground>
          <TestimonialsSection />
        </SectionBackground>
      </main>
      
      <SectionBackground>
        <Footer />
      </SectionBackground>
    </PageBackground>
  )
}
```

### Hero Section with Interactive Effects
```tsx
import { HeroBackground } from '@/components/layout/GlobalBackground'

export function HeroSection() {
  return (
    <HeroBackground className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1>Your Hero Content</h1>
        {/* Interactive mouse effects automatically included */}
      </div>
    </HeroBackground>
  )
}
```

### Custom Background Variant
```tsx
import { GlobalBackground } from '@/components/layout/GlobalBackground'

export function CustomSection() {
  return (
    <GlobalBackground 
      variant="enhanced" 
      interactive 
      className="py-20"
    >
      {/* Your content with enhanced background and mouse effects */}
    </GlobalBackground>
  )
}
```

## Background Variants Explained

1. **`base`** - Simple warm cream gradient
   - Use for: Basic layouts, cards, modals

2. **`enhanced`** - Base + subtle radial gradients
   - Use for: Main page layouts, content areas

3. **`section`** - Optimized for individual sections
   - Use for: Feature sections, testimonials, etc.

4. **`hero`** - Full hero-level background
   - Use for: Hero sections, landing areas

## Migration from Existing Pages

### Before:
```tsx
<div style={{ backgroundColor: '#FEF7ED' }}>
  <Header />
  <main>{/* content */}</main>
  <Footer />
</div>
```

### After:
```tsx
<PageBackground>
  <Header />
  <main>{/* content */}</main>
  <SectionBackground>
    <Footer />
  </SectionBackground>
</PageBackground>
```

## Performance Notes

- All backgrounds use CSS variables for consistent theming
- Interactive layers use GPU acceleration (`transform: translate3d(0,0,0)`)
- Reduced motion support built-in
- Optimized for 120fps animations

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful fallback to solid background color
- Backdrop-filter support for glassmorphism effects 