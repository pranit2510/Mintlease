'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon, XMarkIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Slider, Box, Typography, ThemeProvider, createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'

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
    year: 2024,
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
    mileage: 9500,
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
    year: 2024,
    trim: 'Premium Plus',
    price: 71200,
    msrp: 79600,
    savings: 8400,
    mileage: 15000,
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
    mileage: 6000,
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
    year: 2024,
    trim: 'Luxury',
    price: 56300,
    msrp: 62600,
    savings: 6300,
    mileage: 14800,
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
    mileage: 5200,
    mpg: '19/25',
    engine: '2.9L Twin-Turbo V6',
    image: '/vehicles/porsche-macan.jpg',
    features: ['Sport Chrono', 'BOSE Audio', 'Air Suspension'],
    location: 'Newport Beach, CA',
    available: true
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
      initial={{ opacity: 1, y: 20 }}
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
          <div className="w-full lg:w-96 h-56 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-[20px] overflow-hidden relative group-hover:shadow-lg transition-all duration-300 m-4 mb-3">
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
                onClick={handleBookConsultation}
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
      initial={{ opacity: 1, y: 20 }}
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
      <div className="relative h-56 bg-gradient-to-br from-neutral-200 to-neutral-300 overflow-hidden rounded-[20px] m-4 mb-3">
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
            onClick={handleBookConsultation}
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
            Book Consultation
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

// Custom Material UI theme for luxury aesthetic
const luxuryTheme = createTheme({
  palette: {
    primary: {
      main: '#047857', // emerald-700
    },
    secondary: {
      main: '#f59e0b', // amber-500
    },
  },
})

// Styled Material UI Slider for luxury aesthetic
const LuxurySlider = styled(Slider)(({ theme }) => ({
  color: '#047857',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(45deg, #047857, #059669)',
    borderRadius: 4,
  },
  '& .MuiSlider-rail': {
    background: 'rgba(5, 150, 105, 0.1)',
    borderRadius: 4,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '3px solid #047857',
    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(5, 150, 105, 0.15)',
      border: '3px solid #059669',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'linear-gradient(45deg, #047857, #059669)',
    padding: '6px 12px',
    borderRadius: '8px',
    '&:before': {
      color: '#047857',
    },
  },
}))

// Luxury Range Slider Component
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
  const handleChange = (_: Event, newValue: number | number[]) => {
    onChange(newValue as [number, number])
  }

  const formatValue = (val: number) => {
    if (formatLabel) return formatLabel(val)
    return `${prefix}${val.toLocaleString()}${suffix}`
  }

  return (
    <motion.div
      className="bg-white/60 backdrop-blur-xl border border-emerald-100/50 rounded-2xl p-6 shadow-luxury hover:shadow-luxury-lg transition-all duration-300"
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography
            variant="subtitle2"
            className="text-neutral-700 font-semibold"
          >
            {label}
          </Typography>
          <Typography
            variant="caption"
            className="text-emerald-600 font-medium"
          >
            {formatValue(value[0])} - {formatValue(value[1])}
          </Typography>
        </div>
        
        <ThemeProvider theme={luxuryTheme}>
          <Box sx={{ px: 1 }}>
            <LuxurySlider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatValue}
              min={min}
              max={max}
              step={step}
              disableSwap
            />
          </Box>
        </ThemeProvider>
        
        <div className="flex justify-between text-xs text-neutral-500">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Filter Sidebar Component
