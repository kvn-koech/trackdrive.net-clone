import PageHero from '../components/PageHero.jsx'
import { CtaBanner } from '../components/Scene3D.jsx'

const solutions = [
  ['Pay-per-call networks', 'Manage publishers and buyers at scale with real-time bidding, caps and automated settlement.', ['Publisher portals and payouts', 'Buyer caps and schedules', 'Fraud and duplicate screening']],
  ['Performance marketers', 'Track every call back to the campaign that drove it and optimize spend on conversions, not clicks.', ['Dynamic number insertion', 'Conversion and revenue attribution', 'Offline conversion postbacks']],
  ['Call buyers and brands', 'Receive qualified, pre-screened calls that match your coverage, hours and capacity.', ['Intent-qualified calls', 'Concurrency and budget controls', 'Call recordings and scoring']],
  ['Agencies', 'Run many clients from one account with separate reporting, numbers and permissions.', ['Client workspaces', 'White-label reporting', 'Role-based access']],
]

const verticals = ['Insurance', 'Solar', 'Home services', 'Legal', 'Healthcare', 'Financial services', 'Auto', 'Education']

export default function Solutions() {
  return (
    <>
      <PageHero kicker="SOLUTIONS" title="Built for every side of the call." scene="cube">
        Whether you generate, buy or broker calls, Avortyx gives your team one source of truth.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-2">
          {solutions.map(([title, text, bullets]) => (
            <article className="info-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="check-list">{bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section page-section-tint">
        <div className="section-heading">
          <span className="section-kicker">VERTICALS</span>
          <h2>Trusted across high-intent industries.</h2>
        </div>
        <div className="pill-row">{verticals.map((v) => <span className="pill" key={v}>{v}</span>)}</div>
      </section>
      <section className="demo-section section-pad"><CtaBanner /></section>
    </>
  )
}
