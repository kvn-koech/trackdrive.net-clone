// /features/slack.html
export const meta = {
  title: "Slack Integration | Avortyx",
  description: "Receive real-time call, SMS, and form submission notifications directly in your Slack channels.",
  bodyClass: "avortyx_marketing integrations_slack ",
  layout: "feature",
}

export default function Slack() {
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
          <h1 className="fw-bold mb-2">Avortyx + Slack</h1>
          <p className="lead mktg-subpage-hero-subtitle">Receive real-time call, SMS, and form submission notifications directly in your Slack channels.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Receive Real-Time Notifications to your Slack Application</h3>
            <p><b>What is Slack?</b></p>
            <p>Slack is a collaboration hub that connects your organization -- all the pieces and the people -- so you can get things done. Slack allows you to collaborate online just like you would in person and communicate effectively all in one place.</p>
            <p>Our Slack integration pulls call, SMS, and form submission data from Avortyx into Slack, giving your organization the ability to receive real-time notifications.</p>
            <img alt="Slack Integration" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-site/img/integration-slack.webp" />
            <h3>The Benefits:</h3>
            <ul>
              <li>Never miss a phone call or text message with real-time notifications</li>
              <li>Follow up with leads faster by sending form submissions to the appropriate parties</li>
              <li>Select call types, tags, and which tracking numbers to send to Slack using filters</li>
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
