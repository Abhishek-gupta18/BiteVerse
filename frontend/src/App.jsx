import './App.css'
import { useNavigate } from 'react-router-dom'
import { triggerPageTransition } from './Transition'

function App() {
  const navigate = useNavigate()

  const handleNavClick = (event) => {
    const link = event.currentTarget
    const rect = link.getBoundingClientRect()
    const ripple = document.createElement('span')

    ripple.className = 'drop-ripple'
    ripple.style.left = `${event.clientX - rect.left}px`
    ripple.style.top = `${event.clientY - rect.top}px`

    link.appendChild(ripple)
    window.setTimeout(() => ripple.remove(), 700)
  }

  return (
    <main className="landing">
      <div className="sky-layer"></div>
      <div className="orb orb-left"></div>
      <div className="orb orb-right"></div>

      <header className="topbar">
        <div className="brand">BiteVerse</div>
        <nav className="nav-links" aria-label="Primary">
          <a className="nav-item" href="#features" onClick={handleNavClick}>
            <span>Features</span>
          </a>
          <a className="nav-item" href="#how" onClick={handleNavClick}>
            <span>How it Works</span>
          </a>
          <a className="nav-item" href="#community" onClick={handleNavClick}>
            <span>Community</span>
          </a>
          <a className="nav-item" href="#events" onClick={handleNavClick}>
            <span>Events</span>
          </a>
          <a className="nav-item" href="#contact" onClick={handleNavClick}>
            <span>Contact</span>
          </a>
        </nav>
          <button
            className="login-btn"
            onClick={async (e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = rect.left + rect.width / 2
              const y = rect.top + rect.height / 2
              const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-gradient') || 'linear-gradient(135deg,#0f172a,#0b2545)'
              await triggerPageTransition(x, y, { color, type: 'random', duration: 700 })
              navigate('/login')
            }}
          >Get Started</button>
      </header>

      <section className="hero" id="home">
        <p className="signature">hello, we are</p>
        <h1>BiteVerse</h1>
        <p className="subtitle">
          Where food creators, home chefs, and hungry explorers meet. Build your
          food circle, discover flavors nearby, and turn every meal into a shared story.
        </p>

        <div className="cta-row">
          <button className="cta secondary">Mobile App Coming Soon</button>
          <button className="cta primary">Explore in Web</button>
        </div>
      </section>

      <section className="stats" id="features">
        <article>
          <h2>2.5K+</h2>
          <p>Food creators already sharing menus and stories</p>
        </article>
        <article>
          <h2>180+</h2>
          <p>City circles planning popups and tasting nights</p>
        </article>
        <article>
          <h2>24/7</h2>
          <p>Instant OTP + secure JWT login for every user</p>
        </article>
      </section>
    </main>
  )
}

export default App
