// /features/api.html
export const meta = {
  title: "REST API - A Fully Programmable, API-First Platform | Avortyx",
  description: "Avortyx is API-first — anything you can do in the dashboard, you can do through the standardized REST API.",
  bodyClass: "avortyx_marketing features_api ",
  layout: "feature",
}

export default function Api() {
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
          <h1 className="fw-bold mb-2">REST API</h1>
          <p className="lead mktg-subpage-hero-subtitle">Avortyx is API-first — anything you can do in the dashboard, you can do through the standardized REST API.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Built API-First, Not Bolted On</h3>
            <p>The API isn't an afterthought — it's the foundation. The same endpoints that power Avortyx's own grids and forms are the ones you call, so the API is always complete and always current.</p>
            <p className="text-muted">Manage calls, leads, buyers, offers, schedules, numbers, recordings, suppression lists, and more over a clean, RESTful interface with JSON responses.</p>
            <h3>Two Ways to Authenticate</h3>
            <ul>
              <li>
                <strong>Company Access Tokens</strong>
                {" "}— basic authentication with a public/private key pair, scoped to a single company. Each key pair carries its own{" "}
                <strong>granular permissions</strong>
                , so you can issue a token that, say, only reads calls or only manages leads.
              </li>
              <li>
                <strong>Developer Access Tokens</strong>
                {" "}— token authentication tied to a user. The token inherits that user's existing permissions, including every company they're allowed to access — ideal for internal tools that span accounts.
              </li>
            </ul>
            <h3>Granular, Per-Key Permissions</h3>
            <p>Don't hand out all-or-nothing keys. Each Company Access Token can be limited to exactly the resources it needs — or granted full access. Tokens can also be scoped to a single agent (collaborator), and paused instantly without being deleted.</p>
            <h3>Locked Down & Logged</h3>
            <p>API access is protected and fully auditable:</p>
            <ul>
              <li>
                <strong>IP whitelisting</strong>
                {" "}— restrict any token to approved IP addresses (see{" "}
                <a href="/features/api_whitelist.html">API IP Whitelist</a>
                ).
              </li>
              <li><strong>Encrypted at rest</strong> — private keys and developer tokens are encrypted, never stored in plain text.</li>
              <li>
                <strong>Authorization on lead creation</strong>
                {" "}— optionally require a valid token even on lead-post endpoints, so no one can inject leads without credentials.
              </li>
              <li>
                <strong>Detailed security logs</strong>
                {" "}— every API session is tracked with its IP address, country, ISP, and network (ASN), and blocked-IP attempts are recorded — so you can see exactly who is using each key and from where.
              </li>
            </ul>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="https://admin.avortyx.com/api/docs" className="btn btn-td-green">REST API Docs</a>
              {" "}
              <a href="/features/api_whitelist.html" className="btn btn-outline-td-green">API IP Whitelist</a>
              {" "}
              <a href="/features/custom_webhook.html" className="btn btn-outline-td-green">Custom Webhooks</a>
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
