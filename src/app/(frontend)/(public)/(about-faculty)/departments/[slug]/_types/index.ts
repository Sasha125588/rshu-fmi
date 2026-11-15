import type { Department } from '@/payload-types'
import type { Route } from 'next'

export type StaffMember = NonNullable<Department['staff']>[number] & { scheduleHref?: Route }
export type StaffRole = StaffMember['role']
