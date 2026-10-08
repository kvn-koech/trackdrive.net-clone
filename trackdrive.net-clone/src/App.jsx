import { useState } from 'react'
import './App.css'

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

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 42 42"
      role="img"
      aria-label="TrackDrive"
    >
      <path
        d="M4 10.5h25.7c5.1 0 8.3 3.4 8.3 8.2v4.7c0 7.5-5.9 13.1-13.7 13.1H9.7l5.7-6.4h9.1c4.2 0 7.1-2.7 7.1-6.8v-3.2c0-1.8-1.1-2.8-3-2.8H4z"
        fill="currentColor"
      />
      <path
        d="M3.8 14.6 9.4 8h17.2l-5.7 6.6zm12.8 10.7h8.7v5.2h-8.7z"
        fill="currentColor"
        opacity=".72"
      />
      <circle cx="27.2" cy="24.1" r="1.1" fill="#fff" />
      <circle cx="31.1" cy="24.1" r="1.1" fill="#fff" />
      <circle cx="27.2" cy="28" r="1.1" fill="#fff" />
      <circle cx="31.1" cy="28" r="1.1" fill="#fff" />
    </svg>
  )
}

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon-diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 10h11M10 4l6 6-6 6" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <span className={open ? 'menu-lines is-open' : 'menu-lines'}>
      <span />
      <span />
    </span>
  )
}

