# FMI MVP Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first MVP of the FMI redesign as an applicant-first educational-program portal without a standalone tuition page.

**Architecture:** Keep content in local TypeScript data modules and render it through App Router server pages plus focused client components only where interaction is needed. Specializations become the main data object, with one fully implemented dynamic page for Software Engineering and reusable structures for future programs.

**Tech Stack:** Next.js 16.1.6 App Router, React 19, Tailwind CSS v4, TypeScript, lucide-react, existing UI/Radix components, Motion where already used.

---

## File Structure

- Create: `src/app/(public)/(data)/departments.ts` - department records shared by specializations and future department pages.
- Create: `src/app/(public)/(data)/specializations.ts` - canonical specialization records, including Software Engineering page content.
- Create: `src/app/(public)/specializations/[slug]/page.tsx` - dynamic specialization detail page.
- Create: `src/app/(public)/specializations/[slug]/components/SpecializationHero.tsx` - detail-page hero.
- Create: `src/app/(public)/specializations/[slug]/components/SpecializationSection.tsx` - reusable titled section wrapper.
- Create: `src/app/(public)/specializations/[slug]/components/DocumentsPanel.tsx` - grouped document links and empty states.
- Modify: `src/app/(public)/(components)/Specializations/constants/data.ts` - consume canonical specialization data instead of duplicating program basics.
- Modify: `src/app/(public)/(components)/Specializations/Specializations.tsx` - link cards to `/specializations/[slug]`.
- Modify: `src/app/(components)/Header/Navbar/constants/data.tsx` - remove standalone tuition link and align navigation to MVP IA.
- Modify: `src/app/(components)/Footer/Footer.tsx` - align quick links to MVP IA.
- Modify: `src/app/(public)/(components)/BecomeAStudent/BecomeAStudent.tsx` - update hero actions to applicant-first portal actions.
- Modify: `src/app/(public)/page.tsx` - arrange MVP home sections in applicant-first order.
- Modify: `src/app/globals.css` - add reusable design tokens only if needed by the redesigned sections.

## Task 1: Canonical Content Data

**Files:**
- Create: `src/app/(public)/(data)/departments.ts`
- Create: `src/app/(public)/(data)/specializations.ts`

- [ ] **Step 1: Create department data**

Add `src/app/(public)/(data)/departments.ts`:

```ts
export type Department = {
  id: string
  name: string
  shortName: string
  href: string
  description: string
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'kitm',
    name: 'Кафедра інформаційних технологій та моделювання',
    shortName: 'КІТМ',
    href: 'https://kitm.rshu.edu.ua/',
    description:
      'Відповідає за підготовку фахівців з програмування, моделювання, інформаційних технологій та суміжних напрямів.',
  },
]

export const getDepartmentById = (id: string) =>
  DEPARTMENTS.find((department) => department.id === id)
```

- [ ] **Step 2: Create specialization data**

Add `src/app/(public)/(data)/specializations.ts`:

