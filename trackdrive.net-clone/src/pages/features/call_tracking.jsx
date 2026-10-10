// /features/call_tracking.html
export const meta = {
  title: "Call Tracking | Call Tracking and Analytics | Avortyx",
  description: "Measure call conversions from online and offline marketing campaigns. Track traffic sources, URL keywords, and custom tokens.",
  bodyClass: "avortyx_marketing features_call_tracking ",
  layout: "feature",
}

export default function CallTracking() {
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
          <h1 className="fw-bold mb-2">Call Tracking</h1>
          <p className="lead mktg-subpage-hero-subtitle">Measure call conversions from online and offline marketing campaigns. Track traffic sources, URL keywords, and custom tokens.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-hashtag" /></div>
                  <div className="flow-node-label">Tracking Number</div>
                  <div className="flow-node-desc">Assign a local or toll-free number to a campaign</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-phone-volume" /></div>
                  <div className="flow-node-label">Caller Dials</div>
                  <div className="flow-node-desc">Call attributed to its traffic source and tokens</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-list-check" /></div>
                  <div className="flow-node-label">Logged</div>
                  <div className="flow-node-desc">Duration, status, revenue, recording, and disposition</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-chart-column" /></div>
                  <div className="flow-node-label">Reported</div>
                  <div className="flow-node-desc">Summary reports and CSV exports by any dimension</div>
                </div>
              </div>
            </div>
            <p>
              Tie every call back to the campaign that drove it. Choose from{" "}
              <strong>thousands of local and toll-free numbers</strong>
              {" "}— including 888, 877, 855, 844, and 866 — in virtually every area code.
            </p>
            <h3>Call Logs</h3>
            <p>
              Every call lands in the log with its source, offer, buyer, timings, geography, custom tokens, revenue, payout, and margin — plus the{" "}
              <a href="/features/call_recordings.html">recording</a>
              ,{" "}
              <a href="/features/transcriptions.html">AI transcription</a>
              , and disposition.
            </p>
            <p className="text-muted mb-1">
              <strong>The whole story in one grid.</strong>
              {" "}Filter, tab, and batch-act on every call — with custom column layouts per team.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-call-tracking-001.webp">
              <img alt="Call logs grid showing each caller, the Avortyx tracking number they dialed, offer, traffic source, buyer, status, and per-call revenue and payout" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-call-tracking-001.webp" width="2000" height="977" srcSet="/assets/avx-shots/features-call-tracking-001-1000.webp 1000w, /assets/avx-shots/features-call-tracking-001.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Every call, fully attributed.</strong>
              {" "}Timings, source, offer, and cost — with the recording, AI summary, and transcript on the same page.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-call-tracking-call-details.webp">
              <img alt="Call detail view with attribution, timing breakdown, interactive recording player, AI summary, and transcription" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-call-tracking-call-details.webp" width="2000" height="1450" srcSet="/assets/avx-shots/features-call-tracking-call-details-1000.webp 1000w, /assets/avx-shots/features-call-tracking-call-details.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Find calls by what was said.</strong>
              {" "}Full-text search reaches into every transcript — a competitor, a price, a complaint.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-transcription-transcripts-search.webp">
              <img alt="Searching every call transcript for a phrase with highlighted matches" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-transcripts-search.webp" width="2000" height="1414" srcSet="/assets/avx-shots/features-transcription-transcripts-search-1000.webp 1000w, /assets/avx-shots/features-transcription-transcripts-search.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3 id="reports-analytics">Call Analytics</h3>
            <p>
              Live dashboards track calls, conversions, revenue, payout, cost, and profit — and summary reports group any of it by buyer, traffic source, offer, status, and dozens of other dimensions. Choose from hundreds of fields, save layouts as tabs, and export one-time or recurring{" "}
              <a href="/features/data_export.html">CSV reports</a>
              {" "}with scheduled email delivery.{" "}
              <a href="/features/ping_post.html">Ping/post</a>
              {" "}traffic gets its own live dashboard.
            </p>
            <p className="text-muted mb-1">
              <strong>Know your numbers by any dimension.</strong>
              {" "}Calls, conversions, revenue, RPC, and timings — grouped however you slice it.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-call-tracking-002.webp">
              <img alt="Summary report grouped by buyer with conversions, revenue, RPC, and timing columns" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-call-tracking-002.webp" width="2000" height="829" srcSet="/assets/avx-shots/features-call-tracking-002-1000.webp 1000w, /assets/avx-shots/features-call-tracking-002.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Exports on your schedule.</strong>
              {" "}A guided wizard for one-time or recurring exports, with column selection and email delivery.
            </p>
            <img alt="Export wizard for one-time or recurring call exports with column selection and email notification" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-call-tracking-003.webp" width="1073" height="783" loading="lazy" decoding="async" />
            <h3>Transcription Analytics</h3>
            <p>
              With{" "}
              <a href="/features/transcriptions.html">AI Transcriptions</a>
              {" "}enabled, sentiment, topics, talk-time ratio, and cost roll up live — every figure drills down to the transcripts behind it.
            </p>
            <p className="text-muted mb-1">
              <strong>Hear the trend, not just the calls.</strong>
              {" "}Positive-sentiment trends by offer, agent, and call center.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-transcription-sentiment-breakdowns.webp">
              <img alt="Positive-sentiment trends by offer, agent, and call center" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-sentiment-breakdowns.webp" width="1800" height="1320" srcSet="/assets/avx-shots/features-transcription-sentiment-breakdowns-1000.webp 1000w, /assets/avx-shots/features-transcription-sentiment-breakdowns.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3 id="audio-quality">Audio Quality Monitoring</h3>
            <p>
              Bad audio quietly kills conversions. Every leg is scored from its RTP media stats —{" "}
              <strong>MOS</strong>
              , quality,{" "}
              <strong>packet loss</strong>
              , and{" "}
              <strong>jitter</strong>
              {" "}— and rolled up into a live, company-wide dashboard.
            </p>
            <p className="text-muted mb-1">
              <strong>Watch call quality like revenue.</strong>
              {" "}Average MOS, quality, packet loss, jitter, dead air, and a geographic breakdown.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/audio-quality-dashboard.webp">
              <img alt="Avortyx Audio Quality dashboard showing average MOS, quality, packet loss, jitter, dead air, and a geographic breakdown" className="img-fluid rounded border mb-4" src="/assets/avx-shots/audio-quality-dashboard.webp" width="1600" height="845" srcSet="/assets/avx-shots/audio-quality-dashboard-1000.webp 1000w, /assets/avx-shots/audio-quality-dashboard.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Pinpoint the problem.</strong>
              {" "}Break every metric down by direction and leg role, with the lowest-quality states surfaced.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/audio-quality-breakdowns.webp">
              <img alt="Avortyx Audio Quality breakdowns by direction and leg role, with the lowest-quality states" className="img-fluid rounded border mb-4" src="/assets/avx-shots/audio-quality-breakdowns.webp" width="1600" height="796" srcSet="/assets/avx-shots/audio-quality-breakdowns-1000.webp 1000w, /assets/avx-shots/audio-quality-breakdowns.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Dynamic IVR & Smart Routing</h3>
            <p>Between the dial and the log sits the call flow: Dynamic IVRs built from call routers — nodes that greet, collect keypresses or spoken answers, filter on any token, and route to the right buyer, no code required.</p>
            <ul className="text-muted">
              <li>
                <strong>Token-based filtering</strong>
                {" "}— each node matches on caller data, geography, or custom tokens, so the flow adapts per call.
              </li>
              <li>
                <strong>Webhooks per node</strong>
                {" "}— fire a{" "}
                <a href="/features/custom_webhook.html">custom webhook</a>
                {" "}before or after any node.
              </li>
              <li>
                <strong>Resilient by default</strong>
                {" "}— short-connect calls auto-try the next buyer, and no-buyer / no-match / no-answer cases fall back to customizable handlers like voicemail or a hold queue.
              </li>
            </ul>
            <h3>Recordings & Retention</h3>
            <p>
              <a href="/features/call_recordings.html">Record inbound and outbound calls</a>
              {" "}per offer, with access-controlled playback and automatic retention rules that scrub recordings past their window — by offer or globally.
            </p>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/inbound_call_routing.html" className="btn btn-td-green">Inbound Call Routing</a>
              {" "}
              <a href="/features/pii_redaction.html" className="btn btn-outline-td-green">PII Redaction</a>
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
