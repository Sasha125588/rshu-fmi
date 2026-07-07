import { MailIcon, MapPinIcon, PhoneIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Separator, Typography } from '@/components/ui'
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
    <Typography
      as="h3"
      variant="overline"
      className="text-accent-foreground font-mono font-normal tracking-[0.12em]"
    >
      {title}
    </Typography>
    <ul className="mt-5 flex flex-col gap-3">
      {links.map((link) => (
        <li key={`${title}-${link.label}`}>
          <Link
            href={link.href as Route}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group text-foreground/68 hover:text-accent-violet inline-flex items-center gap-1 transition-colors"
          >
            <Typography
              as="span"
              variant="body-sm"
            >
              {link.label}
            </Typography>
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
              className="mb-2 inline-flex opacity-90 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/logo.avif"
                alt="Логотип факультету математики та інформатики РДГУ"
                width={168}
                height={168}
              />
            </Link>

            <Typography
              as="h2"
              variant="title-lg"
            >
              Факультет математики та інформатики
            </Typography>
            <Typography
              as="p"
              variant="body-sm"
              className="text-muted-foreground mt-5 max-w-lg leading-7 md:text-base"
            >
              Освітні програми, студентські сервіси та офіційна інформація факультету в одному
              зрозумілому просторі.
            </Typography>

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
            <address className="text-muted-foreground flex flex-wrap gap-18 not-italic">
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
                <Typography
                  as="span"
                  variant="body-sm"
                >
                  33028, м. Рівне, вул. Пластова, 31
                </Typography>
              </a>
              <a
                href="tel:+380362266594"
                className="group hover:text-foreground inline-flex items-center gap-2.5 transition-colors"
              >
                <PhoneIcon
                  className="text-accent-violet"
                  size={20}
                />
                <Typography
                  as="span"
                  variant="body-sm"
                >
                  (0362) 26-65-94
                </Typography>
              </a>
              <a
                href="mailto:dekanat.fmi@rshu.edu.ua"
                className="group hover:text-foreground inline-flex items-center gap-2.5 transition-colors"
              >
                <MailIcon
                  className="text-accent-violet"
                  size={20}
                />
                <Typography
                  as="span"
                  variant="body-sm"
                >
                  dekanat.fmi@rshu.edu.ua
                </Typography>
              </a>
            </address>
          </div>
        </div>

        <Separator className="-mx-8 my-6 min-w-screen" />

        <div className="text-muted-foreground flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Typography
            as="p"
            variant="caption"
          >
            © {new Date().getFullYear()} ФМІ РДГУ. Усі права захищені.
          </Typography>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Typography
              as="a"
              variant="caption"
              href="https://www.rshu.edu.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Рівненський державний гуманітарний університет
            </Typography>

            <Typography
              as="a"
              href="https://github.com/Sasha125588"
              target="_blank"
              rel="noopener noreferrer"
              variant="caption"
              className="hover:text-accent-violet flex items-center gap-2 transition-colors"
            >
              Created by
              <Image
                src="https://avatars.githubusercontent.com/u/155098366?v=4"
                alt="Sasha"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  )
}
