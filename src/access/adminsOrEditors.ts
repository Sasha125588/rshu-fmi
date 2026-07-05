import { checkRole } from './checkRole'

import type { User } from '@/payload-types'

export const adminsOrEditors = ({ req: { user } }: { req: { user: User | null } }) =>
  checkRole(['admin', 'editor'], user)
