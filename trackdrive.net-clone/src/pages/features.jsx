// /features.html
export const meta = {
  title: "Features | Avortyx",
  description: "Everything you need to track, route, and optimize calls at scale.",
  bodyClass: "avortyx_marketing features ",
  layout: "site",
}

export default function Features() {
  return (
    <main>
      <section className="py-5">
        <div className="container">
          <div className="mktg-section-header">
            <h1 className="fw-bold">Features</h1>
            <p className="text-muted lead">Everything you need to track, route, and optimize calls at scale.</p>
          </div>
          <div className="flow-platform-diagram mt-4">
            <div className="flow-column">
              <a className="flow-item" href="/features/inbound_call_routing.html">
                {" "}
                <i className="fa-solid fa-phone-volume text-primary" />
                {" "}
                <span>Inbound Call Routing</span>
                {" "}
              </a>
              {" "}
              <a className="flow-item" href="/features/ping_post.html">
                {" "}
                <i className="fa-solid fa-arrow-right-arrow-left text-info" />
                {" "}
                <span>Ping/Post</span>
                {" "}
              </a>
              {" "}
              <a className="flow-item" href="/features/api.html">
                {" "}
                <i className="fa-solid fa-code text-secondary" />
                {" "}
                <span>REST API</span>
                {" "}
              </a>
              <div className="flow-item"><i className="fa-solid fa-globe text-warning" /> <span>Web Forms</span></div>
            </div>
            <div className="flow-arrows-column">
              <i className="fa-solid fa-chevron-right" />
              {" "}
              <i className="fa-solid fa-chevron-right" />
            </div>
            <div className="flow-column-center">
              <div className="flow-center-box">
                <div className="flow-center-title"><i className="fa-solid fa-bolt text-success me-1" /> Avortyx</div>
                <div className="flow-center-features"><span>Track, route & optimize every call and lead in real time.</span></div>
              </div>
            </div>
            <div className="flow-arrows-column">
              <i className="fa-solid fa-chevron-right" />
              {" "}
              <i className="fa-solid fa-chevron-right" />
            </div>
            <div className="flow-column">
              <a className="flow-item" href="/features/buyer_management.html">
                {" "}
                <i className="fa-solid fa-user-tie text-success" />
                {" "}
                <span>Buyer Management</span>
                {" "}
              </a>
              {" "}
              <a className="flow-item" href="/features/call_tracking.html">
                {" "}
                <i className="fa-solid fa-circle-check text-success" />
                {" "}
                <span>Conversions</span>
                {" "}
              </a>
              {" "}
              <a className="flow-item" href="/features/call_tracking.html">
                {" "}
                <i className="fa-solid fa-dollar-sign text-success" />
                {" "}
                <span>Revenue</span>
                {" "}
              </a>
              {" "}
              <a className="flow-item" href="/features/call_tracking.html#reports-analytics">
                {" "}
                <i className="fa-solid fa-chart-line text-primary" />
                {" "}
                <span>Call Analytics</span>
                {" "}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="ping-post">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <h3 className="fw-bold">Real Time Ping/Post</h3>
                <p className="text-muted">Match inbound leads with available buyers using a two-step Ping/Post system — real-time bidding (RTB) that routes every lead to the buyer who values it most.</p>
              </div>
              <a className="btn btn-td-green feature-modal-link" href="/features/ping_post.html">Learn More</a>
              {" "}
              <a className="btn btn-outline-td-green ms-2 feature-modal-link" href="/features/ping_post_integration.html">Integration Guide</a>
            </div>
            <div className="col-lg-6 text-center">
              <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/ping-post-dashboard-1.webp">
                <img alt="Real-Time Ping/Post dashboard" className="img-fluid rounded border" width="1400" height="1032" src="/assets/avx-shots/ping-post-dashboard-1.webp" srcSet="/assets/avx-shots/ping-post-dashboard-1-1000.webp 1000w, /assets/avx-shots/ping-post-dashboard-1.webp 1400w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="call-management">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">Call Management</h3>
            <p className="text-muted">Core tools for tracking, routing, and handling inbound and outbound calls.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/call_tracking.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3">
                    <i className="fa-solid fa-phone-volume" />
                  </div>
                  <h5 className="fw-bold text-body">Call Tracking</h5>
                  <p className="text-muted small mb-0">Track and route calls across campaigns, traffic sources, and keywords. Local and toll-free numbers available.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/agent_controls.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3"><i className="fa-solid fa-headset" /></div>
                  <h5 className="fw-bold text-body">Agent Control Center</h5>
                  <p className="text-muted small mb-0">Interview consumers, transfer to buyers, mute, hold, and disposition calls from one interface.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/hold_queue.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-warning bg-opacity-10 text-warning mb-3">
                    <i className="fa-solid fa-clock-rotate-left" />
                  </div>
                  <h5 className="fw-bold text-body">Hold Queue & Callback</h5>
                  <p className="text-muted small mb-0">Queue callers when agents are busy. Offer automated callbacks to reduce wait times.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/call_recordings.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-info bg-opacity-10 text-info mb-3">
                    <i className="fa-solid fa-microphone-lines" />
                  </div>
                  <h5 className="fw-bold text-body">Call Recordings</h5>
                  <p className="text-muted small mb-0">Record, store, and review inbound and outbound calls for quality assurance.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="automation">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">Automation</h3>
            <p className="text-muted">Capture every lead and automate outreach across SMS, email, and outbound calls.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/lead_automation.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-warning bg-opacity-10 text-warning mb-3"><i className="fa-solid fa-bolt" /></div>
                  <h5 className="fw-bold text-body">Lead Automation</h5>
                  <p className="text-muted small mb-0">Capture leads from forms and automatically schedule contact via SMS, email, and outbound calls.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/agent_controls.html#power-dialer" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-danger bg-opacity-10 text-danger mb-3">
                    <i className="fa-solid fa-phone-arrow-up-right" />
                  </div>
                  <h5 className="fw-bold text-body">Power Dialer</h5>
                  <p className="text-muted small mb-0">Automatically match leads to available agents and place outbound calls on a continuous cycle.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="ai">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">AI</h3>
            <p className="text-muted">Voice agents that answer the phone, SMS bots that work your texts, and AI transcription that reads every call.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/voice_agents.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3"><i className="fa-solid fa-robot" /></div>
                  <h5 className="fw-bold text-body">AI Voice Agents</h5>
                  <p className="text-muted small mb-0">Voice agents that answer 24/7, qualify leads, and warm-transfer to humans through your existing buyers and routing.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/ai_sms_bots.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-info bg-opacity-10 text-info mb-3"><i className="fa-solid fa-robot" /></div>
                  <h5 className="fw-bold text-body">AI SMS Bots</h5>
                  <p className="text-muted small mb-0">AI-powered SMS bots that engage leads, answer questions, and schedule calls automatically.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/transcriptions.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3">
                    <i className="fa-solid fa-file-lines" />
                  </div>
                  <h5 className="fw-bold text-body">AI Transcriptions</h5>
                  <p className="text-muted small mb-0">Post-call transcription with keyword spotting and AI-powered call analysis.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="tracking-attribution">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">Tracking & Attribution</h3>
            <p className="text-muted">Track sources, swap numbers dynamically, and build custom logic with expressions.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/dynamic_number_insertion.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-info bg-opacity-10 text-info mb-3"><i className="fa-solid fa-code" /></div>
                  <h5 className="fw-bold text-body">Dynamic Number Insertion</h5>
                  <p className="text-muted small mb-0">Automatically swap tracking numbers on your website to attribute calls to the correct source.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/formulas.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-warning bg-opacity-10 text-warning mb-3">
                    <i className="fa-solid fa-calculator" />
                  </div>
                  <h5 className="fw-bold text-body">Expressions & Functions</h5>
                  <p className="text-muted small mb-0">Powerful formulas for call routing rules, data transformations, and complex calculations.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/custom_webhook.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3">
                    <i className="fa-solid fa-arrows-turn-to-dots" />
                  </div>
                  <h5 className="fw-bold text-body">Custom Webhooks</h5>
                  <p className="text-muted small mb-0">Send real-time call data to any endpoint. Integrate with Cake, HasOffers, Voluum, and more.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/data_export.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-primary bg-opacity-10 text-primary mb-3">
                    <i className="fa-solid fa-file-export" />
                  </div>
                  <h5 className="fw-bold text-body">Data Exports</h5>
                  <p className="text-muted small mb-0">Export calls, leads, and conversions to CSV or your data warehouse on demand or on a schedule.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/api.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-secondary bg-opacity-10 text-secondary mb-3">
                    <i className="fa-solid fa-terminal" />
                  </div>
                  <h5 className="fw-bold text-body">REST API</h5>
                  <p className="text-muted small mb-0">Full programmatic access to the entire platform. RESTful, HTTPS-based, and JSON-formatted.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="phone-numbers">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">Phone Numbers</h3>
            <p className="text-muted">Provision numbers, connect telephone providers, and protect your caller reputation.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/spam_tag_mitigation.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-warning bg-opacity-10 text-warning mb-3">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <h5 className="fw-bold text-body">Spam Tag Mitigation</h5>
                  <p className="text-muted small mb-0">Branded caller ID, carrier registration, and spam-label monitoring so more of your calls get answered.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/multiple_telephone_providers.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-primary bg-opacity-10 text-primary mb-3">
                    <i className="fa-solid fa-tower-cell" />
                  </div>
                  <h5 className="fw-bold text-body">Multiple Telephone Providers</h5>
                  <p className="text-muted small mb-0">Use Twilio, Telnyx, Plivo, and more. Bring your own VoIP provider for maximum flexibility.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/sip_support.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-secondary bg-opacity-10 text-secondary mb-3">
                    <i className="fa-solid fa-network-wired" />
                  </div>
                  <h5 className="fw-bold text-body">SIP Support</h5>
                  <p className="text-muted small mb-0">Connect via SIP credentials and headers. Integrate with your preferred VoIP platforms.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="security-compliance-tools">
        <div className="container">
          <div className="mktg-section-header">
            <h3 className="fw-bold mb-1">Security & Compliance Tools</h3>
            <p className="text-muted">Safeguard sensitive information, restrict access, and support your calling-compliance program.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <a href="/features/pii_redaction.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-danger bg-opacity-10 text-danger mb-3">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <h5 className="fw-bold text-body">PII Redaction</h5>
                  <p className="text-muted small mb-0">Automatically clear or hash PII from aged calls and leads, and restrict who can see sensitive fields.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/api_whitelist.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-secondary bg-opacity-10 text-secondary mb-3">
                    <i className="fa-solid fa-lock" />
                  </div>
                  <h5 className="fw-bold text-body">API IP Whitelist</h5>
                  <p className="text-muted small mb-0">Restrict API access to approved IP addresses for enhanced security.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/suppression_lists.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-warning bg-opacity-10 text-warning mb-3"><i className="fa-solid fa-ban" /></div>
                  <h5 className="fw-bold text-body">Suppression & DNC</h5>
                  <p className="text-muted small mb-0">Manage suppression lists, blacklists, and DNC tooling with TCPA Shield and Blacklist Alliance integrations.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/state_rules.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-info bg-opacity-10 text-info mb-3">
                    <i className="fa-solid fa-map-location-dot" />
                  </div>
                  <h5 className="fw-bold text-body">State Rules</h5>
                  <p className="text-muted small mb-0">Enforce geographic restrictions on call routing by caller or buyer state for regulated industries.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/consent_opt_out.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-success bg-opacity-10 text-success mb-3">
                    <i className="fa-solid fa-file-signature" />
                  </div>
                  <h5 className="fw-bold text-body">Consent & Opt-Out</h5>
                  <p className="text-muted small mb-0">Capture verifiable consent records per lead and honor opt-outs automatically with immutable logs.</p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/features/verified_identity.html" className="text-decoration-none">
                <div className="card features-grid-card p-4">
                  <div className="features-grid-icon bg-primary bg-opacity-10 text-primary mb-3"><i className="fa-solid fa-id-card" /></div>
                  <h5 className="fw-bold text-body">Verified Identity & Caller ID</h5>
                  <p className="text-muted small mb-0">Register your EIN and legal business name with the carriers so your inbound and outbound calls keep connecting.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section" id="optimizer">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="bg-light rounded-3 p-4">
                <h5 className="fw-bold mb-3"><i className="fa-solid fa-chart-line me-2 text-muted" />Campaign Performance</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="fa-solid fa-bullhorn text-muted me-2" />Impressions and calls by campaign</li>
                  <li className="mb-2"><i className="fa-solid fa-magnifying-glass text-muted me-2" />Keyword-level conversion tracking</li>
                  <li className="mb-2"><i className="fa-solid fa-globe text-muted me-2" />Website and landing page attribution</li>
                  <li className="mb-2"><i className="fa-solid fa-clock text-muted me-2" />Real-time data updates</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <h3 className="fw-bold">Call Analytics</h3>
                <p className="text-muted">See which campaigns, websites, and keywords drive the most calls. View impressions, calls, and conversions for any combination of keywords in real time.</p>
              </div>
              <a className="btn btn-td-green feature-modal-link" href="/features/call_tracking.html#reports-analytics">Explore Call Analytics</a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <h3 className="fw-bold mb-2">Integrations</h3>
            <p className="text-muted">Connect with your favorite tools and platforms.</p>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mb-4">
            <a href="/features/voice_agents/elevenlabs.html" className="integration-logo-card text-decoration-none" title="ElevenLabs">
              {" "}
              <img alt="ElevenLabs" className="integration-logo" loading="lazy" src="/assets/avx-site/img/elevenlabs.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/zoho_crm.html" className="integration-logo-card text-decoration-none" title="Zoho CRM">
              {" "}
              <img alt="Zoho CRM" className="integration-logo" loading="lazy" src="/assets/avx-site/img/zoho_crm.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/aws_s3.html" className="integration-logo-card text-decoration-none" title="AWS S3">
              {" "}
              <img alt="AWS S3" className="integration-logo" loading="lazy" src="/assets/avx-site/img/aws_s3.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/cake.html" className="integration-logo-card text-decoration-none" title="Cake">
              {" "}
              <img alt="Cake" className="integration-logo" loading="lazy" src="/assets/avx-site/img/cake.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/adwords.html" className="integration-logo-card text-decoration-none" title="Google Ads">
              {" "}
              <img alt="Google Ads" className="integration-logo" loading="lazy" src="/assets/avx-site/img/ga.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/hasoffers.html" className="integration-logo-card text-decoration-none" title="HasOffers">
              {" "}
              <img alt="HasOffers" className="integration-logo" loading="lazy" src="/assets/avx-site/img/hasoffers.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/infusionsoft.html" className="integration-logo-card text-decoration-none" title="Infusionsoft">
              {" "}
              <img alt="Infusionsoft" className="integration-logo" loading="lazy" src="/assets/avx-site/img/infusionsoft-blue.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/linktrust.html" className="integration-logo-card text-decoration-none" title="Linktrust">
              {" "}
              <img alt="Linktrust" className="integration-logo" loading="lazy" src="/assets/avx-site/img/linktrust.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/mailchimp.html" className="integration-logo-card text-decoration-none" title="MailChimp">
              {" "}
              <img alt="MailChimp" className="integration-logo" loading="lazy" src="/assets/avx-site/img/mailchimp.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/mailgun.html" className="integration-logo-card text-decoration-none" title="Mailgun">
              {" "}
              <img alt="Mailgun" className="integration-logo" loading="lazy" src="/assets/avx-site/img/mailgun.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/salesforce.html" className="integration-logo-card text-decoration-none" title="Salesforce">
              {" "}
              <img alt="Salesforce" className="integration-logo" loading="lazy" src="/assets/avx-site/img/salesforce.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/sendgrid.html" className="integration-logo-card text-decoration-none" title="Sendgrid">
              {" "}
              <img alt="Sendgrid" className="integration-logo" loading="lazy" src="/assets/avx-site/img/sendgrid.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/slack.html" className="integration-logo-card text-decoration-none" title="Slack">
              {" "}
              <img alt="Slack" className="integration-logo" loading="lazy" src="/assets/avx-site/img/slack.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/typeform.html" className="integration-logo-card text-decoration-none" title="Typeform">
              {" "}
              <img alt="Typeform" className="integration-logo" loading="lazy" src="/assets/avx-site/img/typeform.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/voluum.html" className="integration-logo-card text-decoration-none" title="Voluum">
              {" "}
              <img alt="Voluum" className="integration-logo" loading="lazy" src="/assets/avx-site/img/voluum.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/zapier.html" className="integration-logo-card text-decoration-none" title="Zapier">
              {" "}
              <img alt="Zapier" className="integration-logo" loading="lazy" src="/assets/avx-site/img/zapier.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/plivo.html" className="integration-logo-card text-decoration-none" title="Plivo">
              {" "}
              <img alt="Plivo" className="integration-logo" loading="lazy" src="/assets/avx-site/img/plivo.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/telnyx.html" className="integration-logo-card text-decoration-none" title="Telnyx">
              {" "}
              <img alt="Telnyx" className="integration-logo" loading="lazy" src="/assets/avx-site/img/telnyx.png" />
              {" "}
            </a>
            {" "}
            <a href="/features/twilio.html" className="integration-logo-card text-decoration-none" title="Twilio">
              {" "}
              <img alt="Twilio" className="integration-logo" loading="lazy" src="/assets/avx-site/img/twilio.png" />
              {" "}
            </a>
          </div>
          <a href="/features/integrations.html" className="btn btn-td-green">View All Integrations</a>
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
