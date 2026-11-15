export const LOCAL_STORAGE_PREFIX = 'rshu-fmi'

export const LOCAL_STORAGE = {
  ANNOUNCEMENT: {
    SCHEDULE: `${LOCAL_STORAGE_PREFIX}-announcement-schedule`,
    DEPARTMENTS: `${LOCAL_STORAGE_PREFIX}-announcement-departments`,
  },
} as const
