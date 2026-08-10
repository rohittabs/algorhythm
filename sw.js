/* Algorhythm service worker.
   Bump BUILD on every deploy. That single string is what forces every
   installed device to throw away its old copy and fetch the new one. */
const BUILD = 'algorhythm-2026-08-10';
const SHELL = BUILD + '-shell';
const FONTS = BUILD + '-fonts';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon-180.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      /* addAll is all-or-nothing, so add one at a time and let a single
         missing file (a renamed icon, say) fail without killing the install */
      return Promise.all(ASSETS.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL && k !== FONTS) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* Page loads: network first so a new deploy lands immediately,
     cached copy when there is no network. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(SHELL).then(function (c) { c.put('./index.html', copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match('./index.html', { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match('./', { ignoreSearch: true });
        });
      })
    );
    return;
  }

  /* Our own files: cache first, they are versioned by BUILD. */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then(function (c) { c.put(req, copy); }).catch(function () {});
          }
          return res;
        });
      })
    );
    return;
  }

  /* Google Fonts: stale while revalidate, so Inter survives going offline.
     If any of it fails the page just falls back to the system font stack. */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS).then(function (c) {
        return c.match(req).then(function (hit) {
          const net = fetch(req).then(function (res) {
            if (res && res.ok) c.put(req, res.clone());
            return res;
          }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
  }
});

/* Lets the page ask the waiting worker to take over straight away. */
self.addEventListener('message', function (e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
