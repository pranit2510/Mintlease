'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ArrowRight, Zap, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatCurrency, animationVariants } from '@/lib/utils'
import WebGLEnhancer from '@/components/webgl/WebGLEnhancer'
import Car3DViewer from '@/components/webgl/Car3DViewer'

/**
 * Vehicle Showcase Section - Premium Inventory Display
 * Features: Luxury cards, hover effects, conversion optimization
 */

interface VehicleCardProps {
  vehicle: {
    id: string
    make: string
    model: string
    year: number
    image: string
    monthlyPayment: number
    msrp: number
    ourPrice: number
    mileage: number
    badge?: string
    features: string[]
    savings: number
  }
  index: number
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index }) => {
  return (
    <motion.div
      className="group luxury-card p-6 h-full cursor-pointer relative"
      variants={animationVariants.saasCardEntrance}
      whileHover="hover"
      custom={index}
    >
      {/* WebGL Enhancement for individual cards */}
      <WebGLEnhancer 
        variant="subtle" 
        className="absolute inset-0 pointer-events-none -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        enableParticles={false}
        enableOrbs={true}
        enableWireframe={false}
      />
      
      {/* Vehicle 3D Viewer */}
      <div className="relative mb-6 rounded-xl overflow-hidden">
        <Car3DViewer 
          className="h-64 w-full"
          autoRotate={true}
          carColor={index === 0 ? "#1a365d" : index === 1 ? "#2d3748" : "#047857"}
        />
        
        {/* Badge */}
        {vehicle.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-gold-primary text-neutral-900 text-xs font-bold rounded-full backdrop-blur-sm border border-white/20">
            {vehicle.badge}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button 
            className="p-2 glass rounded-full backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-4 h-4 text-neutral-700" />
          </motion.button>
          <motion.button 
            className="p-2 glass rounded-full backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-neutral-700" />
          </motion.button>
        </div>
        
        {/* Savings Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-primary-emerald text-white text-sm font-bold rounded-full backdrop-blur-sm border border-white/20">
          Save {formatCurrency(vehicle.savings)}
        </div>
        
        {/* Interactive overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0 }}
        />
      </div>

      {/* Vehicle Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-neutral-600">{vehicle.mileage.toLocaleString()} miles</p>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl heading-luxury text-3d-luxury">
              {formatCurrency(vehicle.monthlyPayment)}/mo
            </span>
            <span className="text-sm text-neutral-500">lease</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500 line-through">
              MSRP {formatCurrency(vehicle.msrp)}
            </span>
            <span className="font-semibold text-neutral-900">
              Our Price {formatCurrency(vehicle.ourPrice)}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {vehicle.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          fullWidth 
          className="group/btn"
          onClick={() => window.location.href = '/inventory'}
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  )
}

export const VehicleShowcase: React.FC = () => {
  // Sample luxury vehicles data
  const vehicles = [
    {
      id: '1',
      make: 'BMW',
      model: 'X5 M',
      year: 2024,
      image: '/vehicles/bmw-x5m.jpg',
      monthlyPayment: 899,
      msrp: 112000,
      ourPrice: 106500,
      mileage: 2450,
      badge: 'Hot Deal',
      features: ['M Sport Package', 'Premium Sound', 'Panoramic Roof', 'Adaptive Cruise'],
      savings: 5500,
    },
    {
      id: '2',
      make: 'Mercedes',
      model: 'E-Class AMG',
      year: 2024,
      image: '/vehicles/mercedes-e63.jpg',
      monthlyPayment: 1199,
      msrp: 125000,
      ourPrice: 118900,
      mileage: 1890,
      badge: 'New Arrival',
      features: ['AMG Performance', 'MBUX System', 'Night Package', 'Heated Seats'],
      savings: 6100,
    },
    {
      id: '3',
      make: 'Audi',
      model: 'Q8 Prestige',
      year: 2024,
      image: '/vehicles/audi-q8.jpg',
      monthlyPayment: 779,
      msrp: 89500,
      ourPrice: 84200,
      mileage: 3200,
      badge: 'Best Value',
      features: ['Virtual Cockpit', 'Air Suspension', 'B&O Sound', 'Matrix LED'],
      savings: 5300,
    },
  ]

  return (
    <section id="current-deals" className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 relative">
      {/* WebGL Background Enhancement */}
      <WebGLEnhancer 
        variant="medium" 
        className="absolute inset-0 pointer-events-none"
        enableParticles={true}
        enableOrbs={true}
        enableWireframe={true}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={animationVariants.staggerContainer}
        >
          <motion.div
            variants={animationVariants.fadeIn}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-neutral-700 mb-6"
          >
            <Zap className="w-4 h-4 text-gold-primary" />
            Limited Time Offers
          </motion.div>
          
          <motion.h2
            variants={animationVariants.luxuryFadeIn}
            className="text-4xl md:text-6xl heading-luxury text-neutral-900 mb-6"
          >
            <span className="text-3d-luxury">Premium Vehicles</span>
            <br />
            <span className="text-shadow-subtle">Ready for Delivery</span>
          </motion.h2>
          
          <motion.p
            variants={animationVariants.premiumSlideUp}
            className="text-xl text-saas text-neutral-600 max-w-3xl mx-auto"
          >
            Hand-selected luxury vehicles at unbeatable prices. Each comes with our 
            comprehensive warranty and white-glove delivery service.
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex justify-center items-center gap-8 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationVariants.staggerContainer}
        >
          <motion.div
            variants={animationVariants.fadeIn}
            className="flex items-center gap-2 text-neutral-600"
          >
            <Shield className="w-5 h-5 text-primary-emerald" />
            <span className="font-medium">Certified Pre-Owned</span>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeIn}
            className="flex items-center gap-2 text-neutral-600"
          >
            <Star className="w-5 h-5 text-gold-primary" />
            <span className="font-medium">5-Star Service</span>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeIn}
            className="flex items-center gap-2 text-neutral-600"
          >
            <Zap className="w-5 h-5 text-primary-emerald" />
            <span className="font-medium">Fast Approval</span>
          </motion.div>
        </motion.div>

        {/* Vehicle Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={animationVariants.staggerContainer}
        >
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
            />
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationVariants.fadeIn}
        >
          <Button 
            size="xl" 
            className="group"
            onClick={() => window.location.href = '/inventory'}
          >
            View All Inventory
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-neutral-600 mt-4">
            Over 200+ luxury vehicles in stock • Updated daily
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default VehicleShowcase 