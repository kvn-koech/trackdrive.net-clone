// /features/typeform.html
export const meta = {
  title: "Typeform Integration | Avortyx",
  description: "Connect Avortyx to Typeform with zero coding and turn form submissions into phone calls.",
  bodyClass: "avortyx_marketing integrations_typeform ",
  layout: "feature",
}

export default function Typeform() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features/integrations.html" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Integrations{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Integrations</p>
          <h1 className="fw-bold mb-2">Avortyx + Typeform</h1>
          <p className="lead mktg-subpage-hero-subtitle">Connect Avortyx to Typeform with zero coding and turn form submissions into phone calls.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Automate Your Marketing</h3>
            <p>It's easy to connect Avortyx to Typeform and requires absolutely zero coding experience — the only limit is your own imagination.</p>
            <ul>
              <li>Submit lead data to Avortyx automatically when a form is completed</li>
              <li>Turn your leads into phone calls with our <a href="/features/lead_automation.html">Lead To Call Automation</a></li>
              <li>Convert leads into sales faster by contacting them within minutes of submission</li>
            </ul>
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
