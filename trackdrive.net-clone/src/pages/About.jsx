import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { CtaBanner } from '../components/Scene3D.jsx'

const values = [
  ['Speed', 'Every decision happens on the first ring, because every millisecond is revenue.'],
  ['Trust', 'Compliance and transparency are built into the product, not bolted on.'],
  ['Clarity', 'Complex routing should be simple to configure and easy to explain.'],
]

export default function About() {
  return (
    <>
      <PageHero kicker="ABOUT AVORTYX" title="We make every inbound call count." scene="stack">
        Avortyx is a pay-per-call intelligence platform that helps networks, marketers and buyers route calls with confidence.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-3">
          {values.map(([title, text]) => (
            <article className="info-card" key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <div className="center-row"><Link className="text-link" to="/careers">View open roles →</Link></div>
      </section>
      <section className="demo-section section-pad"><CtaBanner /></section>
    </>
  )
}
