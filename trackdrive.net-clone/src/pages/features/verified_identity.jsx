// /features/verified_identity.html
export const meta = {
  title: "Verified Identity & Caller ID - Register Your Business with the Carriers | Avortyx",
  description: "Carriers screen every call. Registering your verified business identity — EIN and legal business name — is what keeps your numbers connecting.",
  bodyClass: "avortyx_marketing features_verified_identity ",
  layout: "feature",
}

export default function VerifiedIdentity() {
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
          <h1 className="fw-bold mb-2">Verified Identity & Caller ID</h1>
          <p className="lead mktg-subpage-hero-subtitle">Carriers screen every call. Registering your verified business identity — EIN and legal business name — is what keeps your numbers connecting.</p>
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
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How It Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-user-check" /></div>
                  <div className="flow-node-label">Verify Identity (KYC)</div>
                  <div className="flow-node-desc">Complete Stripe Identity verification</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-building-circle-check" /></div>
                  <div className="flow-node-label">KYB Business Profile</div>
                  <div className="flow-node-desc">One-time legal identity and signed attestations</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-tower-cell" /></div>
                  <div className="flow-node-label">Registered with Carriers</div>
                  <div className="flow-node-desc">Your numbers registered and branded, calls connecting</div>
                </div>
              </div>
            </div>
            <h3>Keep Every Call Connecting</h3>
            <p>
              Carriers now screen{" "}
              <strong>both inbound and outbound</strong>
              {" "}calls with spam filtering — the businesses that keep connecting are the registered ones. Verified identity is what makes that registration possible: it's how{" "}
              <a href="/features/spam_tag_mitigation.html">Spam Tag Mitigation</a>
              {" "}registers and brands your numbers with the carriers.
            </p>
            <p className="text-muted mb-1">
              <strong>The payoff.</strong>
              {" "}Your business name on the caller ID instead of a "Scam Likely" warning.
            </p>
            <img alt={"Branded, verified caller ID instead of a \"Scam Likely\" label"} className="img-fluid rounded border mb-4" src="/assets/avx-shots/mitigation-2.webp" width="1927" height="1481" srcSet="/assets/avx-shots/mitigation-2-1000.webp 1000w, /assets/avx-shots/mitigation-2.webp 1927w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <h3>KYC Identity Verification</h3>
            <p>
              Every customer completes{" "}
              <strong>Stripe Identity (KYC)</strong>
              {" "}verification to use Avortyx — a platform of verified businesses means carriers can trust its traffic.
            </p>
            <h3>KYB Business Compliance Profile</h3>
            <p>
              To enable outbound schedule calls, SMS, or email, every customer completes a one-time{" "}
              <strong>KYB Business Compliance Profile</strong>
              {" "}— encrypted legal identity (EIN, legal name, address) plus a signed set of calling-practice attestations covering DNC scrubbing, honoring unsubscribes, calling within legal hours, and accurate caller ID. Signatures are immutable; changing certified data forces re-certification.
            </p>
            <p className="text-muted mb-1">
              <strong>Signed once, protected always.</strong>
              {" "}The completed profile with attestations — sensitive fields stay encrypted and redacted from view.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-verified-identity-kyb-profile.webp">
              <img alt="Completed KYB Business Compliance Profile with signed calling-practice attestations and redacted sensitive fields" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-verified-identity-kyb-profile.webp" width="1600" height="1120" srcSet="/assets/avx-shots/features-verified-identity-kyb-profile-1000.webp 1000w, /assets/avx-shots/features-verified-identity-kyb-profile.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Verified Caller ID (STIR/SHAKEN)</h3>
            <p>
              Every outbound call placed through Avortyx is signed with{" "}
              <strong>STIR/SHAKEN</strong>
              {" "}by our carrier partners — the highest level of caller-ID authentication. It tells the receiving carrier that the caller has been verified and is authorized to use the number, so fewer of your calls are flagged as spoofed and more land as a trusted, verified call.
            </p>
            <p>
              On top of that,{" "}
              <strong>A2P 10DLC</strong>
              {" "}registration keeps your SMS traffic compliant with carrier messaging requirements.
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
              <a href="/features/spam_tag_mitigation.html" className="btn btn-td-green">Spam Tag Mitigation</a>
              {" "}
              <a href="/features/consent_opt_out.html" className="btn btn-outline-td-green">Consent & Opt-Out</a>
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
