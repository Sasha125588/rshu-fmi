export const NEWS_TAG_OPTIONS = [
  { label: 'Акредитація', value: 'accreditation' },
  { label: 'Міжнародне', value: 'international' },
  { label: 'Стипендії', value: 'scholarships' },
  { label: 'Грант', value: 'grants' },
  { label: 'Наука', value: 'science' },
  { label: 'Освіта', value: 'education' },
  { label: 'Події', value: 'events' },
  { label: 'Досягнення', value: 'achievements' },
  { label: 'Партнерство', value: 'partnership' },
  { label: 'Профорієнтація', value: 'career-guidance' },
  { label: 'Свята', value: 'holidays' },
  { label: 'Культура', value: 'culture' },
  { label: 'Спорт', value: 'sports' },
  { label: 'Оголошення', value: 'announcements' },
  { label: 'IT', value: 'it' },
  { label: 'Математика', value: 'mathematics' },
  { label: "Кар'єра", value: 'career' },
] as const

export type NewsTagCode = (typeof NEWS_TAG_OPTIONS)[number]['value']
type NewsTagLabel = (typeof NEWS_TAG_OPTIONS)[number]['label']

const NEWS_TAG_LABELS = Object.fromEntries(
  NEWS_TAG_OPTIONS.map(({ label, value }) => [value, label])
) as Record<NewsTagCode, NewsTagLabel>

export const getNewsTagLabel = (tag: NewsTagCode) => NEWS_TAG_LABELS[tag]
