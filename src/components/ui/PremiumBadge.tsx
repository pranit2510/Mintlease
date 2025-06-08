'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface PremiumBadgeProps {
  /** Badge text content */
  children: React.ReactNode
  /** Icon to display on the left */
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  /** Disable hover animations */
  disableHover?: boolean
  /** Custom icon color class */
  iconColor?: string
  /** Custom className for the container */
  className?: string
}

/**
 * PremiumBadge Component
 * 
 * Consistent glassmorphism badge used across all pages and sections.
 * Based on the Calculator page "Premium Savings Calculator" badge design.
 * 
 * Features:
 * - Glassmorphism background with backdrop blur
 * - Animated border gradients
 * - Subtle glass reflection effects
 * - Hover animations with spring physics
 * - Consistent typography and spacing
 */
export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  icon: Icon,
  disableHover = false,
  iconColor = "text-emerald-600",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium text-neutral-700 mb-8 ${className}`}
      {...(!disableHover && {
        whileHover: { 
          scale: 1.015,
          y: -2,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        },
        whileTap: { scale: 0.995, y: 0 }
      })}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {Icon && (
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: [0, 3, -3, 0],
            scale: [1, 1.02, 0.98, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className={`w-4 h-4 ${iconColor} drop-shadow-sm`} />
        </motion.div>
      )}
      
      <span className="relative z-10 tracking-wide font-medium">
        {children}
      </span>
    </motion.div>
  )
} 