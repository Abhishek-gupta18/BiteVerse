import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { triggerPageTransition } from './Transition'

function Login() {
  const [mode, setMode] = useState('password')

  return (
    <main className="auth-shell">
      <div className="auth-stars"></div>
      <div className="auth-glow auth-glow-left"></div>
      <div className="auth-glow auth-glow-right"></div>

      <div className="auth-card">
        <p className="auth-signature">hello from</p>
        <h1>BiteVerse</h1>
        <p className="auth-subtitle">Login to continue your food journey.</p>

        <div className="auth-switch" role="tablist" aria-label="Login mode">
          <span className={`auth-switch-indicator ${mode === 'otp' ? 'otp-active' : ''}`}></span>
          <button
            className={mode === 'password' ? 'active' : ''}
            onClick={() => setMode('password')}
            role="tab"
            aria-selected={mode === 'password'}
          >
            Password
          </button>
          <button
            className={mode === 'otp' ? 'active' : ''}
            onClick={() => setMode('otp')}
            role="tab"
            aria-selected={mode === 'otp'}
          >
            OTP
          </button>
        </div>

        <div className="auth-slider" aria-live="polite">
          <div className={`auth-panels ${mode === 'otp' ? 'otp-active' : ''}`}>
            <div className="auth-panel">
              <form className="auth-form">
                <label htmlFor="identity-input">Username or Email</label>
                <input id="identity-input" type="text" placeholder="alexchef or alex@example.com" />

                <label htmlFor="password-input">Password</label>
                <input id="password-input" type="password" placeholder="Enter your password" />

                <button
                  type="button"
                  className="primary-action"
                  onClick={async (e) => {
                    await triggerPageTransition(0, 0, { duration: 700 })
                    // navigation after animation (adjust as needed)
                    window.location.href = '/'
                  }}
                >Log In</button>
              </form>
            </div>

            <div className="auth-panel">
              <form className="auth-form">
                <label htmlFor="phone-input">Phone Number</label>
                <input id="phone-input" type="tel" placeholder="+91 98765 43210" />

                <label htmlFor="otp-input">OTP</label>
                <div className="otp-row">
                  <input id="otp-input" type="text" placeholder="6-digit OTP" />
                  <button type="button" className="ghost-action">Send OTP</button>
                </div>

                <button type="button" className="primary-action">Verify & Log In</button>
              </form>
            </div>
          </div>
        </div>

        <div className="social-divider">
          <span>or continue with</span>
        </div>

        <div className="social-grid">
          <button type="button" className="social-btn google">Google</button>
          <button type="button" className="social-btn microsoft">Microsoft</button>
        </div>

        <p className="back-home">
          <Link
            to="/register"
            onClick={(e) => {
              // perform animated transition instead of instant nav
              e.preventDefault()
              triggerPageTransition(0, 0, { duration: 700 }).then(() => {
                window.location.href = '/register'
              })
            }}
          >Sign up for BiteVerse</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
