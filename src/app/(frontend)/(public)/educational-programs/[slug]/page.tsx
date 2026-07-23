import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamicParams = true

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

interface EducationalProgramPageProps {
  params: Promise<{ slug: string }>
}

const EducationalProgramPage = async ({ params }: EducationalProgramPageProps) => {
  const { slug } = await params

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'educational-programs',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      title: true,
    },
    where: {
      slug: { equals: slug },
    },
  })

  const educationalProgram = result.docs[0]

  if (!educationalProgram) notFound()

  return (
    <>
      {educationalProgram.title} – {educationalProgram.slug}
    </>
  )
}

export default EducationalProgramPage
