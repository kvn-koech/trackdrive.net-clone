// /features/linktrust.html
export const meta = {
  title: "Custom Webhooks | Call Tracking and Analytics | Avortyx",
  description: "Connect Avortyx to LinkTrust and attribute phone-call conversions to the right affiliate and campaign.",
  bodyClass: "avortyx_marketing features_custom_webhook ",
  layout: "feature",
}

export default function Linktrust() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#tracking-attribution" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Tracking & Attribution{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Tracking & Attribution</p>
          <h1 className="fw-bold mb-2">Custom Webhooks</h1>
          <p className="lead mktg-subpage-hero-subtitle">Send real-time call and lead data to any endpoint the moment events happen.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-bolt" /></div>
                  <div className="flow-node-label">Event Fires</div>
                  <div className="flow-node-desc">A call converts, a lead arrives, etc.</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-paper-plane" /></div>
                  <div className="flow-node-label">Request Sent</div>
                  <div className="flow-node-desc">HTTP POST to your URL in real time</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-server" /></div>
                  <div className="flow-node-label">Your System</div>
                  <div className="flow-node-desc">Receives the data immediately</div>
                </div>
              </div>
            </div>
            <p>A webhook is a way for an app to send other applications real-time information — you get the data the moment it happens. An outgoing webhook sends an HTTP POST request to a URL you specify.</p>
            <ul className="text-muted">
              <li>When a buyer is converted on Avortyx, send a real-time notification to your Slack channel with call data.</li>
              <li>When a buyer is converted on Avortyx, send a real-time notification to your CRM with call data.</li>
            </ul>
            <h3>30+ Webhook Trigger Types</h3>
            <p>Avortyx supports over 30 webhook triggers organized by category — spanning the call lifecycle, conversions, data changes, recordings, conference events, leads, and agent status — giving you fine-grained control over when data is sent to your systems.</p>
            <h3>Pre-Action Triggers: Accept or Reject</h3>
            <p>
              Pre-action triggers are a powerful differentiator — they fire{" "}
              <strong>before</strong>
              {" "}an action occurs and can{" "}
              <strong>accept or reject</strong>
              {" "}it based on the webhook response. For example, a{" "}
              <code>buyer_before_dial</code>
              {" "}trigger can call your external system to verify the caller before the buyer is dialed. If the webhook returns a rejection response, the dial is cancelled and the next buyer is tried.
            </p>
            <ul>
              <li>Validate leads against external systems before placing calls</li>
              <li>Check real-time inventory or availability before connecting</li>
              <li>Enforce custom business rules that live outside Avortyx</li>
            </ul>
            <h3>Response Parsing</h3>
            <p>Extract a value from a webhook response and store it as a token on the call or lead. Parsing works over JSON or XML, and the extracted value can be reused for routing decisions, reports, or subsequent webhooks.</p>
            <h3>Webhook Subscriptions (Simplified Webhooks)</h3>
            <p>
              For simpler integrations, Avortyx also provides{" "}
              <strong>Webhook Subscriptions</strong>
              {" "}— a lightweight, Zapier-style event system. Subscribe to any of 11 event types and receive a JSON POST to your endpoint with no complex configuration. Subscriptions can be filtered by offer, schedule, traffic source, buyer, telephone number, and conversion status — just provide a URL and select your events.
            </p>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/dynamic_number_insertion.html" className="btn btn-td-green">Dynamic Number Insertion</a>
              {" "}
              <a href="/features/formulas.html" className="btn btn-outline-td-green">Expressions & Functions</a>
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
