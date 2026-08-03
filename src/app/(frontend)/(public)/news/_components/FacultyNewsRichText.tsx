import {
  type DefaultNodeTypes,
  type DefaultTypedEditorState,
  type SerializedUploadNode,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import type { FacultyNewsMediaData } from '../faculty/_types'
import type { Media } from '@/payload-types'

const FacultyUpload = ({ node }: { node: SerializedUploadNode }) => {
  if (typeof node.value !== 'object') return null

  if ((node.value as Media).mimeType === 'application/pdf') {
    const media = node.value as Media

    return (
      <iframe
        src={media.url!}
        className="h-150 w-full"
      ></iframe>
    )
  }

  const image = node.value as FacultyNewsMediaData

  return (
    <figure className="my-8">
      <div className="bg-muted relative overflow-hidden rounded-lg">
        <Image
          src={image.url}
          alt={image.alt}
          // unoptimized
          width={image.width}
          height={image.height}
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          sizes="(max-width: 767px) calc(100vw - 2rem), 800px"
          style={{ objectPosition: `${image.focalX}% ${image.focalY}%` }}
        />
      </div>
      {!!image.caption && (
        <figcaption className="text-muted-foreground mt-3 text-center text-sm leading-5">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => <FacultyUpload node={node} />,
})

interface FacultyNewsRichTextProps {
  data: DefaultTypedEditorState
}

export const FacultyNewsRichText = ({ data }: FacultyNewsRichTextProps) => (
  <PayloadRichText
    data={data}
    converters={converters}
    className="text-foreground [&_a]:text-primary [&_a]:decoration-primary/35 [&_a:hover]:decoration-primary [&_blockquote]:border-accent-violet [&_blockquote]:text-muted-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:text-lg [&_blockquote]:leading-8 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-9 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:leading-tight [&_h3]:font-semibold [&_h3]:tracking-tight [&_li]:pl-1 [&_li]:leading-8 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:my-5 [&_p]:text-lg [&_p]:leading-8 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-7"
  />
)
