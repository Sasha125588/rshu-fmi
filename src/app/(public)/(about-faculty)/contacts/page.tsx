import { Building, MapPin, Phone } from 'lucide-react'

import { ContactMethods } from './components/ContactMethods/ContactMethods'
import { Socials } from './components/Socials/Socials'
import { WorkingHours } from './components/WorkingHours/WorkingHours'
import { Badge } from '@/components/ui/badge'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакти факультету математики та інформатики',
  description:
    'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта',
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Контакти факультету математики та інформатики',
    description:
      'Контактна інформація факультету математики та інформатики РДГУ: адреса, телефони, електронна пошта',
    images: [
      {
        url: new URL(
          '/images/logo.webp',
          process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
        ).href,

        width: 120,
        height: 120,
        type: 'image/webp',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/contacts', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const ContactsPage = () => (
  <div className="bg-background min-h-screen">
    {/* Hero Section */}
    <div className="pb-12">
      <div className="mb-6 flex items-center gap-3">
        <Phone className="text-green-primary h-5 w-5" />
        <Badge
          className="border-green-primary/20 text-green-primary text-sm font-normal"
          variant="outline"
        >
          Зв&apos;язок з нами
        </Badge>
      </div>
      <h1 className="mb-6 text-5xl leading-tight font-semibold">
        Контакти
        <br />
        <span className="text-green-primary">факультету</span>
      </h1>
      <p className="text-muted-foreground max-w-3xl text-xl leading-relaxed">
        Ми завжди готові відповісти на ваші питання та надати необхідну інформацію про навчання,
        вступ та діяльність факультету математики та інформатики.
      </p>
    </div>

    {/* Contact Information */}
    <div className="space-y-8">
      {/* Address Section */}
      <div className="from-green-primary/5 to-green-primary/2 rounded-2xl bg-gradient-to-r p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <MapPin className="text-green-primary h-6 w-6" />
          <h2 className="text-2xl font-semibold">Адреса</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex h-full flex-col space-y-4">
            <div className="border-green-primary/20 bg-background flex-1 rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-3">
                <Building className="text-green-primary h-5 w-5" />
                <h3 className="text-lg font-semibold">Факультет математики та інформатики</h3>
              </div>
              <div className="text-muted-foreground space-y-2">
                <p className="text-primary/80">
                  <strong>Рівненський державний гуманітарний університет</strong>
                </p>
                <p>33028, Україна</p>
                <p>м. Рівне, вул. Пластова, 31</p>
                <p>каб. 108</p>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col space-y-4">
            <div className="bg-primary/3 border-primary/10 flex-1 rounded-lg border p-6">
              <h3 className="mb-3 text-lg font-semibold">Як нас знайти</h3>
              <ul className="text-primary/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary/80 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Центральний корпус університету</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary/80 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>1-й поверх, кабінет 108</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary/80 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Зручне транспортне сполучення</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary/80 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Паркування поблизу університету</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ContactMethods />

      <WorkingHours />

      <Socials />

      {/* Call to action */}
      <div className="from-green-primary to-green-secondary dark:from-green-primary/30 dark:to-green-secondary/30 rounded-2xl bg-gradient-to-r p-8 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-semibold">Маєте питання?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-xl leading-relaxed text-white/90 opacity-90">
            Наша команда завжди готова допомогти. Зв&apos;яжіться з нами зручним для вас способом, і
            ми надамо всю необхідну інформацію про навчання на факультеті.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <a
              href="tel:+380362266594"
              className="rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30"
            >
              📞 Зателефонувати
            </a>
            <a
              href="mailto:dekanat.fmi@rshu.edu.ua"
              className="rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30"
            >
              ✉️ Написати email
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ContactsPage
