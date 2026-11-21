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

const isNetworkOnlyPath = (pathname: string) =>
  isPayloadPath(pathname) || pathname === '/projects' || pathname.startsWith('/projects/')

const networkOnly: RuntimeCaching = {
  matcher: ({ sameOrigin, url }) => sameOrigin && isNetworkOnlyPath(url.pathname),
  method: 'GET',
  handler: new NetworkOnly(),
}

const purgeNetworkOnlyEntries = async () => {
  for (const cacheName of await self.caches.keys()) {
    const cache = await self.caches.open(cacheName)
    const requests = await cache.keys()
    const networkOnlyRequests = requests.filter((request) => {
      const url = new URL(request.url)

      return url.origin === self.location.origin && isNetworkOnlyPath(url.pathname)
    })

    await Promise.all(networkOnlyRequests.map((request) => cache.delete(request)))
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(purgeNetworkOnlyEntries())
})

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [networkOnly, ...defaultCache],
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
