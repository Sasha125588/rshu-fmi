export const PROJECT_CATEGORIES = [
  { value: 'development', label: 'Розробка' },
  { value: 'research', label: 'Наука' },
  { value: 'education', label: 'Освіта' },
  { value: 'competition', label: 'Конкурси' },
  { value: 'volunteering', label: 'Волонтерство' },
  { value: 'internship', label: 'Стажування' },
  { value: 'other', label: 'Інше' },
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['value']
export type ProjectCategoryLabel = (typeof PROJECT_CATEGORIES)[number]['label']

export const PROJECT_CATEGORY_LABELS = Object.fromEntries(
  PROJECT_CATEGORIES.map(({ label, value }) => [value, label])
) as Record<ProjectCategory, ProjectCategoryLabel>
