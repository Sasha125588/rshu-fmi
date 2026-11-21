import type { CARD_SELECT } from '../_constants'
import type { TransformCollectionWithSelect } from 'payload'

export type ProjectCardData = TransformCollectionWithSelect<'projects', typeof CARD_SELECT>
