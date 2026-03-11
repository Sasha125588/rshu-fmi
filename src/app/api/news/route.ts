import { getNews } from '@/shared/api/requests/getNews'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const rawPage = req.nextUrl.searchParams.get('page')
  const parsedPage = Number.parseInt(rawPage ?? '1')
  const currentPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage)

  const news = await getNews(currentPage)

  return Response.json({ news })
}
