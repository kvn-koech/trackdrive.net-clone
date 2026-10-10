// /features/agent_controls.html
export const meta = {
  title: "Agent Control Center & Power Dialer | Automated Outbound Calling | Avortyx",
  description: "Interview consumers, transfer to buyers, mute, hold, and disposition calls from one interface — with a Power Dialer that keeps agents talking, not dialing.",
  bodyClass: "avortyx_marketing features_agent_controls ",
  layout: "feature",
}

export default function AgentControls() {
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
          <h1 className="fw-bold mb-2">Agent Control Center</h1>
          <p className="lead mktg-subpage-hero-subtitle">Interview consumers, transfer to buyers, mute, hold, and disposition calls from one interface — with a Power Dialer that keeps agents talking, not dialing.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <h3 id="agent-control-center">Agent Control Center</h3>
            <p>A browser-based control center where agents manage live calls, qualify leads, and route conversations from one screen — no downloads or external SIP clients required.</p>
            <ul className="text-muted">
              <li>
                <strong>Built-in WebRTC softphone</strong>
                {" "}— agents connect directly in the browser; SIP credentials are auto-provisioned.
              </li>
              <li><strong>Script switching</strong> — change the interview script mid-call for different qualification paths.</li>
              <li><strong>Mute, hold & transfer</strong> — control the caller's audio and hand the call to a buyer with one click.</li>
              <li>
                <strong>Find a buyer</strong>
                {" "}— after the interview, trigger the routing engine to match the caller with the best available buyer, with matching buyers previewed live.
              </li>
            </ul>
            <p className="text-muted">
              Mix human agents and{" "}
              <a href="/features/voice_agents.html">AI Voice Agents</a>
              {" "}in the same call flow — use AI to qualify or deflect, then transfer to a human via the Agent Control Center.
            </p>
            <p className="text-muted mb-1">
              <strong>One screen for the live call.</strong>
              {" "}Mute, hold, transfer, find a buyer, and disposition, all in the browser.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-agent-control-center.webp">
              <img alt="Agent Control Center" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-agent-control-center.webp" width="2000" height="1117" srcSet="/assets/avx-shots/features-agent-control-center-1000.webp 1000w, /assets/avx-shots/features-agent-control-center.webp 2000w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <h3>Seamless Agent Creation</h3>
            <p>Get a whole floor into the control center at once. Configure hundreds of agents with Avortyx's bulk uploader — import agent lists via CSV, create internal agents that need no email inbox, and assign them to offers, schedules, and call queues.</p>
            <p className="text-muted mb-1">
              <strong>Onboard a call center fast.</strong>
              {" "}Provision agents in bulk from a CSV instead of one at a time.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-create-agents.webp">
              <img alt="Create Agents" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-create-agents.webp" width="1000" height="493" loading="lazy" decoding="async" />
            </a>
            <h3 id="power-dialer">Power Dialer</h3>
            <p>With agents on the line, the Power Dialer keeps them there. It runs a continuous cycle — finding available agents, dialing leads, screening for live answers, and bridging the call — with pacing that scales to your waiting-agent capacity.</p>
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How the Power Dialer Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-users" /></div>
                  <div className="flow-node-label">Leads Queue</div>
                  <div className="flow-node-desc">Leads enter via API, import, actions, and more</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-headset" /></div>
                  <div className="flow-node-label">Agent Available</div>
                  <div className="flow-node-desc">Agent on the line, ready for the next call</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-phone-volume" /></div>
                  <div className="flow-node-label">Place Call</div>
                  <div className="flow-node-desc">Dials the next lead when an agent is free</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-phone-flip" /></div>
                  <div className="flow-node-label">Connected</div>
                  <div className="flow-node-desc">Live answer bridged to agent</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-secondary text-white"><i className="fa-solid fa-clipboard-check" /></div>
                  <div className="flow-node-label">Disposition</div>
                  <div className="flow-node-desc">Agent selects outcome, next lead</div>
                </div>
              </div>
            </div>
            <h3>Agent Routing Modes</h3>
            <p className="text-muted">Match leads to agents the way that fits your team:</p>
            <ul className="text-muted">
              <li><strong>Longest Wait Time</strong> — the agent idle longest takes the next call.</li>
              <li><strong>Tier & Weight</strong> — prioritize top performers, with weighted distribution inside a tier.</li>
              <li><strong>Hybrid</strong> — tier priority, broken by longest wait time within each tier.</li>
              <li>
                <strong>Fairness rotation</strong>
                {" "}— the hybrid order reverses every 5th call so lower-priority agents still receive calls.
              </li>
            </ul>
            <h3>Call Dispositions</h3>
            <p>Every call ends with an outcome. Agents dispose calls to give visibility on results and surface areas to improve, and dispositions can trigger actions such as adding the consumer to your DNC, running a custom webhook, and more.</p>
            <p className="text-muted mb-1">
              <strong>Outcomes that do work.</strong>
              {" "}Custom disposition codes can fire webhooks, update lead data, and add callers to your DNC.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-call-dispositions.webp">
              <img alt="Call Dispositions" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-call-dispositions.webp" width="1000" height="500" loading="lazy" decoding="async" />
            </a>
            <h3>Agent Statuses</h3>
            <p>Watch the floor in real time. See each agent's current state at a glance — with a customer, ringing a lead, on lunch, and more — alongside how long they have been in it and how many calls they have handled.</p>
            <p className="text-muted mb-1">
              <strong>See where the day goes.</strong>
              {" "}Live agent statuses with time tracking and calls-handled metrics.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-agent-statuses.webp">
              <img alt="Agent Statuses" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-agent-statuses.webp" width="1000" height="488" loading="lazy" decoding="async" />
            </a>
            <h3 id="agent-timesheets">Agent Timesheets & Productivity</h3>
            <p>Live statuses tell you what the floor is doing now. Agent Timesheets tell you what it did — every status change an agent records builds a timesheet, and the Agents dashboard totals them across your whole floor for any timeframe you pick.</p>
            <ul className="text-muted">
              <li>
                <strong>Payroll</strong>
                {" "}— billable hours, non-billable hours, and talk hours, using the billable flag you set on each of your own statuses. The hours you pay for, separated from the hours you do not.
              </li>
              <li>
                <strong>Productivity</strong>
                {" "}— occupancy and availability reported separately rather than blended into one “utilization” number. Low availability is a conduct conversation; low occupancy is a dialer conversation, and a single figure cannot tell you which. Dialer overhead — paid time an agent spends waiting on the system rather than on a consumer — is broken out as its own share.
              </li>
              <li>
                <strong>Staffing</strong>
                {" "}— how many agents worked, with the median shown beside the mean, so one part-time shift does not drag the average down and make a normal day look like a bad one.
              </li>
            </ul>
            <p className="text-muted mb-1">
              <strong>Your whole floor, any timeframe.</strong>
              {" "}Payroll, productivity, and staffing across the top of the page.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-agent-timesheets-overview.webp">
              <img alt="Agent timesheet dashboard showing payroll, productivity, and staffing metrics" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-agent-timesheets-overview.webp" width="1560" height="1140" srcSet="/assets/avx-shots/features-agent-timesheets-overview-1000.webp 1000w, /assets/avx-shots/features-agent-timesheets-overview.webp 1560w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p>
              <strong>By Agent</strong>
              {" "}gives you one row per person: billable and total time, how the day divided between talking, dialing, wrap-up, and the statuses they chose themselves, their occupancy, how many consumers they handled, and their average handle time. Click any name or total to open the individual status rows behind the figure.
            </p>
            <p className="text-muted mb-1">
              <strong>Who did what.</strong>
              {" "}Every agent's day, with the mix of talk, dialing, and wrap-up in a single bar.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-agent-timesheets-by-agent.webp">
              <img alt="Per-agent timesheet table showing billable time, day mix, occupancy, and consumers handled" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-agent-timesheets-by-agent.webp" width="1800" height="452" srcSet="/assets/avx-shots/features-agent-timesheets-by-agent-1000.webp 1000w, /assets/avx-shots/features-agent-timesheets-by-agent.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
            <p>
              <strong>Coverage by Day & Hour</strong>
              {" "}shows the average agent-minutes logged in each hour of each weekday, in your account timezone rather than UTC — so a floor working nine to five reads as nine to five. Put it beside when your leads actually arrive and the gaps in your roster stop being a guess.
            </p>
            <p className="text-muted mb-1">
              <strong>When your floor is staffed.</strong>
              {" "}A week of coverage by weekday and hour, beside the statuses that made it up.
            </p>
            <a className="zoomable-marketing-image" target="_blank" rel="noopener" href="/assets/avx-shots/features-agent-timesheets-coverage.webp">
              <img alt="Coverage heatmap by day and hour beside a breakdown of time by agent status" className="img-fluid rounded shadow-sm my-3" src="/assets/avx-shots/features-agent-timesheets-coverage.webp" width="1800" height="489" srcSet="/assets/avx-shots/features-agent-timesheets-coverage-1000.webp 1000w, /assets/avx-shots/features-agent-timesheets-coverage.webp 1800w" sizes="(min-width: 992px) 860px, 100vw" loading="lazy" decoding="async" />
            </a>
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
