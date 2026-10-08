import PageHero from '../components/PageHero.jsx'
import { CtaBanner } from '../components/Scene3D.jsx'

const groups = [
  ['CRM and sales', ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho']],
  ['Telephony', ['Twilio', 'Telnyx', 'Bandwidth', 'SIP trunks']],
  ['Ads and analytics', ['Google Ads', 'Meta Ads', 'Google Analytics', 'Microsoft Ads']],
  ['Automation', ['Zapier', 'Slack', 'Webhooks', 'REST API']],
]

export default function Integrations() {
  return (
    <>
      <PageHero kicker="INTEGRATIONS" title="Your stack. Working together." scene="cube">
        Connect Avortyx to the tools you already use. Bring your own carrier and sync every call outcome downstream.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-4">
          {groups.map(([title, items]) => (
            <article className="info-card" key={title}>
              <h3>{title}</h3>
              <ul className="check-list">{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="demo-section section-pad"><CtaBanner /></section>
    </>
  )
}
