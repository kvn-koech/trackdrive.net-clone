// /features/voice_agents.html
export const meta = {
  title: "AI Voice Agents | Avortyx",
  description: "Bring your own AI voice provider — your agent answers and qualifies calls, routed with the same controls as your live team.",
  bodyClass: "avortyx_marketing features_voice_agents ",
  layout: "feature",
}

export default function VoiceAgents() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#ai" className="mktg-subpage-back"> <i className="fa-solid fa-arrow-left" /> Back to AI </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">AI</p>
          <h1 className="fw-bold mb-2">AI Voice Agents</h1>
          <p className="lead mktg-subpage-hero-subtitle">Bring your own AI voice provider — your agent answers and qualifies calls, routed with the same controls as your live team.</p>
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
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-plug" /></div>
                  <div className="flow-node-label">Connect</div>
                  <div className="flow-node-desc">Add your AI voice provider on Integrations</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-download" /></div>
                  <div className="flow-node-label">Import</div>
                  <div className="flow-node-desc">Bring in any agent; we provision the SIP trunk</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-diagram-project" /></div>
                  <div className="flow-node-label">Route</div>
                  <div className="flow-node-desc">Add the agent to any call flow and routing rule</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" /></div>
                  <div className="flow-node-label">Call</div>
                  <div className="flow-node-desc">Calls dial straight into the agent over SIP</div>
                </div>
              </div>
            </div>
            <p>Your sales floor never sleeps. Connect an AI voice agent, route calls to it just like any other destination, and let it qualify leads 24/7 — warm-transferring to a human when intent is high.</p>
            <ul className="text-muted">
              <li><strong>24/7 lead qualification</strong> — AI handles intake so leads never wait.</li>
              <li><strong>After-hours overflow</strong> — route to AI when your team is offline.</li>
              <li><strong>FAQ deflection</strong> — AI answers common questions; transfers only on intent.</li>
              <li>
                <strong>Full routing control</strong>
                {" "}— priority routing, hours, caps, concurrency, recording, transcription, and analytics all apply.
              </li>
              <li>
                <strong>Live data sync</strong>
                {" "}— everything the agent gathers syncs to the call record in real time and powers your reporting.
              </li>
            </ul>
            <h3>Supported Providers</h3>
            <p>Avortyx currently integrates with the following AI voice providers.</p>
            <ul className="ul-reset provider-grid">
              <li className="provider-card">
                <div className="provider-card__logo"><img alt="ElevenLabs integration" src="/assets/avx-site/img/elevenlabs.jpg" /></div>
                <p className="provider-card__tagline">Studio-grade conversational voice agents</p>
                <a className="provider-card__cta" href="/features/voice_agents/elevenlabs.html"> View ElevenLabs → </a>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/integrations.html" className="btn btn-td-green">Connect An Integration</a>
              {" "}
              <a href="/features.html#ai" className="btn btn-outline-td-green">AI at Avortyx</a>
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
