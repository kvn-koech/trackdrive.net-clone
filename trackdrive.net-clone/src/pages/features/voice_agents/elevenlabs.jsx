// /features/voice_agents/elevenlabs.html
export const meta = {
  title: "ElevenLabs AI Voice Agents | Call Tracking and Analytics | Avortyx",
  description: "Put ElevenLabs voice agents on your inbound and outbound calls in Avortyx, routed with the same buyers, caps and tiers as your live team.",
  bodyClass: "avortyx_marketing features_voice_agents_elevenlabs ",
  layout: "feature",
}

export default function Elevenlabs() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features/integrations.html" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Integrations{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Integrations</p>
          <h1 className="fw-bold mb-2">ElevenLabs</h1>
          <p className="lead mktg-subpage-hero-subtitle">AI Voice Agents in Avortyx. ElevenLabs builds some of the most natural-sounding AI voice agents available today — put them on your inbound and outbound calls in minutes, and route them with the same controls you use for your live team.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p className="text-muted mb-1">
              <strong>Bring your ElevenLabs agents to every call.</strong>
              {" "}Natural-sounding AI voice on your inbound and outbound calls.
            </p>
            <img alt="ElevenLabs" className="img-fluid rounded my-3" width="200" src="/assets/avx-site/img/elevenlabs.jpg" />
            <p>Paste an ElevenLabs API key and Avortyx shows every agent you have built. Pick the ones you want and import them in one click — we handle all the telephony setup.</p>
            <ul className="text-muted">
              <li>
                <strong>One-click import</strong>
                {" "}— we handle the telephony setup; re-import any time to pull in new or edited agents.
              </li>
              <li>
                <strong>Full routing control</strong>
                {" "}— set hours of operation, caps, and concurrency, and run as a primary destination, after-hours fallback, or overflow.
              </li>
              <li>
                <strong>Live data sync</strong>
                {" "}— everything the agent gathers syncs to the call record in real time and powers your reporting.
              </li>
            </ul>
            <h3>Three Steps To Get Started</h3>
            <ol className="spacious">
              <li>
                Create an ElevenLabs API key with write access at{" "}
                <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer">elevenlabs.io / Settings / API Keys</a>
                .
              </li>
              <li>Add the ElevenLabs integration on the <a href="/features/integrations.html">Integrations</a> page and paste your key.</li>
              <li>Pick the agents you want and click Import. They are ready to take calls right away.</li>
            </ol>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/users/sign_in.html" className="btn btn-td-green">Connect ElevenLabs</a>
              {" "}
              <a href="/features/voice_agents.html" className="btn btn-outline-td-green">All AI Voice Agents</a>
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
