// The "View full page ×" strip on feature pages. Close goes back a page (motion.js handles
// data-avx-back; React does not render javascript: links).
export default function FeatureHeader({ route }) {
  return (
    <div id="injected-modal-header" className="feature-modal-actions bg-white p-3 d-flex justify-content-end align-items-center border-bottom" style={{ position: 'sticky', top: '0', zIndex: '9999' }}>
      <a className="feature-modal-fullpage text-decoration-none text-secondary me-3" href={route} target="_blank">
        {' '}<i className="fa-solid fa-up-right-from-square me-1" />View full page{' '}
      </a>
      <a href="/features.html" data-avx-back="" className="btn-close" aria-label="Close" style={{ cursor: 'pointer' }} />
    </div>
  )
}
