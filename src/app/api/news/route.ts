import { getNewsWithTags } from '@/app/(public)/(components)/News/helpers/getNewsWithTags'
import { getNews } from '@/shared/api/requests/getNews'

import type { NextRequest } from 'next/server'

export const revalidate = 14400 // 4 hours

export async function GET(req: NextRequest) {
  const rawPage = req.nextUrl.searchParams.get('page')
  const currentPage = Number.parseInt(rawPage ?? '1') ?? 1

  const data = await getNews(currentPage)
  const newsWithTags = getNewsWithTags(data)

  return Response.json({ news: newsWithTags })
}
