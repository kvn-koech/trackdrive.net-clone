import { renderToStaticMarkup } from 'react-dom/server'
import Head from './components/Head.jsx'
import Layout from './components/Layout.jsx'
import template from './document.html?raw'

// Every file in src/pages is a page: pages/index.jsx is "/", pages/features/api.jsx is
// "/features/api.html". Each exports `meta` and a default component that renders <main>.
const modules = import.meta.glob('./pages/**/*.jsx', { eager: true })

function routeFor(file) {
  const path = file.replace(/^\.\/pages/, '').replace(/\.jsx$/, '')
  return path === '/index' ? '/' : path + '.html'
}

export const pages = Object.fromEntries(Object.entries(modules).map(([file, mod]) => [routeFor(file), mod]))
export const routes = Object.keys(pages).sort()

// React adds a preload hint for every eager <img>; the pages already order their own loading,
// and these would pull below-the-fold art in early
const IMAGE_PRELOADS = /^(<link rel="preload" as="image"[^>]*\/>)+/

export function render(route) {
  const page = pages[route]
  if (!page) return null
  const { default: Page, meta } = page
  const head = renderToStaticMarkup(<Head route={route} meta={meta} />)
  const body = renderToStaticMarkup(
    <Layout route={route} layout={meta.layout}>
      <Page />
    </Layout>,
  ).replace(IMAGE_PRELOADS, '')
  return template
    .replace('<!--page-head-->', () => head)
    .replace('<!--body-class-->', () => meta.bodyClass)
    .replace('<!--page-body-->', () => body)
}
