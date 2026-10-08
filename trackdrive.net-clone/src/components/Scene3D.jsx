import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons.jsx'

const layers = ['Intent', 'Compliance', 'Bidding', 'Routing']
const faces = ['front', 'back', 'right', 'left', 'top', 'bottom']

export function Scene3D({ variant = 'stack', label }) {
  if (variant === 'cube') {
    return (
      <div className="scene3d scene3d-cube" role="img" aria-label={label || 'Animated 3D routing cube'}>
        <div className="scene-floor" />
        <div className="cube">
          {faces.map((face) => <span className={`cube-face cube-${face}`} key={face}>{face === 'front' ? 'A' : ''}</span>)}
        </div>
        <div className="scene-ring ring-a" />
        <div className="scene-ring ring-b" />
        <i className="scene-spark spark-1" /><i className="scene-spark spark-2" /><i className="scene-spark spark-3" />
      </div>
    )
  }

  return (
    <div className="scene3d scene3d-stack" role="img" aria-label={label || 'Animated 3D routing stack'}>
      <div className="stack">
        {layers.map((name, index) => (
          <div className="stack-layer" style={{ '--i': index }} key={name}>
            <span>{name}</span>
          </div>
        ))}
        <div className="stack-beam" />
      </div>
    </div>
  )
}

export function CtaBanner({ title = 'Turn every inbound call into revenue.' }) {
  return (
    <div className="demo-card">
      <div className="demo-content">
        <span className="demo-kicker"><i /> READY WHEN YOU ARE</span>
        <h2>{title}</h2>
        <p>Route with first-ring intent signals, real-time buyer demand, and compliance checks on every connection.</p>
        <div className="demo-actions">
          <Link className="button button-primary button-large" to="/request-access">Book a demo <ArrowIcon /></Link>
          <Link className="demo-email" to="/contact">Talk to our team <ArrowIcon diagonal /></Link>
        </div>
      </div>
      <Scene3D variant="cube" />
    </div>
  )
}
