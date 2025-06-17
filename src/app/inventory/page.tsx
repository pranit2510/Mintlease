'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageBackground, SectionBackground } from '@/components/layout/GlobalBackground'
import { PremiumBadge } from '@/components/ui/PremiumBadge'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon, XMarkIcon, ChevronDownIcon, CheckIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, ShareIcon } from '@heroicons/react/24/solid'
import { Shield, DollarSign, Truck } from 'lucide-react'
import { Slider } from '@mui/material'

// Safe Motion Wrapper to prevent hydration errors
const SafeMotionDiv = ({ children, ...props }: any) => {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <div {...props} suppressHydrationWarning>{children}</div>
  }
  
  return <motion.div {...props}>{children}</motion.div>
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-neutral-600 mb-4">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Mock vehicle data - in production this would come from an API
interface MockVehicle {
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
  lease?: {
    monthlyPayment: number
    dueAtSigning: number
    termMonths: number
    milesPerYear: number
  }
}

const mockVehicles: MockVehicle[] = [
  {
    id: 2,
    make: 'BMW',
    model: 'X3',
    year: 2025,
    trim: '30xi',
    price: 61500, // Estimated purchase price based on lease terms
    msrp: 66900,
    savings: 5400,
    mileage: 12, // New vehicle with delivery miles
    mpg: '23/29',
    engine: '2.0L Turbo I4',
    vehicleType: 'Crossover',
    image: '/vehicles/bmw-logo.svg?v=1',
    features: ['iDrive 8.5', 'xDrive All-Wheel Drive', 'BMW Live Cockpit', 'Wireless Apple CarPlay', 'Panoramic Moonroof', 'Heated Seats'],
    location: 'Manhattan, NY',
    available: true,
    lease: {
      monthlyPayment: 849,
      dueAtSigning: 2500,
      termMonths: 39,
      milesPerYear: 10000
    }
  },
  {
    id: 1,
    make: 'Nissan',
    model: 'Murano',
    year: 2025,
    trim: 'SV',
    price: 38900, // Estimated purchase price based on lease terms
    msrp: 42600,
    savings: 3700,
    mileage: 8, // New vehicle with delivery miles
    mpg: '20/28',
    engine: '3.5L V6',
    vehicleType: 'Crossover',
    image: '/vehicles/nissan-logo.svg?v=3',
    features: ['NissanConnect Infotainment', 'Intelligent All-Wheel Drive', 'Zero Gravity Seats', 'Remote Engine Start', 'Blind Spot Warning', 'Rear Cross Traffic Alert'],
    location: 'Available Nationwide',
    available: true,
    lease: {
      monthlyPayment: 438,
      dueAtSigning: 2500,
      termMonths: 39,
      milesPerYear: 10000
    }
  },
  {
    id: 3,
    make: 'Mazda',
    model: 'CX-50',
    year: 2025,
    trim: 'Premium',
    price: 35800, // Estimated purchase price based on lease terms
    msrp: 39200,
    savings: 3400,
    mileage: 15, // New vehicle with delivery miles
    mpg: '24/31',
    engine: '2.5L I4',
    vehicleType: 'Crossover',
    image: '/vehicles/mazda-logo.svg?v=1',
    features: ['MAZDA CONNECT Infotainment', 'i-ACTIV AWD', 'BOSE Audio', 'Wireless Apple CarPlay', 'Heated Seats', 'Power Liftgate'],
    location: 'New York, NY',
    available: true,
    lease: {
      monthlyPayment: 407,
      dueAtSigning: 2500,
      termMonths: 39,
      milesPerYear: 10000
    }
  },
  {
    id: 4,
    make: 'Toyota',
    model: 'RAV4',
    year: 2025,
    trim: 'XLE',
    price: 36800, // Estimated purchase price based on lease terms
    msrp: 40200,
    savings: 3400,
    mileage: 18, // New vehicle with delivery miles
    mpg: '27/35',
    engine: '2.5L I4',
    vehicleType: 'Crossover',
    image: '/vehicles/toyota-logo.svg?v=1',
    features: ['Toyota Safety Sense 2.0', 'All-Wheel Drive', 'Entune 3.0 Audio', 'Wireless Apple CarPlay', 'Power Liftgate', 'Dual-Zone Climate Control'],
    location: 'New York, NY',
    available: true,
    lease: {
      monthlyPayment: 456,
      dueAtSigning: 2500,
      termMonths: 39,
      milesPerYear: 10000
    }
  },
  {
    id: 5,
    make: 'Mercedes-Benz',
    model: 'C300',
    year: 2025,
    trim: 'Demo',
    price: 45800, // Estimated purchase price based on lease terms
    msrp: 49900,
    savings: 4100,
    mileage: 2500, // Demo vehicle with low miles
    mpg: '23/32',
    engine: '2.0L Turbo I4',
    vehicleType: 'Sedan',
    image: '/vehicles/mercedes-logo.svg?v=1',
    features: ['MBUX Infotainment', 'Mercedes Me Connect', 'LED Headlights', 'Apple CarPlay', 'Blind Spot Assist', 'Active Brake Assist'],
    location: 'New York, NY',
    available: true,
    lease: {
      monthlyPayment: 614,
      dueAtSigning: 2500,
      termMonths: 36,
      milesPerYear: 10000
    }
  },
  {
    id: 6,
    make: 'Hyundai',
    model: 'Palisade',
    year: 2025,
    trim: 'SEL',
    price: 42800, // Estimated purchase price based on lease terms
    msrp: 46700,
    savings: 3900,
    mileage: 22, // New vehicle with delivery miles
    mpg: '19/26',
    engine: '3.8L V6',
    vehicleType: 'SUV',
    image: '/vehicles/hyundai-logo.svg?v=1',
    features: ['Hyundai SmartSense', 'Wireless Apple CarPlay', 'Heated & Ventilated Seats', 'Panoramic Sunroof', 'Captain\'s Chairs', 'Surround View Monitor'],
    location: 'New York, NY',
    available: true,
    lease: {
      monthlyPayment: 567,
      dueAtSigning: 2500,
      termMonths: 36,
      milesPerYear: 10000
    }
  }
]

