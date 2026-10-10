// /features/transcriptions.html
export const meta = {
  title: "AI Call Transcriptions - Summaries, Sentiment & Live Analytics | Avortyx",
  description: "Every recorded call, transcribed and enriched with AI: summaries, sentiment, topics, and a live analytics dashboard.",
  bodyClass: "avortyx_marketing premium_services_transcriptions ",
  layout: "feature",
}

export default function Transcriptions() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#ai" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" /> Back to AI </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">AI</p>
          <h1 className="fw-bold mb-2">AI Transcriptions</h1>
          <p className="lead mktg-subpage-hero-subtitle">Every recorded call, transcribed and enriched with AI: summaries, sentiment, topics, and a live analytics dashboard.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How Transcription Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-secondary text-white"><i className="fa-solid fa-phone-flip" /></div>
                  <div className="flow-node-label">Call Ends</div>
                  <div className="flow-node-desc">Recording captured, both channels</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-file-lines" /></div>
                  <div className="flow-node-label">Transcribed</div>
                  <div className="flow-node-desc">Speaker-labeled transcript in minutes</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-wand-magic-sparkles" /></div>
                  <div className="flow-node-label">AI Enrichment</div>
                  <div className="flow-node-desc">Summary, sentiment, topics, entities</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-magnifying-glass" /></div>
                  <div className="flow-node-label">Keyword Spotting</div>
                  <div className="flow-node-desc">Scanned against your keyword groups</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-bolt" /></div>
                  <div className="flow-node-label">Act & Analyze</div>
                  <div className="flow-node-desc">Webhooks fire, dashboards update, every word searchable</div>
                </div>
              </div>
            </div>
            <p>
              Know what happened on every call — without pressing play. Every{" "}
              <a href="/features/call_recordings.html">call recording</a>
              {" "}is transcribed, summarized, scored, and tagged the moment the call ends, so QA and compliance teams spot coaching moments, agent monologues, and negative calls at a glance. Keyword hits fire webhooks and{" "}
              <a href="/features/voice_agents.html">AI Voice Agent</a>
              {" "}handoffs automatically.
            </p>
            <h3>Review Every Conversation</h3>
            <p>From the waveform to the words — every call is playable, readable, and searchable.</p>
            <p className="text-muted mb-1">
              <strong>Hear and read every call.</strong>
              {" "}An interactive waveform of both channels with sentiment markers, above a timestamped, speaker-labeled transcript — click any line to jump the audio there.
            </p>
            <img alt="Interactive call recording waveform with sentiment markers above a speaker-labeled AI transcript" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-call-recording.webp" width="1800" height="1311" srcSet="/assets/avx-shots/features-transcription-call-recording-1000.webp 1000w, /assets/avx-shots/features-transcription-call-recording.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <div className="row">
              <div className="col-md-6">
                <h3>AI insights on every call</h3>
                <ul className="text-muted">
                  <li><strong>AI call summaries</strong> — a written recap of every call.</li>
                  <li><strong>Sentiment analysis</strong> — scored per moment and for the whole call.</li>
                  <li>
                    <strong>Topics, entities & highlights</strong>
                    {" "}— categories tagged, names and places extracted, key phrases surfaced.
                  </li>
                  <li><strong>Language detection</strong> — the spoken language of each call, automatically.</li>
                  <li><strong>Talk-time ratio</strong> — agent vs. customer share, to catch monologues.</li>
                  <li>
                    <strong>Interactive recording player</strong>
                    {" "}— a waveform of the agent and customer channels on every{" "}
                    <a href="/features/call_recordings.html">call recording</a>
                    , with sentiment markers and click-to-seek.
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h3>Search, setup & automation</h3>
                <ul className="text-muted">
                  <li>
                    <strong>Full transcript search</strong>
                    {" "}— filter by sentiment, offer, agent, call center, language, or conversion.
                  </li>
                  <li><strong>One-click per-offer setup</strong> — pick the AI features each offer runs.</li>
                  <li>
                    <strong><a href="/features/pii_redaction.html">PII redaction</a></strong>
                    {" "}— personal, financial, medical, and more.
                  </li>
                  <li>
                    <strong>Keyword spotting & <a href="/features/custom_webhook.html">webhooks</a></strong>
                    {" "}— classify calls and trigger actions.
                  </li>
                  <li>
                    <strong>Post-call or API audio</strong>
                    {" "}— automatic after calls, or submit any audio file on demand via the{" "}
                    <a href="/features/api.html">REST API</a>
                    .
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-muted mb-1">
              <strong>Live in one click.</strong>
              {" "}Enable transcription from the setup page and pick the AI features each offer runs.
            </p>
            <img alt="Transcription setup page with a one-click enable button and AI feature overview" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-setup.webp" width="2000" height="1476" srcSet="/assets/avx-shots/features-transcription-setup-1000.webp 1000w, /assets/avx-shots/features-transcription-setup.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <h3>Search Every Transcript</h3>
            <p>Every word of every call, filterable and findable.</p>
            <p className="text-muted mb-1">
              <strong>Slice every transcript.</strong>
              {" "}Sentiment, topics, keywords, talk ratio, language, and cost — every column filterable and sortable.
            </p>
            <img alt="Transcripts grid with AI insight columns, filters, and sorting" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-transcripts-grid.webp" width="1800" height="831" srcSet="/assets/avx-shots/features-transcription-transcripts-grid-1000.webp 1000w, /assets/avx-shots/features-transcription-transcripts-grid.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <p className="text-muted mb-1">
              <strong>Find the exact moment.</strong>
              {" "}Search every word spoken on every call, with keyword hits highlighted in context.
            </p>
            <img alt="Searching every transcript for a phrase with highlighted matches" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-transcripts-search.webp" width="2000" height="1414" srcSet="/assets/avx-shots/features-transcription-transcripts-search-1000.webp 1000w, /assets/avx-shots/features-transcription-transcripts-search.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <h3>Live Transcription Analytics</h3>
            <p>Every transcript rolls up into a live dashboard the moment it finishes processing — no exports, no waiting.</p>
            <p className="text-muted mb-1">
              <strong>One dashboard for every call.</strong>
              {" "}Volume, sentiment mix, talk ratio, minutes, and cost — live.
            </p>
            <img alt="Avortyx transcription analytics dashboard" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-analytics-dashboard.webp" width="1800" height="1320" srcSet="/assets/avx-shots/features-transcription-analytics-dashboard-1000.webp 1000w, /assets/avx-shots/features-transcription-analytics-dashboard.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <p className="text-muted mb-1">
              <strong>Watch sentiment move.</strong>
              {" "}Positive-sentiment trends by offer, agent, and call center.
            </p>
            <img alt="Positive-sentiment trends by offer, agent, and call center" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-sentiment-breakdowns.webp" width="1800" height="1320" srcSet="/assets/avx-shots/features-transcription-sentiment-breakdowns-1000.webp 1000w, /assets/avx-shots/features-transcription-sentiment-breakdowns.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <p className="text-muted mb-1"><strong>Map it.</strong> Positive sentiment by caller state on a U.S. heat map.</p>
            <img alt="Positive sentiment by caller state on a U.S. heat map" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-sentiment-by-state.webp" width="1800" height="1320" srcSet="/assets/avx-shots/features-transcription-sentiment-by-state-1000.webp 1000w, /assets/avx-shots/features-transcription-sentiment-by-state.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            <h3>Simple Per-Minute Pricing</h3>
            <p>Priced to run on every call: pay a low per-minute rate for transcribed audio, and add only the AI enhancements you want — each priced individually per minute. Language detection is free, there are no seats or platform fees, and every charge is itemized on the analytics dashboard.</p>
            <h3>Automate & Integrate</h3>
            <p className="text-muted mb-1">Not just calls — submit any audio file for transcription with a single API request, and receive the finished transcript at your postback URL:</p>
            <pre>{"curl -H \"Authorization: Basic BASE64_ENCODED_PUBLIC_KEY_AND_PRIVATE_KEY\" \\\n     -H \"Content-Type: application/json\" \\\n     -X POST \\\n     -d '{\"caller_id\": \"+18004506787\",\n          \"file_url\": \"http://example.com/publicly_accessible_file.mp3\",\n          \"postback_url\": \"http://example.com/postback_url\",\n          \"data\": {\"loan_amount\": \"501\", \"custom_token\": \"the_value\"}}' \\\n     \"http://[your-subdomain].avortyx.com/api/v1/standalone_transcriptions\"\n  "}</pre>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/call_recordings.html" className="btn btn-td-green">Call Recordings</a>
              {" "}
              <a href="/features/pii_redaction.html" className="btn btn-outline-td-green">PII Redaction</a>
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
