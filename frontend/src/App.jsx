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

  const handleFeaturesClick = async (e) => {
    handleNavClick(e);
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/features');
  };

  const handleWorkClick = async (e) => {
    handleNavClick(e);
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/work');
  };

  const handleContactClick = async (e) => {
    handleNavClick(e);
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/contact');
  };

  const handleEventsClick = async (e) => {
    handleNavClick(e);
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/events');
  };

  const handleCommunityClick = async (e) => {
    handleNavClick(e);
    await triggerPageTransition(0, 0, { duration: 700 });
    navigate('/community');
  };

  return (
    <main className="landing">
      <div className="sky-layer"></div>
      <div className="orb orb-left"></div>
      <div className="orb orb-right"></div>

      <header className="topbar">
        <div className="brand">BiteVerse</div>
        <nav className="nav-links" aria-label="Primary">
          <button className="nav-item" onClick={handleFeaturesClick}>
            <span>Features</span>
          </button>
          <button className="nav-item" onClick={handleWorkClick}>
            <span>How it Works</span>
          </button>
          <button className="nav-item" onClick={handleCommunityClick}>
            <span>Community</span>
          </button>
          <button className="nav-item" onClick={handleEventsClick}>
            <span>Events</span>
          </button>
          <button className="nav-item" onClick={handleContactClick}>
            <span>Contact</span>
          </button>
        </nav>
          <button
            className="login-btn"
            onClick={async () => {
              await triggerPageTransition(0, 0, { duration: 700 })
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
