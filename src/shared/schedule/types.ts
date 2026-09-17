export type ScheduleMode = 'group' | 'teacher' | 'room'

export interface ScheduleAudience {
  group: string
  subgroups: number[]
}

export interface ScheduleLesson {
  id: string
  day: number
  slot: number
  start: string
  end: string
  subject: string
  teacher: string
  room: string | null
  online: boolean
  meetingUrl: string | null
  cancelled?: boolean
  audiences: ScheduleAudience[]
}

export interface ScheduleData {
  effectiveFrom: string
  groups: string[]
  lessons: ScheduleLesson[]
}
