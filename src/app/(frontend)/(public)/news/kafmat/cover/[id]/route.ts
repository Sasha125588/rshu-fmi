import { getKafmatCoverUrl } from '@/shared/news/loaders/kafmat'

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])

const fetchPhoto = async (url: string) => {
  const signal = AbortSignal.timeout(8000)
  const response = await fetch(url, { cache: 'no-store', redirect: 'manual', signal })
  const location = response.headers.get('Location')
  if (response.status !== 302 || !location) return response

  await response.body?.cancel()
  const target = new URL(location, url)
  if (
    target.origin !== 'https://lh7-rt.googleusercontent.com' ||
    !target.pathname.startsWith('/rd-sitesv-images-rt/')
  ) {
    return new Response(null, { status: 502 })
  }

  return fetch(target, {
    cache: 'no-store',
    redirect: 'error',
    signal,
  })
}

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  if (!/^h\.[a-z\d]+_\d+$/i.test(id)) return new Response(null, { status: 404 })

  try {
    const url = await getKafmatCoverUrl(id)
    if (!url) return new Response(null, { status: 404 })

    let photo = await fetchPhoto(url)
    if (photo.status === 403) {
      await photo.body?.cancel()
      const currentUrl = await getKafmatCoverUrl(id, true)
      if (!currentUrl || currentUrl === url) return new Response(null, { status: 502 })
      photo = await fetchPhoto(currentUrl)
    }

    const contentType = photo.headers.get('Content-Type')?.split(';', 1)[0] ?? ''
    if (!photo.ok || !photo.body || !IMAGE_TYPES.has(contentType)) {
      await photo.body?.cancel()
      return new Response(null, { status: 502 })
    }

    return new Response(photo.body, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.warn('Could not load a Kafmat cover.', { id, error })
    return new Response(null, { status: 502 })
  }
}
