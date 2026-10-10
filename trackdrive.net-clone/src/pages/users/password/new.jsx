// /users/password/new.html
export const meta = {
  title: "Forgot Your Password? | Avortyx",
  description: "Reset the password for your Avortyx account.",
  bodyClass: "passwords new without-waves",
  layout: "site",
}

export default function New() {
  return (
    <main>
      <section className="mktg-auth-section">
        <div className="container">
          <div className="mktg-auth-card">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Forgot Your Password?</h2>
              <p className="text-muted mb-0">Enter your email and we'll send you reset instructions.</p>
            </div>
            <form className="simple_form mktg-auth-form" id="new_user" data-become="Avortyx.Base.SimpleForm" noValidate action="/users/password" acceptCharset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓" autoComplete="off" />
              <input type="hidden" name="authenticity_token" value="Tw0GQJVyA00Xvr9ll9zh262fxSUDnx1z-eh44Oy8hF-hN9ZNi7ZnZf0oFB2oU1MY3bP2Hgo0S6_QQ7U54ZTxLA" autoComplete="off" />
              <div className="mb-3">
                <div className="mb-3 js-form-validation form-group email required user_email">
                  <label className="form-label email required" htmlFor="user_email"><abbr title="required">*</abbr> Email</label>
                  <input className="form-control string email required form-control" placeholder="you@company.com" autoFocus required aria-required="true" type="email" name="user[email]" id="user_email" />
                </div>
              </div>
              <button className="btn btn-td-green w-100 py-2 fw-semibold" type="submit">Send Reset Instructions</button>
              <p className="text-center mt-3 mb-0">
                <small> <a className="text-muted text-decoration-none" href="/users/sign_in">Back to sign in</a> </small>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
