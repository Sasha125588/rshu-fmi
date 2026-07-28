import type { ExternalNewsSource } from './types'

export type ExternalNewsErrorKind = 'fetch' | 'parse' | 'timeout'

interface ExternalNewsErrorOptions {
  cause?: unknown
  context?: string
  kind: ExternalNewsErrorKind
  source: ExternalNewsSource
  status?: number
}

export interface ExternalNewsErrorDetails {
  kind: ExternalNewsErrorKind
  message: string
  source: ExternalNewsSource
  status?: number
}

const PUBLIC_ERROR_MESSAGES: Record<ExternalNewsErrorKind, string> = {
  fetch: 'Не вдалося отримати відповідь від зовнішнього сайту.',
  parse: 'Структура сторінки джерела змінилася, тому новини не вдалося прочитати.',
  timeout: 'Перевищено час очікування відповіді зовнішнього сайту.',
}

export class ExternalNewsError extends Error {
  readonly context?: string
  readonly kind: ExternalNewsErrorKind
  readonly source: ExternalNewsSource
  readonly status?: number

  constructor({ cause, context, kind, source, status }: ExternalNewsErrorOptions) {
    super(PUBLIC_ERROR_MESSAGES[kind], { cause })
    this.name = 'ExternalNewsError'
    this.context = context
    this.kind = kind
    this.source = source
    this.status = status
  }
}

export const getExternalNewsErrorDetails = (
  error: unknown,
  source: ExternalNewsSource
): ExternalNewsErrorDetails => {
  if (error instanceof ExternalNewsError) {
    return {
      kind: error.kind,
      message: error.message,
      source: error.source,
      status: error.status,
    }
  }

  console.error('Unexpected external news error', { error, source })

  return {
    kind: 'fetch',
    message: PUBLIC_ERROR_MESSAGES.fetch,
    source,
  }
}
