import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const roles = [
  ['Senior Backend Engineer', 'Engineering', 'Remote'],
  ['Product Designer', 'Design', 'Remote'],
  ['Solutions Engineer', 'Customer', 'Remote'],
]

export default function Careers() {
  return (
    <>
      <PageHero kicker="CAREERS" title="Build the future of call routing.">
        Join a small team solving real-time decisioning problems at scale.
      </PageHero>
      <section className="page-section">
        <div className="faq-list">
          {roles.map(([title, team, place]) => (
            <div className="role-row" key={title}>
              <div><strong>{title}</strong><span>{team} · {place}</span></div>
              <Link className="button button-outline" to="/contact">Apply</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
