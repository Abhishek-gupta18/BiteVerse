import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import './Dashboard.css';

const avatarSvg = (label, primary, secondary) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="32" fill="#020617"/>
      <circle cx="64" cy="52" r="24" fill="url(#g)" opacity="0.95"/>
      <path d="M28 112c6-24 24-36 36-36s30 12 36 36" fill="url(#g)" opacity="0.85"/>
      <text x="64" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#F8FAFC">${label
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()}</text>
    </svg>
  `)}`;

const buildDishArt = (title, accentA, accentB) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" rx="32" fill="url(#bg)"/>
      <circle cx="500" cy="86" r="74" fill="#FFFFFF" opacity="0.08"/>
      <circle cx="560" cy="290" r="98" fill="#FFFFFF" opacity="0.06"/>
      <ellipse cx="250" cy="230" rx="180" ry="92" fill="#020617" opacity="0.38"/>
      <ellipse cx="256" cy="210" rx="154" ry="74" fill="#F8FAFC" opacity="0.9"/>
      <ellipse cx="256" cy="204" rx="112" ry="48" fill="#F59E0B" opacity="0.28"/>
      <path d="M170 160c32-30 84-36 124-18 30 14 50 40 62 66" fill="none" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
      <path d="M186 174c20-14 42-18 66-10" fill="none" stroke="#22C55E" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
      <path d="M236 156c20 8 38 18 54 30" fill="none" stroke="#06B6D4" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
      <path d="M306 160c18 14 28 28 36 48" fill="none" stroke="#7C3AED" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
      <text x="44" y="68" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#F8FAFC">${title}</text>
    </svg>
  `)}`;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '◉' },
  { id: 'explore', label: 'Explore Food', icon: '⌂' },
  { id: 'dining', label: 'Dining Halls', icon: '◫' },
  { id: 'reviews', label: 'Reviews', icon: '★' },
  { id: 'rewards', label: 'Rewards', icon: '⬢' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '↟' },
  { id: 'community', label: 'Community', icon: '◌' },
  { id: 'messages', label: 'Messages', icon: '✉' },
];

const recommendationCards = [
  {
    id: 1,
    title: 'Inferno Ramen',
    stall: 'Torch Noodle Bar',
    price: '$8.50',
    rating: 5,
    tag: 'Trending',
    subtitle: 'Spicy',
    accentA: '#111827',
    accentB: '#7C3AED',
  },
  {
    id: 2,
    title: 'Crisp Seoul Bowl',
    stall: 'Midnight Kitchen',
    price: '$7.20',
    rating: 5,
    tag: 'Budget',
    subtitle: 'Fresh',
    accentA: '#0F172A',
    accentB: '#06B6D4',
  },
  {
    id: 3,
    title: 'Miso Smash Burger',
    stall: 'Campus Grill',
    price: '$9.10',
    rating: 5,
    tag: 'Trending',
    subtitle: 'Popular',
    accentA: '#1E293B',
    accentB: '#22C55E',
  },
];

const achievements = [
  { label: 'Top Reviewer', icon: '🏆' },
  { label: 'Early Bird', icon: '🌅' },
  { label: 'Food Explorer', icon: '🧭' },
];

const reviews = [
  {
    id: 1,
    title: 'Miso Smash Burger',
    stall: 'Campus Grill',
    rating: 5,
    text: 'Still one of the best late-night meals on campus. The sauce has a proper kick and the bun holds up.',
    time: '2 mins ago',
    accentA: '#7C3AED',
    accentB: '#06B6D4',
  },
  {
    id: 2,
    title: 'Crisp Seoul Bowl',
    stall: 'Midnight Kitchen',
    rating: 4,
    text: 'Balanced, affordable, and quick. Perfect when you need to get back to the library fast.',
    time: '18 mins ago',
    accentA: '#06B6D4',
    accentB: '#22C55E',
  },
  {
    id: 3,
    title: 'Inferno Ramen',
    stall: 'Torch Noodle Bar',
    rating: 5,
    text: 'A clean heat, not just a gimmick. The broth is rich and the spice level is actually addictive.',
    time: '1 hour ago',
    accentA: '#F59E0B',
    accentB: '#7C3AED',
  },
];

const messages = [
  { name: 'Aarav', text: 'The ramen line is moving fast right now.', time: '2m', online: true },
  { name: 'Maya', text: 'Try the spicy tofu rice bowl. It is underrated.', time: '8m', online: true },
  { name: 'You', text: 'I am heading there after class.', time: 'now', online: false },
];

const biteVerseAvatar = avatarSvg('Abhishek', '#7C3AED', '#06B6D4');

function Stars({ rating }) {
  return (
    <div className="bv-stars" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? 'filled' : ''}>★</span>
      ))}
    </div>
  );
}

