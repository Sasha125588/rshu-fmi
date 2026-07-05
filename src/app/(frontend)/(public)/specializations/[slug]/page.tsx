import { notFound } from 'next/navigation'

import {
  SPECIALIZATIONS,
  getSpecializationBySlug,
  getSpecializationDepartment,
} from '../../(data)/specializations'
import { DocumentsPanel } from './components/DocumentsPanel'
import { SpecializationHero } from './components/SpecializationHero'
import { SpecializationSection } from './components/SpecializationSection'

import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  SPECIALIZATIONS.map((specialization) => ({
    slug: specialization.slug,
  }))

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const specialization = getSpecializationBySlug(slug)

  if (!specialization) {
    notFound()
  }

  return {
    title: `${specialization.title} | ФМІ РДГУ`,
    description: specialization.description,
  }
}

const SpecializationPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const specialization = getSpecializationBySlug(slug)

  if (!specialization) {
    notFound()
  }

  const department = getSpecializationDepartment(specialization)

  return (
    <div className="mx-auto max-w-6xl">
      <SpecializationHero
        specialization={specialization}
        department={department}
      />

      <SpecializationSection
        eyebrow="careers"
        title="Ким зможеш працювати"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specialization.careers.map((career) => (
            <div
              key={career}
              className="border-border/60 bg-card/40 rounded-lg border p-4 font-medium"
            >
              {career}
            </div>
          ))}
        </div>
      </SpecializationSection>

      <SpecializationSection
        eyebrow="study"
        title="Що вивчатимеш"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {specialization.studyFocus.map((item) => (
            <li
              key={item}
              className="text-muted-foreground border-border/60 rounded-lg border p-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </SpecializationSection>

      <SpecializationSection
        eyebrow="admission"
        title="Як вступити"
      >
        <ol className="space-y-3">
          {specialization.admission.map((item, index) => (
            <li
              key={item}
              className="flex gap-4"
            >
              <span className="text-green-primary font-mono text-xl font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground pt-1">{item}</span>
            </li>
          ))}
        </ol>
      </SpecializationSection>

      {specialization.tuition ? (
        <SpecializationSection
          eyebrow="tuition"
          title={specialization.tuition.label}
        >
          <div className="border-border/60 bg-card/40 rounded-lg border p-6">
            <p className="text-2xl font-semibold">{specialization.tuition.value}</p>
            <p className="text-muted-foreground mt-2 text-sm">{specialization.tuition.note}</p>
          </div>
        </SpecializationSection>
      ) : null}

      <div id="documents">
        <SpecializationSection
          eyebrow="documents"
          title="Документи освітньої програми"
        >
          <DocumentsPanel documents={specialization.documents} />
        </SpecializationSection>
      </div>

      {department ? (
        <SpecializationSection
          eyebrow="department"
          title="Відповідальна кафедра"
        >
          <a
            href={department.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/60 bg-card/40 hover:border-green-primary/40 block rounded-lg border p-6 transition"
          >
            <p className="text-xl font-semibold">{department.name}</p>
            <p className="text-muted-foreground mt-2">{department.description}</p>
          </a>
        </SpecializationSection>
      ) : null}

      <SpecializationSection
        eyebrow="faq"
        title="Питання про програму"
      >
        <div className="divide-border/60 divide-y rounded-lg border">
          {specialization.faq.map((item) => (
            <details
              key={item.question}
              className="group p-5"
            >
              <summary className="cursor-pointer font-semibold">{item.question}</summary>
              <p className="text-muted-foreground mt-3 leading-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </SpecializationSection>
    </div>
  )
}

export default SpecializationPage
