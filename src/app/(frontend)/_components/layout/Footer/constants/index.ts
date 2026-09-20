import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

export const footerGroups = [
  {
    title: 'Навчання',
    links: [
      { label: 'Спеціальності', href: '/educational-programs' },
      { label: 'Вартість навчання', href: '/vartist-navchannia' },
      { label: 'Розклад', href: DEFAULT_SCHEDULE_PATH },
      { label: 'Документи', href: '/normatyvni-dokumenty' },
    ],
  },
  {
    title: 'Факультет',
    links: [
      { label: 'Історія', href: '/history' },
      { label: 'Кафедри', href: '/departments' },
      { label: 'Вчена рада', href: '/vchena-rada' },
      { label: 'Контакти', href: '/contacts' },
    ],
  },
  {
    title: 'Абітурієнту',
    links: [
      {
        label: 'Приймальна комісія',
        href: 'https://www.rshu.edu.ua/pryimalna-komisiia',
        external: true,
      },
      { label: 'Вартість навчання', href: '/vartist-navchannia' },
      { label: 'Новини', href: '/news' },
      { label: 'Міжнародна співпраця', href: '/mizhnarodna-spivpratsya' },
    ],
  },
]
