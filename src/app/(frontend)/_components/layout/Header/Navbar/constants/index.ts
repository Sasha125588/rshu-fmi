import {
  BookOpenIcon,
  Building2Icon,
  CalendarDaysIcon,
  ClipboardListIcon,
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
    href: '/#specializations',
    featured: {
      title: 'Освітні програми ФМІ',
      description:
        'Огляд напрямів факультету, сторінки спеціальностей, вступ і документи освітніх програм.',
      href: '/#specializations',
      icon: GraduationCapIcon,
    },
    cards: [
      {
        title: 'Інженерія програмного забезпечення',
        description: 'Сторінка програми, вступ, документи та матеріали ОП.',
        href: '/specializations/software-engineering',
        icon: GraduationCapIcon,
      },
      {
        title: "Комп'ютерні науки",
        description: 'Напрям алгоритмів, даних, AI та програмних систем.',
        href: '/#specializations',
        icon: BookOpenIcon,
      },
      {
        title: 'Середня освіта',
        description: 'Математика, інформатика та підготовка педагогів.',
        href: '/#specializations',
        icon: LandmarkIcon,
      },
      {
        title: 'Усі програми',
        description: 'Повний список бакалаврських і магістерських ОП.',
        href: '/#specializations',
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
        title: 'Освітні програми',
        description: 'Силабуси, редакції ОП та навчальні матеріали.',
        href: '/#specializations',
        icon: GraduationCapIcon,
      },
      {
        title: 'Документи',
        description: 'Нормативні матеріали та офіційна інформація.',
        href: '/normatyvni-dokumenty',
        icon: FileTextIcon,
      },
      {
        title: 'Рейтинг студентів',
        description: 'Академічні результати та конкурсні позиції.',
        href: '/#student',
        icon: UsersIcon,
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
