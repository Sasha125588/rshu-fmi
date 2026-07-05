import type { NewsSource, NewsSourceConfig } from './types'

export const PAGE_COUNTS: Record<NewsSource, number> = {
  university: 251,
  kitm: 15,
  iktmvi: 21,
}

export const PRERENDERED_PAGE_COUNT = 3
export const NEWS_REVALIDATE_SECONDS = 1 * 60 * 60

export const NEWS_SOURCE_CONFIG: Record<NewsSource, NewsSourceConfig> = {
  university: {
    label: 'РДГУ',
    badgeLabel: 'РДГУ',
    fullLabel: 'Університет',
    overviewDescription: 'Офіційні повідомлення, події та новини університетської спільноти РДГУ.',
    archiveUrl: 'https://www.rshu.edu.ua/novyny-rdhu',
    pageCount: PAGE_COUNTS.university,
    getPageUrl: (page) => `https://www.rshu.edu.ua/novyny-rdhu?start=${Math.max(0, page - 1) * 10}`,
  },
  kitm: {
    label: 'ІТ та М',
    badgeLabel: 'КІТМ',
    fullLabel: 'Кафедра інформаційних технологій та моделювання',
    overviewDescription:
      'Події кафедри, студентські проєкти та здобутки у сфері інформаційних технологій і моделювання.',
    archiveUrl: 'https://kitm.rshu.edu.ua/podii/',
    pageCount: PAGE_COUNTS.kitm,
    getPageUrl: (page) => `https://kitm.rshu.edu.ua/podii/?query-63-page=${page}`,
  },
  iktmvi: {
    label: 'ЦТ та МНІ',
    badgeLabel: 'ІКТМВІ',
    fullLabel: 'Кафедра цифрових технологій та методики навчання інформатики',
    overviewDescription:
      'Новини про цифрову освіту, навчальні ініціативи та діяльність викладачів і студентів кафедри.',
    archiveUrl: 'https://iktmvi.rshu.edu.ua/pro-kafedru/podii.html',
    pageCount: PAGE_COUNTS.iktmvi,
    getPageUrl: (page) =>
      `https://iktmvi.rshu.edu.ua/pro-kafedru/podii.html?start=${Math.max(0, page - 1) * 9}`,
  },
}
