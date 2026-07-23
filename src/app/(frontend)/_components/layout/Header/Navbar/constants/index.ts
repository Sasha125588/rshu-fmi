import {
  BookOpenIcon,
  Building2Icon,
  CalendarDaysIcon,
  ClipboardListIcon,
  DollarSignIcon,
  FileTextIcon,
  GraduationCapIcon,
  LandmarkIcon,
  MapPinIcon,
  NetworkIcon,
  UsersIcon,
} from 'lucide-react'

import type { NavItem } from '../types'

export const NAVIGATION: NavItem[] = [
  {
    label: 'Спеціальності',
    href: '/educational-programs',
    featured: {
      title: 'Освітні програми ФМІ',
      description:
        'Огляд напрямів факультету, сторінки спеціальностей, вступ і документи освітніх програм.',
      href: '/educational-programs',
      icon: GraduationCapIcon,
    },
    cards: [
      {
        title: 'Інженерія програмного забезпечення',
        description: 'Сторінка програми, вступ, документи та матеріали ОП.',
        href: '/educational-programs',
        icon: GraduationCapIcon,
      },
      {
        title: "Комп'ютерні науки",
        description: 'Напрям алгоритмів, даних, AI та програмних систем.',
        href: '/educational-programs',
        icon: BookOpenIcon,
      },
      {
        title: 'Середня освіта',
        description: 'Математика, інформатика та підготовка педагогів.',
        href: '/educational-programs',
        icon: LandmarkIcon,
      },
      {
        title: 'Усі програми',
        description: 'Повний список бакалаврських і магістерських ОП.',
        href: '/educational-programs',
        icon: FileTextIcon,
      },
    ],
  },
  {
    label: 'Студенту',
    href: '/#student',
    featured: {
      title: 'Швидкий доступ студенту',
      description:
        'Розклади, вибіркові дисципліни, рейтинги, документи й основні матеріали в одному місці.',
      href: '/#student',
      icon: ClipboardListIcon,
    },
    cards: [
      {
        title: 'Розклад',
        description: 'Посилання на актуальні розклади за курсами.',
        href: '/#student',
        icon: CalendarDaysIcon,
      },
      {
        title: 'Усі спеціальності',
        description: 'Силабуси, редакції ОП та навчальні матеріали.',
        href: '/educational-programs',
        icon: GraduationCapIcon,
      },
      {
        title: 'Документи',
        description: 'Нормативні матеріали та офіційна інформація.',
        href: '/normatyvni-dokumenty',
        icon: FileTextIcon,
      },
      {
        title: 'Вартість навчання',
        description: 'Вартість навчання та банківські реквізити для оплати.',
        href: '/vartist-navchannia',
        icon: DollarSignIcon,
      },
    ],
  },
  {
    label: 'Факультет',
    href: '/history',
    featured: {
      title: 'Факультет математики та інформатики',
      description: 'Історія, кафедри, деканат, вчена рада та контакти факультету.',
      href: '/history',
      icon: Building2Icon,
    },
    cards: [
      {
        title: 'Про факультет',
        description: 'Історія, структура та ключова інформація.',
        href: '/history',
        icon: Building2Icon,
      },
      {
        title: 'Вчена рада',
        description: 'Склад і робота вченої ради факультету.',
        href: '/vchena-rada',
        icon: UsersIcon,
      },
      {
        title: 'Контакти',
        description: 'Деканат, адреса та канали звʼязку.',
        href: '/contacts',
        icon: MapPinIcon,
      },
      {
        title: 'Кафедри',
        description: 'Структура факультету та освітні напрями кафедр.',
        href: '/departments',
        icon: NetworkIcon,
      },
    ],
  },
  {
    label: 'Документи',
    href: '/normatyvni-dokumenty',
  },
  {
    label: 'Новини',
    href: '/news',
  },
]
