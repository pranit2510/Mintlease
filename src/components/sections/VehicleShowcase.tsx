'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ArrowRight, Zap, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatCurrency, animationVariants } from '@/lib/utils'

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
      className="group h-full cursor-pointer bg-[#FEFCFA] rounded-[20px] overflow-hidden"
      style={{
        boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
      }}
      variants={animationVariants.saasCardEntrance}
      whileHover={{ 
        y: -8,
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12), 0 16px 64px rgba(139, 69, 19, 0.06)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      custom={index}
    >
      {/* Vehicle Image */}
      <div className="relative rounded-[16px] overflow-hidden m-4 mb-3">
        <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
          <div className="text-5xl opacity-20">🚗</div>
        </div>
        
        {/* Badge - Orange to match "Delivered" accent */}
        {vehicle.badge && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-[10px] shadow-lg">
            {vehicle.badge}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button 
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-[10px] shadow-lg hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-3.5 h-3.5 text-neutral-700" />
          </motion.button>
          <motion.button 
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-[10px] shadow-lg hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-3.5 h-3.5 text-neutral-700" />
          </motion.button>
        </div>
        
        {/* Savings Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-[10px] shadow-lg">
          Save {formatCurrency(vehicle.savings)}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="px-4 pb-4 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-neutral-900 leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-neutral-500 text-sm">{vehicle.mileage.toLocaleString()} miles</p>
        </div>

        {/* Pricing - Enhanced emphasis */}
        <div className="space-y-2.5">
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-emerald-600">
              {formatCurrency(vehicle.monthlyPayment)}
            </span>
            <span className="text-base text-neutral-500 font-medium">/mo lease</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500 line-through">
              MSRP {formatCurrency(vehicle.msrp)}
            </span>
            <span className="font-bold text-neutral-900">
              Our Price {formatCurrency(vehicle.ourPrice)}
            </span>
          </div>
        </div>

        {/* Features - More spacing and warm gray */}
        <div className="flex flex-wrap gap-2">
          {vehicle.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2.5 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-[6px]"
            >
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="px-2.5 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-[6px]">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>

        {/* CTA Button - Enhanced with 3D depth */}
        <motion.button
          className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-[14px] transition-all duration-300 group/btn"
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
          onClick={() => window.location.href = '/inventory'}
        >
          <span className="text-base">View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </motion.button>
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
    <section 
      id="current-deals" 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FEF7ED 0%, #FEFCFA 50%, #FEF7ED 100%)',
      }}
    >

      
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-neutral-700 mb-8 will-change-transform overflow-hidden group cursor-pointer relative"
            style={{
              background: 'linear-gradient(135deg, rgba(254, 252, 250, 0.8) 0%, rgba(254, 252, 250, 0.65) 50%, rgba(254, 252, 250, 0.75) 100%)',
              backdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(110%)',
              border: '1px solid transparent',
              borderImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 100%) 1',
              boxShadow: `
                0 1px 3px rgba(139, 69, 19, 0.05),
                0 4px 12px rgba(139, 69, 19, 0.04),
                0 8px 24px rgba(139, 69, 19, 0.03),
                0 16px 48px rgba(0, 0, 0, 0.02),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(255, 255, 255, 0.05)
              `,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            whileHover={{ 
              scale: 1.015,
              y: -2,
              background: 'linear-gradient(135deg, rgba(254, 252, 250, 0.9) 0%, rgba(254, 252, 250, 0.75) 50%, rgba(254, 252, 250, 0.85) 100%)',
              backdropFilter: 'blur(24px) saturate(200%) brightness(115%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(115%)',
              boxShadow: `
                0 2px 6px rgba(139, 69, 19, 0.08),
                0 6px 16px rgba(139, 69, 19, 0.06),
                0 12px 32px rgba(139, 69, 19, 0.04),
                0 24px 64px rgba(0, 0, 0, 0.03),
                inset 0 1px 0 rgba(255, 255, 255, 0.25),
                inset 0 -1px 0 rgba(255, 255, 255, 0.08)
              `,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.995, y: 0 }}
            animate={{
              boxShadow: [
                `0 1px 3px rgba(139, 69, 19, 0.05), 0 4px 12px rgba(139, 69, 19, 0.04), 0 8px 24px rgba(139, 69, 19, 0.03), 0 16px 48px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)`,
                `0 2px 4px rgba(139, 69, 19, 0.06), 0 5px 14px rgba(139, 69, 19, 0.045), 0 10px 28px rgba(139, 69, 19, 0.035), 0 20px 56px rgba(0, 0, 0, 0.025), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(255, 255, 255, 0.06)`,
                `0 1px 3px rgba(139, 69, 19, 0.05), 0 4px 12px rgba(139, 69, 19, 0.04), 0 8px 24px rgba(139, 69, 19, 0.03), 0 16px 48px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)`
              ]
            }}
            transition={{
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
          >
            {/* Subtle glass reflection */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%, rgba(255, 255, 255, 0.08) 100%)',
                pointerEvents: 'none'
              }}
              animate={{
                opacity: [0.25, 0.35, 0.25]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Animated border gradient */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMaskComposite: 'xor',
                padding: '1px',
                pointerEvents: 'none'
              }}
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 100%)',
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.4) 100%)',
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 100%)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
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
              <Zap className="w-4 h-4 text-orange-500 drop-shadow-sm" />
            </motion.div>
            
            <span className="relative z-10 tracking-wide font-medium">
              Limited Time Offers
            </span>
          </motion.div>
          
          <motion.h2
            variants={animationVariants.luxuryFadeIn}
            className="text-3xl md:text-4xl lg:text-5xl heading-luxury mb-8"
            style={{ lineHeight: '1.1' }}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 tracking-[0.02em]">
                <span className="font-black text-emerald-600 text-3d-luxury">PREMIUM</span>
                <span className="font-black text-neutral-900 text-3d-luxury">VEHICLES</span>
              </div>
              <div className="mt-2 text-xl md:text-2xl lg:text-3xl font-medium tracking-wide">
                <span className="text-neutral-700">Ready for </span>
                <span className="text-emerald-600 font-bold">Delivery</span>
              </div>
            </div>
          </motion.h2>
          
          <motion.p
            variants={animationVariants.premiumSlideUp}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
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
            className="flex items-center gap-3 text-neutral-600"
          >
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-base">Brand New Vehicles</span>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeIn}
            className="flex items-center gap-3 text-neutral-600"
          >
            <Star className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-base">Lease Specialists</span>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeIn}
            className="flex items-center gap-3 text-neutral-600"
          >
            <Zap className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-base">Fast Approval</span>
          </motion.div>
        </motion.div>

        {/* Vehicle Grid - Increased spacing */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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

        {/* View All CTA - Enhanced button styling */}
        <motion.div
          className="text-center mt-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationVariants.fadeIn}
        >
          <motion.button
            className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-5 rounded-full text-lg mx-auto transition-all duration-300"
            style={{
              boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.3), 0 16px 40px -8px rgba(5, 150, 105, 0.2), 0 32px 64px -16px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ 
              y: -3, 
              scale: 1.02,
              background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
              boxShadow: '0 12px 28px -4px rgba(5, 150, 105, 0.4), 0 20px 48px -8px rgba(5, 150, 105, 0.25), 0 40px 80px -16px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.15)',
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => window.location.href = '/inventory'}
          >
            <span>View All Inventory</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          <p className="text-neutral-600 mt-6 text-lg">
            Over 200+ luxury vehicles in stock • Updated daily
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default VehicleShowcase 