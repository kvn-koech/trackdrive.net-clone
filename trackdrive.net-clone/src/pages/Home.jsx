import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, BrandMark } from '../components/icons.jsx'
import { CtaBanner, Scene3D } from '../components/Scene3D.jsx'

const workflows = [
  {
    id: 'ping-post',
    eyebrow: 'LEAD DISTRIBUTION',
    title: 'Ping/Post',
    description:
      'Real-time bidding for inbound calls — connect every lead to the buyer who values it most.',
    bullets: [
      '10+ buyer matching criteria, checked in real time',
      'Route by bid, priority, or earnings-per-call',
      'Static and live webhook bidders in one auction',
      'Per-buyer ping caps by minute, hour, or day',
    ],
    steps: [
      ['Publisher', 'Sends lead data'],
      ['PING', 'Check buyers, get bids'],
      ['Buyer match', 'Hours, caps, geo, filters'],
      ['POST', 'Get a tracking number'],
      ['Connected', 'Caller reaches the buyer'],
    ],
  },
  {
    id: 'power-dialer',
    eyebrow: 'OUTBOUND CALLING',
    title: 'Power Dialer',
    description:
      'Continuous outbound dialing that keeps agents talking, not waiting.',
    bullets: [
      'Places the next call the moment an agent is free',
      'Answering-machine screening',
      'Built-in WebRTC softphone, no downloads',
    ],
    steps: [
      ['Leads queue', 'Your next conversations'],
      ['Agent ready', 'Available for a call'],
      ['Place call', 'Dials the next lead'],
      ['Connected', 'Live answer, bridged'],
      ['Disposition', 'Log outcome, move on'],
    ],
  },
  {
    id: 'call-tracking',
    eyebrow: 'INBOUND CALLING',
    title: 'Call Tracking',
    description:
      'Build call flows that send every caller to the right buyer.',
    bullets: [
      'Tier and weight priority with capacity caps',
      'Simultaneous ring — first to answer wins',
      'Question & Answer flows to qualify callers',
      'AI voice agents and whisper messages',
    ],
    steps: [
      ['Inbound call', 'A caller dials your number'],
      ['IVR greeting', 'Menu and keypress collection'],
      ['Smart routing', 'Tier, bid, or EPC'],
      ['Ring buyers', 'Priority order or all at once'],
      ['Connected', 'Call bridged to the buyer'],
    ],
  },
  {
    id: 'automation',
    eyebrow: 'LEAD FOLLOW-UP',
    title: 'Lead Automation',
    description:
      'Turn web leads into live calls with automated SMS, email, and dialing.',
    bullets: [
      'SMS, email, and outbound call sequences',
      'Conditional branching and retry logic',
      'Scheduled callbacks with daylight-hours awareness',
    ],
    steps: [
      ['Lead enters', 'Web form, API, or import'],
      ['Outreach', 'SMS, email, or webhook'],
      ['Wait', 'A delay that fits your flow'],
      ['Call', 'Connect the lead to a buyer'],
      ['Repeat', 'Retry or mark complete'],
    ],
  },
]

const capabilities = [
  {
    icon: 'spark',
    title: 'AI Voice Agents',
    description:
      'Answer around the clock, qualify leads, and warm-transfer to your team.',
  },
  {
    icon: 'chart',
    title: 'Call Analytics',
    description:
      'See the campaigns, traffic sources, and keywords that drive revenue.',
  },
  {
    icon: 'code',
    title: 'REST API',
    description:
      'A programmable platform with granular keys, IP controls, and audit logs.',
  },
]

const capabilitiesList = [
  'Call tracking',
  'Dynamic number insertion',
  'Custom webhooks',
  'Expressions & functions',
  'AI transcriptions',
  'Call recordings',
  'Data exports',
  'Security & compliance',
]

const intentOptions = [
  {
    id: 'browsing',
    label: 'Browsing',
    score: 34,
    buyer: 'Home Services',
    payout: '$32.00',
    reason: 'Matched on location and buyer availability',
  },
  {
    id: 'comparing',
    label: 'Comparing',
    score: 68,
    buyer: 'Auto Insurance',
    payout: '$45.80',
    reason: 'Matched on intent, location, and bid',
  },
  {
    id: 'ready',
    label: 'Ready to buy',
    score: 92,
    buyer: 'Solar - West Coast',
    payout: '$58.00',
    reason: 'Highest eligible bid for this caller',
  },
]

