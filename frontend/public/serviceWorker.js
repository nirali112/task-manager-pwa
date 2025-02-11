self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js',
        // Add other static assets here
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only cache GET requests and avoid chrome-extension schemes
  if (request.method === 'GET' && request.url.startsWith('http')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          // Cache the response for future use
          return caches.open('my-cache').then((cache) => {
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