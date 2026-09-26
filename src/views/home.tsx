import { readFileSync } from 'node:fs'

// Same working-directory contract as staticPlugin({ assets: 'public' }).
// Keep the existing Bun server and deployment model; only replace its homepage.
const viewportCSS = readFileSync('public/mood/viewport.css', 'utf8')
const page = readFileSync('public/mood/page.html', 'utf8')
  .replace('</head>', `<style>${viewportCSS}</style></head>`)

export function homePage(): string {
  return page
}
