// /
export const meta = {
  title: "Avortyx Prototype · Call Tracking & Lead Automation",
  description: "Call tracking, real-time ping/post and lead-to-call automation in one platform. Route every call to the right buyer and see the revenue behind it.",
  ogTitle: "Avortyx Prototype",
  bodyClass: "pages home ",
  layout: "site",
  bootStyle: "html.avx-boot main > :not(.marketing-hero-simple) { opacity: 0 !important; animation: none !important; }",
  head: (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://avortyx-prototype.vercel.app/#org","name":"Avortyx","url":"https://avortyx-prototype.vercel.app/","logo":"https://avortyx-prototype.vercel.app/favicon-192.png"},{"@type":"SoftwareApplication","name":"Avortyx","applicationCategory":"BusinessApplication","operatingSystem":"Web","url":"https://avortyx-prototype.vercel.app/","image":"https://avortyx-prototype.vercel.app/og-image.png?v=2","description":"Call tracking, real-time ping/post and lead-to-call automation in one platform. Route every call to the right buyer and see the revenue behind it.","publisher":{"@id":"https://avortyx-prototype.vercel.app/#org"}}]}` }} />
      <style dangerouslySetInnerHTML={{ __html: `
    /* Hero rings: centered behind the h1, tilted in 3D and slowly spinning */
    .hero-heading { position: relative; }
    .hero-heading h1 { position: relative; z-index: 1; }
    .hero-rings {
      position: absolute; top: 50%; left: 50%; z-index: 0;
      width: min(1040px, 150vw); aspect-ratio: 1;
      transform: translate(-50%, -50%);
      perspective: 1400px;
      pointer-events: none;
    }
    .hero-rings-tilt {
      width: 100%; height: 100%;
      transform-style: preserve-3d;
      animation: heroRingsTilt 18s ease-in-out infinite alternate;
    }
    .hero-rings img {
      display: block; width: 100%; height: 100%; max-width: none;
      opacity: .55;
      /* pre-rendered art (assets/avx-baked): already blue on transparent, no runtime filters */
      animation: heroRingsSpin 48s linear infinite;
      will-change: transform;
    }
    [data-bs-theme="dark"] .hero-rings img { opacity: .8; }
    @keyframes heroRingsSpin { to { transform: rotateZ(360deg); } }
    @keyframes heroRingsTilt {
      0% { transform: rotateX(30deg) rotateY(-14deg); }
      50% { transform: rotateX(16deg) rotateY(4deg); }
      100% { transform: rotateX(26deg) rotateY(14deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-rings-tilt, .hero-rings img { animation: none; }
      .hero-rings-tilt { transform: rotateX(24deg); }
    }
` }} />
    </>
  ),
}

