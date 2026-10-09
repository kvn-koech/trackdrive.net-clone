export function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Avortyx"
      fill="none"
    >
      <defs>
        <linearGradient id="avx-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bfdbfe"/>
          <stop offset="50%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
      </defs>
      <g transform="translate(32 32) scale(1.3) translate(-32 -32)">
        <path d="M52 32a20 20 0 1 1-13.2-18.8" stroke="url(#avx-g)" strokeWidth="4.6" strokeLinecap="round"/>
        <path d="M44.5 32a12.5 12.5 0 1 1-8.9-11.9" stroke="url(#avx-g)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M38 32a6 6 0 1 1-4.2-5.7" stroke="url(#avx-g)" strokeWidth="3.4" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="2.2" fill="#eff6ff"/>
      </g>
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
