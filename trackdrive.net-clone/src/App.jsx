import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Platform from './pages/Platform.jsx'
import Solutions from './pages/Solutions.jsx'
import Pricing from './pages/Pricing.jsx'
import Integrations from './pages/Integrations.jsx'
import Resources from './pages/Resources.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import FormPage from './pages/FormPage.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'
import './pages.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="resources" element={<Resources />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<FormPage type="contact" />} />
        <Route path="request-access" element={<FormPage type="access" />} />
        <Route path="login" element={<FormPage type="login" />} />
        <Route path="privacy" element={<Legal type="privacy" />} />
        <Route path="terms" element={<Legal type="terms" />} />
        <Route path="tcpa" element={<Legal type="tcpa" />} />
        <Route path="security" element={<Legal type="security" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
