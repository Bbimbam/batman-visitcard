const CACHE_NAME = 'gotham-archive-v2.4.7';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/mobile-menu.js',
  '/generator.js',
  '/rain.js',
  '/css/responsive.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});