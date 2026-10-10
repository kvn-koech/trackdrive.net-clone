// Writes every page to dist/ as static HTML, next to a copy of public/.
// Runs after `vite build --ssr`, which compiles src/entry-server.jsx into .ssr/.
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render, routes } = await import(pathToFileURL(join(root, '.ssr/entry-server.js')).href)

rmSync(dist, { recursive: true, force: true })
cpSync(join(root, 'public'), dist, { recursive: true })

for (const route of routes) {
  const file = join(dist, route === '/' ? 'index.html' : route)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(route))
}
rmSync(join(root, '.ssr'), { recursive: true, force: true })
console.log(`prerendered ${routes.length} pages to dist/`)
