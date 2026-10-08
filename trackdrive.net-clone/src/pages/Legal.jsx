import PageHero from '../components/PageHero.jsx'

const docs = {
  privacy: ['Privacy Policy', [
    ['Information we collect', 'We collect account details, call metadata and usage data needed to provide routing and reporting.'],
    ['How we use it', 'We use data to operate the service, prevent fraud, meet compliance obligations and improve the product.'],
    ['Sharing', 'We share data only with processors that help deliver the service and when required by law.'],
    ['Your choices', 'You may request access, correction or deletion of your data by contacting us.'],
  ]],
  terms: ['Terms of Service', [
    ['Using the service', 'You agree to use Avortyx lawfully and to keep your credentials secure.'],
    ['Billing', 'Fees are billed according to your plan. Plans renew until cancelled.'],
    ['Acceptable use', 'You may not use the service to place unlawful, deceptive or unsolicited calls.'],
    ['Liability', 'The service is provided as is to the extent permitted by law.'],
  ]],
  tcpa: ['TCPA Compliance', [
    ['Screening on every call', 'Avortyx checks calls against TCPA, DNC and VOIP rules before connecting to a buyer.'],
    ['Consent', 'Customers are responsible for obtaining and recording consent from their leads.'],
    ['Records', 'Call and consent records can be retained and exported for audits.'],
  ]],
  security: ['Security', [
    ['Infrastructure', 'Data is encrypted in transit and at rest on hardened cloud infrastructure.'],
    ['Access control', 'Role-based access, audit logs and API key management protect your workspace.'],
    ['Certifications', 'SOC 2 and HIPAA readiness are available on Enterprise plans.'],
  ]],
}

export default function Legal({ type }) {
  const [title, sections] = docs[type]
  return (
    <>
      <PageHero kicker="LEGAL" title={title}>This is a prototype document and not legal advice.</PageHero>
      <section className="page-section legal-doc">
        {sections.map(([heading, text]) => (
          <div key={heading}><h2>{heading}</h2><p>{text}</p></div>
        ))}
      </section>
    </>
  )
}
