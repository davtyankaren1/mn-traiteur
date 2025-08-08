const CACHE_NAME = "mn-traiteur-cache-v2"; // Increment the cache version when updating

const urlsToCache = [
  "/", // Homepage (Landing page)
  "/styles.css", // Your compiled CSS file for the landing page
  "/script.js", // Your compiled JS file for the landing page
  "/favicon-192x192.png", // Favicon
  "/favicon-512x512.png", // Favicon
  "/apple-touch-icon.png", // Apple touch icon
  "/offline.html", // Fallback page (ensure you have this)
  "/images/hero-image.jpg", // Example of an image for your landing page (replace with actual paths)
  "/images/logo.png" // Example logo image (replace with actual paths)
];

// Install the service worker and cache the assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch assets from cache or network (with strategies)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return from cache
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Cache responses for assets like images, CSS, JS files
          if (event.request.url.includes("/api/")) {
            return networkResponse; // Do not cache API responses
          }

          // Cache responses for static resources (images, JS, CSS)
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });

          return networkResponse; // Return network response
        })
        .catch(() => {
          // If network fails, provide an offline fallback page
          if (event.request.url.includes("/")) {
            return caches.match("/offline.html"); // Show offline page for root page
          }
        });
    })
  );
});

// Activate and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
