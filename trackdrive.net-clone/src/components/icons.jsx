export function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 42 42"
      role="img"
      aria-label="Avortyx"
    >
      <rect width="42" height="42" rx="11" fill="#84b5ff" />
      <path d="M11 31 19.3 11.8c.7-1.6 2.8-1.6 3.5 0L31 31" fill="none" stroke="#0c1528" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
      <path d="M16.3 24.3h10" fill="none" stroke="#71f2ed" strokeLinecap="round" strokeWidth="3" />
      <circle cx="21" cy="7" r="1.5" fill="#e3ecff" />
    </svg>
  )
}

export function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon-diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 10h11M10 4l6 6-6 6" />
    </svg>
  )
}

export function MenuIcon({ open }) {
  return (
    <span className={open ? 'menu-lines is-open' : 'menu-lines'}>
      <span />
      <span />
    </span>
  )
}
