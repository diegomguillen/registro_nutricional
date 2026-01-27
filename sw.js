const CACHE_NAME = 'nutri-app-v1.2a';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon3.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
  './README.md'
];

// Instalación: Cacheamos los recursos estáticos y librerías externas
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activación: Limpiamos caches viejas si actualizamos la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Interceptamos peticiones: Servir desde caché si existe, sino buscar en red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});


