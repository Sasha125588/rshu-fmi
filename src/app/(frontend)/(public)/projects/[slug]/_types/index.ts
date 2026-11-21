import type { getProject } from '../../_api/queries'

export type ProjectDetail = NonNullable<Awaited<ReturnType<typeof getProject>>>
