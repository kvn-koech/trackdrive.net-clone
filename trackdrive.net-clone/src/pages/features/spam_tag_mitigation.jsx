// /features/spam_tag_mitigation.html
export const meta = {
  title: "Spam Tag Mitigation - Branded Caller ID, Carrier Registration & Spam-Label Removal | Avortyx",
  description: "Branded caller ID, carrier registration, and spam-label removal — so more of your calls get answered.",
  bodyClass: "avortyx_marketing features_spam_tag_mitigation ",
  layout: "feature",
}

export default function SpamTagMitigation() {
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
          <h1 className="fw-bold mb-2">Spam Tag Mitigation</h1>
          <p className="lead mktg-subpage-hero-subtitle">Branded caller ID, carrier registration, and spam-label removal — so more of your calls get answered.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-building-circle-check" aria-hidden="true" /></div>
                  <div className="flow-node-label">Business Profile</div>
                  <div className="flow-node-desc">Complete a one-time verified profile</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-toggle-on" aria-hidden="true" /></div>
                  <div className="flow-node-label">Enable Mitigation</div>
                  <div className="flow-node-desc">Turn it on for the numbers you select</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-heart-pulse" aria-hidden="true" /></div>
                  <div className="flow-node-label">Monitor Number Health</div>
                  <div className="flow-node-desc">Track spam-label status across carriers over time</div>
                </div>
              </div>
            </div>
            <h3>Keep Every Call Connecting</h3>
            <p>
              Carriers now screen both inbound and outbound calls with spam filtering — the businesses that keep connecting are the registered ones. Avortyx registers your numbers with the carriers and the analytics providers behind the spam-labeling ecosystem, backed by your{" "}
              <a href="/features/verified_identity.html">verified business identity</a>
              {" "}— EIN and legal business name.
            </p>
            <h3>Branded Caller ID (Branded TFN)</h3>
            <p>Set a Branded Name on each toll-free or local number and recipients see who's really calling — the single biggest driver of answer rates.</p>
            <p className="text-muted mb-1">
              <strong>Your name, not a warning.</strong>
              {" "}Branded, verified caller ID instead of a "Scam Likely" label.
            </p>
            <img alt={"Branded, verified caller ID instead of a \"Scam Likely\" label"} className="img-fluid rounded border mb-4" src="/assets/avx-shots/mitigation-2.webp" width="1927" height="1481" srcSet="/assets/avx-shots/mitigation-2-1000.webp 1000w, /assets/avx-shots/mitigation-2.webp 1927w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <h3>Spam-Label Removal</h3>
            <p>"Spam Likely" tags quietly kill contact rates. Avortyx works to remove existing tags and keep your numbers clear over time.</p>
            <h3>Monitor Your Number Health</h3>
            <p>Your overall spam rate, which numbers are flagged, and how each major carrier (T-Mobile, AT&T, Verizon) labels your lines — so you can spot and fix problems early.</p>
            <p className="text-muted mb-1">
              <strong>Spot problems early.</strong>
              {" "}The number-health dashboard with per-carrier spam flags.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/mitigation-1.webp">
              <img alt="Spam Tag Mitigation number-health dashboard with per-carrier spam flags" className="img-fluid rounded border mb-4" src="/assets/avx-shots/mitigation-1.webp" width="2000" height="954" srcSet="/assets/avx-shots/mitigation-1-1000.webp 1000w, /assets/avx-shots/mitigation-1.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Simple, Two-Part Pricing</h3>
            <p>
              Two parts, both on your{" "}
              <a href="/pricing.html">rate sheet</a>
              : a{" "}
              <strong>monthly fee per enabled number</strong>
              , and a small{" "}
              <strong>per-branded-call fee</strong>
              {" "}when a Branded Name is set. No branding, no per-call charge.
            </p>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/verified_identity.html" className="btn btn-td-green">Verified Identity & Caller ID</a>
              {" "}
              <a href="/features/inbound_call_routing.html" className="btn btn-outline-td-green">Inbound Call Routing</a>
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
