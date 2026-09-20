/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker'
import { NetworkOnly, Serwist } from 'serwist'

import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const isPayloadPath = (pathname: string) =>
  pathname === '/admin' ||
  pathname.startsWith('/admin/') ||
  pathname === '/api' ||
  pathname.startsWith('/api/')

const payloadNetworkOnly: RuntimeCaching = {
  matcher: ({ sameOrigin, url }) => sameOrigin && isPayloadPath(url.pathname),
  method: 'GET',
  handler: new NetworkOnly(),
}

const purgeLegacyPayloadEntries = async () => {
  for (const cacheName of await self.caches.keys()) {
    const cache = await self.caches.open(cacheName)
    const requests = await cache.keys()
    const payloadRequests = requests.filter((request) => {
      const url = new URL(request.url)

      return url.origin === self.location.origin && isPayloadPath(url.pathname)
    })

    await Promise.all(payloadRequests.map((request) => cache.delete(request)))
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(purgeLegacyPayloadEntries())
})

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [payloadNetworkOnly, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document' && !isPayloadPath(new URL(request.url).pathname)
        },
      },
    ],
  },
})

serwist.addEventListeners()
