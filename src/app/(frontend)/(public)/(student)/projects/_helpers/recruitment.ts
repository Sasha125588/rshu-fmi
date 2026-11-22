const kyivDateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Europe/Kyiv',
})

const deadlineFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

const getKyivDate = (now: Date): string => {
  const parts = kyivDateFormatter.formatToParts(now)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value

  return `${part('year')}-${part('month')}-${part('day')}`
}

type Recruitment = { recruiting?: boolean | null; deadline?: string | null }

export const isRecruitmentOpen = ({ recruiting, deadline }: Recruitment, now: Date): boolean =>
  !!(recruiting && (!deadline || getKyivDate(now) <= deadline))

export const formatProjectDeadline = (deadline: string) =>
  deadlineFormatter.format(new Date(`${deadline}T00:00:00Z`))
