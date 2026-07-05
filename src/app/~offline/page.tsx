import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Офлайн режим - РДГУ ФМІ',
  robots: {
    index: false,
    follow: false,
  },
}

const OfflinePage = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Немає підключення до інтернету
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-base md:text-lg">
        Ви зараз в офлайн-режимі. Перевірте підключення та спробуйте оновити сторінку.
      </p>
      <Link
        href="/"
        className="bg-button-primary text-primary-foreground mt-8 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-semibold transition-opacity hover:opacity-90"
      >
        На головну
      </Link>
    </main>
  )
}

export default OfflinePage
