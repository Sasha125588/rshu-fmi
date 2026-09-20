import { serwist } from '@serwist/next/config'
import { readFileSync } from 'node:fs'

const readRevision = () => {
  try {
    return readFileSync('.next/BUILD_ID', 'utf-8').trim()
  } catch {
    return crypto.randomUUID()
  }
}

export default serwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  precachePrerendered: false,
  additionalPrecacheEntries: [{ url: '/~offline', revision: readRevision() }],
})
