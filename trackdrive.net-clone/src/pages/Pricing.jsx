import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { ArrowIcon } from '../components/icons.jsx'

const tiers = [
  { name: 'Starter', price: '$49', unit: '/month', note: '500 routed calls included', features: ['3 campaigns', '10 buyers', 'Call tracking and recordings', 'Email support'], cta: 'Start with Starter' },
  { name: 'Growth', price: '$199', unit: '/month', note: '5,000 routed calls included', featured: true, features: ['Unlimited campaigns and buyers', 'Intent scoring and real-time bidding', 'Live monitor with barge and whisper', 'TCPA, DNC and VOIP screening', 'Automated publisher payouts'], cta: 'Choose Growth' },
  { name: 'Enterprise', price: 'Custom', unit: '', note: 'Volume pricing and SLA', features: ['Uptime SLA and priority support', 'SOC 2 and HIPAA readiness', 'Dedicated number pools', 'Custom integrations'], cta: 'Talk to sales' },
]

const faqs = [
  ['How does pricing work?', 'Plans include a number of routed calls each month. Additional calls are billed at a per-call rate shown on your plan.'],
  ['Can I bring my own numbers?', 'Yes. You can port existing numbers or provision new local and toll-free numbers.'],
  ['How is compliance handled?', 'Every call is checked against TCPA, DNC and VOIP rules before it connects to a buyer.'],
  ['Can I use my own buyers?', 'Yes. Add your own buyers, caps and schedules, or route through your existing carrier.'],
  ['How fast are routing decisions?', 'Decisions are made on the first ring so callers connect without noticeable delay.'],
  ['Do you offer SLAs?', 'Enterprise plans include an uptime SLA and priority support.'],
]

export default function Pricing() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHero kicker="PRICING" title="Simple pricing that scales with your calls.">
        Start small and grow. No setup fees and no long-term contracts. Pricing shown is illustrative.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-3">
          {tiers.map((tier) => (
            <article className={tier.featured ? 'info-card price-card is-featured' : 'info-card price-card'} key={tier.name}>
              {tier.featured && <span className="badge">Most popular</span>}
              <h3>{tier.name}</h3>
              <p className="price"><strong>{tier.price}</strong><span>{tier.unit}</span></p>
              <p className="price-note">{tier.note}</p>
              <ul className="check-list">{tier.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <Link className={tier.featured ? 'button button-primary' : 'button button-outline'} to="/request-access">{tier.cta} <ArrowIcon /></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section page-section-tint">
        <div className="section-heading"><span className="section-kicker">COMPARE</span><h2>Avortyx vs the alternatives.</h2></div>
        <div className="table-wrap">
          <table className="compare-table">
            <thead><tr><th>Capability</th><th>Avortyx</th><th>Legacy trackers</th><th>DIY carrier</th></tr></thead>
            <tbody>
              {[['First-ring intent scoring', 'Yes', 'No', 'No'], ['Real-time buyer bidding', 'Yes', 'Limited', 'No'], ['Built-in TCPA/DNC/VOIP', 'Yes', 'Add-on', 'No'], ['Automated payouts', 'Yes', 'Manual', 'No']].map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading"><span className="section-kicker">FAQ</span><h2>Questions, answered.</h2></div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <div className={open === i ? 'faq-item is-open' : 'faq-item'} key={q}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {q}<span aria-hidden="true">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
