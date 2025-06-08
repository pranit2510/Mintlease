const CACHE_NAME = 'mint-lease-v1'
const OFFLINE_URL = '/offline'

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/calculator',
  '/inventory',
  '/lead',
  '/credit-application'
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache First - for static assets
  CACHE_FIRST: 'cache-first',
  // Network First - for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate - for frequently updated content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
}

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Precaching assets...')
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        // Force activate immediately
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim()
    })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request))
  }
})

// Handle GET requests with appropriate caching strategy
async function handleGetRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Static assets - Cache First strategy
    if (isStaticAsset(url.pathname)) {
      return await cacheFirst(request)
    }
    
    // API requests - Network First strategy
    if (url.pathname.startsWith('/api/')) {
      return await networkFirst(request)
    }
    
    // HTML pages - Stale While Revalidate
    if (url.pathname.endsWith('/') || url.pathname.includes('.html') || !url.pathname.includes('.')) {
      return await staleWhileRevalidate(request)
    }
    
    // Default - Network First
    return await networkFirst(request)
    
  } catch (error) {
    console.error('Fetch failed:', error)
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL)
    }
    
    // Return cached version if available
    return caches.match(request)
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  const networkResponse = await fetch(request)
  
  if (networkResponse.status === 200) {
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())
  }
  
  return networkResponse
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    // Network failed, but we might have a cached version
    return cachedResponse
  })
  
  // Return cached version immediately, update in background
  return cachedResponse || fetchPromise
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf']
  return staticExtensions.some(ext => pathname.includes(ext))
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync-form') {
    event.waitUntil(syncFormData())
  }
})

// Sync form data when connection is restored
async function syncFormData() {
  try {
    const cache = await caches.open(CACHE_NAME)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/') && request.method === 'POST') {
        try {
          await fetch(request)
          await cache.delete(request)
        } catch (error) {
          console.error('Failed to sync form data:', error)
        }
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'mint-lease-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icon-72x72.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Mint Lease', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling for client communication
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then((size) => {
      event.ports[0].postMessage({ type: 'CACHE_SIZE', size })
    })
  }
})

// Get cache size for debugging
async function getCacheSize() {
  const cache = await caches.open(CACHE_NAME)
  const keys = await cache.keys()
  return keys.length
} 