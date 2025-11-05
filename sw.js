// Service Worker for Pizzería Don Mateo PWA
const CACHE_NAME = 'pizzeria-don-mateo-v1';
const STATIC_CACHE = 'pizzeria-static-v1';
const DYNAMIC_CACHE = 'pizzeria-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/checkout.html',
    '/pedidos.html',
    '/main.js',
    '/manifest.json',
    // External resources
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
    'https://unpkg.com/p5@1.7.0/lib/p5.min.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle different types of requests
    if (request.method === 'GET') {
        event.respondWith(
            handleFetchRequest(request, url)
        );
    }
});

// Background sync for pending orders
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'pending-orders') {
        event.waitUntil(syncPendingOrders());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received', event);
    
    const options = {
        body: 'Tu pedido está en camino! 🚚',
        icon: '/resources/icon-192.png',
        badge: '/resources/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver pedido',
                icon: '/resources/checkmark.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/resources/xmark.png'
            }
        ]
    };
    
    if (event.data) {
        const data = event.data.json();
        options.body = data.body || options.body;
        options.title = data.title || 'Pizzería Don Mateo';
    }
    
    event.waitUntil(
        self.registration.showNotification('Pizzería Don Mateo', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the orders page
        event.waitUntil(
            clients.openWindow('/pedidos.html')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions
async function handleFetchRequest(request, url) {
    // Handle different types of resources
    if (url.origin === location.origin) {
        // Same origin requests - use cache first strategy
        return cacheFirst(request);
    } else if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
        // Font requests - cache first with long expiration
        return cacheFirst(request);
    } else if (url.origin.includes('kimi-web-img.moonshot.cn')) {
        // Image requests from our image search - cache first
        return cacheFirst(request);
    } else {
        // External resources - network first
        return networkFirst(request);
    }
}

// Cache first strategy - for static resources
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving from cache', request.url);
            return cachedResponse;
        }
        
        // If not in cache, fetch from network and cache
        console.log('Service Worker: Fetching from network', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Cache first failed', error);
        
        // Return offline fallback for HTML pages
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        // Return a basic response for other resources
        return new Response('Offline - Recurso no disponible', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network first strategy - for dynamic content
async function networkFirst(request) {
    try {
        console.log('Service Worker: Network first for', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Network failed, trying cache', request.url);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback
        return new Response('Offline - Contenido no disponible', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Background sync for pending orders
async function syncPendingOrders() {
    try {
        console.log('Service Worker: Syncing pending orders');
        
        // Get pending orders from IndexedDB or localStorage
        const pendingOrders = JSON.parse(localStorage.getItem('pending-orders')) || [];
        
        if (pendingOrders.length === 0) {
            console.log('Service Worker: No pending orders to sync');
            return;
        }
        
        // Process each pending order
        for (const order of pendingOrders) {
            try {
                // Simulate sending order to server
                console.log('Service Worker: Processing pending order', order.id);
                
                // In a real app, you would send this to your backend
                // const response = await fetch('/api/orders', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(order)
                // });
                
                // Remove from pending orders
                const updatedPendingOrders = pendingOrders.filter(o => o.id !== order.id);
                localStorage.setItem('pending-orders', JSON.stringify(updatedPendingOrders));
                
                // Add to confirmed orders
                const confirmedOrders = JSON.parse(localStorage.getItem('pizzeria-orders')) || [];
                confirmedOrders.unshift({
                    ...order,
                    status: 'confirmado',
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('pizzeria-orders', JSON.stringify(confirmedOrders));
                
                console.log('Service Worker: Order synced successfully', order.id);
                
            } catch (error) {
                console.error('Service Worker: Error syncing order', order.id, error);
            }
        }
        
        // Notify clients about sync completion
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_COMPLETE',
                message: 'Pending orders synced'
            });
        });
        
    } catch (error) {
        console.error('Service Worker: Background sync failed', error);
    }
}

// Utility function to add to pending orders for background sync
function addToPendingOrders(order) {
    const pendingOrders = JSON.parse(localStorage.getItem('pending-orders')) || [];
    pendingOrders.push({
        ...order,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('pending-orders', JSON.stringify(pendingOrders));
}

// Cache management utilities
async function cleanupOldCaches() {
    const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];
    const cacheNames = await caches.keys();
    
    return Promise.all(
        cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
                console.log('Service Worker: Deleting old cache', cacheName);
                return caches.delete(cacheName);
            }
        })
    );
}

// Preload critical resources
async function preloadCriticalResources() {
    const cache = await caches.open(STATIC_CACHE);
    
    // Add critical images and resources
    const criticalResources = [
        '/resources/icon-192.png',
        '/resources/icon-512.png'
    ];
    
    return cache.addAll(criticalResources);
}

// Export utilities for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToPendingOrders,
        cleanupOldCaches,
        preloadCriticalResources
    };
}