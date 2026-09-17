import type { Payload } from 'payload'

export const findSchedule = async (payload: Payload, sourceKey: string) => {
  const { docs } = await payload.find({
    collection: 'schedules',
    where: { sourceKey: { equals: sourceKey } },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  return docs[0]
}
