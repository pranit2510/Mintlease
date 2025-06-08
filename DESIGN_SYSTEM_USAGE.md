# Mint Lease v4 - Design System Usage Guide

This guide shows how to use the complete design system implementation across all pages.

## 🎯 Quick Start

### 1. Use the Design System Hook

```tsx
import { useDesignSystem } from '@/hooks/useDesignSystem'

function MyComponent() {
  const ds = useDesignSystem()
  
  return (
    <motion.div
      className={ds.buildCardClasses('luxury', 'lg')}
      {...ds.createCardAnimation('luxury')}
    >
      Content with full design system
    </motion.div>
  )
}
```

### 2. Use Page Wrappers for Consistency

```tsx
import { PageWrapper, FormPageWrapper, HeroPageWrapper } from '@/components/layout/PageWrapper'

// For hero pages
export default function HomePage() {
  return (
    <HeroPageWrapper title="Home" description="Welcome to Mint Lease">
      <YourContent />
    </HeroPageWrapper>
  )
}

// For form pages
export default function ContactPage() {
  return (
    <FormPageWrapper title="Contact" containerSize="narrow">
      <YourForm />
    </FormPageWrapper>
  )
}

// For content pages
export default function AboutPage() {
  return (
    <PageWrapper 
      title="About"
      animationVariant="staggerContainer"
      backgroundVariant="default"
    >
      <YourContent />
    </PageWrapper>
  )
}
```

## 🧩 Core Components

### Buttons

```tsx
import { Button } from '@/components/ui/Button'

// Luxury button with all design system features
<Button variant="primary" size="lg" loading={isLoading}>
  Get Started
</Button>

// All variants: primary, secondary, outline, ghost, luxury
// All sizes: sm, md, lg, xl
```

### Cards

```tsx
import { Card } from '@/components/ui/Card'

// Luxury card with 3D effects
<Card variant="luxury" shadow="lg" hover={true}>
  <YourContent />
</Card>

// Variants: default, luxury, glass, floating
// Shadows: sm, md, lg, luxury
```

### Input Fields

```tsx
import { Input } from '@/components/ui/Input'

// Luxury input with glassmorphism
<Input
  variant="luxury"
  label="Email Address"
  placeholder="Enter your email"
  icon={<MailIcon />}
  helperText="We'll never share your email"
/>

// Variants: default, luxury, glass
```

## 🎨 CSS Classes

### Layout Classes

```tsx
// Containers
className="container-luxury"     // Standard container (1280px)
className="container-wide"       // Wide container (1536px)  
className="container-narrow"     // Narrow container (1024px)

// Responsive grids
className="grid-responsive"      // 1->2->3 columns
className="grid-responsive-4"    // 1->2->3->4 columns
```

### Button Classes

```tsx
// Button variants
className="btn-primary btn-lg"
className="btn-secondary btn-md"
className="btn-outline btn-sm"
className="btn-luxury btn-xl"
```

### Card & Effect Classes

```tsx
// Card styles
className="luxury-card"          // Premium glass card
className="glass"                // Basic glassmorphism
className="glass-strong"         // Enhanced glassmorphism
className="card-3d"              // 3D depth card

// Shadow system
className="shadow-3d"            // Standard 3D shadow
className="shadow-3d-lg"         // Large 3D shadow
className="shadow-3d-hover"      // Hover state shadow
className="shadow-luxury"        // Luxury multi-layer shadow
```

### Typography Classes

```tsx
// Luxury typography
className="heading-luxury"           // Gradient heading text
className="text-shadow-luxury"       // Luxury text shadow
className="text-shadow-luxury-emerald" // Emerald-themed shadow
className="gradient-text"            // Gradient text effect
className="text-float"              // Floating animation
className="text-hover-lift"         // Hover lift effect
```

### Animation Classes

```tsx
// Floating animations
className="floating"             // Gentle float (6s)
className="floating-3d"          // 3D floating effect
className="pulse-glow"           // Pulse with glow
className="pulse-3d"             // 3D pulse effect

// Spring transitions
className="spring-ultra-smooth"   // Ultra-smooth transitions
className="spring-bouncy"         // Bouncy transitions
className="spring-floating"       // Floating transitions

// Performance
className="transform-gpu"         // GPU acceleration
className="will-change-transform" // Optimized animations
```

## 🎭 Framer Motion Patterns

### Page Animations

