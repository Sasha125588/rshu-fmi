import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { DocumentExplorer } from './_components/DocumentExplorer/DocumentExplorer'
import { NormatyvniDokumentyBackground } from './_components/NormatyvniDokumentyBackground/NormatyvniDokumentyBackground'
import { toCatalogDocument } from './_helpers'
import { Typography } from '@/components/ui'
import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'
import { getSocialMetadata } from '@/shared/og'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нормативні документи',
  description: 'Нормативні документи факультету математики та інформатики',
  alternates: {
    canonical: '/normatyvni-dokumenty',
  },
  ...getSocialMetadata(
    '/normatyvni-dokumenty',
    'Нормативні документи факультету математики та інформатики',
    'Нормативні документи факультету математики та інформатики'
  ),
}

const NormatyvniDokumentyPage = async () => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(
    CONTENT_CACHE_TAGS.documents,
    CONTENT_CACHE_TAGS.documentCategories,
    CONTENT_CACHE_TAGS.media
  )

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'documents',
    depth: 1,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', '-documentDate', 'title'],
    where: {
      showInRegulatoryCatalog: {
        equals: true,
      },
    },
  })
  const documents = result.docs.map(toCatalogDocument).filter((document) => document !== null)

  return (
    <div className="overflow-x-clip">
      <header className="relative isolate overflow-hidden border-b px-4 py-10 md:px-12 md:py-14">
        <NormatyvniDokumentyBackground />
        <div className="relative z-10 max-w-3xl">
          <Typography
            as="h1"
            variant="heading-xl"
            className="font-black"
          >
            Нормативні документи
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-5 max-w-2xl leading-7 md:text-lg"
          >
            Положення, накази, програми та інші документи факультету й університету в одному
            каталозі.
          </Typography>
        </div>
      </header>

      <Suspense>
        <DocumentExplorer documents={documents} />
      </Suspense>
    </div>
  )
}

export default NormatyvniDokumentyPage
