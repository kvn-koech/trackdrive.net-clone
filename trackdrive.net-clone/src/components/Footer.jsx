import BrandMark from './BrandMark.jsx'

const COLUMNS = [
  ['Product', [
    ['/features.html', 'Features'],
    ['/features/integrations.html', 'Integrations'],
    ['/pricing.html', 'Pricing'],
    ['/features/api.html', 'REST API Docs'],
    ['/features/dynamic_number_insertion.html', 'Number Insertion Docs'],
  ]],
  ['Features', [
    ['/features.html#ping-post', 'Ping/Post'],
    ['/features.html#call-management', 'Call Management'],
    ['/features.html#automation', 'Automation'],
    ['/features.html#ai', 'AI'],
    ['/features.html#tracking-attribution', 'Tracking & Attribution'],
    ['/features.html#phone-numbers', 'Phone Numbers'],
    ['/features.html#security-compliance-tools', 'Security & Compliance Tools'],
  ]],
  ['Company', [
    ['/terms_of_service.html', 'Terms of Service'],
    ['/privacy_policy.html', 'Privacy Policy'],
    ['/careers.html', 'Careers'],
    ['/brand_assets.html', 'Brand Kit'],
    ['/p/contact.html', 'Contact Us'],
  ]],
]

export default function Footer() {
  return (
    <footer className="marketing-footer pt-5 pb-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <BrandMark gradientId="avx-mk-g-ft" />
            </div>
            <p className="footer-muted small">Call tracking and lead-to-call automation for performance marketers.</p>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="mailto:support@avortyx.com"> <i className="fa-solid fa-envelope me-2" />support@avortyx.com </a>
              </li>
              <li><a href="/p/contact.html"> <i className="fa-solid fa-ticket me-2" />Submit a Ticket </a></li>
            </ul>
          </div>
          {COLUMNS.map(([title, links]) => (
            <div key={title} className="col-lg-3 col-md-6">
              <h6 className="mb-3">{title}</h6>
              <ul className="list-unstyled small">
                {links.map(([href, label]) => (
                  <li key={href} className="mb-2"><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="footer-divider mt-4 mb-3" />
        <p className="footer-muted text-center small mb-0">© 2026 Avortyx. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
