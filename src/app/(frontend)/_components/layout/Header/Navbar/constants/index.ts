import {
  Building2Icon,
  CalculatorIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  Code2Icon,
  CpuIcon,
  DollarSignIcon,
  FileTextIcon,
  GraduationCapIcon,
  LaptopIcon,
  MapPinIcon,
  NetworkIcon,
  UsersIcon,
} from 'lucide-react'

import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

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
        description: 'Проєктування, розробка, тестування та супровід програмних систем.',
        href: '/educational-programs/f2-inzheneriia-prohramnoho-zabezpechennia-bakalavr',
        icon: Code2Icon,
      },
      {
        title: "Комп'ютерні науки",
        description: 'Алгоритми, штучний інтелект, аналіз даних та машинне навчання.',
        href: '/educational-programs/f3-kompiuterni-nauky-bakalavr',
        icon: CpuIcon,
      },
      {
        title: 'Середня освіта (Інформатика)',
        description: 'ІТ-технології, програмування та сучасна педагогіка.',
        href: '/educational-programs/a4-09-serednia-osvita-informatyka-bakalavr',
        icon: LaptopIcon,
      },
      {
        title: 'Середня освіта (Математика)',
        description: 'Фундаментальна математична база та педагогічна підготовка.',
        href: '/educational-programs/a4-04-serednia-osvita-matematyka-bakalavr',
        icon: CalculatorIcon,
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
        description: 'Пошук за групою, викладачем або аудиторією.',
        href: DEFAULT_SCHEDULE_PATH,
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
