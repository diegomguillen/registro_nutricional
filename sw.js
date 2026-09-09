const CACHE_NAME = 'nutri-app-v2.75'
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon3.png',
  './foods.json',
  './structure.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  './README.md'
];

// Instalación: Cacheamos los recursos estáticos y activamos de inmediato
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS_TO_CACHE) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('SW: Recurso no cacheado en install:', asset, err);
        }
      }
    })
  );
});

// Activación: Limpiamos caches viejas y tomamos control de las páginas abiertas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

// Interceptamos peticiones: Network-First para HTML y datos JSON, Cache-First para assets estáticos
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isHtmlOrJson = url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/') || url.pathname.endsWith('.json');

  if (isHtmlOrJson) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Responder con la versión activa de CACHE_NAME a la app o forzar activación
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_NAME });
    }
  }
});

