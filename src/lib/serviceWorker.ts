'use client'

// Service Worker Registration and Management
export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null
  private isUpdateAvailable = false
  private updateCallbacks: Array<() => void> = []

  async register(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Workers not supported')
      return false
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log('Service Worker registered successfully:', this.registration.scope)

      // Listen for updates
      this.registration.addEventListener('updatefound', this.handleUpdate.bind(this))

      // Check for existing update
      if (this.registration.waiting) {
        this.isUpdateAvailable = true
        this.notifyUpdateCallbacks()
      }

      // Listen for controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed')
        window.location.reload()
      })

      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }

  private handleUpdate(): void {
    if (!this.registration) return

    const newWorker = this.registration.installing
    if (!newWorker) return

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        console.log('New Service Worker available')
        this.isUpdateAvailable = true
        this.notifyUpdateCallbacks()
      }
    })
  }

  onUpdateAvailable(callback: () => void): void {
    this.updateCallbacks.push(callback)
    
    // If update is already available, call immediately
    if (this.isUpdateAvailable) {
      callback()
    }
  }

  private notifyUpdateCallbacks(): void {
    this.updateCallbacks.forEach(callback => callback())
  }

  async skipWaiting(): Promise<void> {
    if (!this.registration || !this.registration.waiting) return

    // Tell the waiting SW to skip waiting
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }

  async checkForUpdates(): Promise<void> {
    if (!this.registration) return

    try {
      await this.registration.update()
      console.log('Checked for Service Worker updates')
    } catch (error) {
      console.error('Failed to check for updates:', error)
    }
  }

  async unregister(): Promise<boolean> {
    if (!this.registration) return false

    try {
      const result = await this.registration.unregister()
      console.log('Service Worker unregistered:', result)
      return result
    } catch (error) {
      console.error('Failed to unregister Service Worker:', error)
      return false
    }
  }

  isSupported(): boolean {
    return 'serviceWorker' in navigator
  }

  isRegistered(): boolean {
    return this.registration !== null
  }

  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration
  }
}

// Background Sync Utilities
export class BackgroundSyncManager {
  private static instance: BackgroundSyncManager
  private swManager: ServiceWorkerManager

  constructor(swManager: ServiceWorkerManager) {
    this.swManager = swManager
  }

  static getInstance(swManager: ServiceWorkerManager): BackgroundSyncManager {
    if (!BackgroundSyncManager.instance) {
      BackgroundSyncManager.instance = new BackgroundSyncManager(swManager)
    }
    return BackgroundSyncManager.instance
  }

  async scheduleSync(tag: string): Promise<void> {
    if (!('serviceWorker' in navigator) || !('sync' in window.ServiceWorkerRegistration.prototype)) {
      console.log('Background sync not supported')
      return
    }

    try {
      const registration = this.swManager.getRegistration()
      if (registration && 'sync' in registration) {
        await (registration as any).sync.register(tag)
        console.log('Background sync scheduled:', tag)
      }
    } catch (error) {
      console.error('Failed to schedule background sync:', error)
    }
  }

  async syncFormData(formData: FormData, endpoint: string): Promise<void> {
    try {
      // Try to submit immediately
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        console.log('Form submitted successfully')
        return
      }
    } catch (error) {
      console.log('Network unavailable, scheduling background sync')
    }

    // Schedule background sync if immediate submission fails
    await this.scheduleSync('background-sync-form')
  }
}

// Push Notifications Manager
export class PushNotificationManager {
  private swManager: ServiceWorkerManager
  private vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

  constructor(swManager: ServiceWorkerManager) {
    this.swManager = swManager
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('Push notifications not supported')
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    console.log('Push notification permission:', permission)
    return permission
  }

  async subscribe(): Promise<PushSubscription | null> {
    const registration = this.swManager.getRegistration()
    if (!registration) {
      console.error('No service worker registration found')
      return null
    }

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      })

      console.log('Push subscription created:', subscription)
      return subscription
    } catch (error) {
      console.error('Failed to create push subscription:', error)
      return null
    }
  }

  async unsubscribe(): Promise<boolean> {
    const registration = this.swManager.getRegistration()
    if (!registration) return false

    try {
      const subscription = await registration.pushManager.getSubscription()
      if (subscription) {
        const result = await subscription.unsubscribe()
        console.log('Push subscription removed:', result)
        return result
      }
      return true
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
      return false
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}

// Global Service Worker Manager Instance
export const swManager = new ServiceWorkerManager()
export const backgroundSyncManager = BackgroundSyncManager.getInstance(swManager)
export const pushNotificationManager = new PushNotificationManager(swManager)

// Auto-register service worker on app initialization
if (typeof window !== 'undefined') {
  swManager.register().then((success) => {
    if (success) {
      console.log('Service Worker initialized successfully')
      
      // Set up update notifications
      swManager.onUpdateAvailable(() => {
        console.log('App update available!')
        // You can show a notification to the user here
      })
    }
  })
} 