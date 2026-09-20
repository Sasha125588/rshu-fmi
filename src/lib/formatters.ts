const DEFAULT_LOCALE = 'uk-UA'

function createFormatter(options: Intl.DateTimeFormatOptions, locale = DEFAULT_LOCALE) {
  return new Intl.DateTimeFormat(locale, options)
}

export const scheduleDateFormatter = createFormatter({
  timeZone: 'Europe/Kyiv',
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

export const documentDateFormatter = createFormatter({
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

export const newsDateFormatter = createFormatter({
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export const kyivTimeFormatter = createFormatter(
  {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  },
  'en-CA'
)
