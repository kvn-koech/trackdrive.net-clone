// /features/infusionsoft.html
export const meta = {
  title: "Infusionsoft Integration | Avortyx",
  description: "Track all your calling and texting activities on your Infusionsoft dashboard using Avortyx.",
  bodyClass: "avortyx_marketing integrations_infusionsoft ",
  layout: "feature",
}

export default function Infusionsoft() {
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
          <h1 className="fw-bold mb-2">Avortyx + Infusionsoft</h1>
          <p className="lead mktg-subpage-hero-subtitle">Track all your calling and texting activities on your Infusionsoft dashboard using Avortyx.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Automate Your Marketing</h3>
            <p>Track all your calling/texting activities on your InfusionSoft dashboard using Avortyx. All activities are shown as notes in the contact information.</p>
            <ul>
              <li>Sync leads to InfusionSoft as contacts</li>
              <li>Create notes on contacts when calls, SMS, or emails are sent and received</li>
              <li>Using our <a href="/features/lead_automation.html">Schedule</a> feature you can send an email using InfusionSoft</li>
              <li>
                Using our{" "}
                <a href="/features/lead_automation.html">Schedule</a>
                {" "}feature you can add a lead to an InfusionSoft campaign
              </li>
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