```ts
import { BookOpen, BriefcaseBusiness, Code2, FileText, GraduationCap } from 'lucide-react'

import { getDepartmentById } from './departments'

import type { LucideIcon } from 'lucide-react'

export type SpecializationDocument = {
  title: string
  type: 'Освітня програма' | 'Силабус' | 'Робоча програма' | 'Попередня редакція'
  href: string
  year: string
}

export type Specialization = {
  slug: string
  title: string
  shortTitle: string
  code: string
  level: string
  departmentId: string
  description: string
  promise: string
  tags: string[]
  icon: LucideIcon
  careers: string[]
  studyFocus: string[]
  admission: string[]
  tuition?: {
    label: string
    value: string
    note: string
  }
  documents: SpecializationDocument[]
  faq: Array<{ question: string; answer: string }>
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    slug: 'software-engineering',
    title: 'Інженерія програмного забезпечення',
    shortTitle: 'ІПЗ',
    code: '121',
    level: 'Бакалавр',
    departmentId: 'kitm',
    description:
      'Підготовка фахівців з розробки, проєктування, тестування та супроводу програмного забезпечення.',
    promise:
      'Навчишся створювати вебзастосунки, працювати з базами даних, командною розробкою, тестуванням і сучасними інженерними практиками.',
    tags: ['Програмування', 'Веб-розробка', 'Тестування', 'Командна робота'],
    icon: Code2,
    careers: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'QA Engineer',
      'Full-stack Developer',
    ],
    studyFocus: [
      'Алгоритми та структури даних',
      'Вебтехнології та клієнт-серверна розробка',
      'Бази даних',
      'Проєктування програмного забезпечення',
      'Тестування та якість ПЗ',
      'Командні проєкти',
    ],
    admission: [
      'Перевірити актуальні правила вступу на сайті приймальної комісії РДГУ.',
      'Порівняти конкурсні пропозиції та форму навчання.',
      'Підготувати документи й подати заяву через електронний кабінет вступника.',
    ],
    tuition: {
      label: 'Вартість навчання',
      value: 'Уточнюється для актуального року вступу',
      note: 'Окремої сторінки вартості в MVP немає; актуальну суму можна додати в цей блок після затвердження даних.',
    },
    documents: [
      {
        title: 'Освітня програма 121 Інженерія програмного забезпечення',
        type: 'Освітня програма',
        href: '#',
        year: '2026',
      },
      {
        title: 'Силабуси освітніх компонентів',
        type: 'Силабус',
        href: '#',
        year: '2026',
      },
      {
        title: 'Попередня редакція освітньої програми',
        type: 'Попередня редакція',
        href: '#',
        year: '2025',
      },
    ],
    faq: [
      {
        question: 'Чи підходить ІПЗ, якщо я ще не маю комерційного досвіду?',
        answer:
          'Так. Програма розрахована на поступове занурення: від базового програмування до командних проєктів і спеціалізованих дисциплін.',
      },
      {
        question: 'Чим ІПЗ відрізняється від компʼютерних наук?',
        answer:
          'ІПЗ більше сфокусована на інженерному процесі створення програмних продуктів: вимогах, архітектурі, розробці, тестуванні та супроводі.',
      },
    ],
  },
]

export const SPECIALIZATION_ICONS = {
  careers: BriefcaseBusiness,
  documents: FileText,
  admission: GraduationCap,
  study: BookOpen,
}

export const getSpecializationBySlug = (slug: string) =>
  SPECIALIZATIONS.find((specialization) => specialization.slug === slug)

export const getSpecializationDepartment = (specialization: Specialization) =>
  getDepartmentById(specialization.departmentId)
```

- [ ] **Step 3: Run TypeScript/build check**

Run: `bun run build`

Expected: the build may still fail if existing unrelated code has issues, but it must not fail because the new data files have syntax or import errors.

## Task 2: Dynamic Software Engineering Page

**Files:**
- Create: `src/app/(public)/specializations/[slug]/page.tsx`
- Create: `src/app/(public)/specializations/[slug]/components/SpecializationHero.tsx`
- Create: `src/app/(public)/specializations/[slug]/components/SpecializationSection.tsx`
- Create: `src/app/(public)/specializations/[slug]/components/DocumentsPanel.tsx`

- [ ] **Step 1: Add section wrapper**

Create `src/app/(public)/specializations/[slug]/components/SpecializationSection.tsx`:

```tsx
import type { ReactNode } from 'react'

type SpecializationSectionProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

export const SpecializationSection = ({ eyebrow, title, children }: SpecializationSectionProps) => (
  <section className="border-border/60 grid gap-6 border-t py-10 md:grid-cols-[260px_1fr] md:py-14">
    <div>
      <p className="text-green-primary font-mono text-xs tracking-[0.24em] uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-balance md:text-3xl">{title}</h2>
    </div>
    <div>{children}</div>
  </section>
)
```

- [ ] **Step 2: Add hero component**

Create `src/app/(public)/specializations/[slug]/components/SpecializationHero.tsx`:

```tsx
import { ArrowUpRight, FileText, GraduationCap } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import type { Department } from '../../../(data)/departments'
import type { Specialization } from '../../../(data)/specializations'

type SpecializationHeroProps = {
  specialization: Specialization
  department?: Department
}

export const SpecializationHero = ({ specialization, department }: SpecializationHeroProps) => (
  <section className="relative overflow-hidden rounded-xl border border-white/10 bg-black px-5 py-10 text-white md:px-8 md:py-14">
    <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:36px_36px]" />
    <div className="relative max-w-4xl">
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge className="border-white/15 bg-white/10 text-white">{specialization.level}</Badge>
        <Badge className="border-white/15 bg-white/10 text-white">Код {specialization.code}</Badge>
        {department ? (
          <Badge className="border-green-primary/40 bg-green-primary/15 text-green-primary">
            {department.shortName}
          </Badge>
        ) : null}
      </div>
      <p className="font-mono text-sm tracking-[0.28em] text-white/55 uppercase">
        Освітня програма
      </p>
      <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight text-balance md:text-7xl">
        {specialization.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{specialization.promise}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="https://www.rshu.edu.ua/pryimalna-komisiia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
        >
          <GraduationCap className="size-4" />
          Вступнику
          <ArrowUpRight className="size-4" />
        </Link>
        <a
          href="#documents"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <FileText className="size-4" />
          Документи ОП
        </a>
      </div>
    </div>
  </section>
)
```

