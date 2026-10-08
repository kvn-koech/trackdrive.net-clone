import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowIcon, BrandMark, MenuIcon } from './icons.jsx'

const navItems = [
  ['Platform', '/platform'],
  ['Features', '/features'],
  ['Solutions', '/solutions'],
  ['Pricing', '/pricing'],
  ['Integrations', '/integrations'],
  ['Resources', '/resources'],
]

const footerColumns = [
  {
    title: 'Product',
    links: [
      ['Platform', '/platform'],
      ['Features', '/features'],
      ['Solutions', '/solutions'],
      ['Pricing', '/pricing'],
      ['Integrations', '/integrations'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Documentation', '/resources#docs'],
      ['API reference', '/resources#api'],
      ['Webhooks', '/resources#webhooks'],
      ['Status', '/resources#status'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Careers', '/careers'],
      ['Contact', '/contact'],
      ['Book a demo', '/request-access'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['TCPA', '/tcpa'],
      ['Security', '/security'],
    ],
  },
]

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const handleBrandClick = () => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" to="/" onClick={handleBrandClick} aria-label="Avortyx home">
            <BrandMark />
            <span>AVORTYX</span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
            {navItems.map(([label, to]) => (
              <NavLink key={to} to={to} onClick={closeMenu}>{label}</NavLink>
            ))}
            <div className="mobile-nav-actions">
              <Link className="nav-login" to="/login" onClick={closeMenu}>Log in <ArrowIcon diagonal /></Link>
              <Link className="button button-primary" to="/request-access" onClick={closeMenu}>Request access <ArrowIcon /></Link>
            </div>
          </nav>
          <div className="desktop-nav-actions">
            <Link className="nav-login" to="/login">Log in <ArrowIcon diagonal /></Link>
            <Link className="button button-primary nav-cta" to="/request-access">Request access <ArrowIcon /></Link>
          </div>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <Link className="brand footer-brand" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><BrandMark /><span>AVORTYX</span></Link>
            <p>Real-time call scoring, routing, and analytics for pay-per-call networks.</p>
            <Link className="footer-email" to="/request-access">Book a demo <ArrowIcon diagonal /></Link>
            <Link className="footer-ticket" to="/platform">Explore the platform <ArrowIcon /></Link>
          </div>
          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Avortyx. All rights reserved.</span>
          <span>PAY-PER-CALL INTELLIGENCE PLATFORM <i>✳</i></span>
        </div>
      </footer>
    </>
  )
}
