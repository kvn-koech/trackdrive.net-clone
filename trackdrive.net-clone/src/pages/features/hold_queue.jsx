// /features/hold_queue.html
export const meta = {
  title: "Hold Queue & Callback | Call Tracking and Analytics | Avortyx",
  description: "When every buyer is busy, callers hold with music and connect automatically as capacity frees up.",
  bodyClass: "avortyx_marketing features_hold_queue ",
  layout: "feature",
}

export default function HoldQueue() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#call-management" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Call Management{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Call Management</p>
          <h1 className="fw-bold mb-2">Hold Queue & Callback</h1>
          <p className="lead mktg-subpage-hero-subtitle">When every buyer is busy, callers hold with music and connect automatically as capacity frees up.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-phone-volume" /></div>
                  <div className="flow-node-label">All Buyers Busy</div>
                  <div className="flow-node-desc">No buyer is immediately available</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-music" /></div>
                  <div className="flow-node-label">On Hold</div>
                  <div className="flow-node-desc">Caller parked with hold music</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-rotate" /></div>
                  <div className="flow-node-label">Re-Check Capacity</div>
                  <div className="flow-node-desc">System polls for an open buyer</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" /></div>
                  <div className="flow-node-label">Connected</div>
                  <div className="flow-node-desc">First open buyer takes the call</div>
                </div>
              </div>
            </div>
            <p>Keep leads warm instead of dropping them. When every agent is busy, callers wait on hold with music and connect automatically the moment a buyer or agent opens up — and if the queue is full, you can schedule an automatic callback for later.</p>
            <ul className="text-muted">
              <li><strong>Per-offer configuration</strong> — set queue capacity, max hold time, and hold music for each offer.</li>
              <li>
                <strong>Auto-created handlers</strong>
                {" "}— every offer gets fallback actions for "caller placed in queue", "queue is full", and "max hold time exceeded", each fully customizable.
              </li>
              <li>
                <strong>Flexible callbacks</strong>
                {" "}— when the queue overflows or a caller hangs up, schedule a callback that starts a fresh call, reconnects the previous buyer, or routes to a new one.
              </li>
              <li>
                <strong>Recurring call rules</strong>
                {" "}— prevent duplicate or repeat callbacks within a configurable window, with optional handling for anonymous caller IDs.
              </li>
            </ul>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/buyer_management.html" className="btn btn-td-green">Buyer Management</a>
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
