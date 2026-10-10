// /features/consent_opt_out.html
export const meta = {
  title: "Consent & Opt-Out - Verifiable Consent Records and Automatic Opt-Out Handling | Avortyx",
  description: "Capture a verifiable consent record for every lead and honor opt-outs automatically.",
  bodyClass: "avortyx_marketing features_consent_opt_out ",
  layout: "feature",
}

export default function ConsentOptOut() {
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
          <h1 className="fw-bold mb-2">Consent & Opt-Out</h1>
          <p className="lead mktg-subpage-hero-subtitle">Capture a verifiable consent record for every lead and honor opt-outs automatically.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
            {" "}
            <a href="/sign_up.html" className="btn btn-outline-td-green">Get Started Free</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Consent Capture</h3>
            <p>
              Tie a verifiable consent record to the lead. Avortyx captures{" "}
              <strong>Jornaya LeadiD</strong>
              {" "}consent certificates per call, and can gate delivery to buyers through{" "}
              <strong>Jornaya TCPA Guardian</strong>
              {" "}so leads that don't meet your configured TCPA requirements are not connected.
            </p>
            <h3>Opt-Out Handling</h3>
            <p>
              Inbound{" "}
              <strong>STOP / unsubscribe / cancel</strong>
              {" "}keywords are detected and honored automatically, opting the contact out and recording an immutable opt-out log. Opt-outs cascade to matching leads and can also be applied manually or by a schedule action.
            </p>
            <h3>Built-In Audit Trail</h3>
            <p>
              Avortyx keeps immutable logs of opt-outs, contact blocks, DNC checks, change history, and signed attestations — and{" "}
              <a href="/features/data_export.html">Data Exports</a>
              {" "}let you pull any of it into your own systems on a recurring schedule.
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
                <a target="_blank" href="/terms_of_service">Read the Terms of Service</a>
                {" "}(Sections 2.3.6, 2.3.6.1, and 2.6) for full details.
              </p>
            </div>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/state_rules.html" className="btn btn-td-green">State Rules</a>
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
            <a href="/p/contact" className="btn btn-cta-outline fw-semibold">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  )
}
