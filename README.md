This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Schedule sync

The Cloudflare Worker wakes hourly and calls the sync API only at these times in
`Europe/Kyiv`: 07:00–17:00 hourly, then 19:00 and 21:00, every day. Other hours are
skipped without calling Vercel. Seasonal clock changes are handled automatically.

The freshness indicator uses the same schedule, with a 10-minute grace period for
each import to finish. Planned evening and overnight pauses do not trigger a delay
warning, but missed imports and import errors still do.

```bash
bunx wrangler dev --config workers/schedule-cron/wrangler.json --test-scheduled
curl "http://localhost:8787/__scheduled"
```

The local scheduled trigger also respects the current hour. To simulate a specific
run, pass its Unix timestamp in milliseconds via the `time` query parameter.

## Project board submissions

The two public forms send Server Action `POST` requests to `/projects/propose`
and `/projects/<slug>`. Before enabling the board on a public deployment, add
a Vercel Firewall rate-limit rule on `POST` under `/projects/`, keyed by client
IP. Start at 15 requests per IP per minute in staging and adjust for shared campus
connections. Apply a blocking action, then confirm normal submissions reach
Payload and requests above the limit do not create records. `GET` requests and
Payload admin routes must remain outside the rule.

The forms validate submissions with Zod on the server. Proposal and application
records (including the applicant's group, course and email or Telegram handle)
are private; no mail service is required.

### Publish the website's own project

After applying the project-board migration to the intended database, run
`bun run payload run ./scripts/seed-website-project.ts`. This adds the
«Сайт ФМІ РДГУ» project as a draft without touching an existing record.
Review and publish it in Payload using the administrator account that will
handle applications. To publish during a pre-build seed instead, set
`PROJECTS_PUBLISHER_EMAIL` to that existing administrator's email when running
the same command. Prefer admin publication on a running site so its caches
are invalidated.
