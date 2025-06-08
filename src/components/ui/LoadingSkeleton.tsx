'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'button' | 'avatar' | 'vehicle' | 'form'
  width?: string | number
  height?: string | number
  className?: string
  lines?: number
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  lines = 1
}) => {
  const baseClasses = `
    bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 
    animate-pulse rounded-lg relative overflow-hidden
  `

  const shimmerClasses = `
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent 
    before:via-white/40 before:to-transparent 
    before:translate-x-[-100%] before:animate-shimmer
  `

  const variants = {
    text: `h-4 ${width ? `w-[${width}]` : 'w-full'}`,
    button: `h-12 ${width ? `w-[${width}]` : 'w-32'} rounded-full`,
    avatar: `w-12 h-12 rounded-full`,
    card: `${height ? `h-[${height}]` : 'h-48'} ${width ? `w-[${width}]` : 'w-full'} rounded-xl`,
    vehicle: `h-64 w-full rounded-xl`,
    form: `h-12 w-full rounded-lg`
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} ${shimmerClasses} ${variants.text}`}
            style={{ 
              width: index === lines - 1 ? '75%' : '100%',
              height: height || '1rem'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={`${baseClasses} ${shimmerClasses} ${variants[variant]} ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

// Vehicle Card Skeleton
export const VehicleCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
    <LoadingSkeleton variant="vehicle" className="mb-4" />
    <div className="space-y-3">
      <LoadingSkeleton variant="text" width="80%" height="1.5rem" />
      <LoadingSkeleton variant="text" width="60%" />
      <div className="flex justify-between items-center mt-4">
        <LoadingSkeleton variant="text" width="40%" />
        <LoadingSkeleton variant="button" width="120px" height="40px" />
      </div>
    </div>
  </div>
)

// Form Skeleton
export const FormSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="30%" />
        <LoadingSkeleton variant="form" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="30%" />
        <LoadingSkeleton variant="form" />
      </div>
    </div>
    <div className="space-y-2">
      <LoadingSkeleton variant="text" width="25%" />
      <LoadingSkeleton variant="form" />
    </div>
    <LoadingSkeleton variant="button" width="100%" height="48px" />
  </div>
)

// Page Skeleton
export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen pt-20 px-4">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <LoadingSkeleton variant="text" width="60%" height="3rem" className="mx-auto" />
        <LoadingSkeleton variant="text" lines={2} />
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <VehicleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
) 