import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Розклад занять',
  description:
    'Розклад бакалаврату та магістратури ФМІ РДГУ. Пошук за групою, викладачем або аудиторією, пари та посилання на онлайн-заняття.',
}

const ScheduleLayout = ({ children }: { children: ReactNode }) => children

export default ScheduleLayout
