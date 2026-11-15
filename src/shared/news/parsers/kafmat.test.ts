import { describe, expect, test } from 'bun:test'

import { parseKafmatNews } from './kafmat'

const image = 'https://sites.google.com/sitesv-images-rt/example'

describe('parseKafmatNews', () => {
  test('uses the next gallery even with a different ID prefix and keeps photos within news boundaries', () => {
    const news = parseKafmatNews(`
      <section id="h.header_1"><img src="${image}/header"></section>
      <section id="h.first_3"><p>3 листопада 2026 року відбувся тренінг.</p><p>Учасники працювали в групах.</p></section>
      <section id="h.first_4"><img src="${image}/training"></section>
      <section id="h.119065fd0faf03d4_3"><p>2.04.2026 студенти долучилися до толоки.</p></section>
      <section id="h.31f680488ef8ced7_0"><img src="${image}/cleanup"></section>
      <section id="h.third_3"><p>29.09. 2026 відбулася зустріч.</p></section>
      <section id="h.fourth_3"><p>Сьогодні відбувся захист робіт.</p><img src="${image}/defense"></section>
      <section id="h.fourth_4"><img src="${image}/other"></section>
    `)

    expect(news.map(({ previewImage }) => previewImage)).toEqual([
      `${image}/training`,
      `${image}/cleanup`,
      undefined,
      `${image}/defense`,
    ])
    expect(news.map(({ publishedAt }) => publishedAt)).toEqual([
      '2026-11-03',
      '2026-04-02',
      '2026-09-29',
      undefined,
    ])
    expect(news[0]).toMatchObject({
      title: 'Відбувся тренінг.',
      description: 'Учасники працювали в групах.',
      link: expect.stringMatching(/#h\.first_3$/),
    })
  })

  test('skips ambiguous or invalid dates and unsupported image URLs', () => {
    const news = parseKafmatNews(`
      <section id="h.first_1"><p>2 червня відбувся майстер-клас.</p><img src="https://example.test/image"></section>
      <section id="h.second_1"><p>12–17 травня 2025 року тривав тиждень науки.</p></section>
      <section id="h.third_1"><p>12–17.05.2025 тривав тиждень науки.</p></section>
      <section id="h.fourth_1"><p>31.02.2026 відбулася зустріч.</p></section>
      <section id="h.fifth_1"><p>7.04.2026 й 8.04.2026 відбулися зустрічі.</p></section>
    `)

    expect(news).toHaveLength(5)
    expect(news.every(({ publishedAt, previewImage }) => !publishedAt && !previewImage)).toBe(true)
  })
})
