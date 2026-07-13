import sharp from 'sharp'

import type { CollectionBeforeChangeHook } from 'payload'

const BLUR_PLACEHOLDER_SIZE = 10

export const generateBlurDataURL: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file

  if (!file) return data

  if (!file.mimetype.startsWith('image/')) {
    return {
      ...data,
      blurDataURL: null,
    }
  }

  try {
    const source = req.payloadUploadSizes?.card ?? file.tempFilePath ?? file.data
    const buffer = await sharp(source)
      .rotate()
      .resize(BLUR_PLACEHOLDER_SIZE, BLUR_PLACEHOLDER_SIZE, { fit: 'cover' })
      .avif({ quality: 40 })
      .toBuffer()

    return {
      ...data,
      blurDataURL: `data:image/avif;base64,${buffer.toString('base64')}`,
    }
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: 'Failed to generate a media blur placeholder',
    })

    return {
      ...data,
      blurDataURL: null,
    }
  }
}
