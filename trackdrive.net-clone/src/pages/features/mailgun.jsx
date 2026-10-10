// /features/mailgun.html
export const meta = {
  title: "MailGun Integration | Avortyx",
  description: "Set up your email integration in no time with powerful sending infrastructure, routing, and analytics.",
  bodyClass: "avortyx_marketing integrations_mailgun ",
  layout: "feature",
}

export default function Mailgun() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features/integrations.html" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Integrations{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Integrations</p>
          <h1 className="fw-bold mb-2">MailGun + Avortyx</h1>
          <p className="lead mktg-subpage-hero-subtitle">Set up your email integration in no time with powerful sending infrastructure, routing, and analytics.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Intelligent Inbound Routing</h3>
            <p>
              Set up your email integration in no time, and start{" "}
              <a href="https://www.mailgun.com/blog/tags-explained-gaining-useful-insights-from-email-segmentation" target="_blank" rel="noopener noreferrer">A/B testing</a>
              ,{" "}
              <a href="https://www.mailgun.com/blog/tips-tricks-scheduling-email-delivery" target="_blank" rel="noopener noreferrer">scheduling</a>
              , and{" "}
              <a href="https://www.mailgun.com/analytics" target="_blank" rel="noopener noreferrer">tracking</a>
              {" "}your sends. Whether you need to send 10 emails or 10 million, MailGun's delivery infrastructure scales with you.
            </p>
            <ul>
              <li>Powerful sending infrastructure</li>
              <li>Intelligent inbound routing & storage</li>
              <li>Tracking & analytics</li>
              <li>Email validation</li>
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
