// /careers.html
export const meta = {
  title: "Careers | Avortyx",
  description: "Join the team building the future of call tracking and lead automation.",
  bodyClass: "avortyx_marketing careers without-waves",
  layout: "site",
}

export default function Careers() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Features </a>
          </div>
          <h1 className="fw-bold mb-2">Careers</h1>
          <p className="lead mktg-subpage-hero-subtitle">Join the team building the future of call tracking and lead automation.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="mktg-careers-card">
                <img alt="Avortyx" className="mb-4 mktg-careers-illustration" src="/assets/avx-site/img/careers.svg" />
                <h3 className="fw-bold mb-3">Avortyx is a bootstrapped profitable startup.</h3>
                <p className="text-muted mb-4">Interested in joining the team?</p>
                <a className="btn btn-td-green px-4 py-2 fw-semibold" href="/p/contact.html">Send Us a Message</a>
              </div>
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
