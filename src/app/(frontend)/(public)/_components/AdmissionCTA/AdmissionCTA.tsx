import Link from 'next/link'

import { HomeReveal } from '../HomeReveal/HomeReveal'

const pixelWave = Array.from({ length: 120 * 24 }, (_, index) => {
  const column = index % 120
  const row = Math.floor(index / 120)
  const x = column / 119
  const crest =
    4 * Math.exp(-(((x - 0.15) / 0.12) ** 2)) + 14 * Math.exp(-(((x - 0.62) / 0.25) ** 2))
  const height = 18 - row * 0.75
  let hash = Math.imul(index + 1, 73244475)
  hash = Math.imul(hash ^ (hash >>> 16), 73244475)
  const noise = ((hash ^ (hash >>> 16)) >>> 0) / 4294967296
  const density = Math.max(0, Math.min(0.92, 0.5 + (crest - height) / 9))

  return noise < density ? `M${column * 7.5} ${row * 7.5}h7.5v7.5h-7.5z` : ''
}).join('')

export const AdmissionCTA = () => {
  return (
    <section
      id="admission"
      aria-labelledby="admission-heading"
      className="px-4 pt-4 pb-14 md:px-6 md:pt-6 md:pb-16"
    >
      <HomeReveal
        variant="rise"
        className="relative isolate mx-auto overflow-hidden rounded-2xl border border-[#805566]/40 bg-[#301c25] px-6 pt-7 pb-28 text-[#f8edf1] duration-400! motion-safe:data-[home-reveal=pending]:transform-[translateY(12px)]! sm:px-8 sm:pt-8 sm:pb-28 lg:min-h-70 lg:p-9"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute -right-10 bottom-0 h-auto w-130 max-w-none text-[#b57d91] sm:right-0 sm:w-3/4 lg:right-5 lg:w-[62%]"
          viewBox="0 0 900 180"
          fill="currentColor"
        >
          <path d={pixelWave} />
        </svg>
        <div className="relative z-1 max-w-140">
          <h2
            id="admission-heading"
            className="m-0 text-3xl leading-tight font-semibold tracking-tight text-balance lg:text-[2.125rem]"
          >
            Хочеш вступити на ФМІ?
          </h2>
          <p className="mt-3 max-w-120 text-base leading-relaxed text-pretty text-[#c3aab5] sm:text-lg">
            Почни зі спеціальності. Ми допоможемо розібратися з наступними кроками.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://www.rshu.edu.ua/pryimalna-komisiia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#d6a8b8] px-4 py-2.5 text-sm leading-snug font-bold text-[#341e28] transition-[box-shadow,border-color] duration-200 hover:shadow-[0_0_0_4.5px_#d6a8b838] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a8b8] motion-reduce:transition-none"
            >
              Приймальна комісія
            </Link>
            <Link
              href="/contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#805566] bg-[#301c25] px-4 py-2.5 text-sm leading-snug font-bold transition-[box-shadow,border-color] duration-200 hover:border-[#c3aab5] hover:shadow-[0_0_0_4.5px_#c3aab538] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a8b8] motion-reduce:transition-none"
            >
              Контакти
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-pretty text-[#c3aab5]">
            Маєш запитання? Звертайся до деканату або приймальної комісії РДГУ.
          </p>
        </div>
      </HomeReveal>
    </section>
  )
}
