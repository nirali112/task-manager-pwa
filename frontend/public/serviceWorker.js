const CACHE_NAME = 'task-manager-v1';
const ASSETS = ['/', '/index.html', '/styles/main.css', '/scripts/main.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only cache GET requests and avoid unsupported schemes
  if (request.method === 'GET' && request.url.startsWith('http')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    // For non-GET requests or unsupported schemes, bypass the cache
    event.respondWith(fetch(request));
  }
});