import { checkRole } from './checkRole'

import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (checkRole(['admin'], user)) return true

  return {
    id: {
      equals: user.id,
    },
  }
}
