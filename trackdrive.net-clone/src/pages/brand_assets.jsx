// /brand_assets.html
export const meta = {
  title: "Brand Assets | Avortyx",
  description: "Official logos, color palette, and typography guidelines for Avortyx.",
  bodyClass: "avortyx_marketing brand_assets without-waves",
  layout: "site",
}

// the downloadable logo set in public/assets/brand: [file, name, where to use it]
const LOGOS = [
  ["horizontal-gradient", "Primary Logotype", "Use on a white background."],
  ["horizontal-white", "Primary Logotype", "Use on a gradient background."],
  ["vertical-gradient", "Vertical Logotype", "Use in marketing with plenty of space on white."],
  ["vertical-white", "Vertical Logotype", "Use in marketing with plenty of space."],
  ["icon-gradient", "Icon", "Use in UI with limited space on white."],
  ["icon-white", "Icon", "Use in UI with limited space."],
]

export default function BrandAssets() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Features </a>
          </div>
          <h1 className="fw-bold mb-2">Brand Assets</h1>
          <p className="lead mktg-subpage-hero-subtitle">Official logos, color palette, and typography guidelines for Avortyx.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="mb-5">
            <h2 className="fw-bold mb-2">Logo Guidelines</h2>
            <p className="text-muted">The logo should never be placed vertically, outlined or modified in shape or form.</p>
          </div>
          <div className="row g-4 mb-5">
            {LOGOS.map(([file, title, use]) => {
              const dark = file.endsWith('-white')
              return (
                <div key={file} className="col-md-6 col-lg-4">
                  <div className={'mktg-brand-card' + (dark ? ' mktg-brand-card--dark' : '')}>
                    <div className={'mktg-brand-preview' + (dark ? ' mktg-brand-preview--dark' : '')}>
                      <img className={'avx-brand-logo avx-brand-logo--' + file.split('-')[0]} src={`/assets/brand/avortyx-${file}.png`} alt={`Avortyx ${title.toLowerCase()}`} />
                    </div>
                    <div className="mktg-brand-card-body">
                      <h5 className="fw-semibold mb-1">{title}</h5>
                      <p className="text-muted small mb-3">{use}</p>
                      <div className="d-flex gap-2">
                        <a className="btn btn-sm btn-outline-td-green" download href={`/assets/brand/avortyx-${file}.svg`}>SVG</a>
                        <a className="btn btn-sm btn-outline-td-green" download href={`/assets/brand/avortyx-${file}.png`}>PNG</a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Color Palette</h2>
            <p className="text-muted">Start with a white canvas, accompanied by a dominance of Avortyx blue. Filled with cool grey copy and splashed accents of CTA orange.</p>
          </div>
          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette primary-gradient" />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette primary-color" />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette accent-color" />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette secondary-color" />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette ternory-gradient" />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="mktg-color-swatch color-palette dark-color" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Typography</h2>
            <p className="text-muted">Our primary typeface is used for headlines. The supporting typeface handles paragraphs, annotations, navigation elements and buttons.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ul className="list-unstyled mktg-typography-list">
                <li>
                  <h1>Headline 1 is Rubik Medium at 64px.</h1>
                </li>
                <li>
                  <h2>Headline 2 is Rubik Medium at 48px.</h2>
                </li>
                <li>
                  <h3>Headline 3 is Rubik Medium at 36px.</h3>
                </li>
                <li>
                  <h4>Headline 4 is Rubik Regular at 24px.</h4>
                </li>
                <li>
                  <h5>Headline 5 is Rubik Regular at 20px.</h5>
                </li>
                <li>
                  <h6>Headline 6 is Rubik Regular at 14px.</h6>
                </li>
                <li>
                  <p>Paragraphs are in Work Sans Regular at 18px.</p>
                </li>
                <li>
                  <p className="text-uppercase fw-semibold">Buttons & navigation elements use all caps in Work Sans Regular.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="marketing-cta-band">
        <div className="marketing-cta-band__bg" aria-hidden="true"><img alt="" src="/assets/avx-site/img/constellation-light.svg" /></div>
        <div className="container">
          <h2 className="marketing-cta-band__title">Ready to get started?</h2>
          <p className="marketing-cta-band__subtitle">See how Avortyx turns every lead into a routed, tracked and paid call — start free, or book a walkthrough with a specialist.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a href="/sign_up.html" className="btn btn-cta-primary fw-semibold">Sign Up Free</a>
            {" "}
            <a href="/p/contact.html" className="btn btn-cta-outline fw-semibold">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  )
}
