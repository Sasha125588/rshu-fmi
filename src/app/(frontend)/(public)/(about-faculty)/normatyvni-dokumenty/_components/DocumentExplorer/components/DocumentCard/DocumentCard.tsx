import { ArrowUpRightIcon, Building2Icon, FileTextIcon } from 'lucide-react'

import { buildHighlightedHtml } from './helpers'
import { Badge } from '@/components/ui'

import type { CatalogDocument, DocumentSource } from '../../types'

const sourceLabels: Record<DocumentSource, string> = {
  faculty: 'Факультет',
  university: 'Університет',
}

interface DocumentCardProps {
  query: string
  document: CatalogDocument
  index: number
}

export const DocumentCard = ({ query, document, index }: DocumentCardProps) => {
  const highlightedTitle = buildHighlightedHtml(document.title, query)

  return (
    <a
      href={document.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-border bg-card hover:border-accent-violet/35 hover:shadow-accent-violet/8 flex max-h-42 min-h-42 break-inside-avoid flex-col rounded-xl border p-4 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-jetbrains text-muted-foreground text-xs font-semibold tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Badge
          variant="outline"
          className="border-accent-violet/20 bg-accent-violet/5 text-accent-violet font-jetbrains text-[0.625rem] tracking-[0.08em]"
        >
          <FileTextIcon data-icon="inline-start" />
          {document.type}
        </Badge>
      </div>

      <h2
        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        className="group-hover:text-accent-violet mt-6 line-clamp-2 text-base leading-snug font-semibold transition-colors"
      />

      <div className="text-muted-foreground mt-auto flex items-center justify-between gap-3 pt-6 text-xs font-medium">
        <span className="flex min-w-0 items-center gap-1.5">
          <Building2Icon
            aria-hidden="true"
            className="size-3.5 shrink-0"
          />
          <span className="truncate">
            {document.date ? `Від ${document.date}` : sourceLabels[document.source]}
          </span>
        </span>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="text-accent-violet size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </a>
  )
}
