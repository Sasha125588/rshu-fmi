import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  buttonVariants,
} from '@/components/ui'

interface SubmissionSuccessProps {
  title: string
  description: string
  headingLevel: 1 | 2
  headingId?: string
}

export const SubmissionSuccess = ({
  title,
  description,
  headingLevel,
  headingId,
}: SubmissionSuccessProps) => (
  <Empty
    role="status"
    className="gap-6 px-0 py-9 sm:py-12"
  >
    <EmptyHeader className="gap-4">
      <EmptyMedia className="bg-success text-success-foreground mb-1 size-18 rounded-full">
        <CheckIcon
          aria-hidden="true"
          className="size-7"
        />
      </EmptyMedia>
      <EmptyTitle
        id={headingId}
        role="heading"
        aria-level={headingLevel}
        className="text-2xl leading-tight font-extrabold"
      >
        {title}
      </EmptyTitle>
      <EmptyDescription className="text-base">{description}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Link
        href="/projects"
        className={buttonVariants({ variant: 'outline', size: 'lg' })}
      >
        До всіх проєктів
      </Link>
    </EmptyContent>
  </Empty>
)
