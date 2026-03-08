import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Міжнародна співпраця факультету математики та інформатики',
  description:
    'Міжнародні стажування, програми подвійного диплому та семестрового навчання факультету математики та інформатики РДГУ',
  alternates: {
    canonical: '/mizhnarodna-spivpratsya',
  },
  openGraph: {
    title: 'Міжнародна співпраця факультету математики та інформатики',
    description:
      'Міжнародні стажування, програми подвійного диплому та семестрового навчання факультету математики та інформатики РДГУ',
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
    url: new URL(
      '/mizhnarodna-spivpratsya',
      process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    ).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const MizhnarodnaSpivpratsyaPage = () => (
  <div className="bg-background min-h-screen">
    {/* Hero Section */}
    <div className="pb-12">
      <div className="mb-6 flex items-center gap-3">
        <Globe className="text-green-primary h-5 w-5" />
        <Badge
          className="border-green-primary/20 text-green-primary text-sm font-normal"
          variant="outline"
        >
          Міжнародна діяльність
        </Badge>
      </div>
      <h1 className="mb-6 text-5xl leading-tight font-semibold text-gray-900">
        Міжнародна
        <br />
        <span className="text-green-primary">співпраця</span>
      </h1>
      <p className="max-w-3xl text-xl leading-relaxed text-gray-600">
        Факультет активно розвиває міжнародні зв&apos;язки, надаючи студентам та викладачам
        можливості для стажувань, навчання за кордоном та отримання подвійних дипломів європейського
        зразка.
      </p>
    </div>

    {/* Content Sections */}
    <div className="space-y-12">
      {/* International Internships */}
      <div className="from-green-primary/5 rounded-2xl bg-gradient-to-r to-transparent p-8">
        <div className="mb-8 flex items-center gap-3">
          <Award className="text-green-primary h-6 w-6" />
          <h2 className="text-3xl font-semibold text-gray-900">Міжнародні стажування</h2>
        </div>

        {/* UMCS Lublin */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="mb-4 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Університет Марії Кюрі-Склодовської
              </h3>
              <p className="text-blue-600">
                м. Люблін, Польща • Факультет математики, фізики та інформатики
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* 2018 */}
            <div className="rounded-lg bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="text-green-primary h-4 w-4" />
                <span className="text-green-primary font-semibold">2018 рік</span>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Бабич Степанія Михайлівна – к.т.н., доцент</li>
                  <li>• Гнедко Наталя Михайлівна – к.п.н., доцент</li>
                  <li>• Музичук Катерина Петрівна – к.т.н.</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Остапчук Наталія Олександрівна – к.п.н., доцент</li>
                  <li>• Павлова Наталія Степанівна – к.п.н., доцент</li>
                </ul>
              </div>
            </div>

            {/* 2019 */}
            <div className="rounded-lg bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="text-green-primary h-4 w-4" />
                <span className="text-green-primary font-semibold">2019 рік</span>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Шроль Тетяна Степанівна – к.п.н.</li>
                  <li>• Сінчук Алеся Михайлівна – к.т.н., доцент</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Сяський Володимир Андрійович – к.т.н., доцент</li>
                </ul>
              </div>
            </div>

            {/* 2020 */}
            <div className="rounded-lg bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="text-green-primary h-4 w-4" />
                <span className="text-green-primary font-semibold">2020 рік</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Полюхович Наталія Вікторівна – к.п.н.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Other Institutions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h4 className="mb-2 font-semibold text-gray-900">
              Інститут Науково-дослідний Люблінського науково-технологічного парку
            </h4>
            <p className="mb-3 text-sm text-green-700">м. Люблін, Польща</p>
            <div className="rounded bg-white p-3">
              <p className="text-green-primary mb-1 text-sm font-medium">2021 рік</p>
              <p className="text-sm text-gray-700">• Гнедко Наталя Михайлівна – к.п.н., доцент</p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h4 className="mb-2 font-semibold text-gray-900">Вища школа Банкової Познані (WSB)</h4>
            <p className="mb-3 text-sm text-purple-700">м. Щецин, Польща</p>
            <div className="rounded bg-white p-3">
              <p className="text-green-primary mb-1 text-sm font-medium">2017 рік</p>
              <p className="text-sm text-gray-700">• Петренко Сергій Вікторович – к.п.н., доцент</p>
            </div>
          </div>

          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 md:col-span-2">
            <h4 className="mb-2 font-semibold text-gray-900">Вища школа менеджменту</h4>
            <p className="mb-3 text-sm text-orange-700">Варшава, Польща</p>
            <div className="rounded bg-white p-3">
              <p className="text-green-primary mb-1 text-sm font-medium">2019 рік</p>
              <p className="text-sm text-gray-700">
                • Руденко Володимир Миколайович – д.п.н., професор
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Double Diploma Program */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8">
        <div className="mb-6 flex items-center gap-3">
          <GraduationCap className="text-green-primary h-6 w-6" />
          <h2 className="text-3xl font-semibold text-gray-900">Програма «Подвійний диплом»</h2>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-green-primary flex h-10 w-10 items-center justify-center rounded-full">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Спеціальність 015.39 «Професійна освіта (Цифрові технології)»
              </h3>
              <p className="text-sm text-gray-600">
                РДГУ + Природничо-гуманітарний університет імені Яна Длугоша в Ченстохові (Польща)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Переваги програми:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Два дипломи: українського та європейського зразка</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Працевлаштування в ЄС без нострифікації</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Без оформлення дозволу на роботу в ЄС</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Можливості:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Паралельне навчання в двох університетах</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Визнання в усіх країнах ЄС</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <span>Працевлаштування в Україні без нострифікації</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-sm text-gray-700">
              <strong>Спеціальність в Польщі:</strong> «Інформатика» – диплом європейського зразка
            </p>
          </div>
        </div>
      </div>

      {/* Semester Programs */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
        <div className="mb-6 flex items-center gap-3">
          <Users className="text-green-primary h-6 w-6" />
          <h2 className="text-3xl font-semibold text-gray-900">Програми семестрового навчання</h2>
        </div>

        <div className="mb-6 rounded-lg border border-purple-200 bg-white p-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Університет ім. Яна Длугоша в Ченстохові (Польща)
          </h3>

          <div className="space-y-6">
            {/* 2017-2018 */}
            <div className="rounded-lg bg-purple-50 p-4">
              <h4 className="mb-3 font-semibold text-purple-900">2017-2018 навчальний рік</h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Дуброва Олександра Вікторівна – 4 курс, Середня освіта (Інформатика)</li>
                  <li>• Ковальова Тетяна Юріївна – 3 курс, Середня освіта (Математика)</li>
                  <li>• Масюк Оксана Володимирівна – 3 курс, Середня освіта (Математика)</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Троцюк Юлія Олександрівна – 3 курс, Середня освіта (Математика)</li>
                  <li>• Телетьон Юлія Володимирівна – 4 курс, Середня освіта (Математика)</li>
                  <li>• Чібізов Віталій Віталійович – 2 курс, Комп&apos;ютерні науки</li>
                </ul>
              </div>
            </div>

            {/* 2018-2019 */}
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-3 font-semibold text-blue-900">2018-2019 навчальний рік</h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Ажнюк Тарас Борисович – 4 курс, Середня освіта (Математика)</li>
                  <li>• Басюк Василь Валерійович – 4 курс, Середня освіта (Математика)</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Кондратюк Катерина Михайлівна – 4 курс, Середня освіта (Математика)</li>
                  <li>• Логощук Тарас Васильович – 4 курс, Середня освіта (Математика)</li>
                </ul>
              </div>
            </div>

            {/* 2019-2020 */}
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-3 font-semibold text-green-900">2019-2020 навчальний рік</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • Солтис Андрій Сергійович – 1 курс магістратури, Середня освіта (Математика)
                </li>
                <li>• Ажнюк Тарас Борисович – 1 курс магістратури, Середня освіта (Математика)</li>
                <li>
                  • Лютко Євгеній Володимирович – 4 курс, Професійна освіта (Комп&apos;ютерні
                  технології)
                </li>
              </ul>
            </div>

            {/* 2021-2022 */}
            <div className="rounded-lg bg-orange-50 p-4">
              <h4 className="mb-3 font-semibold text-orange-900">2021-2022 навчальний рік</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Рижик Валерія Ігорівна – 3 курс, Середня освіта (Інформатика)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* International Relations Center */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8">
        <div className="mb-6 flex items-center gap-3">
          <Globe className="text-green-primary h-6 w-6" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Центр міжнародних відносин та роботи з іноземними студентами РДГУ
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-green-primary/5 rounded-lg p-4">
              <div className="mb-3 flex items-center gap-2">
                <ExternalLink className="text-green-primary h-4 w-4" />
                <span className="font-medium text-gray-800">Веб-сайт</span>
              </div>
              <Link
                href="http://dir.rshu.edu.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary hover:underline"
              >
                http://dir.rshu.edu.ua/
              </Link>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-800">Електронна пошта</span>
              </div>
              <Link
                href="mailto:dir@rshu.edu.ua"
                className="text-blue-600 hover:underline"
              >
                dir@rshu.edu.ua
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="font-medium text-gray-800">Телефон</span>
              </div>
              <Link
                href="tel:+380689598876"
                className="text-green-600 hover:underline"
              >
                +38 (068) 959 88 76
              </Link>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-gray-800">Соціальні мережі</span>
              </div>
              <Link
                href="https://www.facebook.com/rshu.international"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="from-green-primary to-green-secondary rounded-2xl bg-gradient-to-r p-8 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-semibold">Цікавить міжнародна освіта?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-xl leading-relaxed opacity-90">
            Приєднуйтесь до наших міжнародних програм! Отримайте європейську освіту, розширте свої
            горизонти та відкрийте нові можливості для кар&apos;єри.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Link
              href="http://dir.rshu.edu.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30"
            >
              🌍 Дізнатися більше
            </Link>
            <Link
              href="mailto:dir@rshu.edu.ua"
              className="rounded-full bg-white/20 px-6 py-3 font-medium transition-all duration-200 hover:bg-white/30"
            >
              ✉️ Зв&apos;язатися з нами
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MizhnarodnaSpivpratsyaPage
