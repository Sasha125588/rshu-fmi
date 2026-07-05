import { MailIcon, MapPinIcon, PhoneIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { FacebookIcon } from '@/public/images/components/FacebookIcon'
import { InstagramIcon } from '@/public/images/components/InstagramIcon'
import { TiktokIcon } from '@/public/images/components/TiktokIcon'

import type { Route } from 'next'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerGroups: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Навчання',
    links: [
      { label: 'Спеціальності', href: '/#specializations' },
      { label: 'Освітні програми', href: '/#specializations' },
      { label: 'Розклад', href: '/#student' },
      { label: 'Документи', href: '/normatyvni-dokumenty' },
    ],
  },
  {
    title: 'Факультет',
    links: [
      { label: 'Історія', href: '/history' },
      { label: 'Кафедри', href: '/history' },
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
      { label: 'Освітні програми', href: '/#specializations' },
      { label: 'Новини', href: '/news' },
      { label: 'Міжнародна співпраця', href: '/mizhnarodna-spivpratsya' },
    ],
  },
]

const FooterLinkGroup = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div>
    <h3 className="text-accent-foreground font-mono text-xs tracking-[0.12em] uppercase">
      {title}
    </h3>
    <ul className="mt-5 flex flex-col gap-3">
      {links.map((link) => (
        <li key={`${title}-${link.label}`}>
          <Link
            href={link.href as Route}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group text-foreground/68 hover:text-accent-violet inline-flex items-center gap-1 text-sm transition-colors"
          >
            {link.label}
            {link.external && (
              <SquareArrowOutUpRightIcon
                size={14}
                className="text-muted-foreground/50 group-hover:text-accent-violet/55 transition-colors"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export const Footer = async () => {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="px-6 pt-10 pb-6 md:px-8 lg:pt-12 lg:pb-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] ">
          <div>
            <Link
              href="/"
              className="inline-flex opacity-90 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/logo.avif"
                alt="Логотип факультету математики та інформатики РДГУ"
                width={120}
                height={120}
                className="size-28 md:size-44"
              />
            </Link>

            <h2 className="mt-3 max-w-md text-xl leading-snug font-semibold tracking-tight text-balance md:text-2xl">
              Факультет математики та інформатики
            </h2>
            <p className="text-muted-foreground mt-5 max-w-lg text-sm leading-7 md:text-base">
              Освітні програми, студентські сервіси та офіційна інформація факультету в одному
              зрозумілому просторі.
            </p>

            <div
              className="mt-7 flex items-center gap-5"
              aria-label="Соціальні мережі факультету"
            >
              <Separator
                aria-hidden="true"
                className="w-12!"
              />
              <div className="flex items-center gap-5">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram факультету"
                  href="https://www.instagram.com/fmi_rshu/"
                  className="text-muted-foreground transition-[color,opacity,transform, discrete] hover:text-accent-violet focus-visible:text-accent-violet inline-flex size-6 items-center justify-center opacity-70 duration-200 hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none motion-reduce:transform-none"
                >
                  <InstagramIcon
                    aria-hidden="true"
                    className="size-[22px]"
                  />
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok факультету"
                  href="https://www.tiktok.com/@fmi_rshu"
                  className="text-muted-foreground transition-[color,opacity,transform, discrete] hover:text-accent-violet focus-visible:text-accent-violet inline-flex size-6 items-center justify-center opacity-70 duration-200 hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none motion-reduce:transform-none"
                >
                  <TiktokIcon
                    aria-hidden="true"
                    className="size-[22px]"
                  />
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook факультету"
                  href="https://www.facebook.com/groups/1748613002125956/"
                  className="text-muted-foreground transition-[color,opacity,transform, discrete] hover:text-accent-violet focus-visible:text-accent-violet inline-flex size-6 items-center justify-center opacity-70 duration-200 hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none motion-reduce:transform-none"
                >
                  <FacebookIcon
                    aria-hidden="true"
                    className="size-[22px]"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <nav
              aria-label="Навігація у футері"
              className="grid grid-cols-2 sm:grid-cols-3"
            >
              {footerGroups.map((group) => (
                <FooterLinkGroup
                  key={group.title}
                  title={group.title}
                  links={group.links}
                />
              ))}
            </nav>
            <address className="text-muted-foreground flex flex-wrap gap-18 text-sm not-italic">
              <a
                href="https://maps.google.com/?q=Рівне,+вул.+Пластова,+31"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-foreground inline-flex items-center gap-2.5 transition-colors"
              >
                <MapPinIcon
                  className="text-accent-violet"
                  size={20}
                />
                33028, м. Рівне, вул. Пластова, 31
              </a>
              <a
                href="tel:+380362266594"
                className="group hover:text-foreground inline-flex items-center gap-2.5 transition-colors"
              >
                <PhoneIcon
                  className="text-accent-violet"
                  size={20}
                />
                (0362) 26-65-94
              </a>
              <a
                href="mailto:dekanat.fmi@rshu.edu.ua"
                className="group hover:text-foreground inline-flex items-center gap-2.5 transition-colors"
              >
                <MailIcon
                  className="text-accent-violet"
                  size={20}
                />
                dekanat.fmi@rshu.edu.ua
              </a>
            </address>
          </div>
        </div>

        <Separator className="-mx-8 my-6 min-w-screen" />

        <div className="text-muted-foreground flex flex-col gap-4 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ФМІ РДГУ. Усі права захищені.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="https://www.rshu.edu.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Рівненський державний гуманітарний університет
            </Link>
            <Link
              href="https://github.com/Sasha125588"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-violet flex items-center gap-2 transition-colors"
            >
              <span>Created by</span>
              <Image
                src="https://avatars.githubusercontent.com/u/155098366?v=4"
                alt="Sasha"
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
