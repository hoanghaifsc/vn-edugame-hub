/**
 * Service Worker - Vietnam EduGame Hub
 * Xử lý: Cache assets, Offline fallback, Background Sync (US02)
 */

const CACHE_NAME = 'edugame-v1';
const GAME_ASSETS_CACHE = 'edugame-game-assets-v1';
const API_CACHE = 'edugame-api-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ─── Install: cache static assets ────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ─── Activate: cleanup old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, GAME_ASSETS_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !validCaches.includes(k)).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ─── Fetch: routing strategy ──────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Game assets → CacheFirst
  if (url.pathname.startsWith('/assets/game/')) {
    event.respondWith(cacheFirst(event.request, GAME_ASSETS_CACHE));
    return;
  }

  // API calls → NetworkFirst với fallback cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // Static assets (JS, CSS, HTML) → CacheFirst
  if (url.pathname.match(/\.(js|css|png|jpg|svg|woff2|ico)$/)) {
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
    return;
  }

  // Navigation (SPA fallback) → Network with HTML fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(networkFirst(event.request, CACHE_NAME));
});

// ─── Background Sync (US02): sync offline sessions ────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-game-sessions') {
    event.waitUntil(syncGameSessions());
  }
});

async function syncGameSessions() {
  // Notify React app to trigger sync via postMessage
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) => {
    client.postMessage({ type: 'TRIGGER_SYNC' });
  });
}

// ─── Strategy helpers ─────────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
