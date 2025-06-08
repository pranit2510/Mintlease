// Mobile Testing and Device Detection Utilities

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  isTouch: boolean
  screenSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio: number
  orientation: 'portrait' | 'landscape'
  connection?: 'slow-2g' | '2g' | '3g' | '4g' | 'wifi' | 'unknown'
  supportsWebP: boolean
  supportsServiceWorker: boolean
  supportsTouchEvents: boolean
  supportsHapticFeedback: boolean
}

export class MobileTestingUtils {
  private static instance: MobileTestingUtils
  private performanceMetrics: Array<{ timestamp: number; metric: string; value: number }> = []

  static getInstance(): MobileTestingUtils {
    if (!MobileTestingUtils.instance) {
      MobileTestingUtils.instance = new MobileTestingUtils()
    }
    return MobileTestingUtils.instance
  }

  // Device Detection
  getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent.toLowerCase()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Device type detection
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || viewportWidth < 768
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || (viewportWidth >= 768 && viewportWidth < 1024)
    const isDesktop = !isMobile && !isTablet
    
    // OS detection
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)
    
    // Touch detection
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Screen size categories
    let screenSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'sm'
    if (viewportWidth >= 1536) screenSize = '2xl'
    else if (viewportWidth >= 1280) screenSize = 'xl'
    else if (viewportWidth >= 1024) screenSize = 'lg'
    else if (viewportWidth >= 768) screenSize = 'md'
    
    // Orientation
    const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait'
    
    // Connection type (if available)
    const connection = this.getConnectionType()
    
    // Feature detection
    const supportsWebP = this.supportsWebP()
    const supportsServiceWorker = 'serviceWorker' in navigator
    const supportsTouchEvents = 'ontouchstart' in window
    const supportsHapticFeedback = 'vibrate' in navigator || 'Haptic' in window

    return {
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      isTouch,
      screenSize,
      viewportWidth,
      viewportHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation,
      connection,
      supportsWebP,
      supportsServiceWorker,
      supportsTouchEvents,
      supportsHapticFeedback
    }
  }

  // Performance Monitoring
  startPerformanceMonitoring(): void {
    // Monitor frame rate
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        this.recordMetric('fps', fps)
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    requestAnimationFrame(measureFPS)
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        this.recordMetric('heapUsed', memory.usedJSHeapSize / 1024 / 1024) // MB
        this.recordMetric('heapTotal', memory.totalJSHeapSize / 1024 / 1024) // MB
      }, 5000)
    }
    
    // Monitor network quality
    this.monitorNetworkQuality()
  }

  private recordMetric(metric: string, value: number): void {
    this.performanceMetrics.push({
      timestamp: Date.now(),
      metric,
      value
    })
    
    // Keep only last 100 metrics
    if (this.performanceMetrics.length > 100) {
      this.performanceMetrics = this.performanceMetrics.slice(-100)
    }
  }

  getPerformanceReport(): any {
    const deviceInfo = this.getDeviceInfo()
    const groupedMetrics = this.performanceMetrics.reduce((acc, metric) => {
      if (!acc[metric.metric]) {
        acc[metric.metric] = []
      }
      acc[metric.metric].push(metric.value)
      return acc
    }, {} as Record<string, number[]>)

    const averages = Object.entries(groupedMetrics).reduce((acc, [metric, values]) => {
      acc[metric] = {
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        latest: values[values.length - 1]
      }
      return acc
    }, {} as Record<string, any>)

    return {
      deviceInfo,
      metrics: averages,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    }
  }

  // Touch Event Testing
  simulateTouchEvent(element: Element, type: 'touchstart' | 'touchmove' | 'touchend', x: number, y: number): void {
    const touch = new Touch({
      identifier: 1,
      target: element,
      clientX: x,
      clientY: y,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    })

    const touchEvent = new TouchEvent(type, {
      cancelable: true,
      bubbles: true,
      touches: type !== 'touchend' ? [touch] : [],
      targetTouches: type !== 'touchend' ? [touch] : [],
      changedTouches: [touch],
    })

    element.dispatchEvent(touchEvent)
  }

  // Responsive Breakpoint Testing
  testResponsiveBreakpoints(): Record<string, boolean> {
    const width = window.innerWidth
    
    return {
      'sm': width >= 640,
      'md': width >= 768,
      'lg': width >= 1024,
      'xl': width >= 1280,
      '2xl': width >= 1536
    }
  }

  // Connection Quality Testing
  private getConnectionType(): DeviceInfo['connection'] {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      return connection.effectiveType || 'unknown'
    }
    return 'unknown'
  }

  private monitorNetworkQuality(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      
      const updateConnection = () => {
        this.recordMetric('downlink', connection.downlink || 0)
        this.recordMetric('rtt', connection.rtt || 0)
      }
      
      connection.addEventListener('change', updateConnection)
      updateConnection()
    }
  }

  // Feature Detection
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  // Accessibility Testing
  testAccessibility(): Record<string, boolean> {
    return {
      'prefers-reduced-motion': window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      'prefers-color-scheme-dark': window.matchMedia('(prefers-color-scheme: dark)').matches,
      'high-contrast': window.matchMedia('(prefers-contrast: high)').matches,
      'large-text': window.matchMedia('(prefers-reduced-data: reduce)').matches,
      'keyboard-navigation': !this.getDeviceInfo().isTouch
    }
  }

  // Debug Information
  generateDebugReport(): string {
    const performanceReport = this.getPerformanceReport()
    const accessibilityReport = this.testAccessibility()
    const breakpoints = this.testResponsiveBreakpoints()
    
    return JSON.stringify({
      ...performanceReport,
      accessibility: accessibilityReport,
      breakpoints,
      url: window.location.href,
      timestamp: new Date().toISOString()
    }, null, 2)
  }

  // Download debug report
  downloadDebugReport(): void {
    const report = this.generateDebugReport()
    const blob = new Blob([report], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `mobile-debug-report-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  // Viewport change monitoring
  onViewportChange(callback: (deviceInfo: DeviceInfo) => void): () => void {
    const handler = () => {
      callback(this.getDeviceInfo())
    }
    
    window.addEventListener('resize', handler)
    window.addEventListener('orientationchange', handler)
    
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
    }
  }
}

// Global instance
export const mobileTestingUtils = MobileTestingUtils.getInstance()

// React Hook for device info (to be used in React components)
// Note: Import React in your component file to use this hook
export const useDeviceInfo = () => {
  // This will be used in React components that import React separately
  if (typeof window === 'undefined') {
    return {} as DeviceInfo
  }
  
  return mobileTestingUtils.getDeviceInfo()
} 