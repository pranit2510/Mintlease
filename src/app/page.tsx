'use client'

import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { VehicleShowcase } from '@/components/sections/VehicleShowcase'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'

/**
 * Homepage - Mint Lease Premium Auto Brokerage
 * Features: Luxury design, conversion optimization, modern UX
 */
export default function HomePage() {
  return (
    <>
      {/* Navigation Header */}
      <Header />
      
      <main className="relative">
        {/* Hero Section - Full viewport with luxury animations */}
        <Hero />
        
        {/* Premium Vehicle Showcase */}
        <VehicleShowcase />
        
        {/* How It Works Process */}
        <HowItWorks />
        
        {/* Customer Testimonials */}
        <Testimonials />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  )
}
