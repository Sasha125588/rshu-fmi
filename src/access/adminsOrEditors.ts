import { checkRole } from './checkRole'

import type { Access } from 'payload'

export const adminsOrEditors: Access = ({ req: { user } }) => checkRole(['admin', 'editor'], user)
