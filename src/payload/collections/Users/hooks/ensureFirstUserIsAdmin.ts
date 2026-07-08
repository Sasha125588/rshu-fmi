import type { User } from '@/payload-types'
import type { FieldHook } from 'payload'

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ operation, req, value }) => {
  if (operation !== 'create') return value

  const users = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 0,
    overrideAccess: true,
    req,
  })

  if (users.totalDocs > 0 || (value ?? []).includes('admin')) return value

  return [...(value ?? []), 'admin']
}