const FilterSidebar: React.FC<{
  filters: any;
  updateFilter: (key: string, value: any) => void;
  clearAllFilters: () => void;
  uniqueMakes: string[];
  uniqueModels: string[];
  uniqueLocations: string[];
  allFeatures: string[];
}> = React.memo(({ filters, updateFilter, clearAllFilters, uniqueMakes, uniqueModels, uniqueLocations, allFeatures }) => {
  
  // Enhanced number formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
      <div className="space-y-3">
        <label className="text-sm font-semibold text-neutral-800">{label}</label>
        <div className="space-y-2">
          {displayOptions.map((option) => (
            <motion.div
              key={option}
              className="flex items-center gap-3 p-3 rounded-[12px] cursor-pointer will-change-transform"
              onClick={() => toggleOption(option)}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              whileHover={{ 
                backgroundColor: 'rgba(5, 150, 105, 0.05)',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)',
                y: -1,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all will-change-transform ${
              selected.includes(option) 
                ? 'bg-emerald-600 border-emerald-600' 
                : 'border-neutral-300'
            }`}
            style={{
              boxShadow: selected.includes(option) 
                ? '0 2px 8px rgba(5, 150, 105, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}>
                {selected.includes(option) && (
                  <CheckIcon className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-sm text-neutral-700 select-none">{option}</span>
            </motion.div>
          ))}
          {options.length > 5 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              {isExpanded ? 'Show Less' : `Show ${options.length - 5} More`}
              <ChevronDownIcon className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 1, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12), 0 16px 64px rgba(139, 69, 19, 0.06)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="w-full rounded-[24px] will-change-transform"
      style={{
        background: '#FEFCFA',
        boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06), 0 4px 24px rgba(139, 69, 19, 0.03), 0 8px 48px rgba(0, 0, 0, 0.02)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      {/* Header */}
      <div className="sticky top-0 p-6 z-10 border-b border-neutral-100"
        style={{
          background: 'rgba(254, 252, 250, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            <span className="text-neutral-800">Filter </span>
            <span className="text-emerald-600">Vehicles</span>
          </h2>
          <p className="text-sm text-neutral-600">
            Find your perfect luxury vehicle
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={clearAllFilters}
            className="px-4 py-2 text-sm font-medium rounded-[10px] border will-change-transform"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#059669',
              color: '#059669',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            whileHover={{ 
              backgroundColor: '#059669',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
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
      <div className="p-6 space-y-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
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
          min={5000}
          max={20000}
          value={filters.mileageRange}
          onChange={(value) => updateFilter('mileageRange', value)}
          suffix=" mi"
          step={5000}
          formatLabel={(value) => `${(value / 1000).toFixed(0)}k mi`}
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
        <div className="space-y-3">
          <label className="text-sm font-semibold text-neutral-800">Availability</label>
          <motion.div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
            onClick={() => updateFilter('availableOnly', !filters.availableOnly)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
              filters.availableOnly 
                ? 'bg-emerald-600 border-emerald-600 shadow-sm' 
                : 'border-neutral-300 hover:border-emerald-400 hover:shadow-sm'
            }`}>
              {filters.availableOnly && (
                <CheckIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-sm text-neutral-700 select-none">Available Only</span>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for smooth scrollbar */}
      <style jsx>{`
        /* Smooth custom scrollbar with theme colors */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(5, 150, 105, 0.05);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(5, 150, 105, 0.3);
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(5, 150, 105, 0.5);
        }
      `}</style>
    </motion.div>
  )
})

function InventoryPageContent() {
  // Test Tailwind
  console.log('Testing Tailwind CSS...');
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  // Filter sidebar is now always visible
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles)
  const [scrollY, setScrollY] = useState(0)
  
  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    msrpRange: [20000, 150000],
    yearRange: [2024, 2025],
    makes: [] as string[],
    models: [] as string[],
    mileageRange: [5000, 20000],
    locations: [] as string[],
    features: [] as string[],
    availableOnly: false
  })

  // Extract unique values for filter options
  const uniqueMakes = useMemo(() => [...new Set(mockVehicles.map(v => v.make))].sort(), [])
  const uniqueModels = useMemo(() => [...new Set(mockVehicles.map(v => v.model))].sort(), [])
  const uniqueLocations = useMemo(() => [...new Set(mockVehicles.map(v => v.location))].sort(), [])
  const allFeatures = useMemo(() => [...new Set(mockVehicles.flatMap(v => v.features))].sort(), [])

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 2000],
      msrpRange: [20000, 150000],
      yearRange: [2024, 2025],
      makes: [],
      models: [],
      mileageRange: [5000, 20000],
      locations: [],
      features: [],
      availableOnly: false
    })
    setSearchQuery('')
  }, [])

  useEffect(() => {
    let filtered = [...mockVehicles]
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply all filters
    filtered = filtered.filter(vehicle => {
      // Convert price to monthly lease estimate for price range filter
      const monthlyLease = Math.round(vehicle.price / 60) // Rough estimate: price / 60 months
      if (monthlyLease < filters.priceRange[0] || monthlyLease > filters.priceRange[1]) return false
      if (vehicle.msrp < filters.msrpRange[0] || vehicle.msrp > filters.msrpRange[1]) return false
      if (vehicle.year < filters.yearRange[0] || vehicle.year > filters.yearRange[1]) return false
      if (vehicle.mileage < filters.mileageRange[0] || vehicle.mileage > filters.mileageRange[1]) return false
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false
      if (filters.models.length > 0 && !filters.models.includes(vehicle.model)) return false
      if (filters.locations.length > 0 && !filters.locations.includes(vehicle.location)) return false
      if (filters.features.length > 0 && !filters.features.some(f => vehicle.features.includes(f))) return false
      if (filters.availableOnly && !vehicle.available) return false
      return true
    })

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

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Subtle background pattern */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8B4513 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            willChange: 'transform',
            transform: `translateY(${scrollY * 0.5}px) translateZ(0)`,
          }}
        />
        
        {/* Page Header */}
        <section className="py-20 relative overflow-hidden z-10">
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
              className="text-center mb-16"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
              }}
            >
              <motion.div
                initial={{ opacity: 1, scale: 0.9 }}
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
          </div>
        </section>

        {/* Main Content Area with L-shaped Layout */}
        <div className="container mx-auto px-4 relative pb-32">
          <div className="flex gap-6 relative">
            {/* Filter Sidebar - Fixed on left */}
            <div className="w-80 flex-shrink-0 h-full">
              <div 
                className="sticky"
                style={{ 
                  top: '6rem',
                  maxHeight: 'calc(100vh - 8rem)',
                  overflowY: 'auto'
                }}
              >
                <FilterSidebar
                  filters={filters}
                  updateFilter={updateFilter}
                  clearAllFilters={clearAllFilters}
                  uniqueMakes={uniqueMakes}
                  uniqueModels={uniqueModels}
                  uniqueLocations={uniqueLocations}
                  allFeatures={allFeatures}
                />
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1">
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
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search by make, model, or year..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-[16px] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-200 bg-white will-change-transform"
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      }}
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
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`grid gap-10 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'opacity',
                }}
              >
                {filteredVehicles.map((vehicle, index) => (
                                      <motion.div
                      key={`${vehicle.id}-${viewMode}`}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: Math.min(index * 0.05, 0.5),
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    style={{
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
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
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default function InventoryPage() {
  return (
    <ErrorBoundary>
      <InventoryPageContent />
    </ErrorBoundary>
  )
} 