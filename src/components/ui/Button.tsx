'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

/**
 * Optimized Button Component with Clean Design
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
    'transition-all duration-300 ease-out transform-gpu',
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
    // Primary - Emerald Gradient
    'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500': 
      variant === 'primary',
    
    // Secondary - Gold Gradient  
    'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 shadow-lg hover:shadow-xl focus:ring-amber-500': 
      variant === 'secondary',
    
    // Outline - Border Effect
    'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500': 
      variant === 'outline',
    
    // Ghost - Minimal
    'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300': 
      variant === 'ghost',
    
    // Luxury - Premium Glass
    'bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-800 shadow-lg hover:shadow-xl focus:ring-neutral-300': 
      variant === 'luxury',
  })

  const buttonClasses = cn(baseClasses, variantClasses)

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { 
        scale: 1.02,
        y: -1,
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
      }}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -top-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:top-full" />
      
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
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

// Convenience exports
export const ButtonPrimary = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
)

export const ButtonSecondary = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
)

export const ButtonOutline = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="outline" {...props} />
)

export const ButtonGhost = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="ghost" {...props} />
)

export const ButtonLuxury = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="luxury" {...props} />
)

export default Button 