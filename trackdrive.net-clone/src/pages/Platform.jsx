import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { CtaBanner } from '../components/Scene3D.jsx'
import { ArrowIcon } from '../components/icons.jsx'

const features = [
  ['Ping/Post routing', 'Auction every call to eligible buyers in real time and connect the highest bidder in milliseconds.'],
  ['Intent scoring', 'Score each caller on the first ring using live signals so high-value calls reach the right buyer.'],
  ['Compliance gate', 'TCPA, DNC and VOIP screening runs on every connection before a buyer is ever dialed.'],
  ['Live monitor', 'Watch active calls, barge in or whisper to agents, and intervene before a sale is lost.'],
  ['Call tracking', 'Dynamic numbers and attribution show which publishers and campaigns drive revenue.'],
  ['Automated payouts', 'Reconcile call duration and conversions, then pay publishers on schedule without spreadsheets.'],
  ['Analytics', 'Real-time dashboards for revenue, margin, conversion and buyer performance.'],
  ['Lead automation', 'Trigger SMS, email and webhooks automatically from call outcomes.'],
]

const steps = [
  ['01', 'Point a number', 'Provision or port a tracking number and attach it to a campaign in minutes.'],
  ['02', 'Set routing rules', 'Define buyers, caps, schedules and bidding rules once. Avortyx applies them on every call.'],
  ['03', 'Connect and get paid', 'Calls connect to the best buyer and payouts are tracked automatically.'],
]

export default function Platform() {
  return (
    <>
      <PageHero kicker="THE AVORTYX PLATFORM" title="One routing stack that understands calls." scene="stack">
        Everything you need to track, score, route and monetize inbound calls, built for pay-per-call networks and performance marketers.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-4">
          {features.map(([title, text]) => (
            <article className="info-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section page-section-tint">
        <div className="section-heading">
          <span className="section-kicker">HOW IT WORKS</span>
          <h2>Live in three steps.</h2>
        </div>
        <div className="card-grid card-grid-3">
          {steps.map(([n, title, text]) => (
            <article className="info-card step-card" key={n}>
              <span className="step-number">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="center-row"><Link className="text-link" to="/pricing">See pricing <ArrowIcon /></Link></div>
      </section>
      <section className="demo-section section-pad"><CtaBanner /></section>
    </>
  )
}
