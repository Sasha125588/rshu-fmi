import { BookOpen, Calculator, Code, Cpu, GraduationCap, Layers } from 'lucide-react'

import type { SpecializationItem, SpecializationVisual } from './types'

export const SPECIALIZATIONS_DATA: SpecializationItem[] = [
  {
    id: 'software-engineering',
    title: 'Інженерія програмного забезпечення',
    shortTitle: 'ІПЗ',
    description:
      'Підготовка фахівців з розробки, проектування та тестування програмного забезпечення для сучасних IT-компаній.',
    tags: ['Програмування', 'Веб-розробка', 'Тестування'],
    date: 'Бакалавр',
    icon: Code,
  },
  {
    id: 'computer-science',
    title: "Комп'ютерні науки",
    shortTitle: 'КН',
    description:
      'Фундаментальна підготовка з алгоритмів, структур даних, машинного навчання та штучного інтелекту.',
    tags: ['Алгоритми', 'ШІ/ML', 'Аналіз даних'],
    date: 'Бакалавр',
    icon: Cpu,
  },
  {
    id: 'professional-education',
    title: 'Професійна освіта (Цифрові технології)',
    shortTitle: 'ПО',
    description:
      'Підготовка викладачів цифрових технологій для професійно-технічних навчальних закладів.',
    tags: ['Педагогіка', 'Цифровізація', 'Професійна освіта'],
    date: 'Бакалавр',
    icon: GraduationCap,
  },
  {
    id: 'secondary-education-cs',
    title: 'Середня освіта (Інформатика)',
    shortTitle: 'СО (інф.)',
    description:
      'Підготовка вчителів інформатики для загальноосвітніх навчальних закладів з сучасними методиками викладання.',
    tags: ['Викладання', 'Інформатика', 'Методика'],
    date: 'Бакалавр',
    icon: BookOpen,
  },
  {
    id: 'secondary-education-math',
    title: 'Середня освіта (Математика)',
    shortTitle: 'СО (мат.)',
    description:
      'Поглиблена підготовка вчителів математики з акцентом на дослідницьку діяльність та інноваційні методики.',
    tags: ['Математика', 'Дослідження', 'Методика'],
    date: 'Магістр',
    icon: Calculator,
  },
  {
    id: 'secondary-education-math-cs',
    title: 'Середня освіта. Математика (Математика, інформатика)',
    shortTitle: 'СОМ',
    description:
      'Комплексна підготовка вчителів з двох предметів: математики та інформатики для універсальності у викладанні.',
    tags: ['Математика', 'Інформатика', 'Інтеграція'],
    date: 'Бакалавр',
    icon: Layers,
  },
]

export const SPECIALIZATIONS_VISUALS: Record<string, SpecializationVisual> = {
  'software-engineering': {
    label: 'deploy.config.ts',
    lines: [
      { text: '// deploy.config.ts', color: 'text-gray-500' },
      { text: 'export default {', color: 'text-blue-400' },
      { text: "  framework: 'Next.js',", color: 'text-green-primary-foreground ' },
      { text: "  deploy: 'production',", color: 'text-green-primary-foreground' },
      { text: "  tests: 'passed ✓'", color: 'text-green-primary-foreground' },
      { text: '}', color: 'text-blue-400' },
    ],
  },
  'computer-science': {
    label: 'terminal',
    lines: [
      { text: '> Training model...', color: 'text-gray-400' },
      { text: 'Epoch 1/10  ██████████  loss: 0.42' },
      { text: 'Epoch 2/10  ████████░░  loss: 0.31' },
      { text: 'Epoch 3/10  ██████████  loss: 0.18' },
      { text: '', color: 'text-gray-500' },
      { text: 'accuracy: 94.7%  ✓', color: 'text-green-primary-foreground' },
    ],
  },
  'professional-education': {
    label: 'curriculum.ui',
    lines: [
      { text: '┌ Digital Curriculum ──────────┐', color: 'text-gray-400' },
      { text: '│ ✓ Web Technologies           │', color: 'text-green-primary-foreground' },
      { text: '│ ✓ Database Design            │', color: 'text-green-primary-foreground' },
      { text: '│ ○ Cloud Computing            │' },
      { text: '│ ○ DevOps Practices           │' },
      { text: '└──────────────────────────────┘', color: 'text-gray-400' },
    ],
  },
  'secondary-education-cs': {
    label: 'fibonacci.py',
    lines: [
      { text: 'def fibonacci(n):', color: 'text-blue-400' },
      { text: '    if n <= 1: return n', color: 'text-gray-300' },
      { text: '    return fibonacci(n-1)', color: 'text-gray-300' },
      { text: '         + fibonacci(n-2)', color: 'text-gray-300' },
      { text: '', color: 'text-gray-500' },
      { text: '# 0, 1, 1, 2, 3, 5, 8...', color: 'text-green-primary-foreground' },
    ],
  },
  'secondary-education-math': {
    label: 'formulas',
    lines: [
      { text: '∫₀^∞ e^(-x²) dx = √π/2', color: 'text-blue-400' },
      { text: '' },
      { text: 'lim(n→∞) (1 + 1/n)ⁿ = e', color: 'text-green-primary-foreground' },
      { text: '' },
      { text: '∑(k=1,n) k² = n(n+1)(2n+1)/6' },
    ],
  },
  'secondary-education-math-cs': {
    label: 'math_code.py',
    lines: [
      { text: 'f(x) = x² + 2x + 1', color: 'text-blue-400' },
      { text: 'roots = solve(f, x)  # [-1]', color: 'text-green-primary-foreground' },
      { text: '' },
      { text: 'plot(f, range=(-5, 5))' },
      { text: '# Visualization: ∪-shape', color: 'text-gray-500' },
    ],
  },
}