- [ ] **Step 3: Add documents panel**

Create `src/app/(public)/specializations/[slug]/components/DocumentsPanel.tsx`:

```tsx
import { ExternalLink, FileText } from 'lucide-react'

import type { SpecializationDocument } from '../../../(data)/specializations'

type DocumentsPanelProps = {
  documents: SpecializationDocument[]
}

export const DocumentsPanel = ({ documents }: DocumentsPanelProps) => {
  if (documents.length === 0) {
    return (
      <div className="border-border/60 bg-card/40 rounded-lg border p-6">
        <p className="text-muted-foreground text-sm">
          Документи для цієї освітньої програми ще готуються до публікації.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {documents.map((document) => (
        <a
          key={`${document.type}-${document.year}-${document.title}`}
          href={document.href}
          className="border-border/60 bg-card/40 hover:border-green-primary/40 group flex items-start justify-between gap-4 rounded-lg border p-4 transition"
        >
          <div className="flex gap-3">
            <FileText className="text-green-primary mt-1 size-5 shrink-0" />
            <div>
              <p className="font-medium">{document.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">
                {document.type} · {document.year}
              </p>
            </div>
          </div>
          <ExternalLink className="text-muted-foreground group-hover:text-green-primary size-4 shrink-0 transition" />
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Add dynamic page**

Create `src/app/(public)/specializations/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'

import { getSpecializationBySlug, getSpecializationDepartment, SPECIALIZATIONS } from '../../(data)/specializations'
import { DocumentsPanel } from './components/DocumentsPanel'
import { SpecializationHero } from './components/SpecializationHero'
import { SpecializationSection } from './components/SpecializationSection'

import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export const generateStaticParams = () =>
  SPECIALIZATIONS.map((specialization) => ({
    slug: specialization.slug,
  }))

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const specialization = getSpecializationBySlug(slug)

  if (!specialization) {
    notFound()
  }

  return {
    title: `${specialization.title} | ФМІ РДГУ`,
    description: specialization.description,
  }
}

const SpecializationPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const specialization = getSpecializationBySlug(slug)

  if (!specialization) {
    notFound()
  }

  const department = getSpecializationDepartment(specialization)

  return (
    <div className="mx-auto max-w-6xl">
      <SpecializationHero
        specialization={specialization}
        department={department}
      />

      <SpecializationSection
        eyebrow="careers"
        title="Ким зможеш працювати"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specialization.careers.map((career) => (
            <div
              key={career}
              className="border-border/60 bg-card/40 rounded-lg border p-4 font-medium"
            >
              {career}
            </div>
          ))}
        </div>
      </SpecializationSection>

      <SpecializationSection
        eyebrow="study"
        title="Що вивчатимеш"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {specialization.studyFocus.map((item) => (
            <li
              key={item}
              className="text-muted-foreground border-border/60 rounded-lg border p-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </SpecializationSection>

      <SpecializationSection
        eyebrow="admission"
        title="Як вступити"
      >
        <ol className="space-y-3">
          {specialization.admission.map((item, index) => (
            <li
              key={item}
              className="flex gap-4"
            >
              <span className="text-green-primary font-mono text-xl font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground pt-1">{item}</span>
            </li>
          ))}
        </ol>
      </SpecializationSection>

      {specialization.tuition ? (
        <SpecializationSection
          eyebrow="tuition"
          title={specialization.tuition.label}
        >
          <div className="border-border/60 bg-card/40 rounded-lg border p-6">
            <p className="text-2xl font-semibold">{specialization.tuition.value}</p>
            <p className="text-muted-foreground mt-2 text-sm">{specialization.tuition.note}</p>
          </div>
        </SpecializationSection>
      ) : null}

      <div id="documents">
        <SpecializationSection
          eyebrow="documents"
          title="Документи освітньої програми"
        >
          <DocumentsPanel documents={specialization.documents} />
        </SpecializationSection>
      </div>

      {department ? (
        <SpecializationSection
          eyebrow="department"
          title="Відповідальна кафедра"
        >
          <a
            href={department.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/60 bg-card/40 hover:border-green-primary/40 block rounded-lg border p-6 transition"
          >
            <p className="text-xl font-semibold">{department.name}</p>
            <p className="text-muted-foreground mt-2">{department.description}</p>
          </a>
        </SpecializationSection>
      ) : null}

      <SpecializationSection
        eyebrow="faq"
        title="Питання про програму"
      >
        <div className="divide-border/60 divide-y rounded-lg border">
          {specialization.faq.map((item) => (
            <details
              key={item.question}
              className="group p-5"
            >
              <summary className="cursor-pointer font-semibold">{item.question}</summary>
              <p className="text-muted-foreground mt-3 leading-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </SpecializationSection>
    </div>
  )
}

export default SpecializationPage
```

- [ ] **Step 5: Run route build check**

Run: `bun run build`

Expected: `/specializations/software-engineering` is generated successfully, and unknown specialization slugs resolve through `dynamicParams = false`/`notFound()`.

## Task 3: Home Specializations Links

**Files:**
- Modify: `src/app/(public)/(components)/Specializations/constants/data.ts`
- Modify: `src/app/(public)/(components)/Specializations/Specializations.tsx`

- [ ] **Step 1: Replace duplicated specialization basics**

Update `src/app/(public)/(components)/Specializations/constants/data.ts` so `SPECIALIZATIONS_DATA` is derived from `SPECIALIZATIONS`:

```ts
import { BookOpen, Calculator, Cpu, GraduationCap, Layers } from 'lucide-react'

import { SPECIALIZATIONS } from '../../../(data)/specializations'

import type { SpecializationItem, SpecializationVisual } from './types'

const FALLBACK_ICONS = {
  'computer-science': Cpu,
  'professional-education': GraduationCap,
  'secondary-education-cs': BookOpen,
  'secondary-education-math': Calculator,
  'secondary-education-math-cs': Layers,
}

export const SPECIALIZATIONS_DATA: SpecializationItem[] = [
  ...SPECIALIZATIONS.map((specialization) => ({
    id: specialization.slug,
    title: specialization.title,
    shortTitle: specialization.shortTitle,
    description: specialization.description,
    tags: specialization.tags.slice(0, 3),
    date: specialization.level,
    icon: specialization.icon,
  })),
  {
    id: 'computer-science',
    title: "Комп'ютерні науки",
    shortTitle: 'КН',
    description:
      'Фундаментальна підготовка з алгоритмів, структур даних, машинного навчання та штучного інтелекту.',
    tags: ['Алгоритми', 'ШІ/ML', 'Аналіз даних'],
    date: 'Бакалавр',
    icon: FALLBACK_ICONS['computer-science'],
  },
  {
    id: 'professional-education',
    title: 'Професійна освіта (Цифрові технології)',
    shortTitle: 'ПО',
    description:
      'Підготовка викладачів цифрових технологій для професійно-технічних навчальних закладів.',
    tags: ['Педагогіка', 'Цифровізація', 'Професійна освіта'],
    date: 'Бакалавр',
    icon: FALLBACK_ICONS['professional-education'],
  },
  {
    id: 'secondary-education-cs',
    title: 'Середня освіта (Інформатика)',
    shortTitle: 'СО (інф.)',
    description:
      'Підготовка вчителів інформатики для загальноосвітніх навчальних закладів з сучасними методиками викладання.',
    tags: ['Викладання', 'Інформатика', 'Методика'],
    date: 'Бакалавр',
    icon: FALLBACK_ICONS['secondary-education-cs'],
  },
  {
    id: 'secondary-education-math',
    title: 'Середня освіта (Математика)',
    shortTitle: 'СО (мат.)',
    description:
      'Поглиблена підготовка вчителів математики з акцентом на дослідницьку діяльність та інноваційні методики.',
    tags: ['Математика', 'Дослідження', 'Методика'],
    date: 'Магістр',
    icon: FALLBACK_ICONS['secondary-education-math'],
  },
  {
    id: 'secondary-education-math-cs',
    title: 'Середня освіта. Математика (Математика, інформатика)',
    shortTitle: 'СОМ',
    description:
      'Комплексна підготовка вчителів з двох предметів: математики та інформатики для універсальності у викладанні.',
    tags: ['Математика', 'Інформатика', 'Інтеграція'],
    date: 'Бакалавр',
    icon: FALLBACK_ICONS['secondary-education-math-cs'],
  },
]
```

Keep the existing `SPECIALIZATIONS_VISUALS` export below this block.

- [ ] **Step 2: Fix specialization links**

In `src/app/(public)/(components)/Specializations/Specializations.tsx`, replace the current invalid hash link:

```tsx
href={`/#specializations/${item.title}` as Route}
```

with:

```tsx
href={`/specializations/${item.id}` as Route}
```

- [ ] **Step 3: Run format and build**

Run: `bun run fmt:check`

Expected: formatting passes or reports only files changed in this task.

Run: `bun run build`

Expected: home page links compile and the Software Engineering link points to `/specializations/software-engineering`.

## Task 4: MVP Navigation Without Tuition Page

**Files:**
- Modify: `src/app/(components)/Header/Navbar/constants/data.tsx`
- Modify: `src/app/(components)/Footer/Footer.tsx`

- [ ] **Step 1: Remove tuition from student dropdown**

In `src/app/(components)/Header/Navbar/constants/data.tsx`, remove the `Вартість навчання` link from the `СТУДЕНТУ` dropdown for MVP and replace it with practical links:

```tsx
<Link
  href="/#specializations"
  className="hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit"
>
  Освітні програми
</Link>
<Link
  href="/normatyvni-dokumenty"
  className="hover:text-green-secondary cursor-pointer transition-colors duration-200 md:w-fit"
>
  Документи
</Link>
```

- [ ] **Step 2: Add direct specialization entry**

In the same file, add or keep a top-level item named `СПЕЦІАЛЬНОСТІ` with:

```ts
{
  name: 'СПЕЦІАЛЬНОСТІ',
  href: '/#specializations',
  hasDropdown: false,
  component: <div>СПЕЦІАЛЬНОСТІ</div>,
}
```

- [ ] **Step 3: Align footer quick links**

In `src/app/(components)/Footer/Footer.tsx`, keep quick links focused on MVP:

```tsx
const quickLinks = [
  { href: '/#specializations', label: 'Спеціальності' },
  { href: '/normatyvni-dokumenty', label: 'Документи' },
  { href: '/#news', label: 'Новини' },
  { href: '/contacts', label: 'Контакти' },
  { href: '/history', label: 'Історія факультету' },
] as const
```

Then render this array instead of hardcoded placeholder links to `Викладачі` and `Галерея`.

- [ ] **Step 4: Verify no standalone tuition route in navigation**

Run: `rg "vartist-navchannia|Вартість навчання" src/app`

Expected: matches can remain for the existing route files and contextual specialization content, but no match should appear in `Header/Navbar/constants/data.tsx` or footer quick links.

## Task 5: Applicant-First Home Polish

**Files:**
- Modify: `src/app/(public)/(components)/BecomeAStudent/BecomeAStudent.tsx`
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Update hero copy**

In `BecomeAStudent.tsx`, update the paragraph to:

```tsx
Факультет для тих, хто хоче розуміти математику, створювати програмні продукти й навчати інших працювати з технологіями. Почни з вибору освітньої програми.
```

- [ ] **Step 2: Update hero actions**

Keep the primary external `Стати студентом` link and change the secondary label to:

```tsx
Обрати спеціальність
```

with the existing `href="#specializations"`.

- [ ] **Step 3: Keep home order applicant-first**

Ensure `src/app/(public)/page.tsx` renders:

```tsx
<BecomeAStudent />
<Specializations />
<AboutUs />
<Suspense fallback={<NewsSkeleton />}>
  <NewsSection />
</Suspense>
```

- [ ] **Step 4: Verify responsive home**

Run: `bun run build`

Expected: the home page builds, and the first visible calls to action are applicant-oriented.

## Task 6: Verification

**Files:**
- No new files.

- [ ] **Step 1: Format check**

Run: `bun run fmt:check`

Expected: PASS.

- [ ] **Step 2: Lint**

Run: `bun run lint`

Expected: PASS.

- [ ] **Step 3: Production build**

Run: `bun run build`

Expected: PASS.

- [ ] **Step 4: Start local dev server**

Run: `bun run dev`

Expected: server starts on `http://localhost:3000` or the next available port.

- [ ] **Step 5: Browser QA**

Open:

- `http://localhost:3000`
- `http://localhost:3000/specializations/software-engineering`

Expected:

- No standalone tuition page appears in header/footer MVP navigation.
- The Software Engineering page has hero, careers, study focus, admission, contextual tuition, documents, department, and FAQ sections.
- Mobile header opens and navigation remains usable.
- Text does not overlap at desktop or mobile widths.

## Self-Review

Spec coverage:

- Applicant-first MVP: covered by Task 5.
- Specializations as center: covered by Tasks 1, 2, and 3.
- No standalone tuition page: covered by Task 4.
- One complete Software Engineering page: covered by Task 2.
- Data prepared for department association: covered by Task 1.

Placeholder scan:

- The plan avoids TBD/TODO language and defines concrete content for the first specialization.

Type consistency:

- `slug` is used consistently for route params.
- `departmentId` links `Specialization` to `Department`.
- Dynamic route params follow Next.js 16 Promise typing from current docs.
