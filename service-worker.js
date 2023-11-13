// src/service-worker.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precache all the assets in the build directory
precacheAndRoute(self.__WB_MANIFEST);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the Google Fonts webfonts with a cache-first strategy for 1 year
registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                maxEntries: 30,
            }),
        ],
    })
);

// Serve the fallback offline page if the user is offline
const navigationRoute = new NavigationRoute(({ event }) => {
    return fetch(event.request)
        .then((response) => {
            // If the request fails, return the offline page instead
            if (!response.ok) {
                return caches.match('app.html');
            }
            return response;
        })
        .catch(() => caches.match('app.html'));
});

registerRoute(navigationRoute);

// Handle other navigation requests
self.addEventListener('fetch', (event) => {
    event.respondWith(navigationRoute.handle({ event }));
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
