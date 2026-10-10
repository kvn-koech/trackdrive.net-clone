// /features/lead_automation.html
export const meta = {
  title: "Lead Automation | Call Tracking and Analytics | Avortyx",
  description: "Turn web forms into live phone calls with automated SMS, email, and outbound call workflows.",
  bodyClass: "avortyx_marketing features_lead_automation ",
  layout: "feature",
}

export default function LeadAutomation() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#automation" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Automation{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Automation</p>
          <h1 className="fw-bold mb-2">Lead Automation</h1>
          <p className="lead mktg-subpage-hero-subtitle">Turn web forms into live phone calls with automated SMS, email, and outbound call workflows.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">Automated Lead Follow-Up Example</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-user-plus" /></div>
                  <div className="flow-node-label">Lead Enters</div>
                  <div className="flow-node-desc">Via web form, API, or import</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-comment-sms" /></div>
                  <div className="flow-node-label">Outreach</div>
                  <div className="flow-node-desc">Optional SMS, email, or webhook actions</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-clock" /></div>
                  <div className="flow-node-label">Wait</div>
                  <div className="flow-node-desc">Configurable delay between steps</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-volume" /></div>
                  <div className="flow-node-label">Call</div>
                  <div className="flow-node-desc">Optionally call the lead, route to a buyer</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-secondary text-white"><i className="fa-solid fa-rotate" /></div>
                  <div className="flow-node-label">Repeat</div>
                  <div className="flow-node-desc">More attempts, or complete</div>
                </div>
              </div>
              <p className="text-muted text-center small mb-0 mt-3">One example sequence — mix and match any of the schedule actions below.</p>
            </div>
            <p>
              Turn web forms into live phone calls.{" "}
              <a href="/features/lead_automation.html">Lead Automation</a>
              {" "}contacts every lead the moment it arrives — sending SMS and email, then placing outbound calls — with multi-step workflows that run automatically.
            </p>
            <p className="text-muted">Socialized Media, a Facebook advertising agency, sends each new Facebook Lead to Avortyx in real time. An SMS and email go out immediately, and the IVR dials the lead minutes later — retrying automatically if there's no answer.</p>
            <h3>Schedule Actions</h3>
            <p>Each schedule is an ordered list of actions that execute automatically for every lead. Available action types include:</p>
            <ul className="text-muted">
              <li><strong>Call</strong> — place an outbound call to the lead using the offer's IVR</li>
              <li><strong>SMS</strong> — send a text message with token-replaced content</li>
              <li><strong>Email</strong> — send an email via your connected email integration</li>
              <li><strong>Wait</strong> — pause for a configurable duration before the next action</li>
              <li><strong>Webhook</strong> — fire a webhook to an external system</li>
              <li><strong>Add to Schedule</strong> — move the lead into another schedule</li>
              <li><strong>Update Field</strong> — modify contact field values on the lead</li>
              <li><strong>Conditional</strong> — conditionally exit the schedule based on token values or expressions</li>
            </ul>
            <p className="text-muted mb-1">
              <strong>Build a schedule visually.</strong>
              {" "}Drag actions into an ordered follow-up sequence for every lead.
            </p>
            <img alt="Avortyx lead scheduler" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/new-schedule-example.webp" width="941" height="780" loading="lazy" decoding="async" />
            <p className="text-muted mb-1">
              <strong>Every schedule, measured.</strong>
              {" "}Leads created, ended, and converted, with revenue and profit for each automated sequence.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/schedule-example.webp">
              <img alt="Lead Automation dashboard comparing volume, conversions, revenue, and profit by schedule" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/schedule-example.webp" width="2000" height="1120" srcSet="/assets/avx-shots/schedule-example-1000.webp 1000w, /assets/avx-shots/schedule-example.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Measure Every Lead in Real Time</h3>
            <p>The Lead Automation dashboard turns your automated follow-up into live analytics — so you can see exactly what your schedules are producing.</p>
            <ul className="text-muted">
              <li>
                <strong>Volume & outcomes</strong>
                {" "}— leads created, contacted, ended, and converted, with conversion and lifecycle rates
              </li>
              <li><strong>Economics</strong> — revenue, payout, profit, margin, and revenue per lead</li>
              <li><strong>Breakdowns</strong> — per offer, schedule, channel, buyer, and agent</li>
              <li><strong>Live queue</strong> — a real-time view of the outbound dialer queue, by tier and by state</li>
              <li><strong>Best-time heatmaps</strong> — the day-and-hour windows that create and convert the most leads</li>
            </ul>
            <p className="text-muted mb-1">
              <strong>Volume, outcomes, and economics at a glance.</strong>
              {" "}Headline KPIs with period-over-period trends, the lifecycle funnel, and the best day-and-hour windows to reach your leads.
            </p>
            <img alt="Avortyx lead automation KPI dashboard" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/lead-automation-dashboard.webp" width="1226" height="680" srcSet="/assets/avx-shots/lead-automation-dashboard-1000.webp 1000w, /assets/avx-shots/lead-automation-dashboard.webp 1226w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <p className="text-muted mb-1">
              <strong>Track performance over time.</strong>
              {" "}Created leads, outcomes, conversions, revenue, and automation activity charted across your selected range.
            </p>
            <img alt="Avortyx lead automation trends over time" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/lead-automation-analytics-trends.webp" width="1226" height="490" srcSet="/assets/avx-shots/lead-automation-analytics-trends-1000.webp 1000w, /assets/avx-shots/lead-automation-analytics-trends.webp 1226w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <p className="text-muted mb-1">
              <strong>See where your leads convert.</strong>
              {" "}Conversions mapped by state, with per-state and per-country breakdowns.
            </p>
            <img alt="Avortyx lead automation conversions by geography" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/lead-automation-analytics-geo.webp" width="1226" height="558" srcSet="/assets/avx-shots/lead-automation-analytics-geo-1000.webp 1000w, /assets/avx-shots/lead-automation-analytics-geo.webp 1226w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
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
