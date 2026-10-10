// /features/sip_support.html
export const meta = {
  title: "SIP Support | Call Tracking and Analytics | Avortyx",
  description: "Connect via SIP credentials and headers. Integrate with your preferred VoIP platforms.",
  bodyClass: "avortyx_marketing features_sip_support ",
  layout: "feature",
}

export default function SipSupport() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#phone-numbers" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Phone Numbers{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Phone Numbers</p>
          <h1 className="fw-bold mb-2">SIP Support</h1>
          <p className="lead mktg-subpage-hero-subtitle">Connect via SIP credentials and headers. Integrate with your preferred VoIP platforms.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>Avortyx supports native SIP (Session Initiation Protocol) integration, so you can securely connect your own VoIP infrastructure using custom credentials and headers.</p>
            <ul className="text-muted">
              <li>
                <strong>Secure credentials</strong>
                {" "}— register with a SIP username (a valid SIP address like{" "}
                <code>user@domain.com</code>
                ) and password.
              </li>
              <li>
                <strong>Custom SIP headers</strong>
                {" "}— add any number of headers to enable feature toggles or meet provider-specific requirements.
              </li>
              <li><strong>Bring your own platform</strong> — route calls SIP-to-SIP to your preferred VoIP provider.</li>
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
