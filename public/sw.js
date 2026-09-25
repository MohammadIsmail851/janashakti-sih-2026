// JanaShakti PWA Service Worker - Production Cache
const CACHE_NAME = 'janashakti-pwa-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Do not intercept non-GET requests or Vite dev internal requests
  if (event.request.method !== 'GET' || url.pathname.startsWith('/@') || url.pathname.includes('node_modules')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
