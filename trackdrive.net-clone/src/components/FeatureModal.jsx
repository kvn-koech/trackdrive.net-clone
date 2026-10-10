// Shell for the feature pop-up. site.js fills the body with the clicked feature page and
// points "Open full page" at it.
export default function FeatureModal({ fullPageHref }) {
  return (
    <div className="modal fade feature-modal" id="featureModal" tabIndex="-1" aria-hidden="true" aria-label="Feature details">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="feature-modal-actions">
            <a className="feature-modal-fullpage" href={fullPageHref} target="_blank" rel="noopener">
              {' '}<i className="fa-solid fa-up-right-from-square me-1" />Open full page{' '}
            </a>
            {' '}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body" data-feature-modal-body="">
            <div className="feature-modal-loading">
              <span className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
