// /features/pii_redaction.html
export const meta = {
  title: "PII Redaction - Auto-Redact Aged Data, PII Access Control & Transcripts | Avortyx",
  description: "Automatically clear or hash PII from aged data, restrict who can see sensitive fields, and redact transcriptions.",
  bodyClass: "avortyx_marketing features_pii_redaction ",
  layout: "feature",
}

export default function PiiRedaction() {
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
          <h1 className="fw-bold mb-2">PII Redaction</h1>
          <p className="lead mktg-subpage-hero-subtitle">Automatically clear or hash PII from aged data, restrict who can see sensitive fields, and redact transcriptions.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How Auto-Redaction Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-clock" /></div>
                  <div className="flow-node-label">Data Ages</div>
                  <div className="flow-node-desc">Calls and archived leads pass your retention period</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-eraser" /></div>
                  <div className="flow-node-label">PII Redacted</div>
                  <div className="flow-node-desc">The fields you select are cleared or hashed</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-chart-line" /></div>
                  <div className="flow-node-label">Reporting Intact</div>
                  <div className="flow-node-desc">Timestamps, offer IDs, and phone numbers are not affected</div>
                </div>
              </div>
            </div>
            <h3>PII Auto-Redaction</h3>
            <p>Automatically remove personal information — names, emails, addresses — from aged data. When enabled, calls and archived leads older than your retention period have their PII fields cleared or hashed, while non-PII fields such as timestamps, offer IDs, and phone numbers are not affected, so your reporting keeps working.</p>
            <ul className="text-muted">
              <li>
                <strong>Your retention window</strong>
                {" "}— set how long records keep their PII, from 30 days to 7 years (90 days by default).
              </li>
              <li>
                <strong>Two redaction methods</strong>
                {" "}—{" "}
                <strong>Nullify</strong>
                {" "}replaces values with placeholders;{" "}
                <strong>Hash</strong>
                {" "}produces a one-way fingerprint (e.g. "John Smith" becomes "r1b2c3d4...") that still lets you correlate records.
              </li>
              <li>
                <strong>Field-level control</strong>
                {" "}— choose exactly which contact fields are redacted: names, emails, addresses, dates of birth, IP addresses, visitor cookies, and more.
              </li>
            </ul>
            <h3>PII Access Control</h3>
            <p>Restrict access to personally identifiable information such as phone numbers. When enabled, sensitive fields are automatically redacted in the interface for users without the PII permission — granting access reveals the full values.</p>
            <h3>Transcription Redaction</h3>
            <p>
              Sensitive data is removed from{" "}
              <a href="/features/transcriptions.html">call transcriptions</a>
              {" "}before they are stored, with each PII category individually enabled to match your program — configured per offer alongside the other AI features.
            </p>
            <h3>Protected Throughout</h3>
            <ul className="text-muted">
              <li><strong>Encryption at rest</strong> — sensitive legal-identity fields are encrypted at rest.</li>
              <li>
                <strong>Recording retention</strong>
                {" "}—{" "}
                <a href="/features/call_recordings.html">call-recording retention rules</a>
                {" "}automatically scrub older recordings.
              </li>
              <li>
                <strong>Consent & opt-out</strong>
                {" "}— pair redaction with{" "}
                <a href="/features/consent_opt_out.html">consent capture and opt-out tools</a>
                {" "}and{" "}
                <a href="/features/suppression_lists.html">suppression & DNC lists</a>
                {" "}for the full compliance picture.
              </li>
              <li>
                <strong>Controlled exports</strong>
                {" "}—{" "}
                <a href="/features/data_export.html">data exports</a>
                {" "}respect the same PII permissions, so redacted stays redacted.
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
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/suppression_lists.html" className="btn btn-td-green">Suppression & DNC</a>
              {" "}
              <a href="/features/call_tracking.html" className="btn btn-outline-td-green">Call Tracking</a>
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