const routingPrinciples = [
  {
    number: '01',
    title: 'Millisecond decisions',
    description: 'Evaluate the caller and eligible routes as the call arrives.',
  },
  {
    number: '02',
    title: 'Intent-aware matching',
    description: 'Use caller signals to match intent with the right buyer.',
  },
  {
    number: '03',
    title: 'Rules that adapt',
    description: 'Balance buyer bids, geo, schedules, and capacity in real time.',
  },
  {
    number: '04',
    title: 'Compliance at the gate',
    description: 'Check TCPA, DNC, and recording requirements before routing.',
  },
]

export function WorkflowVisual({ steps, variant }) {
  return (
    <div className={`workflow-visual workflow-${variant}`} aria-label={`${variant} workflow`}>
      <div className="workflow-heading">
        <span className="workflow-live"><i /> LIVE WORKFLOW</span>
        <span className="workflow-menu">•••</span>
      </div>
      <div className="workflow-steps">
        {steps.map(([title, detail], index) => (
          <div className="workflow-step-wrap" key={title}>
            <div className={index === steps.length - 1 ? 'workflow-step is-final' : 'workflow-step'}>
              <span className="workflow-step-icon">
                {index === 0 ? '↗' : index === steps.length - 1 ? '✓' : `${index}`.padStart(2, '0')}
              </span>
              <span className="workflow-step-copy">
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
              {index === steps.length - 1 && <span className="step-status">ACTIVE</span>}
            </div>
            {index !== steps.length - 1 && <span className="workflow-connector" />}
          </div>
        ))}
      </div>
      <div className="workflow-foot">
        <span><i className="pulse-dot" /> All systems operational</span>
        <span>Last updated just now</span>
      </div>
    </div>
  )
}

