# instant-nav rig: rshu-fmi

- BUILD: `bun run build:instant`
- EXPOSE: `NEXT_INSTANT_TESTS=1` enables `experimental.exposeTestingApiInProductionBuild` only for the measured build.
- RUN: `bun run start:instant -- --port 3100`, then `BASE_URL=http://127.0.0.1:3100 bun run test:instant`
- TEST USER: public; no authentication. State: Ukrainian locale and the schedule snapshots available to the normal public route.
- DRIFT: the educational-program navigation requires at least one published program visible in the public catalog, and the faculty-news checks require at least three public articles. `NEXT_INSTANT_TESTS=1` lowers only the faculty-news page size from 12 to 2 so those three articles produce a second page without changing production pagination. The schedule and external-news contracts use fixed public sources.
- CONTRACTS: `/rozklad/bachelor-1` initial load exposes `[data-testid="schedule-shell"]`; the explicit source link from `bachelor-1` to `master-1` exposes `[data-testid="schedule-source-link"][data-source="master-1"]` from the destination cache. The first visible `[data-testid="educational-program-link"]` resolves to a public `/educational-programs/[slug]` page whose sync shell is `[data-testid="educational-program-shell"]` and whose deferred payload is `[data-testid="educational-program-content"]`. Pagination uses `[data-testid="news-pagination-next"]`; external page two exposes the `external-news-page-*` shell/content markers, and faculty page two exposes the `faculty-news-page-*` markers. The external source shell/content markers use the `external-news-source-*` prefix. The first visible `[data-testid="faculty-news-article-link"]` resolves to the `faculty-news-article-*` shell/content markers.
- LOOP: build with the testing API, start the fresh artifact on port 3100, run the focused Chromium suite, stop the server, edit, and repeat. Agent limit: the local production build needs the repository's existing environment variables.
- LIVENESS: n/a; local build and start.
- WALLS: run the build and local server outside the filesystem sandbox if socket binding or build workers are restricted.
