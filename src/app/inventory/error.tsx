'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function InventoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Inventory page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center p-8 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-6 text-amber-500"
        >
          <ExclamationTriangleIcon className="w-full h-full" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">
          Something went wrong with the inventory
        </h1>
        
        <p className="text-neutral-600 mb-6 leading-relaxed">
          We encountered an issue loading the vehicle inventory. This might be a temporary problem.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left bg-red-50 border border-red-200 rounded-lg p-4">
            <summary className="cursor-pointer text-red-700 font-medium mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-red-600 overflow-auto">
              {error.message}
              {error.stack && (
                <>
                  {'\n\nStack trace:\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
        
        <div className="space-y-3">
          <motion.button
            onClick={reset}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowPathIcon className="w-5 h-5" />
            Try Again
          </motion.button>
          
          <motion.button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-medium hover:bg-neutral-300 transition-colors"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Return to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
} 