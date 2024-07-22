const CACHE_NAME = 'pwa-cache-v1';

const urlsToCache = [
  '/',
  '/ws',
  '/index.html',
  '/bundle.js',
  '/static/js/vendors.js',
];

// Install the service worker
window.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
window.addEventListener('fetch', (event) => {
  const { request } = event;

  // Check if the request URL matches the OpenStreetMap tile pattern
  const isTileRequest = /https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/.test(request.url);

  if (isTileRequest) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response; // Return cached tile
          }
          return fetch(request).then((networkResponse) => {
            // Cache the newly fetched tile
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});

// Update the service worker
window.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
