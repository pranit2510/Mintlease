'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

/**
 * Luxury Button Component with 2025 3D Glassmorphism Design
 * Features: Multiple variants, loading states, smooth animations, 3D depth effects
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
    // Base styles with 3D enhancements
    'relative inline-flex items-center justify-center font-semibold',
    'transition-all duration-300 ease-3d-smooth transform-gpu',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'overflow-hidden group transform-style-3d',
    
    // 3D depth base
    'shadow-3d hover:shadow-3d-hover active:shadow-3d-inset',
    'hover:transform hover:-translate-y-1 hover:translate-z-1',
    'active:transform active:translate-y-0 active:translate-z-0',
    
    // Size variants with enhanced padding
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

  // Variant-specific classes with 3D depth
  const variantClasses = cn({
    // Primary - Luxury Emerald Gradient with 3D
    'emerald-3d text-white focus:ring-primary-emerald-light bg-gradient-to-br from-primary-emerald-light via-primary-emerald to-primary-emerald-dark border border-primary-emerald-dark/20': 
      variant === 'primary',
    
    // Secondary - Luxury Gold Gradient with 3D
    'gold-3d text-neutral-900 focus:ring-gold-primary bg-gradient-to-br from-gold-secondary via-gold-primary to-amber-600 border border-amber-700/20': 
      variant === 'secondary',
    
    // Outline - Glass Border Effect with 3D depth
    'btn-3d glass border-2 border-primary-emerald/30 text-primary-emerald backdrop-blur-lg hover:bg-primary-emerald/10 hover:border-primary-emerald/50 focus:ring-primary-emerald': 
      variant === 'outline',
    
    // Ghost - Minimal with subtle 3D on hover
    'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:shadow-3d-sm focus:ring-neutral-300 border border-transparent hover:border-neutral-200/50': 
      variant === 'ghost',
    
    // Luxury - Premium Glass with Gold Accent and full 3D
    'card-3d glass-strong border border-gold-primary/30 text-neutral-800 backdrop-blur-xl hover:border-gold-primary/50 focus:ring-gold-primary bg-gradient-to-br from-white/80 via-gold-light/20 to-white/80': 
      variant === 'luxury',
  })

  // Interactive classes (separate to avoid conflicts)
  const interactiveClasses = cn({
    'hover:scale-[1.02] active:scale-[0.98]': 
      (variant === 'primary' || variant === 'secondary' || variant === 'luxury') && !disabled,
    'hover:scale-[1.01]': 
      variant === 'ghost' && !disabled,
  })

  // Enhanced shimmer effect with 3D depth
  const shimmerClasses = cn(
    'absolute inset-0 -top-full bg-gradient-to-r',
    'from-transparent via-white/25 to-transparent',
    'transition-all duration-700 group-hover:top-full transform-gpu',
    {
      'opacity-0': variant === 'outline' || variant === 'ghost',
      'via-white/30': variant === 'primary',
      'via-amber-200/40': variant === 'secondary',
      'via-gold-light/50': variant === 'luxury',
    }
  )

  const buttonClasses = cn(baseClasses, variantClasses, interactiveClasses)

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { 
        scale: variant === 'ghost' ? 1.01 : 1.02,
        y: -2,
        rotateX: 2,
        rotateY: 1,
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
        y: 0,
        rotateX: 0,
        rotateY: 0,
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        duration: 0.3
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      {...props}
    >
      {/* Enhanced 3D Background Layer */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.05) 100%)'
            : variant === 'secondary'
            ? 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.05) 100%)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.02) 100%)',
        }}
      />
      
      {/* Enhanced Shimmer Effect with 3D */}
      <div className={shimmerClasses} style={{ transform: 'translateZ(1px)' }} />
      
      {/* Loading Spinner with 3D positioning */}
      {loading && (
        <motion.div
          className="mr-2 relative z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{ transform: 'translateZ(2px)' }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      {/* Button Content with 3D depth */}
      <span className="relative z-10 flex items-center gap-2" style={{ transform: 'translateZ(2px)' }}>
        {children}
      </span>
      
      {/* Enhanced Pulse Effect for Primary with 3D */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-primary-emerald-light rounded-inherit opacity-0"
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4
          }}
          style={{ transform: 'translateZ(-1px)' }}
        />
      )}

      {/* 3D Border Highlight */}
      <motion.div
        className="absolute inset-0 rounded-inherit border-2 border-transparent opacity-0"
        whileHover={{ 
          opacity: 1,
          borderColor: variant === 'primary' ? 'rgba(16, 185, 129, 0.3)' 
                     : variant === 'secondary' ? 'rgba(245, 158, 11, 0.3)'
                     : 'rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* Inner Shadow for depth */}
      <div 
        className="absolute inset-[1px] rounded-inherit opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(145deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          transform: 'translateZ(-1px)'
        }}
      />
    </motion.button>
  )
}

// Create compound components separately with enhanced 3D
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