export type AcademicCouncilRole = 'chair' | 'deputy-chair' | 'secretary' | 'member'

export const ACADEMIC_COUNCIL_ROLE_LABELS: Record<AcademicCouncilRole, string> = {
  chair: 'Голова Вченої ради',
  'deputy-chair': 'Заступник голови вченої ради факультету',
  secretary: 'Секретар вченої ради факультету',
  member: 'Член вченої ради факультету',
}

export const councilActivity = [
  {
    title: 'Навчально-методична робота',
    description: 'Розвиток освітніх програм і вдосконалення організації навчального процесу.',
  },
  {
    title: 'Наукова діяльність',
    description: 'Координація досліджень, академічних ініціатив і професійного розвитку.',
  },
  {
    title: 'Кадрові питання',
    description: 'Колегіальний розгляд рішень, пов’язаних із викладацьким складом факультету.',
  },
  {
    title: 'Стратегічний розвиток',
    description: 'Визначення пріоритетів і довгострокових напрямів роботи факультету.',
  },
] as const