export default function Home() {
  const [intentId, setIntentId] = useState('ready')
  const [routed, setRouted] = useState(false)
  const selectedIntent = intentOptions.find((option) => option.id === intentId)

  return (
    <>
        <section className="hero-section">
          <div className="hero-glow" />
          <div className="hero-content" style={{ position: "relative" }}>
            <img src="/assets/trackdrive_marketing/brand-assets/ringba%20assets/pt-hero-rings.png" alt="" className="hero-rings-bg" />
            <Link className="announcement" to="/platform">
              <span className="announcement-dot" />
              PAY-PER-CALL INTELLIGENCE PLATFORM
              <ArrowIcon diagonal />
            </Link>
            <h1>Routing built for<br /><span>performance.</span></h1>
            <p className="hero-description">
              High-frequency decisioning for performance marketing. Route calls and
              leads with first-ring intent scoring, real-time buyer bidding, and
              compliance checks built into every connection.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary button-large" to="/request-access">Book a demo <ArrowIcon /></Link>
              <Link className="button button-secondary button-large" to="/platform">Explore platform</Link>
            </div>
            <div className="trust-note"><span className="screening-badge">✓ TCPA</span><span className="screening-badge">✓ DNC</span><span className="screening-badge">✓ VOIP</span><span>Screened on every call</span></div>
          </div>

          <div className="product-preview" aria-label="Avortyx call routing dashboard preview">
            <div className="preview-topbar">
              <div className="preview-brand"><BrandMark /><span>AVORTYX</span></div>
              <div className="preview-breadcrumb">Routing <span>/</span> Intent auction</div>
              <div className="preview-top-actions"><span className="preview-status"><i /> Live</span><span className="preview-avatar">JD</span></div>
            </div>
            <div className="preview-body">
              <aside className="preview-sidebar">
                <span className="sidebar-label">WORKSPACE</span>
                <span className="sidebar-item active"><b>◫</b> Overview</span>
                <span className="sidebar-item"><b>⌁</b> Traffic streams</span>
                <span className="sidebar-item"><b>◉</b> Predictive routing</span>
                <span className="sidebar-item"><b>▤</b> Live monitor</span>
                <span className="sidebar-label sidebar-label-lower">MANAGE</span>
                <span className="sidebar-item"><b>◎</b> Buyers &amp; endpoints</span>
                <span className="sidebar-item"><b>⚙</b> Settings</span>
                <div className="sidebar-help"><span>Need a hand?</span><b>Visit help center ↗</b></div>
              </aside>
              <div className="preview-main">
                <div className="preview-title-row"><div><span className="preview-eyebrow">LIVE ROUTING OVERVIEW</span><h2>Every call. A smarter route. <span>✳</span></h2><p>Intent signals and buyer demand, in real time.</p></div><button type="button" className="range-button">Live⌄</button></div>
                <div className="metric-grid">
                  <div className="metric-card"><span>Calls routed</span><strong>2,481</strong><small className="metric-up">↗ 12.8% <em>this week</em></small><div className="sparkline spark-one" /></div>
                  <div className="metric-card"><span>Buyer match rate</span><strong>76.3%</strong><small className="metric-up">↗ 8.3% <em>this week</em></small><div className="sparkline spark-two" /></div>
                  <div className="metric-card"><span>Avg. decision time</span><strong>85ms</strong><small className="metric-up">↗ Real-time <em>routing</em></small><div className="sparkline spark-three" /></div>
                </div>
                <div className="preview-bottom">
                  <div className="activity-card">
                    <div className="activity-card-header"><div><strong>Live call activity</strong><span>Calls routed in real time</span></div><span className="live-label"><i /> LIVE</span></div>
                    <div className="activity-chart"><div className="chart-y-labels"><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /></div><svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#70b84d" stopOpacity=".2" /><stop offset="100%" stopColor="#70b84d" stopOpacity="0" /></linearGradient></defs><path d="M0 78 C24 73 28 54 52 61 S82 46 102 55 S136 28 158 40 S191 60 213 44 S244 53 267 26 S304 44 321 27 S350 42 369 13 S390 25 400 9 V100 H0Z" fill="url(#chart-fill)" /><path d="M0 78 C24 73 28 54 52 61 S82 46 102 55 S136 28 158 40 S191 60 213 44 S244 53 267 26 S304 44 321 27 S350 42 369 13 S390 25 400 9" fill="none" stroke="#5ca63b" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x-labels"><span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span><span>5 PM</span></div></div></div>
                  </div>
                  <div className="routing-card"><div className="routing-heading"><strong>Top campaigns</strong><Link to="/platform">View all <ArrowIcon /></Link></div><div className="campaign-row"><span className="campaign-icon campaign-icon-green">S</span><span><b>Solar - West Coast</b><small>Inbound · 643 calls</small></span><strong>$12,420</strong></div><div className="campaign-row"><span className="campaign-icon campaign-icon-orange">I</span><span><b>Auto Insurance</b><small>Ping/Post · 521 calls</small></span><strong>$9,860</strong></div><div className="campaign-row"><span className="campaign-icon campaign-icon-blue">H</span><span><b>Home Services</b><small>Inbound · 384 calls</small></span><strong>$7,240</strong></div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-footnote"><span>ONE PLATFORM. EVERY CONVERSATION.</span><span>Built for performance at scale <b>↓</b></span></div>
        </section>

        <section className="stats-strip" aria-label="Platform statistics">
          <div className="stats-inner">
            <div className="stat"><strong>99.9%</strong><span>Platform uptime</span></div>
            <div className="stat"><strong>85<span>ms</span></strong><span>Average invite latency</span></div>
            <div className="stat"><strong>Billions<span>+</span></strong><span>Calls & pings processed</span></div>
            <div className="stat stat-promise"><span className="stat-shield">✓</span><span>Reliable by design.<br /><b>Ready when you are.</b></span></div>
          </div>
        </section>

        <section className="routing-intelligence section-pad" id="routing-intelligence">
          <div className="intelligence-intro">
            <span className="section-kicker">AVORTYX ROUTING ENGINE</span>
            <h2>Make the right call<br /><span>on the first ring.</span></h2>
            <p>
              Avortyx combines live intent signals, buyer demand, and compliance
              checks in one high-frequency decision engine. Match each caller to
              the right eligible buyer while the opportunity is still live.
            </p>
            <Link className="text-link" to="/platform">Explore the platform <ArrowIcon /></Link>
            <Scene3D variant="stack" />
          </div>
          <div className="intelligence-workspace">
            <div className="principles-grid">
              {routingPrinciples.map((principle) => (
                <article className="principle-card" key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
            <div className="routing-simulator">
              <div className="simulator-header">
                <div>
                  <span className="simulator-kicker"><i /> INTERACTIVE PREVIEW</span>
                  <h3>Route a call</h3>
                  <p>Choose a caller intent to preview buyer matching.</p>
                </div>
                <span className="simulator-badge">ILLUSTRATIVE</span>
              </div>
              <div className="intent-options" aria-label="Select caller intent">
                {intentOptions.map((option) => (
                  <button
                    className={intentId === option.id ? 'intent-option is-selected' : 'intent-option'}
                    type="button"
                    key={option.id}
                    aria-pressed={intentId === option.id}
                    onClick={() => {
                      setIntentId(option.id)
                      setRouted(false)
                    }}
                  >
                    <span className="intent-radio" />
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="simulator-result" aria-live="polite">
                <div className="intent-score">
                  <span>ESTIMATED INTENT</span>
                  <strong>{selectedIntent.score}<small>/100</small></strong>
                  <div className="score-track"><i style={{ width: `${selectedIntent.score}%` }} /></div>
                </div>
                <div className="result-divider" />
                <div className="buyer-match">
                  <span>{routed ? 'CALL ROUTED TO' : 'BEST BUYER MATCH'}</span>
                  <strong>{routed ? <i className="buyer-check">✓</i> : null}{selectedIntent.buyer}</strong>
                  <small>{selectedIntent.reason}</small>
                </div>
                <strong className="buyer-payout">{selectedIntent.payout}<small> / call</small></strong>
              </div>
              <button className="route-call-button" type="button" onClick={() => setRouted(true)}>
                {routed ? 'Call routed successfully' : 'Route this call'}
                <ArrowIcon />
              </button>
              <div className="compliance-note"><span>✓</span> TCPA &amp; DNC checks run before a call is connected</div>
            </div>
          </div>
        </section>

        <section className="platform-section section-pad" id="platform">
          <div className="section-heading">
            <span className="section-kicker">THE AVORTYX PLATFORM</span>
            <h2>Everything you need to<br /><span>convert leads into calls.</span></h2>
            <p>Powerful tools to track, route, and optimize every conversation.</p>
          </div>

          <div className="workflow-list" id="solutions">
            {workflows.map((workflow, index) => (
              <article className={`workflow-row ${index % 2 ? 'workflow-row-reverse' : ''}`} key={workflow.id}>
                <div className="workflow-copy">
                  <span className="section-kicker"><i className="kicker-line" />{workflow.eyebrow}</span>
                  <h3>{workflow.title}</h3>
                  <p>{workflow.description}</p>
                  <ul>
                    {workflow.bullets.map((bullet) => <li key={bullet}><span>✓</span>{bullet}</li>)}
                  </ul>
                  <Link className="text-link" to="/solutions">Explore {workflow.title}<ArrowIcon /></Link>
                </div>
                <div className={`workflow-art workflow-art-${index + 1}`}>
                  <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
                  <WorkflowVisual steps={workflow.steps} variant={workflow.id} />
                  <span className="art-label">{String(index + 1).padStart(2, '0')} / 04</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities-section section-pad" id="resources">
          <div className="section-heading capabilities-heading">
            <span className="section-kicker">MORE WAYS TO WIN THE CALL</span>
            <h2>One platform. <span>More possibility.</span></h2>
            <p>The rest of the platform that turns every connected call into revenue.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <Link className="capability-card" to="/platform" key={capability.title}>
                <span className="capability-icon">
                  {capability.icon === 'spark' ? <span>✳</span> : capability.icon === 'chart' ? <span>⌁</span> : <span>⌘</span>}
                </span>
                <span className="capability-number">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span className="card-link">Explore <ArrowIcon diagonal /></span>
              </Link>
            ))}
          </div>
          <div className="capability-tags">
            <span className="tags-label">BUILT INTO THE PLATFORM</span>
            <div>{capabilitiesList.map((item) => <span className="capability-tag" key={item}><i>✓</i>{item}</span>)}</div>
            <Link to="/platform" className="text-link">See all features <ArrowIcon /></Link>
          </div>
        </section>

        <section className="integrations-section section-pad" id="integrations">
          <div className="integration-copy">
            <span className="section-kicker">FITS RIGHT IN</span>
            <h2>Your stack.<br /><span>Working together.</span></h2>
            <p>Connect Avortyx to the tools you already use. Bring your own VoIP carrier and build the workflow that works for your team.</p>
            <Link className="text-link" to="/integrations">Explore integrations <ArrowIcon /></Link>
          </div>
          <div className="integration-art" aria-label="Connected marketing tools">
            <div className="integration-ring ring-outer" /><div className="integration-ring ring-inner" />
            <span className="integration-line line-top" /><span className="integration-line line-right" /><span className="integration-line line-bottom" /><span className="integration-line line-left" />
            <div className="integration-node node-main"><BrandMark /></div>
            <div className="integration-node node-hubspot"><span>H</span></div>
            <div className="integration-node node-salesforce"><span>☁</span></div>
            <div className="integration-node node-slack"><span>✣</span></div>
            <div className="integration-node node-api"><span>&lt;/&gt;</span></div>
            <span className="integration-caption">YOUR TOOLS, CONNECTED</span>
          </div>
        </section>

        <section className="demo-section section-pad" id="demo">
          <CtaBanner />
        </section>
    </>
  )
}
