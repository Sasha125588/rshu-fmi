import { execSync } from 'node:child_process'

const SITEMAP = 'src/app/sitemap.ts'

const DESIGN_ROOTS = ['src/app/', 'src/components/', 'public/']

const changedFiles = execSync('git diff --cached --name-only', {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean)

const hasDesignChanges = changedFiles.some((file) =>
  DESIGN_ROOTS.some((root) => file.startsWith(root))
)

const hasSitemapUpdate = changedFiles.includes(SITEMAP)

if (hasDesignChanges && !hasSitemapUpdate) {
  console.error(`❌ You changed the site but didn't update lastModified in sitemap.ts.`)

  process.exit(1)
}
