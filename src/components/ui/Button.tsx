'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

/**
 * Luxury Button Component with 2025 Glassmorphism Design
 * Features: Multiple variants, loading states, smooth animations
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  className,
  type = 'button',
  ...props
}) => {
  const baseClasses = cn(
    // Base styles
    'relative inline-flex items-center justify-center font-semibold',
    'transition-all duration-300 ease-luxury transform-gpu',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'overflow-hidden group',
    
    // Size variants
    {
      'px-3 py-1.5 text-sm rounded-lg': size === 'sm',
      'px-4 py-2 text-base rounded-xl': size === 'md',
      'px-6 py-3 text-lg rounded-xl': size === 'lg',
      'px-8 py-4 text-xl rounded-2xl': size === 'xl',
    },
    
    // Width variants
    {
      'w-full': fullWidth,
      'w-auto': !fullWidth,
    },
    
    className
  )

  // Variant-specific classes
  const variantClasses = cn({
    // Primary - Luxury Emerald Gradient
    'bg-gradient-emerald text-white shadow-luxury hover:shadow-glow focus:ring-primary-emerald-light': 
      variant === 'primary',
    
    // Secondary - Luxury Gold Gradient  
    'bg-gradient-luxury text-neutral-900 shadow-floating hover:shadow-glow-gold focus:ring-gold-primary': 
      variant === 'secondary',
    
    // Outline - Glass Border Effect
    'bg-glass border border-glass-border text-neutral-800 backdrop-blur-lg hover:bg-glass-strong hover:shadow-glass focus:ring-neutral-400': 
      variant === 'outline',
    
    // Ghost - Minimal Hover Effect
    'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:shadow-inner focus:ring-neutral-300': 
      variant === 'ghost',
    
    // Luxury - Premium Glass with Gold Accent
    'bg-gradient-glass border border-gold-primary/20 text-neutral-800 backdrop-blur-xl shadow-luxury hover:shadow-glow-gold hover:border-gold-primary/40 focus:ring-gold-primary': 
      variant === 'luxury',
  })

  // Interactive classes (separate to avoid conflicts)
  const interactiveClasses = cn({
    'hover:scale-105 active:scale-95': 
      (variant === 'primary' || variant === 'secondary' || variant === 'luxury') && !disabled,
    'hover:scale-102': 
      variant === 'ghost' && !disabled,
  })

  // Shimmer effect for primary and secondary buttons
  const shimmerClasses = cn(
    'absolute inset-0 -top-full bg-gradient-to-r',
    'from-transparent via-white/20 to-transparent',
    'transition-all duration-500 group-hover:top-full',
    {
      'opacity-0': variant === 'outline' || variant === 'ghost',
    }
  )

  const buttonClasses = cn(baseClasses, variantClasses, interactiveClasses)

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: variant === 'ghost' ? 1.02 : 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className={shimmerClasses} />
      
      {/* Loading Spinner */}
      {loading && (
        <motion.div
          className="mr-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Pulse Effect for Primary */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-primary-emerald-light rounded-inherit opacity-0"
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      )}
    </motion.button>
  )
}

// Create compound components separately
const ButtonPrimary = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
)

const ButtonSecondary = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
)

const ButtonOutline = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="outline" {...props} />
)

const ButtonGhost = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="ghost" {...props} />
)

const ButtonLuxury = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="luxury" {...props} />
)

// Assign compound components
Object.assign(Button, {
  Primary: ButtonPrimary,
  Secondary: ButtonSecondary,
  Outline: ButtonOutline,
  Ghost: ButtonGhost,
  Luxury: ButtonLuxury,
})

export default Button 