function WorkflowVisual({ steps, variant }) {
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="TrackDrive home">
            <BrandMark />
            <span>Track<span>Drive</span></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
            <a href="#platform" onClick={closeMenu}>Platform</a>
            <a href="#solutions" onClick={closeMenu}>Solutions</a>
            <a href="#integrations" onClick={closeMenu}>Integrations</a>
            <a href="#resources" onClick={closeMenu}>Resources</a>
            <div className="mobile-nav-actions">
              <a className="nav-login" href="#footer" onClick={closeMenu}>Log in <ArrowIcon diagonal /></a>
              <a className="button button-primary" href="#demo" onClick={closeMenu}>Get started <ArrowIcon /></a>
            </div>
          </nav>
          <div className="desktop-nav-actions">
            <a className="nav-login" href="#footer">Log in <ArrowIcon diagonal /></a>
            <a className="button button-primary nav-cta" href="#demo">Get started <ArrowIcon /></a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-glow" />
          <div className="hero-content">
            <a className="announcement" href="#platform">
              <span className="announcement-dot" />
              THE PERFORMANCE MARKETING PLATFORM
              <ArrowIcon diagonal />
            </a>
            <h1>Intelligent call routing.<br /><span>Real-time ping/post.</span><br />Total visibility.</h1>
            <p className="hero-description">
              Route calls, manage ping trees, and turn every conversation into measurable growth.
              One platform built for performance marketers.
            </p>
            <div className="hero-actions">
              <a className="button button-primary button-large" href="#demo">Get started free <ArrowIcon /></a>
              <a className="button button-secondary button-large" href="#demo">Request a demo</a>
            </div>
            <div className="trust-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span> Built for teams that run on results</div>
          </div>

          <div className="product-preview" aria-label="TrackDrive call routing dashboard preview">
            <div className="preview-topbar">
              <div className="preview-brand"><BrandMark /><span>TrackDrive</span></div>
              <div className="preview-breadcrumb">Workflows <span>/</span> Inbound call flow</div>
              <div className="preview-top-actions"><span className="preview-status"><i /> Live</span><span className="preview-avatar">JD</span></div>
            </div>
            <div className="preview-body">
              <aside className="preview-sidebar">
                <span className="sidebar-label">WORKSPACE</span>
                <span className="sidebar-item active"><b>◫</b> Overview</span>
                <span className="sidebar-item"><b>⌁</b> Call flows</span>
                <span className="sidebar-item"><b>◉</b> Campaigns</span>
                <span className="sidebar-item"><b>▤</b> Analytics</span>
                <span className="sidebar-label sidebar-label-lower">MANAGE</span>
                <span className="sidebar-item"><b>◎</b> Buyers</span>
                <span className="sidebar-item"><b>⚙</b> Settings</span>
                <div className="sidebar-help"><span>Need a hand?</span><b>Visit help center ↗</b></div>
              </aside>
              <div className="preview-main">
                <div className="preview-title-row"><div><span className="preview-eyebrow">TUESDAY, OCTOBER 8</span><h2>Good morning, Jordan <span>✳</span></h2><p>Here&apos;s how your calls are performing today.</p></div><button type="button" className="range-button">Today⌄</button></div>
                <div className="metric-grid">
                  <div className="metric-card"><span>Total calls</span><strong>2,481</strong><small className="metric-up">↗ 12.8% <em>vs. last week</em></small><div className="sparkline spark-one" /></div>
                  <div className="metric-card"><span>Connected</span><strong>1,894</strong><small className="metric-up">↗ 8.3% <em>vs. last week</em></small><div className="sparkline spark-two" /></div>
                  <div className="metric-card"><span>Avg. call value</span><strong>$42.60</strong><small className="metric-up">↗ 4.6% <em>vs. last week</em></small><div className="sparkline spark-three" /></div>
                </div>
                <div className="preview-bottom">
                  <div className="activity-card">
                    <div className="activity-card-header"><div><strong>Live call activity</strong><span>Calls routed in real time</span></div><span className="live-label"><i /> LIVE</span></div>
                    <div className="activity-chart"><div className="chart-y-labels"><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /></div><svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#70b84d" stopOpacity=".2" /><stop offset="100%" stopColor="#70b84d" stopOpacity="0" /></linearGradient></defs><path d="M0 78 C24 73 28 54 52 61 S82 46 102 55 S136 28 158 40 S191 60 213 44 S244 53 267 26 S304 44 321 27 S350 42 369 13 S390 25 400 9 V100 H0Z" fill="url(#chart-fill)" /><path d="M0 78 C24 73 28 54 52 61 S82 46 102 55 S136 28 158 40 S191 60 213 44 S244 53 267 26 S304 44 321 27 S350 42 369 13 S390 25 400 9" fill="none" stroke="#5ca63b" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x-labels"><span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span><span>5 PM</span></div></div></div>
                  </div>
                  <div className="routing-card"><div className="routing-heading"><strong>Top campaigns</strong><a href="#platform">View all <ArrowIcon /></a></div><div className="campaign-row"><span className="campaign-icon campaign-icon-green">S</span><span><b>Solar - West Coast</b><small>Inbound · 643 calls</small></span><strong>$12,420</strong></div><div className="campaign-row"><span className="campaign-icon campaign-icon-orange">I</span><span><b>Auto Insurance</b><small>Ping/Post · 521 calls</small></span><strong>$9,860</strong></div><div className="campaign-row"><span className="campaign-icon campaign-icon-blue">H</span><span><b>Home Services</b><small>Inbound · 384 calls</small></span><strong>$7,240</strong></div></div>
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

        <section className="platform-section section-pad" id="platform">
          <div className="section-heading">
            <span className="section-kicker">THE TRACKDRIVE PLATFORM</span>
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
                  <a className="text-link" href="#demo">Explore {workflow.title}<ArrowIcon /></a>
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
              <a className="capability-card" href="#demo" key={capability.title}>
                <span className="capability-icon">
                  {capability.icon === 'spark' ? <span>✳</span> : capability.icon === 'chart' ? <span>⌁</span> : <span>⌘</span>}
                </span>
                <span className="capability-number">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span className="card-link">Explore <ArrowIcon diagonal /></span>
              </a>
            ))}
          </div>
          <div className="capability-tags">
            <span className="tags-label">BUILT INTO THE PLATFORM</span>
            <div>{capabilitiesList.map((item) => <span className="capability-tag" key={item}><i>✓</i>{item}</span>)}</div>
            <a href="#demo" className="text-link">See all features <ArrowIcon /></a>
          </div>
        </section>

        <section className="integrations-section section-pad" id="integrations">
          <div className="integration-copy">
            <span className="section-kicker">FITS RIGHT IN</span>
            <h2>Your stack.<br /><span>Working together.</span></h2>
            <p>Connect TrackDrive to the tools you already use. Bring your own VoIP carrier and build the workflow that works for your team.</p>
            <a className="text-link" href="#demo">Explore integrations <ArrowIcon /></a>
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
          <div className="demo-card">
            <div className="demo-orb demo-orb-one" /><div className="demo-orb demo-orb-two" />
            <div className="demo-content">
              <span className="demo-kicker"><i /> READY WHEN YOU ARE</span>
              <h2>Turn your next call<br />into your best one.</h2>
              <p>See how the Voice Marketing Cloud can improve your marketing and the customer experience.</p>
              <div className="demo-actions">
                <a className="button button-white" href="mailto:support@trackdrive.com?subject=Request%20a%20TrackDrive%20demo">Request a demo <ArrowIcon /></a>
                <a className="demo-email" href="mailto:support@trackdrive.com">Talk to our team <ArrowIcon diagonal /></a>
              </div>
            </div>
            <div className="demo-decoration" aria-hidden="true"><BrandMark /><span>Every call<br />counts.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand footer-brand" href="#top"><BrandMark /><span>Track<span>Drive</span></span></a>
            <p>Call tracking and lead-to-call automation for performance marketers.</p>
            <a className="footer-email" href="mailto:support@trackdrive.com">support@trackdrive.com <ArrowIcon diagonal /></a>
            <a className="footer-ticket" href="mailto:support@trackdrive.com?subject=Support%20ticket">Submit a ticket <ArrowIcon /></a>
          </div>
          <div className="footer-column"><h3>Product</h3><a href="#platform">Features</a><a href="#integrations">Integrations</a><a href="#demo">Pricing</a><a href="#resources">REST API docs</a><a href="#footer">System status</a></div>
          <div className="footer-column"><h3>Platform</h3><a href="#platform">Ping/Post</a><a href="#platform">Call management</a><a href="#platform">Automation</a><a href="#resources">AI & transcription</a><a href="#resources">Tracking & attribution</a></div>
          <div className="footer-column"><h3>Company</h3><a href="#footer">About TrackDrive</a><a href="#footer">Careers</a><a href="#footer">Contact us</a><a href="#footer">Privacy policy</a><a href="#footer">Terms of service</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} TrackDrive. All rights reserved.</span><span>Made for the moments that matter <i>✳</i></span></div>
      </footer>
    </>
  )
}

export default App
