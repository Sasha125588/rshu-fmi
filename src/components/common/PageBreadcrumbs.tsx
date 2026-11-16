import Link from 'next/link'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui'

import type { Route } from 'next'

interface PageBreadcrumbsProps {
  current: string
  parents: readonly { href: Route; label: string }[]
  className?: string
}

export const PageBreadcrumbs = ({ current, parents, className }: PageBreadcrumbsProps) => (
  <Breadcrumb
    aria-label="Шлях сторінки"
    className={className}
  >
    <BreadcrumbList>
      {parents.map(({ href, label }) => (
        <Fragment key={href}>
          <BreadcrumbItem className="max-w-full min-w-0">
            <BreadcrumbLink
              className="wrap-anywhere"
              render={<Link href={href} />}
            >
              {label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </Fragment>
      ))}
      <BreadcrumbItem className="max-w-full min-w-0">
        <BreadcrumbPage className="wrap-anywhere">{current}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)
