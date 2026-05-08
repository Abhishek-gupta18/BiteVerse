import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { triggerPageTransition } from './Transition'
import { collegeOptions } from './collegeOptions'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

const takenUsernames = ['bitechef', 'student42', 'teacherpro', 'alexverse']

const createCartoonAvatar = (seed) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&radius=18&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`

function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [college, setCollege] = useState('')
  const [showAddCollege, setShowAddCollege] = useState(false)
  const [newCollege, setNewCollege] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [defaultAvatarSeed, setDefaultAvatarSeed] = useState(() => Math.random().toString(36).slice(2, 12))
  const [documentFile, setDocumentFile] = useState(null)
  const [documentPreview, setDocumentPreview] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('idle')
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const avatarPreview = profileImage || createCartoonAvatar(defaultAvatarSeed)

  const passwordRules = useMemo(
    () => ({
      minLength: password.length >= 8,
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  )

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPhoneValid = /^[0-9]{7,15}$/.test(phone.replace(/\D/g, ''))
  const usernamePatternValid = /^[a-zA-Z0-9_.]{3,20}$/.test(username)
  const passwordValid = passwordRules.minLength && passwordRules.number && passwordRules.special
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  const errors = {
    role: !role ? 'Select a role.' : '',
    fullName: !fullName.trim() ? 'Full name is required.' : '',
    username: !username.trim()
      ? 'Username is required.'
      : !usernamePatternValid
        ? '3-20 chars. Use letters, numbers, _ or .'
        : takenUsernames.includes(username.toLowerCase())
          ? 'Username is already taken.'
          : '',
    dob: !dob ? 'Date of birth is required.' : '',
    email: !email.trim() ? 'Email ID is required.' : !isEmailValid ? 'Enter a valid email address.' : '',
    phone: !phone.trim() ? 'Phone number is required.' : !isPhoneValid ? 'Enter a valid phone number.' : '',
    password: !password.trim()
      ? 'Password is required.'
      : !passwordValid
        ? 'Use at least 8 characters with a number and special character.'
        : '',
    confirmPassword: !confirmPassword.trim()
      ? 'Please confirm your password.'
      : !passwordsMatch
        ? 'Passwords do not match.'
        : '',
    college: !(college.trim() || newCollege.trim()) ? 'College selection is required.' : '',
    documentFile: !documentFile ? 'Upload college proof.' : '',
    profileImage: '',
  }

  const hasErrors = Object.values(errors).some(Boolean)

  const handleUsernameBlur = () => {
    if (!username.trim() || !usernamePatternValid) {
      setUsernameStatus('idle')
      return
    }

    setUsernameStatus(takenUsernames.includes(username.toLowerCase()) ? 'taken' : 'available')
  }

  const handleDocumentChange = (file) => {
    if (!file) return
    setDocumentFile(file)
    if (documentPreview) {
      URL.revokeObjectURL(documentPreview)
    }
    setDocumentPreview(URL.createObjectURL(file))
  }

  const handleImageChange = (file) => {
    if (!file) return
    setProfileImage(URL.createObjectURL(file))
  }

  const handleAvatarRefresh = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDefaultAvatarSeed(Math.random().toString(36).slice(2, 12))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    
    setTouched({
      role: true,
      fullName: true,
      username: true,
      dob: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      college: true,
      documentFile: true,
    })

    if (!hasErrors) {
      setLoading(true)
      try {
        const response = await axios.post(`${API_BASE}/auth/register`, {
          username,
          email,
          phone: phone ? `${countryCode}${phone}` : null,
          password,
          fullName,
          dob: dob || null,
          college: college || newCollege,
          role,
          avatar: profileImage || createCartoonAvatar(defaultAvatarSeed),
        })

        setSuccess('Registration successful!')
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('username', response.data.username)

        await triggerPageTransition(0, 0, { duration: 700 })
        navigate('/dashboard')
      } catch (err) {
        setError(err.response?.data?.error || 'Registration failed')
        setLoading(false)
      }
    }
  }
  return (
    <main className="register-shell">
      <div className="register-stars"></div>
      <div className="register-glow register-glow-left"></div>
      <div className="register-glow register-glow-right"></div>

      <section className="register-card">
        <div className="register-header">
          <p className="register-signature">join the</p>
          <h1>BiteVerse</h1>
          <p className="register-subtitle">Create your account and step into the foodverse.</p>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}
        {success && <div style={{ color: '#22c55e', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(34,197,94,0.1)', borderRadius: '8px' }}>{success}</div>}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <section className="register-section">
            <div className="section-head">
              <h2>Role & Profile</h2>
              <p>Choose your role and complete your profile basics.</p>
            </div>

            <div className="role-toggle" role="radiogroup" aria-label="Role selection">
              <button
                type="button"
                className={role === 'student' ? 'active' : ''}
                onClick={() => setRole('student')}
                aria-pressed={role === 'student'}
              >
                Student
              </button>
              <button
                type="button"
                className={role === 'teacher' ? 'active' : ''}
                onClick={() => setRole('teacher')}
                aria-pressed={role === 'teacher'}
              >
                Teacher
              </button>
            </div>

            <div className="profile-grid">
              <label className="profile-upload avatar-upload">
                <span className="upload-title">Profile picture</span>
                <span className="upload-hint">Upload image or use auto-generated avatar</span>
                <div className="avatar-preview-wrap">
                  <img className="avatar-preview" src={avatarPreview} alt="Profile preview" />
                  {!profileImage ? (
                    <button
                      type="button"
                      className="avatar-refresh-btn"
                      onClick={handleAvatarRefresh}
                      aria-label="Change random avatar"
                      title="Change random avatar"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                        <path d="M20 4v6h-6" />
                      </svg>
                    </button>
                  ) : null}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event.target.files?.[0])}
                />
              </label>

              <div className="profile-stack">
                <div className="field-row">
                  <label>
                    Full Name
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      onBlur={() => setTouched((current) => ({ ...current, fullName: true }))}
                      placeholder="Your full name"
                    />
                    {touched.fullName && errors.fullName ? <small className="error-text">{errors.fullName}</small> : null}
                  </label>
                </div>

                <div className="field-row two-up">
                  <label>
                    Username
                    <div className="input-with-status">
                      <input
                        type="text"
                        value={username}
                        onChange={(event) => {
                          setUsername(event.target.value)
                          setUsernameStatus('idle')
                        }}
                        onBlur={() => {
                          setTouched((current) => ({ ...current, username: true }))
                          handleUsernameBlur()
                        }}
                        placeholder="unique username"
                      />
                      <span className={`status-pill ${usernameStatus}`}>
                        {usernameStatus === 'available'
                          ? 'Available'
                          : usernameStatus === 'taken'
                            ? 'Taken'
                            : 'Check availability'}
                      </span>
                    </div>
                    {touched.username && errors.username ? <small className="error-text">{errors.username}</small> : null}
                  </label>

                  <label>
                    Date of Birth
                    <input
                      type="date"
                      value={dob}
                      onChange={(event) => setDob(event.target.value)}
                      onBlur={() => setTouched((current) => ({ ...current, dob: true }))}
                    />
                    {touched.dob && errors.dob ? <small className="error-text">{errors.dob}</small> : null}
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="register-section">
            <div className="section-head">
              <h2>Contact & Security</h2>
              <p>Email, phone, and password validation are handled on the frontend.</p>
            </div>

            <div className="field-row two-up">
              <label>
                Email ID
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  placeholder="name@example.com"
                />
                {touched.email && errors.email ? <small className="error-text">{errors.email}</small> : null}
              </label>

              <label>
                Phone Number
                <div className="phone-row">
                  <select value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                    placeholder="9876543210"
                  />
                </div>
                {touched.phone && errors.phone ? <small className="error-text">{errors.phone}</small> : null}
              </label>
            </div>

            <div className="field-row two-up">
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                  placeholder="Create password"
                />
                <div className="rule-list">
                  <span className={passwordRules.minLength ? 'pass' : ''}>8+ characters</span>
                  <span className={passwordRules.number ? 'pass' : ''}>Number</span>
                  <span className={passwordRules.special ? 'pass' : ''}>Special character</span>
                </div>
                {touched.password && errors.password ? <small className="error-text">{errors.password}</small> : null}
              </label>

              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, confirmPassword: true }))}
                  placeholder="Repeat password"
                />
                {touched.confirmPassword && errors.confirmPassword ? <small className="error-text">{errors.confirmPassword}</small> : null}
              </label>
            </div>
          </section>

          <section className="register-section">
            <div className="section-head">
              <h2>College Selection</h2>
              <p>Select your college from the dropdown list. If it is not available, add it manually.</p>
            </div>

            <label>
              College
              <select
                className="college-select"
                value={college}
                disabled={showAddCollege}
                onChange={(event) => {
                  setCollege(event.target.value)
                }}
                onBlur={() => {
                  setTouched((current) => ({ ...current, college: true }))
                }}
              >
                <option value="" hidden>
                  Select your college
                </option>
                {collegeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="custom-college-toggle">
              <input
                type="checkbox"
                checked={showAddCollege}
                onChange={(event) => {
                  const useCustomCollege = event.target.checked
                  setShowAddCollege(useCustomCollege)

                  if (useCustomCollege) {
                    setCollege('')
                  } else {
                    setNewCollege('')
                  }

                  setTouched((current) => ({ ...current, college: true }))
                }}
              />
              <span>My desired college is not listed in the dropdown</span>
            </label>

            <label>
              Enter College Name
              <input
                type="text"
                value={newCollege}
                disabled={!showAddCollege}
                onChange={(event) => {
                  setNewCollege(event.target.value)
                  setCollege('')
                }}
                onBlur={() => {
                  setTouched((current) => ({ ...current, college: true }))
                }}
                placeholder="Type your college name"
              />
            </label>

            <div className="selected-college">
              Selected: {college || newCollege || 'None'}
            </div>
            {touched.college && errors.college ? <small className="error-text">{errors.college}</small> : null}
          </section>

          <section className="register-section">
            <div className="section-head">
              <h2>Uploads & Extra</h2>
              <p>Upload your college proof and an optional referral code.</p>
            </div>

            <div className="upload-grid">
              <label
                className="drop-zone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  handleDocumentChange(event.dataTransfer.files?.[0])
                }}
                onClick={() => document.getElementById('college-proof-input')?.click()}
              >
                <span className="upload-title">College proof</span>
                <span className="upload-hint">Image or PDF. Drag and drop supported.</span>
                <input
                  id="college-proof-input"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(event) => handleDocumentChange(event.target.files?.[0])}
                />
                <div className="file-meta">
                  <span>{documentFile ? documentFile.name : 'No file selected'}</span>
                  <span>{documentFile ? 'Uploaded' : 'Waiting for upload'}</span>
                </div>
                {documentPreview ? (
                  <div className="file-preview">
                    {documentFile?.type?.includes('pdf') ? (
                      <iframe title="Document preview" src={documentPreview}></iframe>
                    ) : (
                      <img src={documentPreview} alt="Document preview" />
                    )}
                  </div>
                ) : null}
                {touched.documentFile && errors.documentFile ? <small className="error-text">{errors.documentFile}</small> : null}
              </label>

              <label className="referral-field">
                Referral Code (optional)
                <input
                  type="text"
                  value={referralCode}
                  onChange={(event) => setReferralCode(event.target.value)}
                  placeholder="Enter referral code"
                />
              </label>
            </div>
          </section>

          <div className="register-actions">
            <button type="submit" className="primary-action register-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <button
              type="button"
              className="secondary-link"
              onClick={() => {
                triggerPageTransition(0, 0, { duration: 700 }).then(() => {
                  navigate('/login')
                })
              }}
              disabled={loading}
            >Back to login</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Register
