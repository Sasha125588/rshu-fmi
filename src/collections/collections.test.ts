import configPromise from '@payload-config'
import { describe, expect, test } from 'bun:test'

import type { Access, CollectionConfig, Field, FieldAccess } from 'payload'

type TestUser = {
  id: number
  roles?: Array<'admin' | 'editor'>
}

const admin: TestUser = { id: 1, roles: ['admin'] }
const editor: TestUser = { id: 2, roles: ['editor'] }

const getCollection = async (slug: string): Promise<CollectionConfig> => {
  const config = await configPromise
  const collection = config.collections?.find((item) => item.slug === slug)

  expect(collection).toBeDefined()

  return collection as CollectionConfig
}

const findField = (fields: Field[], name: string): Field | undefined => {
  for (const item of fields) {
    if ('name' in item && item.name === name) return item

    if ('fields' in item && Array.isArray(item.fields)) {
      const nestedField = findField(item.fields, name)

      if (nestedField) return nestedField
    }
  }

  return undefined
}

const getField = (fields: Field[], name: string) => {
  const field = findField(fields, name)

  expect(field).toBeDefined()

  return field as Extract<Field, { name: string }>
}

const runAccess = async (access: Access | undefined, user: TestUser | null, id?: number) => {
  expect(typeof access).toBe('function')

  return (access as Access)({ req: { user }, id } as never)
}

const runFieldAccess = async (access: FieldAccess | undefined, user: TestUser | null) => {
  expect(typeof access).toBe('function')

  return (access as FieldAccess)({ req: { user } } as never)
}

describe('Users collection', () => {
  test('allows only admins and editors into the admin panel', async () => {
    const users = await getCollection('users')

    expect(await runAccess(users.access?.admin, admin)).toBe(true)
    expect(await runAccess(users.access?.admin, editor)).toBe(true)
    expect(await runAccess(users.access?.admin, null)).toBe(false)
  })

  test('allows only admins to create, delete, and unlock users', async () => {
    const users = await getCollection('users')

    for (const operation of ['create', 'delete', 'unlock'] as const) {
      expect(await runAccess(users.access?.[operation], admin)).toBe(true)
      expect(await runAccess(users.access?.[operation], editor)).toBe(false)
      expect(await runAccess(users.access?.[operation], null)).toBe(false)
    }
  })

  test('allows editors to read and update only their own account', async () => {
    const users = await getCollection('users')

    expect(await runAccess(users.access?.read, admin)).toBe(true)
    expect(await runAccess(users.access?.update, admin)).toBe(true)
    expect(await runAccess(users.access?.read, editor)).toEqual({ id: { equals: editor.id } })
    expect(await runAccess(users.access?.update, editor)).toEqual({ id: { equals: editor.id } })
    expect(await runAccess(users.access?.read, null)).toBe(false)
  })

  test('protects the roles field from editors', async () => {
    const users = await getCollection('users')
    const roles = getField(users.fields, 'roles')

    expect(roles.type).toBe('select')

    if (roles.type !== 'select') return

    expect(roles.defaultValue).toEqual(['editor'])
    expect(roles.hasMany).toBe(true)
    expect(await runFieldAccess(roles.access?.create, admin)).toBe(true)
    expect(await runFieldAccess(roles.access?.read, admin)).toBe(true)
    expect(await runFieldAccess(roles.access?.update, admin)).toBe(true)
    expect(await runFieldAccess(roles.access?.create, editor)).toBe(false)
    expect(await runFieldAccess(roles.access?.read, editor)).toBe(false)
    expect(await runFieldAccess(roles.access?.update, editor)).toBe(false)
  })

  test('promotes the first created user to admin', async () => {
    const users = await getCollection('users')
    const roles = getField(users.fields, 'roles')

    expect(roles.type).toBe('select')

    if (roles.type !== 'select') return

    const hook = roles.hooks?.beforeChange?.[0]

    expect(hook).toBeDefined()

    const value = await hook?.({
      operation: 'create',
      req: {
        payload: {
          find: async () => ({ totalDocs: 0 }),
        },
      },
      value: ['editor'],
    } as never)

    expect(value).toEqual(['editor', 'admin'])
  })
})

describe('Departments collection', () => {
  test('is publicly readable and editable by staff, but deletable only by admins', async () => {
    const departments = await getCollection('departments')

    expect(await runAccess(departments.access?.read, null)).toBe(true)
    expect(await runAccess(departments.access?.admin, admin)).toBe(true)
    expect(await runAccess(departments.access?.admin, editor)).toBe(true)
    expect(await runAccess(departments.access?.create, admin)).toBe(true)
    expect(await runAccess(departments.access?.create, editor)).toBe(true)
    expect(await runAccess(departments.access?.update, admin)).toBe(true)
    expect(await runAccess(departments.access?.update, editor)).toBe(true)
    expect(await runAccess(departments.access?.delete, admin)).toBe(true)
    expect(await runAccess(departments.access?.delete, editor)).toBe(false)
  })

  test('defines the faculty department fields and an indexed unique slug', async () => {
    const departments = await getCollection('departments')
    const name = getField(departments.fields, 'name')
    const shortName = getField(departments.fields, 'shortName')
    const slug = getField(departments.fields, 'slug')
    const description = getField(departments.fields, 'description')
    const websiteUrl = getField(departments.fields, 'websiteUrl')

    expect(name.type).toBe('text')
    expect(name.required).toBe(true)
    expect(shortName.type).toBe('text')
    expect(shortName.required).toBe(true)
    expect(slug.type).toBe('text')
    expect(slug.required).toBe(true)
    expect(slug.unique).toBe(true)
    expect(slug.index).toBe(true)
    expect(description.type).toBe('textarea')
    expect(description.required).toBe(true)
    expect(websiteUrl.type).toBe('text')
  })
})
