// /features/telnyx.html
export const meta = {
  title: "Multiple Telephone Providers | Call Tracking and Analytics | Avortyx",
  description: "Bring your Telnyx numbers to Avortyx and route every call with the same buyers, caps and tiers.",
  bodyClass: "avortyx_marketing features_multiple_telephone_providers ",
  layout: "feature",
}

export default function Telnyx() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#phone-numbers" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Phone Numbers{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Phone Numbers</p>
          <h1 className="fw-bold mb-2">Multiple Telephone Providers</h1>
          <p className="lead mktg-subpage-hero-subtitle">Connect with multiple VoIP providers for maximum flexibility and redundancy.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-link" aria-hidden="true" /></div>
                  <div className="flow-node-label">Link Account</div>
                  <div className="flow-node-desc">Connect Plivo, Twilio, or Telnyx</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-file-import" aria-hidden="true" /></div>
                  <div className="flow-node-label">Import Numbers</div>
                  <div className="flow-node-desc">Bring existing numbers in one click</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-cart-shopping" aria-hidden="true" /></div>
                  <div className="flow-node-label">Purchase Numbers</div>
                  <div className="flow-node-desc">Provision new numbers from any provider</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></div>
                  <div className="flow-node-label">Calls & Texts</div>
                  <div className="flow-node-desc">Make and receive on every number</div>
                </div>
              </div>
            </div>
            <p>With Avortyx, you can now connect your existing service provider with Twilio, Plivo, Telnyx, or using SIP (Session Initiation Protocol). By doing this, your on-premise telecom assets will have dynamic and powerful intelligence and benefit form all communications capabilities that Twilio, Plivo, and Telnyx offer in the cloud.</p>
            <p>While most call tracking softwares insist on supplying VOIP device, with Avortyx, you have the freedom to bring in your own VOIP provider using SIP-IN. Here are some of the providers we are currently integrated with:</p>
            <p className="text-muted mb-1">
              <strong>Providers we integrate with.</strong>
              {" "}Connect your existing accounts or route in your own carrier over SIP-IN.
            </p>
            <div className="d-flex flex-wrap gap-4 align-items-center my-3">
              <img alt="Plivo" className="voip-provider-logo" src="/assets/avx-site/img/plivo.png" />
              {" "}
              <img alt="Telnyx" className="voip-provider-logo" src="/assets/avx-site/img/telnyx.png" />
              {" "}
              <img alt="Twilio" className="voip-provider-logo" src="/assets/avx-site/img/twilio.png" />
              {" "}
              <img alt="Zadarma" className="voip-provider-logo" src="/assets/avx-site/img/zadarma.png" />
              {" "}
              <img alt="Sonetel" className="voip-provider-logo" src="/assets/avx-site/img/sonetel.png" />
              {" "}
              <img alt="Onsip" className="voip-provider-logo" src="/assets/avx-site/img/onsip.png" />
              {" "}
              <img alt="Avoxi" className="voip-provider-logo" src="/assets/avx-site/img/avoxi.png" />
            </div>
            <h2 className="mt-5 mb-4">More on Plivo, Twilio, & Telnyx</h2>
            <p>Avortyx's Plivo, Twilio, and Telnyx integrations are the most impressive and commonly used tools on Avortyx. With any of them you can:</p>
            <ul className="text-muted">
              <li>
                <strong>Link your existing accounts</strong>
                {" "}— connect by entering your API credentials; Avortyx securely stores your keys and manages numbers, calls, and SMS through a single interface.
              </li>
              <li>
                <strong>Import your existing numbers</strong>
                {" "}— bring numbers in with one click, immediately available for assignment to offers, traffic sources, and number pools.
              </li>
              <li>
                <strong>Purchase new numbers</strong>
                {" "}— search and provision from any connected provider, filtering by country, area code, and number type (local or toll-free).
              </li>
              <li>
                <strong>Send and receive SMS</strong>
                {" "}— outbound messages, inbound texts, and automated SMS flows, with unified delivery tracking across all connected providers.
              </li>
            </ul>
            <h3>Unified Number Management</h3>
            <p>Avortyx provides a single interface for managing phone numbers (DIDs) across all connected providers — purchase, assign, and release through one lifecycle, and attach numbers at the offer, traffic-source, or number-pool level.</p>
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
