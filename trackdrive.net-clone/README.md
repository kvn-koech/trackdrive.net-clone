# Avortyx marketing site

Marketing site for Avortyx. Pages are React components, rendered to static HTML at build
time with Vite, and deployed on Vercel. URLs are the same as the old static site
(`/`, `/features.html`, `/features/call_tracking.html`, …).

## Structure

```
src/
  document.html            Shared <html>/<head>: analytics, fonts, CSS and scripts (one copy for every page)
  entry-server.jsx         Finds the pages and renders one to a full HTML document
  components/
    Head.jsx               Per-page <head> tags: title, description, canonical, Open Graph
    Layout.jsx             Navbar (or the feature-page strip), the page, footer, feature pop-up shell
    Navbar.jsx, Footer.jsx, BrandMark.jsx, FeatureHeader.jsx, FeatureModal.jsx
  pages/                   One file per page; the path is the URL
    index.jsx              /
    features.jsx           /features.html
    features/api.jsx       /features/api.html
public/                    Copied to the build as-is
  assets/avx-motion/       motion.css + motion.js: animations, live demos, search, zoom
  assets/avx-theme/        theme.css: colors and type
  assets/avx-site/         Base stylesheet and script (Bootstrap, menus, feature pop-ups, cookie notice)
  assets/avx-shots/        Product screenshots
scripts/prerender.js       Writes every page to dist/
vercel.json                Build settings, URL rewrites, cache headers
```

Each page file exports `meta` (title, description, body class, layout) and a component that
returns the page's `<main>`:

```jsx
export const meta = {
  title: 'Call Tracking | Call Tracking and Analytics | Avortyx',
  description: 'Measure call conversions …',
  bodyClass: 'avortyx_marketing features_call_tracking',
  layout: 'feature', // 'feature' pages get the "View full page" strip instead of the navbar
}

export default function CallTracking() {
  return <main>…</main>
}
```

To add a page, add a file under `src/pages/`; it is picked up automatically.

The pages are plain HTML in the browser: `motion.js` and `site.js` add the interactivity
after load, so React is used at build time only.

## Commands

```
npm install
npm run dev       # dev server; pages re-render on every request and the browser reloads on save
npm run build     # prerender every page into dist/
npm run preview   # serve dist/
```

Deploy with `vercel --prod`.
