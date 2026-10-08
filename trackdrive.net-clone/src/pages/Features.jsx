import PageHero from '../components/PageHero.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { Link } from 'react-router-dom'

const featuresList = [
  {
    title: 'First-Ring Intent Scoring',
    description: 'Score incoming calls based on historical data, buyer profiles, and rich third-party intent signals in less than 50ms.',
    icon: '⚡'
  },
  {
    title: 'Real-Time Bid Engine',
    description: 'Auction your calls dynamically to the highest paying eligible buyer, ensuring maximum revenue per minute.',
    icon: '💰'
  },
  {
    title: 'TCPA & Compliance Shield',
    description: 'Automated DNC scrubbing, VOIP detection, and TCPA consent verification built directly into the routing layer.',
    icon: '🛡️'
  },
  {
    title: 'Interactive IVR Workflows',
    description: 'Build complex, multi-layered IVR trees with a simple drag-and-drop visual builder.',
    icon: '📞'
  },
  {
    title: 'Post-Call Analytics',
    description: 'Rich transcriptions, AI-driven sentiment analysis, and outcome tracking to close the loop on every conversion.',
    icon: '📊'
  },
  {
    title: 'Bring Your Own Carrier',
    description: 'Connect Twilio, Telnyx, or any SIP provider natively. No markup on minutes, complete transparency.',
    icon: '🌐'
  }
]

export default function Features() {
  return (
    <>
      <PageHero kicker="FEATURES" title="Everything you need to route at scale." scene="stack">
        Avortyx provides the most advanced toolkit for pay-per-call networks and enterprise performance marketers.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-3">
          {featuresList.map((feature, idx) => (
            <article className="info-card" key={idx}>
              <span style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
        
        <div className="page-actions" style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link className="button button-primary button-large" to="/request-access">
            Request early access <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
