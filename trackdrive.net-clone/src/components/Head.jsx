export const SITE = 'https://avortyx-prototype.vercel.app'
const OG_IMAGE = SITE + '/og-image.png?v=2'

// hides <main> until motion.js has built the page; pages can override it (the landing
// page keeps its hero visible from the first paint)
const BOOT_STYLE = 'html.avx-boot main { opacity: 0 !important; animation: none !important; }'

// The per-page part of <head>; everything shared lives in src/document.html.
export default function Head({ route, meta }) {
  const url = SITE + route
  const ogTitle = meta.ogTitle || meta.title
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: meta.bootStyle || BOOT_STYLE }} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Avortyx Prototype" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1440" />
      <meta property="og:image:height" content="756" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="application-name" content="Avortyx Prototype" />
      <meta name="apple-mobile-web-app-title" content="Avortyx Prototype" />
      {meta.head}
    </>
  )
}
