'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { HeartIcon as HeartIconOutline, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatCurrency, animationVariants } from '@/lib/utils'
import { PremiumBadge } from '@/components/ui/PremiumBadge'

/**
 * Vehicle Showcase Section - Premium Vehicle Display
 * Features: Interactive vehicle cards matching inventory design, featured vehicle system
 */

// Updated interface to match inventory structure and support featured marking
interface FeaturedVehicle {
  id: number
  make: string
  model: string
  year: number
  trim: string
  price: number
  msrp: number
  savings: number
  mileage: number
  mpg: string
  engine: string
  vehicleType: string
  image: string
  features: string[]
  location: string
  available: boolean
  featured: boolean // Backend will mark vehicles as featured
}

interface VehicleCardProps {
  vehicle: FeaturedVehicle
  index: number
  isFavorited: boolean
  onFavoriteToggle: (id: number) => void
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index, isFavorited, onFavoriteToggle }) => {
  // Fix hydration issues by detecting client-side mounting
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Memoized handlers for better performance
  const handleFavoriteToggle = useCallback(() => {
    onFavoriteToggle(vehicle.id)
  }, [onFavoriteToggle, vehicle.id])
  
  const handleViewDetails = useCallback(() => {
    window.location.href = '/inventory'
  }, [])
  
  const handleInquireAboutDeal = useCallback(() => {
    window.location.href = '/lead'
  }, [])

  // Animation variants matching inventory
  const viewDetailsVariants = {
    default: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#ffffff',
      scale: 1,
      y: 0,
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25), 0 8px 24px rgba(16, 185, 129, 0.15)'
    },
    hover: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
      color: '#ffffff',
      scale: 1.02,
      y: -2,
      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35), 0 16px 32px rgba(16, 185, 129, 0.2), 0 24px 48px rgba(249, 115, 22, 0.15)'
    }
  }

  const consultationButtonVariants = {
    default: {
      borderColor: '#10b981',
      color: '#10b981',
      backgroundColor: 'transparent',
      scale: 1,
      y: 0,
      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
    },
    hover: {
      borderColor: '#f97316',
      color: '#ffffff',
      backgroundColor: '#f97316',
      scale: 1.02,
      y: -2,
      boxShadow: '0 6px 16px rgba(249, 115, 22, 0.25), 0 12px 24px rgba(249, 115, 22, 0.15)'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12), 0 16px 64px rgba(139, 69, 19, 0.06)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="overflow-hidden rounded-[24px] group will-change-transform h-full flex flex-col"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        isolation: 'isolate',
        minHeight: '600px', // Ensure consistent minimum height
        height: '100%' // Fill container height
      }}
      suppressHydrationWarning
    >
      {/* Vehicle Image */}
      <div className="relative h-56 bg-gradient-to-br from-neutral-200 to-neutral-300 overflow-hidden rounded-[20px] m-4 mb-3 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 opacity-30">🚗</div>
            <span className="text-neutral-600 font-semibold text-sm">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
        </div>
        
        {/* Savings Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-[10px] shadow-lg z-10">
          Save ${vehicle.savings.toLocaleString()}
        </div>
        
        {/* Favorite Button */}
        <motion.button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFavorited ? (
            <HeartIconSolid className="w-4 h-4 text-red-500" />
          ) : (
            <HeartIconOutline className="w-4 h-4 text-neutral-600 hover:text-red-500 transition-colors" />
          )}
        </motion.button>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-[10px] shadow-lg z-10">
          Available
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Top Content */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-neutral-800 mb-1 group-hover:text-emerald-600 transition-colors">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-neutral-600 text-sm mb-2">{vehicle.trim}</p>
            <p className="text-xs text-neutral-500 flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
              {vehicle.location}
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-5 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 p-4 rounded-lg">
            <div className="text-xs text-neutral-500 line-through mb-1">
              MSRP: ${vehicle.msrp.toLocaleString()}
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              ${vehicle.price.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">
              From ${Math.round(vehicle.price / 60)}/mo*
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            <div className="bg-neutral-50 p-2 rounded text-center">
              <div className="font-bold text-neutral-800">{vehicle.vehicleType}</div>
              <div className="text-neutral-500">Type</div>
            </div>
            <div className="bg-neutral-50 p-2 rounded text-center">
              <div className="font-bold text-neutral-800">{vehicle.mpg}</div>
              <div className="text-neutral-500">MPG</div>
            </div>
            <div className="bg-neutral-50 p-2 rounded text-center">
              <div className="font-bold text-neutral-800 text-xs">{vehicle.engine.split(' ')[0]}</div>
              <div className="text-neutral-500">Engine</div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-5">
            <div className="flex flex-wrap gap-1">
              {vehicle.features.slice(0, 2).map((feature: string, index: number) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-[6px]"
                >
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 2 && (
                <span className="px-2.5 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-[6px]">
                  +{vehicle.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions - Always at bottom */}
        <div className="space-y-3 mt-auto">
          <motion.button 
            onClick={handleViewDetails}
            className="w-full font-semibold px-5 py-3 rounded-[14px] will-change-transform"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            variants={viewDetailsVariants}
            initial="default"
            whileHover="hover"
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            View Details
          </motion.button>
          <motion.button 
            onClick={handleInquireAboutDeal}
            className="w-full border-2 px-5 py-2.5 rounded-[14px] font-semibold will-change-transform"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            variants={consultationButtonVariants}
            initial="default"
            whileHover="hover"
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Inquire About Deal
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function VehicleShowcase() {
  const router = useRouter()
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  // Favorite vehicles state
  const [favoriteVehicles, setFavoriteVehicles] = useState<Set<number>>(new Set())

  // Interactive mouse tracking for premium effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Ultra-smooth spring animations
  const springMouseX = useSpring(mouseX, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })
  const springMouseY = useSpring(mouseY, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })

  // Parallax transforms
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])

  // Mouse interaction handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }, [mouseX, mouseY])

  // Favorite toggle handler
  const handleFavoriteToggle = useCallback((vehicleId: number) => {
    setFavoriteVehicles(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(vehicleId)) {
        newFavorites.delete(vehicleId)
      } else {
        newFavorites.add(vehicleId)
      }
      return newFavorites
    })
  }, [])

  // Featured vehicles data - In production, this would come from API with featured: true
  // Backend will mark vehicles as featured, and only those will show here
  const featuredVehicles: FeaturedVehicle[] = [
    {
      id: 1,
      make: 'BMW',
      model: 'X5 M50i',
      year: 2024,
      trim: 'xDrive M50i Premium Package',
      price: 72900,
      msrp: 85500,
      savings: 12600,
      mileage: 8500,
      mpg: '18/24',
      engine: '4.4L Twin-Turbo V8',
      vehicleType: 'Luxury SUV',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center',
      features: ['M Performance Package', 'Harman Kardon Surround Sound', 'Panoramic Moonroof', 'Adaptive M Suspension', 'Head-Up Display', '22" M Wheels'],
      location: 'Beverly Hills, CA',
      available: true,
      featured: true
    },
    {
      id: 2,
      make: 'Mercedes-Benz',
      model: 'GLE 450',
      year: 2024,
      trim: '4MATIC AMG Line',
      price: 67800,
      msrp: 76900,
      savings: 9100,
      mileage: 6200,
      mpg: '20/26',
      engine: '3.0L Turbo I6 + EQBoost',
      vehicleType: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center',
      features: ['AMG Line Package', 'MBUX Hyperscreen', 'Burmester 3D Audio', 'Air Body Control', 'Night Package', 'Premium Leather'],
      location: 'Manhattan, NY',
      available: true,
      featured: true
    },
    {
      id: 3,
      make: 'Audi',
      model: 'Q8 Prestige',
      year: 2024,
      trim: '55 TFSI Quattro Prestige',
      price: 79200,
      msrp: 89600,
      savings: 10400,
      mileage: 11200,
      mpg: '17/23',
      engine: '3.0L TFSI V6 Turbo',
      vehicleType: 'Luxury Coupe SUV',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center',
      features: ['Virtual Cockpit Plus', 'Bang & Olufsen 3D Audio', 'Quattro Sport Differential', 'Matrix LED Headlights', 'Massage Seats', '22" Wheels'],
      location: 'Austin, TX',
      available: true,
      featured: true
    },
    {
      id: 4,
      make: 'Porsche',
      model: 'Macan S',
      year: 2024,
      trim: 'Sport Design Package',
      price: 68500,
      msrp: 76800,
      savings: 8300,
      mileage: 4800,
      mpg: '19/25',
      engine: '2.9L Twin-Turbo V6',
      vehicleType: 'Sports SUV',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center',
      features: ['Sport Chrono Package', 'Bose Premium Audio', 'Panoramic Roof', 'Adaptive Sports Seats', 'Sport Exhaust', '21" RS Spyder Wheels'],
      location: 'Newport Beach, CA',
      available: true,
      featured: true
    },
    {
      id: 5,
      make: 'Tesla',
      model: 'Model S Plaid',
      year: 2024,
      trim: 'Tri-Motor AWD',
      price: 89900,
      msrp: 109990,
      savings: 20090,
      mileage: 2100,
      mpg: '120 MPGe',
      engine: 'Tri-Motor Electric',
      vehicleType: 'Electric Luxury',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center',
      features: ['1020 HP', '0-60 in 1.99s', '17" Cinematic Display', 'Premium Interior', 'Full Self-Driving', 'Glass Roof'],
      location: 'Palo Alto, CA',
      available: true,
      featured: true
    },
    {
      id: 6,
      make: 'Range Rover',
      model: 'Sport HSE',
      year: 2024,
      trim: 'Dynamic HSE P400',
      price: 94200,
      msrp: 108500,
      savings: 14300,
      mileage: 7300,
      mpg: '19/25',
      engine: '3.0L Turbo I6 MHEV',
      vehicleType: 'Luxury SUV',
      image: 'https://images.unsplash.com/photo-1544378958-6d3c92d0c05d?w=800&h=600&fit=crop&crop=center',
      features: ['Air Suspension', 'Meridian Audio', 'Panoramic Roof', 'Terrain Response 2', 'Premium Leather', '22" Alloy Wheels'],
      location: 'Miami, FL',
      available: true,
      featured: true
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  }

  return (
    <motion.section
      ref={containerRef}
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: '#FEF7ED',
        overflowX: 'hidden',
        maxWidth: '100vw',
        position: 'relative',
        opacity: 1
      }}
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="visible"
      animate="visible"
      suppressHydrationWarning
    >
      {/* 120fps Optimized Luxury Background - Matching Hero Section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary gradient layer - GPU accelerated */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
          style={{
            x: backgroundX,
            y: backgroundY,
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
        
        {/* Subtle accent glow - Optimized */}
        <motion.div 
          className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
          style={{
            x: useTransform(backgroundX, [-20, 20], [-5, 5]),
            y: useTransform(backgroundY, [-10, 10], [-8, 8]),
            opacity: 0.25,
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
        
        {/* Minimal ambient light - Simplified */}
        <motion.div 
          className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
          style={{
            x: useTransform(backgroundX, [-20, 20], [-3, 3]),
            y: useTransform(backgroundY, [-10, 10], [-5, 5]),
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          suppressHydrationWarning
        >
          <PremiumBadge>Featured Vehicles</PremiumBadge>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 heading-luxury text-neutral-800"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            suppressHydrationWarning
          >
            Premium Selection
          </motion.h2>
          
          <motion.p 
            className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            suppressHydrationWarning
          >
            Discover our curated collection of luxury vehicles, each one carefully selected 
            and negotiated to provide exceptional value. Only our best deals are featured here.
          </motion.p>
        </motion.div>

        {/* Vehicle Grid - Using inventory-style cards */}
        <motion.div 
          className="grid gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-16"
          style={{
            minHeight: '600px', // Ensure proper height
            width: '100%', // Ensure full width usage
            opacity: 1
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          suppressHydrationWarning
        >
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              style={{
                minWidth: '300px', // Ensure minimum card width
                width: '100%', // Use full available width
                opacity: 1
              }}
              suppressHydrationWarning
            >
              <VehicleCard 
                vehicle={vehicle} 
                index={index}
                isFavorited={favoriteVehicles.has(vehicle.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
          suppressHydrationWarning
        >
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8 md:p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            suppressHydrationWarning
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              Don't See What You're Looking For?
            </h3>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              We can source any vehicle make, model, or trim level. Our extensive dealer network 
              gives us access to inventory nationwide.
            </p>
            
            <motion.button
              onClick={() => router.push('/inventory')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              Browse Full Inventory
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default VehicleShowcase 