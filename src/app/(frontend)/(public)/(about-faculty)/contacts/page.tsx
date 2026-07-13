import { ArrowUpRightIcon, MapPinIcon } from 'lucide-react'

import { ContactHero } from './_components/ContactHero/ContactHero'
import { ContactMethods } from './_components/ContactMethods/ContactMethods'
import { Socials } from './_components/Socials/Socials'
import { WorkingHours } from './_components/WorkingHours/WorkingHours'
import { Typography } from '@/components/ui'
import { SITE_URL } from '@/shared/constants'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакти факультету математики та інформатики',
  description:
    'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта та графік роботи.',
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Контакти факультету математики та інформатики',
    description:
      'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта та графік роботи.',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/contacts', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const ContactsPage = () => (
  <div className="overflow-x-clip">
    <ContactHero />

    <main>
      <section
        aria-labelledby="contact-methods-heading"
        className="border-b px-4 py-14 md:px-12 md:py-20"
      >
        <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <div>
            <Typography
              as="p"
              variant="overline"
              className="text-accent-violet"
            >
              На зв’язку
            </Typography>
            <Typography
              as="h2"
              id="contact-methods-heading"
              variant="heading-lg"
              className="mt-4"
            >
              Оберіть зручний спосіб
            </Typography>
          </div>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground max-w-xl self-end leading-7"
          >
            Для загальних питань звертайтеся до деканату. Вступникам найшвидше допоможе приймальна
            комісія університету.
          </Typography>
        </div>

        <ContactMethods />
      </section>

      <section
        aria-labelledby="visit-heading"
        className="border-b px-4 py-14 md:px-12 md:py-20"
      >
        <div className="mb-10 max-w-3xl md:mb-14">
          <Typography
            as="p"
            variant="overline"
            className="text-accent-violet"
          >
            Візит
          </Typography>
          <Typography
            as="h2"
            id="visit-heading"
            variant="heading-lg"
            className="mt-4"
          >
            Адреса та графік роботи
          </Typography>
        </div>

        <WorkingHours />

        <div className="mt-12 md:mt-16">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Typography
                as="p"
                variant="overline"
                className="text-muted-foreground"
              >
                Маршрут
              </Typography>
              <Typography
                as="h3"
                variant="title-lg"
                className="mt-2 flex items-center gap-2"
              >
                <MapPinIcon
                  aria-hidden="true"
                  className="text-accent-violet"
                  size={20}
                />
                вул. Пластова, 31
              </Typography>
            </div>

            <a
              href="https://maps.app.goo.gl/wPUabsdreTq1Sxzw8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-violet inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Прокласти маршрут
              <ArrowUpRightIcon
                aria-hidden="true"
                size={16}
              />
            </a>
          </div>

          <div className="bg-card-new/25 overflow-hidden rounded-2xl border">
            <iframe
              title="Факультет математики та інформатики РДГУ на Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2966.242452682816!2d26.260061!3d50.623521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f1356eedb91df%3A0x259ecbd84d8a6803!2sPlastova%20St%2C%2031%2C%20Rivne%2C%20Rivnens&#39;ka%20oblast%2C%20Ukraine%2C%2033000!5e1!3m2!1sen!2sus!4v1783932670472!5m2!1sen!2sus"
              width="100%"
              height="520"
              className="block h-[24rem] w-full saturate-[0.8] md:h-[32rem] dark:brightness-[0.85] dark:contrast-[1.12]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <Socials />
    </main>
  </div>
)

export default ContactsPage
