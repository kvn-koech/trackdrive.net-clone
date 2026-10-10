// /features/aws_s3.html
export const meta = {
  title: "AWS S3 | Call Tracking and Analytics | Avortyx",
  description: "Upload call data and recordings to your own Amazon S3 bucket.",
  bodyClass: "avortyx_marketing features_aws_s3 ",
  layout: "feature",
}

export default function AwsS3() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features/integrations.html" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Integrations{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Integrations</p>
          <h1 className="fw-bold mb-2">
            Avortyx +{" "}
            <img alt="AWS S3" className="integration-title-logo" src="/assets/avx-site/img/aws_s3.png" />
          </h1>
          <p className="lead mktg-subpage-hero-subtitle">Upload call data and recordings to your own Amazon S3 bucket.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>The AWS S3 integration with Avortyx provides a way to upload data and recordings directly from Avortyx into AWS S3.</p>
            <h3>How It Works</h3>
            <p>
              Connect your own S3 bucket by providing your AWS credentials and bucket name, then add an{" "}
              <strong>AWS S3 action</strong>
              {" "}to a schedule or automation. When the action runs, Avortyx uploads data — including recording URLs and files — to your bucket.
            </p>
            <ul>
              <li><strong>Secure credential storage</strong> — AWS access keys are encrypted at rest</li>
              <li>
                <strong>Schedule-driven upload</strong>
                {" "}— add an S3 action to a schedule or automation to push data or a remote file (such as a recording URL) to your bucket
              </li>
              <li><strong>Custom path prefixes</strong> — organize uploads within your bucket using configurable folder structures</li>
              <li>
                <strong>Full ownership</strong>
                {" "}— uploaded files live in your AWS account, giving you complete control over retention and access policies
              </li>
            </ul>
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
