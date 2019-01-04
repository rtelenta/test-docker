/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
const filteredITems = self.__precacheManifest.filter(function(cache) {
  return (cache.url.endsWith('.js') || cache.url.endsWith('.css') || cache.url.endsWith('.html')) ? false : true;
});
workbox.precaching.precacheAndRoute(filteredITems, {})

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, 
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  }),
  'GET')

  const bgSyncPlugin = new workbox.backgroundSync.Plugin('bgSyncQueue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
  });
    
  workbox.routing.registerRoute(
    /https?:\/\/flash-pre.appspot.com\/v1\/pepe\/(.*)/,
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  );
  
  workbox.googleAnalytics.initialize();

  workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.staleWhileRevalidate(),
  )
// Todo lo demás usa Network First
workbox.routing.registerRoute(/^https?.*/,
  workbox.strategies.networkFirst(), 'GET')