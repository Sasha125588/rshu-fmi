import {
  CalendarDaysIcon,
  DollarSignIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  HouseIcon,
  MapPinIcon,
  NewspaperIcon,
} from 'lucide-react'

import { NAVIGATION } from '../../Navbar/constants'
import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'

interface Destination {
  href: Route
  title: string
  icon: LucideIcon
  keywords?: string[]
}

const quickLinks: Destination[] = [
  {
    href: '/',
    title: 'Головна',
    icon: HouseIcon,
    keywords: ['стартова сторінка', 'фмі рдгу', 'home'],
  },
  {
    href: DEFAULT_SCHEDULE_PATH as Route,
    title: 'Розклад занять',
    icon: CalendarDaysIcon,
    keywords: ['пари', 'група', 'аудиторія', 'викладач', 'заняття'],
  },
  {
    href: '/educational-programs',
    title: 'Спеціальності',
    icon: GraduationCapIcon,
    keywords: ['освітні програми', 'вступ', 'бакалаврат', 'магістратура', 'силабуси'],
  },
  {
    href: '/normatyvni-dokumenty',
    title: 'Нормативні документи',
    icon: FileTextIcon,
    keywords: ['положення', 'накази', 'звіти'],
  },
  {
    href: '/vartist-navchannia',
    title: 'Вартість навчання',
    icon: DollarSignIcon,
    keywords: ['ціна', 'оплата', 'контракт', 'реквізити'],
  },
  {
    href: '/contacts',
    title: 'Контакти',
    icon: MapPinIcon,
    keywords: ['деканат', 'адреса', 'телефон', 'пошта'],
  },
]

const quickLinkPaths = new Set<string>(quickLinks.map(({ href }) => href))
const otherLinks: Destination[] = [
  ...NAVIGATION.flatMap(({ label, cards }) =>
    (cards ?? [])
      .filter(({ href }) => !quickLinkPaths.has(href))
      .map(({ href, title, icon, description }) => ({
        href: href as Route,
        title,
        icon,
        keywords: [label, description, href],
      }))
  ),
  {
    href: '/news',
    title: 'Новини',
    icon: NewspaperIcon,
    keywords: ['події', 'оголошення'],
  },
  {
    href: '/mizhnarodna-spivpratsya',
    title: 'Міжнародна співпраця',
    icon: GlobeIcon,
    keywords: ['мобільність', 'обмін', 'erasmus'],
  },
]

const destinations = [...quickLinks, ...otherLinks]
const defaultGroups = [
  { heading: 'Швидкі переходи', items: quickLinks },
  { heading: 'Інші розділи', items: otherLinks },
]

const normalize = (value: string) =>
  value
    .normalize('NFC')
    .toLowerCase()
    .replace(/['’ʼ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

const scoreDestination = ({ title, keywords = [] }: Destination, query: string) => {
  const name = normalize(title)

  if (name === query) return 4
  if (name.startsWith(query)) return 3
  if (name.includes(query)) return 2

  const searchable = normalize([title, ...keywords].join(' '))

  return query.split(' ').every((word) => searchable.includes(word)) ? 1 : 0
}

export const getDestinationGroups = (search: string) => {
  const query = normalize(search)

  if (!query) return defaultGroups

  const items = destinations
    .map((item) => ({ item, score: scoreDestination(item, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)

  return items.length ? [{ heading: 'Результати пошуку', items }] : []
}
