export interface SocialCard {
  title: string
  subtitle: string
  lines?: string[]
  highlight?: string
  photo?: {
    url: string
    focalX?: number | null
    focalY?: number | null
  }
}

export const SOCIAL_CARDS: Record<string, SocialCard> = {
  '/': {
    title: 'Факультет математики та інформатики',
    lines: ['Факультет математики', 'та інформатики'],
    subtitle: '',
    highlight: 'інформатики',
  },
  '/news': {
    title: 'Новини',
    subtitle: 'Факультет, університет і кафедри',
    highlight: 'Новини',
  },
  '/news/faculty': {
    title: 'Новини: Факультет',
    subtitle: 'Події, оголошення та досягнення',
    highlight: 'Новини',
  },
  '/educational-programs': {
    title: 'Спеціальності факультету',
    lines: ['Спеціальності', 'факультету'],
    subtitle: 'Бакалаврат і магістратура',
    highlight: 'факультету',
  },
  '/normatyvni-dokumenty': {
    title: 'Нормативні документи',
    lines: ['Нормативні', 'документи'],
    subtitle: 'Положення, накази та програми',
    highlight: 'документи',
  },
  '/departments': {
    title: 'Кафедри факультету',
    lines: ['Кафедри', 'факультету'],
    subtitle: 'Освітні та наукові осередки ФМІ РДГУ',
    highlight: 'факультету',
  },
  '/contacts': {
    title: 'Контакти факультету',
    lines: ['Контакти', 'факультету'],
    subtitle: 'Адреса, телефони та електронна пошта',
    highlight: 'факультету',
  },
  '/history': {
    title: 'Історія факультету',
    lines: ['Історія', 'факультету'],
    subtitle: 'Математика, інформатика та покоління випускників',
    highlight: 'факультету',
  },
  '/vchena-rada': {
    title: 'Вчена рада факультету',
    lines: ['Вчена рада', 'факультету'],
    subtitle: 'Склад ради та її діяльність',
    highlight: 'факультету',
  },
  '/mizhnarodna-spivpratsya': {
    title: 'Міжнародна співпраця',
    lines: ['Міжнародна', 'співпраця'],
    subtitle: 'Партнерства та академічна мобільність',
    highlight: 'співпраця',
  },
  '/vartist-navchannia': {
    title: 'Вартість навчання',
    lines: ['Вартість', 'навчання'],
    subtitle: 'Освітні програми та форми навчання',
    highlight: 'навчання',
  },
}

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const
