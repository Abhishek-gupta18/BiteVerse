import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer';
import RecommendedFeed from './components/sections/RecommendedFeed';
import './Dashboard.css';

const API_BASE = 'http://localhost:5000/api';

const avatarSvg = (label, primary, secondary) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="34" fill="#0b0f16"/>
      <circle cx="64" cy="48" r="25" fill="url(#g)"/>
      <path d="M24 116c8-27 27-42 40-42s32 15 40 42" fill="url(#g)" opacity="0.85"/>
      <text x="64" y="56" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="800" fill="#f8fafc">${label
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()}</text>
    </svg>
  `)}`;

const buildFoodArt = (title, accentA, accentB, kind = 'bowl') =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 440" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
        <radialGradient id="glow" cx="68%" cy="28%" r="62%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="720" height="440" rx="34" fill="url(#bg)"/>
      <rect width="720" height="440" fill="url(#glow)"/>
      <circle cx="584" cy="96" r="86" fill="#ffffff" opacity="0.07"/>
      <circle cx="112" cy="352" r="120" fill="#020617" opacity="0.24"/>
      ${
        kind === 'burger'
          ? '<ellipse cx="364" cy="286" rx="182" ry="34" fill="#020617" opacity="0.35"/><path d="M212 210c22-62 286-62 308 0" fill="#f59e0b"/><rect x="214" y="204" width="304" height="42" rx="18" fill="#f8fafc" opacity="0.9"/><rect x="230" y="238" width="272" height="42" rx="16" fill="#7c2d12"/><path d="M236 278h260c-18 48-242 48-260 0z" fill="#fbbf24"/>'
          : '<ellipse cx="360" cy="296" rx="190" ry="56" fill="#020617" opacity="0.35"/><ellipse cx="360" cy="252" rx="154" ry="82" fill="#f8fafc" opacity="0.92"/><ellipse cx="360" cy="246" rx="112" ry="52" fill="#f97316" opacity="0.38"/><path d="M276 222c44-24 102-24 168 0" stroke="#22c55e" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M294 250c42-28 86-30 132-6" stroke="#06b6d4" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="406" cy="218" r="21" fill="#f8fafc" opacity="0.95"/><circle cx="406" cy="218" r="10" fill="#f59e0b"/>'
      }
      <text x="40" y="78" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#f8fafc">${title}</text>
    </svg>
  `)}`;

const navItems = [
  { id: 'dashboard', label: 'Feed', icon: 'FD' },
  { id: 'explore', label: 'Explore', icon: 'EX', route: '/explore-food' },
  { id: 'reviews', label: 'Reviews', icon: 'RV' },
  { id: 'quests', label: 'Quests', icon: 'QS', route: '/rewards' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'LB', route: '/leaderboard' },
  { id: 'messages', label: 'Inbox', icon: 'IN', route: '/chat' },
];

const trendingItems = [
  { title: 'Ghost Pepper Wings', stall: 'The Hub', orders: '1.2k orders', art: buildFoodArt('Ghost Pepper Wings', '#121820', '#b45309', 'burger') },
  { title: 'Double Fudge Melt', stall: 'Sweet Treats', orders: '850 orders', art: buildFoodArt('Double Fudge Melt', '#111827', '#7c3aed') },
  { title: 'Beef Smash Burger', stall: 'Grill House', orders: '2.1k orders', art: buildFoodArt('Beef Smash Burger', '#101419', '#dc2626', 'burger') },
  { title: 'Nitro Cold Brew', stall: 'Library Cafe', orders: '640 orders', art: buildFoodArt('Nitro Cold Brew', '#0f172a', '#0284c7') },
];

const filters = ['Near Me', 'Trending', 'Spicy', 'Budget', 'Open Now'];
const moods = [
  { id: 'stressed', icon: '!!', label: 'Stressed' },
  { id: 'broke', icon: '$', label: 'Budget' },
  { id: 'wild', icon: 'W', label: 'Wild' },
  { id: 'healthy', icon: '+', label: 'Healthy' },
  { id: 'chill', icon: '~', label: 'Chill' },
  { id: 'hype', icon: '*', label: 'Hype' },
];

const outlets = [
  {
    name: 'The Gourmet Hub',
    cuisine: 'Continental',
    location: 'Blocks away from Library',
    status: 'BUSY',
    wait: '~8 MIN',
    rating: '4.8',
    tags: ['#MustTryPizza', '#VibeCheck'],
    tone: 'busy',
    art: buildFoodArt('The Gourmet Hub', '#121820', '#ea580c', 'burger'),
  },
  {
    name: 'Burger Nation',
    cuisine: 'Fast Food',
    location: 'Central Plaza',
    status: 'JAMMED',
    wait: '~35 MIN',
    rating: '4.2',
    tags: ['#StudentFavorite', '#BestFries'],
    tone: 'jammed',
    art: buildFoodArt('Burger Nation', '#0b0f16', '#991b1b', 'burger'),
  },
];

const feedPosts = [
  {
    user: '@foodie_king_23',
    time: '2 mins ago',
    channel: '#RamenHeads',
    text: "The Hub's spicy ramen is serious today. If you can handle heat, go for Level 5.",
    votes: 245,
    comments: 18,
  },
  {
    user: '@caffeine_addict',
    time: '15 mins ago',
    channel: '#StudyVibes',
    text: 'Library Cafe is quiet right now. Good window for a focused coffee break.',
    votes: 512,
    comments: 42,
    art: buildFoodArt('Library Cafe', '#0f172a', '#0369a1'),
  },
];

const hiddenGems = [
  { title: 'The Alchemist Brew', note: 'Secret menu available', art: buildFoodArt('Alchemist Brew', '#111827', '#166534') },
  { title: "Luigi's Secret Loft", note: '98% student approval', art: buildFoodArt("Luigi's Loft", '#18181b', '#854d0e') },
];

const biteVerseAvatar = avatarSvg('user', '#58a6ff', '#efa500');

function Icon({ name }) {
  const paths = {
    search: <path d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21" />,
    mic: <path d="M12 3v8m0 0a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v2a3 3 0 0 0 3 3Zm0 0v5m-5-5a5 5 0 0 0 10 0m-7 5h4" />,
    tune: <path d="M4 7h9m4 0h3M4 17h3m4 0h9m-7-3v6M13 4v6" />,
    bell: <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h20l-2-2Zm-5 5h-2" />,
    moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8.8 8.8 0 1 0 20 14.5Z" />,
    sun: <path d="M12 5V3m0 18v-2M5 12H3m18 0h-2M6.3 6.3 4.9 4.9m14.2 14.2-1.4-1.4m0-11.4 1.4-1.4M4.9 19.1l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    chevron: <path d="m9 6 6 6-6 6" />,
  };

  return (
    <svg className="bv-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="dashboard-section-header">
      <h2>{title}</h2>
      {action ? <button type="button">{action}</button> : null}
    </div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeFilter, setActiveFilter] = useState('Near Me');
  const [activeMood, setActiveMood] = useState('wild');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [collegeName, setCollegeName] = useState('Campus Explorer');
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState('');

  const profileDisplayName = user?.full_name || user?.username || 'Campus Explorer';
  const profileAvatar = user?.profile_picture_url || avatarSvg(profileDisplayName, '#58a6ff', '#efa500');

  useEffect(() => {
    const resolveCollegeName = async () => {
      if (!user?.college_id) {
        setCollegeName('Campus Explorer');
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/colleges/${user.college_id}`, { credentials: 'include' });
        if (!response.ok) {
          setCollegeName('Campus Explorer');
          return;
        }

        const data = await response.json();
        setCollegeName(data.name || 'Campus Explorer');
      } catch (error) {
        setCollegeName('Campus Explorer');
      }
    };

    resolveCollegeName();
  }, [user?.college_id]);

  useEffect(() => {
    const fetchTrending = async () => {
      if (!user?.college_id) {
        setRecommendations([]);
        return;
      }

      setRecommendationsLoading(true);
      setRecommendationsError('');

      try {
        const response = await fetch(`${API_BASE}/food-items/trending?college_id=${user.college_id}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Unable to load recommendations');
        }

        const data = await response.json();
        setRecommendations(Array.isArray(data) ? data : []);
      } catch (error) {
        setRecommendations([]);
        setRecommendationsError(error.message || 'Unable to load recommendations');
      } finally {
        setRecommendationsLoading(false);
      }
    };

    fetchTrending();
  }, [user?.college_id]);

  const stats = useMemo(
    () => [
      { label: 'Campus wait', value: '8m' },
      { label: 'Hot outlets', value: '14' },
      { label: 'Quest XP', value: '+500' },
    ],
    [],
  );

  return (
    <div className="biteverse-shell">
      <div className="dashboard-content">
        <aside className={`biteverse-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <button className="sidebar-collapse-btn" type="button" onClick={() => setSidebarCollapsed((value) => !value)}>
            <Icon name="chevron" />
          </button>

          <div className="sidebar-profile">
            <img className="sidebar-avatar" src={profileAvatar} alt={profileDisplayName} />
            {!sidebarCollapsed && (
              <div>
                <strong>{profileDisplayName}</strong>
                <p>{collegeName}</p>
                <span className="level-badge">Level 5 Food Explorer</span>
              </div>
            )}
          </div>

          <nav className="sidebar-nav" aria-label="Dashboard navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.route) {
                    navigate(item.route);
                  }
                }}
                aria-label={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <button className="review-cta" type="button" onClick={() => navigate('/reviews/new')}>
            Write Review
          </button>
        </aside>

        <div className="biteverse-main-wrap">
          <header className="biteverse-navbar">
            <div className="navbar-brand">
              <div className="brand-mark">BV</div>
              <strong>BiteVerse</strong>
            </div>

            <div className="navbar-actions">
              <button type="button" className={`theme-toggle-btn ${theme}`} onClick={toggleTheme} aria-label="Toggle theme">
                <span className="toggle-icon"><Icon name={theme === 'light' ? 'moon' : 'sun'} /></span>
              </button>
              <div className="notification-dropdown">
                <button
                  type="button"
                  className={`icon-btn badge-btn ${notificationsOpen ? 'active' : ''}`}
                  aria-label="Notifications"
                  onClick={() => {
                    setNotificationsOpen((value) => !value);
                    setProfileMenuOpen(false);
                  }}
                >
                  <Icon name="bell" />
                  <span className="red-dot" aria-hidden="true" />
                </button>
                {notificationsOpen && (
                  <div className="notification-menu" role="menu" aria-label="Notifications">
                    <div className="notification-menu-head">
                      <strong>Notifications</strong>
                      <button type="button">Mark all read</button>
                    </div>
                    <div className="notification-list">
                      <article className="notification-item unread">
                        <div className="notification-item-copy">
                          <h4>Lunch rush started</h4>
                          <p>The Hub crossed 1k orders and is trending near you.</p>
                        </div>
                        <time>2m ago</time>
                      </article>
                      <article className="notification-item">
                        <div className="notification-item-copy">
                          <h4>Quest progress</h4>
                          <p>You are 1 ramen review away from +500 XP.</p>
                        </div>
                        <time>18m ago</time>
                      </article>
                    </div>
                  </div>
                )}
              </div>
              <div className="profile-dropdown">
                <button
                  type="button"
                  className="profile-pill"
                  aria-label="Profile menu"
                  onClick={() => {
                    setProfileMenuOpen((value) => !value);
                    setNotificationsOpen(false);
                  }}
                >
                  <img src={profileAvatar} alt={profileDisplayName} />
                  <span>{profileDisplayName}</span>
                  <span className={`profile-caret ${profileMenuOpen ? 'open' : ''}`}>v</span>
                </button>
                {profileMenuOpen && (
                  <div className="profile-menu" role="menu" aria-label="Profile menu">
                    <button type="button" className="profile-menu-item">Profile</button>
                    <button type="button" className="profile-menu-item">Update Profile</button>
                    <button type="button" className="profile-menu-item">Security</button>
                    <button type="button" className="profile-menu-item danger" onClick={() => navigate('/')}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="biteverse-main">
            <section className="dashboard-hero">
              <div className="dashboard-hero__copy">
                <p className="kicker">Live campus food radar</p>
                <h1>Explore what is worth eating right now.</h1>
                <p>
                  Track crowds, trending dishes, social proof, and quick quests from one focused BiteVerse dashboard.
                </p>
              </div>
              <div className="dashboard-hero__stats">
                {stats.map((item) => (
                  <article key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="smart-search-panel">
              <div className="smart-search">
                <span aria-hidden="true"><Icon name="search" /></span>
                <input placeholder="Craving something specific?" aria-label="Search food and outlets" />
                <button type="button" aria-label="Voice search"><Icon name="mic" /></button>
                <button type="button" className="search-filter-btn" aria-label="Tune filters"><Icon name="tune" /></button>
              </div>
              <div className="search-suggestions">
                <span>Trending:</span>
                <button type="button">Spicy Ramen</button>
                <button type="button">Nitro Brew</button>
                <button type="button">Cheese Loaded Fries</button>
              </div>
              <div className="quick-filter-row">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={activeFilter === filter ? 'active' : ''}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-section" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Trending Picks</h2>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" className="primary-action" onClick={() => navigate('/reviews/new')}>
                    Add Review
                  </button>
                  <button type="button" className="ghost-action" onClick={() => navigate('/stalls/new')}>
                    Add New Stall
                  </button>
                </div>
              </div>

              {recommendationsError ? (
                <div className="empty-state-card">{recommendationsError}</div>
              ) : recommendationsLoading ? (
                <div className="food-grid" aria-live="polite">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="food-card skeleton-card">
                      <div className="food-image-container skeleton-block" />
                      <div className="food-info">
                        <div className="skeleton-line short" />
                        <div className="skeleton-line medium" />
                        <div className="skeleton-line small" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recommendations.length > 0 ? (
                <RecommendedFeed
                  food={recommendations.map((item) => ({
                    id: item.id,
                    name: item.name,
                    stall: item.stall_name,
                    price: `₹${Number(item.price || 0).toFixed(2)}`,
                    image: item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
                    rating: Number(item.avg_rating || 0).toFixed(1),
                    tag: item.season_tag || 'Trending',
                  }))}
                />
              ) : (
                <div className="empty-state-card">
                  No reviewed food items exist for this college yet. Be the first to add a review or a stall.
                </div>
              )}
            </section>

            <section className="campus-map glass-card">
              <div className="campus-map__head">
                <div>
                  <p className="kicker">Live map</p>
                  <h2>Campus Food Map</h2>
                </div>
                <button type="button">Expand</button>
              </div>
              <div className="map-canvas">
                <div className="map-grid" />
                <div className="map-pin pin-free"><span />Main Hall</div>
                <div className="map-pin pin-busy"><span />Library Cafe</div>
                <div className="map-pin pin-jammed"><span />North Canteen</div>
                <div className="map-legend">
                  <span><i className="free" />Free</span>
                  <span><i className="busy" />Busy</span>
                  <span><i className="jammed" />Jammed</span>
                </div>
              </div>
            </section>

            <section className="dashboard-section">
              <SectionHeader title="How's the vibe?" />
              <div className="mood-row">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    className={`mood-card glass-card ${activeMood === mood.id ? 'active' : ''}`}
                    onClick={() => setActiveMood(mood.id)}
                  >
                    <strong>{mood.icon}</strong>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-section">
              <SectionHeader title="Top Outlets" />
              <div className="outlet-grid">
                {outlets.map((outlet) => (
                  <article key={outlet.name} className="outlet-card glass-card">
                    <div className="outlet-card__media" style={{ backgroundImage: `url(${outlet.art})` }}>
                      <span className={`status-badge ${outlet.tone}`}>{outlet.status}</span>
                      <span className="wait-badge">WAIT: {outlet.wait}</span>
                    </div>
                    <div className="outlet-card__body">
                      <div className="outlet-card__top">
                        <div>
                          <h3>{outlet.name}</h3>
                          <p>{outlet.cuisine} - {outlet.location}</p>
                        </div>
                        <strong>{outlet.rating}</strong>
                      </div>
                      <div className="tag-row">
                        {outlet.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <button type="button">Explore Menu</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-lower-grid">
              <div className="dashboard-section social-feed">
                <SectionHeader title="Social Feed" />
                {feedPosts.map((post) => (
                  <article key={post.user} className="feed-card glass-card">
                    <div className="feed-card__head">
                      <img src={avatarSvg(post.user, '#58a6ff', '#efa500')} alt="" />
                      <div>
                        <strong>{post.user}</strong>
                        <span>{post.time} - Post in {post.channel}</span>
                      </div>
                    </div>
                    {post.art ? <div className="feed-card__image" style={{ backgroundImage: `url(${post.art})` }} /> : null}
                    <p>{post.text}</p>
                    <div className="feed-card__actions">
                      <button type="button">Up {post.votes}</button>
                      <button type="button">Comments {post.comments}</button>
                      <button type="button">Share</button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="dashboard-side-stack">
                <section className="quest-card glass-card">
                  <p className="kicker">Daily challenge</p>
                  <div className="quest-card__top">
                    <div>
                      <h2>The Ramen Run</h2>
                      <p>Review 2 ramen places today</p>
                    </div>
                    <strong>+500 XP</strong>
                  </div>
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>1 / 2</span>
                  </div>
                  <div className="progress-shell">
                    <div className="progress-fill" style={{ width: '50%' }} />
                  </div>
                </section>

                <section className="dashboard-section hidden-gems">
                  <SectionHeader title="Hidden Gems" action="Reveal" />
                  {hiddenGems.map((gem) => (
                    <article key={gem.title} className="gem-card">
                      <div style={{ backgroundImage: `url(${gem.art})` }} />
                      <h3>{gem.title}</h3>
                      <p>{gem.note}</p>
                    </article>
                  ))}
                </section>
              </aside>
            </section>

            <button className="floating-review-btn" type="button" onClick={() => navigate('/reviews/new')}>Write a Review</button>
            <Footer variant="dashboard" />
          </main>
        </div>

        <nav className="mobile-bottom-drawer" aria-label="Mobile dashboard navigation">
          {[
            ['Feed', 'FD'],
            ['Explore', 'EX'],
            ['Quests', 'QS'],
            ['Inbox', 'IN'],
          ].map(([label, icon]) => (
            <button key={label} type="button" className={label === 'Explore' ? 'drawer-item active' : 'drawer-item'}>
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
