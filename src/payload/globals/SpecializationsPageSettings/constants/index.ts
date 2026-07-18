export const defaultSpecializationGroups = [
  {
    anchor: 'it',
    interestLabel: 'Цифрові продукти',
    title: 'Програмування й компʼютерні науки',
    description: 'Розробка програмних систем, алгоритми, дані та сучасні цифрові технології.',
    specialtyCodes: [{ code: 'F2' }, { code: 'F3' }],
  },
  {
    anchor: 'digital-education',
    interestLabel: 'Технології в освіті',
    title: 'Цифрові технології та освіта',
    description: 'Інформатика, цифрові інструменти, професійна освіта й педагогічна практика.',
    specialtyCodes: [{ code: 'А5.39' }, { code: 'А4.09' }],
  },
  {
    anchor: 'mathematics',
    interestLabel: 'Математика й аналітика',
    title: 'Математика',
    description: 'Глибока математика, системне мислення та робота зі знаннями.',
    specialtyCodes: [{ code: 'А4.04' }],
  },
] as const

export const defaultApplicantResources = [
  {
    title: 'Вступ {year}: крок за кроком',
    description: 'Основні етапи вступної кампанії та офіційні оголошення РДГУ.',
    destinationType: 'link',
    href: 'https://www.rshu.edu.ua/pryimalna-komisiia',
  },
  {
    title: 'Конкурсний бал і коефіцієнти НМТ',
    description: 'Перевірте актуальні правила розрахунку конкурсного бала.',
    destinationType: 'link',
    href: 'https://www.rshu.edu.ua/pryimalna-komisiia',
  },
  {
    title: 'Документи для вступу',
    description: 'Положення, правила й офіційні матеріали в одному каталозі.',
    destinationType: 'link',
    href: '/normatyvni-dokumenty',
  },
  {
    title: 'Вартість навчання',
    description: 'Порівняйте вартість програм за рівнями та формами навчання.',
    destinationType: 'link',
    href: '/vartist-navchannia',
  },
  {
    title: 'Пільги та спеціальні умови',
    description: 'Інформація для вступників, які мають право на спеціальні умови.',
    destinationType: 'link',
    href: 'https://www.rshu.edu.ua/pryimalna-komisiia',
  },
  {
    title: 'Контакти приймальної комісії',
    description: 'Куди звернутися, якщо потрібна відповідь саме для вашої ситуації.',
    destinationType: 'link',
    href: '/contacts',
  },
] as const
