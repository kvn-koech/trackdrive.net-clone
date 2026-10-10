// /features/mailchimp.html
export const meta = {
  title: "MailChimp Integration | Avortyx",
  description: "Automate your email marketing by connecting MailChimp in minutes with zero coding required.",
  bodyClass: "avortyx_marketing integrations_mailchimp ",
  layout: "feature",
}

export default function Mailchimp() {
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
          <h1 className="fw-bold mb-2">MailChimp + Avortyx</h1>
          <p className="lead mktg-subpage-hero-subtitle">Automate your email marketing by connecting MailChimp in minutes with zero coding required.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Automate Your Email Marketing</h3>
            <p>In a matter of minutes and without a single line of code, connect Avortyx and MailChimp.</p>
            <ul>
              <li>Send branded HTML emails to your leads through Mailchimp</li>
              <li>Choose which Mailchimp audience (list) to send from</li>
              <li>Trigger emails automatically from call events or <a href="/features/lead_automation.html">schedule actions</a></li>
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
