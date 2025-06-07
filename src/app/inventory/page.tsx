'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid'

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
  image: string
  features: string[]
  location: string
  available: boolean
}

const mockVehicles: MockVehicle[] = [
  {
    id: 1,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    trim: 'xDrive40i',
    price: 68500,
    msrp: 75200,
    savings: 6700,
    mileage: 12000,
    mpg: '21/26',
    engine: '3.0L Turbo I6',
    image: '/vehicles/bmw-x5.jpg',
    features: ['Premium Package', 'Harman Kardon Audio', 'Panoramic Roof'],
    location: 'Beverly Hills, CA',
    available: true
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'GLC 300',
    year: 2024,
    trim: '4MATIC',
    price: 52800,
    msrp: 58900,
    savings: 6100,
    mileage: 8500,
    mpg: '22/29',
    engine: '2.0L Turbo I4',
    image: '/vehicles/mercedes-glc.jpg',
    features: ['MBUX Infotainment', 'LED Headlights', 'Apple CarPlay'],
    location: 'Manhattan, NY',
    available: true
  },
  {
    id: 3,
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    trim: 'Premium Plus',
    price: 71200,
    msrp: 79600,
    savings: 8400,
    mileage: 15200,
    mpg: '19/25',
    engine: '3.0L Turbo V6',
    image: '/vehicles/audi-q7.jpg',
    features: ['Virtual Cockpit', 'Bang & Olufsen Audio', 'Quattro AWD'],
    location: 'Austin, TX',
    available: true
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    trim: 'Long Range',
    price: 51200,
    msrp: 55700,
    savings: 4500,
    mileage: 5800,
    mpg: '131 MPGe',
    engine: 'Dual Motor AWD',
    image: '/vehicles/tesla-model-y.jpg',
    features: ['Autopilot', '15" Touchscreen', 'Supercharging'],
    location: 'Seattle, WA',
    available: true
  },
  {
    id: 5,
    make: 'Lexus',
    model: 'RX 350',
    year: 2023,
    trim: 'Luxury',
    price: 56300,
    msrp: 62600,
    savings: 6300,
    mileage: 18400,
    mpg: '20/27',
    engine: '3.5L V6',
    image: '/vehicles/lexus-rx.jpg',
    features: ['Mark Levinson Audio', 'Safety System+', 'Heated Seats'],
    location: 'Miami, FL',
    available: true
  },
  {
    id: 6,
    make: 'Porsche',
    model: 'Macan',
    year: 2024,
    trim: 'S',
    price: 72900,
    msrp: 81400,
    savings: 8500,
    mileage: 3200,
    mpg: '19/25',
    engine: '2.9L Twin-Turbo V6',
    image: '/vehicles/porsche-macan.jpg',
    features: ['Sport Chrono', 'BOSE Audio', 'Air Suspension'],
    location: 'Newport Beach, CA',
    available: true
  }
]

// Ultra-smooth 120fps button animation variants
const viewDetailsVariants = {
  default: {
    backgroundColor: '#059669',
    color: '#ffffff',
    border: '2px solid #059669',
    boxShadow: '0 6px 16px -3px rgba(5, 150, 105, 0.3), 0 12px 32px -6px rgba(5, 150, 105, 0.2), 0 24px 48px -12px rgba(0, 0, 0, 0.15), inset 0 1.5px 0 rgba(255, 255, 255, 0.1)',
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'brightness(1) saturate(1)',
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 40,
      mass: 0.5,
      restDelta: 0.001,
      restSpeed: 0.001
    }
  },
  hover: {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
    boxShadow: '0 12px 32px -3px rgba(5, 150, 105, 0.5), 0 24px 48px -6px rgba(5, 150, 105, 0.3), 0 40px 80px -12px rgba(0, 0, 0, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
    y: -4,
    scale: 1.03,
    rotateX: -2,
    filter: 'brightness(1.1) saturate(1.2)',
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 35,
      mass: 0.3,
      restDelta: 0.001,
      restSpeed: 0.001,
      duration: 0.15
    }
  }
}

