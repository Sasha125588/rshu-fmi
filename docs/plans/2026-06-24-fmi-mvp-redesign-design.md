# FMI MVP Redesign Design

## Goal

Build the first usable redesign of the Faculty of Mathematics and Informatics site as a multi-page educational-program portal. The MVP should prioritize applicants, make specializations the main navigation object, and still give current students quick access to practical materials.

## Product Direction

The home page is applicant-first. It should quickly answer what the faculty is, what programs exist, why the programs matter, and where to go next.

The visual language is hybrid:

- Home page and specialization pages use a dark, technical, high-contrast platform style inspired by the provided references.
- Document-heavy and student-facing pages stay calmer and more utilitarian, with clean tables, lists, filters, and compact cards.
- The site should feel like a serious university portal with an IT/math personality, not a one-page landing.

## MVP Scope

Included in the first implementation:

- Redesigned home page.
- Specializations index or strong home-page specialization section.
- One complete specialization page for Software Engineering.
- Student hub entry points.
- Documents entry point.
- News section.
- Contacts/about entry points.
- Header and footer navigation updated around the new structure.

Not included in this MVP:

- Separate "Вартість навчання" page.
- Full department sub-sites.
- Photo album.
- Dormitory page.
- Student council page.
- Student rating page.
- Full pages for every specialization.

Tuition can appear as a compact contextual block on a specialization page when data exists, but it should not be a standalone route or top-level navigation item in the MVP.

## Information Architecture

Primary navigation:

- Головна
- Спеціальності
- Вступнику
- Студенту
- Документи
- Новини
- Факультет
- Контакти

Specializations are the main content center. Each specialization should be modelled with enough structured data to support:

- Card on the home page.
- Card on a future specializations listing page.
- Dynamic page at `/specializations/[slug]`.
- Department association.
- Documents association.
- Optional tuition summary.

## Software Engineering Page

The first full specialization page should include:

- Hero with title, short code, degree level, department, short promise, and primary actions.
- "Ким зможеш працювати" section.
- "Що вивчатимеш" section.
- Applicant block with admission-oriented links.
- Optional tuition summary block without creating a separate tuition page.
- Documents block for educational program, syllabi, work programs, and previous revisions.
- Department block.
- FAQ.

## Data Model Direction

Use local TypeScript constants for the MVP. This matches the current codebase and keeps implementation fast.

Suggested data groups:

- `specializations`
- `departments`
- `documents`
- `navigation`

The data should be reusable across home sections, dynamic specialization pages, header links, and footer links. Avoid hardcoding the same program names and URLs in multiple components.

## Technical Notes

The project uses Next.js 16 App Router, React 19, Tailwind CSS v4, local UI components, Motion, Radix/shadcn-style primitives, and local content constants.

For dynamic specialization pages, use static generation from local data:

- `generateStaticParams`
- `dynamicParams = false`
- `notFound()` for unknown slugs
- `generateMetadata()` per specialization

Current Next.js 16 docs type route `params` as a Promise, so dynamic pages should await params before reading `slug`.

Tailwind CSS v4 theme tokens should remain CSS-first in `src/app/globals.css`. Add only tokens that are reused across the redesign.

## Success Criteria

- The MVP clearly communicates that specializations are the center of the site.
- There is no standalone tuition page in MVP navigation or routing.
- Software Engineering has a complete, convincing page.
- Student and document links are easy to find without dominating the applicant-first home page.
- The implementation passes `bun run fmt:check`, `bun run lint`, and `bun run build`.
