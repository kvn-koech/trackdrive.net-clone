// /features/data_export.html
export const meta = {
  title: "Data Exports - Export Calls, Leads, Recordings & More on a Schedule | Avortyx",
  description: "Export calls, leads, recordings, and messages to CSV — on demand or on a recurring schedule emailed to your team.",
  bodyClass: "avortyx_marketing features_data_export ",
  layout: "feature",
}

export default function DataExport() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#tracking-attribution" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              {" "}Back to Tracking & Attribution{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Tracking & Attribution</p>
          <h1 className="fw-bold mb-2">Data Exports</h1>
          <p className="lead mktg-subpage-hero-subtitle">Export calls, leads, recordings, and messages to CSV — on demand or on a recurring schedule emailed to your team.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>Get your data out of Avortyx and into your own systems. Build an export for exactly the records you need — on demand or on an automated, recurring schedule.</p>
            <h3>Export Almost Any Data Type</h3>
            <p>Avortyx exports a wide range of data types — including calls and call recordings, leads and contacts, text messages, numbers, charge rollups for billing reconciliation, buyer suppression contacts, and change, system, and webhook logs.</p>
            <h3>Pick Your Columns and Filters</h3>
            <p>Choose exactly which columns to include, then narrow the export with a date range, full-text search, and the same filters you use across Avortyx — so you get only the fields and records you actually need.</p>
            <h3>Recurring, Automated Exports</h3>
            <p>
              Set an export to run{" "}
              <strong>automatically on a schedule</strong>
              {" "}— daily, weekly, or monthly, at the time of day you choose. Each run captures a rolling window of new records, so your downstream systems and data warehouse stay continuously up to date with no manual work.
            </p>
            <h3>Delivered by Email</h3>
            <p>
              Have each completed export{" "}
              <strong>emailed to one or more recipients</strong>
              {" "}automatically — your team, your analysts, or a shared inbox — the moment the file is ready. Recipients can unsubscribe from a notification at any time.
            </p>
            <h3>Built for Large Datasets</h3>
            <p>Exports are processed in the background and packaged as a compressed CSV (.zip), so even very large pulls download quickly and reliably. Caller-number PII is automatically redacted for users without access.</p>
            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-2">
              <a href="/features/api.html" className="btn btn-td-green">REST API</a>
              {" "}
              <a href="/features/custom_webhook.html" className="btn btn-outline-td-green">Custom Webhooks</a>
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
