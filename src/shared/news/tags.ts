import type { BaseNews, NewsItem, NewsSource, NewsTag, ParsedNews } from './types'

type WeightedKeyword = readonly [value: string, weight: number]

interface NewsTagRule {
  tag: NewsTag
  keywords: WeightedKeyword[]
}

const MAX_TAGS = 3
const MIN_TAG_SCORE = 2

const TAG_RULES: NewsTagRule[] = [
  {
    tag: 'Акредитація',
    keywords: [
      ['акредитаці', 3],
      ['експертна група', 3],
      ['нацагентство', 3],
      ['освітньо-професійна програма', 2],
      ['освітньо-наукова програма', 2],
      ['освітня програма', 1],
    ],
  },
  {
    tag: 'Міжнародне',
    keywords: [
      ['міжнародн', 2],
      ['академічна мобільність', 3],
      ['erasmus', 3],
      ['fulbright', 3],
      ['фулбрайт', 3],
      ['стажуван', 2],
      ['обмін', 1],
    ],
  },
  {
    tag: 'Стипендії',
    keywords: [
      ['стипенді', 3],
      ['scholarship', 3],
      ['стипендіальна програма', 3],
    ],
  },
  {
    tag: 'Грант',
    keywords: [
      ['грант', 3],
      ['грантов', 3],
      ['фінансування проєкту', 2],
    ],
  },
  {
    tag: 'Досягнення',
    keywords: [
      ['перемог', 3],
      ['призер', 3],
      ['лауреат', 3],
      ['відзнак', 2],
      ['нагород', 2],
      ['чемпіон', 3],
      ['медал', 3],
      ['здобуття', 1],
      ['успіх', 2],
      ['вітаємо', 1],
    ],
  },
  {
    tag: 'Партнерство',
    keywords: [
      ['меморандум', 3],
      ['співпрац', 2],
      ['партнер', 2],
      ['рада роботодавців', 3],
      ['подяка', 2],
    ],
  },
  {
    tag: 'Профорієнтація',
    keywords: [
      ['профорієнтаці', 3],
      ['день відкритих дверей', 3],
      ['абітурієнт', 2],
      ['вступник', 2],
      ['вступна кампанія', 3],
      ['школяр', 2],
    ],
  },
  {
    tag: "Кар'єра",
    keywords: [
      ['працевлаштуван', 3],
      ['ваканс', 3],
      ["кар'єр", 3],
      ['роботодав', 2],
      ['стажування', 3],
    ],
  },
  {
    tag: 'Наука',
    keywords: [
      ['науков', 2],
      ['конференц', 3],
      ['досліджен', 2],
      ['вчена рада', 3],
      ['аспірант', 2],
      ['докторант', 2],
      ['публікац', 2],
      ['круглий стіл', 2],
    ],
  },
  {
    tag: 'Освіта',
    keywords: [
      ['освіт', 1],
      ['навчан', 1],
      ['магістратур', 2],
      ['бакалавр', 2],
      ['спеціальн', 1],
      ['кваліфікаці', 2],
      ['курс', 1],
      ['урок', 2],
    ],
  },
  {
    tag: 'IT',
    keywords: [
      ['айті', 3],
      ['програмув', 2],
      ['програміст', 2],
      ['інформат', 2],
      ["комп'ютер", 2],
      ['цифров', 1],
      ['штучний інтелект', 3],
      ['технологі', 1],
    ],
  },
  {
    tag: 'Математика',
    keywords: [
      ['математик', 3],
      ['алгебр', 3],
      ['геометр', 3],
    ],
  },
  {
    tag: 'Культура',
    keywords: [
      ['мистец', 2],
      ['музич', 2],
      ['концерт', 2],
      ['вокал', 2],
      ['театр', 2],
      ['хореограф', 2],
      ['фольклор', 2],
      ['ліни костенко', 3],
    ],
  },
  {
    tag: 'Спорт',
    keywords: [
      ['спорт', 3],
      ['чемпіонат', 3],
      ['першість', 2],
      ['мініфутбол', 3],
      ['турнір', 2],
    ],
  },
  {
    tag: 'Свята',
    keywords: [
      ['зі святом', 3],
      ['з днем', 3],
      ['день народження', 3],
      ['ювіл', 3],
      ['річниц', 2],
      ['святкуван', 2],
    ],
  },
  {
    tag: 'Оголошення',
    keywords: [
      ['до уваги', 3],
      ['оголошення', 3],
      ['запрошуємо', 2],
      ['дорогі', 2],
      ['шановн', 2],
      ['шановні колеги', 2],
      ['вельмишановн', 2],
      ['університетська спільнота', 2],
    ],
  },
  {
    tag: 'Події',
    keywords: [
      ['вступ', 3],
      ['зустріч', 2],
      ['захід', 2],
      ['флешмоб', 2],
      ['концерт', 2],
      ['семінар', 3],
      ['лекція', 3],
      ['форум', 3],
      ['засіданн', 2],
      ['майстер-клас', 3],
      ['презентаці', 2],
      ['візит', 2],
      ['екскурсія', 2],
      ['участь', 2],
      ['всесвітній', 2],
      ['всеукраїнськ', 2],
    ],
  },
]

const normalizeText = (value: string) =>
  value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[’`ʼ]/g, "'")
    .replace(/[^\p{L}\p{N}'\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const NORMALIZED_TAG_RULES = TAG_RULES.map((rule) => ({
  ...rule,
  keywords: rule.keywords.map(([value, weight]) => [normalizeText(value), weight] as const),
}))

export const generateNewsTags = ({
  title,
  description,
}: Pick<BaseNews, 'title' | 'description'>) => {
  const normalizedTitle = normalizeText(title)
  const normalizedDescription = normalizeText(description ?? '')

  return NORMALIZED_TAG_RULES.map((rule) => {
    const score = rule.keywords.reduce((total, [keyword, weight]) => {
      if (normalizedTitle.includes(keyword)) return total + weight * 2
      if (normalizedDescription.includes(keyword)) return total + weight
      return total
    }, 0)

    return { tag: rule.tag, score }
  })
    .filter(({ score }) => score >= MIN_TAG_SCORE)
    .sort((first, second) => second.score - first.score)
    .slice(0, MAX_TAGS)
    .map(({ tag }) => tag)
}

export const addNewsTags = <S extends NewsSource>(news: ParsedNews[S][]): NewsItem<S>[] =>
  news.map((item) => ({ ...item, tags: generateNewsTags(item) }))
