'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  variant?: 'default' | 'luxury' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: React.ReactNode
  helperText?: string
}

/**
 * Luxury Input Component with Design System Integration
 * Features: Glassmorphism, emerald focus rings, smooth transitions, error states
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'luxury',
  size = 'md',
  fullWidth = true,
  icon,
  helperText,
  className,
  ...props
}) => {
  const baseClasses = cn(
    // Base styling with glassmorphism
    'relative flex items-center transition-all duration-300 ease-3d-smooth',
    'border rounded-lg bg-white/80 backdrop-blur-lg',
    'focus-within:ring-2 focus-within:ring-offset-2',
    'shadow-3d-sm hover:shadow-3d',
    
    // Size variants
    {
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-3 text-base': size === 'md', 
      'px-6 py-4 text-lg': size === 'lg',
    },
    
    // Width variants
    {
      'w-full': fullWidth,
      'w-auto': !fullWidth,
    },
    
    // Variant styles
    {
      // Default - Clean light theme
      'border-neutral-200 focus-within:border-neutral-300 focus-within:ring-neutral-200': 
        variant === 'default',
      
      // Luxury - Emerald focus with glass effect
      'border-emerald-200/50 focus-within:border-emerald-400 focus-within:ring-emerald-200/50 bg-gradient-to-br from-white/90 via-emerald-50/10 to-white/80': 
        variant === 'luxury',
        
      // Glass - Enhanced glassmorphism
      'border-white/30 focus-within:border-white/50 focus-within:ring-white/30 bg-white/20 backdrop-blur-xl': 
        variant === 'glass',
    },
    
    // Error state
    {
      'border-red-300 focus-within:border-red-400 focus-within:ring-red-200': error,
    },
    
    className
  )

  const inputClasses = cn(
    'flex-1 bg-transparent border-none outline-none placeholder-neutral-400',
    'focus:placeholder-neutral-500 transition-colors duration-300',
    'text-neutral-800'
  )

  const labelClasses = cn(
    'block text-sm font-semibold mb-2 text-neutral-700',
    'transition-colors duration-300'
  )

  const errorClasses = 'text-sm text-red-600 mt-1 transition-all duration-300'
  const helperClasses = 'text-sm text-neutral-500 mt-1 transition-all duration-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'space-y-1',
        { 'w-full': fullWidth, 'w-auto': !fullWidth }
      )}
    >
      {/* Label */}
      {label && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={labelClasses}
        >
          {label}
        </motion.label>
      )}
      
      {/* Input Container */}
      <motion.div
        className={baseClasses}
        whileFocus={{ scale: 1.01 }}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Icon */}
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex-shrink-0 mr-3 text-neutral-500"
          >
            {icon}
          </motion.div>
        )}
        
        {/* Input Field */}
        <input
          className={inputClasses}
          {...props}
        />
        
        {/* Focus Ring Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          initial={false}
          whileFocus={{ 
            opacity: 1,
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          style={{
            background: variant === 'luxury' 
              ? 'linear-gradient(145deg, rgba(4,120,87,0.05) 0%, transparent 50%, rgba(4,120,87,0.02) 100%)'
              : 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)',
          }}
        />
      </motion.div>
      
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={errorClasses}
        >
          {error}
        </motion.div>
      )}
      
      {/* Helper Text */}
      {helperText && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={helperClasses}
        >
          {helperText}
        </motion.div>
      )}
    </motion.div>
  )
}

// Create compound components for different use cases
const InputDefault = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="default" {...props} />
)

const InputLuxury = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="luxury" {...props} />
)

const InputGlass = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="glass" {...props} />
)

// Assign compound components
Object.assign(Input, {
  Default: InputDefault,
  Luxury: InputLuxury,
  Glass: InputGlass,
})

export default Input 