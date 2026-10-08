import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const configs = {
  contact: {
    kicker: 'CONTACT',
    title: 'Talk to our team.',
    intro: 'Questions about routing, pricing or integrations? We reply within one business day.',
    submit: 'Send message',
    success: 'Thanks! Your message is on its way. We will reply within one business day.',
    fields: ['name', 'email', 'message'],
  },
  access: {
    kicker: 'REQUEST ACCESS',
    title: 'Book a demo.',
    intro: 'Tell us about your call volume and we will set up a tailored walkthrough.',
    submit: 'Request access',
    success: 'Request received! We will email you shortly to schedule your demo.',
    fields: ['name', 'email', 'company', 'volume'],
  },
  login: {
    kicker: 'LOG IN',
    title: 'Welcome back.',
    intro: 'Sign in to your Avortyx workspace.',
    submit: 'Log in',
    success: 'This prototype has no live accounts. Request access to get started.',
    fields: ['email', 'password'],
  },
}

const labels = {
  name: 'Full name',
  email: 'Work email',
  message: 'How can we help?',
  company: 'Company',
  volume: 'Monthly calls',
  password: 'Password',
}

export default function FormPage({ type }) {
  const config = configs[type]
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    config.fields.forEach((field) => {
      const value = (values[field] || '').trim()
      if (!value) next[field] = `${labels[field]} is required.`
      else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) next[field] = 'Enter a valid email address.'
    })
    setErrors(next)
    if (Object.keys(next).length === 0) setDone(true)
  }

  return (
    <>
      <PageHero kicker={config.kicker} title={config.title}>{config.intro}</PageHero>
      <section className="page-section form-section">
        {done ? (
          <div className="form-card form-success" role="status">
            <h3>All set</h3>
            <p>{config.success}</p>
            <Link className="text-link" to="/">Back to home</Link>
          </div>
        ) : (
          <form className="form-card" onSubmit={submit} noValidate>
            {config.fields.map((field) => (
              <label key={field}>
                <span>{labels[field]}</span>
                {field === 'message' ? (
                  <textarea rows="5" value={values[field] || ''} onChange={(e) => setValues({ ...values, [field]: e.target.value })} aria-invalid={Boolean(errors[field])} />
                ) : field === 'volume' ? (
                  <select value={values[field] || ''} onChange={(e) => setValues({ ...values, [field]: e.target.value })} aria-invalid={Boolean(errors[field])}>
                    <option value="">Select…</option>
                    <option>Under 500</option>
                    <option>500 – 5,000</option>
                    <option>5,000+</option>
                  </select>
                ) : (
                  <input
                    type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                    value={values[field] || ''}
                    onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                    aria-invalid={Boolean(errors[field])}
                    autoComplete={field === 'password' ? 'current-password' : field === 'email' ? 'email' : undefined}
                  />
                )}
                {errors[field] && <em className="field-error">{errors[field]}</em>}
              </label>
            ))}
            <button className="button button-primary button-large" type="submit">{config.submit}</button>
            {type === 'login' && <p className="form-alt">New here? <Link to="/request-access">Request access</Link></p>}
          </form>
        )}
      </section>
    </>
  )
}
