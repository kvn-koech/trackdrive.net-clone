// /features/adwords.html
export const meta = {
  title: "Google Ads Call Conversion Tracking Integration | Avortyx",
  description: "Report the calls your Google Ads clicks produce back to Google Ads as conversions.",
  bodyClass: "avortyx_marketing integrations_adwords ",
  layout: "feature",
}

export default function Adwords() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features/integrations.html" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Integrations{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Integrations</p>
          <h1 className="fw-bold mb-2">Google Ads Integration</h1>
          <p className="lead mktg-subpage-hero-subtitle">Report the calls your Google Ads clicks produce back to Google Ads as conversions.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <div className="google-ads-install rounded-3 p-4 mb-4">
              <p className="fw-bold mb-2">Available on every Avortyx account</p>
              <p className="mb-3">Open Integrations and click <strong>+ Install</strong> on Google Ads to connect your Google account.</p>
            </div>
            <div className="bg-light rounded-3 p-4 mb-4">
              <h5 className="fw-bold text-center mb-3">How the Google Ads Integration Works</h5>
              <div className="flow-diagram">
                <div className="flow-node">
                  <div className="flow-node-icon bg-primary text-white"><i className="fa-solid fa-link" aria-hidden="true" /></div>
                  <div className="flow-node-label">Connect</div>
                  <div className="flow-node-desc">Link your Google account</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-info text-white"><i className="fa-solid fa-building" aria-hidden="true" /></div>
                  <div className="flow-node-label">Choose Account</div>
                  <div className="flow-node-desc">Pick a Google Ads client account</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-warning text-white"><i className="fa-solid fa-arrows-left-right" aria-hidden="true" /></div>
                  <div className="flow-node-label">Map Offers</div>
                  <div className="flow-node-desc">Offer to conversion action</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-secondary text-white"><i className="fa-solid fa-phone-flip" aria-hidden="true" /></div>
                  <div className="flow-node-label">Call Finishes</div>
                  <div className="flow-node-desc">Click ID read from its token</div>
                </div>
                <div className="flow-arrow"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></div>
                <div className="flow-node">
                  <div className="flow-node-icon bg-success text-white"><i className="fa-solid fa-chart-line" aria-hidden="true" /></div>
                  <div className="flow-node-label">Conversion Reported</div>
                  <div className="flow-node-desc">Valued at the call revenue</div>
                </div>
              </div>
            </div>
            <h3>Send the calls your ads drive into Google Ads.</h3>
            <p>
              A click on a Google ad carries a click ID to your landing page. When that click ID reaches the call as a{" "}
              <a href="/features/dynamic_number_insertion.html">token</a>
              , Avortyx reports the finished call back to Google Ads, so your campaigns bid on the clicks that turn into revenue.
            </p>
            <ul className="text-muted">
              <li><strong>Connect your Google account</strong> — grant Avortyx access from the integration page.</li>
              <li>
                <strong>Choose a Google Ads client account</strong>
                {" "}— conversions are reported to the client account you select. Manager accounts cannot be selected.
              </li>
              <li>
                <strong>Map each offer to a conversion action</strong>
                {" "}— pick an existing conversion action or create a new one. The click ID is read from the{" "}
                <code>gclid</code>
                {" "}token by default.
              </li>
              <li>
                <strong>Report every finished call</strong>
                {" "}— each finished call on a mapped offer that carries a click ID is reported to Google Ads as a conversion, valued at the call's revenue.
              </li>
            </ul>
            <div className="google-ads-click-reveal js-google-ads-click-reveal rounded-3 p-4 my-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <h5 className="fw-bold mt-0 mb-0">What a Google Ads click carries</h5>
                <span className="badge google-ads-click-reveal-badge js-click-reveal-badge">Sample values</span>
              </div>
              <p className="text-muted mb-3 js-click-reveal-caption">These are sample values. Arrive on this page from a Google ad and you will see what your own click carried.</p>
              <table className="table table-sm mb-0">
                <tbody>
                  <tr className="js-click-reveal-row" data-click-key="gclid">
                    <th scope="row" className="google-ads-click-reveal-key">Google click ID <code>gclid</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">Cj0KCQjw-SAMPLE-click-id</td>
                  </tr>
                  <tr className="js-click-reveal-row d-none" data-click-key="gbraid">
                    <th scope="row" className="google-ads-click-reveal-key">Google app click ID (iOS) <code>gbraid</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value" />
                  </tr>
                  <tr className="js-click-reveal-row d-none" data-click-key="wbraid">
                    <th scope="row" className="google-ads-click-reveal-key">Google web click ID (iOS) <code>wbraid</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value" />
                  </tr>
                  <tr className="js-click-reveal-row" data-click-key="utm_source">
                    <th scope="row" className="google-ads-click-reveal-key">Source <code>utm_source</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">google</td>
                  </tr>
                  <tr className="js-click-reveal-row" data-click-key="utm_medium">
                    <th scope="row" className="google-ads-click-reveal-key">Medium <code>utm_medium</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">cpc</td>
                  </tr>
                  <tr className="js-click-reveal-row" data-click-key="utm_campaign">
                    <th scope="row" className="google-ads-click-reveal-key">Campaign <code>utm_campaign</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">final-expense-calls</td>
                  </tr>
                  <tr className="js-click-reveal-row" data-click-key="utm_term">
                    <th scope="row" className="google-ads-click-reveal-key">Keyword <code>utm_term</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">final expense insurance</td>
                  </tr>
                  <tr className="js-click-reveal-row" data-click-key="utm_content">
                    <th scope="row" className="google-ads-click-reveal-key">Ad variant <code>utm_content</code></th>
                    <td className="google-ads-click-reveal-value js-click-reveal-value">ad-a</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/dynamic_number_insertion.html" className="btn btn-outline-td-green">Dynamic Number Insertion</a>
            </div>
          </div>
        </div>
      </section>
      <section className="marketing-cta-band">
        <div className="marketing-cta-band__bg" aria-hidden="true"><img alt="" src="/assets/avx-site/img/constellation-light.svg" /></div>
        <div className="container">
          <h2 className="marketing-cta-band__title">Ready to get started?</h2>
          <p className="marketing-cta-band__subtitle">See how Avortyx turns every lead into a routed, tracked and paid call — start free, or book a walkthrough with a specialist.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a href="/sign_up.html" className="btn btn-cta-primary fw-semibold">Sign Up Free</a>
            {" "}
            <a href="/p/contact.html" className="btn btn-cta-outline fw-semibold">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  )
}
