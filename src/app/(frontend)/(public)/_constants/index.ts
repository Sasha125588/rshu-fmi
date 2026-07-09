import { CalendarDaysIcon, FileTextIcon, GraduationCapIcon, MailIcon } from 'lucide-react'

export const quickTags = [
  { label: 'ІПЗ', href: '/specializations/software-engineering' },
  { label: "Комп'ютерні науки", href: '#specializations' },
  { label: 'Розклад', href: '#student' },
  { label: 'Документи', href: '/normatyvni-dokumenty' },
  { label: 'Контакти', href: '/contacts' },
  { label: 'Вступ', href: 'https://www.rshu.edu.ua/pryimalna-komisiia', external: true },
]

export const heroStats = [
  { value: '5', label: 'освітніх програм' },
  { value: '3', label: 'кафедри' },
  { value: '90+', label: 'років традиції' },
  { value: '2', label: 'рівні освіти' },
  { value: '10+', label: 'партнерів' },
] as const

export const studentLinks = [
  {
    title: 'Розклад',
    description: 'Швидкий перехід до актуальних розкладів за курсами.',
    href: '#',
    icon: CalendarDaysIcon,
  },
  {
    title: 'Освітні програми',
    description: 'Спеціальності, документи ОП, силабуси й редакції програм.',
    href: '#specializations',
    icon: GraduationCapIcon,
  },
  {
    title: 'Нормативні документи',
    description: 'Положення, правила, офіційні матеріали факультету.',
    href: '/normatyvni-dokumenty',
    icon: FileTextIcon,
  },
  {
    title: 'Деканат',
    description: 'Контакти, адреса, години роботи та канали звʼязку.',
    href: '/contacts',
    icon: MailIcon,
  },
] as const

export const reasons = [
  {
    title: 'Програмування не окремо від математики',
    description:
      'На факультеті технічні дисципліни не висять у повітрі: алгоритми, логіка, моделювання і розробка збираються в одну траєкторію.',
  },
  {
    title: 'Освітні програми як центр сайту',
    description:
      'Абітурієнт починає зі спеціальності, а студент швидко знаходить документи, силабуси й корисні посилання для своєї програми.',
  },
  {
    title: 'IT, математика та педагогіка поруч',
    description:
      'Факультет готує розробників, аналітично сильних фахівців і викладачів, які можуть пояснювати складні речі людською мовою.',
  },
  {
    title: 'Достатньо офіційно, щоб довіряти',
    description:
      'Новини, документи, контакти й освітні матеріали мають бути доступні без лабіринту меню та випадкових сторінок.',
  },
] as const

export const programRoutes = [
  {
    id: 'it',
    label: 'Я хочу в ІТ',
    programCodes: ['F2', 'F3'],
  },
  {
    id: 'education',
    label: 'Я хочу викладати',
    programCodes: ['А5.39', 'А4.09'],
  },
  {
    id: 'math',
    label: 'Я хочу математику',
    programCodes: ['А4.04'],
  },
] as const

export const faqItems = [
  {
    question: 'З чого почати абітурієнту?',
    answer:
      'Найкраще почати з вибору освітньої програми. Після цього можна перейти до умов вступу, документів програми та контактів кафедри.',
  },
  {
    question: 'Де студенту шукати розклад і документи?',
    answer:
      'Для цього на головній є блок швидкого доступу. У наступних ітераціях ці посилання можна перетворити на повноцінний студентський хаб.',
  },
  {
    question: 'Чому не всі спеціальності одразу мають окремі сторінки?',
    answer:
      'MVP краще робити поступово: спочатку повністю пропрацювати одну сторінку, наприклад ІПЗ, а потім масштабувати той самий шаблон на інші програми.',
  },
] as const
