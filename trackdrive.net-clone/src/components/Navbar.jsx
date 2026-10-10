import BrandMark from './BrandMark.jsx'

const FEATURE_SECTIONS = [
  ['ping-post', 'Ping/Post'],
  ['call-management', 'Call Management'],
  ['automation', 'Automation'],
  ['ai', 'AI'],
  ['tracking-attribution', 'Tracking & Attribution'],
  ['phone-numbers', 'Phone Numbers'],
  ['security-compliance-tools', 'Security & Compliance Tools'],
]

const LINKS = [
  ['/features.html#ai', 'AI'],
  ['/features/integrations.html', 'Integrations'],
  ['/pricing.html', 'Pricing'],
  ['/p/contact.html', 'Contact'],
]

export default function Navbar({ brandHref }) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top marketing-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href={brandHref} style={{ textDecoration: 'none' }}>
          <BrandMark gradientId="avx-mk-g-nav" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#marketingNav" aria-controls="marketingNav" aria-expanded="false" aria-label="Toggle navigation">
          {' '}<span className="navbar-toggler-icon" />{' '}
        </button>
        <div className="collapse navbar-collapse" id="marketingNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item dropdown marketing-hover-dropdown">
              <a className="nav-link" href="/features.html" id="featuresDropdown"> Features </a>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                {FEATURE_SECTIONS.map(([id, label]) => (
                  <li key={id}><a className="dropdown-item" href={`/features.html#${id}`}>{label}</a></li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item fw-semibold" href="/features.html">View All Features</a></li>
              </ul>
            </li>
            {LINKS.map(([href, label]) => (
              <li key={href} className="nav-item"><a className="nav-link" href={href}>{label}</a></li>
            ))}
            <li className="nav-item"><a className="nav-link" href="https://help.avortyx.com" target="_blank">Help Center</a></li>
            <li className="nav-item"><a className="nav-link" href="/users/sign_in.html">Sign In</a></li>
            <li className="nav-item ms-lg-2"><a className="btn btn-td-green btn-sm px-3" href="/sign_up.html">Sign Up Free</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
