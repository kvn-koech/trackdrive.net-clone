// /features/zapier.html
export const meta = {
  title: "Zapier Integration | Avortyx",
  description: "Zapier is the glue that connects Avortyx to more than 1,000 web applications.",
  bodyClass: "avortyx_marketing integrations_zapier ",
  layout: "feature",
}

export default function Zapier() {
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
          <h1 className="fw-bold mb-2">Zapier + Avortyx Automation</h1>
          <p className="lead mktg-subpage-hero-subtitle">Zapier is the glue that connects Avortyx to more than 1,000 web applications.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Zap Avortyx with Applications You Already Use</h3>
            <p>Connect Avortyx to over 1,000 web applications through Zapier's automation platform. Use Avortyx triggers to send call and lead data to the tools your team already relies on, without writing any code.</p>
            <img alt="Zapier Integration" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-site/img/integration-zapier.webp" />
            <h4>Available Triggers</h4>
            <p>Zapier can listen for events in Avortyx and automatically start a workflow when they occur:</p>
            <ul>
              <li><strong>New Call</strong> — fires when a new inbound or outbound call is recorded.</li>
              <li><strong>Call Completed</strong> — fires when a call ends, including its duration, recording URL, and disposition.</li>
              <li><strong>New Lead</strong> — fires when a new lead is created via form, API, or file upload.</li>
            </ul>
            <h4>Popular Use Cases</h4>
            <ul>
              <li>Send new call data to a Google Sheet or CRM for reporting.</li>
              <li>Post a Slack notification whenever a high-value call is completed.</li>
              <li>Create Avortyx leads automatically from Typeform, Gravity Forms, or landing page submissions.</li>
              <li>Sync call outcomes to your email marketing platform for follow-up sequences.</li>
            </ul>
            <h4>Getting Started</h4>
            <p>Setting up a Zap takes just a few minutes. Connect Avortyx to Zapier, authenticate your account, and choose a Avortyx trigger to start your workflow.</p>
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
