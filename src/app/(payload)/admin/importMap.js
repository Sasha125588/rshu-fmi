import { SlugField as SlugField_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { S3ClientUploadHandler as S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24 } from '@payloadcms/storage-s3/client'

import { DocumentTitleField as DocumentTitleField_22215b0d03d1872fe78b7e9747827f3e } from '@/payload/collections/Documents/components/DocumentTitleField'

/** @type import('payload').ImportMap */
export const importMap = {
  '@payloadcms/next/client#SlugField': SlugField_2b8867833a34864a02ddf429b0728a40,
  '@/payload/collections/Documents/components/DocumentTitleField#DocumentTitleField':
    DocumentTitleField_22215b0d03d1872fe78b7e9747827f3e,
  '@payloadcms/storage-s3/client#S3ClientUploadHandler':
    S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24,
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
}
