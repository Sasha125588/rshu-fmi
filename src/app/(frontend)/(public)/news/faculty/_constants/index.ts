export const FACULTY_NEWS_PAGE_SIZE = process.env.NEXT_INSTANT_TESTS === '1' ? 2 : 12

export const FACULTY_NEWS_CARD_SELECT = {
  title: true,
  slug: true,
  excerpt: true,
  tags: true,
  publishedAt: true,
  isPinned: true,
  coverImage: true,
  createdAt: true,
} as const
