'use client'

import React, { useState, useEffect } from 'react'
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

const VehicleCard: React.FC<{ vehicle: MockVehicle; viewMode: 'grid' | 'list' }> = ({ vehicle, viewMode }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="glass luxury-card p-8 hover:shadow-luxury transition-all duration-300 group"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vehicle Image */}
          <div className="w-full lg:w-96 h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl overflow-hidden relative group-hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2 opacity-30">🚗</div>
                <span className="text-neutral-600 font-semibold text-lg">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </div>
            </div>
            
            {/* Savings Badge */}
            <motion.div 
              className="absolute top-4 left-4 bg-gradient-to-r from-gold-primary to-gold-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Save ${vehicle.savings.toLocaleString()}
            </motion.div>
            
            {/* Favorite Button */}
            <motion.button
              onClick={() => setIsFavorited(!isFavorited)}
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
                  <span className="w-2 h-2 bg-primary-emerald rounded-full mr-2"></span>
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
                    className="px-3 py-1 bg-primary-emerald/10 text-primary-emerald text-sm rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.location.href = '/inventory'}
                className="flex-1 bg-gradient-emerald text-white px-8 py-4 rounded-xl font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                View Details
              </button>
              <button 
                onClick={() => window.location.href = '/booking'}
                className="flex-1 border-2 border-primary-emerald text-primary-emerald px-8 py-4 rounded-xl font-semibold hover:bg-primary-emerald hover:text-white transition-all duration-300"
              >
                Book Consultation
              </button>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass luxury-card overflow-hidden hover:shadow-luxury transition-all duration-300 group"
    >
      {/* Vehicle Image */}
      <div className="relative h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-primary-emerald-light/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 opacity-30">🚗</div>
            <span className="text-neutral-600 font-semibold text-sm">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
        </div>
        
        {/* Savings Badge */}
        <motion.div 
          className="absolute top-3 left-3 bg-gradient-to-r from-gold-primary to-gold-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Save ${vehicle.savings.toLocaleString()}
        </motion.div>
        
        {/* Favorite Button */}
        <motion.button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-strong flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <HeartIcon className={`w-4 h-4 ${isFavorited ? 'text-red-500' : 'text-neutral-400'}`} />
        </motion.button>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 right-3 bg-primary-emerald text-white px-2 py-1 rounded-full text-xs font-semibold">
          Available
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neutral-800 mb-1 group-hover:text-primary-emerald transition-colors">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-neutral-600 text-sm mb-2">{vehicle.trim}</p>
          <p className="text-xs text-neutral-500 flex items-center">
            <span className="w-1.5 h-1.5 bg-primary-emerald rounded-full mr-2"></span>
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
                className="px-2 py-1 bg-primary-emerald/10 text-primary-emerald text-xs rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 2 && (
              <span className="text-xs text-neutral-500 px-2 py-1 bg-neutral-100 rounded-full">
                +{vehicle.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.href = '/inventory'}
            className="w-full bg-gradient-emerald text-white px-4 py-3 rounded-lg font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            View Details
          </button>
          <button 
            onClick={() => window.location.href = '/booking'}
            className="w-full border-2 border-primary-emerald text-primary-emerald px-4 py-2.5 rounded-lg font-semibold hover:bg-primary-emerald hover:text-white transition-all duration-300"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </motion.div>
  )
}

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
        <section className="bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-radial opacity-30" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-radial opacity-30" />
          </div>
          
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
                <span className="w-2 h-2 bg-primary-emerald rounded-full"></span>
                200+ Premium Vehicles Available
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-neutral-800 mb-8 leading-tight">
                Luxury Vehicle <span className="gradient-text">Inventory</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Browse our curated selection of premium vehicles. Each comes with our professional 
                negotiation service and <span className="font-semibold text-primary-emerald">guaranteed savings</span>.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12">
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="font-medium">Certified Pre-Owned</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">$</span>
                  </div>
                  <span className="font-medium">Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
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
                className="glass luxury-card p-8"
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
                      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-emerald focus:border-primary-emerald transition-all duration-200 bg-white"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-emerald focus:border-primary-emerald transition-all duration-200 bg-white min-w-[200px]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="savings">Highest Savings</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border-2 border-neutral-200 rounded-xl overflow-hidden bg-white">
                    <motion.button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-4 transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-primary-emerald text-white shadow-lg' 
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
                          ? 'bg-primary-emerald text-white shadow-lg' 
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
                    className="flex items-center gap-3 px-6 py-4 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-primary-emerald transition-all duration-200 bg-white"
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
                    Showing <span className="font-semibold text-primary-emerald">{filteredVehicles.length}</span> of <span className="font-semibold">{mockVehicles.length}</span> luxury vehicles
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-emerald rounded-full"></div>
                      <span>In Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
                      <span>Best Deals</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="py-20 bg-white">
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
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                <div className="glass luxury-card p-12 max-w-2xl mx-auto">
                  <div className="text-6xl mb-6 opacity-30">🔍</div>
                  <h3 className="text-3xl font-bold text-neutral-800 mb-6">
                    No vehicles found
                  </h3>
                  <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                    Try adjusting your search criteria or contact our experts to help you find your perfect vehicle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="bg-gradient-emerald text-white px-8 py-4 rounded-xl font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
                    >
                      Clear Search
                    </button>
                    <button 
                      onClick={() => window.location.href = '/booking'}
                      className="border-2 border-primary-emerald text-primary-emerald px-8 py-4 rounded-xl font-semibold hover:bg-primary-emerald hover:text-white transition-all duration-300"
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