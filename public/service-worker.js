/*
  Pre-caches all comment links so that when the user clicks a link, the resource
  should be served instantly by this service worker by way of cache, not the
  external network.
*/

'use strict';

// Increment this to invalidate previous caches.
const CACHE_VERSION = 1

// const CURRENT_CACHES = {
//   // offline: 'offline-v' + CACHE_VERSION,
// }

// Object that stores all local mutable state.
const state = {}

self.addEventListener('install', (event) => {
  /*
    Query the Hacker News API to get a list of stories on the front page. Each
    story object has a property. We can use the URL to pre-cache the story.
  */

  // event.waitUntil(<Promise>)
})

// self.addEventListener('activate', (event) => {
//   let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
//     return CURRENT_CACHES[key]
//   })
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (expectedCacheNames.indexOf(cacheName) === -1) {
//             console.log('Deleting out of date cache:', cacheName)
//             return caches.delete(cacheName)
//           }
//         })
//       )
//     })
//   )
// })

// self.addEventListener('fetch', (event) => {
//   /*
//     When the client requests a comments page, return the cached page.
//   */
// })

// self.addEventListener('message', (event) => {
//   /*
//     Caches resources in response to messages sent by the client page. Service
//     workers do not have access to the DOM, so in order to know which resource to
//     cache, the client has to communicate it to the SW (here).
//   */
//   if (event.data == null)
//     return
//   if (event.data.type === 'CLIENT_MESSAGE') {
//     // ...
//   }
// })
