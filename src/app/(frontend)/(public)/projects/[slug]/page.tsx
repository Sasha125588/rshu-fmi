import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getProject, getProjects } from '../_api/queries'
import { ProjectDetail, ProjectDetailSkeleton } from './_components/ProjectDetail/ProjectDetail'
import { getSocialMetadata } from '@/shared/og'

import type { Metadata } from 'next'

type ProjectPageProps = PageProps<'/projects/[slug]'>

export const generateStaticParams = async () => (await getProjects(3)).map(({ slug }) => ({ slug }))

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const canonical = `/projects/${project.slug}`
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    ...getSocialMetadata(canonical, project.title, project.summary, project.updatedAt),
  }
}

const ProjectPage = ({ params }: ProjectPageProps) => (
  <Suspense fallback={<ProjectDetailSkeleton />}>
    {params.then(({ slug }) => (
      <ProjectDetail slug={slug} />
    ))}
  </Suspense>
)

export default ProjectPage