export default function Home() {
  return (
    <main>
      <section className="marketing-hero-simple hero-constellation-bg avx-hero-calm" id="hero-option-s">
        <div className="avx-hero-3d" aria-hidden="true">
          <div className="avx-hero-3d-plane">
            <div className="avx-hero-3d-grid" />
          </div>
          <div className="avx-hero-3d-horizon" />
        </div>
        <div className="container">
          <div className="avx-hero-grid">
            <div className="avx-hero-copy">
              <a className="avx-ribbon" href="/features/transcriptions.html">
                <span>AI</span>
                Summaries, sentiment and topics on every call
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
              <div className="hero-heading">
                <h1 className="display-4 fw-bold">
                  Intelligent call routing.
                  <br />
                  {" "}
                  <span className="text-success">Real-time ping/post.</span>
                  <br />
                  {" "}Total visibility.
                </h1>
              </div>
              <p className="lead hero-lead">
                Route every call to the right buyer, run ping trees in real time and see the{" "}
                <strong>revenue</strong>
                {" "}behind each one.
              </p>
              <div className="d-flex flex-wrap gap-3 avx-hero-ctas">
                <a href="/p/request_demo.html" className="btn btn-outline-td-green btn-lg fw-semibold">Request Demo</a>
                {" "}
                <a href="#product-tour" className="btn avx-btn-ghost avx-hero-ghost">See it live <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            {/* live decision: one call scored, bid on and routed; motion.js replays it with new calls */}
            <div className="avx-decide" data-avx-decide="" aria-label="Live demo: an incoming call is scored for intent and sentiment, three buyers bid, and it is routed to the winner">
              <div className="avx-dc-bar">
                <span className="avx-dc-live"><i className="avx-live-dot" />Live decision</span>
                {" "}
                <span className="avx-dc-id" data-dc="id">Call #48,213</span>
                {" "}
                <span className="avx-dc-time">Decided in <b data-dc="ms">84ms</b></span>
              </div>
              <div className="avx-dc-steps">
                <div className="avx-dc-step avx-dc-on" data-step="call">
                  <p className="avx-dc-k"><span>01</span>Incoming call</p>
                  <p className="avx-dc-num" data-dc="num">(312) 555-0142</p>
                  <p className="avx-dc-meta" data-dc="meta">Google Ads · Medicare · Chicago, IL</p>
                  <p className="avx-dc-quote" data-dc="quote">“Hi, I’m looking to switch my Medicare plan before the deadline.”</p>
                </div>
                <div className="avx-dc-step avx-dc-on" data-step="score">
                  <p className="avx-dc-k"><span>02</span>AI score</p>
                  <div className="avx-dc-intent"><b data-dc="intent">0.91</b><span>intent</span></div>
                  <div className="avx-dc-meter"><i data-dc="intent-bar" style={{ "--v": ".91" }} /></div>
                  <p className="avx-dc-sent">Sentiment <b data-dc="sent">Positive</b></p>
                  <p className="avx-dc-tags" data-dc="tags"><span>Plan switch</span><span>Deadline</span><span>Ready to enroll</span></p>
                </div>
                <div className="avx-dc-step avx-dc-on" data-step="bids">
                  <p className="avx-dc-k"><span>03</span>Buyers bidding</p>
                  <ul className="avx-dc-bids" data-dc="bids">
                    <li className="avx-dc-win"><span>Apex Insurance</span><i style={{ "--v": "1" }} /><b>$64</b></li>
                    <li><span>Meridian Health</span><i style={{ "--v": ".9" }} /><b>$58</b></li>
                    <li><span>Northwind Benefits</span><i style={{ "--v": ".81" }} /><b>$52</b></li>
                  </ul>
                </div>
                <div className="avx-dc-step avx-dc-on" data-step="route">
                  <p className="avx-dc-k"><span>04</span>Routed</p>
                  <p className="avx-dc-to">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    <b data-dc="winner">Apex Insurance</b>
                  </p>
                  <p className="avx-dc-meta" data-dc="why">Highest bid · intent above 0.80 · licensed in IL</p>
                  <p className="avx-dc-pay"><span>Payout</span><b data-dc="pay">$64.00</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="avx-trust" aria-label="Works with">
        <div className="container">
          <p className="avx-trust-label">Plugs into the carriers and ad platforms you already run</p>
        </div>
        <div className="avx-marquee">
          <ul className="avx-marquee-track avx-marquee-color">
            <li><img alt="Twilio" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Telnyx" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Plivo" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Google Ads" src="/assets/avx-site/img/ga.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Voluum" src="/assets/avx-site/img/voluum.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Cake" src="/assets/avx-site/img/cake.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Linktrust" src="/assets/avx-site/img/linktrust.png" loading="lazy" decoding="async" /></li>
            <li><img alt="HasOffers" src="/assets/avx-site/img/hasoffers.png" loading="lazy" decoding="async" /></li>
            <li><img alt="OnSIP" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Avoxi" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Zadarma" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" /></li>
            <li><img alt="Sonetel" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/ga.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/voluum.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/cake.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/linktrust.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/hasoffers.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" /></li>
            <li aria-hidden="true"><img alt="" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" /></li>
          </ul>
        </div>
      </section>
      <section className="mktg-section avx-lf-sec">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <h2 className="fw-bold">Everything you need to convert leads into calls</h2>
            <p className="text-muted">Powerful tools to track, route, and optimize every conversation.</p>
          </div>
          <div className="mktg-lead-flow avx-flow3d avx-lf2 avx-lf3 d-none d-lg-block mt-5">
            <div className="hero-simple-flow">
              <div className="hero-simple-node hero-simple-node-leads">
                <div className="hero-simple-node-icon"><i className="fa-solid fa-headset" aria-hidden="true" /></div>
                <div className="hero-simple-node-label">Leads</div>
                <div className="hero-simple-node-sources">Calls · Forms · API</div>
              </div>
              <div className="hero-simple-arrow">
                <div className="hero-simple-arrow-track">
                  <div className="hero-simple-arrow-dot" />
                </div>
                <div className="hero-simple-step-labels"><span>Route</span> <span>Match</span></div>
              </div>
              <div className="hero-simple-hub">
                <div className="hero-simple-hub-icon"><i className="fa-solid fa-bolt" aria-hidden="true" /></div>
                <div className="hero-simple-hub-name">Avortyx</div>
              </div>
              <div className="hero-simple-arrow">
                <div className="hero-simple-arrow-track">
                  <div className="hero-simple-arrow-dot hero-simple-arrow-dot-delayed" />
                </div>
                <div className="hero-simple-step-labels"><span>Connect</span> <span>Convert</span></div>
              </div>
              <div className="hero-simple-node hero-simple-node-revenue">
                <div className="hero-simple-node-icon hero-simple-node-icon-success"><i className="fa-solid fa-dollar-sign" aria-hidden="true" /></div>
                <div className="hero-simple-node-label">Revenue</div>
                <div className="hero-simple-node-sources">Buyers · Conversions</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-tour" id="product-tour" data-avx-tour="">
        <div className="container">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Product tour</p>
            <h2 className="fw-bold">Every call, ping and dollar, as it happens</h2>
            <p className="text-muted">One workspace for tracking, routing, bidding and reporting.</p>
          </div>
          <div className="avx-tour-tabs" role="tablist" aria-label="Product views" />
          <div className="avx-tour-stage" />
        </div>
      </section>
      <section className="mktg-section avx-ai" id="ai-at-work" data-avx-ai="">
        <div className="container">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">AI at work</p>
            <h2 className="fw-bold">Ask it. Hear it. Let it take the call.</h2>
            <p className="text-muted">Answers from your call data, transcripts that score themselves, and voice agents that qualify callers before a buyer is dialed.</p>
          </div>
          <div className="avx-tour-tabs avx-ai-tabs" role="tablist" aria-label="AI demos">
            <button type="button" className="avx-tour-tab avx-on" role="tab" aria-selected="true" aria-controls="avx-ai-ask" id="avx-ai-tab-ask" data-ai="ask">
              <span><i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> Ask Avortyx</span>
            </button>
            {" "}
            <button type="button" className="avx-tour-tab" role="tab" aria-selected="false" aria-controls="avx-ai-listen" id="avx-ai-tab-listen" data-ai="listen" tabIndex="-1">
              <span><i className="fa-solid fa-wave-square" aria-hidden="true" /> Live transcript</span>
            </button>
            {" "}
            <button type="button" className="avx-tour-tab" role="tab" aria-selected="false" aria-controls="avx-ai-voice" id="avx-ai-tab-voice" data-ai="voice" tabIndex="-1">
              <span><i className="fa-solid fa-headset" aria-hidden="true" /> Voice agent</span>
            </button>
          </div>
          <div className="avx-ai-panel avx-on" id="avx-ai-ask" role="tabpanel" aria-labelledby="avx-ai-tab-ask" data-panel="ask">
            <div className="avx-console avx-ask">
              <div className="avx-cs-bar">
                <i />
                <i />
                <i />
                <span className="avx-cs-path">app.avortyx.com / <b>ask</b></span>
                <span className="avx-cs-live"><i className="avx-live-dot" />AI</span>
              </div>
              <div className="avx-ask-log" aria-live="polite">
                <div className="avx-ask-hello">
                  <span className="avx-ask-av" aria-hidden="true" />
                  <p>Ask anything about your calls, sources and buyers. Try one of these:</p>
                </div>
              </div>
              <div className="avx-ask-chips">
                <button type="button" data-q="margin">Which traffic source had the best margin last week?</button>
                {" "}
                <button type="button" data-q="drop">Why did connect rate dip yesterday afternoon?</button>
                {" "}
                <button type="button" data-q="buyer">Which buyer should get more Medicare calls?</button>
                {" "}
                <button type="button" data-q="today">Summarize today’s calls</button>
              </div>
              <form className="avx-ask-form">
                <input type="text" name="q" autoComplete="off" placeholder="Ask about your calls, buyers or sources…" aria-label="Ask Avortyx a question" />
                {" "}
                <button type="submit" aria-label="Ask"><i className="fa-solid fa-arrow-up" aria-hidden="true" /></button>
              </form>
              <div className="avx-cs-foot">Answers drawn from your workspace · demo data</div>
            </div>
          </div>
          <div className="avx-ai-panel" id="avx-ai-listen" role="tabpanel" aria-labelledby="avx-ai-tab-listen" data-panel="listen" hidden>
            <div className="avx-console avx-listen">
              <div className="avx-cs-bar">
                <i />
                <i />
                <i />
                <span className="avx-cs-path">app.avortyx.com / calls / <b>live transcript</b></span>
                <span className="avx-cs-live"><i className="avx-live-dot" />Live</span>
              </div>
              <div className="avx-listen-body">
                <div className="avx-listen-main">
                  <div className="avx-listen-head">
                    <span className="avx-listen-wave" aria-hidden="true" />
                    {" "}
                    <span><b>(415) 555-0133</b> → Apex Insurance</span>
                    {" "}
                    <span className="avx-listen-clock" data-ls="clock">0:00</span>
                  </div>
                  <ol className="avx-listen-lines" data-ls="lines" />
                </div>
                <aside className="avx-listen-side">
                  <p className="avx-listen-k">Sentiment</p>
                  <svg className="avx-listen-spark" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true">
                    <path data-ls="spark" d="M0 24" />
                  </svg>
                  <p className="avx-listen-k">Topics</p>
                  <p className="avx-listen-topics" data-ls="topics" />
                  <p className="avx-listen-k">AI summary</p>
                  <p className="avx-listen-sum" data-ls="sum">Builds as the call goes on…</p>
                </aside>
              </div>
              <div className="avx-cs-foot">Transcribed, scored and summarized in real time · demo data</div>
            </div>
          </div>
          <div className="avx-ai-panel" id="avx-ai-voice" role="tabpanel" aria-labelledby="avx-ai-tab-voice" data-panel="voice" hidden>
            <div className="avx-console avx-voice">
              <div className="avx-cs-bar">
                <i />
                <i />
                <i />
                <span className="avx-cs-path">app.avortyx.com / voice agents / <b>medicare intake</b></span>
                <span className="avx-cs-live"><i className="avx-live-dot" />Agent</span>
              </div>
              <div className="avx-voice-body">
                <div className="avx-voice-orb" aria-hidden="true"><i /><i /><i /></div>
                <div className="avx-voice-main">
                  <p className="avx-voice-state" data-vc="state">Ready · press play to hear a sample call</p>
                  <button type="button" className="avx-voice-play" data-vc="play">
                    <i className="fa-solid fa-play" aria-hidden="true" />
                    <span>Play sample call</span>
                  </button>
                  <ol className="avx-voice-lines" data-vc="lines" aria-live="polite" />
                  <ul className="avx-voice-steps" data-vc="steps">
                    <li>Greets and confirms consent</li>
                    <li>Qualifies: age, ZIP, current plan</li>
                    <li>Scores intent</li>
                    <li>Warm-transfers to the best buyer</li>
                  </ul>
                </div>
              </div>
              <div className="avx-cs-foot">Voice agents through the ElevenLabs integration · this sample uses your browser’s voice</div>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-how" id="how-it-decides">
        <div className="container">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">How it decides</p>
            <h2 className="fw-bold">Signal. Score. Route.</h2>
            <p className="text-muted">Every call goes through the same three steps before a buyer’s phone rings.</p>
          </div>
          <div className="avx-how-flow" data-avx-how="">
            <div className="avx-how-step">
              <span className="avx-how-n">01</span>
              {" "}
              <i className="avx-how-ic fa-solid fa-tower-broadcast" aria-hidden="true" />
              <h3>Signal</h3>
              <p>Everything known the moment the call connects.</p>
              <ul>
                <li>Caller ID and line type</li>
                <li>Source, campaign and keyword</li>
                <li>Geo, time and day</li>
                <li>The caller’s first words</li>
              </ul>
            </div>
            <div className="avx-how-link" aria-hidden="true"><i /></div>
            <div className="avx-how-step">
              <span className="avx-how-n">02</span>
              {" "}
              <i className="avx-how-ic fa-solid fa-brain" aria-hidden="true" />
              <h3>Score</h3>
              <p>The call is screened and scored before anyone is dialed.</p>
              <ul>
                <li>Intent and sentiment</li>
                <li>Spam and duplicate checks</li>
                <li>TCPA, DNC and VOIP screening</li>
                <li>State rules and consent</li>
              </ul>
            </div>
            <div className="avx-how-link" aria-hidden="true"><i /></div>
            <div className="avx-how-step">
              <span className="avx-how-n">03</span>
              {" "}
              <i className="avx-how-ic fa-solid fa-route" aria-hidden="true" />
              <h3>Route</h3>
              <p>The best eligible buyer wins the call.</p>
              <ul>
                <li>Buyer match rules</li>
                <li>Live bids and ping/post</li>
                <li>Caps, hours and concurrency</li>
                <li>Failover if a buyer misses</li>
              </ul>
            </div>
          </div>
          <p className="avx-how-note"><b>85ms</b> average routing time, from first ring to buyer.</p>
        </div>
      </section>
      <section className="mktg-section avx-feat">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="mktg-spotlight-visual" data-avx-demo="pingpost">
                <div className="spotlight-flow-steps">
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-building" aria-hidden="true" />
                    {" "}
                    <span><strong>Publisher</strong> — Sends lead data</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-satellite-dish" aria-hidden="true" />
                    {" "}
                    <span><strong>PING</strong> — Check available buyers, get bids</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-filter" aria-hidden="true" />
                    {" "}
                    <span><strong>Buyer Matching</strong> — Hours, caps, geo, filters, duplicates</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-flip" aria-hidden="true" />
                    {" "}
                    <span><strong>POST</strong> — Get tracking number for the call</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    {" "}
                    <span><strong>Connected</strong> — Caller routes to selected buyer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <p className="avx-eyebrow">Monetize</p>
                <h2 className="fw-bold mb-3">Ping/Post</h2>
              </div>
              <p className="text-muted">Real-time bidding for inbound calls — connect every lead to the buyer who values it most.</p>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  10+ buyer matching criteria, checked in real time
                </li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Route by bid, priority, or earnings-per-call</li>
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  Static and live webhook bidders in one auction
                </li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Per-buyer ping caps by minute, hour, or day</li>
              </ul>
              <a className="avx-more-link mt-3" href="/features/ping_post.html">Explore Ping/Post <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-feat">
        <div className="container">
          <div className="row align-items-center g-5 flex-row-reverse">
            <div className="col-lg-6">
              <div className="mktg-spotlight-visual" data-avx-demo="dialer">
                <div className="spotlight-flow-steps">
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-users" aria-hidden="true" />
                    {" "}
                    <span><strong>Leads Queue</strong> — Leads enter via API, import, actions, and more</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-headset" aria-hidden="true" />
                    {" "}
                    <span><strong>Agent Available</strong> — Agent on the line, ready for the next call</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-volume" aria-hidden="true" />
                    {" "}
                    <span><strong>Place Call</strong> — Dials the next lead when an agent is free</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-flip" aria-hidden="true" />
                    {" "}
                    <span><strong>Connected</strong> — Live answer bridged to agent</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-clipboard-check" aria-hidden="true" />
                    {" "}
                    <span><strong>Disposition</strong> — Agent selects outcome, next lead</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <p className="avx-eyebrow">Dial</p>
                <h2 className="fw-bold mb-3">Power Dialer</h2>
              </div>
              <p className="text-muted">Continuous outbound dialing that keeps agents talking, not waiting.</p>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  Places the next call the moment an agent is free
                </li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Answering-machine screening</li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Built-in WebRTC softphone, no downloads</li>
              </ul>
              <a className="avx-more-link mt-3" href="/features/agent_controls.html#power-dialer">
                Explore the Power Dialer{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-feat">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="mktg-spotlight-visual" data-avx-demo="tracking">
                <div className="spotlight-flow-steps">
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-flip" aria-hidden="true" />
                    {" "}
                    <span><strong>Inbound Call</strong> — Caller dials your tracking number</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-message" aria-hidden="true" />
                    {" "}
                    <span><strong>IVR Greeting</strong> — Menu and keypress collection</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-diagram-project" aria-hidden="true" />
                    {" "}
                    <span><strong>Smart Routing</strong> — Route by tier, bid, or EPC</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-users" aria-hidden="true" />
                    {" "}
                    <span><strong>Ring Buyers</strong> — In priority order or all at once</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    {" "}
                    <span><strong>Connected</strong> — Call bridged to the buyer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <p className="avx-eyebrow">Route</p>
                <h2 className="fw-bold mb-3">Call Tracking</h2>
              </div>
              <p className="text-muted">Build call flows that send every caller to the right buyer.</p>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Tier/weight priority with capacity caps</li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Simultaneous ring — first to answer wins</li>
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  Question & Answer flows that qualify and route callers
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  AI Voice Agent flows that answer and pre-qualify
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  Whisper messages and answering-machine detection
                </li>
              </ul>
              <a className="avx-more-link mt-3" href="/features/call_tracking.html">
                Explore Call Tracking & Routing{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-feat">
        <div className="container">
          <div className="row align-items-center g-5 flex-row-reverse">
            <div className="col-lg-6">
              <div className="mktg-spotlight-visual" data-avx-demo="automation">
                <div className="spotlight-flow-steps">
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-user-plus" aria-hidden="true" />
                    {" "}
                    <span><strong>Lead Enters</strong> — Via web form, API, or import</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-comment-sms" aria-hidden="true" />
                    {" "}
                    <span><strong>Outreach</strong> — Optional SMS, email, or webhook actions</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-clock" aria-hidden="true" />
                    {" "}
                    <span><strong>Wait</strong> — Configurable delay between steps</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-volume" aria-hidden="true" />
                    {" "}
                    <span><strong>Call</strong> — Optionally call the lead, route to a buyer</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-rotate" aria-hidden="true" />
                    {" "}
                    <span><strong>Repeat</strong> — More attempts, or complete</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <p className="avx-eyebrow">Automate</p>
                <h2 className="fw-bold mb-3">Lead Automation</h2>
              </div>
              <p className="text-muted">Turn web leads into live calls with automated SMS, email, and dialing.</p>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />SMS, email, and outbound call sequences</li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Conditional branching and retry logic</li>
                <li className="mb-2">
                  <i className="fa-solid fa-check text-success me-2" aria-hidden="true" />
                  Scheduled callbacks with daylight-hours awareness
                </li>
              </ul>
              <a className="avx-more-link mt-3" href="/features/lead_automation.html">
                Explore Lead Automation{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-feat">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="mktg-spotlight-visual" data-avx-demo="agent">
                <div className="spotlight-flow-steps">
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-headset" aria-hidden="true" />
                    {" "}
                    <span><strong>Agent Online</strong> — Connects via WebRTC softphone</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-clipboard-list" aria-hidden="true" />
                    {" "}
                    <span><strong>Interview</strong> — Guided scripts to qualify the caller</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-phone-flip" aria-hidden="true" />
                    {" "}
                    <span><strong>Transfer</strong> — Hand the call to a buyer</span>
                  </div>
                  <div className="spotlight-flow-arrow"><i className="fa-solid fa-arrow-down" aria-hidden="true" /></div>
                  <div className="spotlight-flow-step">
                    <i className="fa-solid fa-tag" aria-hidden="true" />
                    {" "}
                    <span><strong>Disposition</strong> — Tag the outcome, trigger follow-up actions</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mktg-section-header">
                <p className="avx-eyebrow">Manage</p>
                <h2 className="fw-bold mb-3">Agent Control Center</h2>
              </div>
              <p className="text-muted">Run your whole call center from one screen.</p>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Interview and qualify callers</li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Transfer to buyers or other agents</li>
                <li className="mb-2"><i className="fa-solid fa-check text-success me-2" aria-hidden="true" />Disposition calls and schedule callbacks</li>
              </ul>
              <a className="avx-more-link mt-3" href="/features/agent_controls.html#agent-control-center">
                Explore the Agent Control Center{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-win">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Platform</p>
            <h2 className="fw-bold mb-3">More ways to win the call</h2>
            <p className="text-muted">The rest of the platform that turns every connected call into revenue.</p>
          </div>
          <div className="row g-4 text-start">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm avx-win-card">
                <div className="avx-mini avx-mini-voice" data-avx-mini="voice" aria-hidden="true">
                  <div className="avx-mv-line avx-mv-ai"><i className="avx-mv-who">AI</i><span>Are you currently insured?</span></div>
                  <div className="avx-mv-line avx-mv-caller"><span>Yes, with GEICO.</span></div>
                  <div className="avx-mv-tag"><i className="fa-solid fa-right-left" aria-hidden="true" />Warm transfer → Apex Insurance</div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="h5 fw-bold mb-2">AI Voice Agents</h3>
                  <p className="text-muted small mb-3">Voice agents plugged straight into your call flow — they answer 24/7, qualify leads, and warm-transfer to humans through the same buyers, caps, and tiers you already use.</p>
                  <a href="/features/voice_agents.html" className="avx-more-link mt-auto">
                    Explore Voice Agents{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm avx-win-card">
                <div className="avx-mini avx-mini-analytics" data-avx-mini="analytics" aria-hidden="true">
                  <div className="avx-ma-kpi"><span>Revenue today</span><b>$84,210</b><em>▲ 8.1%</em></div>
                  <div className="avx-ma-chart" />
                  <div className="avx-ma-src">Top source <b>Google Ads</b> · <span>38%</span> of calls</div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="h5 fw-bold mb-2">Call Analytics</h3>
                  <p className="text-muted small mb-3">See exactly what drives revenue — real-time dashboards for calls, conversions, and spend that reveal your best campaigns, traffic sources, and keywords.</p>
                  <a href="/features/call_tracking.html#reports-analytics" className="avx-more-link mt-auto">
                    Explore Call Analytics{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm avx-win-card">
                <div className="avx-mini avx-mini-api" data-avx-mini="api" aria-hidden="true">
                  <div className="avx-mapi-req"><b>POST</b> /v1/calls <em>201 · 84 ms</em></div>
                  <pre className="avx-mapi-res"><code>{"{\n  "}<i>{"\"id\""}</i>{": "}<s>{"\"call_8f2k1x\""}</s>{",\n  "}<i>{"\"buyer\""}</i>{": "}<s>{"\"Apex Insurance\""}</s>{",\n  "}<i>{"\"payout\""}</i>{": "}<u>{"45.00"}</u>{"\n}"}</code></pre>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="h5 fw-bold mb-2">REST API</h3>
                  <p className="text-muted small mb-3">A fully programmable, API-first platform. Every resource is exposed over a clean REST API — with granular keys, IP controls, and audit logs — so you can run Avortyx from your own tools.</p>
                  <a href="/features/api.html" className="avx-more-link mt-auto">Explore the REST API <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-caps">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Capabilities</p>
            <h2 className="fw-bold mb-3">More Capabilities</h2>
          </div>
          <div className="avx-cap-grid avx-bento text-start" data-avx-bento="">
            <a href="/features/spam_tag_mitigation.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-shield-halved" aria-hidden="true" />
              {" "}
              <b>Spam Tag Mitigation</b>
              {" "}
              <span>Branded caller ID and spam-label removal, so more of your calls get answered.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/dynamic_number_insertion.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-hashtag" aria-hidden="true" />
              {" "}
              <b>Dynamic Number Insertion</b>
              {" "}
              <span>Swap tracking numbers on your site to tie every call to its source.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/custom_webhook.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-link" aria-hidden="true" />
              {" "}
              <b>Custom Webhooks</b>
              {" "}
              <span>Send call and lead data to any endpoint the moment events happen.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/formulas.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-square-root-variable" aria-hidden="true" />
              {" "}
              <b>Expressions & Functions</b>
              {" "}
              <span>Formulas for routing rules, data transformations and calculations.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/transcriptions.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-closed-captioning" aria-hidden="true" />
              {" "}
              <b>AI Transcriptions</b>
              {" "}
              <span>Every recorded call transcribed, with summaries, sentiment and topics.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/call_recordings.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-microphone-lines" aria-hidden="true" />
              {" "}
              <b>Call Recordings</b>
              {" "}
              <span>Record every call, control who can hear it, retain on your schedule.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features/data_export.html" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-file-export" aria-hidden="true" />
              {" "}
              <b>Data Exports</b>
              {" "}
              <span>Calls, leads and recordings to CSV, on demand or on a schedule.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
            {" "}
            <a href="/features.html#security-compliance-tools" className="avx-cap">
              {" "}
              <i className="avx-cap-ic fa-solid fa-scale-balanced" aria-hidden="true" />
              {" "}
              <b>Security & Compliance</b>
              {" "}
              <span>Consent, suppression lists, PII redaction and state rules built in.</span>
              {" "}
              <em aria-hidden="true">→</em>
              {" "}
            </a>
          </div>
          <div className="mt-5"><a href="/features.html" className="btn avx-btn-ghost">See All Features</a></div>
        </div>
      </section>
      <section className="mktg-section avx-int">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Integrations</p>
            <h2 className="fw-bold mb-3">We Integrate With</h2>
            <p className="text-muted">Connect Avortyx to the tools you already use.</p>
          </div>
          <div className="avx-int-rows">
            <div className="avx-int-row">
              <div className="avx-int-track">
                <a href="/features/voice_agents/elevenlabs.html" className="avx-int-tile">
                  <img alt="ElevenLabs" src="/assets/avx-site/img/elevenlabs.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/zoho_crm.html" className="avx-int-tile">
                  <img alt="Zoho CRM" src="/assets/avx-site/img/zoho_crm.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/aws_s3.html" className="avx-int-tile">
                  <img alt="AWS S3" src="/assets/avx-site/img/aws_s3.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/cake.html" className="avx-int-tile">
                  <img alt="Cake" src="/assets/avx-site/img/cake.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/adwords.html" className="avx-int-tile">
                  <img alt="Google Ads" src="/assets/avx-site/img/ga.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/hasoffers.html" className="avx-int-tile">
                  <img alt="HasOffers" src="/assets/avx-site/img/hasoffers.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/infusionsoft.html" className="avx-int-tile">
                  <img alt="Infusionsoft" src="/assets/avx-site/img/infusionsoft-blue.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/linktrust.html" className="avx-int-tile">
                  <img alt="Linktrust" src="/assets/avx-site/img/linktrust.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/voice_agents/elevenlabs.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/elevenlabs.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/zoho_crm.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/zoho_crm.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/aws_s3.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/aws_s3.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/cake.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/cake.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/adwords.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/ga.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/hasoffers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/hasoffers.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/infusionsoft.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/infusionsoft-blue.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/linktrust.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/linktrust.png" loading="lazy" decoding="async" />
                </a>
              </div>
            </div>
            <div className="avx-int-row avx-int-rev">
              <div className="avx-int-track">
                <a href="/features/mailchimp.html" className="avx-int-tile">
                  <img alt="MailChimp" src="/assets/avx-site/img/mailchimp.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/mailgun.html" className="avx-int-tile">
                  <img alt="Mailgun" src="/assets/avx-site/img/mailgun.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/salesforce.html" className="avx-int-tile">
                  <img alt="Salesforce" src="/assets/avx-site/img/salesforce.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/sendgrid.html" className="avx-int-tile">
                  <img alt="Sendgrid" src="/assets/avx-site/img/sendgrid.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/slack.html" className="avx-int-tile">
                  <img alt="Slack" src="/assets/avx-site/img/slack.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/typeform.html" className="avx-int-tile">
                  <img alt="Typeform" src="/assets/avx-site/img/typeform.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/voluum.html" className="avx-int-tile">
                  <img alt="Voluum" src="/assets/avx-site/img/voluum.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/zapier.html" className="avx-int-tile">
                  <img alt="Zapier" src="/assets/avx-site/img/zapier.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/mailchimp.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/mailchimp.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/mailgun.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/mailgun.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/salesforce.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/salesforce.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/sendgrid.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/sendgrid.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/slack.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/slack.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/typeform.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/typeform.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/voluum.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/voluum.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/zapier.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/zapier.png" loading="lazy" decoding="async" />
                </a>
              </div>
            </div>
          </div>
          <a href="/features/integrations.html" className="btn avx-btn-ghost">View All Integrations</a>
        </div>
      </section>
      <section className="mktg-section avx-int avx-voip">
        <div className="container text-center">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Carriers</p>
            <h2 className="fw-bold mb-3">Bring Your Own VoIP</h2>
            <p className="text-muted">Use your preferred telephony provider — bring your own SIP-compatible carrier.</p>
          </div>
          <div className="avx-int-rows avx-int-voip">
            <div className="avx-int-row avx-int-rev">
              <div className="avx-int-track">
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Plivo" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Telnyx" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Twilio" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Zadarma" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Sonetel" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="OnSIP" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile">
                  <img alt="Avoxi" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/plivo.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/telnyx.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/twilio.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/zadarma.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/sonetel.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/onsip.png" loading="lazy" decoding="async" />
                </a>
                <a href="/features/multiple_telephone_providers.html" className="avx-int-tile" aria-hidden="true" tabIndex="-1">
                  <img alt="" src="/assets/avx-site/img/avoxi.png" loading="lazy" decoding="async" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mktg-section avx-proof" id="trust">
        <div className="container">
          <div className="mktg-section-header text-center">
            <p className="avx-eyebrow">Built to be trusted</p>
            <h2 className="fw-bold">Fast, reliable and compliant by default</h2>
            <p className="text-muted">Screening and controls run on every call, before anyone is dialed.</p>
          </div>
          <div className="avx-proof-stats">
            <div><b className="avx-proof-num">99.9%</b><span>Uptime</span></div>
            <div><b className="avx-proof-num">85ms</b><span>Avg routing time</span></div>
            <div><b className="avx-proof-num">10+</b><span>Buyer match rules</span></div>
          </div>
          <div className="avx-trust-grid">
            <a href="/features/suppression_lists.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-ban" aria-hidden="true" />
              {" "}
              <b>TCPA, DNC and VOIP screening</b>
              {" "}
              <span>DNC checks, suppression lists and blacklists run before any call routes or dials.</span>
              {" "}
            </a>
            {" "}
            <a href="/features/consent_opt_out.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-file-signature" aria-hidden="true" />
              {" "}
              <b>Consent and opt-out</b>
              {" "}
              <span>A verifiable consent record for every lead, and opt-outs honored automatically.</span>
              {" "}
            </a>
            {" "}
            <a href="/features/pii_redaction.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-user-shield" aria-hidden="true" />
              {" "}
              <b>PII redaction</b>
              {" "}
              <span>Clear or hash PII from aged data, restrict sensitive fields and redact transcriptions.</span>
              {" "}
            </a>
            {" "}
            <a href="/features/state_rules.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-map-location-dot" aria-hidden="true" />
              {" "}
              <b>State rules</b>
              {" "}
              <span>Calling-hour windows, holiday blackouts and contact limits, enforced state by state.</span>
              {" "}
            </a>
            {" "}
            <a href="/features/verified_identity.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-id-card" aria-hidden="true" />
              {" "}
              <b>Verified identity</b>
              {" "}
              <span>KYC, KYB and STIR/SHAKEN keep your numbers trusted by carriers.</span>
              {" "}
            </a>
            {" "}
            <a href="/features/spam_tag_mitigation.html" className="avx-trust-item">
              {" "}
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              {" "}
              <b>Spam tag mitigation</b>
              {" "}
              <span>Branded caller ID and spam-label removal, so more of your calls get answered.</span>
              {" "}
            </a>
          </div>
        </div>
      </section>
      <section className="marketing-cta-band">
        <div className="marketing-cta-band__bg" aria-hidden="true">
          <img alt="" loading="lazy" src="/assets/avx-site/img/constellation-light.svg" />
        </div>
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
