import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'

import { contactMethods } from './constants'
import { Typography } from '@/components/ui'

export const ContactMethods = () => (
  <div className="divide-y border-y">
    {contactMethods.map((method) => (
      <article
        key={method.number}
        className="group grid gap-5 py-7 md:grid-cols-[4rem_minmax(16rem,0.85fr)_minmax(14rem,1fr)_auto] md:items-center md:gap-8 md:py-9"
      >
        <Typography
          as="p"
          variant="body-sm"
          className="font-jetbrains text-muted-foreground/55"
        >
          {method.number}
        </Typography>

        <div>
          <Typography
            as="p"
            variant="overline"
            className="text-muted-foreground"
          >
            {method.label}
          </Typography>
          <a
            href={method.href}
            className="group/link mt-2 inline-flex max-w-full items-center gap-2 underline-offset-4 hover:underline"
          >
            <Typography
              as="span"
              variant="title-lg"
              className="break-all md:break-normal"
            >
              {method.value}
            </Typography>
            <ArrowRightIcon
              aria-hidden="true"
              size={18}
              className="text-accent-violet shrink-0 transition-transform group-hover/link:translate-x-0.5"
            />
          </a>
        </div>

        <Typography
          as="p"
          variant="body-sm"
          className="text-muted-foreground max-w-md leading-6"
        >
          {method.description}
        </Typography>

        <a
          href={method.href}
          className="text-accent-violet inline-flex w-fit items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {method.action}
          {method.external ? (
            <ArrowUpRightIcon
              aria-hidden="true"
              size={15}
            />
          ) : (
            <ArrowRightIcon
              aria-hidden="true"
              size={15}
            />
          )}
        </a>
      </article>
    ))}
  </div>
)
