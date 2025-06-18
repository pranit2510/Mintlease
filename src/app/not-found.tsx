'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Page Not Found</h2>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
} 