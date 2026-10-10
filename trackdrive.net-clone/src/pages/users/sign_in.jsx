// /users/sign_in.html
export const meta = {
  title: "Sign in | Avortyx",
  description: "Sign in to your Avortyx account.",
  bodyClass: "sessions new without-waves",
  layout: "site",
}

export default function SignIn() {
  return (
    <main>
      <section className="mktg-auth-section">
        <div className="container">
          <div className="mktg-auth-card">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Welcome Back</h2>
              <p className="text-muted mb-0">
                Sign in to your Avortyx account. Don't have an account?{" "}
                <a href="/sign_up.html" className="text-decoration-none fw-semibold mktg-link-green">Sign up free</a>
              </p>
            </div>
            <form className="simple_form mktg-auth-form" id="new_user" data-become="Avortyx.Base.SimpleForm" noValidate action="sign_in.html" acceptCharset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓" autoComplete="off" />
              <input type="hidden" name="authenticity_token" value="jfoFZS7tbzagC6dA7kTu4uOzm-Sd9dKpMktWT3-pjhWjfwvzMWvSVOi7r-xZUWcvtRQQkfgQxu30C0E7yGjSwA" autoComplete="off" />
              <div className="mb-3">
                <div className="mb-3 js-form-validation form-group email required user_email">
                  <label className="form-label email required" htmlFor="user_email"><abbr title="required">*</abbr> Email</label>
                  <input className="form-control string email required form-control" placeholder="you@company.com" autoFocus required aria-required="true" type="email" name="user[email]" id="user_email" />
                </div>
              </div>
              <div className="mb-3">
                <div className="mb-3 js-form-validation form-group password required user_password">
                  <label className="form-label password required" htmlFor="user_password"><abbr title="required">*</abbr> Password</label>
                  <input className="form-control password required form-control" autoComplete="off" placeholder="Your password" required aria-required="true" type="password" name="user[password]" id="user_password" />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="user[remember_me]" id="remember_me" value="1" defaultChecked />
                  {" "}
                  <label className="form-check-label small text-muted" htmlFor="remember_me">Remember me</label>
                </div>
                <a href="/users/password/new.html" className="small text-muted text-decoration-none">Forgot password?</a>
              </div>
              <button className="btn btn-td-green w-100 py-2 fw-semibold" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
