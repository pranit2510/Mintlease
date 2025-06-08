'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { LoadingSkeleton } from './LoadingSkeleton'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  objectFit = 'cover',
  quality = 85,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return // Skip observer if priority is true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 768px) 90vw,
    (max-width: 1024px) 80vw,
    (max-width: 1280px) 70vw,
    60vw
  `

  // Generate blur data URL for better loading experience
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, '#f3f4f6')
      gradient.addColorStop(1, '#e5e7eb')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(40, 40)

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: fill ? '100%' : width, 
        height: fill ? '100%' : height,
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10">
          <LoadingSkeleton 
            variant="vehicle" 
            className="w-full h-full rounded-lg" 
          />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p>Image failed to load</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isIntersecting && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={responsiveSizes}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          className={`
            transition-opacity duration-300 
            ${isLoading ? 'opacity-0' : 'opacity-100'}
            ${objectFit === 'cover' ? 'object-cover' : ''}
            ${objectFit === 'contain' ? 'object-contain' : ''}
            ${objectFit === 'fill' ? 'object-fill' : ''}
            ${objectFit === 'none' ? 'object-none' : ''}
            ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
          `}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )}
    </div>
  )
}

// Vehicle Image Component with specific optimizations
export const VehicleImage: React.FC<Omit<OptimizedImageProps, 'sizes' | 'objectFit'>> = (props) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
    objectFit="cover"
    quality={90}
  />
)

// Avatar Image Component
export const AvatarImage: React.FC<Omit<OptimizedImageProps, 'sizes' | 'objectFit'>> = (props) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, 100px"
    objectFit="cover"
    quality={95}
  />
) 