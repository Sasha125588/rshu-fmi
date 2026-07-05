import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Landmark,
  MapPin,
  Network,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  buttonVariants,
  navigationMenuTriggerStyle,
} from '@/components/ui'
import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'

type NavCard = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  external?: boolean
}

type NavItem = {
  label: string
  href: string
  featured?: NavCard
  cards?: NavCard[]
}

const navItems: NavItem[] = [
  {
    label: 'Спеціальності',
    href: '/#specializations',
    featured: {
      title: 'Освітні програми ФМІ',
      description:
        'Огляд напрямів факультету, сторінки спеціальностей, вступ і документи освітніх програм.',
      href: '/#specializations',
      icon: GraduationCap,
    },
    cards: [
      {
        title: 'Інженерія програмного забезпечення',
        description: 'Сторінка програми, вступ, документи та матеріали ОП.',
        href: '/specializations/software-engineering',
        icon: GraduationCap,
      },
      {
        title: "Комп'ютерні науки",
        description: 'Напрям алгоритмів, даних, AI та програмних систем.',
        href: '/#specializations',
        icon: BookOpen,
      },
      {
        title: 'Середня освіта',
        description: 'Математика, інформатика та підготовка педагогів.',
        href: '/#specializations',
        icon: Landmark,
      },
      {
        title: 'Усі програми',
        description: 'Повний список бакалаврських і магістерських ОП.',
        href: '/#specializations',
        icon: FileText,
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
      icon: ClipboardList,
    },
    cards: [
      {
        title: 'Розклад',
        description: 'Посилання на актуальні розклади за курсами.',
        href: '/#student',
        icon: CalendarDays,
      },
      {
        title: 'Освітні програми',
        description: 'Силабуси, редакції ОП та навчальні матеріали.',
        href: '/#specializations',
        icon: GraduationCap,
      },
      {
        title: 'Документи',
        description: 'Нормативні матеріали та офіційна інформація.',
        href: '/normatyvni-dokumenty',
        icon: FileText,
      },
      {
        title: 'Рейтинг студентів',
        description: 'Академічні результати та конкурсні позиції.',
        href: '/#student',
        icon: Users,
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
      icon: Building2,
    },
    cards: [
      {
        title: 'Про факультет',
        description: 'Історія, структура та ключова інформація.',
        href: '/history',
        icon: Building2,
      },
      {
        title: 'Вчена рада',
        description: 'Склад і робота вченої ради факультету.',
        href: '/vchena-rada',
        icon: Users,
      },
      {
        title: 'Контакти',
        description: 'Деканат, адреса та канали звʼязку.',
        href: '/contacts',
        icon: MapPin,
      },
      {
        title: 'Кафедри',
        description: 'Структура факультету та освітні напрями кафедр.',
        href: '/history',
        icon: Network,
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

const NavPanelCard = ({ card, featured = false }: { card: NavCard; featured?: boolean }) => {
  const Icon = card.icon

  return (
    <NavigationMenuLink
      render={
        <Link
          href={card.href as Route}
          target={card.external ? '_blank' : undefined}
          rel={card.external ? 'noopener noreferrer' : undefined}
        />
      }
      className={cn(
        'group bg-card text-card-foreground hover:border-foreground/20 hover:bg-accent/55 focus:bg-accent/55 flex-col items-stretch gap-0 rounded-lg border transition-colors',
        featured
          ? 'relative row-span-2 flex min-h-[292px] overflow-hidden p-4'
          : 'flex min-h-[140px] flex-col p-4'
      )}
    >
      {featured && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_20%,transparent)_1px,transparent_1px)] bg-size-[10px_10px] opacity-60" />
      )}

      <span className={cn('flex flex-col', featured && 'relative mt-auto w-full')}>
        <span className="bg-foreground text-background mb-7 flex size-8 items-center justify-center rounded-md">
          <Icon />
        </span>

        <span className="flex items-start justify-between gap-4">
          <span
            className={cn(
              'text-foreground font-semibold',
              featured ? 'text-lg leading-6' : 'text-[15px] leading-5'
            )}
          >
            {card.title}
          </span>
          <ArrowRight className="text-muted-foreground group-hover:text-foreground mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </span>

        <span
          className={cn(
            'text-muted-foreground mt-2 text-sm',
            featured ? 'max-w-sm leading-6' : 'leading-5'
          )}
        >
          {card.description}
        </span>
      </span>
    </NavigationMenuLink>
  )
}

export const Navbar = () => (
  <div className="flex w-full items-center gap-5">
    <NavigationMenu
      className="max-w-none flex-1 justify-start"
      collisionPadding={0}
    >
      <NavigationMenuList className="justify-start gap-0.5">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.featured && item.cards ? (
              <>
                <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground focus:text-foreground data-popup-open:text-foreground bg-transparent px-3 shadow-none">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid min-h-84 w-dvw grid-cols-[1.08fr_1fr_1fr] grid-rows-2 gap-1.5">
                  <NavPanelCard
                    card={item.featured}
                    featured
                  />
                  {item.cards.map((card) => (
                    <NavPanelCard
                      key={card.title}
                      card={card}
                    />
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                render={<Link href={item.href as Route} />}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-muted-foreground hover:bg-accent/60 hover:text-foreground focus:bg-accent/60 focus:text-foreground data-popup-open:bg-accent/60 data-popup-open:text-foreground bg-transparent px-3 shadow-none'
                )}
              >
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

    <Link
      href="https://www.rshu.edu.ua/pryimalna-komisiia"
      prefetch={false}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
        })
      )}
    >
      Вступнику
      <ArrowRight data-icon="inline-end" />
    </Link>
  </div>
)
