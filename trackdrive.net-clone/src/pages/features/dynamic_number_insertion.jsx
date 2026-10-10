// /features/dynamic_number_insertion.html
export const meta = {
  title: "Dynamic Number Insertion | Call Tracking and Analytics | Avortyx",
  description: "Automatically swap tracking numbers on your website to attribute calls to the correct source.",
  bodyClass: "avortyx_marketing features_dynamic_number_insertion ",
  layout: "feature",
}

export default function DynamicNumberInsertion() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#tracking-attribution" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Tracking & Attribution{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Tracking & Attribution</p>
          <h1 className="fw-bold mb-2">Dynamic Number Insertion</h1>
          <p className="lead mktg-subpage-hero-subtitle">Automatically swap tracking numbers on your website to attribute calls to the correct source.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How It Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-user" aria-hidden="true" /></div>
                  <div className="flow-node-label">Visitor Lands</div>
                  <div className="flow-node-desc">Arrives from a specific source</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-arrows-rotate" aria-hidden="true" /></div>
                  <div className="flow-node-label">Number Swapped</div>
                  <div className="flow-node-desc">A snippet shows a tracking number</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></div>
                  <div className="flow-node-label">Visitor Calls</div>
                  <div className="flow-node-desc">Dials the number they were shown</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-bullseye" aria-hidden="true" /></div>
                  <div className="flow-node-label">Call Attributed</div>
                  <div className="flow-node-desc">Mapped back to the visitor's source</div>
                </div>
              </div>
            </div>
            <p>Know which traffic source drives every phone call. Avortyx swaps the phone number on your website depending on where the visitor came from, so each call is automatically attributed to the right campaign.</p>
            <ul className="text-muted">
              <li><strong>One-line install</strong> — drop a single snippet of JavaScript on your page.</li>
              <li><strong>Source-aware numbers</strong> — track visitors from specific sources, URL keywords, and custom tokens.</li>
              <li>
                <strong>Automatic attribution</strong>
                {" "}— Avortyx detects the visitor's source and swaps their number so you can see which sources send you calls.
              </li>
            </ul>
            <p className="text-muted small">
              Developer libraries are available for{" "}
              <a href="https://github.com/Avortyx/avortyx-js/" target="_blank" rel="noopener noreferrer">JavaScript</a>
              {" "}and{" "}
              <a href="https://s3.amazonaws.com/trackdrive/avortyx-php/index.html" target="_blank" rel="noopener noreferrer">PHP</a>
              .
            </p>
            <h3>How-To Video</h3>
            <p className="text-muted mb-1">
              <strong>See it in action.</strong>
              {" "}A short walkthrough of setting up dynamic number replacement.
            </p>
            <div className="marketing-video-container">
              <iframe width="853" height="480" src="https://www.youtube.com/embed/q9CIddY5fYk?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
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
