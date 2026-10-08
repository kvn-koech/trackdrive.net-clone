import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

export default function NotFound() {
  return (
    <>
      <PageHero kicker="404" title="This call didn't connect.">
        The page you are looking for does not exist.
      </PageHero>
      <section className="page-section center-row">
        <Link className="button button-primary button-large" to="/">Back to home</Link>
      </section>
    </>
  )
}
