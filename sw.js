const CACHE_NAME = 'rutina-v1';
const ASSETS = [
  './',
  './index.html',
  // Añade aquí tus archivos CSS o JS si tienes, por ejemplo:
  // './style.css',
  // './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalar el Service Worker y guardar en caché los archivos esenciales
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar el Service Worker y limpiar cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
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
});

// Estrategia de carga: Servir desde la caché, si no buscar en la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
