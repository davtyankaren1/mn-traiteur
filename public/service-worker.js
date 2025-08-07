// service-worker.js

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("MN-Traiteur-Cache").then((cache) => {
      return cache.addAll([
        "/",
        "/favicon-192x192.png",
        "/favicon-512x512.png",
        "/styles.css", // Make sure this file exists
        "/app.js" // Make sure this file exists (or update it to your main JS)
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
