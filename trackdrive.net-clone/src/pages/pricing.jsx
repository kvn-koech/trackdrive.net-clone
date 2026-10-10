// /pricing.html
export const meta = {
  title: "Pricing | Avortyx",
  description: "Usage-based rates with volume discounts. No onboarding fees.",
  bodyClass: "avortyx_marketing pricing ",
  layout: "site",
}

export default function Pricing() {
  return (
    <main>
      <section className="pricing-hero">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <h1 className="fw-bold">Simple, transparent pricing</h1>
            <p className="text-muted lead">Usage-based rates with volume discounts. No onboarding fees.</p>
          </div>
        </div>
      </section>
      <section className="pricing-body">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Monthly Committed Use Discounts</h2>
            <p className="text-muted">Commit to a greater amount to receive a larger discount.</p>
          </div>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Rate Type</th>
                  <th>Pay As You Go</th>
                  <th>$50</th>
                  <th>$250</th>
                  <th>$1,000</th>
                  <th>$4,000</th>
                  <th>$8,000</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/call_tracking.html">Numbers</a>
                    {" "}
                    <sup>1</sup>
                  </th>
                  <td>$4.00</td>
                  <td>$3.00</td>
                  <td>$2.00</td>
                  <td>$1.50</td>
                  <td>$1.00</td>
                  <td>$1.00</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/spam_tag_mitigation.html">Spam Tag Mitigation</a>
                    {" "}
                    <sup>2</sup>
                  </th>
                  <td>$5.00</td>
                  <td>$4.00</td>
                  <td>$3.00</td>
                  <td>$2.50</td>
                  <td>$2.00</td>
                  <td>$2.00</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/inbound_call_routing.html">Local Tracking</a>
                    {" "}
                    <sup>3</sup>
                  </th>
                  <td>$0.0550</td>
                  <td>$0.0500</td>
                  <td>$0.0400</td>
                  <td>$0.0350</td>
                  <td>$0.0300</td>
                  <td>$0.0250</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/inbound_call_routing.html">Toll Free Tracking</a>
                    {" "}
                    <sup>4</sup>
                  </th>
                  <td>$0.0600</td>
                  <td>$0.0550</td>
                  <td>$0.0450</td>
                  <td>$0.0400</td>
                  <td>$0.0350</td>
                  <td>$0.0300</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/agent_controls.html">Outbound To Consumer</a>
                    {" "}
                    <sup>5</sup>
                  </th>
                  <td>$0.0450</td>
                  <td>$0.0400</td>
                  <td>$0.0300</td>
                  <td>$0.0250</td>
                  <td>$0.0200</td>
                  <td>$0.0150</td>
                </tr>
                <tr>
                  <th className="fw-semibold"><a className="mktg-link-green" href="/features/ai_sms_bots.html">SMS Out</a> <sup>6</sup></th>
                  <td>$0.0400</td>
                  <td>$0.0350</td>
                  <td>$0.0300</td>
                  <td>$0.0250</td>
                  <td>$0.0200</td>
                  <td>$0.0150</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/lead_automation.html">Per Action</a>
                    {" "}
                    <sup>7</sup>
                  </th>
                  <td>$0.00250</td>
                  <td>$0.00150</td>
                  <td>$0.00120</td>
                  <td>$0.00090</td>
                  <td>$0.00075</td>
                  <td>$0.00060</td>
                </tr>
                <tr>
                  <th className="fw-semibold">Rejected Call <sup>8</sup></th>
                  <td>$0.0250</td>
                  <td>$0.0200</td>
                  <td>$0.0200</td>
                  <td>$0.0150</td>
                  <td>$0.0100</td>
                  <td>$0.0050</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/ping_post.html">Ping/Post Per 1k</a>
                    {" "}
                    <sup>9</sup>
                  </th>
                  <td>$0.1200</td>
                  <td>$0.0600</td>
                  <td>$0.0500</td>
                  <td>$0.0400</td>
                  <td>$0.0200</td>
                  <td>$0.0200</td>
                </tr>
                <tr>
                  <th className="fw-semibold">
                    <a className="mktg-link-green" href="/features/transcriptions.html">AI Transcription</a>
                    {" "}
                    <sup>10</sup>
                  </th>
                  <td>$0.0350</td>
                  <td>$0.0325</td>
                  <td>$0.0300</td>
                  <td>$0.0275</td>
                  <td>$0.0250</td>
                  <td>$0.0200</td>
                </tr>
                <tr>
                  <th className="fw-semibold">Recording Retention <sup>11</sup></th>
                  <td>$0.00040</td>
                  <td>$0.00040</td>
                  <td>$0.00040</td>
                  <td>$0.00040</td>
                  <td>$0.00025</td>
                  <td>$0.00015</td>
                </tr>
                <tr className="pricing-table-enterprise-row">
                  <th className="fw-semibold">Enterprise</th>
                  <td colSpan="6">
                    Want a custom quote? Contact{" "}
                    <a href="mailto:support@avortyx.com" className="mktg-link-green">support@avortyx.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pricing-enterprise-cta">
            <div className="pricing-highlight-card">
              <h2 className="fw-bold mb-2">Enterprise</h2>
              <p className="text-muted mx-auto pricing-enterprise-desc">Need a strategic partner, not a transactional vendor? We apply decades of market experience to help you meet your goals.</p>
              <a className="btn btn-td-green btn-lg" href="/p/contact.html"> <i className="fa-solid fa-envelope me-2" />Contact Sales </a>
            </div>
          </div>
          <div className="pricing-breakdown-showcase">
            <h3 className="fw-bold mt-5">Call Cost Calculator</h3>
            <p className="text-muted pricing-calculator-intro">
              The inbound tracking rates include forwarding the call to your buyer.
              <br />
              {" "}Pick a commit level and call path to see the per-minute cost of each leg.
            </p>
            <div className="pricing-calculator">
              <div className="pricing-calculator-controls">
                <label>
                  {" "}
                  <span>Minimum Monthly Commit</span>
                  <select className="form-select js-calc-commit" defaultValue="base">
                    <option value="base" data-rates={"{\"in_local\":0.05,\"in_toll_free\":0.055,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>Pay As You Go</option>
                    <option value="commit_50" data-rates={"{\"in_local\":0.045,\"in_toll_free\":0.05,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>$50</option>
                    <option value="commit_250" data-rates={"{\"in_local\":0.035,\"in_toll_free\":0.04,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>$250</option>
                    <option value="commit_1000" data-rates={"{\"in_local\":0.03,\"in_toll_free\":0.035,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>$1,000</option>
                    <option value="commit_4000" data-rates={"{\"in_local\":0.025,\"in_toll_free\":0.03,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>$4,000</option>
                    <option value="commit_8000" data-rates={"{\"in_local\":0.02,\"in_toll_free\":0.025,\"out_local\":0.01,\"out_toll_free\":0.005,\"out_sip\":0.005}"}>$8,000</option>
                  </select>
                </label>
                {" "}
                <label>
                  {" "}
                  <span>Receiving inbound calls with:</span>
                  <select className="form-select js-calc-inbound" defaultValue="in_local">
                    <option value="in_local">Local Tracking</option>
                    <option value="in_toll_free">Toll Free Tracking</option>
                  </select>
                </label>
                {" "}
                <label>
                  {" "}
                  <span>Connecting to a buyer with:</span>
                  <select className="form-select js-calc-buyer" defaultValue="out_toll_free">
                    <option value="out_toll_free">Toll Free</option>
                    <option value="out_sip">SIP</option>
                    <option value="out_local">Local</option>
                  </select>
                </label>
              </div>
              <div className="pricing-calculator-breakdown">
                <div className="pricing-calculator-row">
                  <div className="pricing-calculator-row-info">
                    <span className="js-calc-inbound-label pricing-calculator-row-label">Consumer Inbound to Local</span>
                    {" "}
                    <span className="js-calc-inbound-example pricing-calculator-row-example text-muted">+17191232222</span>
                  </div>
                  <div className="js-calc-inbound-rate pricing-calculator-row-rate">$0.0500 /min</div>
                </div>
                <div className="pricing-calculator-row">
                  <div className="pricing-calculator-row-info">
                    <span className="js-calc-buyer-label pricing-calculator-row-label">Forwarding to Buyer with Toll Free</span>
                    {" "}
                    <span className="js-calc-buyer-example pricing-calculator-row-example text-muted">+18001234444</span>
                  </div>
                  <div className="js-calc-buyer-rate pricing-calculator-row-rate">$0.0050 /min</div>
                </div>
                <div className="pricing-calculator-row pricing-calculator-row-total">
                  <div className="pricing-calculator-row-info"><span className="pricing-calculator-row-label">Total</span></div>
                  <div className="js-calc-total pricing-calculator-row-rate">$0.0550 /min</div>
                </div>
              </div>
              <p className="text-muted pricing-calculator-note">Per-minute rates for a buyer-connected inbound call. Every call in Avortyx shows this same leg-by-leg cost breakdown.</p>
            </div>
          </div>
          <div className="pricing-breakdown-showcase">
            <h3 className="fw-bold mt-5">Ping/Post Cost Calculator</h3>
            <ul className="list-unstyled text-muted pricing-calculator-intro">
              <li className="d-flex mb-2">
                <i className="fa-solid fa-check text-success me-2 mt-1" />
                {" "}
                <span><strong>Duplicate pings are free.</strong> The same ping repeated within 15 seconds counts once.</span>
              </li>
              <li className="d-flex mb-2">
                <i className="fa-solid fa-check text-success me-2 mt-1" />
                {" "}
                <span><strong>You pay per 1,000 unique pings.</strong> Posts are billed at the same rate.</span>
              </li>
              <li className="d-flex mb-2">
                <i className="fa-solid fa-check text-success me-2 mt-1" />
                {" "}
                <span>
                  <strong>Rate limits protect your bill.</strong>
                  {" "}Cap each endpoint and each traffic source, so a source that floods you with pings cannot run up your costs.
                </span>
              </li>
            </ul>
            <p className="text-muted pricing-calculator-intro">Enter your unique pings per day to estimate your monthly cost.</p>
            <div className="pricing-calculator js-ping-calculator" data-days-per-month="30">
              <div className="pricing-calculator-controls">
                <label>
                  {" "}
                  <span>Minimum Monthly Commit</span>
                  <select className="form-select js-ping-calc-commit" defaultValue="base">
                    <option value="base" data-rate-per-1k="0.12">Pay As You Go</option>
                    <option value="commit_50" data-rate-per-1k="0.06">$50</option>
                    <option value="commit_250" data-rate-per-1k="0.05">$250</option>
                    <option value="commit_1000" data-rate-per-1k="0.04">$1,000</option>
                    <option value="commit_4000" data-rate-per-1k="0.02">$4,000</option>
                    <option value="commit_8000" data-rate-per-1k="0.02">$8,000</option>
                  </select>
                </label>
                {" "}
                <label>
                  {" "}
                  <span>Unique Pings per Day</span>
                  {" "}
                  <input type="number" className="form-control js-ping-calc-per-day" min="0" step="1000" defaultValue="10000" />
                  {" "}
                </label>
              </div>
              <div className="pricing-calculator-breakdown">
                <div className="pricing-calculator-row">
                  <div className="pricing-calculator-row-info">
                    <span className="pricing-calculator-row-label">Unique Pings Billed</span>
                    {" "}
                    <span className="js-ping-calc-unique-example pricing-calculator-row-example text-muted">10,000 per day x 30 days</span>
                  </div>
                  <div className="js-ping-calc-unique-count pricing-calculator-row-rate">300,000 /month</div>
                </div>
                <div className="pricing-calculator-row">
                  <div className="pricing-calculator-row-info">
                    <span className="pricing-calculator-row-label">Ping/Post Rate</span>
                    {" "}
                    <span className="pricing-calculator-row-example text-muted">Per 1,000 unique pings</span>
                  </div>
                  <div className="js-ping-calc-rate pricing-calculator-row-rate">$0.1200 /1k</div>
                </div>
                <div className="pricing-calculator-row pricing-calculator-row-total">
                  <div className="pricing-calculator-row-info"><span className="pricing-calculator-row-label">Estimated Total</span></div>
                  <div className="js-ping-calc-total pricing-calculator-row-rate">$36.00 /month</div>
                </div>
              </div>
              <p className="text-muted pricing-calculator-note">
                Estimate for a 30-day month. See the{" "}
                <a className="mktg-link-green" href="/features/ping_post.html">Ping/Post feature page</a>
                {" "}for rate limiting, bid management and the real-time dashboards.
              </p>
            </div>
          </div>
        </div>
        <section className="pricing-faq-section">
          <div className="container pricing-faq-container">
            <h2 className="fw-bold text-center mb-4">Frequently Asked Questions</h2>
            <div className="accordion pricing-accordion" id="pricingFaq">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1"> Are there any onboarding fees? </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#pricingFaq">
                  <div className="accordion-body text-muted">No. Avortyx does not charge onboarding fees.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqInbound"> Are the inbound rates all-inclusive? </button>
                </h2>
                <div id="faqInbound" className="accordion-collapse collapse" data-bs-parent="#pricingFaq">
                  <div className="accordion-body text-muted">Yes. An inbound call connected to a buyer has two legs (the caller and your buyer). The tracking rates - local and toll free - cover both legs, and your statements itemize each leg so you can see exactly what every call cost. The Outbound To Consumer rate applies only to outbound dialing.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2"> Do you offer discounts? </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#pricingFaq">
                  <div className="accordion-body text-muted">
                    Yes, for high-volume customers.{" "}
                    <a href="/p/contact.html">Contact our team</a>
                    {" "}for details.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3"> Do you offer customer support? </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#pricingFaq">
                  <div className="accordion-body text-muted">We offer phone, live chat, and email support.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4"> Can you help me with my account? </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#pricingFaq">
                  <div className="accordion-body text-muted">We offer live video support sessions with our specialists. Chat with us or email to schedule.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pricing-footnotes-section">
          <div className="container">
            <div className="pricing-footnotes mb-0">
              <p><sup>1</sup> Monthly rate per number.</p>
              <p><sup>2</sup> Monthly rate to enable spam tag mitigation. Covers carrier registration and spam label removal.</p>
              <p>
                <sup>3</sup>
                {" "}Inbound calls to your local tracking numbers, billed per minute and rounded up to the nearest full minute. Forwarding the call to a buyer over toll-free or SIP is included in that rate; international and premium rate centers can add cost.
              </p>
              <p>
                <sup>4</sup>
                {" "}Inbound calls to your toll free tracking numbers, billed per minute and rounded up to the nearest full minute. Forwarding the call to a buyer over toll-free or SIP is included in that rate; international and premium rate centers can add cost.
              </p>
              <p>
                <sup>5</sup>
                {" "}Outbound dialing to consumers, such as power dialer and scheduled callback calls. It does not apply to inbound calls - connecting a buyer is included in the tracking rates. Outbound calls are billed on call duration, on the billing increment and minimum billable duration configured for your account - the Six Second Billing section of the rate sheet states yours.
              </p>
              <p>
                <sup>6</sup>
                {" "}Rate per outbound SMS message. Inbound SMS on your local numbers is free; inbound messages on toll-free numbers can bill at your toll-free inbound SMS rate.
              </p>
              <p>
                <sup>7</sup>
                {" "}Rate per billable schedule step run against a lead, such as a webhook, email, wait or choice. SMS is not billed here; a call a schedule dials is, on top of the call itself. This fee is charged when the following schedule action types are processed:{" "}
                <span className="pricing-footnote-badge">AWS S3 Upload</span>
                {" "}
                <span className="pricing-footnote-badge">Add To Schedule</span>
                {" "}
                <span className="pricing-footnote-badge">Block Lead</span>
                {" "}
                <span className="pricing-footnote-badge">Choice</span>
                {" "}
                <span className="pricing-footnote-badge">Email</span>
                {" "}
                <span className="pricing-footnote-badge">FTP Upload</span>
                {" "}
                <span className="pricing-footnote-badge">Infusionsoft</span>
                {" "}
                <span className="pricing-footnote-badge">Mailchimp</span>
                {" "}
                <span className="pricing-footnote-badge">Mailgun</span>
                {" "}
                <span className="pricing-footnote-badge">Manage Zoho CRM</span>
                {" "}
                <span className="pricing-footnote-badge">Modify Lead</span>
                {" "}
                <span className="pricing-footnote-badge">Offer Create</span>
                {" "}
                <span className="pricing-footnote-badge">Opt-Out Lead</span>
                {" "}
                <span className="pricing-footnote-badge">Restart Schedule</span>
                {" "}
                <span className="pricing-footnote-badge">Schedule Create</span>
                {" "}
                <span className="pricing-footnote-badge">Sengrid</span>
                {" "}
                <span className="pricing-footnote-badge">Wait For</span>
                {" "}
                <span className="pricing-footnote-badge">Webhook POST</span>
              </p>
              <p><sup>8</sup> Fee per inbound call that cannot be routed and is rejected.</p>
              <p>
                <sup>9</sup>
                {" "}Rate per 1,000 unique Ping API requests, counting requests that are identical to one already received on the same endpoint once per 15 second window.
              </p>
              <p><sup>10</sup> Post-call transcription rate per minute.</p>
              <p><sup>11</sup> Monthly rate per minute of call recordings retained beyond the free 90-day retention period.</p>
              <p className="mb-0">A $0.005 surcharge applies per call when more than 20% of call attempts are abandoned (0-second, unanswered) during the last 30 days.</p>
            </div>
          </div>
        </section>
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
