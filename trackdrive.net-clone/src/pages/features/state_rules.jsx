// /features/state_rules.html
export const meta = {
  title: "State Rules | State Calling Compliance | Avortyx",
  description: "Calling-hour windows, holiday blackouts, and contact frequency limits — enforced state by state on every outbound dial.",
  bodyClass: "avortyx_marketing features_state_rules ",
  layout: "feature",
}

export default function StateRules() {
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
          <h1 className="fw-bold mb-2">State Rules</h1>
          <p className="lead mktg-subpage-hero-subtitle">Calling-hour windows, holiday blackouts, and contact frequency limits — enforced state by state on every outbound dial.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>The moment Avortyx is about to place an outbound call, it checks the lead's state against your active rules. If a rule would be violated, the call is held and automatically rescheduled for the next allowed time, so nothing is dropped or dialed out of policy.</p>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card p-3 h-100">
                  <h5 className="fw-bold"><i className="fa-solid fa-clock me-2 text-muted" />State Business Hours</h5>
                  <p className="text-muted small mb-0">Per-day calling windows for each state, evaluated in the lead's local time zone.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 h-100">
                  <h5 className="fw-bold"><i className="fa-solid fa-gauge-high me-2 text-muted" />State Call Limits</h5>
                  <p className="text-muted small mb-0">Cap how many outbound contacts — calls and texts combined — a single number can receive within a rolling window.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 h-100">
                  <h5 className="fw-bold"><i className="fa-solid fa-calendar-xmark me-2 text-muted" />State Holidays</h5>
                  <p className="text-muted small mb-0">Block outbound calls to leads in specified states on the dates you designate.</p>
                </div>
              </div>
            </div>
            <p className="text-muted">
              Bundle business hours, call limits, and holidays into a named{" "}
              <strong>Rule Group</strong>
              , then apply it company-wide or scope it to specific offers. See the Knowledge Base for configuration details.
            </p>
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
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/consent_opt_out.html" className="btn btn-td-green">Consent & Opt-Out</a>
              {" "}
              <a href="/features/suppression_lists.html" className="btn btn-outline-td-green">Suppression & DNC</a>
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
