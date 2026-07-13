import { ArrowUpRightIcon } from 'lucide-react'

import { SocialData } from './constants/data'
import { Typography } from '@/components/ui'

export const Socials = () => (
  <section
    aria-labelledby="socials-heading"
    className="px-4 py-14 md:px-12 md:py-20"
  >
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
      <div>
        <Typography
          as="p"
          variant="overline"
          className="text-accent-violet"
        >
          Щодня
        </Typography>
        <Typography
          as="h2"
          id="socials-heading"
          variant="heading-lg"
          className="mt-4"
        >
          ФМІ у соціальних мережах
        </Typography>
        <Typography
          as="p"
          variant="body-md"
          className="text-muted-foreground mt-4 max-w-md leading-7"
        >
          Новини, події та студентське життя факультету між офіційними оголошеннями.
        </Typography>
      </div>

      <div className="divide-y border-y">
        {SocialData.map((social) => {
          const IconComponent = social.image

          return (
            <a
              key={social.title}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-4 py-6 transition-colors hover:bg-[color-mix(in_oklch,var(--accent-violet)_4%,transparent)] sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:px-4"
            >
              <span className="border-border bg-background group-hover:border-accent-violet/40 group-hover:text-accent-violet flex size-11 items-center justify-center rounded-full border transition-colors">
                <IconComponent className="size-5" />
              </span>

              <span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Typography
                    as="span"
                    variant="title-sm"
                  >
                    {social.title}
                  </Typography>
                  <Typography
                    as="span"
                    variant="caption"
                    className="font-jetbrains text-muted-foreground"
                  >
                    {social.username}
                  </Typography>
                </span>
                <Typography
                  as="span"
                  variant="body-sm"
                  className="text-muted-foreground mt-1 block"
                >
                  {social.description}
                </Typography>
              </span>

              <span className="text-accent-violet inline-flex items-center gap-1 text-sm font-semibold">
                {social.actionTitle}
                <ArrowUpRightIcon
                  aria-hidden="true"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          )
        })}
      </div>
    </div>
  </section>
)
