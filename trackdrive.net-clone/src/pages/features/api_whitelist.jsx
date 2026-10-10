// /features/api_whitelist.html
export const meta = {
  title: "API IP Whitelist | Avortyx",
  description: "Restrict API access to approved IP addresses for enhanced security.",
  bodyClass: "avortyx_marketing features_api_whitelist ",
  layout: "feature",
}

export default function ApiWhitelist() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#security-compliance-tools" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Security & Compliance Tools{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Security & Compliance Tools</p>
          <h1 className="fw-bold mb-2">API IP Whitelist</h1>
          <p className="lead mktg-subpage-hero-subtitle">Restrict API access to approved IP addresses for enhanced security.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How It Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-list-check" /></div>
                  <div className="flow-node-label">Add Trusted IPs</div>
                  <div className="flow-node-desc">List approved IPs company-wide or per access token</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-toggle-on" /></div>
                  <div className="flow-node-label">Turn On Enforcement</div>
                  <div className="flow-node-desc">Each list stays off until you enforce it</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-shield-halved" /></div>
                  <div className="flow-node-label">Source IP Checked</div>
                  <div className="flow-node-desc">Every API call is matched against your lists</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-circle-check" /></div>
                  <div className="flow-node-label">Allowed or Denied</div>
                  <div className="flow-node-desc">Unlisted IPs are refused before reaching your data</div>
                </div>
              </div>
            </div>
            <p>Control exactly which networks can reach your API. Configure trusted IP addresses, and requests from anywhere else are rejected before they reach your data.</p>
            <ul className="text-muted">
              <li><strong>Company-wide</strong> — restrict API access to your organization's trusted network from your preferences.</li>
              <li><strong>Company access token</strong> — define a dedicated whitelist for shared integrations.</li>
              <li>
                <strong>Developer access token</strong>
                {" "}— assign a unique whitelist to each developer token for tighter, per-integration control.
              </li>
            </ul>
            <div className="bg-light border-start border-success border-4 rounded-3 p-4 small text-muted mb-4" style={{ marginTop: "60px" }}>
              <p><strong>Important Legal Notice</strong></p>
              <p>
                The above tools help you operate your outbound calling and messaging program; they do not, on their own, guarantee compliance. You are{" "}
                <strong>solely responsible</strong>
                {" "}for configuring these controls and for complying with the Telephone Consumer Protection Act (TCPA), the FTC Telemarketing Sales Rule (TSR), all applicable FCC regulations, and any other applicable federal or state telemarketing and consumer privacy laws.
              </p>
              <p>
                The Avortyx Platform is a real-time communications routing system and is{" "}
                <strong>not</strong>
                {" "}designed or guaranteed to serve as a permanent or long-term repository for call recordings, transcriptions, call logs, or consent records. You are responsible for exporting and securely storing all telephony, audio, and consent data in your own systems — including before any automated PII redaction — to satisfy your record-keeping obligations. Avortyx assumes no liability for the loss, auto-deletion, redaction, or unavailability of data stored solely within the Platform.
              </p>
              <p className="mb-0">
                <strong>This overview does not constitute legal advice.</strong>
                {" "}
                <a target="_blank" href="/terms_of_service.html">Read the Terms of Service</a>
                {" "}(Sections 2.3.6, 2.3.6.1, and 2.6) for full details.
              </p>
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
