import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/components/ui'

import type { Route } from 'next'

interface ApplicantResourcesProps {
  resources: {
    description: string
    href: string
    opensInNewTab: boolean
    title: string
  }[]
}

export const ApplicantResources = ({ resources }: ApplicantResourcesProps) => (
  <section className="px-4 py-12 md:px-12 md:py-16">
    <div className="flex max-w-3xl flex-col gap-3">
      <Typography
        as="p"
        variant="overline"
        className="text-accent-violet"
      >
        Наступний крок
      </Typography>
      <Typography
        as="h2"
        variant="heading-md"
      >
        Корисно перед вступом
      </Typography>
      <Typography
        as="p"
        variant="body-md"
        className="text-muted-foreground"
      >
        Умови, документи й контакти, які знадобляться після вибору спеціальності.
      </Typography>
    </div>

    <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource, index) => {
        const Icon = resource.opensInNewTab ? ArrowUpRightIcon : ArrowRightIcon

        return (
          <Link
            key={`${index}:${resource.href}`}
            href={resource.href as Route}
            className="border-border bg-card hover:border-accent-violet/35 hover:bg-accent-violet/[0.025] flex min-h-44 flex-col justify-between rounded-xl border p-5 transition-colors"
            target={resource.opensInNewTab ? '_blank' : undefined}
            rel={resource.opensInNewTab ? 'noopener noreferrer' : undefined}
          >
            <>
              <span className="flex items-center justify-between gap-4">
                <Typography
                  as="span"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground/65"
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Icon
                  aria-hidden="true"
                  className="text-accent-violet size-5 transition-transform group-hover:translate-x-1"
                />
              </span>

              <span>
                <Typography
                  as="h3"
                  variant="title-md"
                  className="text-pretty"
                >
                  {resource.title}
                </Typography>
                <Typography
                  as="span"
                  variant="body-sm"
                  className="text-muted-foreground mt-2 block max-w-sm"
                >
                  {resource.description}
                </Typography>
              </span>
            </>
          </Link>
        )
      })}
    </div>
  </section>
)
