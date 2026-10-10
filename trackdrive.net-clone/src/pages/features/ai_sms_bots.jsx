// /features/ai_sms_bots.html
export const meta = {
  title: "AI SMS Bots | Avortyx",
  description: "AI-powered SMS bots that engage leads, answer questions, and schedule calls automatically.",
  bodyClass: "avortyx_marketing features_ai_sms_bots ",
  layout: "feature",
}

export default function AiSmsBots() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#ai" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" /> Back to AI </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">AI</p>
          <h1 className="fw-bold mb-2">AI SMS Bots</h1>
          <p className="lead mktg-subpage-hero-subtitle">AI-powered SMS bots that engage leads, answer questions, and schedule calls automatically.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-comment-sms" /></div>
                  <div className="flow-node-label">Incoming SMS</div>
                  <div className="flow-node-desc">A lead texts your number</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-robot" /></div>
                  <div className="flow-node-label">AI Reads It</div>
                  <div className="flow-node-desc">Matches a keyword, menu choice, or filter</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-bolt" /></div>
                  <div className="flow-node-label">Auto-Reply or Act</div>
                  <div className="flow-node-desc">Reply, collect a field, or fire a webhook</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-volume" /></div>
                  <div className="flow-node-label">Qualify & Call</div>
                  <div className="flow-node-desc">Place an outbound call once qualified</div>
                </div>
              </div>
            </div>
            <p>Automatically engage leads over SMS — answer common questions, run conversational form fills, trigger actions on incoming texts, and place an outbound call once a lead is qualified.</p>
            <ul className="text-muted">
              <li><strong>Auto-responders</strong> — reply to keywords like HELP, START, or STOP automatically.</li>
              <li>
                <strong>SMS form fills & Call Me Now</strong>
                {" "}— ask questions over text, save answers as contact fields, then dial the lead once pre-qualified.
              </li>
              <li>
                <strong>Actions on incoming SMS</strong>
                {" "}— opt out or block, call back, send an email, schedule a callback, or fire a custom webhook when a message matches.
              </li>
              <li>
                <strong>Multi-level SMS menus</strong>
                {" "}— guide customers through branching choices, each able to reply, collect a field, or open a sub-menu.
              </li>
              <li>
                <strong>Custom webhooks</strong>
                {" "}— forward the sender's number, message, and lead data to an external system in real time.
              </li>
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
