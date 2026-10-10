// /features/simul_dial.html
export const meta = {
  title: "Simultaneously Dial Buyers | Call Tracking and Analytics | Avortyx",
  description: "Buyer Groups let you dial multiple buyers or agents at the same time so the first one to answer wins the call. Groups can also be configured for sequential…",
  bodyClass: "avortyx_marketing features_simul_dial ",
  layout: "feature",
}

export default function SimulDial() {
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
          <h1 className="fw-bold mb-2">Simultaneously Dial Buyers</h1>
          <p className="lead mktg-subpage-hero-subtitle">Buyer Groups let you dial multiple buyers or agents at the same time so the first one to answer wins the call. Groups can also be configured for sequential dialing, shared caps, and unified pause/unpause control.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></div>
                  <div className="flow-node-label">Call Arrives</div>
                  <div className="flow-node-desc">Routed to a buyer group</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-users" aria-hidden="true" /></div>
                  <div className="flow-node-label">Ring All</div>
                  <div className="flow-node-desc">Every buyer in the group rings at once</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-hand-pointer" aria-hidden="true" /></div>
                  <div className="flow-node-label">First to Answer</div>
                  <div className="flow-node-desc">Answer and press 1 to win the call</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" aria-hidden="true" /></div>
                  <div className="flow-node-label">Connected</div>
                  <div className="flow-node-desc">Caller bridged to the winner</div>
                </div>
              </div>
            </div>
            <p>Connect callers to a live person as fast as possible. A buyer group rings multiple buyers or agents at the same time, and the first to answer and press 1 wins the call — or configure the group to dial sequentially instead.</p>
            <ul className="text-muted">
              <li><strong>Simultaneous or sequential</strong> — ring every buyer at once, or try them one by one.</li>
              <li>
                <strong>Tier & weight priority</strong>
                {" "}— groups participate in the routing engine alongside individual buyers, with their own tier (lower routes first) and weighted distribution within a tier.
              </li>
              <li>
                <strong>Shared caps</strong>
                {" "}— enforce attempt, connection, conversion, and revenue limits across all member buyers, plus hourly caps and concurrency at the group level.
              </li>
              <li>
                <strong>One-click pause</strong>
                {" "}— pausing a group bulk-pauses every buyer in it, so you can take an entire call center offline without editing individual records.
              </li>
              <li>
                <strong>Maxed-out tracking</strong>
                {" "}— when any group cap is reached, the group and all its buyers are removed from routing until caps reset or are adjusted.
              </li>
            </ul>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/buyer_management.html" className="btn btn-td-green">Buyer Management</a>
              {" "}
              <a href="/features/hold_queue.html" className="btn btn-outline-td-green">Hold Queue & Callback</a>
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
