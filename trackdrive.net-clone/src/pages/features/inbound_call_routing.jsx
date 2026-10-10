// /features/inbound_call_routing.html
export const meta = {
  title: "Inbound Call Routing | Call Tracking and Analytics | Avortyx",
  description: "With Avortyx you can configure complex dynamic inbound and outbound call routing with filters and tokens.",
  bodyClass: "avortyx_marketing features_inbound_call_routing ",
  layout: "feature",
}

export default function InboundCallRouting() {
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
          <h1 className="fw-bold mb-2">Inbound Call Routing</h1>
          <p className="lead mktg-subpage-hero-subtitle">With Avortyx you can configure complex dynamic inbound and outbound call routing with filters and tokens.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">Inbound Call Flow</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></div>
                  <div className="flow-node-label">Caller Dials</div>
                  <div className="flow-node-desc">Tracking number resolves offer & source</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-microphone" aria-hidden="true" /></div>
                  <div className="flow-node-label">IVR & Greeting</div>
                  <div className="flow-node-desc">Collect keypresses and token data</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-filter" aria-hidden="true" /></div>
                  <div className="flow-node-label">Buyer Matching</div>
                  <div className="flow-node-desc">Hours, caps, tokens, suppression</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" aria-hidden="true" /></div>
                  <div className="flow-node-label">Connected</div>
                  <div className="flow-node-desc">Caller bridged to best buyer</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-circle-check" aria-hidden="true" /></div>
                  <div className="flow-node-label">Conversion</div>
                  <div className="flow-node-desc">Revenue tracked, payouts fired</div>
                </div>
              </div>
            </div>
            <p>
              Route incoming calls to{" "}
              <a href="/features/voice_agents.html">AI Voice Agents</a>
              , human agents, or buyers — and switch destinations mid-call when intent or filters change.
            </p>
            <h3>Routing Algorithms</h3>
            <p>Avortyx's routing engine evaluates all available buyers and selects the best match using one of three algorithms:</p>
            <ul>
              <li>
                <strong>Tier routing</strong>
                {" "}— manual priority ordering where lower tier values receive calls first, with weighted distribution within a tier.
              </li>
              <li><strong>Revenue routing</strong> — highest-bid-wins, prioritizing buyers offering the most per-call revenue.</li>
              <li><strong>EPC routing</strong> — earnings-per-call routing that prioritizes buyers with the highest historical EPC.</li>
            </ul>
            <h3>Buyer Filters, Caps & Hours</h3>
            <p>Before a call reaches a buyer, the engine checks that the buyer is a match and has capacity:</p>
            <ul>
              <li>
                <strong>Token-based filters</strong>
                {" "}— buyers define filters that match call attributes using operators (equals, not-equals, regex, numeric comparisons, in/not-in), so calls are targeted by geography, vertical, lead quality, or any custom token. A call is only routed to a buyer when it satisfies all of that buyer's filters.
              </li>
              <li>
                <strong>Capacity caps</strong>
                {" "}— concurrency, hourly, daily, monthly, and total caps are all checked, and buyers who have reached any limit are skipped automatically.
              </li>
              <li>
                <strong>Business hours</strong>
                {" "}— a 7-day by 24-hour day-parting grid controls when each buyer is eligible; calls outside a buyer's hours fall through to the next buyer or the configured exception handler.
              </li>
              <li>
                <strong>Suppression & blacklists</strong>
                {" "}— each buyer's suppression list is checked before forwarding, and company-wide blacklists can block callers entirely.
              </li>
            </ul>
            <p>
              See{" "}
              <a href="/features/buyer_management.html">Buyer Management</a>
              {" "}for cap configuration and{" "}
              <a href="/features/suppression_lists.html">Suppression & DNC</a>
              {" "}for list setup.
            </p>
            <h3>Every Routed Call Lands in Reporting</h3>
            <p>
              Each routed call carries its offer, buyer, and revenue into{" "}
              <a href="/features/call_tracking.html#reports-analytics">Call Analytics</a>
              {" "}— so you can see exactly what your routing decisions earn.
            </p>
            <p className="text-muted mb-1">
              <strong>Routing decisions, measured.</strong>
              {" "}Calls grouped by offer with revenue, payout, conversions, and per-call economics.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/summary-report-by-offer.webp">
              <img alt="Avortyx summary report grouping routed calls by offer, with revenue, payout, conversions, and per-call economics" className="img-fluid rounded border my-3" src="/assets/avx-shots/summary-report-by-offer.webp" width="1650" height="540" srcSet="/assets/avx-shots/summary-report-by-offer-1000.webp 1000w, /assets/avx-shots/summary-report-by-offer.webp 1650w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Audio Quality on Every Routed Call</h3>
            <p>
              Routing a call to the right place only matters if the audio actually connects. Avortyx measures the audio quality of every leg it routes and flags{" "}
              <strong>dead air</strong>
              {" "}(you sent audio but the caller's side went silent) and{" "}
              <strong>one-way audio</strong>
              {" "}the moment they happen — so a broken buyer or carrier route can't quietly burn your traffic.
            </p>
            <p>
              Quality, MOS, packet loss, and jitter for inbound callers, buyers, and agents all land in the company-wide{" "}
              <a href="/features/call_tracking.html#audio-quality">Audio Quality dashboard</a>
              , where a geographic and per-codec view helps you catch regional or carrier problems before they cost you conversions.
            </p>
            <p className="text-muted mb-1">
              <strong>Catch bad routes early.</strong>
              {" "}Audio quality, MOS, packet loss, and jitter across every routed leg.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/audio-quality-dashboard.webp">
              <img alt="Avortyx Audio Quality dashboard for routed calls" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/audio-quality-dashboard.webp" width="1600" height="845" srcSet="/assets/avx-shots/audio-quality-dashboard-1000.webp 1000w, /assets/avx-shots/audio-quality-dashboard.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p className="text-muted mb-1">
              <strong>Pinpoint the problem.</strong>
              {" "}Break every metric down by direction and leg role, with the lowest-quality states surfaced.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/audio-quality-breakdowns.webp">
              <img alt="Avortyx Audio Quality breakdowns by direction and leg role, with the lowest-quality states" className="img-fluid rounded border my-3" src="/assets/avx-shots/audio-quality-breakdowns.webp" width="1600" height="796" srcSet="/assets/avx-shots/audio-quality-breakdowns-1000.webp 1000w, /assets/avx-shots/audio-quality-breakdowns.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/buyer_management.html" className="btn btn-td-green">Buyer Management</a>
              {" "}
              <a href="/features/call_tracking.html" className="btn btn-outline-td-green">Call Tracking</a>
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