function SectionTitle({ kicker, title, action }) {
  return (
    <div className="bv-section-title">
      <div>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2>{title}</h2>
      </div>
      {action ? <button className="ghost-btn">{action}</button> : null}
    </div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [reviewTab, setReviewTab] = useState('latest');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messageDraft, setMessageDraft] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [logoutPhase, setLogoutPhase] = useState(null);
  const profileMenuRef = useRef(null);
  const logoutTimersRef = useRef([]);

  const heroStats = useMemo(
    () => [
      { label: 'Total Reviews', value: '128', hint: '+18 this week' },
      { label: 'Avg Rating', value: '4.8', hint: 'Campus wide' },
      { label: 'Points', value: '2,450', hint: 'Level 5 Food Explorer' },
    ],
    [],
  );

  const filteredReviews = useMemo(() => {
    if (reviewTab === 'top') {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    }

    return reviews;
  }, [reviewTab]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      logoutTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      logoutTimersRef.current = [];
    };
  }, []);

  const clearLogoutTimers = () => {
    logoutTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    logoutTimersRef.current = [];
  };

  const handleLogout = () => {
    if (logoutPhase) {
      return;
    }

    console.log('🚪 Logout started');
    setProfileMenuOpen(false);
    setLogoutPhase('content-fade');
    clearLogoutTimers();

    logoutTimersRef.current = [
      window.setTimeout(() => {
        console.log('📱 Content faded, showing message');
        setLogoutPhase('message-in');
      }, 450),
      window.setTimeout(() => {
        console.log('🌙 Message hiding');
        setLogoutPhase('message-out');
      }, 4450),
      window.setTimeout(() => {
        console.log('🔄 Redirecting to landing page');
        navigate('/');
      }, 4850),
    ];
  };

  return (
    <div className="biteverse-shell">
      <div className={`dashboard-content ${logoutPhase ? 'fading-out' : ''}`}>
        <aside className={`biteverse-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <button className="sidebar-collapse-btn" type="button" onClick={() => setSidebarCollapsed((value) => !value)}>
          {sidebarCollapsed ? '»' : '«'}
        </button>

        <div className="sidebar-profile">
          <img className="sidebar-avatar" src={biteVerseAvatar} alt="Abhishek" />
          {!sidebarCollapsed && (
            <div>
              <strong>Abhishek</strong>
              <p>Campus Explorer</p>
              <span className="level-badge">Level 5 Food Explorer</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                if (item.id === 'messages') {
                  navigate('/chat');
                }
              }}
              aria-label={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button className="review-cta" type="button">
          + Write Review
        </button>
      </aside>

      <div className="biteverse-main-wrap">
        <header className="biteverse-navbar">
          <div className="navbar-brand">
            <div className="brand-mark">BV</div>
            <strong>BiteVerse</strong>
          </div>

          <div className="navbar-search">
            <input type="text" placeholder="Search food, stalls, users..." aria-label="Search" />
            <button type="button">⌕</button>
          </div>

          <div className="navbar-actions">
            <button 
              type="button" 
              className={`theme-toggle-btn ${theme}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <span className="toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button type="button" className="icon-btn badge-btn" aria-label="Notifications">
              🔔
              <span className="red-dot" aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn badge-btn" aria-label="Messages" onClick={() => navigate('/chat')}>
              💬
              <span className="red-dot" aria-hidden="true" />
            </button>
            <div className="profile-dropdown" ref={profileMenuRef}>
              <button
                type="button"
                className="profile-pill"
                aria-label="Profile dropdown"
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                onClick={() => setProfileMenuOpen((value) => !value)}
              >
                <img src={biteVerseAvatar} alt="Profile" />
                <span>Abhishek</span>
                <span className={`profile-caret ${profileMenuOpen ? 'open' : ''}`}>▾</span>
              </button>

              {profileMenuOpen && (
                <div className="profile-menu" role="menu" aria-label="Profile menu">
                  <button type="button" role="menuitem" className="profile-menu-item">
                    Profile
                  </button>
                  <button type="button" role="menuitem" className="profile-menu-item">
                    Update Profile
                  </button>
                  <button type="button" role="menuitem" className="profile-menu-item">
                    Security
                  </button>
                  <button type="button" role="menuitem" className="profile-menu-item danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="biteverse-main">
          <section className="hero-card glow-card">
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="hero-greeting">Good Evening, Abhishek 👋</p>
              <h1>Ready to explore something spicy today?</h1>
              <p className="hero-subtext">
                BiteVerse keeps track of the best food stalls, trending dishes, and the reviews that matter most.
              </p>

              <div className="hero-stats">
                {heroStats.map((stat) => (
                  <article key={stat.label} className="hero-stat">
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <small>{stat.hint}</small>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-column">
              <SectionTitle kicker="Smart recommendations" title="Recommended for You 🔥" />
              <div className="recommendation-grid">
                {recommendationCards.length ? (
                  recommendationCards.map((card) => (
                    <article key={card.id} className="food-card glow-card">
                      <div
                        className="food-image"
                        style={{ backgroundImage: `url(${buildDishArt(card.title, card.accentA, card.accentB)})` }}
                      >
                        <div className="food-tag-row">
                          <span>{card.tag}</span>
                          <span>{card.subtitle}</span>
                        </div>
                      </div>
                      <div className="food-card-body">
                        <h3>{card.title}</h3>
                        <p>{card.stall}</p>
                        <div className="food-meta">
                          <strong>{card.price}</strong>
                          <Stars rating={card.rating} />
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="empty-state glow-card">
                    No recommendations yet. Start exploring 🍔
                  </div>
                )}
              </div>

              <section className="review-history glow-card">
                <SectionTitle kicker="History" title="Review History" />
                <div className="tabs">
                  {[
                    { id: 'latest', label: 'Latest' },
                    { id: 'top', label: 'Top Rated' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`tab-btn ${reviewTab === tab.id ? 'active' : ''}`}
                      onClick={() => setReviewTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="review-list">
                  {filteredReviews.length ? (
                    filteredReviews.map((review) => (
                      <article key={review.id} className="review-card glow-card">
                        <div className="review-image" style={{ backgroundImage: `url(${buildDishArt(review.title, review.accentA, review.accentB)})` }} />
                        <div className="review-content">
                          <div className="review-top-row">
                            <div>
                              <h3>{review.title}</h3>
                              <p>{review.stall}</p>
                            </div>
                            <Stars rating={review.rating} />
                          </div>
                          <p className="review-text">{review.text}</p>
                          <small>{review.time}</small>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="empty-state">No reviews yet. Start exploring 🍔</div>
                  )}
                </div>
              </section>
            </div>

            <div className="dashboard-column dashboard-column-middle">
              <section className="rewards-card glow-card">
                <SectionTitle kicker="Rewards" title="Next Reward" />
                <h3>50% Off Meal</h3>
                <div className="progress-shell" aria-label="Reward progress">
                  <div className="progress-fill" style={{ width: '72%' }} />
                </div>
                <div className="rewards-actions">
                  <button className="gradient-btn" type="button">Earn More</button>
                  <button className="secondary-btn" type="button">Redeem</button>
                </div>
              </section>

              <section className="achievements-card glow-card">
                <SectionTitle kicker="Badges" title="Achievements" />
                <div className="achievement-grid">
                  {achievements.map((achievement) => (
                    <article key={achievement.label} className="achievement-pill">
                      <span>{achievement.icon}</span>
                      <strong>{achievement.label}</strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="status-card glow-card">
                <SectionTitle kicker="Activity" title="Live Campus Status" />
                <div className="status-row success">
                  <span className="status-dot" />
                  Commons West · 5 min wait
                </div>
                <div className="status-row warning">
                  <span className="status-dot" />
                  Union Grill · 15 min wait
                </div>
                <div className="status-row error">
                  <span className="status-dot" />
                  Northside Bistro · 35 min wait
                </div>
              </section>
            </div>

            <aside className="chat-widget glow-card">
              <div className="chat-header">
                <div>
                  <p className="kicker">Community</p>
                  <h2>Messages</h2>
                </div>
                <div className="chat-badges">
                  <span className="online-count">24 online</span>
                  <span className="unread-pill">3 unread</span>
                </div>
              </div>

              <div className="chat-feed">
                {messages.map((message) => (
                  <article key={message.name} className={`chat-message ${message.online ? 'online' : ''}`}>
                    <div className="chat-avatar">{message.name.slice(0, 1)}</div>
                    <div className="chat-message-body">
                      <div className="chat-meta">
                        <strong>{message.name}</strong>
                        <small>{message.time}</small>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="chat-input-row">
                <input
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                  placeholder="Type a message..."
                  aria-label="Type a message"
                />
                <button type="button" className="gradient-btn small">Send</button>
              </div>
            </aside>
          </section>
        </main>
      </div>

        {logoutPhase && (
          <>
            <div className="logout-overlay" aria-live="polite" aria-busy="true" />
            <div className={`logout-message-container ${logoutPhase === 'message-in' ? 'visible' : logoutPhase === 'message-out' ? 'hiding' : ''}`}>
              <div className="logout-message">
                Logging you out...
              </div>
            </div>
          </>
        )}

        <nav className="mobile-bottom-drawer">
          {[
            ['Dashboard', '◉'],
            ['Explore', '⌂'],
            ['Reviews', '★'],
            ['Chat', '✉'],
          ].map(([label, icon]) => (
            <button key={label} type="button" className="drawer-item">
              <span>{icon}</span>
              <small>{label}</small>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
