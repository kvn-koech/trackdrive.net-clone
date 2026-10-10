// /p/contact.html
export const meta = {
  title: "Contact | Avortyx",
  description: "Talk to the Avortyx team about call tracking, ping/post and lead automation, or get help with your account.",
  bodyClass: "avortyx_marketing contact ",
  layout: "site",
}

export default function Contact() {
  return (
    <main>
      <section className="mktg-auth-section">
        <div className="container">
          <div className="mktg-auth-card mktg-auth-card--wide">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Get in Touch</h2>
              <p className="text-muted mb-0">Have a question or need help? Send us a message and we'll respond promptly.</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-4 mb-4 pb-3 border-bottom mktg-contact-links">
              <a href="mailto:support@avortyx.com" className="d-flex align-items-center text-decoration-none text-body">
                {" "}
                <i className="fa-solid fa-envelope text-success me-2" aria-hidden="true" />
                {" "}
                <span className="fw-semibold small">support@avortyx.com</span>
                {" "}
              </a>
              {" "}
              <a href="/p/request_demo.html" className="d-flex align-items-center text-decoration-none text-body">
                {" "}
                <i className="fa-solid fa-desktop text-success me-2" aria-hidden="true" />
                {" "}
                <span className="fw-semibold small">Request a Demo</span>
                {" "}
              </a>
            </div>
            <form className="simple_form contact-form" id="new_contact_request" action="https://avortyx.com/contact_requests" acceptCharset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓" autoComplete="off" />
              <input type="hidden" name="authenticity_token" value="e4f3LRf-elFcayYwsiYRpt950BX4udrK4QsszeoMMEVVAvm7CHjHMxTbLpwFM5hrid5bYJ1czo4nSzu5Xc1skA" autoComplete="off" />
              <div className="row mb-3 js-form-validation form-group string required contact_request_first_name">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="contact_request_first_name">
                  <abbr title="required">*</abbr>
                  {" "}First Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" required aria-required="true" type="text" name="contact_request[first_name]" id="contact_request_first_name" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required contact_request_last_name">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="contact_request_last_name">
                  <abbr title="required">*</abbr>
                  {" "}Last Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" required aria-required="true" type="text" name="contact_request[last_name]" id="contact_request_last_name" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group email required contact_request_email">
                <label className="col-sm-3 col-form-label text-start text-sm-end email required" htmlFor="contact_request_email">
                  <abbr title="required">*</abbr>
                  {" "}Email
                </label>
                <div className="col-sm-9">
                  <input className="form-control string email required" required aria-required="true" type="email" name="contact_request[email]" id="contact_request_email" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group tel required contact_request_phone_number">
                <label className="col-sm-3 col-form-label text-start text-sm-end tel required" htmlFor="contact_request_phone_number">
                  <abbr title="required">*</abbr>
                  {" "}Phone Number
                </label>
                <div className="col-sm-9">
                  <input className="form-control string tel required" required aria-required="true" type="tel" name="contact_request[phone_number]" id="contact_request_phone_number" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required contact_request_company">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="contact_request_company">
                  <abbr title="required">*</abbr>
                  {" "}Company Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" required aria-required="true" type="text" name="contact_request[company]" id="contact_request_company" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string optional contact_request_microsoft_teams">
                <label className="col-sm-3 col-form-label text-start text-sm-end string optional" htmlFor="contact_request_microsoft_teams">
                  Microsoft Teams{" "}
                  <span className="text-muted fw-normal">(optional)</span>
                </label>
                <div className="col-sm-9">
                  <input className="form-control string optional" placeholder="your-handle" type="text" name="contact_request[microsoft_teams]" id="contact_request_microsoft_teams" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group check_boxes optional contact_request_feature_interests">
                <label className="col-sm-3 col-form-label pt-0 check_boxes optional">Features of Interest</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Real Time Ping/Post" name="contact_request[feature_interests][]" id="contact_request_feature_interests_real_time_pingpost" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_real_time_pingpost">Real Time Ping/Post</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="AI Voice Agents" name="contact_request[feature_interests][]" id="contact_request_feature_interests_ai_voice_agents" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_ai_voice_agents">AI Voice Agents</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Call Tracking" name="contact_request[feature_interests][]" id="contact_request_feature_interests_call_tracking" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_call_tracking">Call Tracking</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Call Transcription" name="contact_request[feature_interests][]" id="contact_request_feature_interests_call_transcription" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_call_transcription">Call Transcription</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Agents / Call Centers" name="contact_request[feature_interests][]" id="contact_request_feature_interests_agents__call_centers" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_agents__call_centers">Agents / Call Centers</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Lead Automation" name="contact_request[feature_interests][]" id="contact_request_feature_interests_lead_automation" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_lead_automation">Lead Automation</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Spam Tag Mitigation" name="contact_request[feature_interests][]" id="contact_request_feature_interests_spam_tag_mitigation" />
                    <label className="form-check-label collection_check_boxes" htmlFor="contact_request_feature_interests_spam_tag_mitigation">Spam Tag Mitigation</label>
                  </div>
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group text required contact_request_message">
                <label className="col-sm-3 col-form-label text-start text-sm-end text required" htmlFor="contact_request_message">
                  <abbr title="required">*</abbr>
                  {" "}Message
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control text required" rows="4" required aria-required="true" name="contact_request[message]" id="contact_request_message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3" />
              </div>
              <div className="row">
                <div className="col-sm-9 offset-sm-3">
                  <button type="submit" className="btn btn-td-green px-4 py-2 fw-semibold">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
