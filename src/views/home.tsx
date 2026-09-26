import { readFileSync } from 'node:fs'

// Same working-directory contract as the existing staticPlugin({ assets: 'public' }).
// The front page is a real HTML/CSS/JS scene; the old information sections are not rendered.
// No changes to src/index.ts, deployment, DNS, the personal site, or WordPress.
const page = readFileSync('public/mood/page.html', 'utf8')

export function homePage(): string {
  return page
}
