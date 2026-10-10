// /features/zoho_crm.html
export const meta = {
  title: "Zoho CRM | Call Tracking and Analytics | Avortyx",
  description: "Integrated call logs, lead syncing, and click-to-call dialing within Zoho CRM.",
  bodyClass: "avortyx_marketing features_zoho_crm ",
  layout: "feature",
}

export default function ZohoCrm() {
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
          <h1 className="fw-bold mb-2">
            Avortyx +{" "}
            <img alt="Zoho CRM" className="integration-title-logo" src="/assets/avx-site/img/zoho_crm.png" />
          </h1>
          <p className="lead mktg-subpage-hero-subtitle">Integrated call logs, lead syncing, and click-to-call dialing within Zoho CRM.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>The Zoho CRM integration with Avortyx provides a better customer experience for managing leads, contacts, phone calls, and more.</p>
            <p>By utilizing the integration, Zoho users gain access to integrated call logs, notes, lead and contact management all within Zoho CRM.</p>
            <p>Zoho users benefit from click-to-call dialing, power dialing, automatic call logging, automatic lead and contact syncing and more.</p>
            <h3>Zoho User Features</h3>
            <ul>
              <li>Automatically login to Avortyx if a matching agent exists.</li>
              <li>
                Automatically sync Avortyx agent data to Zoho users if a corresponding user field in Zoho is defined:
                <ul>
                  <li>TDPhoneNumber</li>
                  <li>TDAgentId</li>
                  <li>TDAgentEmail</li>
                  <li>TDAgentCallCenterId</li>
                </ul>
              </li>
              <li>Click-to-call dialing within Zoho CRM interface.</li>
            </ul>
            <h3>Avortyx Zoho Commands</h3>
            <p>Run actions from Avortyx to manage Zoho module entries directly from your call flow. Available commands include:</p>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Action</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Create Module Entry</strong></td>
                    <td>Create a new record in any Zoho module</td>
                  </tr>
                  <tr>
                    <td><strong>Update Module Entry</strong></td>
                    <td>Update an existing record's fields</td>
                  </tr>
                  <tr>
                    <td><strong>Create/Update Module Entry</strong></td>
                    <td>Create a record if it doesn't exist, or update it if it does</td>
                  </tr>
                  <tr>
                    <td><strong>Convert Lead</strong></td>
                    <td>Convert a Zoho lead into a contact, account, and deal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>Supported Zoho Modules</h3>
            <p>Create and update actions can target the following Zoho modules:</p>
            <div className="row g-2 mb-4">
              <div className="col-md-6">
                <ul className="mb-0">
                  <li>Leads</li>
                  <li>Contacts</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="mb-0">
                  <li>Calls</li>
                  <li>Notes</li>
                </ul>
              </div>
            </div>
            <p>When creating a Note, you can attach it to any Zoho record type (Leads, Contacts, Accounts, Deals, Campaigns, Tasks, Cases, Events, Solutions, or Products).</p>
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