// High-performance button animation variants - matching homepage
const viewDetailsVariants = {
  default: {
    backgroundColor: '#059669',
    color: '#ffffff',
    border: '2px solid #059669',
    boxShadow: '0 6px 16px -3px rgba(5, 150, 105, 0.3), 0 12px 32px -6px rgba(5, 150, 105, 0.2), 0 24px 48px -12px rgba(0, 0, 0, 0.15), inset 0 1.5px 0 rgba(255, 255, 255, 0.1)',
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  hover: {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
    boxShadow: '0 8px 20px -3px rgba(5, 150, 105, 0.4), 0 16px 36px -6px rgba(5, 150, 105, 0.25), 0 32px 60px -12px rgba(0, 0, 0, 0.2), inset 0 1.5px 0 rgba(255, 255, 255, 0.15)',
    y: -2,
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

// High-performance consultation button animation - matching homepage
const consultationButtonVariants = {
  default: {
    backgroundColor: 'transparent',
    borderColor: '#059669',
    color: '#059669',
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  hover: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: '#ffffff',
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

const VehicleCard: React.FC<{
  vehicle: MockVehicle;
  viewMode: 'grid' | 'list';
  isFavorited: boolean;
  onFavoriteToggle: (id: number) => void;
}> = React.memo(({ vehicle, viewMode, isFavorited, onFavoriteToggle }) => {
  
  // Memoized handlers for better performance
  const handleFavoriteToggle = useCallback(() => {
    onFavoriteToggle(vehicle.id)
  }, [onFavoriteToggle, vehicle.id])
  
  const handleViewDetails = useCallback(() => {
    window.location.href = '/inventory'
  }, [])
  
  const handleInquireAboutDeal = useCallback(() => {
            // For now, direct to lead - for quote form
        window.location.href = '/lead'
  }, [])
  
  if (viewMode === 'list') {
    return (
          <motion.div
      layoutId={`vehicle-${vehicle.id}-list`}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12), 0 16px 64px rgba(139, 69, 19, 0.06)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="p-8 rounded-[24px] group will-change-transform"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vehicle Image */}
          <div className="w-full lg:w-96 h-56 bg-white rounded-[20px] overflow-hidden relative group-hover:shadow-lg transition-all duration-300 m-4 mb-3">
            {vehicle.image ? (
              <img 
                src={vehicle.image} 
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2 opacity-30">🚗</div>
                  <span className="text-neutral-600 font-semibold text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </span>
                </div>
              </div>
            )}
            
            {vehicle.savings > 0 && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-md">
                Save ${vehicle.savings.toLocaleString()}
              </div>
            )}
            
            <motion.button
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFavorited ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIconOutline className="w-5 h-5 text-neutral-600" />
              )}
            </motion.button>
          </div>

          {/* Vehicle Info */}
          <div className="flex-grow">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-3xl font-bold text-neutral-800 mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-lg text-neutral-600 mb-1">{vehicle.trim}</p>
                <p className="text-sm text-neutral-500 flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                  {vehicle.location}
                </p>
              </div>
              <div className="text-right bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 p-4 rounded-xl">
                <div className="text-sm text-neutral-500 line-through mb-1">
                  MSRP: ${vehicle.msrp.toLocaleString()}
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  ${vehicle.price.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600">
                  From ${Math.round(vehicle.price / 60)}/mo*
                </div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-neutral-800">{vehicle.vehicleType}</div>
                <div className="text-sm text-neutral-500">Type</div>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-neutral-800">{vehicle.mpg}</div>
                <div className="text-sm text-neutral-500">MPG</div>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-neutral-800">{vehicle.engine}</div>
                <div className="text-sm text-neutral-500">Engine</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-neutral-700 mb-3">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature: string, index: number) => (
                  <span
                    key={index}
                    className="px-2.5 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-[6px]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button 
                onClick={handleViewDetails}
                className="flex-1 font-semibold px-8 py-4 rounded-[14px] text-lg will-change-transform"
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
                className="flex-1 border-2 px-8 py-4 rounded-[14px] text-lg font-semibold will-change-transform"
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
              <button className="w-14 h-14 border border-neutral-300 rounded-xl flex items-center justify-center hover:bg-neutral-50 hover:border-primary-emerald transition-all duration-200 group">
                <ShareIcon className="w-5 h-5 text-neutral-600 group-hover:text-primary-emerald" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div
      layoutId={`vehicle-${vehicle.id}-grid`}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12), 0 16px 64px rgba(139, 69, 19, 0.06)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="overflow-hidden rounded-[24px] group will-change-transform"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      {/* Vehicle Image */}
      <div className="relative h-56 bg-white overflow-hidden rounded-[20px] m-4 mb-3">
        {vehicle.image ? (
          <img 
            src={vehicle.image} 
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-30">🚗</div>
              <span className="text-neutral-600 font-semibold text-sm">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
            </div>
          </div>
        )}
        
        {/* Overlay badges only when needed */}
        {vehicle.savings > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-md">
            Save ${vehicle.savings.toLocaleString()}
          </div>
        )}
        
        <motion.button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFavorited ? (
            <HeartIconSolid className="w-4 h-4 text-red-500" />
          ) : (
            <HeartIconOutline className="w-4 h-4 text-neutral-600" />
          )}
        </motion.button>
        
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-md">
          Available
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
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
          {vehicle.lease ? (
            <>
              <div className="text-xs text-neutral-500 line-through mb-1">
                ${Math.round(vehicle.msrp / 60)}/month
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                ${vehicle.lease.monthlyPayment}/mo
              </div>
              <div className="text-sm text-neutral-600 mb-2">
                ${vehicle.lease.dueAtSigning.toLocaleString()} due at signing
              </div>
              <div className="text-xs text-neutral-500 flex justify-between">
                <span>{vehicle.lease.termMonths} months</span>
                <span>{(vehicle.lease.milesPerYear / 1000).toFixed(0)}k mi/year</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-neutral-500 line-through mb-1">
                MSRP: ${vehicle.msrp.toLocaleString()}
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                ${vehicle.price.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-600">
                From ${Math.round(vehicle.price / 60)}/mo*
              </div>
            </>
          )}
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

        {/* Actions */}
        <div className="space-y-3">
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
})

// Add display name for VehicleCard
VehicleCard.displayName = 'VehicleCard'

// Hydration-Safe Range Slider Component
const RangeSlider: React.FC<{
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  formatLabel?: (value: number) => string;
}> = ({ label, min, max, value, onChange, prefix = '', suffix = '', step = 1, formatLabel }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (_: Event, newValue: number | number[]) => {
    onChange(newValue as [number, number])
  }

  const formatValue = (val: number) => {
    if (formatLabel) return formatLabel(val)
    return `${prefix}${val.toLocaleString()}${suffix}`
  }

  if (!isMounted) {
    return (
      <div 
        className="rounded-[8px] sm:rounded-2xl p-3 sm:p-6 transition-all duration-300"
        style={{ 
          overflowX: 'hidden', 
          overflowY: 'visible',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
        suppressHydrationWarning
      >
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <label className="text-sm sm:text-base font-semibold text-slate-800">{label}</label>
          <span className="text-xs sm:text-sm text-slate-600 font-medium">
            {formatValue(value[0])} - {formatValue(value[1])}
          </span>
        </div>
        <div 
          className="px-2 sm:px-4" 
          style={{ 
            paddingTop: '20px', 
            paddingBottom: '20px', 
            overflow: 'visible', 
            position: 'relative'
          }}
        >
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="off"
            min={min}
            max={max}
            step={step}
            sx={{
              color: '#10b981',
              height: 6,
              marginTop: '16px',
              marginBottom: '16px',
              overflow: 'visible',
              '& .MuiSlider-track': {
                border: 'none',
                background: 'linear-gradient(90deg, #10b981, #059669)',
              },
              '& .MuiSlider-thumb': {
                height: 20,
                width: 20,
                backgroundColor: '#fff',
                border: '3px solid #10b981',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                zIndex: 100,
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.16)',
                  border: '3px solid #059669',
                },
                '&:before': {
                  display: 'none',
                },
              },
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="rounded-[8px] sm:rounded-2xl p-3 sm:p-6 transition-all duration-300"
      style={{ 
        overflowX: 'hidden', 
        overflowY: 'visible',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(16, 185, 129, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
      whileHover={{ 
        y: -2, 
        scale: 1.01 
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <label className="text-sm sm:text-base font-semibold text-slate-800">{label}</label>
        <span className="text-xs sm:text-sm text-slate-600 font-medium">
          {formatValue(value[0])} - {formatValue(value[1])}
        </span>
      </div>
      <div 
        className="px-2 sm:px-4" 
        style={{ 
          paddingTop: '20px', 
          paddingBottom: '20px', 
          overflow: 'visible', 
          position: 'relative'
        }}
      >
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          min={min}
          max={max}
          step={step}
          sx={{
            color: '#10b981',
            height: 6,
            marginTop: '16px',
            marginBottom: '16px',
            overflow: 'visible',
            '& .MuiSlider-track': {
              border: 'none',
              background: 'linear-gradient(90deg, #10b981, #059669)',
            },
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              backgroundColor: '#fff',
              border: '3px solid #10b981',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              zIndex: 100,
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.16)',
                border: '3px solid #059669',
              },
              '&:before': {
                display: 'none',
              },
            },
          }}
        />
      </div>
    </motion.div>
  )
}

// Add display name
RangeSlider.displayName = 'RangeSlider'

// Filter Sidebar Component
const FilterSidebar: React.FC<{
  filters: {
    priceRange: [number, number];
    msrpRange: [number, number];
    yearRange: [number, number];
    makes: string[];
    models: string[];
    mileageRange: [number, number];
    locations: string[];
    features: string[];
    availableOnly: boolean;
  };
  updateFilter: (key: string, value: unknown) => void;
  clearAllFilters: () => void;
  uniqueMakes: string[];
  uniqueModels: string[];
  uniqueLocations: string[];
  allFeatures: string[];
  filteredVehicles: MockVehicle[];
  setIsFilterOpen?: (open: boolean) => void;
}> = React.memo(({ filters, updateFilter, clearAllFilters, uniqueMakes, uniqueModels, uniqueLocations, allFeatures, filteredVehicles, setIsFilterOpen }) => {

  const CheckboxList: React.FC<{
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
  }> = ({ label, options, selected, onChange }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const displayOptions = isExpanded ? options : options.slice(0, 5)
    
    const toggleOption = (option: string) => {
      if (selected.includes(option)) {
        onChange(selected.filter(item => item !== option))
      } else {
        onChange([...selected, option])
      }
    }

    return (
      <div className="space-y-2 sm:space-y-4">
        <label className="text-sm sm:text-base font-semibold text-slate-800">{label}</label>
        <div className="space-y-2 sm:space-y-3">
          {displayOptions.map((option) => (
            <SafeMotionDiv
              key={option}
              className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-4 rounded-[8px] sm:rounded-[12px] cursor-pointer will-change-transform overflow-hidden min-h-[44px] touch-manipulation"
              onClick={() => toggleOption(option)}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(8px) saturate(150%)',
                WebkitBackdropFilter: 'blur(8px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 1px 3px rgba(139, 69, 19, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              suppressHydrationWarning
            >
              <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded border transition-all will-change-transform flex-shrink-0 flex items-center justify-center ${
              selected.includes(option) 
                ? 'bg-emerald-600 border-emerald-600' 
                : 'border-slate-300 bg-white/50'
            }`}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}>
                {selected.includes(option) && (
                  <CheckIcon className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
                )}
              </div>
              <span className="text-sm sm:text-base text-slate-700 select-none truncate flex-1 font-medium" style={{ minWidth: 0 }}>{option}</span>
            </SafeMotionDiv>
          ))}
          {options.length > 5 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm sm:text-base text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 p-2 min-h-[44px] touch-manipulation rounded-lg hover:bg-emerald-50/50 transition-colors"
            >
              {isExpanded ? 'Show Less' : `Show ${options.length - 5} More`}
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Add display name
  CheckboxList.displayName = 'CheckboxList'

  return (
    <SafeMotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5
      }}
      className="w-full rounded-[16px] lg:rounded-[24px] will-change-transform overflow-visible lg:h-fit"
      style={{
        background: 'linear-gradient(135deg, rgba(254, 252, 250, 0.98) 0%, rgba(254, 252, 250, 0.92) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="sticky top-0 p-3 sm:p-6 z-10 border-b border-neutral-100/50"
        style={{
          background: 'linear-gradient(135deg, rgba(254, 252, 250, 0.98) 0%, rgba(254, 252, 250, 0.92) 100%)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 1px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-slate-800 mb-1 sm:mb-2 tracking-tight">
            <span className="text-slate-800">Filter </span>
            <span className="text-emerald-600 font-medium">Vehicles</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Find your perfect luxury vehicle
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <motion.button
            onClick={clearAllFilters}
            className="px-3 py-2 sm:py-2 text-xs sm:text-sm font-medium rounded-[8px] sm:rounded-[10px] will-change-transform min-h-[36px] sm:min-h-auto flex items-center justify-center flex-1 sm:flex-none text-slate-600 border border-slate-200 bg-white/60 hover:bg-white/80 hover:border-slate-300 transition-all"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            whileHover={{ 
              y: -1,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Clear All
          </motion.button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Price Range Slider */}
        <RangeSlider
          label="Monthly Payment"
          min={0}
          max={2000}
          value={filters.priceRange}
          onChange={(value) => updateFilter('priceRange', value)}
          prefix="$"
          suffix="/mo"
          step={25}
        />

        {/* MSRP Range Slider */}
        <RangeSlider
          label="Vehicle MSRP"
          min={20000}
          max={150000}
          value={filters.msrpRange}
          onChange={(value) => updateFilter('msrpRange', value)}
          prefix="$"
          step={1000}
          formatLabel={(value) => `$${(value / 1000).toFixed(0)}k`}
        />

        {/* Model Year Range Slider */}
        <RangeSlider
          label="Model Year"
          min={2024}
          max={2025}
          value={filters.yearRange}
          onChange={(value) => updateFilter('yearRange', value)}
          step={1}
          formatLabel={(value) => value.toString()}
        />

        {/* Mileage Range Slider */}
        <RangeSlider
          label="Mileage"
          min={0}
          max={20000}
          value={filters.mileageRange}
          onChange={(value) => updateFilter('mileageRange', value)}
          suffix=" mi"
          step={1000}
          formatLabel={(value) => value === 0 ? '0 mi' : `${(value / 1000).toFixed(0)}k mi`}
        />

        {/* Make/Brand */}
        <CheckboxList
          label="Make/Brand"
          options={uniqueMakes}
          selected={filters.makes}
          onChange={(selected) => updateFilter('makes', selected)}
        />

        {/* Model */}
        <CheckboxList
          label="Model"
          options={uniqueModels}
          selected={filters.models}
          onChange={(selected) => updateFilter('models', selected)}
        />

        {/* Location */}
        <CheckboxList
          label="Location"
          options={uniqueLocations}
          selected={filters.locations}
          onChange={(selected) => updateFilter('locations', selected)}
        />

        {/* Features */}
        <CheckboxList
          label="Features"
          options={allFeatures}
          selected={filters.features}
          onChange={(selected) => updateFilter('features', selected)}
        />

        {/* Availability */}
        <div className="space-y-2 sm:space-y-4">
          <label className="text-sm sm:text-base font-semibold text-slate-800">Availability</label>
          <SafeMotionDiv
            className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-4 rounded-[8px] sm:rounded-lg cursor-pointer transition-colors min-h-[44px] touch-manipulation"
            onClick={() => updateFilter('availableOnly', !filters.availableOnly)}
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none'
            }}
            suppressHydrationWarning
          >
            <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
              filters.availableOnly 
                ? 'bg-emerald-600 border-emerald-600' 
                : 'border-slate-300 bg-white/50 hover:border-emerald-400'
            }`}>
              {filters.availableOnly && (
                <CheckIcon className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
              )}
            </div>
            <span className="text-sm sm:text-base text-slate-700 select-none font-medium">Available Only</span>
          </SafeMotionDiv>
        </div>

        {/* Mobile Apply Button - Enhanced */}
        <div className="lg:hidden pt-6 border-t border-slate-200/30 sticky bottom-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
            backdropFilter: 'blur(16px) saturate(150%)',
          }}
        >
          <motion.button
            onClick={() => {
              if (setIsFilterOpen) {
                setIsFilterOpen(false)
              }
            }}
            className="w-full text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all min-h-[52px] touch-manipulation flex items-center justify-center gap-3 text-base"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3), 0 4px 16px rgba(16, 185, 129, 0.2)',
            }}
            whileHover={{ 
              scale: 1.02,
              y: -2,
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4), 0 6px 20px rgba(16, 185, 129, 0.25)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Apply Filters</span>
            <div className="bg-white/20 px-3 py-1 rounded-full font-bold text-sm backdrop-blur-sm">
              {filteredVehicles.length}
            </div>
          </motion.button>
        </div>
      </div>


    </SafeMotionDiv>
  )
})

// Add display name for FilterSidebar
FilterSidebar.displayName = 'FilterSidebar'

function InventoryPageContent() {
  // Test Tailwind
  console.log('Testing Tailwind CSS...');
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  // Mobile-responsive filter sidebar state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles)
  // Centralized favorites state management
  const [favoriteVehicles, setFavoriteVehicles] = useState<Set<number>>(new Set())
  // Client-side hydration fix
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)

  // Fix hydration issues by detecting client-side rendering
  useEffect(() => {
    setIsClient(true)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    // Delay animations until after hydration
    const timer = setTimeout(() => {
      setAnimationsReady(true)
    }, 100)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
      clearTimeout(timer)
    }
  }, [])
  
  const [filters, setFilters] = useState<{
    priceRange: [number, number];
    msrpRange: [number, number];
    yearRange: [number, number];
    makes: string[];
    models: string[];
    mileageRange: [number, number];
    locations: string[];
    features: string[];
    availableOnly: boolean;
  }>({
    priceRange: [0, 2000],
    msrpRange: [20000, 150000],
    yearRange: [2024, 2025],
    makes: [],
    models: [],
    mileageRange: [0, 20000],
    locations: [],
    features: [],
    availableOnly: false
  })

  // Extract unique values for filter options
  const uniqueMakes = useMemo(() => {
    const makes = [...new Set(mockVehicles.map(v => v.make))].sort()
    console.log('uniqueMakes:', makes)
    return makes
  }, [])
  const uniqueModels = useMemo(() => [...new Set(mockVehicles.map(v => v.model))].sort(), [])
  const uniqueLocations = useMemo(() => [...new Set(mockVehicles.map(v => v.location))].sort(), [])
  const allFeatures = useMemo(() => [...new Set(mockVehicles.flatMap(v => v.features))].sort(), [])

  const updateFilter = useCallback((key: string, value: unknown) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    // Note: Removed auto-close behavior to allow users to select multiple filters before applying
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 2000],
      msrpRange: [20000, 150000],
      yearRange: [2024, 2025],
      makes: [],
      models: [],
      mileageRange: [0, 20000],
      locations: [],
      features: [],
      availableOnly: false
    })
    setSearchQuery('')
  }, [])

  const toggleFavorite = useCallback((vehicleId: number) => {
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

  useEffect(() => {
    let filtered = [...mockVehicles]
    
    console.log('Starting filter process. Total vehicles:', filtered.length)
    console.log('Current filters:', filters)
    console.log('Search query:', searchQuery)
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
      console.log('After search filter:', filtered.length, 'vehicles')
    }

    // Apply all filters
    filtered = filtered.filter(vehicle => {
      console.log(`\n--- Filtering vehicle: ${vehicle.make} ${vehicle.model} ---`)
      
      // Convert price to monthly lease estimate for price range filter
      const monthlyLease = Math.round(vehicle.price / 60) // Rough estimate: price / 60 months
      console.log(`Monthly lease estimate: ${monthlyLease}, range: [${filters.priceRange[0]}, ${filters.priceRange[1]}]`)
      if (monthlyLease < filters.priceRange[0] || monthlyLease > filters.priceRange[1]) {
        console.log('❌ Filtered out by price range')
        return false
      }
      
      console.log(`MSRP: ${vehicle.msrp}, range: [${filters.msrpRange[0]}, ${filters.msrpRange[1]}]`)
      if (vehicle.msrp < filters.msrpRange[0] || vehicle.msrp > filters.msrpRange[1]) {
        console.log('❌ Filtered out by MSRP range')
        return false
      }
      
      console.log(`Year: ${vehicle.year}, range: [${filters.yearRange[0]}, ${filters.yearRange[1]}]`)
      if (vehicle.year < filters.yearRange[0] || vehicle.year > filters.yearRange[1]) {
        console.log('❌ Filtered out by year range')
        return false
      }
      
      console.log(`Mileage: ${vehicle.mileage}, range: [${filters.mileageRange[0]}, ${filters.mileageRange[1]}]`)
      if (vehicle.mileage < filters.mileageRange[0] || vehicle.mileage > filters.mileageRange[1]) {
        console.log('❌ Filtered out by mileage range')
        return false
      }
      
      // Debug make filtering
      if (filters.makes.length > 0) {
        console.log(`Make filtering: vehicle.make="${vehicle.make}", selected makes:`, filters.makes)
        console.log(`Includes check:`, filters.makes.includes(vehicle.make))
        if (!filters.makes.includes(vehicle.make)) {
          console.log('❌ Filtered out by make')
          return false
        }
      }
      
      if (filters.models.length > 0) {
        console.log(`Model filtering: vehicle.model="${vehicle.model}", selected models:`, filters.models)
        if (!filters.models.includes(vehicle.model)) {
          console.log('❌ Filtered out by model')
          return false
        }
      }
      
      if (filters.locations.length > 0) {
        console.log(`Location filtering: vehicle.location="${vehicle.location}", selected locations:`, filters.locations)
        if (!filters.locations.includes(vehicle.location)) {
          console.log('❌ Filtered out by location')
          return false
        }
      }
      
      if (filters.features.length > 0) {
        console.log(`Feature filtering: vehicle.features=`, vehicle.features, 'selected features:', filters.features)
        if (!filters.features.some(f => vehicle.features.includes(f))) {
          console.log('❌ Filtered out by features')
          return false
        }
      }
      
      if (filters.availableOnly && !vehicle.available) {
        console.log('❌ Filtered out by availability')
        return false
      }
      
      console.log('✅ Vehicle passed all filters')
      return true
    })

    console.log('Final filtered vehicles:', filtered.length)
    console.log('Final filtered vehicles list:', filtered.map(v => `${v.make} ${v.model}`))

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'savings':
        filtered.sort((a, b) => b.savings - a.savings)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => b.year - a.year || a.mileage - b.mileage)
        break
    }

    setFilteredVehicles(filtered)
  }, [searchQuery, sortBy, filters])

  // Calculate active filters count (excluding default values)
  const getActiveFiltersCount = useCallback(() => {
    let count = 0
    
    // Count only non-default filter values
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000) count++
    if (filters.msrpRange[0] !== 20000 || filters.msrpRange[1] !== 150000) count++
    if (filters.yearRange[0] !== 2024 || filters.yearRange[1] !== 2025) count++
    if (filters.mileageRange[0] !== 0 || filters.mileageRange[1] !== 20000) count++
    if (filters.makes.length > 0) count++
    if (filters.models.length > 0) count++
    if (filters.locations.length > 0) count++
    if (filters.features.length > 0) count++
    if (filters.availableOnly) count++
    if (searchQuery.trim()) count++
    
    return count
  }, [filters, searchQuery])

  const activeFiltersCount = getActiveFiltersCount()

  // Manage body scroll when filter is open on mobile - removed conflicting overflow management

  return (
    <PageBackground>
      <Header />
      
      <main className="pt-20">

        
        {/* Page Header */}
        <section className="py-8 sm:py-12 lg:py-20 relative overflow-hidden z-10">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              willChange: 'background',
              transform: 'translateZ(0)',
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
              }}
            >
              <PremiumBadge 
                icon={({ className }: { className?: string }) => (
                  <span className={`w-2 h-2 bg-emerald-600 rounded-full block drop-shadow-sm ${className}`}
                    style={{
                      boxShadow: '0 0 6px rgba(5, 150, 105, 0.4)'
                    }}
                  />
                )}
              >
                200+ Premium Vehicles Available
              </PremiumBadge>
              
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight">
                <span className="text-neutral-800">Luxury Vehicle </span>
                <span className="text-emerald-600">Inventory</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                Browse our curated selection of premium vehicles. Each comes with our professional 
                negotiation service and <span className="font-semibold text-emerald-600">guaranteed savings</span>.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6 sm:mt-8 lg:mt-12">
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-sm sm:text-base">Brand New Vehicles</span>
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-sm sm:text-base">Best Price Guarantee</span>
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-sm sm:text-base">Home Delivery</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Area with Responsive Layout */}
        <div className="container mx-auto px-4 relative pb-16 sm:pb-24 lg:pb-32">
          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4 sm:mb-6">
              <motion.button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl font-medium shadow-lg hover:shadow-xl border border-slate-200/50 transition-all duration-300 min-h-[44px] touch-manipulation"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.90) 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FunnelIcon className="w-5 h-5 text-emerald-600" />
                <span>Filter & Sort</span>
                {activeFiltersCount > 0 && (
                  <div className="ml-auto bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">
                    {activeFiltersCount}
                  </div>
                )}
              </motion.button>
            </div>

            {/* Filter Sidebar - Desktop sticky, Mobile side drawer */}
            <div className={`
              lg:w-80 lg:flex-shrink-0 lg:h-full
              ${isFilterOpen ? 'fixed inset-0 z-50 lg:relative lg:inset-auto' : 'hidden lg:block'}
            `}>
              {/* Mobile Backdrop with blur */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden touch-none"
                    onClick={() => setIsFilterOpen(false)}
                    style={{ 
                      overscrollBehavior: 'contain',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* Sidebar Content - Slide from left */}
              <AnimatePresence>
                {(isFilterOpen || !isClient || !isMobile) && (
                  <motion.div 
                    initial={{ x: isClient && isMobile ? -400 : 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isClient && isMobile ? -400 : 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30, 
                      mass: 0.8,
                      duration: 0.4
                    }}
                    className={`
                      lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overflow-x-hidden
                      ${isFilterOpen ? 'fixed left-0 top-0 bottom-0 w-96 max-w-[85vw] z-50 overflow-y-auto' : ''}
                    `}
                    style={{
                      background: isClient && isMobile ? 
                        'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.96) 100%)' :
                        'transparent',
                      backdropFilter: isClient && isMobile ? 
                        'blur(20px) saturate(180%)' : 
                        'none',
                      WebkitBackdropFilter: isClient && isMobile ? 
                        'blur(20px) saturate(180%)' : 
                        'none',
                      boxShadow: isClient && isMobile ?
                        '4px 0 32px rgba(0, 0, 0, 0.12), 8px 0 64px rgba(0, 0, 0, 0.08)' :
                        'none',
                    }}
                    suppressHydrationWarning
                  >
                    {/* Mobile Header with improved close button */}
                    {isFilterOpen && (
                      <div className="lg:hidden sticky top-0 z-20 p-6 border-b border-slate-200/30"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.92) 100%)',
                          backdropFilter: 'blur(12px) saturate(150%)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">Filter Vehicles</h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {activeFiltersCount > 0 ? `${activeFiltersCount} filters active • ` : ''}{filteredVehicles.length} vehicles found
                            </p>
                          </div>
                          <motion.button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 rounded-xl bg-slate-100/60 hover:bg-slate-200/60 text-slate-600 hover:text-slate-800 transition-all duration-200 backdrop-blur-sm"
                            whileHover={{ scale: 1.05, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XMarkIcon className="w-6 h-6" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                    
                    <FilterSidebar
                      filters={filters}
                      updateFilter={updateFilter}
                      clearAllFilters={clearAllFilters}
                      uniqueMakes={uniqueMakes}
                      uniqueModels={uniqueModels}
                      uniqueLocations={uniqueLocations}
                      allFeatures={allFeatures}
                      filteredVehicles={filteredVehicles}
                      setIsFilterOpen={setIsFilterOpen}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 lg:min-w-0">
              {/* Search Controls - Top of L */}
              <motion.div 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-[24px] mb-10 will-change-transform"
                style={{
                  background: '#FEFCFA',
                  boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search by make, model, or year..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 lg:py-4 border-2 border-neutral-200 rounded-[16px] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-200 bg-white will-change-transform"
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      }}
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex gap-3 lg:gap-4">
                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 lg:flex-none px-3 lg:px-4 py-3 lg:py-4 border-2 border-neutral-200 rounded-[16px] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-200 bg-white lg:min-w-[200px] text-sm lg:text-base"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="savings">Highest Savings</option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex border-2 border-neutral-200 rounded-[16px] overflow-hidden bg-white">
                      <motion.button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 lg:px-4 py-3 lg:py-4 transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-emerald-600 text-white shadow-lg' 
                            : 'bg-white text-neutral-600 hover:bg-neutral-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Squares2X2Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => setViewMode('list')}
                        className={`px-3 lg:px-4 py-3 lg:py-4 transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-emerald-600 text-white shadow-lg' 
                            : 'bg-white text-neutral-600 hover:bg-neutral-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ListBulletIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Results Info */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-neutral-600">
                    Showing <span className="font-semibold text-emerald-600">{filteredVehicles.length}</span> of <span className="font-semibold">{mockVehicles.length}</span> luxury vehicles
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span>In Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Best Deals</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Vehicle Grid - Right below search bar */}
              <div className="grid gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'opacity',
                  opacity: 1
                }}
              >
                {filteredVehicles.map((vehicle, index) => (
                  <div key={vehicle.id}
                    style={{
                      transform: 'none',
                      willChange: 'transform, opacity',
                      opacity: 1
                    }}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      viewMode={viewMode}
                      isFavorited={favoriteVehicles.has(vehicle.id)}
                      onFavoriteToggle={toggleFavorite}
                    />
                  </div>
                ))}
              </div>

              {filteredVehicles.length === 0 && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="p-12 max-w-2xl mx-auto rounded-[20px]"
                    style={{
                      background: '#FEFCFA',
                      boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
                    }}
                  >
                    <div className="text-6xl mb-6 opacity-30">🔍</div>
                    <h3 className="text-3xl font-bold text-neutral-800 mb-6">
                      No vehicles found
                    </h3>
                    <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                      Try adjusting your search criteria or contact our experts to help you find your perfect vehicle.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button 
                        onClick={() => setSearchQuery('')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-[14px] text-lg transition-all duration-300 group"
                        style={{
                          boxShadow: '0 6px 16px -3px rgba(5, 150, 105, 0.3), 0 12px 32px -6px rgba(5, 150, 105, 0.2), 0 24px 48px -12px rgba(0, 0, 0, 0.15), inset 0 1.5px 0 rgba(255, 255, 255, 0.1)',
                        }}
                        whileHover={{ 
                          y: -2, 
                          scale: 1.01,
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                          boxShadow: '0 8px 20px -3px rgba(5, 150, 105, 0.4), 0 16px 36px -6px rgba(5, 150, 105, 0.25), 0 32px 60px -12px rgba(0, 0, 0, 0.2), inset 0 1.5px 0 rgba(255, 255, 255, 0.15)',
                        }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Clear Search
                      </motion.button>
                      <button 
                        onClick={() => window.location.href = '/lead'}
                        className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-[14px] text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                      >
                        Contact Our Team
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <SectionBackground>
        <Footer />
      </SectionBackground>
    </PageBackground>
  )
}

export default function InventoryPage() {
  return (
    <ErrorBoundary>
      <InventoryPageContent />
    </ErrorBoundary>
  )
} 