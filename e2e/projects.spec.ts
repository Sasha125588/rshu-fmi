import { expect, test } from '@playwright/test'

import {
  adminPassword,
  auth,
  getProjectBoardAdminToken,
  json,
  login,
} from './fixtures/project-board'

const enabled = process.env.PROJECT_BOARD_E2E === '1'
const stamp = Date.now().toString(36)
const openSlug = `test-open-${stamp}`
const openTitle = `Графи ${stamp}`
const projectDescription = 'Детальний опис проєкту для перевірки.'
const closedSlug = `test-closed-${stamp}`
const draftSlug = `test-draft-${stamp}`
const editorEmail = `board-editor-${stamp}@example.test`
const adminTwoEmail = `board-admin-two-${stamp}@example.test`
const publisherEmail = `board-publisher-${stamp}@example.test`
const applicantName = `Тестовий учасник ${stamp}`

test.describe.serial('Дошка проєктів (одноразова локальна БД)', () => {
  test.skip(!enabled, 'Запускайте лише з окремою тестовою базою: PROJECT_BOARD_E2E=1')

  let adminToken: string
  let secondAdminToken: string
  let editorToken: string
  let publisherToken: string
  let projectId: number
  let closedProjectId: number
  let publisherId: number

  test.beforeAll(async ({ request, baseURL }) => {
    adminToken = await getProjectBoardAdminToken(request, baseURL)
    const headers = auth(adminToken)

    for (const [email, roles] of [
      [editorEmail, ['editor']],
      [adminTwoEmail, ['admin']],
      [publisherEmail, ['admin']],
    ] as const) {
      await json(
        await request.post('/api/users', {
          headers,
          data: { name: email, email, password: adminPassword, roles },
        })
      )
    }
    editorToken = (await json(await login(request, editorEmail))).token
    secondAdminToken = (await json(await login(request, adminTwoEmail))).token
    const publisher = await json(await login(request, publisherEmail))
    publisherToken = publisher.token
    publisherId = publisher.user.id

    for (const item of [
      { title: openTitle, slug: openSlug, recruiting: true, _status: 'published' },
      {
        title: `Графи завершені ${stamp}`,
        slug: closedSlug,
        recruiting: false,
        _status: 'published',
      },
      { title: `Прихований ${stamp}`, slug: draftSlug, recruiting: true, _status: 'draft' },
    ]) {
      const result = await json(
        await request.post('/api/projects', {
          headers: auth(publisherToken),
          data: {
            ...item,
            summary: 'Короткий опис для каталогу.',
            description: projectDescription,
            category: 'research',
            initiatorName: 'Тестовий ініціатор',
            deadline: '2099-12-01',
            skills: [{ label: 'Python' }],
            roles: [
              { title: 'Автор задач', spots: 2 },
              { title: 'Редактор', spots: 1 },
              { title: 'Тестувальник', spots: 5 },
            ],
          },
        })
      )
      if (item.slug === openSlug) projectId = result.doc.id
      if (item.slug === closedSlug) closedProjectId = result.doc.id
    }
  })

  test('refreshes the cached project description after a CMS edit', async ({ page, request }) => {
    await page.goto(`/projects/${openSlug}`)
    await expect(page.getByText(projectDescription, { exact: true })).toBeVisible()

    const updatedDescription = `Оновлений опис проєкту ${stamp}.`
    await json(
      await request.patch(`/api/projects/${projectId}?draft=false`, {
        headers: auth(adminToken),
        data: { description: updatedDescription },
      })
    )

    await page.reload()
    await expect(page.getByText(updatedDescription, { exact: true })).toBeVisible()
    await expect(page.getByText(projectDescription, { exact: true })).toHaveCount(0)
  })

  test('combines filters and hides private publication data', async ({ page, request }) => {
    await page.goto(`/projects?q=${stamp}`)
    await expect(page.getByRole('heading', { name: 'До чого можна долучитися' })).toBeVisible()
    await expect(page.getByRole('link', { name: `Графи ${stamp}` })).toBeVisible()
    await expect(page.getByRole('link', { name: `Графи завершені ${stamp}` })).toBeVisible()
    await expect(page.getByRole('link', { name: `Прихований ${stamp}` })).toHaveCount(0)
    await page.getByRole('button', { name: 'Наука', exact: true }).click()
    await page.getByRole('checkbox', { name: 'Лише відкритий набір' }).check()
    await expect(page.getByRole('link', { name: `Графи завершені ${stamp}` })).toHaveCount(0)
    await expect(page).toHaveURL(/open=true/)
    await page.getByRole('button', { name: 'Освіта', exact: true }).click()
    await expect(
      page
        .getByRole('region', { name: 'Каталог проєктів' })
        .getByText('Немає проєктів за цими фільтрами')
    ).toBeVisible()

    await page.goto(`/projects/${draftSlug}`)
    await expect(page.getByRole('heading', { name: 'Проєкт не знайдено', level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Усі проєкти', exact: true })).toHaveAttribute(
      'href',
      '/projects'
    )
    await expect(page.getByRole('link', { name: 'Запропонувати проєкт' })).toHaveAttribute(
      'href',
      '/projects/propose'
    )
    const suggestions = page.getByRole('region', { name: 'Відкриті зараз' })
    await expect(suggestions.locator(`a[href="/projects/${openSlug}"]`)).toBeVisible()
    await expect(suggestions.locator(`a[href="/projects/${closedSlug}"]`)).toHaveCount(0)
    expect(await suggestions.getByRole('listitem').count()).toBeLessThanOrEqual(3)

    await page.goto(`/projects/${closedSlug}`)
    await expect(page.getByRole('button', { name: 'Долучитися' })).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Переглянути відкриті проєкти' })).toBeVisible()

    const project = await json(await request.get(`/api/projects/${projectId}`))
    expect(project.publisher).toBeUndefined()

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBe(true)
    const xml = await sitemap.text()
    expect(xml).toContain(`/projects/${openSlug}</loc>`)
    expect(xml).not.toContain(`/projects/${draftSlug}</loc>`)
  })

  test('shows the details first and pins the application button on mobile', async ({ page }) => {
    const height = 844
    await page.setViewportSize({ width: 390, height })
    await page.goto(`/projects/${openSlug}`)

    const details = page.getByRole('complementary', { name: 'Деталі набору' })
    const about = page.getByRole('heading', { name: 'Про проєкт' })
    await expect(details.getByText('Тестовий ініціатор')).toBeVisible()
    await expect(details.getByText('Набір до')).toBeVisible()
    const detailsBox = (await details.boundingBox())!
    const aboutBox = (await about.boundingBox())!
    expect(detailsBox.y + detailsBox.height).toBeLessThan(aboutBox.y)

    const bar = page.locator('[data-project-application-bar]')
    await expect(bar).toHaveCSS('position', 'fixed')
    const barBox = (await bar.boundingBox())!
    expect(barBox.y + barBox.height).toBeCloseTo(height, 0)
    await expect(bar.getByRole('button', { name: 'Долучитися' })).toBeInViewport()

    await page.setViewportSize({ width: 1280, height })
    await expect(bar).toHaveCSS('position', 'static')
  })

  test('stores an application privately and admits a second admin to the inbox', async ({
    page,
    request,
  }) => {
    await page.goto(`/projects/${openSlug}`)
    await expect(page.getByText('2 місця', { exact: true })).toBeVisible()
    await expect(page.getByText('1 місце', { exact: true })).toBeVisible()
    await expect(page.getByText('5 місць', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Долучитися', exact: true }).click()
    const form = page.getByRole('dialog')
    await form.getByLabel(/ім’я/i).fill(applicantName)
    await form.getByLabel('Група').fill('ІПЗ-21')
    await form.getByLabel('Курс').selectOption('2')
    await form.getByLabel('Email або Telegram').fill('https://t.me/Project_Applicant')
    await form.getByLabel(/роль/i).selectOption({ label: 'Автор задач' })
    await form.getByRole('button', { name: 'Надіслати заявку' }).click()
    await expect(form.getByText('Заявку надіслано')).toBeVisible()
    await expect(form.getByRole('link', { name: 'До всіх проєктів' })).toBeVisible()

    const where = new URLSearchParams({
      'where[project][equals]': String(projectId),
      depth: '0',
    })
    const all = await json(
      await request.get(`/api/project-applications?${where}`, { headers: auth(secondAdminToken) })
    )
    expect(all.docs).toHaveLength(1)
    expect(all.docs[0]).toMatchObject({
      publisher: publisherId,
      roleTitle: 'Автор задач',
      group: 'ІПЗ-21',
      course: 2,
      contact: 'https://t.me/Project_Applicant',
    })
    for (const headers of [{}, auth(editorToken)]) {
      expect((await request.get('/api/project-applications', { headers })).status()).toBe(403)
      expect((await request.get('/api/project-proposals', { headers })).status()).toBe(403)
      expect(
        (
          await request.post('/api/project-applications', {
            headers,
            data: { project: projectId, name: 'Unauthorised', contact: 'no@example.test' },
          })
        ).status()
      ).toBe(403)
    }
  })

  test('retains fields when the project closes during submission', async ({ page, request }) => {
    await page.goto(`/projects/${openSlug}`)
    await page.getByRole('button', { name: 'Долучитися', exact: true }).click()
    const form = page.getByRole('dialog')
    const name = form.getByLabel(/ім’я/i)
    const contact = form.getByLabel('Email або Telegram')
    const group = form.getByLabel('Група')
    const course = form.getByLabel('Курс')
    const role = form.getByLabel(/роль/i)
    await name.fill('Тестова чернетка')
    await contact.fill('draft@example.test')
    await group.fill('КН-31')
    await course.selectOption('3')
    await role.selectOption({ label: 'Автор задач' })

    await json(
      await request.patch(`/api/projects/${projectId}`, {
        headers: auth(adminToken),
        data: { recruiting: false },
      })
    )
    await form.getByRole('button', { name: 'Надіслати заявку' }).click()
    await expect(form.getByText(/набір закрито|набір уже закрито|набір закрився/i)).toBeVisible()
    await expect(name).toHaveValue('Тестова чернетка')
    await expect(contact).toHaveValue('draft@example.test')
    await expect(group).toHaveValue('КН-31')
    await expect(course).toHaveValue('3')
    await expect(course).toBeDisabled()
    await expect(role.locator('option:checked')).toHaveText('Автор задач')

    const params = new URLSearchParams({ 'where[contact][equals]': 'draft@example.test' })
    const rows = await json(
      await request.get(`/api/project-applications?${params}`, { headers: auth(adminToken) })
    )
    expect(rows.totalDocs).toBe(0)
  })

  test('rejects an application if the project was unpublished while the form was open', async ({
    page,
    request,
  }) => {
    const headers = auth(adminToken)
    const projectURL = `/api/projects/${closedProjectId}?draft=false`
    await json(await request.patch(projectURL, { headers, data: { recruiting: true } }))

    await page.goto(`/projects/${closedSlug}`)
    await page.getByRole('button', { name: 'Долучитися', exact: true }).click()
    const form = page.getByRole('dialog')
    await form.getByLabel(/ім’я/i).fill('Тестова заявка для чернетки')
    await form.getByLabel('Група').fill('КН-21')
    await form.getByLabel('Курс').selectOption('2')
    const contact = 'unpublished@example.test'
    await form.getByLabel('Email або Telegram').fill(contact)

    await json(await request.patch(projectURL, { headers, data: { _status: 'draft' } }))
    const unpublished = await json(await request.get(projectURL, { headers }))
    expect(unpublished._status).toBe('draft')
    expect(unpublished.recruiting).toBe(true)

    await form.getByRole('button', { name: 'Надіслати заявку' }).click()
    await expect(form.getByText('Набір закрито', { exact: true })).toBeVisible()
    const params = new URLSearchParams({
      'where[project][equals]': String(closedProjectId),
      'where[contact][equals]': contact,
    })
    const rows = await json(await request.get(`/api/project-applications?${params}`, { headers }))
    expect(rows.totalDocs).toBe(0)
  })

  test('retains checkbox and proposal values on validation error, then stores a private proposal', async ({
    page,
    request,
  }) => {
    const title = `Нова ідея ${stamp}`
    await page.goto('/projects/propose')
    await page.getByLabel(/назва проєкту/i).fill(title)
    const description = page.getByLabel(/опис ідеї/i)
    const submit = page.getByRole('button', { name: 'Надіслати пропозицію' })
    async function submitInvalidProposal() {
      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            new URL(response.url()).pathname === '/projects/propose'
        ),
        submit.click(),
      ])
      await expect(submit).toBeEnabled()
      await expect(description).toHaveAttribute('aria-invalid', 'true')
    }
    await description.fill('   ')
    await page.getByRole('textbox', { name: 'Ім’я та прізвище' }).fill('Тестовий ініціатор')
    await page.getByLabel('Група').fill('КН-11')
    await page.getByLabel('Курс').selectOption('1')
    await page.getByLabel('Email або Telegram').fill('proposer@example.test')
    const consent = page.getByRole('checkbox', { name: /показати моє ім’я/i })
    await consent.check()
    await submitInvalidProposal()
    await expect(description).toHaveAccessibleDescription('Опиши свою ідею.')
    await expect(consent).toBeChecked()
    await expect(page.getByLabel(/назва проєкту/i)).toHaveValue(title)
    await expect(page.getByLabel('Курс')).toHaveValue('1')

    await consent.uncheck()
    await page.getByLabel('Курс').selectOption('2')
    await submitInvalidProposal()
    await expect(consent).not.toBeChecked()
    await expect(page.getByLabel('Курс')).toHaveValue('2')

    await submitInvalidProposal()
    await expect(page.getByLabel('Курс')).toHaveValue('2')

    await consent.check()
    await description.fill('Конкретний опис студентської ініціативи для локального тесту.')
    await submit.click()
    const confirmation = page.getByRole('heading', { name: 'Пропозицію надіслано', level: 1 })
    await expect(confirmation).toBeInViewport()
    await expect(page.getByRole('status').filter({ has: confirmation })).toBeVisible()
    await expect(page.getByRole('link', { name: 'До всіх проєктів' })).toBeVisible()

    const params = new URLSearchParams({ 'where[title][equals]': title })
    const rows = await json(
      await request.get(`/api/project-proposals?${params}`, { headers: auth(secondAdminToken) })
    )
    expect(rows.docs).toHaveLength(1)
    expect(rows.docs[0]).toMatchObject({
      title,
      showInitiatorName: true,
      group: 'КН-11',
      course: 2,
      contact: 'proposer@example.test',
    })
    await page.goto(`/projects?q=${encodeURIComponent(title)}`)
    await expect(
      page
        .getByRole('region', { name: 'Каталог проєктів' })
        .getByText('Немає проєктів за цими фільтрами')
    ).toBeVisible()
  })

  test('turns proposals into linked drafts without exposing private data', async ({
    baseURL,
    page,
    request,
  }) => {
    if (!baseURL) throw new Error('Missing local test URL.')
    const headers = auth(adminToken)
    await page.context().addCookies([{ name: 'payload-token', value: adminToken, url: baseURL }])

    for (const showInitiatorName of [true, false]) {
      const { doc: proposal } = await json(
        await request.post('/api/project-proposals', {
          headers,
          data: {
            title: `Ще ідея ${stamp} ${showInitiatorName}`,
            description: 'Опис ідеї для перевірки перенесення.',
            name: 'Тестове ім’я',
            contact: '@private_proposal',
            group: 'Приватна група',
            course: 2,
            showInitiatorName,
          },
        })
      )
      await page.goto(`/admin/collections/project-proposals/${proposal.id}`)
      const createDraft = page.getByRole('checkbox', { name: 'Створити чернетку проєкту' })
      await expect(createDraft).toBeEnabled()
      await createDraft.check()
      await expect(createDraft).toBeChecked()
      await page.getByRole('button', { name: /^(Зберегти|Save)$/ }).click()
      await expect(createDraft).toHaveCount(0)

      const reviewed = await json(
        await request.get(`/api/project-proposals/${proposal.id}?depth=0`, { headers })
      )
      expect(reviewed.status).toBe('reviewed')
      const project = await json(
        await request.get(`/api/projects/${reviewed.project}?draft=true`, { headers })
      )
      expect(project._status).toBe('draft')
      expect(JSON.stringify(project)).not.toContain('@private_proposal')
      expect(JSON.stringify(project)).not.toContain('Приватна група')
      expect(project.initiatorName ?? null).toBe(showInitiatorName ? 'Тестове ім’я' : null)
      expect((await request.get(`/api/projects/${reviewed.project}?draft=true`)).ok()).toBe(false)
    }
  })

  test('filters My and All in Payload and keeps entries after the publisher is removed', async ({
    page,
    request,
    baseURL,
  }) => {
    if (!baseURL) throw new Error('Missing local test URL.')
    const openInbox = async (token: string) => {
      await page.context().addCookies([{ name: 'payload-token', value: token, url: baseURL }])
      await page.goto('/admin/collections/project-applications')
    }

    const mine = page.getByRole('button', { name: 'Мої', exact: true })
    const all = page.getByRole('button', { name: 'Усі', exact: true })
    const applicant = page.getByText(applicantName, { exact: true })

    await openInbox(publisherToken)
    await mine.click()
    await expect(mine).toHaveAttribute('aria-pressed', 'true')
    await expect(applicant).toBeVisible()

    await openInbox(secondAdminToken)
    await mine.click()
    await expect(mine).toHaveAttribute('aria-pressed', 'true')
    await expect(applicant).toHaveCount(0)
    await all.click()
    await expect(applicant).toBeVisible()

    await json(await request.delete(`/api/users/${publisherId}`, { headers: auth(adminToken) }))
    await page.reload()
    await expect(applicant).toBeVisible()
  })
})
