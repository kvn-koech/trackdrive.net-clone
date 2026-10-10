// /features/buyer_management.html
export const meta = {
  title: "Buyer Management | Advanced Routing Engine | Avortyx",
  description: "Buyers are the destinations in your call flow — the call centers, agents, or SIP endpoints that receive live calls. Avortyx gives you full control over which…",
  bodyClass: "avortyx_marketing features_buyer_management ",
  layout: "feature",
}

export default function BuyerManagement() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#call-management" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Call Management{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Call Management</p>
          <h1 className="fw-bold mb-2">Buyer Management</h1>
          <p className="lead mktg-subpage-hero-subtitle">Buyers are the destinations in your call flow — the call centers, agents, or SIP endpoints that receive live calls. Avortyx gives you full control over which buyer gets each call, when they can receive calls, and how much volume they handle.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">Buyer Routing Pipeline</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></div>
                  <div className="flow-node-label">Incoming Call</div>
                  <div className="flow-node-desc">All buyers on the call router</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-filter" aria-hidden="true" /></div>
                  <div className="flow-node-label">Filter</div>
                  <div className="flow-node-desc">Tokens, hours, caps, suppression</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-layer-group" aria-hidden="true" /></div>
                  <div className="flow-node-label">Prioritize</div>
                  <div className="flow-node-desc">Tier, weight, revenue, or EPC</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" aria-hidden="true" /></div>
                  <div className="flow-node-label">Connect</div>
                  <div className="flow-node-desc">Best buyer receives the call</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-dollar-sign" aria-hidden="true" /></div>
                  <div className="flow-node-label">Convert</div>
                  <div className="flow-node-desc">Duration threshold triggers revenue</div>
                </div>
              </div>
            </div>
            <p>Decide which buyer gets each call, when they can receive it, and how much volume they handle. When a call arrives, Avortyx evaluates every buyer on the call router, filters by token matching, business hours, capacity caps, and suppression lists — then sorts using one of three algorithms.</p>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card p-4 h-100 border-success border-opacity-50">
                  <h5 className="fw-bold text-success"><i className="fa-solid fa-layer-group me-2" aria-hidden="true" />Tier Routing</h5>
                  <p className="text-muted small mb-0">Manual priority ordering. Lower tier values receive calls first. Buyers within the same tier are distributed by weight.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 border-primary border-opacity-50">
                  <h5 className="fw-bold text-primary"><i className="fa-solid fa-dollar-sign me-2" aria-hidden="true" />Revenue Routing</h5>
                  <p className="text-muted small mb-0">Highest-bid-wins. Buyers offering the most per-call revenue are prioritized automatically.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 h-100 border-warning border-opacity-50">
                  <h5 className="fw-bold text-warning"><i className="fa-solid fa-chart-line me-2" aria-hidden="true" />EPC Routing</h5>
                  <p className="text-muted small mb-0">Earnings-per-call routing. Buyers with the highest historical EPC are prioritized for maximum return.</p>
                </div>
              </div>
            </div>
            <h3>Control Every Buyer</h3>
            <ul className="text-muted">
              <li>
                <strong>Caller filtering</strong>
                {" "}— token-based filters route only the calls whose attributes match, targeting by geography, vertical, lead quality, or any custom token.
              </li>
              <li>
                <strong>Capacity caps</strong>
                {" "}— cap attempts, connections, conversions, and revenue across daily, monthly, and total intervals, plus hourly and concurrency limits.
              </li>
              <li>
                <strong>Business hours & day-parting</strong>
                {" "}— set when each buyer accepts calls on a 7-day by 24-hour grid, with pacing options per time slot.
              </li>
              <li>
                <strong>Conversion tracking</strong>
                {" "}— mark calls converted by duration, Ping/Post, or API Postback, with per-conversion CPL or CPA payouts. If a Press-1-to-accept is configured, the buyer pressing 1 starts the duration timer.
              </li>
              <li>
                <strong>Whisper messages</strong>
                {" "}— play a brief message to the buyer before connecting, announcing campaign or caller details.
              </li>
              <li>
                <strong>Buyer groups</strong>
                {" "}— dial buyers simultaneously or sequentially under shared caps;{" "}
                <a href="/features/simul_dial.html">learn more</a>
                .
              </li>
            </ul>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/inbound_call_routing.html" className="btn btn-td-green">Inbound Call Routing</a>
              {" "}
              <a href="/features/simul_dial.html" className="btn btn-outline-td-green">Simultaneously Dial Buyers</a>
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
