// /features/ping_post.html
export const meta = {
  title: "Ping/Post & Real-Time Bidding (RTB) | Lead Distribution & Buyer Matching | Avortyx",
  description: "Real-time bidding (RTB) for inbound leads and calls. Publishers PING to find available buyers and collect live bids, then POST to get a tracking number and…",
  bodyClass: "avortyx_marketing features_ping_post ",
  layout: "feature",
}

export default function PingPost() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#ping-post" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Features </a>
          </div>
          <h1 className="fw-bold mb-2">Ping/Post</h1>
          <p className="lead mktg-subpage-hero-subtitle">Real-time bidding (RTB) for inbound leads and calls. Publishers PING to find available buyers and collect live bids, then POST to get a tracking number and connect the call.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How Ping/Post Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-secondary text-white"><i className="fa-solid fa-building" aria-hidden="true" /></div>
                  <div className="flow-node-label">Publisher</div>
                  <div className="flow-node-desc">Sends lead data</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-satellite-dish" aria-hidden="true" /></div>
                  <div className="flow-node-label">PING</div>
                  <div className="flow-node-desc">Check available buyers, get bids</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-filter" aria-hidden="true" /></div>
                  <div className="flow-node-label">Buyer Matching</div>
                  <div className="flow-node-desc">Hours, caps, geo, filters, duplicates</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-phone-flip" aria-hidden="true" /></div>
                  <div className="flow-node-label">POST</div>
                  <div className="flow-node-desc">Get tracking number for the call</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-circle-check" aria-hidden="true" /></div>
                  <div className="flow-node-label">Connected</div>
                  <div className="flow-node-desc">Caller routes to selected buyer</div>
                </div>
              </div>
            </div>
            <p>Every call sells for what the market will actually pay. More buyers competing means higher fill rates and more revenue per call — with DNC and suppression checks built into every ping.</p>
            <ul className="text-muted">
              <li>
                <strong>Route by price, priority, or performance</strong>
                {" "}— rank buyers by bid, by tier and weight, or by earnings-per-call (EPC).
              </li>
              <li>
                <strong>Static and live bidders in one auction</strong>
                {" "}— rank always-on buyers at a fixed price alongside webhook buyers that return a live bid on every ping.
              </li>
              <li>
                <strong>Buyer waterfall routing</strong>
                {" "}— cascade a call through tiers of buyers in bid and priority order until it connects.
              </li>
              <li>
                <strong>Per-buyer ping caps</strong>
                {" "}— cap how many pings each buyer receives per minute, per hour, or per day. Set only the intervals you want; a buyer at their cap is skipped instead of being flooded, so partners with limited capacity stop rejecting when your traffic spikes.
              </li>
              <li>
                <strong>Pre-call screening</strong>
                {" "}— each caller is checked against DNC, suppression, and litigator lists before any buyer is returned.
              </li>
            </ul>
            <h3>Real-Time Ping/Post Analytics</h3>
            <p>Every ping is measured — follow the funnel from ping to conversion, by buyer and traffic source, as leads flow in.</p>
            <p className="text-muted mb-1">
              <strong>One dashboard for the whole auction.</strong>
              {" "}Live KPIs, the ping-to-post funnel, and per-buyer economics in a single view.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/ping-post-dashboard-1.webp">
              <img alt="Real-Time Ping/Post dashboard: KPIs and the ping-to-post funnel" className="img-fluid rounded border mb-4" src="/assets/avx-shots/ping-post-dashboard-1.webp" width="1400" height="1032" srcSet="/assets/avx-shots/ping-post-dashboard-1-1000.webp 1000w, /assets/avx-shots/ping-post-dashboard-1.webp 1400w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Know your economics by source.</strong>
              {" "}Pings, accept rate, conversions, revenue, payout, and margin for every publisher and offer.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/ping-post-dashboard-3.webp">
              <img alt="Per-traffic-source performance: accept rate, conversions, revenue, payout, and margin" className="img-fluid rounded border mb-4" src="/assets/avx-shots/ping-post-dashboard-3.webp" width="1400" height="1029" srcSet="/assets/avx-shots/ping-post-dashboard-3-1000.webp 1000w, /assets/avx-shots/ping-post-dashboard-3.webp 1400w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Watch it happen live.</strong>
              {" "}A real-time log of every ping — the buyers it matched, the winning bid, and the accept/reject outcome.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/ping-post-dashboard-5.webp">
              <img alt="Real-Time ping log: each ping with its offer, source, matched buyers, winning bid, and status" className="img-fluid rounded border mb-4" src="/assets/avx-shots/ping-post-dashboard-5.webp" width="1400" height="1019" srcSet="/assets/avx-shots/ping-post-dashboard-5-1000.webp 1000w, /assets/avx-shots/ping-post-dashboard-5.webp 1400w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Usage & Cost Tracking</h3>
            <p>
              <strong>Know what you're spending.</strong>
              {" "}Avortyx tracks every inbound webhook request with daily usage and cost, broken down by offer and traffic source.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/ping-post-analytics-1.webp">
              <img alt="Ping/Post usage over time with a daily usage and cost breakdown" className="img-fluid rounded border mb-4" src="/assets/avx-shots/ping-post-analytics-1.webp" width="2000" height="419" srcSet="/assets/avx-shots/ping-post-analytics-1-1000.webp 1000w, /assets/avx-shots/ping-post-analytics-1.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/ping_post_integration.html" className="btn btn-td-green">Integration Guide</a>
              {" "}
              <a href="/features/buyer_management.html" className="btn btn-outline-td-green">Buyer Management</a>
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
