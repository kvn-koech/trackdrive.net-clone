// /features/suppression_lists.html
export const meta = {
  title: "Suppression & DNC | TCPA Shield & Blacklist Alliance | Avortyx",
  description: "DNC checks, suppression lists, and blacklists — layered do-not-contact controls that run before any call routes or dials.",
  bodyClass: "avortyx_marketing features_suppression_lists ",
  layout: "feature",
}

export default function SuppressionLists() {
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
          <h1 className="fw-bold mb-2">Suppression & DNC</h1>
          <p className="lead mktg-subpage-hero-subtitle">DNC checks, suppression lists, and blacklists — layered do-not-contact controls that run before any call routes or dials.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>Layered do-not-contact checks run before any call is forwarded or dialed: per-buyer, per-offer, and per-schedule suppression lists, a company-wide blacklist, DNC list checking, and real-time scrubbing from industry services.</p>
            <p>
              Every outbound call is checked against do-not-call and known-blacklist data before it dials, and these checks{" "}
              <strong>fail closed</strong>
              {" "}— if a lookup can't be completed, the number is treated as blocked.
            </p>
            <ul className="text-muted">
              <li>
                <strong>Suppression lists</strong>
                {" "}— attach a list of numbers (uploaded via CSV or API) to a buyer, offer, or schedule; matched numbers are skipped before routing or dialing.
              </li>
              <li>
                <strong>Blacklists</strong>
                {" "}— block a caller company-wide, regardless of which buyer or offer the call would route to.
              </li>
              <li>
                <strong>DNC list checking</strong>
                {" "}— check caller numbers against Do-Not-Call data before routing or placing outbound dials.
              </li>
              <li>
                <strong>TCPA Shield & Blacklist Alliance</strong>
                {" "}— real-time checks against shared industry lists of flagged leads are skipped automatically.
              </li>
              <li>
                <strong>Skip mobile numbers & Florida limits</strong>
                {" "}— optionally exclude mobile numbers, or apply Florida's stricter daily attempt caps and shortened calling window on a schedule.
              </li>
            </ul>
            <h3>Frequency Caps & Pacing</h3>
            <p>Account-level limits keep contact volume reasonable: per-contact daily and monthly outbound call caps, plus short-call caps by day, week, and month. Calls that would exceed your limits are automatically suppressed.</p>
            <p className="text-muted">Suppression lists and blacklists serve different jobs: a blacklist blocks a number everywhere in your account, while a suppression list excludes it only from the buyers, offers, or schedules you attach it to. See the Knowledge Base for setup, imports, and the full comparison.</p>
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
              <a href="/features/pii_redaction.html" className="btn btn-td-green">PII Redaction</a>
              {" "}
              <a href="/features/state_rules.html" className="btn btn-outline-td-green">State Rules</a>
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