// Smooth consultation button animation
const consultationButtonVariants = {
  default: {
    backgroundColor: 'transparent',
    borderColor: '#059669',
    color: '#059669',
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: 'brightness(1)',
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 40,
      mass: 0.5,
      restDelta: 0.001,
      restSpeed: 0.001
    }
  },
  hover: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: '#ffffff',
    scale: 1.04,
    y: -3,
    rotateX: -2,
    filter: 'brightness(1.1)',
    boxShadow: '0 8px 24px -3px rgba(220, 38, 38, 0.4), 0 16px 32px -6px rgba(220, 38, 38, 0.25)',
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 35,
      mass: 0.3,
      restDelta: 0.001,
      restSpeed: 0.001,
      duration: 0.12
    }
  }
}

const VehicleCard: React.FC<{ vehicle: MockVehicle; viewMode: 'grid' | 'list' }> = React.memo(({ vehicle, viewMode }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  
  // Memoized handlers for better performance
  const handleFavoriteToggle = useCallback(() => {
    setIsFavorited(prev => !prev)
  }, [])
  
  const handleViewDetails = useCallback(() => {
    window.location.href = '/inventory'
  }, [])
  
  const handleBookConsultation = useCallback(() => {
    window.location.href = '/booking'
  }, [])
  
  if (viewMode === 'list') {
    return (
          <motion.div
      layoutId={`vehicle-${vehicle.id}-list`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -6, 
        scale: 1.01,
        rotateX: -1,
        boxShadow: '0 12px 40px rgba(139, 69, 19, 0.12), 0 24px 80px rgba(139, 69, 19, 0.06)',
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.4,
          restDelta: 0.001,
          restSpeed: 0.001
        }
      }}
      className="p-8 rounded-[20px] group will-change-transform backface-hidden"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
        transformStyle: 'preserve-3d',
        WebkitFontSmoothing: 'antialiased',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vehicle Image */}
          <div className="w-full lg:w-96 h-56 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-[16px] overflow-hidden relative group-hover:shadow-lg transition-all duration-300 m-4 mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2 opacity-30">🚗</div>
                <span className="text-neutral-600 font-semibold text-lg">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </div>
            </div>
            
            {/* Savings Badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-[10px] shadow-lg">
              Save ${vehicle.savings.toLocaleString()}
            </div>
            
            {/* Favorite Button */}
            <motion.button
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HeartIcon className={`w-5 h-5 ${isFavorited ? 'text-red-500' : 'text-neutral-400'}`} />
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
                <div className="text-2xl font-bold text-neutral-800">{vehicle.mileage.toLocaleString()}</div>
                <div className="text-sm text-neutral-500">Miles</div>
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
                className="flex-1 font-semibold px-8 py-4 rounded-[14px] text-lg will-change-transform backface-hidden"
                style={{ 
                  transformStyle: 'preserve-3d',
                  WebkitFontSmoothing: 'antialiased',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                variants={viewDetailsVariants}
                initial="default"
                whileHover="hover"
                whileTap={{ 
                  scale: 0.97, 
                  y: -1,
                  transition: { 
                    type: "spring", 
                    stiffness: 1000, 
                    damping: 50,
                    duration: 0.1
                  }
                }}
              >
                View Details
              </motion.button>
              <motion.button 
                onClick={handleBookConsultation}
                className="flex-1 border-2 px-8 py-4 rounded-[14px] text-lg font-semibold will-change-transform backface-hidden"
                style={{ 
                  transformStyle: 'preserve-3d',
                  WebkitFontSmoothing: 'antialiased',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                variants={consultationButtonVariants}
                initial="default"
                whileHover="hover"
                whileTap={{ 
                  scale: 0.97, 
                  y: -1,
                  transition: { 
                    type: "spring", 
                    stiffness: 1000, 
                    damping: 50,
                    duration: 0.1
                  }
                }}
              >
                Book Consultation
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateX: -2,
        rotateY: 1,
        boxShadow: '0 16px 48px rgba(139, 69, 19, 0.15), 0 32px 96px rgba(139, 69, 19, 0.08)',
        transition: {
          type: "spring",
          stiffness: 700,
          damping: 35,
          mass: 0.3,
          restDelta: 0.001,
          restSpeed: 0.001
        }
      }}
      className="overflow-hidden rounded-[20px] group will-change-transform backface-hidden"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
        transformStyle: 'preserve-3d',
        WebkitFontSmoothing: 'antialiased',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* Vehicle Image */}
      <div className="relative h-56 bg-gradient-to-br from-neutral-200 to-neutral-300 overflow-hidden rounded-[16px] m-4 mb-3">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 opacity-30">🚗</div>
            <span className="text-neutral-600 font-semibold text-sm">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
        </div>
        
        {/* Savings Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-[10px] shadow-lg">
          Save ${vehicle.savings.toLocaleString()}
        </div>
        
        {/* Favorite Button */}
        <motion.button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-strong flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <HeartIcon className={`w-4 h-4 ${isFavorited ? 'text-red-500' : 'text-neutral-400'}`} />
        </motion.button>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-[10px] shadow-lg">
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
            <div className="font-bold text-neutral-800">{(vehicle.mileage / 1000).toFixed(0)}K</div>
            <div className="text-neutral-500">Miles</div>
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
            className="w-full font-semibold px-5 py-3 rounded-[14px] will-change-transform backface-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              WebkitFontSmoothing: 'antialiased',
              WebkitBackfaceVisibility: 'hidden'
            }}
            variants={viewDetailsVariants}
            initial="default"
            whileHover="hover"
            whileTap={{ 
              scale: 0.97, 
              y: -1,
              transition: { 
                type: "spring", 
                stiffness: 1000, 
                damping: 50,
                duration: 0.1
              }
            }}
          >
            View Details
          </motion.button>
          <motion.button 
            onClick={handleBookConsultation}
            className="w-full border-2 px-5 py-2.5 rounded-[14px] font-semibold will-change-transform backface-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              WebkitFontSmoothing: 'antialiased',
              WebkitBackfaceVisibility: 'hidden'
            }}
            variants={consultationButtonVariants}
            initial="default"
            whileHover="hover"
            whileTap={{ 
              scale: 0.97, 
              y: -1,
              transition: { 
                type: "spring", 
                stiffness: 1000, 
                damping: 50,
                duration: 0.1
              }
            }}
          >
            Book Consultation
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles)

  useEffect(() => {
    let filtered = [...mockVehicles]
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

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
  }, [searchQuery, sortBy])

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section 
          className="py-20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #FEF7ED 0%, #FEFCFA 50%, #FEF7ED 100%)',
          }}
        >
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #8B4513 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium text-neutral-700 mb-8"
              >
                <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                200+ Premium Vehicles Available
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="text-neutral-800">Luxury Vehicle </span>
                <span className="text-emerald-600">Inventory</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Browse our curated selection of premium vehicles. Each comes with our professional 
                negotiation service and <span className="font-semibold text-emerald-600">guaranteed savings</span>.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12">
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="font-medium">Certified Pre-Owned</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">$</span>
                  </div>
                  <span className="font-medium">Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🚚</span>
                  </div>
                  <span className="font-medium">Free Delivery</span>
                </div>
              </div>
            </motion.div>

            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-[20px]"
                style={{
                  background: '#FEFCFA',
                  boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search by make, model, or year..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-[16px] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-200 bg-white"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-4 border-2 border-neutral-200 rounded-[16px] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-200 bg-white min-w-[200px]"
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
                                              className={`px-4 py-4 transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-emerald-600 text-white shadow-lg' 
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Squares2X2Icon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode('list')}
                                              className={`px-4 py-4 transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-emerald-600 text-white shadow-lg' 
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ListBulletIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Filter Button */}
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-3 px-6 py-4 border-2 border-neutral-200 rounded-[16px] hover:bg-neutral-50 hover:border-emerald-600 transition-all duration-200 bg-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FunnelIcon className="w-5 h-5" />
                    <span className="font-medium">Filters</span>
                  </motion.button>
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
            </div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section 
          className="py-20"
          style={{
            background: 'linear-gradient(180deg, #FEF7ED 0%, #FEFCFA 50%, #FEF7ED 100%)',
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-6xl mx-auto'
              }`}
            >
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={`${vehicle.id}-${viewMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: Math.min(index * 0.05, 0.5),
                    ease: "easeOut"
                  }}
                >
                  <VehicleCard 
                    vehicle={vehicle} 
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>

            {filteredVehicles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
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
                      onClick={() => window.location.href = '/booking'}
                      className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-[14px] text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                    >
                      Contact Our Team
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 