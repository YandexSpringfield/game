// /* eslint-disable no-restricted-globals */

// const manifest = self.__WB_MANIFEST || [];
// const CACHE_NAME = 'cache_v1.0.0';
// const URLS = manifest.map(({ url }) => url);

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches
//       .open(CACHE_NAME)
//       .then((cache) => {
//         return cache.addAll(URLS);
//       })
//       .catch((err) => {
//         throw err;
//       }),
//   );
// });

// /**
//  * In activate handler we remove the cache from previous versions
//  */
// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((name) => name !== CACHE_NAME)
//           .map((name) => caches.delete(name)),
//       );
//     }),
//   );
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response) {
//         return response;
//       }

//       return fetch(event.request);
//     }),
//   );
// });
