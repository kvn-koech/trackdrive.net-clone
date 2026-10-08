import { Scene3D } from './Scene3D.jsx'

export default function PageHero({ kicker, title, children, scene }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <span className="section-kicker">{kicker}</span>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {scene && <Scene3D variant={scene} />}
    </section>
  )
}
