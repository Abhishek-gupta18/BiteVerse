import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { triggerPageTransition } from './Transition'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Password mode state
  const [identity, setIdentity] = useState('')
  const [password, setPassword] = useState('')

  // OTP mode state
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!identity || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        [identity.includes('@') ? 'email' : 'username']: identity,
        password,
      })

      setSuccess('Login successful!')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('username', response.data.username)

      await triggerPageTransition(0, 0, { duration: 700 })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!phone) {
      setError('Please enter your phone number')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/auth/request-otp`, {
        phone,
      })

      setSuccess('OTP sent successfully!')
      setOtpSent(true)

      // For development - show the OTP
      if (response.data.dev_otp) {
        console.log('Dev OTP:', response.data.dev_otp)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!otp) {
      setError('Please enter the OTP')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/auth/verify-otp`, {
        identifier: phone,
        otp,
      })

      setSuccess('Login successful!')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('username', response.data.username)

      await triggerPageTransition(0, 0, { duration: 700 })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-stars"></div>
      <div className="auth-glow auth-glow-left"></div>
      <div className="auth-glow auth-glow-right"></div>

      <div className="auth-card">
        <p className="auth-signature">hello from</p>
        <h1>BiteVerse</h1>
        <p className="auth-subtitle">Login to continue your food journey.</p>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}
        {success && <div style={{ color: '#22c55e', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(34,197,94,0.1)', borderRadius: '8px' }}>{success}</div>}

        <div className="auth-switch" role="tablist" aria-label="Login mode">
          <span className={`auth-switch-indicator ${mode === 'otp' ? 'otp-active' : ''}`}></span>
          <button
            className={mode === 'password' ? 'active' : ''}
            onClick={() => {
              setMode('password')
              setError('')
              setOtp('')
              setOtpSent(false)
            }}
            role="tab"
            aria-selected={mode === 'password'}
          >
            Password
          </button>
          <button
            className={mode === 'otp' ? 'active' : ''}
            onClick={() => {
              setMode('otp')
              setError('')
              setPassword('')
            }}
            role="tab"
            aria-selected={mode === 'otp'}
          >
            OTP
          </button>
        </div>

        <div className="auth-slider" aria-live="polite">
          <div className={`auth-panels ${mode === 'otp' ? 'otp-active' : ''}`}>
            <div className="auth-panel">
              <form className="auth-form" onSubmit={handlePasswordLogin}>
                <label htmlFor="identity-input">Username or Email</label>
                <input
                  id="identity-input"
                  type="text"
                  placeholder="alexchef or alex@example.com"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  disabled={loading}
                />

                <label htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                <button type="submit" className="primary-action" disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </form>
            </div>

            <div className="auth-panel">
              <form className="auth-form" onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}>
                {!otpSent ? (
                  <>
                    <label htmlFor="phone-input">Phone Number</label>
                    <input
                      id="phone-input"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                    />

                    <button type="submit" className="primary-action" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor="otp-input">Enter OTP</label>
                    <div className="otp-row">
                      <input
                        id="otp-input"
                        type="text"
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength="6"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="ghost-action"
                        onClick={handleRequestOtp}
                        disabled={loading}
                      >
                        Resend
                      </button>
                    </div>

                    <button type="submit" className="primary-action" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify & Log In'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false)
                        setOtp('')
                      }}
                      className="ghost-action"
                      style={{ marginTop: '0.5rem' }}
                    >
                      Back
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="social-divider">
          <span>or continue with</span>
        </div>

        <div className="social-grid">
          <button type="button" className="social-btn google" disabled={loading}>Google</button>
          <button type="button" className="social-btn microsoft" disabled={loading}>Microsoft</button>
        </div>

        <p className="back-home">
          <Link
            to="/register"
            onClick={(e) => {
              e.preventDefault()
              triggerPageTransition(0, 0, { duration: 700 }).then(() => {
                navigate('/register')
              })
            }}
          >Sign up for BiteVerse</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
