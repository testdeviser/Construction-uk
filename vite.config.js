import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pages } from './src/pages.js'

// Folder the site lives in on the server: https://tdcatalog.com/design/construction-uk/
// Change this if the site moves (e.g. to '/' for its own domain).
const BASE = '/design/construction-uk/'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/* The site is a single-page React app (React Router). The FTP host can't be told to
   send every URL to index.html, so after the build we write a copy of index.html into
   a folder per page (about/index.html …) with that page's own <title> and description.
   Opening or refreshing /about then loads a real file, and React Router takes over.
   Old .html links (about.html …) get a tiny redirect page to the new address. */
function pageFolders() {
  let outDir
  return {
    name: 'page-folders',
    apply: 'build',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir) },
    closeBundle() {
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      for (const p of pages) {
        if (p.path === '/') continue
        const slug = p.path.slice(1)
        const pageHtml = html
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(p.description)}`)
        mkdirSync(resolve(outDir, slug), { recursive: true })
        writeFileSync(resolve(outDir, slug, 'index.html'), pageHtml)

        const to = `${BASE}${slug}/`
        writeFileSync(resolve(outDir, `${slug}.html`), `<!DOCTYPE html>
<html lang="en-GB"><head><meta charset="UTF-8">
<title>${esc(p.title)}</title>
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash)</script>
</head><body><a href="${to}">${esc(p.title)}</a></body></html>
`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), pageFolders()],
  // Absolute asset paths so pages in sub-folders (/about/) still find /assets/…
  base: command === 'build' ? BASE : '/',
}))
