import PageHero from '../components/PageHero.jsx'

const sections = [
  ['docs', 'Documentation', 'Guides for setting up campaigns, buyers, numbers and routing rules.', ['Quick start: your first routed call', 'Configuring buyers and caps', 'Routing rules and schedules', 'Reporting and attribution']],
  ['api', 'API reference', 'A REST API for campaigns, calls, buyers and reporting.', ['Authentication with API keys', 'Calls and conversions endpoints', 'Pagination and rate limits', 'Error codes']],
  ['webhooks', 'Webhooks', 'Receive events the moment a call is scored, routed or completed.', ['call.started', 'call.routed', 'call.completed', 'payout.created']],
  ['status', 'System status', 'Operational status and incident history.', ['Routing engine: operational', 'API: operational', 'Dashboard: operational']],
]

export default function Resources() {
  return (
    <>
      <PageHero kicker="RESOURCES" title="Docs, API and developer tools.">
        Everything you need to integrate Avortyx and get the most from every call.
      </PageHero>
      <section className="page-section">
        <div className="card-grid card-grid-2">
          {sections.map(([id, title, text, items]) => (
            <article className="info-card" id={id} key={id}>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="check-list">{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
        </div>
        <pre className="code-sample" aria-label="Example API request"><code>{`curl https://api.avortyx.example/v1/calls \\
  -H "Authorization: Bearer $AVORTYX_API_KEY"`}</code></pre>
      </section>
    </>
  )
}
