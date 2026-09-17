export interface ScheduleSource {
  key: string
  label: string
  spreadsheetId: string
}

export const SCHEDULE_SOURCES: readonly ScheduleSource[] = [
  {
    key: 'bachelor-1',
    label: '1 курс · бакалаврат',
    spreadsheetId: '1fBkuq2Px_urcfrJzzCwfkMvCmipoP-Kj',
  },
  {
    key: 'bachelor-2',
    label: '2 курс · бакалаврат',
    spreadsheetId: '1vC741Yi_tDEFF22hfdOQ29HJ5zNqZNf7',
  },
  {
    key: 'bachelor-3',
    label: '3 курс · бакалаврат',
    spreadsheetId: '1S2HYtfgnUc2ZTfxo7qqMcNgIPA3A2gkg',
  },
  {
    key: 'bachelor-4',
    label: '4 курс · бакалаврат',
    spreadsheetId: '1911GrINIqew_nuPVGDOgY8P_3Mcokods',
  },
  {
    key: 'master-1',
    label: '1 курс · магістратура',
    spreadsheetId: '18XvUSeAot7r8XnWQ02NFmVr9H-UJ-u2w',
  },
  {
    key: 'master-2',
    label: '2 курс · магістратура',
    spreadsheetId: '1ULeL-NmFThtBFU27cK9nunlmc0varXwS',
  },
]

export const DEFAULT_SCHEDULE_SOURCE = SCHEDULE_SOURCES[0]

export const getScheduleSource = (key: string) =>
  SCHEDULE_SOURCES.find((source) => source.key === key)

export const scheduleSourceUrl = (spreadsheetId: string) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`

export const scheduleExportUrl = (spreadsheetId: string) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx`

export const SCHEDULE_REFRESH_MS = 30 * 60 * 1000
export const SCHEDULE_DAYS = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П’ятниця',
  'Субота',
  'Неділя',
]
export const SCHEDULE_SHORT_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
