# Avortyx marketing site

Static marketing site for Avortyx, built with Vite and deployed on Vercel.

## Structure

```
index.html                 Landing page (Vite entry; built to dist/index.html)
public/                    Everything else, copied to the build as-is
  *.html, features/, p/, users/   Site pages
  assets/avx-theme/        theme.css: site-wide color theme (blue primary, slate text)
  assets/avx-motion/       motion.css + motion.js: 3D animations and scroll effects
  assets/avx-baked/        Pre-rendered artwork used by the animations
  assets/trackdrive_marketing/brand-assets/ringba assets/   Sphere images used by the animations
  avortyx_logo_blue.png, favicon-*.png, apple-touch-icon-blue.png   Logo and icons
src/                       React version of the site (not used by the live site)
vercel.json                URL rewrites
```

Every page loads `theme.css`, `motion.css` and `motion.js` from its `<head>`.

## Commands

```
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
```

Deploy with `vercel deploy --prod`.
