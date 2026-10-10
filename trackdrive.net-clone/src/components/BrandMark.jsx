// The Avortyx vortex mark followed by the wordmark. Each copy on a page needs its own gradient id.
export default function BrandMark({ gradientId }) {
  const stroke = `url(#${gradientId})`
  return (
    <>
      <span className="avx-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--vortyx-bright)' }} />
              <stop offset="55%" style={{ stopColor: 'var(--vortyx-teal)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--vortyx-deep)' }} />
            </linearGradient>
          </defs>
          <g transform="translate(32 32) scale(1.3) translate(-32 -32)">
            <path className="avx-mk-r1" d="M52 32a20 20 0 1 1-13.2-18.8" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <path className="avx-mk-r2" d="M44.5 32a12.5 12.5 0 1 1-8.9-11.9" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".9" />
            <path className="avx-mk-r3" d="M38 32a6 6 0 1 1-4.2-5.7" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity=".8" />
            <circle cx="32" cy="32" r="1.7" style={{ fill: 'var(--vortyx-ultra)' }} />
          </g>
        </svg>
      </span>
      <span className="avx-wordmark" style={{ fontSize: '32px', fontWeight: '800', fontFamily: "'Inter', sans-serif", letterSpacing: '-1.5px' }}>Avortyx</span>
    </>
  )
}
