import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ENTRY = '/src/entry-server.jsx'

// The site is rendered by React on the server: in dev every page request is rendered on the
// fly (static files still come from public/); `npm run build` prerenders them all to dist/.
function renderPages() {
  return {
    name: 'avortyx-render-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const path = decodeURI(req.url.split(/[?#]/)[0])
          // same addresses as production: /, /features.html, and /features as /features.html
          const route = path === '/' || path === '/index.html' ? '/' : path.endsWith('.html') ? path : path.replace(/\/$/, '') + '.html'
          const { render } = await server.ssrLoadModule(ENTRY)
          const html = render(route)
          if (html == null) return next()
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          // reload the browser when a page or component changes
          res.end(html.replace('</body>', '<script type="module" src="/@vite/client"></script>\n</body>'))
        } catch (err) {
          server.ssrFixStacktrace(err)
          next(err)
        }
      })
      server.watcher.on('change', (file) => {
        if (file.includes('/src/')) server.ws.send({ type: 'full-reload' })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), renderPages()],
})
