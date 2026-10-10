// /features/salesforce.html
export const meta = {
  title: "Salesforce Integration | Avortyx",
  description: "Allow your sales team to view call activity, lead attribution and important customer information all within Salesforce.",
  bodyClass: "avortyx_marketing integrations_salesforce ",
  layout: "feature",
}

export default function Salesforce() {
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
          <h1 className="fw-bold mb-2">Avortyx + Salesforce</h1>
          <p className="lead mktg-subpage-hero-subtitle">Allow your sales team to view call activity, lead attribution and important customer information all within Salesforce.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Automate Your Marketing</h3>
            <p>Allow you and your sales team to view call activity, lead attribution and important customer information. Having all of this data combined into one CRM is vital to converting leads into sales, and will provide valuable insights that you and your team can leverage to optimize your marketing efforts.</p>
            <ul>
              <li>Listen to call recordings</li>
              <li>Convert leads into sales faster with rich data</li>
              <li>Arm your sales team with the tools they need to convert</li>
              <li>Analyze phone call data within your Salesforce</li>
            </ul>
            <p>Avortyx's Salesforce integration allows you and your sales team to view valuable call data such as lead attribution and important customer data all within one application. By adding call-related insights and data to your Salesforce CRM, you and your team will better understand which leads to focus on.</p>
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
