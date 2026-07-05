import { checkRole } from './checkRole'

import type { Access } from 'payload'

export const adminOnly: Access = ({ req: { user } }) => checkRole(['admin'], user)
