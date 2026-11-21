import { ProjectProposalForm } from './_components/ProjectProposalForm'
import { PageBreadcrumbs } from '@/components/common'
import { Typography } from '@/components/ui'
import { getSocialMetadata } from '@/shared/og'

import type { Metadata } from 'next'

const title = 'Запропонувати проєкт'
const description = 'Поділися ідеєю для проєкту факультету математики та інформатики РДГУ.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects/propose' },
  ...getSocialMetadata('/projects/propose', title, description),
}

const ProposeProjectPage = () => (
  <section
    aria-labelledby="propose-project-heading"
    className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 pt-8 pb-14 sm:px-6 sm:pb-20"
  >
    <PageBreadcrumbs
      current={title}
      parents={[{ href: '/projects', label: 'Долучитися' }]}
    />
    <ProjectProposalForm
      intro={
        <header className="flex flex-col gap-3">
          <Typography
            as="h1"
            id="propose-project-heading"
            variant="heading-lg"
          >
            {title}
          </Typography>
          <Typography
            as="p"
            variant="body-lg"
            className="text-muted-foreground"
          >
            Розкажи про свою ідею, навіть якщо команди ще немає. Пропозиція не з’явиться в каталозі,
            доки її не перегляне адміністратор.
          </Typography>
        </header>
      }
    />
  </section>
)

export default ProposeProjectPage