```tsx
import { useDesignSystem } from '@/hooks/useDesignSystem'

function MyPage() {
  const ds = useDesignSystem()
  
  return (
    <motion.div
      variants={ds.animations.staggerContainer}
      initial="initial"
      animate="animate"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={ds.animations.staggerItem}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Button Interactions

```tsx
function InteractiveButton() {
  const ds = useDesignSystem()
  
  return (
    <motion.button
      className={ds.buildButtonClasses('primary', 'lg')}
      {...ds.createButtonAnimation('primary')}
    >
      Interactive Button
    </motion.button>
  )
}
```

### Card Interactions

```tsx
function InteractiveCard() {
  const ds = useDesignSystem()
  
  return (
    <motion.div
      className={ds.buildCardClasses('luxury', 'lg')}
      {...ds.createCardAnimation('luxury')}
    >
      Luxury Interactive Card
    </motion.div>
  )
}
```

### Staggered Lists

```tsx
function StaggeredList({ items }: { items: any[] }) {
  const ds = useDesignSystem()
  const staggerAnimation = ds.createStaggeredListAnimation(0.1)
  
  return (
    <motion.div
      variants={staggerAnimation.container}
      initial="initial"
      animate="animate"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={staggerAnimation.item}
          className={ds.buildCardClasses('default', 'md')}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## 🎨 Color System

```tsx
import { useDesignSystem } from '@/hooks/useDesignSystem'

function MyComponent() {
  const ds = useDesignSystem()
  
  // Access theme colors
  const emeraldColor = ds.colors.primary.emerald      // #047857
  const goldColor = ds.colors.luxury.goldPrimary      // #f59e0b
  const neutralColor = ds.colors.neutral[800]         // #262626
}
```

## 📱 Responsive Design

All design system elements are mobile-first and responsive:

```tsx
// Responsive containers automatically adjust
<div className="container-luxury">
  {/* 1rem padding on mobile, 1.5rem on tablet, 2rem on desktop */}
</div>

// Responsive grids
<div className="grid-responsive">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>

// Button scaling
<Button size="lg">
  {/* Automatically scales touch targets for mobile */}
</Button>
```

## ♿ Accessibility

The design system includes built-in accessibility features:

```tsx
// Focus indicators
className="focus-luxury"         // Emerald focus rings

// Reduced motion support (automatic)
const ds = useDesignSystem()
if (ds.shouldReduceMotion) {
  // Animations are automatically disabled
}

// Form accessibility
<Input
  label="Email"                  // Proper labeling
  helperText="Required field"    // Helper text
  error="Invalid email"          // Error states
/>
```

## 🚀 Performance

The design system is optimized for 120fps animations:

```tsx
// GPU acceleration (automatic)
className="transform-gpu will-change-transform"

// Optimized spring configurations
const ds = useDesignSystem()
const spring = ds.springConfigs.ultraSmooth  // 120fps optimized

// Performance-aware animations
motion.div({
  transition: { type: "spring", ...ds.springConfigs.ultraSmooth }
})
```

## 📋 Complete Page Example

```tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useDesignSystem } from '@/hooks/useDesignSystem'

export default function ExamplePage() {
  const ds = useDesignSystem()
  
  return (
    <PageWrapper
      title="Example Page"
      description="Complete design system example"
      animationVariant="staggerContainer"
      backgroundVariant="luxury"
    >
      {/* Hero Section */}
      <motion.section
        variants={ds.animations.hero}
        className="text-center py-20"
      >
        <h1 className="heading-luxury text-5xl mb-6">
          Design System Example
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Complete implementation with all features
        </p>
        <Button variant="primary" size="xl">
          Get Started
        </Button>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        variants={ds.animations.staggerContainer}
        className="grid-responsive py-16"
      >
        {[1, 2, 3].map((item) => (
          <motion.div key={item} variants={ds.animations.staggerItem}>
            <Card variant="luxury" shadow="lg">
              <h3 className="text-xl font-bold mb-4">Feature {item}</h3>
              <p className="text-neutral-600">
                Complete design system implementation
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={ds.animations.fadeInUp}
        className="max-w-md mx-auto py-16"
      >
        <Card variant="glass" shadow="lg">
          <form className="space-y-6">
            <Input
              variant="luxury"
              label="Name"
              placeholder="Enter your name"
            />
            <Input
              variant="luxury"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Button variant="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Card>
      </motion.section>
    </PageWrapper>
  )
}
```

## 🎯 Best Practices

1. **Always use the design system hook** for consistency
2. **Use PageWrapper** for consistent layouts and animations
3. **Prefer design system components** over custom implementations
4. **Use CSS classes** for simple styling, components for complex interactions
5. **Test on mobile devices** - everything is mobile-first
6. **Respect reduced motion** preferences (automatic)
7. **Use semantic HTML** with design system styling

## 🔧 Customization

To extend the design system:

1. Add new variants to existing components
2. Create new utility classes in `globals.css`
3. Add new animation patterns to `design-system.ts`
4. Update the hook with new utilities

The design system is fully extensible while maintaining consistency across all pages. 