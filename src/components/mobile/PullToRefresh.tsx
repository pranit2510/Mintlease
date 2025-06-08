'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  refreshingText?: string
  pullText?: string
  releaseText?: string
  className?: string
  disabled?: boolean
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  refreshingText = 'Refreshing...',
  pullText = 'Pull to refresh',
  releaseText = 'Release to refresh',
  className = '',
  disabled = false
}) => {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hapticFeedbackGiven, setHapticFeedbackGiven] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Check if user is at the top of the page
  const checkScrollPosition = useCallback(() => {
    if (containerRef.current) {
      setIsAtTop(containerRef.current.scrollTop === 0)
    }
  }, [])

  // Haptic feedback function
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      // Simple vibration for Android
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
    
    // iOS haptic feedback (if available)
    if ('ondevicechange' in navigator) {
      try {
        // @ts-ignore - iOS specific API
        if (window.DeviceMotionEvent?.requestPermission) {
          // iOS 13+ haptic feedback
          const HapticImpact = (window as any).Haptic?.Impact
          if (HapticImpact) {
            const impact = new HapticImpact({ style: type })
            impact?.impactOccurred?.()
          }
        }
      } catch (error) {
        // Silently fail if haptic feedback is not available
      }
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || !isAtTop || isRefreshing) return
    
    setStartY(e.touches[0].clientY)
    setHapticFeedbackGiven(false)
  }, [disabled, isAtTop, isRefreshing])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || !isAtTop || isRefreshing || startY === 0) return

    const currentY = e.touches[0].clientY
    const distance = Math.max(0, (currentY - startY) * 0.5) // Reduce sensitivity

    if (distance > 0) {
      e.preventDefault() // Prevent default scroll behavior
      setPullDistance(distance)

      // Trigger haptic feedback when threshold is reached
      if (distance >= threshold && !hapticFeedbackGiven) {
        triggerHapticFeedback('medium')
        setHapticFeedbackGiven(true)
      }
    }
  }, [disabled, isAtTop, isRefreshing, startY, threshold, triggerHapticFeedback, hapticFeedbackGiven])

  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing) return

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      triggerHapticFeedback('heavy')
      
      // Animate to loading position
      await controls.start({
        y: threshold,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      })

      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        // Animate back to original position
        await controls.start({
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        })
        setIsRefreshing(false)
      }
    } else {
      // Animate back to original position
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 400, damping: 30 }
      })
    }

    setPullDistance(0)
    setStartY(0)
    setHapticFeedbackGiven(false)
  }, [disabled, isRefreshing, pullDistance, threshold, controls, onRefresh, triggerHapticFeedback])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('scroll', checkScrollPosition, { passive: true })

    // Initial scroll position check
    checkScrollPosition()

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, checkScrollPosition])

  const getRefreshText = () => {
    if (isRefreshing) return refreshingText
    if (pullDistance >= threshold) return releaseText
    return pullText
  }

  const refreshIconRotation = isRefreshing ? 360 : Math.min(pullDistance * 2, 180)

  return (
    <div className={`relative ${className}`}>
      {/* Pull to refresh indicator */}
      <motion.div
        animate={controls}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-700"
        style={{
          height: Math.max(0, pullDistance),
          opacity: Math.min(pullDistance / threshold, 1)
        }}
      >
        <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
          <motion.div
            animate={{ rotate: refreshIconRotation }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </motion.div>
          <span className="text-sm font-medium">
            {getRefreshText()}
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        ref={containerRef}
        animate={controls}
        className="overflow-auto h-full"
        style={{
          transform: isRefreshing ? `translateY(${threshold}px)` : `translateY(${pullDistance}px)`
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Hook for programmatic refresh
export const usePullToRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = useCallback(async (refreshFunction: () => Promise<void>) => {
    setIsRefreshing(true)
    try {
      await refreshFunction()
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  return { isRefreshing, refresh }
} 