import FeatureHeader from './FeatureHeader.jsx'
import FeatureModal from './FeatureModal.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

// Every page: the navbar (or, on feature pages, the "View full page" strip), the page's
// <main>, the footer and the feature pop-up shell.
export default function Layout({ route, layout, children }) {
  const home = route === '/'
  return (
    <>
      {layout === 'feature' ? <FeatureHeader route={route} /> : <Navbar brandHref={home ? '#' : '/'} />}
      <div className="container" />
      {children}
      <Footer />
      <FeatureModal fullPageHref={home ? '#' : route + '#'} />
    </>
  )
}
