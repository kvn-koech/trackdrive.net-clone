// /features/ping_post_integration.html
export const meta = {
  title: "Ping/Post & Real-Time Bidding (RTB) Integration Guide | API | Avortyx",
  description: "Integrate with Avortyx's Ping/Post API — real-time bidding (RTB) for inbound leads and calls — to programmatically find available buyers and retrieve…",
  bodyClass: "avortyx_marketing features_ping_post_integration ",
  layout: "feature",
}

export default function PingPostIntegration() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#ping-post" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Ping/Post{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Ping/Post</p>
          <h1 className="fw-bold mb-2">Ping/Post Integration Guide</h1>
          <p className="lead mktg-subpage-hero-subtitle">Integrate with Avortyx's Ping/Post API — real-time bidding (RTB) for inbound leads and calls — to programmatically find available buyers and retrieve tracking numbers.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Endpoint URLs</h3>
            <p>Each Ping/Post endpoint is identified by a unique <strong>Vanity URI</strong> that you configure in the dashboard.</p>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Method</th>
                    <th>Type</th>
                    <th>URL Pattern</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>GET / POST</code></td>
                    <td>PING</td>
                    <td><code>https://avortyx.com/api/v1/inbound_webhooks/ping/<em>{"{vanity_uri}"}</em></code></td>
                  </tr>
                  <tr>
                    <td><code>GET / POST</code></td>
                    <td>POST</td>
                    <td><code>https://avortyx.com/api/v1/inbound_webhooks/post/<em>{"{vanity_uri}"}</em></code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>Step 1: Send a PING</h3>
            <p>Submit lead data to the PING endpoint to retrieve a list of available buyers. Parameters can be sent as JSON in the request body or as query string parameters.</p>
            <h5>PING Request Example</h5>
            <pre className="bg-dark text-light p-3 rounded"><code>{"curl -X POST \\\n  \"https://avortyx.com/api/v1/inbound_webhooks/ping/my_endpoint\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"caller_id\": \"18005551234\",\n    \"traffic_source_id\": \"source_abc\"\n  }'"}</code></pre>
            <h5>PING Response Example</h5>
            <p>
              The response includes a list of available buyers with their bids, plus a{" "}
              <code>try_all_buyers_ping_id</code>
              {" "}for trying all matched buyers in priority order:
            </p>
            <pre className="bg-dark text-light p-3 rounded"><code>{"{\n  \"success\": true,\n  \"status\": \"accepted\",\n  \"try_all_buyers_ping_id\": \"xyz789\",\n  \"buyers\": [\n    {\n      \"ping_id\": \"abc123\",\n      \"id\": 1,\n      \"name\": \"Buyer A\",\n      \"bid_price\": 25.00\n    },\n    {\n      \"ping_id\": \"def456\",\n      \"id\": 2,\n      \"name\": \"Buyer B\",\n      \"bid_price\": 20.00\n    }\n  ]\n}"}</code></pre>
            <p className="text-muted small mt-2">
              The fields returned for each buyer are configurable per endpoint. Common fields include{" "}
              <code>id</code>
              ,{" "}
              <code>name</code>
              ,{" "}
              <code>bid_price</code>
              ,{" "}
              <code>tier</code>
              , and{" "}
              <code>forwarding_number</code>
              .
            </p>
            <h3>Step 2: Send a POST</h3>
            <p>After receiving the PING response, send a POST request with one of two options:</p>
            <ul>
              <li>
                <strong>Pick a specific buyer</strong>
                {" "}— send that buyer's{" "}
                <code>ping_id</code>
                {" "}and{" "}
                <code>buyer_id</code>
                {" "}to select one buyer
              </li>
              <li>
                <strong>Try all buyers</strong>
                {" "}— send the{" "}
                <code>try_all_buyers_ping_id</code>
                {" "}as the{" "}
                <code>ping_id</code>
                {" "}to let Avortyx try all matched buyers in priority order
              </li>
            </ul>
            <h5>POST Request Example (specific buyer)</h5>
            <pre className="bg-dark text-light p-3 rounded"><code>{"curl -X POST \\\n  \"https://avortyx.com/api/v1/inbound_webhooks/post/my_endpoint\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"ping_id\": \"abc123\",\n    \"caller_id\": \"18005551234\",\n    \"buyer_id\": 1\n  }'"}</code></pre>
            <h5>POST Request Example (try all buyers)</h5>
            <pre className="bg-dark text-light p-3 rounded"><code>{"curl -X POST \\\n  \"https://avortyx.com/api/v1/inbound_webhooks/post/my_endpoint\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"ping_id\": \"xyz789\",\n    \"caller_id\": \"18005551234\"\n  }'"}</code></pre>
            <h5>POST Response Example</h5>
            <pre className="bg-dark text-light p-3 rounded"><code>{"{\n  \"success\": true,\n  \"status\": \"accepted\",\n  \"forwarding_number\": \"18009876543\",\n  \"forwarding_number_status\": \"accepted\"\n}"}</code></pre>
            <p className="text-muted small mt-2">
              Route the inbound call to the returned{" "}
              <code>forwarding_number</code>
              . Endpoints using SIP can also return a{" "}
              <code>forwarding_number_sip_address</code>
              .
            </p>
            <h3>Post-Only Mode</h3>
            <p>If you don't need the two-step PING/POST flow, you can skip the PING and submit leads directly via POST. Avortyx will find available buyers and return a tracking number in one step.</p>
            <pre className="bg-dark text-light p-3 rounded"><code>{"curl -X POST \\\n  \"https://avortyx.com/api/v1/inbound_webhooks/post/my_endpoint\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"caller_id\": \"18005551234\"\n  }'"}</code></pre>
            <h3>Contact Fields</h3>
            <p>Each Ping/Post endpoint is associated with an Offer that defines its contact fields. These fields control what data publishers must submit with each request. Common fields include:</p>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Field</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>caller_id</code></td>
                    <td>Varies</td>
                    <td>The lead's telephone number</td>
                  </tr>
                  <tr>
                    <td><code>traffic_source_id</code></td>
                    <td>Varies</td>
                    <td>Identifies the publisher or traffic source</td>
                  </tr>
                  <tr>
                    <td><code>ping_id</code></td>
                    <td>On POST</td>
                    <td>The ping ID returned from the PING step</td>
                  </tr>
                  <tr>
                    <td><code>avortyx_number</code></td>
                    <td>Varies</td>
                    <td>Required when using caller number forwarding mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Additional custom contact fields (state, zip code, vertical, etc.) are configured per-offer in the dashboard. View the full field list for any endpoint on its{" "}
              <strong>Posting Instructions</strong>
              {" "}page.
            </p>
            <h3>Tracking Modes</h3>
            <p>Avortyx supports two tracking modes for Ping/Post endpoints:</p>
            <ul>
              <li>
                <strong>Unique Phone Numbers (Ring Pool)</strong>
                {" "}— a unique tracking number is returned on each POST to route the call
              </li>
              <li>
                <strong>Caller Number (Static)</strong>
                {" "}— the publisher specifies a{" "}
                <code>avortyx_number</code>
                {" "}on PING and must include both{" "}
                <code>caller_id</code>
                {" "}and{" "}
                <code>ping_id</code>
                {" "}on POST
              </li>
            </ul>
            <h3>Authentication</h3>
            <p>
              Optionally require publishers to authenticate with an{" "}
              <code>auth_token</code>
              {" "}parameter. When enabled, only users with a valid Avortyx account can access the endpoint, allowing you to track which users are sending traffic.
            </p>
            <h3>Posting Instructions</h3>
            <p>
              Each Ping/Post endpoint has a dedicated{" "}
              <strong>Posting Instructions</strong>
              {" "}page in the dashboard that shows the complete field list, example requests, and example responses tailored to that endpoint's configuration. Share this page with publishers for easy integration.
            </p>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/ping_post.html" className="btn btn-td-green">Ping/Post Overview</a>
              {" "}
              <a href="/features/custom_webhook.html" className="btn btn-outline-td-green">Custom Webhooks</a>
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
