import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { getEducationalProgramBySlug } from './_api/getEducationalProgramBySlug'
import { Skeleton, Typography } from '@/components/ui'

export const generateStaticParams = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'educational-programs',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return result.docs.map(({ slug }) => ({ slug }))
}

type EducationalProgramPageProps = PageProps<'/educational-programs/[slug]'>
type EducationalProgramContentProps = Pick<EducationalProgramPageProps, 'params'>

const EducationalProgramContent = async ({ params }: EducationalProgramContentProps) => {
  const { slug } = await params
  const educationalProgram = await getEducationalProgramBySlug(slug)

  if (!educationalProgram) notFound()

  return (
    <div data-testid="educational-program-content">
      <Typography
        as="h2"
        variant="heading-2xl"
        className="pb-4"
      >
        coming soon
      </Typography>
      {educationalProgram.title} – {educationalProgram.slug}
    </div>
  )
}

const EducationalProgramFallback = () => (
  <div
    aria-hidden="true"
    className="space-y-4"
  >
    <Skeleton className="h-12 w-64 max-w-full" />
    <Skeleton className="h-5 w-80 max-w-full" />
  </div>
)

const EducationalProgramPage = ({ params }: EducationalProgramPageProps) => (
  <div data-testid="educational-program-shell">
    <Suspense fallback={<EducationalProgramFallback />}>
      <EducationalProgramContent params={params} />
    </Suspense>
  </div>
)

export default EducationalProgramPage
