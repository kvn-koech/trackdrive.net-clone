// /features/call_recordings.html
export const meta = {
  title: "Call Recordings - Secure, Webhook-Ready Recordings with Retention Controls | Avortyx",
  description: "Record every call, control who can hear it, and retain or delete recordings on your compliance schedule.",
  bodyClass: "avortyx_marketing features_call_recordings ",
  layout: "feature",
}

export default function CallRecordings() {
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
          <h1 className="fw-bold mb-2">Call Recordings</h1>
          <p className="lead mktg-subpage-hero-subtitle">Record every call, control who can hear it, and retain or delete recordings on your compliance schedule.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3>Agent, Buyer & Full-Call Recordings</h3>
            <p>
              Avortyx can capture each side of the call separately — the{" "}
              <strong>agent leg</strong>
              , the{" "}
              <strong>buyer leg</strong>
              , and the{" "}
              <strong>full call</strong>
              {" "}— so you review exactly the segment you need for QA, disputes, or coaching.
            </p>
            <h3>Interactive Recording Player</h3>
            <p>
              Every recording plays on an interactive waveform of the agent and customer channels — scrub to any moment with a click. With{" "}
              <a href="/features/transcriptions.html">AI Transcriptions</a>
              {" "}enabled, sentiment markers dot the waveform and the speaker-labeled transcript follows the playhead, so you can jump straight to the moment that matters.
            </p>
            <p className="text-muted mb-1">
              <strong>Scrub, don't skim.</strong>
              {" "}The dual-channel waveform with sentiment markers above a click-to-seek transcript.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-transcription-call-recording.webp">
              <img alt="Interactive call recording waveform with sentiment markers above a speaker-labeled transcript" className="img-fluid rounded border mb-4" src="/assets/avx-shots/features-transcription-call-recording.webp" width="1800" height="1311" srcSet="/assets/avx-shots/features-transcription-call-recording-1000.webp 1000w, /assets/avx-shots/features-transcription-call-recording.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Secure, Access-Controlled Playback</h3>
            <p>With authorization-required playback, a recording opens only for a logged-in user in your account — served through short-lived signed links, not public URLs.</p>
            <h3>Recording-Ready Webhooks</h3>
            <p>A webhook fires the instant a recording becomes available, with separate events for the agent, buyer, and full-call recordings — no polling for audio.</p>
            <h3>Retention Controls</h3>
            <p>
              Set retention rules per call type, offer, schedule, buyer, or traffic source; recordings past their window are scrubbed automatically — a core part of your{" "}
              <a href="/features.html#security-compliance-tools">Security & Compliance Tools</a>
              .
            </p>
            <h3>Bulk Export</h3>
            <p>
              <a href="/features/data_export.html">Data Exports</a>
              {" "}pulls all of your recordings in bulk, one-time or on a recurring schedule.
            </p>
            <h3>Audio Quality on Every Recording</h3>
            <p>
              Every recording carries an{" "}
              <strong>audio quality score</strong>
              {" "}—{" "}
              <strong>MOS</strong>
              , quality,{" "}
              <strong>packet loss</strong>
              , and{" "}
              <strong>jitter</strong>
              {" "}from the RTP media stats, with{" "}
              <strong>dead air</strong>
              {" "}and{" "}
              <strong>one-way audio</strong>
              {" "}flagged — so you can tell a bad call from a bad connection before you press play. Roll it up account-wide in the{" "}
              <a href="/features/call_tracking.html#audio-quality">Audio Quality dashboard</a>
              .
            </p>
            <p className="text-muted mb-1">
              <strong>Quality at a glance.</strong>
              {" "}MOS, packet loss, and jitter rolled up across your account.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/audio-quality-dashboard.webp">
              <img alt="Avortyx Audio Quality dashboard" className="img-fluid rounded border mb-4" src="/assets/avx-shots/audio-quality-dashboard.webp" width="1600" height="845" srcSet="/assets/avx-shots/audio-quality-dashboard-1000.webp 1000w, /assets/avx-shots/audio-quality-dashboard.webp 1600w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/pii_redaction.html" className="btn btn-td-green">PII Redaction</a>
              {" "}
              <a href="/features/data_export.html" className="btn btn-outline-td-green">Data Exports</a>
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
