import { checkRole } from './checkRole'

import type { FieldAccess } from 'payload'

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => checkRole(['admin'], user)
